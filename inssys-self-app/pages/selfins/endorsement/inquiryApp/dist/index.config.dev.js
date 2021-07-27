"use strict";

/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
// define(function (require, exports, module) {
//   exports.config = {
//     api: {
//       findpolicyselfmain: "/policySelfMain/findPolicySelf", //保批单查询
//     },
//   };
// });
(function () {
  return {
    api: {
      findpolicyselfmain: "/policySelfMain/findPolicySelf" //保批单查询

    },
    router: [{
      path: '/pection/pectionc_task_app',
      component: Vue.gvUtil.getComponents('Home')
    }]
  };
})();