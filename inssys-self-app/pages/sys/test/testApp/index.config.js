/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function () {
    return {
        api: {
            // 获取功能列表数据（分页）
            'sysTestSearch': '/ggTest/search',
            // 获取功能数据
            'sysTestFindByPk': '/ggTest/test/find_by_pk/{testcode}',
            // 增加功能
            'sysTestAdd': '/ggTest/test/add',
            // 更新功能
            'sysTestUpdate': '/ggTest/test/update',
            // 删除功能
            'sysTestDelete': '/ggTest/test/delete/{testcode}',
            'validateTaskCode': '/saa/task/validate_code'
        },
        router: [{
            path: '/sys/test/test_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'test_edit/index',
                name: 'testAppTaskEdit',
                component: function (resolve) {
                    require.async(['pages/sys/test/testApp/pages/testEditIndex'], resolve);
                }
            }]
        }]
    }
})();
