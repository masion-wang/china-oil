/**
 * 全局配置模块
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  // require("./utils/mock/mock").bootstrap();

  return {
    config: {
      authName: "Authorization", //权限Name
      authValue: "Arch6WithCloud", //权限Value
      timeout: 300000, //ajax超时默认时间
      version: _version, //版本号
      islanguage: true, //是否需要语言切换
      maxlength: 30, //帐号最大长度
      // path: "http://inssys-self-gateway-inssys.devapp.cnooc/", //测试环境
      path: "http://selfins.uat.devapp.cnooc/", //UAT环境
    },
    api: {
      uploadGetFileMenus: "/biztype/list",
      uploadGetFileList: "/docinfo/list",
      dpfGetFileList: "/docinfo/list/{bizNo}",
      uploadRemoveFile: "/docinfo/remove",
      uploadAddFile: "/docinfo/add",
      uploadUpdateFile: "/docinfo/update", //影像更新api 2018/07/16 by yml
      layoutMenu: "/tpsgi/jwt/menu",
      layoutAuth: "/jwt/login",
      layoutAuthLogout: "/jwt/logout",
      layoutRefresh: "/jwt/refresh",
      // aaaaaaaaaaaaa: "/gg_code/find_list", //前端码表
      layoutSelectGGCodeList: "/ggCode/findList", //自保码表 自保修改
      layoutSelectGGCodeOtherListMult: "/gg_code/find_other_list_mult",
      layoutSelectGGCodeOtherList: "/gg_code/find_other_list", //码表 other list
      layoutSelectGGCodeOtherList2: "/ggCode/findSupplier", // 自保码表 other list
      layoutDbclickGGCodeList: "/gg_code/find_list_valid_dbclick",
      layoutAutoCompleteGGCodeList: "/gg_code/find_list_valid_auto_complete",
      layoutDbclickGGCodeOtherList: "/gg_code/find_other_list_page",
      layoutDbclickGGCodeOtherListByCode:
        "/gg_code/find_business_list_page_by_code",
      layoutAllMenu: "/menu/find_by_system_code/{platform}", //菜单 自保修改
      layoutFormEngine:
        "/view/get_view_object/{productCode}/{planCode}/{subjectType}",
      layoutFormEngineForm: "/view/get_view_object_form/{formCode}",
      layoutValidationConfig: "/validation/mapping/{voName}",
      layoutDocinfo: "/docinfo/view/{docId}",
      docDetailInfo: "/docinfo/{docId}",
      docDownLoadInfo: "/docinfo/download/{docId}",
      docInfo: "/docinfo/download/",
      getProRisk: "/gu_plan/find_prorisk_list",
      getCommonCode: "/common/ggcode/search", //
      getUserInfo: "/common/searchInfo", // 获取当前用户信息
      getGgExch: "/common/ggexch/search", // 获取兑换率
      comExchCny: "/common/ggexch/cny", // 获取兑换率列表(兑换CNY)
      fileUpload: "/mc_file/upload", // 上传
      fileDown: "/mc_file/download/{fileId}", // 下载
      fileDelete: "/mc_file/deleteById", // 下载
      docSave: "/common/document/save", // 文档资料保存 自保修改
      docRemove: "/common/document/remove", // 文档资料删除 自保修改
      confirmExecotorLast: "/gwWorkbench/moduleLastConfirmExecotor", //开启流程接口
      confirmExecotorInner: "/gwWorkbench/moduleInnerConfirmExecotor", //流程内节点跳转
      getWorkflow: "/gwWorkbench/queryHistory", //轨迹图
      zbgetWorkflow: "/gwWorkbench/queryHistory2", //自保轨迹图
      saaFindTree: "/workbench/findTree",
      // 岗位列表查询
      saaPositionQuery: "/workbench/query",
      // 岗位保存修改
      saaPositionSaveOrUpdate: "/workbench/saveOrUpdate",
      // 岗位查询
      saaPositionFindById: "/workbench/findById/{id}",
      // 岗位删除
      saaPositionDeleteById: "/workbench/deleteById/{id}",
      // 岗位配置保存
      saaPositionSavePositionUser: "/workbench/savePositionUser",
      saaFunType: "/workbench/find_list_v2",
      // 岗位树
      saaFindCompanyTree: "/workbench/findCompanyTree",
      saaRoleQuery: "/workbench/saa_role/query",
      workbenchQueryRemind: "/gwWorkbench/queryRemind",
      workbenchDeleteRemind: "/gwWorkbench/deleteRemindById/{messageId}",
      findGgMessageModelList: "/gg_message/find_ggmessagemodel_list",
      findModelByModelCode: "/gg_message/find_model_by_modelcode/{modelCode}",
      updateMessageModel: "/gg_message/update_messagemodel",
      saveMessageModel: "/gg_message/save_ggmessagemodel",
      messageModelDelete: "/gg_message/message_model/delete",
      validateModelCode: "/gg_message/message_model/validate_code",
    },
    context: {
      config: "config", //(配置中心)
      euraka: "euraka", // (注册中心)
      gateway: "gateway", // (Zuul网关)
      webui: "webui", // (前端工程)
      //filesystem: 'filesystem', // (影像微服务)
      logcenter: "logcenter", // (日志中心)
      schedule: "schedule", // (定时任务)
      report: "report", // (单证报表微服务)
      workflow: "workflow", // (工作流微服务)
      rule: "rule", // (规则引擎微服务)
      // auth: 'http://127.0.0.1:8812/auth', // (权限微服务)
      product: "product",
      selfins: "selfins",
      auth: "system", // (权限微服务)
      monitor: "monitor", // (监控中心)
      admin: "admin", // (监控运维后台UI)
      underwriting: "underwriting", // (承保微服务)
      sales: "sales", // (理赔微服务)
      claims: "clm", // (理赔微服务)
      finance: "finance", // (收付微服务)
      reinsurance: "ri", // (再保微服务)
      common: "common", // （公共服务）
      fs: "fs", // （影像服务）
      qlickview: "qlickview", // (QlickView报表)
      file: "file", //(文件上传)
    },
  };
});
