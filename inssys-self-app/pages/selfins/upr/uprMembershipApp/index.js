/**
 * 会费查询
 * @author 罗丹菱
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      findGoCircFeeInfoPage: "/goCircFee/findGoCircFeeInfoPage", //查询
    },
  };
  // 注册API
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "uprMembershipApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        table: {
          basic: {
            api: "findGoCircFeeInfoPage", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            year: "",
          },
          fields: [
            {
              labelKey: "会费年份", //会费年份
              prop: "year",
            },
            {
              labelKey: "feeType", //费用类型
              prop: "feeType",
            },
            {
              labelKey: "总金额", //总金额
              prop: "currencyAndMoney",
            },
            {
              labelKey: "createdBy", //创建人
              prop: "createdBy",
            },
            {
              labelKey: "modifiedBy", //修改人
              prop: "amendedBy",
            },
            {
              labelKey: "createDate", //创建日期
              prop: "createdDate",
            },
            {
              labelKey: "amendedDate", //修改日期
              prop: "amendedDate",
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  btnKey: "btnModeify", //修改
                  flag: "modeify",
                  type: "btn",
                },
                // {
                //   btnKey: "taskList", //任务列表
                //   flag: "operation",
                //   type: "btn",
                // },
              ],
            },
          ],
        },
      };
    },
    created() {},
    events: {
      initPage() {
        Vue.gvUtil.initTranslation("UPRStatus");
      },
      //新增按钮
      gBtnCreate() {
        Vue.gvUtil.redirectTo({ name: "uprAddMemberApp" });
      },
    },
    methods: {
      onListBtn(row, type) {
        //修改
        if (type == "modeify") {
          Vue.gvUtil.redirectTo({
            name: "uprAddMemberApp",
            query: {
              type: "modeify",
              scoperow: row,
            },
          });
          //任务列表
        } else if (type == "operation") {
        }
      },
    },
  });
});
