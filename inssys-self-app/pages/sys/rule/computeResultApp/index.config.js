/**
 * 计算项目结果集管理应用配置
 * @author HuangTianQi
 * @time 2017/11/17
 */
(function () {
    return {
        api: {
            // 获取计算项目结果集列表
            'computeResultsSearch': '/rule/compute_results/list',
            // 获取计算项目结果集数据(单条)
            'computeResultsFindByPK': '/rule/compute_results/find_by_pk/{id}',
            // 更新计算项目结果集数据
            'computeResultsUpdate': '/rule/compute_results/save_or_update/',
            // 添加计算项目结果集数据
            'computeResultsAdd': '/rule/compute_results/save_or_update/',
            // 删除计算项目结果集数据
            'computeResultsDelete': '/rule/compute_results/delete/{id}'
        },
        router: [{
            path: '/sys/rule/compute_results_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ //
                path: 'compute_results_edit',
                name: 'computeResultAppComputeResultEdit',
                component: function (resolve) {
                    require.async(['pages/sys/rule/computeResultApp/pages/computeResultEditIndex'], resolve);
                }
            }]
        }]
    }
})();