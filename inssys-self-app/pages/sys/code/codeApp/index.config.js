/**
 * 基础数据应用配置
 * @author huangjinghua
 * @time 2017/11/08
 */
(function () {
    return {
        api: {
            // 获取功能列表数据
            'sysCodeList': '/gg_code/find_list',
            // 获取功能列表数据（分页）
            'ggCodeListPage': '/gg_code/find_list_page',
            // 获取功能数据
            'findByPk': '/gg_code/find_by_pk/{id}',
            // 增加功能
            'addGgCode': '/gg_code/add',
            // 更新功能
            'updateGgCode': '/gg_code/update',
            // 激活或禁用基础数据子项
            'disableGgCode': '/gg_code/disable',
            // 删除功能
            'sysOtherList': '/gg_code/find_other_list/',
            // 禁用或激活ggtype
            'disableGgType': '/gg_code/gg_type/disable',
            // 分页查询ggtype
            'ggTypeListPage': '/gg_code/gg_type/search',
            // 新增ggtype
            'addGgType': '/gg_code/gg_type/add',
            // 更新ggtype
            'updateGgType': '/gg_code/gg_type/update',
            // 查看ggtype详情
            'findByCodeType': '/gg_code/gg_type/find_by_pk/{codeType}',
            'validateCodeType': '/gg_code/gg_type/validate_code'
        },
        router: [{
            path: '/sys/code/code_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{ // 基础数据编辑
                path: 'code_edit/index',
                name: 'codeAppCodeEdit',
                component: function (resolve) {
                    require.async(['pages/sys/code/codeApp/pages/codeEditIndex'], resolve);
                }
            }, { // 基础数据子项管理
                path: 'code_item/index',
                name: 'codeAppCodeItem',
                component: function (resolve) {
                    require.async(['pages/sys/code/codeApp/pages/codeItemIndex'], resolve);
                }
            }, { // 基础数据子项管理
                path: 'code_item_edit/index',
                name: 'codeAppCodeItemEdit',
                component: function (resolve) {
                    require.async(['pages/sys/code/codeApp/pages/codeItemEditIndex'], resolve);
                }
            }]
        }]
    }
})();
