/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function() {
    return {
        api: {
            'sysAllMenuSearch': '/menu/find_by_system_code_without_power',
           
        },
        router: [{
            path: '/index/workbench_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'workbench_edit/index',
                name: 'workbenchAppTaskSearch',
                component: function(resolve) {
                    require.async(['pages/index/workbenchApp/pages/workbenchEditIndex'], resolve);
                }
            }, { // 更多消息
                path: 'workbench_more/index',
                name: 'workbenchAppMoreMsg',
                component: function(resolve) {
                    require.async(['pages/index/workbenchApp/pages/workbenchMoreIndex'], resolve);
                }
            }, { // 消息
                path: 'workbench_more_announcement/index',
                name: 'workbenchAppMoreAnnouncementMsg',
                component: function(resolve) {
                    require.async(['pages/index/workbenchApp/pages/workbenchMoreAnnouncementIndex'], resolve);
                }
            }, { // 任务历史轨迹信息
                path: 'workbench_task_history/index',
                name: 'workbenchAppTaskHistory',
                component: function(resolve) {
                    require.async(['pages/index/workbenchApp/pages/taskHistory'], resolve);
                }
            }]
        }]
    }
})();