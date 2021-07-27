/**
 * 审计日志子表开关管理编辑页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
    var temp = require('./logConfigEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'logConfigAppLogConfigEdit',
        query: function () {
            return {
                type: 'add',
                taskCode: '',
                apiUrl: ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                pickerOptions: {
                    disabledDate: function (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                rules: {}
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    taskCode: '',
                    basicLogValid: '1',
                    specialLogValid: '1',
                    businessNoKey: '',
                    requestDataVo: '',
                    validInd: '1',
                    apiUrl: ''
                }
            }
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            selectSaaTask: function (row) {
                this.form.apiUrl = row.url
                console.log(row);
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
                            var url = Vue.gvUtil.getUrl({
                            apiName: 'validateApiUrl',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, _this.form.taskCode).then(function (res) {
                            if (res.resCode === '0000' && res.resData.existFlag === '1') {
                                if (_this.query.type === 'add') {
                                    url = Vue.gvUtil.getUrl({
                                        apiName: 'logConfigAdd',
                                        contextName: 'auth'
                                    });
                                    _this.form.inputTime = Date.parse(_this.form.inputTime);
                                    Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                        _this.successSubmit(res);
                                    });
                                } else {
                                    // 更新
                                    url = Vue.gvUtil.getUrl({
                                        apiName: 'logConfigUpdate',
                                        contextName: 'auth'
                                    });
                                    _this.form.inputTime = Date.parse(_this.form.inputTime);
                                    Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                        _this.successSubmit(res);
                                    });
                                }
                                }else{
                                   if(_this.query.type === 'edit'){
                                        // 更新
                                        url = Vue.gvUtil.getUrl({
                                            apiName: 'logConfigUpdate',
                                            contextName: 'auth'
                                        });
                                        _this.form.inputTime = Date.parse(_this.form.inputTime);
                                        Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                            _this.successSubmit(res);
                                        });
                                   }else{
                                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                                        return;
                                   }
                                   
                                }
                        });
                            
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            resetForm: function (formName, type) {
                var taskCode = this.form.taskCode;
                this.$refs[formName].resetFields();
                if (type === 'edit') {
                    this.form.taskCode = taskCode;
                }
            }
        },
        methods: {
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.form.taskCode = this.query.taskCode;
                    this.requestData();
                }
            },
            initRules: function () {
                this.rules = {
                    taskCode: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'change'
                    }, {
                        validator: this.validateApiUrl, 
                        trigger: 'change'
                    }],
                    auditLogValidInd: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'change'
                    }],
                    specialAuditLogValidInd: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'change'
                    }],
                    validInd: [{
                        require: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'change'
                    }]
                }
            },
            validateApiUrl: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateApiUrl',
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
                        apiName: 'logConfigFindByPk',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.post(url, this.query.taskCode).then(function (res) {
                    if (res.resCode === '0000') {
                        // res.resData.inputTime = new Date(res.resData.inputTime);
                        $.extend(true, _this.form, res.resData)
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
                    });
                }
            }
        }
    });
});