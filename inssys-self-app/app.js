/**
 * 启动应用模块
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  require("./dist/js/main");
  require("./utils/i18n/index");
  // var uploadFile = require('./pages/product/ins_service/servicePamphlet/components/filedateInfo')
  var config = require("./app.config");
  Vue.gvUtil.setContext(config.context);
  Vue.gvUtil.setApi(config.api);
  Vue.gvUtil.setConfig(config.config);
  // 注册路由
  Vue.gvUtil.addRoutes(require("./app.router"), true);

  require.async("./dist/js/locale/lang/{locale}.min.js", function () {
    if (_gc !== "zh") {
      ELEMENT.locale(ELEMENT.lang.en);
    } else {
      ELEMENT.locale(ELEMENT.lang.zhCN);
    }
  });

  Vue.use(ELEMENT);
  Vue.i18n.add("i18", Vue.gvUtil.getTranslations());
  Vue.i18n.set("i18");
  // Vue.component('upload-file', uploadFile);
  // console.log(window)
  var router = new VueRouter({
      history: true,
      routes: Vue.gvUtil.getRouter(),
    }),
    store = Vue.gvUtil.getStore();
  router.beforeEach(function (to, from, next) {
    // NProgress.start();
    store.commit("PAGE_LOADING", true);
    var user = JSON.parse(sessionStorage.getItem("user")),
      menuFlag = Vue.gvUtil.getMenuFlag(),
      _title = "";
    if (opener && to.name) {
      _title +=
        Vue.gvUtil.getInzTranslate(
          "rou" + Vue.gvUtil.replaceToUpperCase(to.name)
        ) + " - ";
    } else {
      // _title += Vue.gvUtil.getInzTranslate('rouHome') + ' - ';
      _title += Vue.gvUtil.getInzTranslate("systemTitle");
    }
    // _title += Vue.gvUtil.getInzTranslate('gSysTitle');
    $("#sys_title").html(_title);
    if (!user && to.path !== "/login") {
      next({ path: "/login" });
    } else if (user && to.path === "/login") {
      next({ path: "/" });
    } else if (user && !menuFlag && to.path !== "/") {
      sessionStorage.setItem(
        "menuValueSearch",
        Vue.gvUtil.getSearchString(window.location.hash)
      );
      sessionStorage.setItem("menuValue", to.path);
      next({ path: "/" });
    } else {
      if (Vue.gvUtil.getMenusForKey(to.path)) {
        // sessionStorage.setItem('menuValue', to.path)
        next();
      } else {
        next({ path: "/error" });
      }
    }
    // NProgress.done();
  });
  router.afterEach(function () {
    // window.scrollTo(0,0);
    $("html, body").animate({ scrollTop: 0 }, 500);
    setTimeout(function () {
      store.commit("PAGE_LOADING", false);
    }, 300);
  });
  app = new Vue({
    el: "#app",
    router: router,
    store: store,
    computed: {
      loading: function () {
        return this.$store.state.loading;
      },
    },
    created: function () {
      Vue.gvUtil.setRouterObject(this.$router);
    },
  });

  var $eventBus = new Vue();
  Vue.prototype.$eventBus = $eventBus;
});
