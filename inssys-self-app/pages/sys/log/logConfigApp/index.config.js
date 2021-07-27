/**
 * 审计日志子表管理应用配置
 * @author 孙恬静
 * @time 2017/11/08
 */
(function () {
    return {
        api: {
            // 获取审计日志子表配置列表数据（分页）
            'logConfigSearch': '/log/log_config/search',
            // 获取审计日志子表配置数据
            'logConfigFindByPk': '/log/log_config/find_by_pk',
            // 删除审计日志子表配置数据
            'logConfigDelete': '/log/log_config/delete',
            // 更新审计日志子表配置数据
            'logConfigUpdate': '/log/log_config/update/',
            // 增加审计日志子表配置数据
            'logConfigAdd': '/log/log_config/add/',
            'validateApiUrl': '/log/log_config/validate_code'
        },
        router: [{
            path: '/sys/log/log_config_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{ // 功能管理
                path: 'log_config_edit/index',
                name: 'logConfigAppLogConfigEdit',
                component: function (resolve) {
                    require.async(['pages/sys/log/logConfigApp/pages/logConfigEditIndex'], resolve);
                }
            }]
        }]
    };
})();
