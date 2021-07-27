/**
 * 国际化注册模块
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var i18n = Vue.gvUtil.replaceToUpperCase(_gc);

  //注册国际化
  Vue.gvUtil.setTranslations("./utils/i18n/sys" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/global" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/index" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/Insurance" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/scheme" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/purchase" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/service" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/policy" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/asset" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/claim" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/pection" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/Issue" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/router" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/application" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/master" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/expense" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/claimmanagement" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/ibnr" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/tool" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/upr" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/payment" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/insureapp" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/inquiryapp" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/batchentryinfoapp" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/ibnr" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/billquery" + i18n + ".json");
  Vue.gvUtil.setTranslations("./utils/i18n/report" + i18n + ".json");
});
