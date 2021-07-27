/**
 * 未决准备金查询
 * @author 罗丹菱
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      queryOutStand: "/ibnrMain/queryOutStand", //查询
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "outStandingApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        table: {
          basic: {
            api: "queryOutStand", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            positionDate: "",
            currency: "",
            riskCode: "",
          },
          fields: [
            {
              labelKey: "ClaimDatezb", //立案日期
              prop: "registration",
              showTip: true,
            },
            {
              labelKey: "policyNo", //保单号
              prop: "policyNo",
              width: "190px",
            },
            {
              labelKey: "endorsementIndex", //批单序号
              prop: "version",
            },
            {
              labelKey: "riskClass", //险类
              prop: "riskClass",
            },
            {
              labelKey: "selfInsurance", //自保险种
              prop: "riskCode",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "RiskType",
              },
            },
            {
              labelKey: "projectPrintName", //项目打印名称
              prop: "project",
            },
            {
              labelKey: "ClaimNo.", //自保赔案号
              prop: "claimNo",
              width: "190px",
            },
            {
              labelKey: "zbLossDateTime", //出险日期
              prop: "lossDate",
              showTip: true,
            },
            {
              labelKey: "zbYearYear", //出险年份
              prop: "yearOfAccident",
            },
            {
              labelKey: "dataSources", //数据来源
              prop: "source",
            },
            {
              labelKey: "zbDescription", //事故描述
              prop: "description",
            },
            {
              labelKey: "zbA/CaDate", //账单日期
              prop: "acDate",
            },
            {
              labelKey: "zbA/CYear", //账单年份
              prop: "acYear",
            },
            {
              labelKey: "zbI-PaidClaim", //账单金额
              prop: "paidClaim",
            },
            {
              labelKey: "zbI-O/SLoss", //分入_未决损失
              prop: "iosLoss",
            },
            {
              labelKey: "zbI-IncurredLoss", //分入_已决金额
              prop: "incurredLoss",
            },
            {
              labelKey: "zbI-Settled", //分入_实付金额
              prop: "settled",
            },
            {
              labelKey: "zbI-O/SPayable", //分入_可支付金额
              prop: "iosPayable",
            },
            {
              labelKey: "zbI-O/SSum", //分入_未决准备金
              prop: "iosSum",
            },
            {
              labelKey: "zbO-PaidClaim", //全损
              prop: "oPaidClaim",
            },
            {
              labelKey: "zbO-O/SLoss", //分出_未决损失
              prop: "oosLoss",
            },
            {
              labelKey: "zbO-IncurredLoss", //分出_已决金额
              prop: "oIncurredLoss",
            },
            {
              labelKey: "zbO-Settled", //分出_实付金额
              prop: "oSettled",
            },
            {
              labelKey: "zbO-O/SReceivable", //分出_应收金额
              prop: "osReceivable",
            },
            {
              labelKey: "zbO-O/SSum", //分出_未决准备金
              prop: "oosSum",
            },
            {
              labelKey: "zbNetO/SSum", //准备金净值
              prop: "netOsSum",
            },
            {
              labelKey: "zbNetPaid", //实付净值
              prop: "netPaid",
            },
          ],
        },
      };
    },
    created() {},
    events: {},
    methods: {
      onListBtn(row, type) {},
    },
  });
});
