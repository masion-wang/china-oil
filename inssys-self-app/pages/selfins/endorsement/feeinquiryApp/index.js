/**
 * 基础日志子表开关配置管理主页面UAT
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var expenseDetail = require("../expenseApp/index");
  var config = {
    api: {
      findpolicyselfmain: "/policySelfMain/findpolicyselfmain", //查询页面
      findfeetypecode: "/guFeetype/findfeetypecode", //费用类型下拉
      feePrint: "/PDF/printPDF ", //费用单条打印
      addFileNoEntryNodefee: "/guPolicyFee/addFileNoEntryNode", //查看页面时传文档资料
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "clauseApp",
    components: {
      expenseDetail: expenseDetail,
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        printpolicyFeeId: "",
        printpolicyNo: "",
        printversionNo: "",
        printpolicyMainId: "",
        printfeeButton: false,
        projectVisible: false, //自保保单号详情页面
        nowTime: "",
        feetypecode: [], //费用类型下拉
        disabled: false, //只读模式
        isEdit: "新增", //编辑新增
        rules: {
          //校验
        },
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findpolicyselfmain", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            policyNo: null,
            cedingPolicyNo: null,
            riskCode: "",
            renewalSign: "",
            effectiveDateStart: null, //起期的起期
            effectiveDateEnd: null, //起期的止期
            expiryDateStart: null, //止期的起期
            expiryDateEnd: null, //止期的止期
            policyStatus: "01",
            feeStatus: "",
            feeType: "",
          },
          fields: [
            {
              labelKey: "selfinsurancepolicyno", //自保保单号
              showTip: true,
              btns: [
                {
                  prop: "policyNo",
                  flag: "policyNo",
                  type: "a",
                },
              ],
            },
            {
              labelKey: "chargeSerialNumber", //费用序号
              prop: "feeSeqNo",
            },
            {
              labelKey: "feeType", //费用类型
              showTip: true,
              prop: "feeType",
            },
            {
              labelKey: "selfInsurance", //自保险种
              prop: "riskCode",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "RiskType",
              },
            },
            {
              labelKey: "newRenewedInsurance", //新保／续保
              prop: "renewalSign",
              format: {
                type: "ggcode",
                codeType: "ResumeRemark",
              },
            },
            {
              labelKey: "startingDateInsurance", //保险起期
              prop: "effectiveDate",
              showTip: true,
            },
            {
              labelKey: "expiryDateInsurance", //保险止期
              prop: "expiryDate",
              showTip: true,
            },
            {
              labelKey: "projectPrintName", //项目打印名称
              prop: "projectName",
              showTip: true,
            },
            {
              labelKey: "originalInsurer", //原保险人
              prop: "cedingCompany",
              showTip: true,
            },
            {
              labelKey: "premium", //保费
              prop: "totalPremium",
            },
            {
              labelKey: "Stateofcharge", //费用状态
              prop: "feeStatus",
              format: {
                type: "ggcode",
                codeType: "ExpenseStatus",
              },
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              width: "190px",
              btns: [
                {
                  btnKey: "zbEntry", //费用录入
                  flag: "detailsData",
                  type: "btn",
                },
                {
                  btnKey: "taskList", //任务列表
                  flag: "view",
                  type: "btn",
                },
              ],
            },
          ],
        },
      };
    },
    created() {
      Vue.gvUtil.initTranslation("ExpenseStatus", "ResumeRemark", "RiskType");
      if (this.query.policyno) {
        this.table.search.policyNo = this.query.policyno;
      }
    },
    methods: {
      initPage() {
        this.fyselect(); //费用类型
        Vue.gvUtil.initTranslation("PolicyStatus,ExpenseStatus");
      },
      fyselect() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findfeetypecode",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { feetypeCode: "" }).then((res) => {
          if (res.resCode === "0000") {
            this.feetypecode = res.resData.guFeetypeVos;
          }
        });
      },
      // 点击事件
      onListBtn(row, type) {
        if (type == "detailsData") {
          //费用录入
          this.onHandleDelete(row);
        } else if (type == "Approve") {
          //费用审核
          // this.Approve(row);
        } else if (type == "policyNo") {
          //自保保单号查询
          if (row.feeStatus == "01") {
            //审核通过后才能打印
            this.printfeeButton = true;
            this.printpolicyNo = row.policyNo;
            this.printversionNo = row.versionNo;
            this.printpolicyMainId = row.policyMainId;
            this.printpolicyFeeId = row.policyFeeId;
          }
          this.projectVisible = true;
          //跳转到费用录入
          let expense = {
            flag: "expense",
            row: row,
            view: "view", //查看
          };
          setTimeout(() => {
            this.$refs.expenseDetail.initexpenseDetail(expense);
          }, 200);
        } else if (type == "view") {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
          // this.$message.success("暂未开启工作流");
        }
      },
      onHandleDelete(row) {
        //费用录入
        if (row.feeStatus == "01") {
          //审核通过时
          //当前费用信息已审核通过，是否要再次补充录入
          Vue.gvUtil
            .confirm({
              msg: Vue.gvUtil.getInzTranslate("zbcurrbeenappDoyouagainL"),
            })
            .then(
              function () {
                Vue.gvUtil.redirectTo({
                  name: "expenseApp",
                  query: {
                    flag: "expense",
                    row: row,
                  },
                }); //跳转到费用录入
              },
              function () {}
            );
        } else if (row.feeStatus == "09") {
          //待审核状态不能进入费用录入页面
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbappstartcannotenterexpenseentry")
          );
        } else if (
          row.feeStatus == "00" ||
          row.feeStatus == "06" ||
          row.feeStatus == null
        ) {
          //初始化与下发修改状态与无状态
          Vue.gvUtil.redirectTo({
            name: "expenseApp",
            query: {
              row: row,
              flag: "expense",
            },
          }); //跳转到费用录入
        }
      },
      //打印按钮
      getPrint() {
        var url = Vue.gvUtil.getUrl({
          apiName: "feePrint",
          contextName: "selfins",
        });
        let obj = {
          templateName: "DebitCredNote-BrokerFee",
          isEmail: false,
          policyNo: this.printpolicyNo,
          versionNo: this.printversionNo,
          policyMainId: this.printpolicyMainId,
          policyFeeId: this.printpolicyFeeId,
        };
        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "费用.pdf");
          });
      },
    },
    events: {
      //补录文档资料
      UPfile() {
        var url = Vue.gvUtil.getUrl({
          apiName: "addFileNoEntryNodefee",
          contextName: "selfins",
        });
        let obj = {
          policyNo: this.printpolicyNo,
          ggDocumentList: this.$refs.expenseDetail.docList, //文档资料
          fileType: "2",
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            // 补录成功
            this.$message.success(
              Vue.gvUtil.getInzTranslate("zbSuccessfullyadded")
            );
          }
        });
      },
    },
  });
});
