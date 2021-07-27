/**
 * 规则维护应用配置
 * @author HuangTianQi
 * @time 2017/12/11
 */
(function () {
    return {
        api: {
            // 获取规则列表(分页)
            'ruleSearch': '/rule/search',
            // 获取规则数据(单条)
            'ruleFindByPk': '/rule/find_by_id/{id}',
            // 添加或更新规则数据
            'ruleAddOrUpdate': '/rule/save_or_update',
            // 删除规则数据
            'ruleDelete': '/rule/delete',
            // 获取规则信息、装配列表、规则因子列表
            'ruleFactorAssemble': '/rule/rule_factor_assemble/find_by_id/{id}',
            // 获取规则列表(条件)
            'ruleFindList': '/rule/list',
            // 获取规则因子列表(条件)
            'ruleBaseFactorFindList': '/rule/factor/list'
        },
        router: [{
            path: '/sys/rule/rule_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'rule_edit',
                name: 'ruleAppRuleEdit',
                component: function (resolve) {
                    require.async(['pages/sys/rule/ruleApp/pages/ruleEditIndex'], resolve);
                }
            }]
        }]
    }
})();
