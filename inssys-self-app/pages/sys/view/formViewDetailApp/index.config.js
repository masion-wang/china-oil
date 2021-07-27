/**
 * 详细表单视图管理应用配置
 * @author HuangTianQi
 * @time 2017/11/17
 */
(function () {
    return {
        api: {
            // 获取详细表单视图列表数据（分页）
            'formViewDetailSearch': '/view/view_object_ele/search',
            // 获取详细表单视图管理数据(单条)
            'formViewDetailFindByPK': '/view/view_object_ele/find_by_pk/{id}',
            // 更新详细表单视图管理数据
            'formViewDetailUpdate': '/view/view_object_ele/update/',
            // 保存详细表单视图管理数据
            'formViewDetailAdd': '/view/view_object_ele/add/',
            // 删除详细表单视图管理数据
            'formViewDetailDelete': '/view/view_object_ele/delete'
        },
        router: [{
            path: '/sys/view/form_view_detail_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父库件)
            children: [{ //
                path: 'formViewDetailEditIndex',
                name: 'formViewDetailAppFormViewDetailEdit',
                component: function (resolve) {
                    require.async(['pages/sys/view/formViewDetailApp/pages/formViewDetailEditIndex'], resolve);
                }
            }]
        }]
    }
})();
