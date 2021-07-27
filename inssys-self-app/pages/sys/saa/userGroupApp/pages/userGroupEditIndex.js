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
                    userGroupCode: '',
                    userGroupLevel: 1,
                    userGroupName: '',
                    validInd: true,
                    upperUserGroupCode: null
                }
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                userGroupCode: ''
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
                                    apiName: 'saveGgUserGroup',
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
                                    apiName: 'updateGgUserGroup',
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
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            resetForm: function (formName) {
                var userGroupCode = this.form.userGroupCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.userGroupCode = userGroupCode;
                }
                this.form.upperUserGroupCode = '';
                this.form.validInd = true;
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            },
            selectUpperUserGroup: function (row) {
                this.form.userGroupLevel = row.userGroupLevel ? row.userGroupLevel + 1 : 1;
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
                    userGroupCode: [{
                        trigger: 'blur', 
                        required: true, 
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateUserGroupCode, 
                        trigger: 'blur'
                    }],
                    userGroupName: [{
                        trigger: 'blur', 
                        required: true, 
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    validInd: [{
                        trigger: 'change', 
                        required: true, 
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },

            validateUserGroupCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateUserGroupCode',
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
            //
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ggUserGroupFindByPk',
                        urlParams: {
                            userGroupCode: _this.query.userGroupCode
                        },
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
                // var _this = this;
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