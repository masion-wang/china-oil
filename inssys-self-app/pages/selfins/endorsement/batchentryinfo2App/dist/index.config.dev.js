"use strict";

/**
 * 保单录入应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
// define(function (require, exports, module) {
//   exports.config = {
//     api: {
//       // 回显数据
//       add: '/policySelfMain/add', // 保存接口
//       submit: '/policySelfMain/submit', // 提交接口
//       calculateItems: '/policySelfMain/calculateItems', // 标的重新计算
//       calculateInstalment: '/guinstallmain/calculateInstalment', // 分期计算
//       // 查询子组件
//       findProject: "/policySelfMain/findProject", //项目
//       findScheme: "/policySelfMain/findScheme", // 方案
//       policySelfMainfindList: "/policySelfMain/findRisk", // 原险种
//       searchPolicy: "/policySelfMain/findPolicyAllInfo", // 查询接口
//       exportItemExcel: '/policyItemMain/exportItemExcel', // excel导出
//       importItemExcel: '/policyItemMain/importItemExcel', // excel导入
//       importClauseExcel: '/guPolicyClause/importClauseExcel', // 条款导入
//       findDetail: '/ggRisk/findDetail', // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
//       findExchange: '/ggCode/findExchangeRate', // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
//       findReinsurerList: '/policySelfMain/findReinsurerList', // 再保人
//       findUserList: '/policySelfMain/findUserList', // 经办人 承包人
//       getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //保单详情接口
//       UserInfo: '/User/UserInfo', // 获取用户信息
//       verify: '/policySelfMain/verify', // 审核接口
//       getList: "/document/getList", //查打印列表
//       printPDF: '/PDF/printPDF', // 下载pdf 
//     },
//   };
// });
// */
(function () {
  return {
    api: {
      // 回显数据
      add: '/policySelfMain/add',
      // 保存接口
      submit: '/policySelfMain/submit',
      // 提交接口
      calculateItems: '/policySelfMain/calculateItems',
      // 标的重新计算
      calculateInstalment: '/guinstallmain/calculateInstalment',
      // 分期计算
      // 查询子组件
      findProject: "/policySelfMain/findProject",
      //项目
      findScheme: "/policySelfMain/findScheme",
      // 方案
      policySelfMainfindList: "/policySelfMain/findRisk",
      // 原险种
      searchPolicy: "/policySelfMain/findPolicyAllInfo",
      // 查询接口
      exportItemExcel: '/policyItemMain/exportItemExcel',
      // excel导出
      importItemExcel: '/policyItemMain/importItemExcel',
      // excel导入
      importClauseExcel: '/guPolicyClause/importClauseExcel',
      // 条款导入
      findDetail: '/ggRisk/findDetail',
      // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
      findExchange: '/ggCode/findExchangeRate',
      // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
      findReinsurerList: '/policySelfMain/findReinsurerList',
      // 再保人
      findUserList: '/policySelfMain/findUserList',
      // 经办人 承包人
      getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo",
      //保单详情接口
      UserInfo: '/User/UserInfo',
      // 获取用户信息
      verify: '/policySelfMain/verify',
      // 审核接口
      getList: "/document/getList",
      //查打印列表
      printPDF: '/PDF/printPDF' // 下载pdf 

    },
    router: [{
      path: '/pection/pectionc_task_app',
      component: Vue.gvUtil.getComponents('Home')
    }]
  };
})();