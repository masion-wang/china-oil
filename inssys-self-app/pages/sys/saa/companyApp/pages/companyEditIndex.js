/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./companyEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'companyAppEdit',

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
                    companyCode: '',
                    companyLevel: 1,
                    companyName: '',
                    companyAddress: '',
                    companyLogo: '',
                    upperCompanyCode: null,
                    validInd: '',
                    email: '',
                    emailPwd: '',
                    receiverEmail: '',
                    smsSender: '',
                    smsReceiver: ''
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
            selectUpperCompany: function (row, selectHandleParams, index) {
                this.form.companyLevel = row.companyLevel + 1;
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
                                console.log(_this.form);
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'saveGgCompany',
                                    contextName: 'auth'
                                });
                                Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                    if (_this.isDialog) {
                                        // _this.dialogSuccessSubmit();
                                    } else {
                                        _this.successSubmit(res)
                                    }
                                    if(res.resCode === '0017'){
                                        Vue.gvUtil.message('Save the error, please try again');
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
                                    if(res.resCode === '0017'){
                                        Vue.gvUtil.message('Update the error, please try again');
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
                var companyCode = this.form.companyCode;
                this.$refs[formName].resetFields();
                this.form.upperCompanyCode = '';
                if (this.query.type === 'edit') {
                    this.form.companyCode = companyCode;
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            },
            // 上传成功后的回调
            imgChanged: function (event) {
                var _this = this,
                    reader = new FileReader();
                reader.readAsDataURL(event.target.files[0])
                reader.onload = function () {
                    console.log(reader.result); // base64字符串
                    _this.form.companyLogo = reader.result
                }
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
                    companyCode: [{
                            trigger: 'blur',
                            required: true,
                            message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                        },
                        {
                            validator: this.validateCompanyCode,
                            trigger: 'blur'
                        }
                    ],
                    // upperCompanyCode: [{trigger: 'blur', required: ture, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
                    companyLevel: [{
                            trigger: 'blur',
                            required: true,
                            message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                        },
                        {
                            trigger: 'blur',
                            pattern: Vue.gvUtil.PATTERN_POSITIVE_INTEGER,
                            message: Vue.gvUtil.getInzTranslate('gValidatePositiveInteger')
                        }
                    ],
                    companyName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    validInd: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    email: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        trigger: 'blur',
                        type: 'email',
                        message: Vue.gvUtil.getInzTranslate('gValidateEmail')
                    }],
                    emailPwd: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },

            validateCompanyCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateCompanyCode',
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
                        apiName: 'ggCompanyFindByPk',
                        urlParams: {
                            companyCode: _this.query.companyCode
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        console.log(res.resData);
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