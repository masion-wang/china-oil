/**
 * 模板视图编辑页面
 * @author 孙恬静
 * @time 2018/01/12
 */
define(function (require) {
    var temp = require('./custViewConfigEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'custViewConfigAppEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                custViewCode: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                custViewConfigVo: {
                    custViewCode: '',
                    templeType: '',
                    displayNo: '',
                    title: '',
                    type: ''
                },
                typeOptions: [{
                    value: 'list'
                },
                {
                    value: 'tab'
                }
                ]
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.custViewConfigVo.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'custViewConfigAdd',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'custViewConfigUpdate',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.custViewConfigVo).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            resetForm: function (formName) {
                var custViewCode = this.custViewConfigVo.custViewCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.custViewConfigVo.custViewCode = custViewCode;
                }
            }
        },
        methods: {
            // 初始化页面，低层直接调用
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
                    custViewCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    },
                    {
                        validator: this.validateCustViewCode,
                        trigger: 'blur'
                    }
                    ],
                    templeType: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            validateCustViewCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateCustViewCode',
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
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'custViewConfigFindByPk',
                        urlParams: {
                            custViewCode: _this.query.custViewCode
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.custViewConfigVo, res.resData);
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