/**
 * circReportAnnualApp
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  // let reuqireConfig = require("../../insureApp/index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  // Vue.gvUtil.setApi(config.api);
  Vue.gvUtil.setApi({});
  return Vue.gvUtil.Page({
    template: temp,
    name: "circReportAnnualApp",
    components: {},
    props: {},

    datas: function () {
      return {
        tableData: [],
        currentPage: 0,
        pageSize: 10,
        // 查询条件
        table: {},
      };
    },
    created() {},
    mounted() {},
    events: {},
    methods: {
      seachlist() {},
      reset() {},
    },
  });
});
