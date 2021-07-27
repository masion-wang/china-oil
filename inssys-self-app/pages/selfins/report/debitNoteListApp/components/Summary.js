/**
 *  保单文档资料列表组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require("./Summary.html"),
    name: "SummaryApp",
    params: function () {
      return {};
    },

    datas: function () {
      return {
        currentPage: 0,
        pageSize: 10,
        tableData: [
          {
            cc: "mingxi",
          },
        ], // 显示的数组
      };
    },
    events: {},
    methods: {},
  });
});
