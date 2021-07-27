/**
 * 基础审计日志管理主页面
 * @author 孙恬静
 * @time 2017/11/14
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'auditLogApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                logAuditRequestVoFilters: {
                    userCode: '',
                    apiName: '',
                    greaterThanDate: null,
                    lowerThanDate: null
                },
                logAuditRequestVoList: []
            }
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.searchList('auditLogSearch', 'auth', this.logAuditRequestVoFilters, 'logAuditRequestVoList', function (data) {
                    _this.logAuditRequestVoList = data;
                });
            },
            // 查看
            onHandleEdit: function (row) {
                Vue.gvUtil.redirectTo({
                    name: 'auditLogAppAuditLogEdit',
                    query: {
                        basicId: row && row.content.basicId
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
                //   Vue.gvUtil.redirectTo({name: 'auditLogAppAuditLogEdit', query: {basicId: row && row.content.basicId }})
            }
        },
        methods: {
            // 时间格式化
            formatDate: function (row) {
                return Vue.filter('time')(row['content']['operateTime'], "yyyy-MM-dd HH:mm:ss");
            }
        }
    });
});