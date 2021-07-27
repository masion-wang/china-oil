/**
 * 功能管理应用配置
 * @author
 * @time
 */
(function () {
    return {
        api: {
            // 获取功能列表数据（分页）
            'taskTransferSearch': '/workbench/find_tasks',
            'transferUserCodeSearch': '/workbench/find_user_code?flag=0',
            // 任务移交
            'sysTaskDelegate': '/workbench/delegate_task/{taskId}/{targetUserId}'
        },
        router: [{
            path: '/sys/saa/task_transfer_app',
            component: Vue.gvUtil.getComponents('Home')
        }]
    }
})();
