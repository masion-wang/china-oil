/**
 * 费用录入应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require, exports, module) {
  exports.config = {
    api: {
      deletebypK: "/guPolicyFee/deletebypK", //根据id删除费用信息（post）
      updatebypolicyfee: "/guPolicyFee/updatebypolicyfee", //费用保存接口，带出时
      findByPeriod: "/guinstallmain/findByPeriod", //费用分期接口
      // getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //费用页面基本数据接口
      addInstallment: "/guinstallmain/addInstallment", //分期保存接口
      getList: "/document/getList", //查打印列表
    },
  };
});
