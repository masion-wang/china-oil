/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./messageConfigPreviewIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageConfigAppPreview',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () {
            return {
                form: {
                    messageTitle: {
                        modelType: '5',
                        modelContent: ''
                    },
                    messageSender: {
                        modelType: '3',
                        modelContent: ''
                    },
                    messageContent: {
                        modelType: '1',
                        modelContent: ''
                    },
                    messageAttachment: {
                        modelType: '4',
                        modelContent: ''
                    },
                    messageReceiver: {
                        modelType: '2',
                        modelContent: ''
                    }

                }
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                messageCode: ''
            }
        },
        events: {
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                this.requestData();
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'messageConfigPreview',
                        urlParams: {
                            messageCode: this.query.messageCode
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        console.log(res.resData);
                        // $.extend(true, _this.form, res.resData);

                        var messageModelList = res.resData.ggMessageModelList;
                        for (var index in messageModelList) {
                            for (var modelPart in _this.form) {
                                if (_this.form[modelPart].modelType === messageModelList[index].modelType) {
                                    _this.form[modelPart].modelContent = messageModelList[index].modelContent;
                                }
                            }
                        }
                    }
                });
            }
        }
    });
});