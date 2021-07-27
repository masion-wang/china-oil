/**
 * 赔款支付
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      // queryOutStand: "/ibnrMain/queryOutStand", //查询
      reportfindAllSpecialRisk: "/report/findAllSpecialRisk", //获取险种
      // policySelfMainqueryCedingCompanyList:'/policySelfMain/queryCedingCompanyList', // 获取前端公司
      reportqueryExport: "/report/queryExport", // 分页查询
      reportqueryExportR006: "/report/query/R006", // 导出 post
      policySelfMainqueryCedingCompanyList:
        "/policySelfMain/queryCedingCompanyList", // 前端保险公司
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "indemnityPaymentApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        options: [], //险种
        table: {
          basic: {
            api: "reportqueryExport", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            // execlAll: {
            //   isShow: false,
            //   fileName: "testExecl",
            //   exclude: ["operation"],
            // }, //后端导出
          },
          search: {
            startReportDate: "",
            endReportDate: "",
            riskCodeList: ["All"],
            riskCode: "",
            cedingCompanyList: ["All"],
            reportCode: "R006",
          },
          fields: [
            {
              labelKey: "claimNo", //赔案号
              prop: "claimNo",
            },
            {
              labelKey: "lossTime", //出险时间
              prop: "paidAmountSettledDate",
            },
            {
              labelKey: "出险标的", //出险标的
              prop: "project",
            },
            {
              labelKey: "projectPrintName", //项目打印名称
              prop: "projectName",
            },
            {
              labelKey: "currency", //币别
              prop: "currency",
            },
            {
              labelKey: "zbamountTotal", //赔案总金额
              prop: "amountOfClaims",
            },
            {
              labelKey: "应支付金额", //应支付金额
              prop: "amountToBePaid",
            },
            {
              labelKey: "已支付金额", //已支付金额
              prop: "paidAmountString",
            },
            {
              labelKey: "待支付金额", //待支付金额
              prop: "paidRaminString",
            },
            {
              labelKey: "应摊回金额", //"应摊回金额"
              prop: "amountToBeRecovered",
            },
            {
              labelKey: "已摊回金额", //已摊回金额
              prop: "amountRecovered",
            },
            {
              labelKey: "待摊回金额", //"待摊回金额"
              prop: "recoveredRaminString",
            },
          ],
        },
        insureCompanyArr: [],
      };
    },
    created() {
      this.nowTime();
      this.getRiskCode();
      this.getCompany();
    },
    events: {},
    methods: {
      // 获取前端公司
      getCompany() {
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainqueryCedingCompanyList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.get(url, {}).then((res) => {
          if (res.resCode == "0000") {
            that.insureCompanyArr = res.resData;
          }
        });
      },
      // 获取险种
      getRiskCode() {
        let that = this;
        let params = {
          riskClass: "RiskEnum",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "reportfindAllSpecialRisk",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.options = res.resData;
          }
        });
      },
      //如果选择了all其他消失
      changeriskcode1(s) {
        if (s.length > 0) {
          if (s.includes("All")) {
            var searchObj = this.$refs.table.getSearchVal();
            searchObj.riskCodeList = ["All"];
            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
      changeriskcode2(s) {
        if (s.length > 0) {
          if (s.includes("All")) {
            var searchObj = this.$refs.table.getSearchVal();
            searchObj.cedingCompanyList = ["All"];
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
      onExportAllExcel() {
        let params = {
          startReportDate: this.table.search.startReportDate,
          endReportDate: this.table.search.endReportDate,
          riskCodeList: this.table.search.riskCodeList,
          cedingCompanyList: this.table.search.cedingCompanyList,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "reportqueryExportR006",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "excel.xlsx");
          });
      },
      exportExcel() {
        let params = {
          startReportDate: this.$refs.table.fromFilters.startReportDate,
          endReportDate: this.$refs.table.fromFilters.endReportDate,
          riskCodeList: this.$refs.table.fromFilters.riskCodeList,
          cedingCompanyList: this.$refs.table.fromFilters.cedingCompanyList,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "reportqueryExportR006",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "赔案支付表.xlsx");
          });
      },
    },
  });
});
