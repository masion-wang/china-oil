/**
 * 模板配置编辑页面
 * @author 孙恬静
 * @time 2018/01/12
 */
define(function (require) {
    var temp = require('./custConfigEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'custConfigAppEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                id: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                custConfigVo: {
                    custCode: '',
                    productCode: '',
                    planCode: '',
                    serviceName: null,
                    subjectType: null,
                    ggCustViewVos: [{
                        custViewCode: '',
                        target: ''
                    }]
                }
            }
        },
        events: {
            onAdd: function () {
                var index = this.custConfigVo.ggCustViewVos.length;
                this.$set(this.custConfigVo.ggCustViewVos, index, {
                    custViewCode: '',
                    target: ''
                });
                this.rules['ggCustViewVos.' + index + '.custViewCode'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
                this.rules['ggCustViewVos.' + index + '.target'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
            },
            onDeletes: function (index, data) {
                if (data.length > 1) {
                    data.splice(index, 1);
                } else {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('saaForbidToDeleteLastData')
                    });
                }
            },
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.custConfigVo.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'custConfigAdd',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'custConfigUpdate',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.custConfigVo).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
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
                    custCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    productCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    planCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    'ggCustViewVos.0.custViewCode': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    'ggCustViewVos.0.target': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'custConfigFindByPk',
                        urlParams: {
                            id: _this.query.id
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.custConfigVo, res.resData);
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