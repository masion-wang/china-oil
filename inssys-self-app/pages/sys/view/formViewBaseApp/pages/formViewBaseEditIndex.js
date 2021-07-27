/**
 * 基础表单视图管理编辑页面
 * @author HuangTianQi
 * @time 2017/11/24
 */
define(function (require) {
    var temp = require('./formViewBaseEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'formViewBaseAppFormViewBaseEdit',
        query: function () {
            return {
                type: 'add',
                viewObjectForm: ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    viewObjectForm: '',
                    viewObjectVo: '',
                    modelCode: '',
                    formTitleKey: '',
                    remark: '',
                    validInd: '1',
                    width: '',
                    arrangement: '',
                    btnAdd: '',
                    btnDelete: '',
                    configType: ''
                }
            }
        },
        events: {
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            resetForm: function (formName) {
                var viewObjectForm = this.form.viewObjectForm;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.viewObjectForm = viewObjectForm;
                }
            },
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'formViewBaseAdd',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'formViewBaseUpdate',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            }
        },
        methods: {
            // 初始化页面
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    viewObjectForm: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    },
                    {
                        validator: this.validateViewObjectForm,
                        trigger: 'blur'
                    }
                    ],
                    modelCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    formTitleKey: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    width: [{
                        trigger: 'blur',
                        pattern: Vue.gvUtil.PATTERN_POSITIVE_INTEGER,
                        message: Vue.gvUtil.getInzTranslate('gValidatePositiveInteger')
                    }]
                };
            },
            validateViewObjectForm: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateViewObjectForm',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, value).then(function (res) {
                    if (res.resCode === '0000' && res.resData.existFlag === '1') {
                        callback();
                    } else {
                        callback(new Error(Vue.gvUtil.getInzTranslate('gValidateCode')));
                        // Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                    }
                });
            },
            // 回显
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'formViewBaseFindByPK',
                        contextName: 'auth',
                        urlParams: {
                            viewObjectForm: this.query.viewObjectForm
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData)
                    }
                });
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                // var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    });
                }
            }
        }
    });
});