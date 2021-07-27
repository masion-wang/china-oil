/**
 * 功能管理编辑页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./codeEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'codeAppCodeEdit',
        params: function () { // 双向绑定状态数据
            return {
                editReadonly: true
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                codeType: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                codeTypeForm: {
                    codeType: '',
                    codeName: '',
                    validInd: '1'
                }
            }
        },
        events: {
            resetForm: function (formName) {
                var codeType = this.codeTypeForm.codeType;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.codeTypeForm.codeType = codeType;
                }
                
            },
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.codeTypeForm.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'addGgType',
                                    contextName: 'auth'
                                });
                            } else {
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateGgType',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.codeTypeForm).then(function (res) {
                                if (res.resCode === '0000') {
                                    _this.successSubmit(res);
                                }
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 返回查询页面
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                this.type = this.$route.query.type;
                if (this.query.type === 'add') {
                    this.editReadonly = false;
                }
                if (this.query.type === 'edit') {
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    codeType: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    },
                    {
                        validator: this.validateCodeType,
                        trigger: 'blur'
                    }
                    ],
                    codeName: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }]
                };
            },

            validateCodeType: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateCodeType',
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
                        apiName: 'findByCodeType',
                        urlParams: {
                            codeType: this.query.codeType
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.codeTypeForm, res.resData);
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