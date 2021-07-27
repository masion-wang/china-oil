/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      pagetWorkNext: "/gcClaimMainSelf/getWorkNext", //工作流弹框
    },
  };
  Vue.gvUtil.setApi(config.api);

  return Vue.gvUtil.Page({
    template: require("./workflow.html"),
    name: "workflow",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
      };
    },
    events: {
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          return this.checkboxGroup;
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.filter("translate")("zbseleoneoprat"));
        }
      },
    },
    methods: {},
  });
});
