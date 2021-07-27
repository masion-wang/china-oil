/**
 * 特殊审计日志管理详情查看页面
 * @author 孙恬静
 * @time 2017/11/09
 */
define(function (require) {
    var temp = require('./specialAuditLogDetailIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogAppDetail',
        params: function () { // 双向绑定状态数据
            return {
                pickerOptions: {
                    disabledDate: function (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        props: {
            uuid: ''
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    userCode: '',
                    clientIp: '',
                    startTime: '',
                    port: '',
                    auditType: '',
                    requestUrl: '',
                    requestTime: '',
                    businessNo: '',
                    requestData: '',
                    version: ''
                }
            }
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack();
            }
        },
        methods: {
            initPage: function () {
                this.requestData();
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'specialAuditLogFindByUuid',
                        contextName: 'auth',
                        urlParams: {
                            uuid: this.uuid
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form,
                            res.resData.logAuditRequest ? res.resData.logAuditRequest.content[0].content : null,
                            res.resData.specialAuditLog ? res.resData.specialAuditLog.content[0].content : null);
                        console.log(_this.form);
                    }
                });
            }
        }
    });
});