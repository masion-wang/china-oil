/**
 * 功能管理应用配置
 * @author 陈柱良
 * @time 2017/11/01
 */

(function () {
  return {
    api: {
      //查询项目信息
      findGcClaimMainSelf: "/gcClaimMainSelf/findGcClaimMainSelf", //查询
      reopen: "/gcClaimMainSelf/reopen", //重开
      logOutAndRecovery: "/gcClaimMainSelf/logOutAndRecovery", //注销/恢复
      close: "/gcClaimMainSelf/close", //结案
      queryNotification: "/claim/notification/findByPK", //原单赔案
    },
  };
})();
