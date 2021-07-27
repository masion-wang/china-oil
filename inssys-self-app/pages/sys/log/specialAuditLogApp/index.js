/**
 * 特殊审计日志管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                specialAuditLog: {
                    // 业务单号
                    businessNo: ''
                },
                specialAuditLogList: []
            }
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.searchList('specialAuditLogSearch', 'auth', this.specialAuditLog, 'specialAuditLogVoList', function (data) {
                    _this.specialAuditLogList = data;
                    // _this.specialAuditLogList = data;
                });
            },
            // 查看
            onHandleEdit: function (row) {
                Vue.gvUtil.redirectTo({
                    name: 'specialAuditLogAppSpecialAuditLogEdit',
                    query: {
                        businessNo: row && row.content.businessNo
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
                //   Vue.gvUtil.redirectTo({ name: 'specialAuditLogAppSpecialAuditLogEdit', query: {businessNo: row && row.businessNo } });
            }
        },
        methods: {

            // 时间格式化
            formatDate: function (row) {
                return Vue.filter('time')(row['content']['createTime'], "yyyy-MM-dd HH:mm:ss");
            }
        }
    });
});