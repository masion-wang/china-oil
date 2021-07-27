/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  // // 引入API
  // let reuqireConfig = require("../index.config.js");
  // let config = reuqireConfig.config;
  // // 注册API
  // Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./adddata.html"),
    name: "adddataApp",
    query: function () {
      return {};
    },
    datas: function () {
      return {
        dialogFormVisible: false, //新增IBNR弹框
        //1. 基础信息
        recognizeeTableList: [],
        // 弹框
        form: {},
      };
    },
    created() {},
    computed: {},
    events: {},
    methods: {},
  });
});
