/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./mqEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'mqAppEdit',

        params: function () { // 双向绑定状态数据
            return {
                isReadonly: true, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () {
            return {
                form: {
                    // messageId : "0AFFC14000002A9F0000000000006609",
                    // topic : "System",
                    // tag : "",
                    // key : "id",
                    // storeTime : "2018-01-19",
                    // messageBody : '{"receiver":"admin","title":"","content":"报案校验信息:$(message)"}',

                    messageTrackList: []

                    // messageTrackList:[{
                    //     consumerGroup : 'System#1',
                    //     trackType : 'NOT_ONLINE'
                    // },{
                    //     consumerGroup : 'System#2',
                    //     trackType : 'NOT_ONLINE'
                    // }],

                }

            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                messageId: ''
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function () {
                for (var i = 0; i < this.ggMessageModelParamList.length; i++) {
                    var obj = this.ggMessageModelParamList[i];
                    obj.paramNo = i+1;
                }
                this.form.ggMessageModelParamList = this.ggMessageModelParamList;
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
                                    apiName: 'saveMessageModel',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateMessageModel',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                if (_this.isDialog) {
                                    _this.dialogSuccessSubmit();
                                } else {
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
            // 清除表单
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                if (this.query.type !== 'add') {
                    this.initData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {

                };
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
            },
            initData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findMQMessageVo',
                        contextName: 'auth',
                        urlParams: {messageId: this.query.messageId}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form = res.resData.messageExt;
                        _this.form.messageTrackList = res.resData.messageTrackList;
                        _this.form.messageBody = res.resData.messageBody;
                    }
                });
            },
            resendMQMessage: function (row) {
                var params = this.getParamsMixin({
                        consumerGroup: row.consumerGroup,
                        clientId: '',
                        topic: this.form.topic,
                        msgId: this.form.offsetMsgId

                    }),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'resendMQMessage',
                        contextName: 'auth'
                    });
                // _this = this,
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        Vue.gvUtil.message('成功');
                    }
                });
            }
        }
    });
});
