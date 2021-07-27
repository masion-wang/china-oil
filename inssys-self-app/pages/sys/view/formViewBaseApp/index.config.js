/**
 * 基础表单视图管理应用配置
 * @author HuangTianQi
 * @time 2017/11/17
 */
(function () {
    return {
        api: {
            // 获取基础表单视图列表数据（分页）
            'formViewBaseSearch': '/view/view_object/search',
            // 获取表单视图管理数据(单条)
            'formViewBaseFindByPK': '/view/view_object/find_by_pk/{viewObjectForm}',
            // 更新表单视图管理数据
            'formViewBaseUpdate': '/view/view_object/update/',
            // 保存表单视图管理数据
            'formViewBaseAdd': '/view/view_object/add/',
            // 删除表单视图管理数据
            'formViewBaseDelete': '/view/view_object/delete',
            'validateViewObjectForm': '/view/view_object/validate_code'
        },
        router: [{
            path: '/sys/view/form_view_base_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父库件)
            children: [{ //
                path: 'formViewBaseEditIndex',
                name: 'formViewBaseAppFormViewBaseEdit',
                component: function (resolve) {
                    require.async(['pages/sys/view/formViewBaseApp/pages/formViewBaseEditIndex'], resolve);
                }
            }]
        }]
    }
})();
