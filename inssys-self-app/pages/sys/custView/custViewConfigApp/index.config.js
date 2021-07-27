/**
 * 模板视图配置
 * @author 孙恬静
 * @time 2018/01/09
 */
(function () {
    return {
        api: {
            // 获取模板视图列表数据（分页）
            'custViewConfigSearch': '/cust/cust_view_config/search',
            // 获取模板视图数据
            'custViewConfigFindByPk': '/cust/cust_view_config/find_by_pk/{custViewCode}',
            // 增加模板视图
            'custViewConfigAdd': '/cust/cust_view_config/add',
            // 更新模板视图
            'custViewConfigUpdate': '/cust/cust_view_config/update',
            // 删除模板视图
            'custViewConfigDelete': '/cust/cust_view_config/delete',
            'validateCustViewCode': '/cust/cust_view_config/validate_code'
        },
        router: [{
            path: '/sys/cust_view/cust_view_config_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 视图模板编辑
                path: 'cust_view_config_edit/index',
                name: 'custViewConfigAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/custView/custViewConfigApp/pages/custViewConfigEditIndex'], resolve);
                }
            }]
        }]
    }
})();
