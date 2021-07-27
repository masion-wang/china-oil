/**
 * 功能管理应用配置
 * @author 王松
 * @time 2020/10/21
 */
// define(function (require, exports, module) {
//   exports.config = {
//     api: {
//       policySelfMainfindList: "/policySelfMain/findList", //下拉值
//       findGpBillMainPayable:'/gpbillmain/findGpBillMainPayable', // 应收应付分页查询
//       findGpBillDetails:'/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
//       findfeetypecode:'guFeetype/findfeetypecode'// 单据类型
//     },
//   };
// });
(function () {
  return {
    api: {
      policySelfMainfindList: "/policySelfMain/findList", //下拉值
      findGpBillMainPayable:'/gpbillmain/findGpBillMainPayable', // 应收应付分页查询
      findGpBillDetails:'/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
      findfeetypecode:'guFeetype/findfeetypecode'// 单据类型
    },
    router: [{
      path: '/pection/pectionc_task_app',
      component: Vue.gvUtil.getComponents('Home')
    }]

  }
})();