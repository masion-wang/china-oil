/**
 * 赔款账单
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      indemnitybillAppExport: "/report/queryExport", //查询
      premggcodesuppli: "/ggCode/findSupplier", //原保险人码表
      claimStatisticsfindlist: "/ggCode/findList", //原保险人码表
      statisR011: "/report/query/R011", //导出excel
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "indemnityBillApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        riskCodeLiOption: [],
        options: [
          {
            codeCode: "本单币别",
            codeName: "本单币别",
          },
          {
            codeCode: "本位币",
            codeName: "本位币",
          },
        ],
        cedingCompanyListOption: [],
        table: {
          basic: {
            api: "indemnitybillAppExport", //分页列表请求api
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
            endReportDate: "",
            startReportDate: "",
            currency: "本单币别",
            riskCodeList: ["All"],
            cedingCompanyList: ["all"],
            reportCode: "R011", //报表编号（R011）
          },

          fields: [
            {
              labelKey: "Group ID", //
              prop: "groupID",
            },
            {
              labelKey: "Strm.", //
              prop: "strm",
            },
            {
              labelKey: "Project", //
              prop: "project",
              showTip: true,
            },
            {
              labelKey: "Endorsement Ref.", //
              prop: "policyNo",
              showTip: true,
            },
            {
              labelKey: "Claim No.", //
              prop: "claimNo",
              showTip: true,
            },
            {
              labelKey: "Cedant", //
              prop: "cedant",
            },
            {
              labelKey: "Our Share%", //
              prop: "ourShare",
            },
            {
              labelKey: "Credit Note No.", //
              prop: "creditNoteNo",
            },
            {
              labelKey: "Date Loss", //
              prop: "dateLoss",
            },
            {
              labelKey: "A／C Date", //
              prop: "acDate",
            },
            {
              labelKey: "Ccy", //
              prop: "ccy",
            },
            {
              labelKey: "Gross Loss", //
              prop: "grossLoss",
            },
            {
              labelKey: "Claim Amount", //
              prop: "claimAmount",
            },
            {
              labelKey: "Retention", //
              prop: "retention",
            },
            {
              labelKey: "R／I Payee", //
              prop: "riPayee",
              showTip: true,
            },
            {
              labelKey: "R／I %", //
              prop: "riPaid",
              showTip: true,
            },
            {
              labelKey: "Recovery", //
              prop: "recovery",
            },
          ],
        },
      };
    },
    created() {
      this.nowTime();
      this.edingCoList();
      this.ingCoList();
    },
    events: {
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
      // 原保险人码表
      ingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "premggcodesuppli",
          contextName: "selfins",
        });
        let obj = { catalog: "0", cedInd: "", valid: "1" };

        Vue.gvUtil.http.post(url, obj).then((res) => {
          this.cedingCompanyListOption = res.resData;
        });
      },
    },
    methods: {
      onListBtn(row, type) {},
      //如果选择了all其他消失
      changeriskcode(s, data) {
        if (s.length > 0) {
          if (s.includes("all") || s.includes("All")) {
            var searchObj = this.$refs.table.getSearchVal();
            if (data == "cedingCompanyList") {
              searchObj.cedingCompanyList = ["all"];
            } else if (data == "riskCodeList") {
              searchObj.riskCodeList = ["All"];
            }
            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
      //查询前校验
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
      // 导出excel
      onExportAllExcel(type) {
        this.downFile(this.$refs.table.fromFilters);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR011",
          contextName: "selfins",
        });
        let obj = {
          isExport: "1",
          cedingCompanyList: c.cedingCompanyList,
          currency: c.currency,
          riskCodeList: c.riskCodeList,
          endReportDate: c.endReportDate,
          startReportDate: c.startReportDate,
        };

        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "赔款账单.xlsx");
          });
      },
    },
  });
});
