/**
 * 风险检验费
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      seachqueryExport: "/report/queryExport", //查询
      findAllSpecialRisk: "/report/findAllSpecialRisk", //请求险种
      riskquer004: "/report/query/R004", //导出
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "riskInspectionApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        options: [], //险种
        table: {
          basic: {
            api: "seachqueryExport", //分页列表请求api
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
            startReportDate: "",
            endReportDate: "",
            riskCodeList: ["CARD & CARU & ODE & OEE & OOPD & OOPU & MAR"],
            reportCode: "R004",
          },
          fields: [
            {
              labelKey: "riskName", //险种名称
              prop: "riskName",
              showTip: true,
            },
            {
              labelKey: "proposalProjectName", //项目名称
              prop: "projectName",
              showTip: true,
            },
            {
              labelKey: "policyNo", //保单号码：
              prop: "policyNo",
              showTip: true,
            },
            {
              labelKey: "PeriodFrom", //保险起期：
              prop: "effectiveDate",
            },
            {
              labelKey: "PeriodTo", //保险止期：
              prop: "expiryDate",
            },
            {
              labelKey: "zbFrontScale", //前端保费规模：
              prop: "sumPremiumString",
              showTip: true,
            },
            {
              labelKey: "zbShareratio", //分入比例：
              prop: "cilShare",
              showTip: true,
            },
            {
              labelKey: "zbPropRetainedShares", //自留份额比例：
              prop: "proportionRetainedShares",
              showTip: true,
            },
            {
              labelKey: "zbReinsuranceshareratio", //再保份额比例：
              prop: "sumSelfInsuranceRate",
              showTip: true,
            },
            {
              labelKey: "zbIsanyinspectionFee", //是否发生检验费：
              prop: "isHappenFee",
              showTip: true,
            },
            {
              labelKey: "zbReamountofInspeFee", //检验费留存金额：
              prop: "retainedFeeString",
              showTip: true,
            },
            {
              labelKey: "zbAmountfeeAmo", //已摊回检验费金额：
              prop: "amortizedFeeString",
              showTip: true,
            },
            {
              labelKey: "zbAmountofPaidinspeFee", //已摊出检验费金额：
              prop: "spreadOutFeeString",
              showTip: true,
            },
            {
              labelKey: "zbinspectionfeeincurred", //已发生检验费金额：
              prop: "happendFeeString",
              showTip: true,
            },
            {
              labelKey: "zbremainingfee", //剩余检验费金额：
              prop: "remainingFee",
              showTip: true,
            },
          ],
        },
      };
    },
    created() {
      this.nowTime();
      this.riskCreated();
    },
    events: {},
    methods: {
      //如果选择了all其他消失
      changeriskcode(s) {
        if (s.length > 0) {
          if (s.includes("CARD & CARU & ODE & OEE & OOPD & OOPU & MAR")) {
            var searchObj = this.$refs.table.getSearchVal();
            searchObj.riskCodeList = [
              "CARD & CARU & ODE & OEE & OOPD & OOPU & MAR",
            ];
            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
      onListBtn(row, type) {},
      // 查询前校验
      beforeValidate(data) {
        if (data.endReportDate && data.startReportDate) {
          if (
            this.changeTime(data.endReportDate) >=
            this.changeTime(data.startReportDate)
          ) {
            return true;
          } else {
            //止期不能早于起期
            this.$message({
              message: Vue.gvUtil.getInzTranslate(
                "zbenddatacannotearlierstartdate"
              ),
              type: "warning",
            });
            return false;
          }
        } else {
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
          return false;
        }
      },
      //日月年转化年月日
      changeTime(ss) {
        var form_date_value = ss.split("-");
        jie = form_date_value[2].trim().split(" ");
        var targetDate =
          jie[0] + "-" + form_date_value[1] + "-" + form_date_value[0];
        return targetDate;
      },
      //时间
      nowTime() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month =
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
        var day =
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        this.table.search.endReportDate = day + "-" + month + "-" + year;
        this.table.search.startReportDate =
          day + "-" + month + "-" + (year - 1);
      },
      //险种
      riskCreated() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findAllSpecialRisk",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, { riskClass: "RiskInspectionFee" })
          .then((res) => {
            if (res.resCode === "0000") {
              this.options = res.resData;
            }
          });
      },
      // 导出excel
      onExportAllExcel(type) {
        this.downFile(this.$refs.table.fromFilters);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "riskquer004",
          contextName: "selfins",
        });
        let obj = {
          endReportDate: c.endReportDate,
          startReportDate: c.startReportDate,
          riskCodeList: c.riskCodeList,
          isExport: "1",
        };

        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "风险检验费统计表.xlsx");
          });
      },
    },
  });
});
