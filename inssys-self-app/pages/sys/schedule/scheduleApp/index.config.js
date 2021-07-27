/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function () {
    return {
        api: {
            'sysScheduleQueryAll': '/tpsgi/platform/schedule/queryAll',
            'sysScheduleQueryRun': '/tpsgi/platform/schedule/queryRun',
            'sysScheduleQueryStop': '/tpsgi/platform/schedule/queryStop',
            'sysSchedulePause': '/tpsgi/platform/schedule/pause',
            'sysScheduleResume': '/tpsgi/platform/schedule/resume',
            'sysScheduleRestart': '/tpsgi/platform/schedule/restart',
            'sysScheduleStop': '/tpsgi/platform/schedule/stop',
            'sysScheduleDelete': '/tpsgi/platform/schedule/delete',
            'sysScheduleInsert': '/tpsgi/platform/schedule/insert',
            'sysScheduleLogSearch': '/tpsgi/platform/schedule/find_schedulejoblog',
            'sysScheduleConfig': '/tpsgi/platform/schedule/find_scheduleconfig',
            'sysScheduleView': '/tpsgi/platform/schedule/view',
            'sysScheduleUpdate': '/tpsgi/platform/schedule/update',
            'sysScheduleWatchStatus':'/tpsgi/platform/schedule/watchStatus',
            'sysScheduleUnblocked':'/tpsgi/platform/schedule/unblockedPost',
            'immediateExecutionTask':'/tpsgi/platform/schedule/immediateExecutionTask',
            'sysScheduleTestCron':'/tpsgi/platform/schedule/testCron',
            // jobName异步校验是否存在
            'validateJobName': '/tpsgi/platform/schedule/validate_code'
        },
        router: [{
            path: '/sys/schedule/schedule_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{
                path: 'schedule_edit/index',
                name: 'scheduleAppScheduleEdit',
                component: function (resolve) {
                    require.async(['pages/sys/schedule/scheduleApp/pages/scheduleEditIndex'], resolve);
                }
            }, {
                path: 'schedule_view/index',
                name: 'scheduleAppScheduleView',
                component: function (resolve) {
                    require.async(['pages/sys/schedule/scheduleApp/pages/scheduleViewIndex'], resolve);
                }
            }, {
                path: 'schedule_log_view/index',
                name: 'scheduleAppScheduleLog',
                component: function (resolve) {
                    require.async(['pages/sys/schedule/scheduleApp/pages/scheduleLogViewIndex'], resolve);
                }

            }, {
                path: 'schedule_next_runtime',
                name: 'scheduleNextRunTimeApp',
                component: function (resolve) {
                    require.async(['pages/sys/schedule/scheduleApp/pages/scheduleNextRunTime'], resolve);
                }

            }]
        }]
    };
})();
