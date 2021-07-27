/**
 * 自留份额统计表
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      staqueryExport: "/report/queryExport", //查询
      statisR003: "/report/query/R003", //导出excel
      queryPolicyNameList: "/policySelfMain/queryPolicyNameList ", //项目名称码表
      queryCedingCompanyList: "/policySelfMain/queryCedingCompanyList", //前端公司码表
      queryInsuredList: "/policyItemMain/queryInsuredList", //投保单位码表
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "statisticsRetainSharesApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        insuredlist: [], //投保单位码表
        options: [], //项目名称码表
        CompanyList: [], //前端公司码表
        table: {
          basic: {
            api: "staqueryExport", //分页列表请求api
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
            projectNameList: ["All"], //项目名称
            startReportDate: "", //  起期
            endReportDate: "", // 止期
            insuredList: ["All"], //投保单位（投保人）
            cedingCompanyList: ["All"], //前端公司 (原保险人)
            reportCode: "R003", //报表编号（R003）
          },
          fields: [
            {
              labelKey: "projectName2", //项目名称
              prop: "projectName",
              showTip: true,
            },
            {
              labelKey: "policyNo", //保单号码
              prop: "noAndVersion",
              showTip: true,
            },
            {
              labelKey: "proposalCommonStartDate", //保险起期
              prop: "effectiveDate",
              showTip: true,
            },
            {
              labelKey: "proposalCommonEndDate", //保险止期
              prop: "expiryDate",
              showTip: true,
            },
            {
              labelKey: "续转时间", //续转时间
              prop: "continueDate",
              showTip: true,
            },
            {
              labelKey: "proposalName", //投保单位
              prop: "insured",
              showTip: true,
            },
            {
              labelKey: "zbfrontendcompany", //前端公司
              prop: "cedingCompany",
              showTip: true,
            },
            {
              labelKey: "zbbrokerageagency", //经纪公司
              prop: "reinsurer",
              showTip: true,
            },
            {
              labelKey: "zbAccessshare", //接入份额
              prop: "cilShare",
            },
            {
              labelKey: "zbdefaultYearSelfInsuranceRate", //自留份额
              prop: "defaultYearSelfInsuranceRate",
              showTip: true,
            },
            {
              labelKey: "zbsubtractOneYearCilShare", //-1年接入份额
              prop: "subtractOneYearCilShare",
            },
            {
              labelKey: "zbsubtractOneYearSelfInsuranceRate", //-1年自留份额
              prop: "subtractOneYearSelfInsuranceRate",
            },

            {
              labelKey: "zbyearaccessShare", //-2年接入份额
              prop: "subtractTwoYearCilShare",
            },
            {
              labelKey: "zbYearsShare", //-2年自留份额
              prop: "subtractTwoYearSelfInsuranceRate",
            },
          ],
        },
      };
    },
    created() {
      this.nowTime();
      this.insulist();
      this.queryCedingC();
    },
    events: {
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
        this.list(
          this.table.search.endReportDate,
          this.table.search.startReportDate
        );
      },
      list(end, start) {
        if (end || start) {
          var url = Vue.gvUtil.getUrl({
            apiName: "queryPolicyNameList",
            contextName: "selfins",
          });
          let obj = {
            startReportDate: start,
            endReportDate: end,
          };
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode === "0000") {
              this.options = res.resData;
              var searchObj = this.$refs.table.getSearchVal();
              searchObj.projectNameList = ["All"];
              this.$refs.table.setSearchVal(searchObj);
            }
          });
        } else {
          var searchObj = this.$refs.table.getSearchVal();
          searchObj.projectNameList = [];
          this.options = [];
          this.$refs.table.setSearchVal(searchObj);
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
        }
      },
      insulist() {
        var url = Vue.gvUtil.getUrl({
          apiName: "queryInsuredList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.get(url).then((res) => {
          if (res.resCode === "0000") {
            this.insuredlist = res.resData;
          }
        });
      },
      queryCedingC() {
        var url = Vue.gvUtil.getUrl({
          apiName: "queryCedingCompanyList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.get(url).then((res) => {
          if (res.resCode === "0000") {
            this.CompanyList = res.resData;
          }
        });
      },
      changeprojectNameList(strat, end) {
        if (strat || end) {
        } else {
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
        }
      },
      //如果选择了all其他消失
      changeriskcode(s, data) {
        if (s.length > 0) {
          if (s.includes("All")) {
            var searchObj = this.$refs.table.getSearchVal();
            if (data == "cedingCompanyList") {
              searchObj.cedingCompanyList = ["All"];
            } else if (data == "insuredList") {
              searchObj.insuredList = ["All"];
            } else if (data == "projectNameList") {
              searchObj.projectNameList = ["All"];
            }

            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
    },
    methods: {
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
      // 导出excel
      onExportAllExcel(type) {
        this.downFile(this.$refs.table.fromFilters);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR003",
          contextName: "selfins",
        });
        let obj = {
          endReportDate: c.endReportDate,
          startReportDate: c.startReportDate,
          riskCodeList: c.riskCodeList,
          projectNameList: c.projectNameList, //项目名称
          insuredList: c.insuredList, //投保单位（投保人）
          cedingCompanyList: c.cedingCompanyList, //前端公司 (原保险人)
        };

        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "自留份额统计表.xlsx");
          });
      },
    },
  });
});
