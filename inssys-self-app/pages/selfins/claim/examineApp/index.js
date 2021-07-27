/**
 *  赔案估损审核信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      findItemInfo: "/gcClaimMainSelf/findItemInfo", //标的查看
      gsgetEsWorkNext: "/gcEstimateLoss/getEsWorkNext", //下级节点人
      getGcEstimateLossCheck: "/gcClaimMainSelf/getGcEstimateLossCheck", //查看估损审核的页面信息
      confirmGcEstimateLoss: "/gcClaimMainSelf/confirmGcEstimateLoss", //估损审核通过
      notConfirmGcEstimateLoss: "/gcClaimMainSelf/notConfirmGcEstimateLoss", //估损审核不通过
      findCountry: "/gcClaimMainSelf/findCountry", //出险国家
    },
  };
  var Audit = require("../settlingNewApp/components/audit");
  var settlingCeding = require("../claimViewApp/index");
  selfInsurancePolicyCeding = require("../../endorsement/batchentryinfo8App/index");
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "examineApp",
    params: function () {
      return {};
    },
    components: {
      Audit: Audit,
      settlingCeding: settlingCeding,
      selfInsurancePolicyCeding: selfInsurancePolicyCeding,
    },
    datas: function () {
      return {
        backisTrue: true, //审核页面
        PreviouslossassessmentDialog: false, //历史估损弹框
        selfInsurancePolicyCeding: false, //自保保单查询接口
        settlingCeding: false, //原单查询接口
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        CountryList: [],
        lossassessmentData: [], //历次估损
        activeNames: ["baseInfo", "auditInfo"],
        showPaymentPlanDialog: false, //赔付标的弹框
        view: true, //查看页面
        pass: true, //审核页面
        Submit: true, //提交
        self: false, //样式
        isRed: false, //变色
        amend: false, //修改时 （重开时只有 其余全部为false amend为true）ok
        isReadonly: true, //是否只读  false:代表可填写  true:代表禁用ok
        addbutton: false, //删除/新增按钮是否可见
        Notthecase: false, //未结案进来 是否只读  false:代表可填写  true:代表禁用ok
        viewonly: true, // 录入页面时只读的数据   (新增赔案数据是viewonly为true，其他为false)ok
        isEsBilloptions: [
          {
            value: "00",
            label: "否",
          },
          {
            value: "01",
            label: "是",
          },
        ],
        //3.标的
        expandForm: {
          underlying: [
            {
              itemNo: "22",
              gcEstimateLossVoList: [
                {
                  allGrossLossAmount: "22",
                  reserveCurrency: "001",
                },
              ],
            },
          ],
        },
        //标的校验
        expandrules: {
          reserveCurrency: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          allGrossLossAmount: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          feeTypeCode: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          grossLossAmount: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          paidLossAmount: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          outLossAmount: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        },
        // 基本信息校验
        baseInforules: {
          policyNo: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          version: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          riskCode: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          locationAccident: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          lossCountry: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          lossDateTime: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          circumstances: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
        },
        // 5.标的信息
        underlying: {
          guPolicyItemMainVoList: [
            {
              guPolicyItemCedingVo: {},
            },
          ],
          underlyingRules: {
            // 标的校验规则
            // 分出总保费
            fczbf: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出佣金
            commission: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 年保费
            annualPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出费率
            riRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出净保费
            totalDue: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 原分出毛保费
            riOriGrossPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            bz: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            fcbe: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出比例
            riShareVal: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 再保人名字
            reinsurer: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 保险起期
            periodStart: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 保险止期
            periodEnd: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 保额／限额
            insuredValue: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 海油权益
            interestcnooc: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保比例
            selfInsuranceRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保保额
            cilShareValue: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保分入净保费
            totalDue: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保费率
            cilRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保佣金
            commission: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 自保毛保费
            cilGrossPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 承保天数
            insuredDay: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 承保月数
            oriMonths: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 月保费
            oriPerMonth: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            //  年保费
            oriAnnualPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出保额 分出
            riShareValue: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 原分出毛保费 分出
            riOriGrossPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 分出总保费
            totalPremium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        },
        //1. 基础信息
        baseInfo: {
          // claimMainId: "",
          // claimNo: "",
          // policyNo: "",
          // version: "",
          // sourceClaimNo: null,
          // registerNo: "",
          // claimDate: "",
          // claimStatus: "",
          riskCode: "", //必填
          // insureCompany: "",
          // locationAccident: "",
          // lossCountry: "",
          // lossDateTime: "",
          // circumstances: "",
          // accidentDescription: "",
          // remark: "",
          // createdBy: "",
          // createdDate: "",
          // amendedBy: "",
          // amendedDate: "",
          // approvedBy: "",
          // approvedDate: "",
          // paymentAmountCnAll: 0,
          // retainedAmountAll: 0,
        },
      };
    },
    events: {
      initPage() {
        this.findCountry();
        Vue.gvUtil.initTranslation("ExpenseStatus,Currency,EstimateLossStatus");
      },
      must3: function (obj) {
        if (
          obj.columnIndex == 0 ||
          obj.columnIndex == 1 ||
          obj.columnIndex == 2 ||
          obj.columnIndex == 3 ||
          obj.columnIndex == 4 ||
          obj.columnIndex == 5
        ) {
          return "must";
        }
      },
      //出险国家 下拉
      findCountry() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findCountry",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url).then((res) => {
          if (res.resCode === "0000") {
            this.CountryList = res.resData.businessList;
          }
        });
      },
      //原单赔案号详情
      viewSourceClaimNo(ss) {
        this.settlingCeding = true;
        setTimeout(() => {
          this.$refs.settlingCeding.initClaimDetail(ss);
        }, 0);
      },
      //标的查看
      checkbd(ss) {
        // 打开前清空分入分出
        this.underlying.guPolicyItemMainVoList = [];
        // this.matterTableForm.reinsurerTableList = [];
        this.showPaymentPlanDialog = true;
        var url = Vue.gvUtil.getUrl({
          apiName: "findItemInfo",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, { itemMainId: ss.itemMainId }).then((res) => {
          if (res.resCode === "0000") {
            // //标的分出 ok
            this.underlying.guPolicyItemMainVoList.push(res.resData);
          }
        });
      },
      //点击历次估损
      Previouslossassessment(row) {
        this.lossassessmentData = row.gcEstimateLossHistoryVoList;
        this.PreviouslossassessmentDialog = true;
      },
      //自保保单查询详情
      viewpolicyNo(proposalNo, versionNo, s, policyNo, pilicymainid) {
        this.selfInsurancePolicyCeding = true;
        setTimeout(() => {
          this.$refs.policyceding.lookClaim(
            "",
            versionNo,
            "Look",
            policyNo,
            pilicymainid
          );
        }, 200);
      },
      //进页面查询
      checkClaimgs() {
        var url = Vue.gvUtil.getUrl({
          apiName: "getGcEstimateLossCheck",
          contextName: "selfins",
        });
        let obj = { gwWorkTask: this.taskObj };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            this.cundata = res.resData;
            // console.log(res.resData);
            this.baseInfo = res.resData.gcClaimMainSelfVo;
            this.expandForm.underlying = res.resData.gcPolicyItemVoList;
          }
        });
      },
    },
    methods: {
      //审核通过方法
      Audit() {
        var valid = this.$refs.auditInfo.getValidate(); //审核必填校验
        if (valid) {
          var url = Vue.gvUtil.getUrl({
            apiName: "confirmGcEstimateLoss",
            contextName: "selfins",
          });
          var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
          this.cundata.nextUserCode = s;
          this.cundata.gwWorkTask = this.taskObj;
          this.cundata.ggApproveHistoryVo.opinions =
            this.$refs.auditInfo.getData();
          Vue.gvUtil.http.post(url, this.cundata).then((res) => {
            if (res.resCode === "0000") {
              //操作成功
              this.$message.success(
                Vue.filter("translate")("gOperationSuccessful")
              );
              this.$router.push({
                name: "workbenchApp",
              }); //跳转到工作台
            }
          });
        } else {
          return false;
        }
      },
      //审核不通过按钮
      goNOAudit() {
        var valid = this.$refs.auditInfo.getValidate(); //审核必填校验
        if (valid) {
          var url = Vue.gvUtil.getUrl({
            apiName: "notConfirmGcEstimateLoss",
            contextName: "selfins",
          });
          this.cundata.gwWorkTask = this.taskObj;
          this.cundata.ggApproveHistoryVo.opinions =
            this.$refs.auditInfo.getData();
          Vue.gvUtil.http.post(url, this.cundata).then((res) => {
            if (res.resCode === "0000") {
              //操作成功
              this.$message.success(
                Vue.filter("translate")("gOperationSuccessful")
              );
              this.$router.push({
                name: "workbenchApp",
              }); //跳转到工作台
            }
          });
        } else {
          return false;
        }
      },
      //审核轨迹
      auditTrail() {
        Vue.gvUtil.showTrail({
          innerRefNo: this.taskObj, //内部参考号
        });
      },
      //下级节点人
      WorkingNext() {
        var url = Vue.gvUtil.getUrl({
          apiName: "gsgetEsWorkNext",
          contextName: "selfins",
        });
        let obj = {
          gcClaimMainSelfVo: this.baseInfo,
          gwWorkTask: this.taskObj,
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.workflowdialog = true;
              this.gwNextNodeExecutorsList = res.resData;
            } else if (res.resData.length == 0) {
              this.Audit();
            }
          }
        });
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //审核通过接口
          this.Audit();
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.filter("translate")("zbseleoneoprat"));
        }
      },
      //返回
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
    },
    mounted: function () {
      //工作流过来的审核
      if (this.$route.query.pageType == "task") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.checkClaimgs();
      } else if (this.$route.query.pageType == "amend") {
        //工作流过来的下发修改
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.checkClaimgs();
        ////工作流过来的查看
      } else if (this.$route.query.pageType == "back") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.checkClaimgs();
        this.backisTrue = false;
      }
    },
    destroyed: function () {
      if (sessionStorage.getItem("taskObj")) {
        sessionStorage.removeItem("taskObj");
      }
    },
  });
});
