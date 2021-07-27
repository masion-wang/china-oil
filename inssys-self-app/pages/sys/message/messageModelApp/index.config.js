/**
 * 消息
 * @author 黄景华
 * @time 2018/01/17
 */
(function () {
    return {
        api: {
            'findGgMessageModelList': '/gg_message/find_ggmessagemodel_list',
            'findModelByModelCode': '/gg_message/find_model_by_modelcode/{modelCode}',
            'updateMessageModel': '/gg_message/update_messagemodel',
            'saveMessageModel': '/gg_message/save_ggmessagemodel',
            'messageModelDelete': '/gg_message/message_model/delete',
            'validateModelCode': '/gg_message/message_model/validate_code'
        },
        router: [{
            path: '/sys/message/message_model_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'message_model_edit/index',
                name: 'messageModelAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/message/messageModelApp/pages/messageModelEditIndex'], resolve);
                }
            }]
        }]
    }
})();
