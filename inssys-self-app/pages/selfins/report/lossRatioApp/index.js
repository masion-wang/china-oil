/**
 * lossRatioApp
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      lossgetStatisExport: "/report/queryExport", //查询
      statisR013: "/report/query/R013", //导出excel
      lossgetReportTitle: "/policySelfMain/getReportTitle", //查询title
      findLossRationSearch: "/gcClaimMainSelf/findLossRationSearch", //赔付率查询条件
      loosclaimStatisticsfindlist: "/ggCode/findList", //原保险人码表
      losscodesuppli: "/ggCode/findSupplier", //投保单位
    },
  };
  Vue.gvUtil.setApi(config.api);
  var { configHeadList } = require("./headConfig");
  return Vue.gvUtil.Page({
    template: temp,
    name: "lossRatioApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        totalTableData: 0, //总数
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        fromFiltersEx: {
          name: "",
          remarks: "",
        },
        insuredListOption: [], //投保单位
        projectNameListOption: [], //项目名称
        uwyearListOption: [], //年度
        riskCodeLiOption: [], //自保险种
        cols: [],
        optionsFieldsEx: [],
        dialogFormVisible: false, //过滤器
        dialogTableVisible: false,
        cacheFieldsEx: {},
        filterEx: "",
        commonList: {
          reportCode: "R013", //报表编号（R001）
          startReportDate: "",
          endReportDate: "",
          type: "",
          projectNameList: [],
          riskCodeList: [], // 险种
          insuredList: [], // 投保人
          policyNoList: [], // 保单号
          uwyearList: [], // 年度
        },
        assetHeadList: [], // 表头数据
        result: [],
        options: [
          {
            value: "project",
            label: "按项目",
          },
          {
            value: "insuer",
            label: "按投保单位",
          },
          {
            value: "policyNo",
            label: "按保单",
          },
          {
            value: "uwYear",
            label: "按承保年度",
          },
          {
            value: "riskCode",
            label: "按险种",
          },
        ], //统计方式
        dis: false,
      };
    },

    created() {
      this.nowTime();
    },

    events: {
      //查询按钮
      SearchButto() {
        var obj = {};
        var url = Vue.gvUtil.getUrl({
          apiName: "lossgetStatisExport",
          contextName: "selfins",
          serachParms: {
            _pageSize: this.pageSize,
            _pageNo: this.currentPage - 1,
          },
        });
        if (this.commonList.type == "project") {
          obj.lossRationType = "project";
          obj.projectNameList = this.commonList.projectNameList;
        } else if (this.commonList.type == "insuer") {
          obj.lossRationType = "insuer";
          obj.insuredList = this.commonList.insuredList;
        } else if (this.commonList.type == "policyNo") {
          obj.lossRationType = "policyNo";
          obj.policyNoList = this.commonList.policyNoList;
        } else if (this.commonList.type == "uwYear") {
          obj.uwyearList = this.commonList.uwyearList;
          obj.lossRationType = "uwYear";
        } else {
          obj.lossRationType = "riskCode";
          obj.riskCodeList = this.commonList.riskCodeList;
        }
        obj.startReportDate = this.commonList.startReportDate;
        obj.endReportDate = this.commonList.endReportDate;
        obj.reportCode = this.commonList.reportCode;
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            this.tableData = res.resData.businessList.content;
            this.totalTableData = res.resData.businessList.total;
          }
        });
      },
      //汇总改变条数
      tableDataonHandleSizeChange(val) {
        this.pageSize = val;
        this.handleSearch();
      },
      //汇总改变页数
      tableDataonHandleCurrentChange(val) {
        this.currentPage = val;
        this.handleSearch();
      },
      // 查询校验
      handleSearch() {
        if (this.commonList.type) {
          if (
            this.commonList.startReportDate &&
            this.commonList.endReportDate
          ) {
            if (
              this.changeTime(this.commonList.endReportDate) >=
              this.changeTime(this.commonList.startReportDate)
            ) {
              this.SearchButto();
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
        } else {
          // 请选择统计方式
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPlestatisMethod"),
            type: "warning",
          });
        }
      },
      //险种码表
      edingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "loosclaimStatisticsfindlist",
          contextName: "selfins",
        });
        let obj = { codeType: "RiskType" };
        // debugger;
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            this.riskCodeLiOption = res.resData.ggCodeVoList.RiskType;
            this.riskCodeLiOption.push({ codeCode: "All" });
          }
        });
      },
      // 投保单位
      ingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "losscodesuppli",
          contextName: "selfins",
        });
        let obj = { catalog: "0", cedInd: "", valid: "1" };

        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            this.insuredListOption = res.resData;
            this.insuredListOption.push({ supplierChineseName: "All" });
          }
        });
      },
      //默认时间
      nowTime() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month =
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
        var day =
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        this.commonList.endReportDate = day + "-" + month + "-" + year;
        this.commonList.startReportDate = day + "-" + month + "-" + (year - 1);
      },
      //改变统计方式
      changetype(data, startReportDate, endReportDate) {
        let params = {
          type: data,
          Arg: {
            startReportDate: startReportDate,
            endReportDate: endReportDate,
          },
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findLossRationSearch",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            if (data == "policyNo") {
              this.result = res.resData.result;
              this.commonList.policyNoList = ["All"];
            } else if (data == "riskCode") {
              this.edingCoList();
              this.commonList.riskCodeList = ["All"];
            } else if (data == "uwYear") {
              this.uwyearListOption = res.resData.result;
              this.commonList.uwyearList = ["All"];
            } else if (data == "project") {
              this.projectNameListOption = res.resData.result;
              this.commonList.projectNameList = ["All"];
            } else if (data == "insuer") {
              this.ingCoList();
              this.commonList.insuredList = ["All"];
            }
            this.currentPage = 1;
            this.pageSize = 10;
            this.totalTableData = 0;
            this.tableData = [];
          }
        });
        this.initTitle(data);
      },
      //改变统计时间
      changeReportDate(startReportDate, endReportDate) {
        if (startReportDate && endReportDate) {
          this.changetype(this.commonList.type, startReportDate, endReportDate);
        } else {
          this.commonList.projectNameList = [];
          this.commonList.riskCodeList = [];
          this.commonList.insuredList = [];
          this.commonList.policyNoList = [];
          this.commonList.uwyearList = [];
          this.result = [];
          this.uwyearListOption = [];
          this.insuredListOption = [];
          this.projectNameListOption = [];
          this.riskCodeLiOption = [];
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
        }
      },
      //查询表头
      initTitle(type) {
        let obj = {
          type: type,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "lossgetReportTitle",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            this.cols = res.resData;
          }
        });
      },
      //导出
      onExportAllExcel() {
        let obj = {};
        (obj.reportCode = this.commonList.reportCode), //报表编号（R001）
          (obj.startReportDate = this.commonList.startReportDate);
        obj.endReportDate = this.commonList.endReportDate;
        obj.type = this.commonList.type;
        obj.lossRationType = obj.type;
        obj.isExport = "1";
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR013",
          contextName: "selfins",
        });
        if (obj.type == "policyNo") {
          obj.policyNoList = this.commonList.policyNoList;
        } else if (obj.type == "riskCode") {
          obj.riskCodeList = this.commonList.riskCodeList;
        } else if (obj.type == "uwYear") {
          obj.uwyearList = this.commonList.uwyearList;
        } else if (obj.type == "project") {
          obj.projectNameList = this.commonList.projectNameList;
        } else if (obj.type == "insuer") {
          obj.insuredList = this.commonList.insuredList;
        }

        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "赔付率统计表.xlsx");
          });
      },

      //日月年转化年月日
      changeTime(ss) {
        var form_date_value = ss.split("-");
        jie = form_date_value[2].trim().split(" ");
        var targetDate =
          jie[0] + "-" + form_date_value[1] + "-" + form_date_value[0];
        return targetDate;
      },
      // 重置
      handleReset() {
        this.commonList.type = "";
        this.cols = [];
        this.nowTime();
      },
      //如果选择了all其他消失
      changecode(s, data) {
        if (s.length > 0) {
          if (s.includes("all") || s.includes("All")) {
            if (data == "insuredList") {
              this.commonList.insuredList = ["All"];
            } else if (data == "riskCodeList") {
              this.commonList.riskCodeList = ["All"];
            } else if (data == "projectNameList") {
              this.commonList.projectNameList = ["All"];
            } else if (data == "policyNoList") {
              this.commonList.policyNoList = ["All"];
            } else if (data == "uwyearList") {
              this.commonList.uwyearList = ["All"];
            }
          }
        }
      },
    },

    //封装组建公共函数
    methods: {
      onHandleDel: function onHandleDel(row) {
        var _this = this;
        Vue.gvUtil
          .confirm({
            msg: Vue.gvUtil.getInzTranslate("gDeleteContent"),
          })
          .then(function () {
            if (row && _this.cacheFieldsEx[row.value]) {
              delete _this.cacheFieldsEx[row.value];
              if (_this.filterEx == row.value) {
                _this.filterEx = "";
              }
              _this.updateOptionsFieldsEx(_this.cacheFieldsEx, true);
              _this.$message({
                type: "success",
                message: Vue.gvUtil.getInzTranslate("gDeleteSuccess"),
              });
            }
          });
      },
      updateOptionsFieldsEx: function updateOptionsFieldsEx(obj, type) {
        this.optionsFieldsEx = [];
        if (obj) {
          for (var key in obj) {
            var d = {
              value: key,
              label: obj[key]._filterName,
              remarks: obj[key]._filterRemarks,
              time: obj[key]._time,
              datas: JSON.stringify(obj[key]),
            };
            this.optionsFieldsEx.push(d);
          }
          this.optionsFieldsEx.sort(Vue.gvUtil.compare("time", false));
          type &&
            sessionStorage.setItem(
              Vue.gvUtil.getMd5(this.api),
              JSON.stringify(obj)
            );
        }
      },
      initFilterEx: function initFilterEx() {
        var f = sessionStorage.getItem(Vue.gvUtil.getMd5(this.api));
        if (!f) return;
        this.cacheFieldsEx = JSON.parse(f);
        this.updateOptionsFieldsEx(this.cacheFieldsEx, false);
      },
      getFilterEx: function getFilterEx() {
        if (this.cacheFieldsEx && this.cacheFieldsEx[this.filterEx]) {
          Object.assign(this.commonList, this.cacheFieldsEx[this.filterEx]);
        }
      },
      onSubmit: function onSubmit() {
        if (this.fromFiltersEx.name == "") {
          this.$message({
            type: "error",
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          });
          return;
        }
        this.dialogFormVisible = false;
        var d = {},
          d1 = {},
          time = new Date().getTime(),
          key = "filter_" + time;
        Object.assign(d1, this.commonList);
        d1._filterName = this.fromFiltersEx.name;
        d1._time = time;
        d1._filterRemarks = this.fromFiltersEx.remarks;
        this.cacheFieldsEx[key] = d1;
        this.updateOptionsFieldsEx(this.cacheFieldsEx, true);
        this.$message({
          type: "success",
          message: Vue.gvUtil.getInzTranslate("gSaveSuccess"),
        });
        this.fromFiltersEx.name = "";
        this.fromFiltersEx.remarks = "";
      },
    },
  });
});
