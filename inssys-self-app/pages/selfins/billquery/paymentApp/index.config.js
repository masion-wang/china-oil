/**
 * 功能管理应用配置
 * @author 王松
 * @time 2020/10/21
 */
(function () {
  return {
    api: {
      policySelfMainfindList: "/policySelfMain/findList", //下拉值
      findGpBillMain: '/gpbillmain/findGpBillMain', // 实收实付查询分页
      findGpBillDetails:'/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
      findfeetypecode:'/guFeetype/findfeetypecode',// 单据类型
      findBybusinessNo:'/gpbillmain/findBybusinessNo' // 业务号
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
//       policySelfMainfindList: "/policySelfMain/findList", //下拉值
//       findGpBillMain: '/gpbillmain/findGpBillMain', // 实收实付查询分页
//       findGpBillDetails:'/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
//       findfeetypecode:'/guFeetype/findfeetypecode',// 单据类型
//       findBybusinessNo:'/gpbillmain/findBybusinessNo' // 业务号
//     },
//   };
// });