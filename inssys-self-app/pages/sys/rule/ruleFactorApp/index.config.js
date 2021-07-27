/**
 * 规则因子管理应用配置
 * @author HuangTianQi
 * @time 2017/11/17
 */
(function () {
    return {
        api: {
            // 获取规则因子列表
            'ruleFactorSearch': '/rule/factor/search',
            // 获取规则因子数据(单条)
            'ruleFactorFindByPk': '/rule/factor/find_by_id/{id}',
            // 更新规则因子数据
            'ruleFactorSaveOrUpdate': '/rule/factor/save_or_update/',
            // 删除规则因子数据
            'ruleFactorDelete': '/rule/factor/delete'
        },
        router: [{
            path: '/sys/rule/rule_factor_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ //
                path: 'rule_factor_edit',
                name: 'ruleFactorApprRuleFactorEdit',
                component: function (resolve) {
                    require.async(['pages/sys/rule/ruleFactorApp/pages/ruleFactorEditIndex'], resolve);
                }
            }]
        }]
    }
})();
