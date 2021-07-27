/**
 * 功能管理主页面
 * @author
 * @time 2018/1/29
 */
define(function(require) {
    var temp = require('./workbenchMoreAnnouncementIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'workbenchAppMoreAnnouncementMsg',
        datas: function() {
            return {
                workbenchVoMsgList: [],
                msgPageSize: 10, // 提醒消息每页数量
                msgPageNo: 0, // 提醒消息页数
                transferTypeReminderMsg: '2' // 站内信
            }
        },
        events: {
            onGetList: function() {
                // //debugger
                var _this = this;
                this.searchList('workbenchQueryRemind', 'product', {
                    userCode: JSON.parse(window.sessionStorage.user).userCode
                }, 'gwWorkRemindList', function(data) {
                    _this.workbenchVoMsgList = data;
                });
            },
            deleteRemind(index) {
                var _this = this
                var url = Vue.gvUtil.getUrl({
                    apiName: 'workbenchDeleteRemind',
                    contextName: 'product',
                    urlParams: { messageId: index }
                });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        // empty
                        _this.$message.success("删除成功")
                    } else {
                        _this.$message.error("删除失败")
                    }
                }).then(()=>{
                    _this.onGetList()
                });

            },
            handleDelete: function(index, row) {
                this.$msgbox({
                    title: Vue.filter('translate')('workbenchAppVoMessage'),
                    message: row.contentValue,
                    showCancelButton: false,
                    confirmButtonText: Vue.filter('translate')('gBtnClose')
                })
            },
            // 删除
            onHandleDel: function (messageid) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    _this.deleteRemind(messageid) 
                       
                })
            },
        },
        methods: {
            initPage: function() {
                var _this = this;
                this.searchList('workbenchQueryRemind', 'product', {
                    _pageSize: this.msgPageSize,
                    _pageNo: this.msgPageNo,
                    userCode: JSON.parse(window.sessionStorage.user).userCode
                }, 'gwWorkRemindList', function(data) {
                    //debugger
                    _this.workbenchVoMsgList = data;
                });
            },
            formatDate: function(row, column) {
                return Vue.filter('time')(row[column.property], 'dd-MM-yyyy HH:mm:ss');
            },
        }
    });
});