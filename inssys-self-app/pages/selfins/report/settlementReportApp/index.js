/**
 * settlementReportApp
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      Instalmentseach: "/report/queryExport", //查询汇总信息
      instalqueryDebitNoteList: "/report/queryDebitNoteList", //分期、不分期查询
      reportfindAllSpecialRisk: "/report/findAllSpecialRisk", //获取险种
      queryPolicyNameList: "/policySelfMain/queryPolicyNameList ", //项目名称码表
      NoInstalmentExcel: "/report/query/R010", //不分期导出
      InstalmentExcel: "/report/query/R012", //分期导出
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "settlementReportApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        tableData: [], // 显示的数组
        NoInstalmenttableData: [],
        NoInscurrentPage: 0,
        NoInspageSize: 10,
        currentPage: 0,
        pageSize: 10,
        activeName: "",
        IsnotInstalment: [
          {
            value: "R012",
            label: "分期",
          },
          {
            value: "R010",
            label: "不分期",
          },
        ], //分期
        riskCodeListoption: [], //险种
        filterEx: "",
        options: [], //项目名称
        optionsFieldsEx: [],
        //选择tabs
        editableTabs: [],
        // 查询条件
        table: {},
        dialogFormVisible: false, //过滤器
        dialogTableVisible: false,
        fromFiltersEx: {
          name: "",
          remarks: "",
        },
        commonList: {
          riskCodeList: [],
          reportCode: "R010", //报表编号（R001）
          startReportDate: "",
          endReportDate: "",
          projectNameList: [],
        },
      };
    },
    created() {
      this.nowTime();
      this.initFilterEx();
      this.getRiskCode();
    },
    //封装组建公共函数
    events: {
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
    methods: {
      //如果选择了all其他消失
      changeriskcode(s, data) {
        if (s.length > 0) {
          if (s.includes("All")) {
            if (data == "projectNameList") {
              this.commonList.projectNameList = ["All"];
            } else if (data == "riskCodeList") {
              this.commonList.riskCodeList = ["All"];
            }
          }
        }
      },
      //项目名称事件
      changeprojectNameList(strat, end) {
        if (strat || end) {
        } else {
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
          return false;
        }
      },
      //改变分期不分期
      changereport() {
        this.editableTabs = [];
      },
      // 重置
      handleReset() {
        this.nowTime();
        this.commonList.reportCode = "R010";
      },
      //点击tabs
      handleClick(tab, event) {},
      // 查询校验
      handleSearch() {
        if (this.commonList.startReportDate && this.commonList.endReportDate) {
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
      },
      //查询按钮
      SearchButto() {
        var url = Vue.gvUtil.getUrl({
          apiName: "instalqueryDebitNoteList",
          contextName: "selfins",
          serachParms: { _pageSize: this.pageSize, _pageNo: this.currentPage },
        });
        Vue.gvUtil.http.post(url, this.commonList).then((res) => {
          this.editableTabs = res.resData;
          this.activeName = this.editableTabs[0].name;
          this.tableData = this.editableTabs[0].data;
          this.NoInstalmenttableData = this.editableTabs[1].data;
        });
      },
      //初始化当前时间
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
        this.commonList.projectNameList = ["All"];
        this.commonList.riskCodeList = ["All"];
        this.list(
          this.commonList.endReportDate,
          this.commonList.startReportDate
        );
      },
      //日月年转化年月日
      changeTime(ss) {
        var form_date_value = ss.split("-");
        jie = form_date_value[2].trim().split(" ");
        var targetDate =
          jie[0] + "-" + form_date_value[1] + "-" + form_date_value[0];
        return targetDate;
      },
      //项目名称
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
            }
          });
        } else {
          var searchObj = this.$refs.table.getSearchVal();
          searchObj.projectNameList = [];
          this.options = [];
          // 请选择统计日期
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDate"),
            type: "warning",
          });
        }
      },
      //汇总改变条数
      tableDataonHandleSizeChange(val) {
        this.pageSize = val;
      },
      //汇总改变页数
      tableDataonHandleCurrentChange(val) {
        this.currentPage = val;
      },
      // 分期、不分期改变条数
      NoInonHandleSizeChange(val) {
        this.NoInspageSize = val;
      },
      // 分期、不分期改变页数
      NoInonHandleCurrentChange(val) {
        this.NoInscurrentPage = val;
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
            that.riskCodeListoption = res.resData;
          }
        });
      },
      //导出按钮
      onExportAllExcel() {
        //不分期
        if (this.commonList.reportCode == "R010") {
          var url = Vue.gvUtil.getUrl({
            apiName: "NoInstalmentExcel",
            contextName: "selfins",
          });
        } else {
          // 分期
          var url = Vue.gvUtil.getUrl({
            apiName: "InstalmentExcel",
            contextName: "selfins",
          });
        }
        Vue.gvUtil.http
          .post(url, this.commonList, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "Settlement Report.xlsx");
          });
      },
    },
  });
});
