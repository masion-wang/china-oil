/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var config = {
    api: {},
  };
  Vue.gvUtil.setApi(config.api);
  var expenseDetail = require("../../../endorsement/expenseApp/index");
  expenseDetail2 = require("../../../endorsement/batchentryinfo8App/index"); //历次批单
  return Vue.gvUtil.Page({
    template: require("./inquiry.html"),
    name: "inquiryApp",
    components: {
      expenseDetail: expenseDetail,
      expenseDetail2: expenseDetail2,
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        previousenDorsementsVisible: false, //查看批单弹框
        pageSize1: 2, // 每页数量
        pageNo1: 0, //当前页数
        pageaA: 0, //总页数
        total1: 0, // 总条数
        handle: "", // 经办人
        tableData1: [],
        licipidan: false, //历次批单
        trueorfal: false, //是否清空全部数据
        projectVisible: false, //自保弹框
        check: true, //保存按钮是否可见
        disabled: false, //只读模式
        isEdit: "新增", //编辑新增
        rules: {
          //校验
        },
        formLabelAlign: {
          //双向绑定
          base: "",
          baseCurrency: "",
          exchDate: "",
          exchCurrency: "",
          exchRate: "",
          validDate: "",
          invalidDate: "",
          validInd: "",
          remark: "",
        },
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findpolicyselfmain", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            // execl: {
            //   isShow: true,
            //   fileName: "testExecl",
            //   exclude: ["Operation"],
            // }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            //查询域元数据
            policyNo: "",
            cedingPolicyNo: "",
            renewalSign: "",
            projectName: "",
            riskCode: "",
            cedingCompanyCode: "",
            effectiveDateStart: "",
            effectiveDateEnd: "",
            expiryDateStart: "",
            expiryDateEnd: "",
            underWritingYear: "",
            handle: "",
            lossDateTime: "", //出险时间
            policyStatus: "01", //审核通过的才能查到
          },
          fields: [
            {
              // 自保保单-版本号
              labelKey: "zbzbPVersionNo",
              prop: "policyNoAndVersionNo",
              showTip: true,
            },
            {
              // 自保险种
              labelKey: "selfInsurance",
              prop: "riskCode",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "RiskType",
              },
            },
            {
              // 项目打印名称
              labelKey: "projectPrintName",
              prop: "projectName",
              showTip: true,
            },
            {
              // 保期起期
              labelKey: "proposalCommonStartDate",
              prop: "effectiveDate",
              format: {
                type: "date",
              },
            },
            {
              // 保期止期
              labelKey: "expiryDateInsurance",
              prop: "expiryDate",
              format: {
                type: "date",
              },
            },
            {
              // 新保/续保
              labelKey: "newRenewedInsurance",
              prop: "renewalSign",
              format: {
                type: "ggcode",
                codeType: "ResumeRemark",
              },
            },
            {
              // 原保险人
              labelKey: "originalInsurer",
              prop: "cedingCompany",
              showTip: true,
            },
            {
              // 保费变化量
              labelKey: "changePremium",
              prop: "totalDue",
              showTip: true,
            },
            {
              // 保单状态
              labelKey: "policyStatus",
              prop: "policyStatus",
              format: {
                type: "ggcode",
                codeType: "PolicyStatus",
              },
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  // 选择
                  btnKey: "select",
                  flag: "operation",
                  type: "btn",
                },
              ],
            },
          ],
        },
      };
    },
    created() {},
    methods: {
      handleCurrentChangePages1(val) {
        this.pageaA = val;
        this.pageNo1 = val - 1;
        let policyNo = this.policyNo3;
        this.queryTable11(policyNo);
      },
      handleSizeChanges1(val) {
        this.pageSize1 = val;
        this.queryTable11();
      },
      // 历次批单打开弹窗
      removeMulti2() {
        let a = this.$refs.table.getSelectData();
        if (a && a.length == 1) {
          this.pageSize1 = 2;
          this.pageNo1 = 0;
          this.licipidan = true;
          this.policyNo3 = a[0].policyNo;
          let policyNo = a[0].policyNo;
          this.queryTable11(policyNo);
        } else {
          //请选择一条数据
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbapieceofdataselect")
          );
        }
      },
      handlelicyNoAndVers(row, column, event, cell) {
        this.previousenDorsementsVisible = true;
        setTimeout(() => {
          this.$refs.previousen2.peian(row);
        }, 20);
      },
      // 分入分页查询
      queryTable11(policyNo) {
        let that = this;
        let params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1,
          policyNo: this.policyNo3,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "historyEndor2",
          contextName: "selfins",
        });
        url =
          url + "?&_pageSize=" + this.pageSize1 + "&_pageNo=" + this.pageNo1;
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            for (let item of res.resData.businessList.content) {
              item.effectiveDate = item.effectiveDate + "   " + item.expiryDate;
            }

            that.tableData1 = res.resData.businessList.content;
            that.pageaA = res.resData.businessList.totalPages;
            that.total1 = res.resData.businessList.total;
          } else {
          }
        });
      },

      // 查询前校验
      beforeValidate(data) {
        if (data.lossDateTime) {
          return true;
        } else {
          //请先录入出险时间
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbaccidenttimefirstinput"),
            type: "warning",
          });
          return false;
        }
      },
      //储存是否清空数据
      trueOrFlase(ss) {
        this.trueorfal = ss;
      },
      onListBtn(row, type) {
        if (type == "operation") {
          //点击选择
          this.$emit("inquir", row, this.trueorfal);
        } else if (type == "policyNo") {
          this.projectVisible = true;
          let expense = {
            flag: "expense",
            currency: row.currency,
            policyMainId: row.policyMainId,
            policyNo: row.policyNo,
            effectiveDate: row.effectiveDate,
            expiryDate: row.expiryDate,
            proposalNo: row.proposalNo, //查基本数据的
            view: "view", //查看
          };
          setTimeout(() => {
            this.$refs.expenseDetail.initexpenseDetail(expense);
          }, 0);
        }
      },
    },
  });
});
