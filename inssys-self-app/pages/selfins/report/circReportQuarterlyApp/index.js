/**
 * 赔案统计表
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      reportquarterQueryExport: "/report/quarterQueryExport", //查询
      reportR005: "/report/query/R005", //导出excel
      // claimStatisticsfindlist: "/ggCode/findList", //原保险人码表
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "claimStatisticsApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        riskCodeLiOption: [],
        table: {
          basic: {
            api: "reportquarterQueryExport", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            execlAll: {
              isShow: false,
              fileName: "testExecl",
              exclude: ["operation"],
            }, //后端导出
          },
          search: {
            currency: "HKD",
            startReportDate: "",
            endReportDate: "",
            unitOfReport: "Thousands of Dollars", //报表编号（R008）
            reportCode: "R005",
          },
          fields: [
            {
              labelKey: "Gross Premiums", //Registration
              prop: "cilGrossPremium",
            },
            {
              labelKey: "Net Premiums", //Risk Code
              prop: "retentionPremium",
            },
            {
              labelKey: "Net Earned Premiums", //
              prop: "netEarnedPremiums",
              // width: "180px",
            },
            {
              labelKey: "Gross Commissions Payable", //
              prop: "cCommission",
            },
            {
              labelKey: "Net Commissions Payable",
              prop: "netCommissionsPayable",
              width: "150px",
            },
            {
              labelKey: "Gross Claims Paid", //
              prop: "grossClaimsPaid",
            },
            {
              labelKey: "Net Claims Paid", //Description
              prop: "netClaimsPaid",
            },
            {
              labelKey: "Net Claims Incurred", //
              prop: "netClaimsIncurred",
            },
            {
              labelKey: "Unexpired Risks Adjustment",
              prop: "unexpiredRisksAdjustment",
            },
            {
              labelKey: "Management Expenses", //
              prop: "managementExpenses",
            },
            {
              labelKey: "Unearned Premiums", //
              prop: "unearnedPremiums",
            },
            {
              labelKey: "Unexpired Risks", //
              prop: "unexpiredRisksH",
            },
            {
              labelKey: "Net Outstanding Claims Provision",
              prop: "netOutstandingClaimsProvision",
            },
            {
              labelKey: "Unearned Premiums", //
              prop: "jUnearnedPremiums",
            },
            {
              labelKey: "Unexpired Risks", //
              prop: "unexpiredRisksK",
            },
            {
              labelKey: "Net Outstanding Claims Provision", //
              prop: "lNetOutstandingClaimsProvision",
            },
            {
              labelKey: "Net Premiums for 4 Quarters up to", //
              prop: "netPremiumsForFourQuartersUpTo",
            },
          ],
        },
        options: [
          {
            value: "Thousands of Dollars",
            label: "Thousands of Dollars",
          },
          {
            value: "Dollar",
            label: "Dollar",
          },
        ],
      };
    },
    created() {
      this.nowTime();
      // this.edingCoList();
    },
    events: {},
    methods: {
      // 导出excel
      onExportAllExcel(type) {
        this.exportExcel();
      },
      // 导出
      exportExcel() {
        let params = {
          currency: this.$refs.table.fromFilters.currency,
          startReportDate: this.$refs.table.fromFilters.startReportDate,
          endReportDate: this.$refs.table.fromFilters.endReportDate,
          unitOfReport: this.$refs.table.fromFilters.unitOfReport, //报表编号（R008）
          reportCode: "R005",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "reportR005",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "保监报表-季度.xlsx");
          });
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "reportR005",
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
            Vue.gvUtil.resolveBlob(res, "赔案统计表.xlsx");
          });
      },
      // 选择保险险种-自保险种
      changeschemeName2() {},
      //险种码表
      edingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "claimStatisticsfindlist",
          contextName: "selfins",
        });
        let obj = {
          codeType: "RiskType",
        };

        Vue.gvUtil.http.post(url, obj).then((res) => {
          this.riskCodeLiOption = res.resData.ggCodeVoList.RiskType;
        });
      },
      onListBtn(row, type) {},
      // 查询前校验
      beforeValidate(data) {
        if (data.startReportDate && data.endReportDate) {
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
        this.table.search.startReportDate = "01" + "-" + "01" + "-" + year;
      },
      //如果选择了all其他消失
      changeriskcode(s, data) {
        if (s.length > 0) {
          if (s.includes("All")) {
            var searchObj = this.$refs.table.getSearchVal();

            if (data == "riskCodeList") {
              searchObj.riskCodeList = ["All"];
            }

            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
    },
  });
});
