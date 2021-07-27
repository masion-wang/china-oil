/**
 * 用户管理应用配置
 * @author 孙恬静
 * @time 2017/11/21
 */
(function () {
    return {
        api: {
            // 获取用户列表数据（分页）
            'sysUserSearch': '/user/search',
            // 获取用户数据
            'sysUserFindByPk': '/user/find_by_pk/{id}',
            // 获取所有角色数据
            'sysAllUserRoleFind': '/saa/role/find_all',
            // 增加/更新用户
            'sysUserAdd': '/user/create',
            // 锁定用户
            'sysUserLock': '/user/lock',
            // 删除用户
            'sysUserDelete': '/user/delete',
            // userCode异步校验是否存在
            'validateUserCode': '/user/validate_code',
            // 根据选择的printer查找对应可选的slot
            'requestPrinterSlots': '/saa/printer/all_printer_slots/{id}',
            'findPdValidation': '/gg_code/find_list_page',
            // 菜单接口
            'getFileMenus': '/biztype/list',
            'getFileList': '/docinfo/list',
            'onRemoveFile': '/docinfo/remove',
            'onAddFile': '/docinfo/add',
            'modifyDocumentConfig': '/user/modify_document_config',
            'userPrinterSearch': '/user/printer/search',
            'deleteDocumentConfig': '/user/delete_document_config',
            'validateUniqueDocument': '/saa/printer/validate_user_document'
        },
        router: [{
            path: '/sys/saa/user_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 用户编辑
                path: 'user_edit/index',
                name: 'userAppUserEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/userApp/pages/userEditIndex'], resolve);
                }
            }]
        }]
    };
})();
