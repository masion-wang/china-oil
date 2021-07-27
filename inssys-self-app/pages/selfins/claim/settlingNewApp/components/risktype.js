/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
    var config = {
      api: {
        'initPolicyInfo': '/policy/initializePolicyInfo',
        'savePolicyInfo': '/policy/savePolicyInfo',
        'getPolicyInfo': '/policy/getGuPolicyAllInfo',
        'approvalPolicy': '/policy/approvalPolicy',
      },
    }
    Vue.gvUtil.setApi(config.api);
   

    return Vue.gvUtil.Page({
      template: require('./risktype.html'),
      name: 'risktypeApp',
      shareStore: function () {
        return {
          policyInfo: null
        }
      },
      datas: function () { // 双向绑定页面显示数据
        return {
            text: false,
          //折叠窗默认弹开
          activeNames: ['baseInfo', 'paymentPlanInfo', 'docListInfo'],
          //保单基本信息表单项
          

       
        }
      },
      events(){},
      methods:{
  
  
      },
      computed: {
  
      },
  
     
    });
  });