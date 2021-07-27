/**
 * 文档管理
 * @author luozhangli
 * @time 2018/11/28
 */
(function () {
    return {
        api: {
            //分页查询
           'searchDocument': '/gg_document_define/search_document',
           //根据documentCode查询
           'findByDocumentCode':'/gg_document_define/find_by_document_code/{documentCode}',
           //根据documentName查询
           'findByDocDefineName': '/gg_document_define/find_document_name/{documentName}',
           //新增
           'saveDocDefine': '/gg_document_define/save',
           //修改
           'updateDocDefine': '/gg_document_define/update',
           //根据formCode查询
           'findformByCode': '/ggFormDefine/find_form_by_code/{formCode}',
           //根据documentCode查询
           'findByDocCode': '/gg_form_define/find_by_document_code/{documentCode}',
            	
        },
        router: [{
            path: '/sys/document/document_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [ { // 新增文档
                path: 'document_edit/index', //路由路径
                name: 'documentEditApp', //路由别名
                component: function (resolve) {
                    require.async(['pages/sys/document/documentApp/pages/documentEditIndex'],resolve);
                }
            }]
        }]
    }
})();