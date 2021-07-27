/**
 * 基础审计日志管理详情查看页面
 * @author 孙恬静
 * @time 2017/11/14
 */
define(function (require) {
    var temp = require('./auditLogEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'auditLogAppAuditLogEdit',
        query: function () {
            ''
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    userCode: '',
                    apiName: '',
                    operateTime: '',
                    url: '',
                    request: ''
                }
            }
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {
            initPage: function () {
                this.requestData();
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'auditLogFindByUuid',
                        contextName: 'auth',
                        urlParams: {
                            basicId: this.query.basicId
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        // 基础日志和特殊日志一起显示
                        $.extend(true, _this.form,
                            res.resData.logAuditRequest.content[0].content);
                        // _this.form.exception = JSON.stringify(_this.form.exception);
                    }
                });
            }
        }
    });
});