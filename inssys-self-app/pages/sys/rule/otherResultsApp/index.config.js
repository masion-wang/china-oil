/**
 * 其他结果集管理应用配置
 * @author HuangTianQi
 * @time 2017/12/17
 */
(function () {
    return {
        api: {
            // 获取其他结果集列表
            'otherResultsSearch': '/rule/other_results/list',
            // 获取其他结果集数据(单条)
            'otherResultsFindByPK': '/rule/other_results/find_by_pk/{id}',
            // 更新其他结果集数据
            'otherResultsUpdate': '/rule/other_results/save_or_update/',
            // 添加其他结果集数据
            'otherResultsAdd': '/rule/other_results/save_or_update/',
            // 删除其他结果集数据
            'otherResultsDelete': '/rule/other_results/delete/{id}'
        },
        router: [{
            path: '/sys/rule/other_results_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ //
                path: 'other_results_edit',
                name: 'otherResultsAppOtherResultsEdit',
                component: function (resolve) {
                    require.async(['pages/sys/rule/otherResultsApp/pages/otherResultsEditIndex'], resolve);
                }
            }]
        }]
    }
})();