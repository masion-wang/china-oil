/**
 * 基础数据子项管理页面
 * @author 孙恬静
 * @time 2018/04/27
 */
define(function (require) {
    var temp = require('./codeItemEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'codeAppCodeItemEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                editReadonly: true,
                rules: {},
                type: 'add'
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                id: '',
                codeType: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    id: '',
                    codeType: '',
                    codeCode: '',
                    codeName: '',
                    displayNo: '',
                    validDate: '',
                    invalidDate: '',
                    validInd: '1',
                    remark: ''
                }
            }
        },
        events: {
            resetForm: function (formName) {
                var codeType = this.form.codeType;
                this.$refs[formName].resetFields();
                this.form.codeType = codeType;
            },
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        _this.form.id = _this.query.id;
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'addGgCode',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateGgCode',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                if (res.resCode === '0000') {
                                    _this.successSubmit(res)
                                }
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            selectsCodeType: function (row) {
                this.form.codeTypeName = row.codeName;
            },
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                this.type = this.query.type;
                if (this.type === 'add') {
                    this.editReadonly = false;
                }
                if (this.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.type && this.type !== 'add') {
                    this.requestData();
                }
                this.form.codeType = this.query.codeType;
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    codeCode: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }],
                    codeType: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }],
                    codeName: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }],
                    validDate: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    validInd: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    codeTypeName: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }]
                };
            },

            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findByPk',
                        urlParams: {
                            id: this.query.id
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        // res.resData.validDate = new Date(res.resData.validDate)
                        // res.resData.invalidDate = new Date(res.resData.invalidDate)
                        $.extend(true, _this.form, res.resData);
                    }
                });
            },

            // 保存成功后回调的方法
            successSubmit: function (data) {
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    })
                }
            }
        }
    });
});