/**
 * 拟承保项目基本情况表
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      // queryOutStand: "/ibnrMain/queryOutStand", //查询
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "proposedUnderwritingApp",
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
            showSequenceNum: false, //序号
            execlAll: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["operation"],
            }, //后端导出
          },
          search: {
            positionDate: "",
            currency: "",
            riskCode: "",
          },
          fields: [
            {
              labelKey: "proposalProjectName", //项目名称
              prop: "registration",
            },
            {
              labelKey: "年度的统计范围", //年度的统计范围
              prop: "policyNo",
            },
            {
              labelKey: "policyNo", //保单号码
              prop: "version",
            },
            {
              labelKey: "项目地点", //项目地点
              prop: "riskClass",
            },
            {
              labelKey: "PeriodFrom", //保险起期
              prop: "riskCode",
            },
            {
              labelKey: "PeriodTo", //保险止期
              prop: "oIncurredLoss",
            },
            {
              labelKey: "riskCode", //险种
              prop: "oSettled",
            },
            {
              labelKey: "保费规模", //"保费规模"
              prop: "osReceivable",
            },
            {
              labelKey: "保费费率", //保费费率
              prop: "oosSum",
            },
            {
              labelKey: "赔偿限额", //赔偿限额
              prop: "netOsSum",
            },
            {
              labelKey: "单一最大风险值", //单一最大风险值
              prop: "netOsSum",
            },
            {
              labelKey: "免赔额情况", //免赔额情况
              prop: "oSettled",
            },
            {
              labelKey: "zbfrontendcompany", //"前端公司"
              prop: "osReceivable",
            },
            {
              labelKey: "再保手续费", //再保手续费
              prop: "oosSum",
            },
            {
              labelKey: "条款变动情况", //条款变动情况
              prop: "netOsSum",
            },
            {
              labelKey: "除外责任", //除外责任
              prop: "netOsSum",
            },
            {
              labelKey: "近五年赔付率", //近五年赔付率
              prop: "netOsSum",
            },
            {
              labelKey: "安全管理体系及执行情况", //安全管理体系及执行情况
              prop: "oSettled",
            },
            {
              labelKey: "风险管理应急处置管理能力", //风险管理应急处置管理能力
              prop: "osReceivable",
            },
            {
              labelKey: "对承包商培训体系及执行情况", //对承包商培训体系及执行情况
              prop: "oosSum",
            },
            {
              labelKey: "承包商作业资质持有情况", //承包商作业资质持有情况
              prop: "netOsSum",
            },
            {
              labelKey: "经纪人信息", //经纪人信息
              prop: "netOsSum",
            },
          ],
        },
      };
    },
    created() {
      this.nowTime();
    },
    events: {},
    methods: {
      onListBtn(row, type) {},
      // 查询前校验
      beforeValidate(data) {
        if (data.lossDateTimeStart && data.lossDateTimeEnd) {
          return true;
        } else {
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
          return false;
        }
      },
      nowTime() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month =
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
        var day =
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        this.table.search.lossDateTimeEnd = day + "-" + month + "-" + year;
        this.table.search.lossDateTimeStart =
          day + "-" + month + "-" + (year - 1);
      },
      onExportAllExcel() {},
    },
  });
});
