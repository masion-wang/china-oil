/**
 * 功能管理编辑页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function(require) {
    var temp = require('./taskEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'taskAppTaskEdit',
        params: function() { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        query: function() { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                taskCode: ''
            }
        },
        datas: function() { // 双向绑定页面显示数据
            return {
                form: {
                    taskCName: '',
                    taskTName: '',
                    taskEName: '',
                    groupName: '',
                    taskCode: '',
                    validInd: '',
                    url: ''
                }
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function() {
                var _this = this,
                    url;
                this.$refs.form.validate(function(valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function() {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'validateTaskCode',
                                contextName: 'auth'
                            });
                            Vue.gvUtil.http.post(url, _this.form.taskCode).then(function(res) {
                                if (res.resCode === '0000' && res.resData.existFlag === '1') {
                                    if (_this.query.type === 'add') {
                                        // 新增
                                        url = Vue.gvUtil.getUrl({
                                            apiName: 'sysTaskAdd',
                                            contextName: 'auth'
                                        });
                                        Vue.gvUtil.http.post(url, _this.form).then(function(res) {
                                            _this.successSubmit(res)
                                        });
                                    } else {
                                        // 更新
                                        url = Vue.gvUtil.getUrl({
                                            apiName: 'sysTaskUpdate',
                                            contextName: 'auth'
                                        });
                                        Vue.gvUtil.http.post(url, _this.form).then(function(res) {
                                            _this.successSubmit(res)
                                        });
                                    }
                                } else {
                                    if (_this.query.type === 'edit') {
                                        // 更新
                                        url = Vue.gvUtil.getUrl({
                                            apiName: 'sysTaskUpdate',
                                            contextName: 'auth'
                                        });
                                        Vue.gvUtil.http.post(url, _this.form).then(function(res) {
                                            _this.successSubmit(res)
                                        });
                                    } else {
                                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                                        return;
                                    }

                                }
                            })


                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            resetForm: function(formName) {
                var taskCode = this.form.taskCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.taskCode = taskCode;
                }
            },
            // 返回上一页
            returnPage: function() {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function() {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function() {
                this.rules = {
                    taskCName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    taskTName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    taskEName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    groupName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    taskCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateTaskCode,
                        trigger: 'blur'
                    }],
                    url: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    validInd: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            validateTaskCode: function(rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateTaskCode',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, value).then(function(res) {
                    if (res.resCode === '0000' && res.resData.existFlag === '1') {
                        callback();
                    } else {
                        callback(new Error(Vue.gvUtil.getInzTranslate('gValidateCode')));
                        // Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                    }
                });
            },
            requestData: function() {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysTaskFindByPk',
                        urlParams: {
                            taskCode: _this.query.taskCode
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function(res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                    }
                });
            },

            // 保存成功后回调的方法
            successSubmit: function(data) {
                // var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function() {
                        Vue.gvUtil.redirectBack(true, true);
                    })
                }
            }

        }
    });
});