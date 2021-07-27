/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./messageConfigEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageConfigAppEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () {
            return {
                form: {
                    messageCode: '',
                    transferType: '2',
                    priority: '2',
                    receiverModel: '',
                    titleModel: '',
                    contentModel: '',
                    attachmentModel: '',
                    senderModel: '',
                    validInd: '1',
                    bufferDays: '',
                    ggMessageModelList: []
                }
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                messageCode: ''
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
                                    apiName: 'saveGgMessageConfig',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateGgMessageConfig',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res)
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            selectMessageModel: function (name) {
                var _this = this,
                    modelName = name+'Name';
                Vue.gvUtil.registerConfigExtend('messageModelApp', function () {
                    require.async('/pages/sys/message/messageModelApp/index', function (messageModelApp) {
                        Vue.gvUtil.showModal(messageModelApp, {
                            title: 'Message Model Inquiry',
                            dialogProp: {modelType: _this.getModelType(name)},
                            callDialog: function (obj) {
                                _this.form[name] = obj.modelCode;
                                _this.form[modelName] = obj.modelName;
                                // _this.form[modelContent] = obj.modelContent;
                                // console.log(obj);
                                // _this.form.titleModel = obj.partyNo;
                            }
                        })
                    });
                });
            },
            insertMessageModel: function (name) {
                var _this = this,
                    modelName = name+'Name';
                Vue.gvUtil.registerConfigExtend('messageModelAppEdit', function () {
                    require.async('/pages/sys/message/messageModelApp/pages/messageModelEditIndex', function (messageModelAppEdit) {
                        Vue.gvUtil.showModal(messageModelAppEdit, {
                            title: 'Message Model Add',
                            dialogProp: {modelType: _this.getModelType(name)},
                            callDialog: function (obj) {
                                _this.form[name] = obj.modelCode;
                                _this.form[modelName] = obj.modelName;
                            }
                        })
                    });
                });
            },
            viewMessageModel: function (name) {
                var _this = this,

                    row = {};
                for (var i=0; i<_this.form.ggMessageModelList.length; i++) {
                    if (this.form[name] === _this.form.ggMessageModelList[i].modelCode) {
                        row = _this.form.ggMessageModelList[i];
                    }
                }
                Vue.gvUtil.registerConfigExtend('messageModelAppEdit', function () {
                    require.async('/pages/sys/message/messageModelApp/pages/messageModelEditIndex', function (messageModelAppEdit) {
                        Vue.gvUtil.showModal(messageModelAppEdit, {
                            title: 'Message Model View',
                            dialogProp: {row: row},
                            callDialog: function () {
                            }
                        })
                    });
                });
            },
            // 清除表单
            resetForm: function (formName) {
                var messageCode = this.form.messageCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.messageCode = messageCode;
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }

        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                console.log(this.query.messageCode)
                if (this.query.type !== 'add') {
                    // this.form = this.query.row;
                    this.form.messageCode = this.query.messageCode;
                    this.requestData();
                }
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    'messageCode': [{
                        trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    },{
                        validator: this.validateMessageCode, trigger: 'blur'
                    }]
                };
            },
            validateMessageCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateMessageCode',
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
                        apiName: 'findGgMessageConfigVoByPk',
                        urlParams: {messageCode: _this.query.messageCode},
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);

                        var list = res.resData.ggMessageModelList;
                        for (var i=0; i<list.length; i++) {
                            if (_this.form.receiverModel === list[i].modelCode) {
                                _this.form.receiverModelName = list[i].modelName;
                            } else if (_this.form.titleModel === list[i].modelCode) {
                                _this.form.titleModelName = list[i].modelName;
                            } else if (_this.form.contentModel === list[i].modelCode) {
                                _this.form.contentModelName = list[i].modelName;
                            } else if (_this.form.attachmentModel === list[i].modelCode) {
                                _this.form.attachmentModelName = list[i].modelName;
                            } else if (_this.form.senderModel === list[i].modelCode) {
                                _this.form.senderModelName = list[i].modelName;
                            }
                        }
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
            },
            getModelType: function (name) {
                var obj = {
                    titleModel: '5',
                    receiverModel: '2',
                    contentModel: '1',
                    attachmentModel: '4',
                    senderModel: '3'
                }
                return obj[name];
            }
        }
    });
});
