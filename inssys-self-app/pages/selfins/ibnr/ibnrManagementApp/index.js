/**
 * IBNR管理
 * @author 罗丹菱
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      findIbnr: "/ibnrMain/findIbnr	", //查询
      exportBatchIbnrExcel: "/ibnrMain/exportBatchIbnrExcel", //全部导出
      ibnrprintPDF: "/PDF/printPDF", // 打印"
    },
  };
  Vue.gvUtil.setApi(config.api);
  var viewIbnr = require("./ibnrManagementAddApp/index");
  return Vue.gvUtil.Page({
    template: temp,
    name: "ibnrManagementApp",
    components: {
      viewIbnr: viewIbnr,
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        ViewIs: false, //是否可见打印按钮
        getPrintbatchNo: "",
        settlingCeding: false, //弹框
        table: {
          basic: {
            api: "findIbnr", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true, //序号
            execlAll: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["operation"],
            },
          },
          search: {
            acDateStart: "",
            acDateEnd: "",
            status: "",
            reverseInd: "0", //写死
            createdBy: "",
            createdDate: "",
          },
          fields: [
            {
              labelKey: "zbInwardOutward", //分入/分出
              prop: "riInward",
              format: {
                type: "ggcode",
                codeType: "InAndOut",
              },
            },
            {
              labelKey: "businessType", //业务类型
              prop: "businessType",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "businesType",
              },
            },
            {
              labelKey: "zbIAClass", //保监险种
              prop: "iaClassCode",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "CIRCRisk",
              },
            },
            {
              labelKey: "zbYearYear", //出险年份
              prop: "yearOfAccident",
            },
            {
              labelKey: "zbA/CDate", //挂账日期
              prop: "acDate",
            },
            {
              labelKey: "currency", //币别
              prop: "currency",
              format: {
                type: "ggcode",
                codeType: "Currency",
              },
            },
            {
              labelKey: "payment", //金额
              prop: "amount",
              format: {
                type: "num",
              },
            },
            {
              labelKey: "ruleStatus", //状态
              prop: "status",
              format: {
                type: "ggcode",
                codeType: "IbnrStatus",
              },
            },
            {
              labelKey: "createDate", //创建日期
              prop: "createdDate",
              showTip: true,
            },
            {
              labelKey: "auditPassTime", //审核通过时间
              prop: "approvedDate",
              width: "120px",
              showTip: true,
            },
            {
              labelKey: "zbBatchNo", //批量任务号
              btns: [
                {
                  prop: "batchNo",
                  flag: "batchNo",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  btnKey: "taskList", //任务列表
                  flag: "taskList",
                  type: "btn",
                },
              ],
            },
          ],
        },
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      },
    },
    events: {
      initPage() {
        Vue.gvUtil.initTranslation(
          "Currency,IbnrStatus,CIRCRisk,InAndOut,StreamType,businesType,RiskType"
        );
        this.table.search.createdBy = this.userInfo.userName;
      },
    },
    methods: {
      // 导出excel
      onExportAllExcel(type) {
        var c = [];
        this.$refs.table.list.forEach((element) => {
          c.push({
            batchNo: element.batchNo,
            reverseInd: element.reverseInd,
          });
        });
        this.downFile(c);
      },
      // 文件流下载接口
      downFile(c) {
        var url = Vue.gvUtil.getUrl({
          apiName: "exportBatchIbnrExcel",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, c, {
            responseType: "blob",
          })
          .then((res) => {
            // console.log(res);
            Vue.gvUtil.resolveBlob(res, "IBNR.xlsx");
          });
      },
      //新增
      gBtnCreate() {
        Vue.gvUtil.redirectTo({ name: "ibnrManagementAddApp" });
      },
      // 打印
      getPrint() {
        var url = Vue.gvUtil.getUrl({
          apiName: "ibnrprintPDF",
          contextName: "selfins",
        });
        let obj = {
          templateName: "IBNR-Listing",
          batchNo: this.getPrintbatchNo,
          isEmail: false,
        };
        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "IBNR.pdf");
          });
      },
      onListBtn(row, type) {
        //任务号
        if (type == "batchNo") {
          this.settlingCeding = true;
          if (row.status == "01") {
            this.getPrintbatchNo = row.batchNo;
            this.ViewIs = true;
          } else {
            this.getPrintbatchNo = row.batchNo;
            this.ViewIs = false;
          }
          setTimeout(() => {
            this.$refs.viewIbnr.initsettlingNew(row.batchNo);
          }, 200);
          //任务列表
        } else if (type == "taskList") {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
        }
      },
    },
  });
});
