/**
 * 基础审计日志管理应用配置
 * @author 孙恬静
 * @time 2017/11/14
 */
(function () {
    return {
        api: {
            // 获取审计日志列表数据（分页）
            'auditLogSearch': '/log/search/',
            // 获取审计日志详情，包括特殊审计日志和基础日志
            'auditLogFindByUuid': '/log/find_by_id/{basicId}'
        },
        router: [{
            path: '/sys/log/audit_log_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{ // 查看请求数据
                path: 'audit_log_edit/index',
                name: 'auditLogAppAuditLogEdit',
                component: function (resolve) {
                    require.async(['pages/sys/log/auditLogApp/pages/auditLogEditIndex'], resolve);
                }
            }]
        }]
    }
})();
