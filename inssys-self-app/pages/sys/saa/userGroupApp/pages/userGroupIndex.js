/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./userGroupEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'userGroupAppEdit',

        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {},
                pickerOptions: {
                    disabledDate: function (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        datas: function () {
            return {
                form: {
                    companyCode: ''
                }
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                companyCode: ''
            }
        },
        events: {
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
                                    apiName: 'saveGgCompany',
                                    contextName: 'auth'
                                });
                                Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                    if (_this.isDialog) {
                                        _this.dialogSuccessSubmit();
                                    } else {
                                        _this.successSubmit(res)
                                    }
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateGgCompany',
                                    contextName: 'auth'
                                });
                                Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                    if (_this.isDialog) {
                                        _this.dialogSuccessSubmit();
                                    } else {
                                        _this.successSubmit(res)
                                    }
                                });
                            }
                        });
                    } else {
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
                Vue.gvUtil.redirectBack();
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                if (this.query.type !== 'add') {
                    this.requestData();
                }
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {

                };
            },
            //
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ggCompanyFindByPk',
                        urlParams: {companyCode: _this.query.companyCode},
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
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
                        Vue.gvUtil.redirectBack();
                    })
                }
            }
        }
    });
});