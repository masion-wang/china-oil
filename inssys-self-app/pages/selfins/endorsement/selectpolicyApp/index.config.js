/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require, exports, module) {
  exports.config = {
    api: {
      findProject: "/policySelfMain/findProject", //项目
      findScheme: "/policySelfMain/findScheme", // 方案
      policySelfMainfindList: "/policySelfMain/findRisk", // 原险种
      searchPolicy: "/policySelfMain/findPolicyAllInfo", // 查询接口
    },
  };
});