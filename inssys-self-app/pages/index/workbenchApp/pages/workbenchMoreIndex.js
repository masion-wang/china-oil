/**
 * 功能管理主页面
 * @author
 * @time 2018/1/29
 */
define(function (require) {
    var temp = require('./workbenchMoreIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'workbenchAppMoreMsg',

        datas: function () {
            return {
                workbenchVoMsgList: [],
                msgPageSize: 10, // 提醒消息每页数量
                msgPageNo: 0, // 提醒消息页数
                transferTypeMsg: '3'// 公告
            }
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.searchList('getReminderMsgInfo', 'auth', {transferType: this.transferTypeMsg}, 'resultList', function (data) {
                    _this.workbenchVoMsgList = data;
                });
            },
            handleDelete: function (index, row) {
                this.$msgbox({
                    title: Vue.filter('translate')('workbenchAppVoMessage'),
                    message: row.contentValue,
                    confirmButtonText: Vue.filter('translate')('cxlClose'),
                    beforeClose: function (action, instance, done) {
                        if (action === 'confirm') {
                            done();
                        }
                    }
                });
            }
        },
        methods: {
            initPage: function () {
                var _this = this;
                this.searchList('getReminderMsgInfo', 'auth', {_pageSize: this.msgPageSize, _pageNo: this.msgPageNo, transferType: this.transferTypeMsg}, 'resultList', function (data) {
                    _this.workbenchVoMsgList = data;
                });
            },
            initData: function () {
                // console.log('chenInitData+workbench');
            }
        }
    });
});
