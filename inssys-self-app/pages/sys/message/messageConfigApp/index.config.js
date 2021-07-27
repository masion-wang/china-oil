/**
 * 消息
 * @author 黄景华
 * @time 2018/01/17
 */
(function () {
    return {
        api: {
            'findGgMessageConfigList': '/gg_message/find_ggmessageconfig_list',
            'saveGgMessageConfig': '/gg_message/save_ggmessageconfig',
            'updateGgMessageConfig': '/gg_message/update_ggmessageconfig',
            'findGgMessageConfigVoByPk': '/gg_message/find_ggmessageconfigvo_by_pk/{messageCode}',
            'messageConfigDelete': '/gg_message/message_config/delete',
            'sysSendMessage': '/gg_message/sendByMessageCode/{messageCode}',
            'messageConfigPreview': '/gg_message/message_config/preivew/{messageCode}',
            'validateMessageCode': '/gg_message/message_config/validate_code'
        },
        router: [{
            path: '/sys/message/message_config_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'message_config_edit/index',
                name: 'messageConfigAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/message/messageConfigApp/pages/messageConfigEditIndex'], resolve);
                }
            }]
        }, {
            path: '/sys/message/message_config_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'message_config_preview/index',
                name: 'messageConfigAppPreview',
                component: function (resolve) {
                    require.async(['pages/sys/message/messageConfigApp/pages/messageConfigPreviewIndex'], resolve);
                }
            }]
        }]
    }
})();
