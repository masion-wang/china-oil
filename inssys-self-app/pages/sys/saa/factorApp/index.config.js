/**
 * 数据权限管理应用配置
 * @author 孙恬静
 * @time 2017/11/20
 */
(function () {
    return {
        api: {
            // 获取数据权限列表数据（分页）
            'sysFactorSearch': '/saa/factor/search',
            // 获取数据权限数据
            'sysFactorFindByPk': '/saa/factor/find_by_pk/{factor_code}',
            // 增加功能
            'sysFactorAdd': '/saa/factor/add',
            // 更新功能
            'sysFactorUpdate': '/saa/factor/update',
            // 删除功能
            'sysFactorDelete': '/saa/factor/delete',
            // 获取授权列表
            'sysUserPowerSearch': '/saa/user_power/search',
            // 根据table加载对应的tree
            'treeSearch': '/saa/factor/tree',
            // 根据id查找授权数据
            'sysPowerFindById': '/saa/user_power/find_by_id/{id}',
            // 授权数据添加
            'sysPowerAdd': '/saa/user_power/add',
            // 授权数据更新
            'sysPowerUpdate': '/saa/user_power/update',
            // 删除授权数据
            'sysPowerDelete': '/saa/user_power/delete/{id}',
            'validateFactorCode': '/saa/factor/validate_code'
        },
        router: [{
            path: '/sys/saa/factor_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [{ // 数据权限管理
                path: 'factor_edit/index',
                name: 'factorAppFactorEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/factorApp/pages/factorEditIndex'], resolve);
                }
            }]
        }]
    }
})();
