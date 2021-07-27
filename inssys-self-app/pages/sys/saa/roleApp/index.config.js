/**
 * 角色管理应用配置
 * @author 孙恬静
 * @time 2017/11/21
 */
(function () {
    return {
        api: {
            // 获取角色列表数据（分页）
            'sysRoleSearch': '/saa/role/search',
            // 获取角色数据
            // "sysRoleFindByPk": "/saa/role/find_by_pk/{roleCode}",
            // 获取所有功能菜单数据
            // "sysAllSystemMenuFindBySystemCode": "/menu/find_by_system_code_without_power",
            // 增加角色
            'sysRoleAdd': '/saa/role/add',
            // 更新角色
            'sysRoleUpdate': '/saa/role/update',
            // 删除角色
            'sysRoleDelete': '/saa/role/delete',
            // 查询所有task
            'sysAllMenusAndTask': '/saa/role/find_all_menus_and_task',
            // 获取角色数据
            'sysRoleFindByPk': '/saa/role/find_all_role_message/{roleCode}',
            // 校验roleCode唯一性
            'validateRoleCode': '/saa/role/validate_code',
            //查找某个菜单下的按钮和该角色拥有的按钮权限
            'findButtonsByMenuId': '/saa/role/find_buttons_by_menu_id/{menuId}/{roleCode}',
            //根据roleCode查询角色拥有的按钮权限
            'findButtonsByRole': '/saa/role/find_buttons_by_role/{roleCode}',
            // 提交选中的按钮
            'saveButtonMenus': '/saa/role/save_buttons/{roleCode}'

        },
        router: [{
            path: '/sys/saa/role_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 角色编辑
                path: 'role_edit/index',
                name: 'roleAppRoleEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/roleApp/pages/roleEditIndex'], resolve);
                }
            }]
        }]
    };
})();
