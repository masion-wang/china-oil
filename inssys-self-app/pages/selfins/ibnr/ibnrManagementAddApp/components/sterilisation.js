/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {},
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./sterilisation.html"),
    name: "sterilisationApp",
    datas: function () {
      return {
        //1. 基础信息
        recognizeeTableList: [],
      };
    },
    created() {},
    computed: {},
    events: {},
    methods: {},
  });
});
