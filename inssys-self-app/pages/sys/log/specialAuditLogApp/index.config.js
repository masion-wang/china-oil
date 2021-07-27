/**
 * 特殊审计日志管理应用配置
 * @author 孙恬静
 * @time 2017/11/08
 */
(function () {
    return {
        api: {
            // 获取特殊审计日志列表数据（分页）
            'specialAuditLogSearch': '/special_audit_log/search/',
            // 获取特殊审计日志数据
            'specialAuditLogFindByBusinessNo': '/special_audit_log/find_by_business_no/{business_no}',
            // 获取审计日志详情，包括特殊审计日志和基础日志
            'specialAuditLogFindByUuid': '/special_audit_log/find_by_uuid/{uuid}',
            // 特殊审计日志版本对比
            'speicalAuditLogVersionCompare': '/special_audit_log/compare_versions',
            'speicalAuditLogFindById': '/special_audit_log/get_tree/{businessNo}',
            'specialAuditLogFieldCompare': '/special_audit_log/field_compare/{businessNo}'
        },
        router: [{
            path: '/sys/log/special_audit_log_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{ // 查看请求数据列表
                path: 'special_audit_log_edit/index',
                name: 'specialAuditLogAppSpecialAuditLogEdit',
                component: function (resolve) {
                    require.async(['pages/sys/log/specialAuditLogApp/pages/specialAuditLogEditIndex'], resolve);
                }
            }, { // 查看详情，包括特殊审计日志和基础日志
                path: 'special_audit_log_detail/index',
                name: 'specialAuditLogAppSpecialAuditLogDetail',
                component: function (resolve) {
                    require.async(['pages/sys/log/specialAuditLogApp/pages/specialAuditLogDetaiIndex'], resolve);
                }
            }, {
                path: 'special_audit_log_version_compararasion/index',
                name: 'specialAuditLogAppSpecialLogAuditVersionComparasion',
                component: function (resolve) {
                    require.async(['pages/sys/log/specialAuditLogApp/pages/specialAuditLogVersionCompareIndex'], resolve);
                }
            }]
        }]
    }
})();
