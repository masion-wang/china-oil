/**
 * 模板配置
 * @author 孙恬静
 * @time 2018/01/09
 */
(function () {
    return {
        api: {
            // 获取模板视图列表数据（分页）
            'custConfigSearch': '/cust/cust_config/search',
            // 获取模板视图数据
            'custConfigFindByPk': '/cust/cust_config/find_by_pk/{id}',
            // 增加模板视图
            'custConfigAdd': '/cust/cust_config/add/',
            // 更新模板视图
            'custConfigUpdate': '/cust/cust_config/update/',
            // 删除模板视图
            'custConfigDelete': '/cust/cust_config/delete'
        },
        router: [{
            path: '/sys/cust_view/cust_config_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 视图模板编辑
                path: 'cust_config_edit/index',
                name: 'custConfigAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/custView/custConfigApp/pages/custConfigEditIndex'], resolve);
                }
            }]
        }]
    }
})();
