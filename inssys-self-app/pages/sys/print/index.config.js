/**
 * 打印文档应用配置
 * @author 刘欢
 * @time 2018/01/26
 */
(function () {
    return {
        api: {
            "send_email":"/gg_message/message_config/send_email",
            "publicUpload": "/tpsgi/print/publicUpload"
        },
        router: [{
            path     : '/sys/print/print_app',
            component: Vue.gvUtil.getComponents('Home'),
            children : [{ // 功能管理
                path     : '/email',
                name     : 'printEmailApp',
                component: function (resolve) {
                    require.async(['pages/sys/print/email/index'], resolve);
                }
            }
            ]
        }]
    };
})();

