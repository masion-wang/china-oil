/**
 * 赔案统计表
 * @author
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      claimStatisExport: "/report/queryExport", //查询
      claimStatisticsfindlist: "/ggCode/findList", //原保险人码表
      statisR008: "/report/query/R008", //导出excel
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
        zbIsprovisiOption: [
          {
            codeCode: "All",
            codeName: "All",
          },
          {
            codeCode: "00",
            codeName: "否",
          },
          {
            codeCode: "01",
            codeName: "是",
          },
        ],
        table: {
          basic: {
            api: "claimStatisExport", //分页列表请求api
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
            riskCodeList: ["All"],
            endReportDate: "",
            startReportDate: "",
            isEsBill: "All",
            reportCode: "R008", //报表编号（R008）
          },
          fields: [
            {
              labelKey: "Registration", //Registration
              prop: "registration",
            },
            {
              labelKey: "Risk Code", //Risk Code
              prop: "riskCode",
            },
            {
              labelKey: "Policy No.", //
              prop: "policyNo",
              width: "180px",
            },
            {
              labelKey: "Project", //
              prop: "project",
              showTip: true,
            },
            {
              labelKey: " Claim No",
              prop: "claimNo",
              width: "150px",
            },
            {
              labelKey: "Date Loss", //
              prop: "dateLoss",
            },
            {
              labelKey: "Description", //Description
              prop: "description",
            },
            {
              labelKey: "Claim Status",
              prop: "claimStatus",
            },
            {
              labelKey: "Paid Claim", //
              prop: "paidClaim",
            },
            {
              labelKey: "O/S Loss",
              prop: "osloss",
            },
            {
              labelKey: "CIL Share", //
              prop: "cilshare",
            },
            {
              labelKey: "CIL Share Value", //
              prop: "cilshareValue",
            },
            {
              labelKey: "R/I Share", //
              prop: "rishare",
            },
            {
              labelKey: "R/I Share Value",
              prop: "rishareValue",
            },
            {
              labelKey: "Net Retention", //
              prop: "netRetention",
            },
            {
              labelKey: "Net Retention Value", //
              prop: "netRetentionValue",
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
      onListBtn(row, type) {},
      // 查询前校验
      beforeValidate(data) {
        if (
          data.startReportDate &&
          data.endReportDate &&
          data.riskCodeList.length > 0
        ) {
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
          //请选择统计日期与险种
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbPleSelstasDateandtype"),
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
      // 导出excel
      onExportAllExcel(type) {
        this.downFile(this.$refs.table.fromFilters);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "statisR008",
          contextName: "selfins",
        });
        let obj = {
          endReportDate: c.endReportDate,
          startReportDate: c.startReportDate,
          riskCodeList: c.riskCodeList,
          isEsBill: c.isEsBill,
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
    },
  });
});
