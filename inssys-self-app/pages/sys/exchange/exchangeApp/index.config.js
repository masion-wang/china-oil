/**
 * 通过币别查询兑换率应用配置
 * @author liguolong
 * @time 2018/9/29
 */
(function () {
    return {
        api: {
            // 币种查询汇率
            'findExchangeList': '/gg_exchange/find_exchange_list',
            // 
            'addExchange': '/gg_exchange/add_exchange',
           
            	
        },
        router: [{
            path: '/sys/exchange_management/exchange_inquiry_app', // 父路径，与大模块名字一致
            component: Vue.gvUtil.getComponents('Home'), // 固定写法(父组件)
            children: [ { // 新增汇率
                path: 'add_exchange/index',
                name: 'exchangeInquiryAppAdd',
                component: function (resolve) {
                    require.async(['pages/sys/exchange/exchangeApp/pages/addExchangeIndex'],resolve);
                }
            }]
        }]
    }
})();