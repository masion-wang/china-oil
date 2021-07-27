/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function () {
    return {
        api: {
            // 获取功能列表数据（分页）
            'sysTaskSearch': '/saa/task/search',
            // 获取功能数据
            'sysTaskFindByPk': '/saa/task/find_by_pk/{taskCode}',
            // 增加功能
            'sysTaskAdd': '/saa/task/add',
            // 更新功能
            'sysTaskUpdate': '/saa/task/update',
            // 删除功能
            'sysTaskDelete': '/saa/task/delete',
            'validateTaskCode': '/saa/task/validate_code'
        },
        router: [{
            path: '/sys/saa/task_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'task_edit/index',
                name: 'taskAppTaskEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/taskApp/pages/taskEditIndex'], resolve);
                }
            }]
        }]
    }
})();
