/**
 * 消息
 * @author 黄景华
 * @time 2018/01/17
 */
(function () {
    return {
        api: {
            'findUserGroupList': '/saa/user_group/search',
            'ggUserGroupFindByPk': '/saa/user_group/find_by_pk/{userGroupCode}',
            'ggUserGroupDeleteByPk': '/saa/user_group/disable',
            'saveGgUserGroup': '/saa/user_group/save',
            'updateGgUserGroup': '/saa/user_group/update',
            // 根据table加载对应的tree
            'treeSearch': '/gg_code/get_tree',
            'validateUserGroupCode': '/saa/user_group/validate_code'
        },
        router: [{
            path: '/sys/saa/user_group_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'user_group_edit/index',
                name: 'userGroupAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/userGroupApp/pages/userGroupEditIndex'], resolve);
                }
            }]
        }]
    }
})();