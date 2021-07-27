/**
 *  保单文档资料列表组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require("./detailed.html"),
    name: "detailedApp",
    params: function () {
      return {};
    },

    datas: function () {
      return {
        currentPage: 0,
        pageSize: 10,
        tableData: [], // 显示的数组
      };
    },
    events: {
      //改变条数
      onHandleSizeChange(val) {
        this.pageSize = val;
        // console.log(`每页 ${val} 条`);
      },
      //改变页数
      onHandleCurrentChange(val) {
        this.currentPage = val;
        // console.log(`当前页: ${val}`);
      },
    },
    methods: {},
  });
});
