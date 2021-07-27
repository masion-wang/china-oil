/**
 * 消息
 * @author 黄景华
 * @time 2018/01/17
 */
(function () {
    return {
        api: {
            // "findGgMessageModelList":"/gg_message/find_ggmessagemodel_list",
            //
            //
            'findMQMessageList': '/gg_message/find_mqmessage_list',
            'findMQMessageVo': '/gg_message/viewMQMessage/{messageId}',
            'resendMQMessage': '/gg_message/resendMQMessage'
        },
        router: [{
            path: '/message/mq_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 功能编辑
                path: 'mq_edit/index',
                name: 'mqAppEdit',
                component: function (resolve) {
                    require.async(['pages/sys/message/mqApp/pages/mqEditIndex'], resolve);
                }
            }]
        }]
    }
})();