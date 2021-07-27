/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageConfigApp',

        datas: function () {
            return {
                ggMessageConfigVoFilters: {},
                ggMessageConfigList: []
            }
        },
        events: {
            sendMessage: function (row) {
                var  messageConfig = {
                        partyno: 'E000013I',
                        priority: row.priority
                    },
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysSendMessage',
                        urlParams: {
                            messageCode: row.messageCode
                        },
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.post(url, messageConfig).then(function () {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSendReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    })
                });
            },

            onGetList: function () {
                var _this = this;
                this.searchList('findGgMessageConfigList', 'auth', this.ggMessageConfigVoFilters, 'ggMessageConfigList', function (data) {
                    _this.ggMessageConfigList = data;
                });
            },
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'messageConfigAppEdit',
                    query: {type: type, messageCode: row && row.messageCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            },
            preview: function (row) {
                // console.log(row.messageCode);
                Vue.gvUtil.redirectTo({
                    name: 'messageConfigAppPreview',
                    query: {type: 'view', messageCode: row && row.messageCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            },
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    var validInd = '1';
                    if (row.validInd === '1') {
                        validInd = '0';
                    }
                    var messageConfig = {
                            validInd: validInd,
                            messageCode: row.messageCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'messageConfigDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, messageConfig).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === '1') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === '0') {
                                disableMessage = 'gIsDisable';
                            } else {
                                disableMessage = 'gSaveSuccess';
                            }
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(disableMessage)
                            }).then(function () {
                                _this.onGetList();
                            });
                        }
                    });
                })
            },
            formatter: function (row, column) {
                return Vue.gvUtil.translationData('TransferType', row[column.property]);
            }
        }
    });
});
