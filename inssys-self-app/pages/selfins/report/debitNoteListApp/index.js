/**
 * settlementReportApp
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      sumreport: "/report/queryDebitNoteList", //查询
      claimStatisticsfindlist: "/ggCode/findList", //原保险人码表
      queryPolicyNameList: "/policySelfMain/findProjectNameList ", //项目名称码表
      statisR001: "/report/query/R001", //导出excel
    },
  };
  Vue.gvUtil.setApi(config.api);
  var Summary = require("./components/Summary");
  detailed = require("./components/detailed");
  return Vue.gvUtil.Page({
    template: temp,
    name: "debitNoteListApp",
    datas: function () {
      return {
        api: "/report/queryDebitNoteList",
        // 查询条件
        table: {},
        //选择tabs
        editableTabs: [],
        alllist: [],
        activeName: "",
        currentPage: 0,
        pageSize: 10,
        options: [], //查询条件项目打印名称
        riskCodeLiOption: [], //查询条件险种
        tableData: [], // 显示的数组
        filterEx: "",
        optionsFieldsEx: [],
        dialogFormVisible: false, //过滤器
        dialogTableVisible: false,
        cacheFieldsEx: {},
        fromFiltersEx: {
          name: "",
          remarks: "",
        },
        commonList: {
          riskCodeList: [],
          reportCode: "R001", //报表编号（R001）
          startReportDate: "",
          endReportDate: "",
          projectNameList: [],
        },
      };
    },
    components: {
      Summary,
      detailed,
    },
    created() {
      this.nowTime();
      this.initFilterEx();
      this.edingCoList();
    },
    mounted() {
      this.$eventBus.$on("emitHandleData-Plan", (data) => {
        this.commonList.startReportDate = data.startReportDate;
        this.commonList.endReportDate = data.endReportDate;
        this.commonList.riskCodeList = data.riskCodeList;
        this.commonList.projectNameList = data.riskCodeList;
      });
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
      //改变统计时间调项目名称接口
      changeReportDate() {},
      //险种码表
      edingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "claimStatisticsfindlist",
          contextName: "selfins",
        });
        let obj = { codeType: "RiskType" };

        Vue.gvUtil.http.post(url, obj).then((res) => {
          this.riskCodeLiOption = res.resData.ggCodeVoList.RiskType;
        });
      },
      // 查询校验
      handleSearch() {
        if (this.commonList.startReportDate && this.commonList.endReportDate) {
          if (
            this.changeTime(this.commonList.endReportDate) >=
            this.changeTime(this.commonList.startReportDate)
          ) {
            if (this.commonList.riskCodeList.length != 0) {
              this.SearchButto();
            } else {
              // 请选择自保险种
              this.$message({
                message: Vue.gvUtil.getInzTranslate("zbplechooselfIn"),
                type: "warning",
              });
              return false;
            }
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
      //查询按钮
      SearchButto() {
        var url = Vue.gvUtil.getUrl({
          apiName: "sumreport",
          contextName: "selfins",
          serachParms: { _pageSize: this.pageSize, _pageNo: this.currentPage },
        });
        Vue.gvUtil.http.post(url, this.commonList).then((res) => {
          if (res.resCode === "0000") {
            this.editableTabs = res.resData;
            this.$nextTick(() => {
              this.activeName = this.editableTabs[0].name;
              this.$refs.summary[0].tableData = this.editableTabs[0].data;
            });
          }
        });
      },
      // 重置
      handleReset() {
        this.nowTime();
      },
      //点击tabs
      handleClick(tab, event) {
        this.editableTabs.forEach((item, index) => {
          if (tab.name == "Total" && index == 0) {
            this.$refs.summary[0].tableData = item.data;
          } else if (index != 0 && tab.name == item.name) {
            let obj = index - 1;
            this.$refs.detailed[obj].tableData = item.data;
          }
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
        this.commonList.startReportDate = "01" + "-" + month + "-" + year;
        this.commonList.projectNameList = ["All"];
        this.commonList.riskCodeList = ["All"];
        this.list(
          this.commonList.endReportDate,
          this.commonList.startReportDate
        );
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
      //项目名称事件
      changeprojectNameList(strat, end) {
        if (strat && end) {
          this.commonList.projectNameList = ["All"];
          this.list(end, strat);
        } else {
          this.commonList.projectNameList = [];
          this.options = [];
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
            if (data == "projectNameList") {
              this.commonList.projectNameList = ["All"];
            } else if (data == "riskCodeList") {
              this.commonList.riskCodeList = ["All"];
            }
          }
        }
      },
      //导出按钮
      onExportAllExcel() {
        let obj = {};
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR001",
          contextName: "selfins",
        });
        obj = this.commonList;
        (obj.isExport = "1"),
          Vue.gvUtil.http
            .post(url, obj, {
              responseType: "blob",
            })
            .then((res) => {
              Vue.gvUtil.resolveBlob(res, "DebitNote List.xlsx");
            });
      },
    },
  });
});
