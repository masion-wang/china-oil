/**
 * 未决准备金查询
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  let reuqireConfig = require("./index.config.js");
  let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "outStandingApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        table: {
          basic: {
            api: "findGcClaimMainSelf", //分页列表请求api
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
          search: {},
          fields: [
            {
              labelKey: "立案日期", //立案日期
              prop: "",
            },
            {
              labelKey: "policyNo", //保单号
              prop: "",
            },
            {
              labelKey: "endorsementIndex", //批单序号
              prop: "",
            },
            {
              labelKey: "riskClass", //险类
              prop: "",
            },
            {
              labelKey: "selfInsurance", //自保险种
              prop: "",
            },
            {
              labelKey: "projectPrintName", //项目打印名称
              prop: "",
            },
            {
              labelKey: "自保赔案号", //自保赔案号
              prop: "",
            },
            {
              labelKey: "出险日期", //出险日期
              prop: "",
            },
            {
              labelKey: "出险年份", //出险年份
              prop: "",
            },
            {
              labelKey: "数据来源", //数据来源
              prop: "",
            },
            {
              labelKey: "事故描述", //事故描述
              prop: "",
            },
            {
              labelKey: "账单日期", //账单日期
              prop: "",
            },
            {
              labelKey: "账单年份", //账单年份
              prop: "",
            },
            {
              labelKey: "账单金额", //账单金额
              prop: "",
            },
            {
              labelKey: "分入_未决损失", //分入_未决损失
              prop: "",
            },
            {
              labelKey: "分入_已决金额", //分入_已决金额
              prop: "",
            },
            {
              labelKey: "分入_实付金额", //分入_实付金额
              prop: "",
            },
            {
              labelKey: "分入_可支付金额", //分入_可支付金额
              prop: "",
            },
            {
              labelKey: "分入_未决准备金", //分入_未决准备金
              prop: "",
            },
            {
              labelKey: "全损", //全损
              prop: "",
            },
            {
              labelKey: "分出_未决损失", //分出_未决损失
              prop: "",
            },
            {
              labelKey: "分出_已决金额", //分出_已决金额
              prop: "",
            },
            {
              labelKey: "分出_实付金额", //分出_实付金额
              prop: "",
            },
            {
              labelKey: "分出_应收金额", //分出_应收金额
              prop: "",
            },
            {
              labelKey: "分出_未决准备金", //分出_未决准备金
              prop: "",
            },
            {
              labelKey: "准备金净值", //准备金净值
              prop: "",
            },
            {
              labelKey: "实付净值", //实付净值
              prop: "",
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
    },
    methods: {
      onListBtn(row, type) {},
    },
  });
});
