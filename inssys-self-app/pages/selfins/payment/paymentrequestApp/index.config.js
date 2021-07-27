/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
(function () {
  return {
    api: {
      findGpPayment:'/gppayment/findGpPayment', // 付款申请
      addGpPayment:'/gppayment/addGpPayment'  // 新增接口
    },
    router: [{
      path: '/pection/pectionc_task_app',
      component: Vue.gvUtil.getComponents('Home')
    }]

  }
})();
// define(function (require, exports, module) {
//   exports.config = {
//     api: {
//       findGpPayment:'/gppayment/findGpPayment', // 付款申请
//       addGpPayment:'/gppayment/addGpPayment'  // 新增接口
//     },
//   };
// });
