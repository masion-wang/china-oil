/**
 * 功能菜单管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function () {
    return {
        api: {
            'sysMenuSearch': '/menu/find_by_system_code/{systemCode}',
            'sysMenuDeletes': '/menu/delete/{id}',
            'sysMenuFindById': '/menu/find_by_id/{id}',
            'sysMenuAdd': '/menu/add',
            'sysMenuUpdate': '/menu/update',
            'sysAllMenuSearch': '/menu/find_by_system_code_without_power',
            'sysFindAllMenu': '/menu/find_all_menus/{systemCode}'
        },
        router: [{
            path: '/sys/saa/menu_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 菜单编辑
                path: 'menu_edit/index',
                name: 'menuAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/menuApp/pages/menuEditIndex'], resolve);
                }
            }]
        }]
    }
})();
