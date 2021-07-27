/**
 * 保费账单
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      premiumbillAppExport: "/report/queryExport", //查询
      statisR007: "/report/query/R007", //导出excel
      premggcodesuppli: "/ggCode/findSupplier", //原保险人码表
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "premiumbillApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        options: [
          {
            codeCode: "01",
            codeName: "本单币别",
          },
          {
            codeCode: "02",
            codeName: "本位币",
          },
        ],
        upstreamSignOption: [
          {
            codeCode: "U",
            codeName: "Upstream",
          },
          {
            codeCode: "D",
            codeName: "Downstream",
          },
          {
            codeCode: "all",
            codeName: "All",
          },
        ],
        cedingCompanyListOption: [],
        table: {
          basic: {
            api: "premiumbillAppExport", //分页列表请求api
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
            cedingCompanyList: ["all"],
            currency: "01",
            upStreamSign: "all",
            endReportDate: "",
            startReportDate: "",
            reportCode: "R007", //报表编号（R007）
          },
          fields: [
            {
              labelKey: "Group ID", //
              prop: "groupId",
              width: "120px",
            },
            {
              labelKey: "Strm.", //
              prop: "upStreamSign",
            },
            {
              labelKey: "Endorsement Ref.", //
              prop: "endorsementRef",
              width: "180px",
            },
            {
              labelKey: "Project", //
              prop: "projectName",
              showTip: true,
            },
            {
              labelKey: "Cedant", //
              prop: "ceDant",
              showTip: true,
            },
            {
              labelKey: "Effective", //
              prop: "effective",
              showTip: true,
            },
            {
              labelKey: "Expiry", //
              prop: "expiry",
              showTip: true,
            },
            {
              labelKey: "Maint. To", //
              prop: "maintTo",
              showTip: true,
            },
            {
              labelKey: "Our Share%", //
              prop: "ourShare",
              width: "200px",
            },
            {
              labelKey: "Debit Note No.", //
              prop: "debitNoteNo",
              showTip: true,
            },
            {
              labelKey: "Issue Date", //
              prop: "issueDate",
            },
            {
              labelKey: "A／C Date", //
              prop: "acDate",
              showTip: true,
            },
            {
              labelKey: "Ccy", //
              prop: "currency",
            },
            {
              labelKey: "Insured Value(100%)", //
              prop: "insuredValueI",
            },
            {
              labelKey: "Gross Premium", //
              prop: "grossPremiumI",
            },

            {
              labelKey: "Commission", //
              prop: "commissionI",
            },
            {
              labelKey: "Net Premium", //
              prop: "netPremiumI",
            },
            {
              labelKey: "Brokerage", //
              prop: "brokerageI",
            },
            {
              labelKey: "PC／NCB", //
              prop: "pcncbI",
            },
            {
              labelKey: "Tax", //
              prop: "taxI",
            },
            {
              labelKey: "MWS Fee", //
              prop: "mwsFeeI",
            },
            {
              labelKey: "PPD", //
              prop: "ppdI",
            },
            {
              labelKey: "Engr Fee", //
              prop: "engrFeeI",
            },
            {
              labelKey: "Pool", //
              prop: "poolI",
            },
            {
              labelKey: "Non-Pool", //
              prop: "nonPoolI",
            },
            {
              labelKey: "R/I Payee", //
              prop: "riPayee",
              showTip: true,
            },
            {
              labelKey: "R/I %", //
              prop: "riShare",
            },
            {
              labelKey: "Role", //
              prop: "role",
            },
            {
              labelKey: "Gross Premium", //
              prop: "grossPremiumO",
            },
            {
              labelKey: "Commission", //
              prop: "commissionO",
            },
            {
              labelKey: "Net Premium", //
              prop: "netPremiumO",
            },
            {
              labelKey: "Brokerage", //
              prop: "brokerageO",
            },
            {
              labelKey: "PC／NCB", //
              prop: "pcncbO",
            },
            {
              labelKey: "Tax", //
              prop: "taxO",
            },
            {
              labelKey: "MWS Fee", //
              prop: "mwsFeeO",
            },
            {
              labelKey: "PPD", //
              prop: "ppdO",
            },
            {
              labelKey: "Engr Fee", //
              prop: "engrFeeO",
            },
            {
              labelKey: "Pool", //
              prop: "poolO",
            },
            {
              labelKey: "Non-Pool", //
              prop: "nonPoolO",
            },
          ],
        },
      };
    },
    created() {
      this.nowTime();
      this.edingCoList();
    },
    events: {},
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
      // 原保险人码表
      edingCoList() {
        var url = Vue.gvUtil.getUrl({
          apiName: "premggcodesuppli",
          contextName: "selfins",
        });
        let obj = { catalog: "0", cedInd: "", valid: "1" };

        Vue.gvUtil.http.post(url, obj).then((res) => {
          this.cedingCompanyListOption = res.resData;
        });
      },
      //如果选择了all其他消失
      changeriskcode(s, data) {
        if (s.length > 0) {
          if (s.includes("all")) {
            var searchObj = this.$refs.table.getSearchVal();
            if (data == "cedingCompanyList") {
              searchObj.cedingCompanyList = ["all"];
            }
            this.$refs.table.setSearchVal(searchObj);
          }
        }
      },
      // 导出excel
      onExportAllExcel(type) {
        this.downFile(this.$refs.table.fromFilters);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR007",
          contextName: "selfins",
        });
        let obj = {
          isExport: "1",
          cedingCompanyList: c.cedingCompanyList,
          currency: c.currency,
          upStreamSign: c.upStreamSign,
          endReportDate: c.endReportDate,
          startReportDate: c.startReportDate,
        };

        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "保费账单.xlsx");
          });
      },
    },
  });
});
