/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      findItemInfo: "/gcClaimMainSelf/findItemInfo", //标的查看
      findAmortization: "/gcClaimMainSelf/findAmortization", //摊赔
      findCountry: "/gcClaimMainSelf/findCountry", //出险国家
      findListCode: "/ggCode/findList", //码表
      ggCodfindExchange: "/ggCode/findExchangeRate", // 获取兑换率 入参 : {"baseCurrency":"002",--本单币别   "exchCurrency":"001"--原单币别}
      // findselfchangerate: "", //兑换率/policySelfMain/findExchange
      selectGcClaim: "/gcClaimMainSelf/selectGcClaim", //估损信息接口
      gcEstimateLossCheck: "/gcClaimMainSelf/gcEstimateLossCheck", //估损审核接口
    },
  };
  Vue.gvUtil.setApi(config.api);
  var settlingCeding = require("../../claimViewApp/index");
  selfInsurancePolicyCeding = require("../../../endorsement/batchentryinfo8App/index");
  selfClm = require("../index");
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    query: function () {
      return {};
    },
    props: {
      inputName: {},
    },
    datas: function () {
      return {
        zbgsLossassbutt: true,
        checkaddbut: true, //未结案进来的摊赔弹框新增按钮
        baseCu: "", //本单币别
        selfCurrency: "", //原单币别
        Notthecase: false, //未结案进来 是否只读  false:代表可填写  true:代表禁用ok
        gssheReadOnly: false, //估损审核后只读
        unadd: true, //未结案进来
        isRed: false, //变色
        c: 0, //值
        b: 0, //值
        cenglayerNo: 1, //层序号
        qjlcomplant: "", //全局原赔案赔付金额
        gsrate: "", //全局兑换率
        gsCurrency: "", //全局币别
        natureqj: "", //损失性质
        initHKratemoney: 0, //拿到港币兑换率
        settlingCeding: false, //原单赔案号详情弹框
        selfInsurancePolicyCeding: false, //自保详情弹框
        CountryList: [], //出险国家list
        totalNum: 0, //理算金额
        itemindex: "", //点击摊赔获取最外层数据的下标
        scopeindex: "", //点击摊赔获取当前行数据的下标
        reinsurer: [], //再保人全局
        allgcAmortizationVoList: [], //摊赔全部数据
        tanpelist: [], //摊赔再保人list
        ClaimFeeTypelist: [], //码表费用类型下拉
        feeTypeselect: [], //费用类型下拉
        self: true, //初始化页面为新增，false为前端系统回显页面
        showPaymentPlanDialog: false, //赔付标的弹框
        showClaimamortizationDialog: false, //理赔摊赔弹框
        PreviouslossassessmentDialog: false, //历次估损
        Submit: false, //提交后改变只读状态1(提交时全部只读设置Submit。isReadonly  true，其他为false)ok
        amend: false, //修改时 （重开时只有 其余全部为false amend为true）ok
        activeNames: ["1", "2", "3", "4"],
        isReadonly: false, //是否只读  false:代表可填写  true:代表禁用ok
        addbutton: true, //删除/新增按钮是否可见
        viewonly: true, // 录入页面时只读的数据   (新增赔案数据是viewonly为true，其他为false)ok
        rules: {},
        CommpaymentAmountCnAll: 0,
        addunderlyingclick: false,
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
        //1. 基础信息
        baseInfo: {
          claimMainId: "",
          claimNo: "",
          policyNo: "",
          version: "",
          sourceClaimNo: null,
          registerNo: "",
          claimDate: "",
          claimStatus: "",
          riskCode: "",
          insureCompany: "",
          locationAccident: "",
          lossCountry: "",
          lossDateTime: "",
          circumstances: "",
          accidentDescription: "",
          remark: "",
          createdBy: "",
          createdDate: "",
          amendedBy: "",
          amendedDate: "",
          approvedBy: "",
          approvedDate: "",
          paymentAmountCnAll: 0,
          retainedAmountAll: 0,
          isEsBill: "00",
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
          isEsBill: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
        },
        // 2.理赔信息
        arrpfDatalist: {
          arrpfData: [
            {
              checkStatus: "", //01表示审核通过的，不可删除不可修改
              adjustmentId: "",
              claimMainId: "",
              claimNo: "",
              policyNo: "",
              version: "",
              transactionNo: "",
              documentNo: "",
              paymentDate: "",
              paymentUser: "",
              payType: "",
              payeeCode: "",
              payeeName: "",
              currency: "",
              rate: "",
              paymentAmount: 0,
              paymentAmountCn: 0,
              approvedBy: "",
              approvedDate: "",
              flag: "02",
              //赔付表格  gcAdjustmentDetailVo
              gcAdjustmentDetailVoList: [],
            },
          ],
        },
        //理赔信息校验
        arrpfDatarules: {
          rate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          currency: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          riskCode: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          itemNo: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          feeType: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          paidAmount: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          paidAmountCn: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        },
        //3.标的
        expandForm: {
          underlying: [],
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
        //理赔摊赔Dialog
        tanp: {
          tabkuanglipei: [
            // {
            // amortizationId: "",
            // adjustmentId: "",
            // detailId: "",
            // lossSerialNo: "44",
            // layerNo: "44",
            // nature: "44",
            // reinsurerCode: "44",
            // currency: "",
            // currencyRate: "44",
            // riShare: "44",
            // riPid: "0.00",
            // riPidCn: "0.00",
            // feeType: "44",
            // remark: "44",
            // documentNo: "44",
            // },
          ],
        },
        //理赔摊赔Dialog校验
        tanpRules: {
          layerNo: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          currency: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          nature: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          reinsurerCode: [
            {
              required: true,
              message: Vue.filter("translate")("zbnoreinsurerinformation"),
              trigger: "change",
            },
          ],
          currencyRate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          riShare: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          riPid: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          riPidCn: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          feeType: [
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
        lossassessmentData: [], //历次估损
        // 4.标的详情表单验证规则
        matterTableForm: {
          // 再保人表格数据
          recognizeeTableList: [],
          reinsurerTableList: [],
          // 被保人表格数据
          reinsurerTableLabel: [
            //再保人表格字段
            // 再保人
            {
              label: Vue.gvUtil.getInzTranslate("reinsurer"),
              prop: "reinsurer", //reinsurerCode 再保人名称
              maxlength: 200,
              numLen: 0,
              type: "text",
            },
            // 分出比例
            {
              label: Vue.gvUtil.getInzTranslate("distributionRatio"),
              prop: "selfInsuranceRate",
              maxlength: 16,
              numLen: 6,
              type: "number",
            },
            // 原分出毛保费
            {
              label: Vue.gvUtil.getInzTranslate("originalGrossPremium"),
              prop: "riOriGrossPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 分出保额
            {
              label: Vue.gvUtil.getInzTranslate("cededAmount"),
              prop: "riShareValue",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 分出净保费
            {
              label: Vue.gvUtil.getInzTranslate("netPremiumPaidOut"),
              prop: "totalDue",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 分出费率
            {
              label: Vue.gvUtil.getInzTranslate("cededRate"),
              prop: "riRate",
              maxlength: 16,
              numLen: 4,
              type: "number",
            },
            // 年保费
            {
              label: Vue.gvUtil.getInzTranslate("annualPremium"),
              prop: "annualPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 检验费
            {
              label: Vue.gvUtil.getInzTranslate("inspectionFee"),
              prop: "mws",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 分出佣金
            {
              label: Vue.gvUtil.getInzTranslate("commissionOut"),
              prop: "commission",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 分出总保费
            {
              label: Vue.gvUtil.getInzTranslate("totalPremiumPaidOut"),
              prop: "totalPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 备注1
            {
              label: Vue.gvUtil.getInzTranslate("note1"),
              prop: "remark1",
              maxlength: 200,
              numLen: 0,
              type: "textarea",
            },
            // 备注2
            {
              label: Vue.gvUtil.getInzTranslate("note2"),
              prop: "remark2",
              maxlength: 200,
              numLen: 0,
              type: "textarea",
            },
          ],
          //被保人表格字段
          recognizeeTableLabel: [
            // 被保人
            {
              label: Vue.gvUtil.getInzTranslate("insured"),
              prop: "insured",
              code: "CARD,EAS,OOPD",
              maxlength: 200,
              type: "text",
            },
            // 工程名称
            {
              label: Vue.gvUtil.getInzTranslate("projectName"),
              prop: "project",
              code: "CARD",
              maxlength: 200,
              type: "text",
            },
            // 工程地址
            {
              label: Vue.gvUtil.getInzTranslate("projectAddress"),
              prop: "location",
              code: "CARD",
              maxlength: 2000,
              type: "text",
            },
            // 原险种代码
            {
              label: Vue.gvUtil.getInzTranslate("originalInsuranceCode"),
              prop: "cedingRiskCode",
              code: "CARD,EAS,OOPD",
              maxlength: 10,
              type: "text",
            },
            // 原险种名称
            {
              label: Vue.gvUtil.getInzTranslate("nameInsurance"),
              prop: "cedingRiskName",
              code: "CARD,EAS,OOPD",
              maxlength: 100,
              type: "text",
            },
            // 原保单号
            {
              label: Vue.gvUtil.getInzTranslate("originalWarrantyNumber"),
              prop: "cedingPolicyNo",
              code: "CARD,OOPD",
              maxlength: 21,
              type: "text",
            },
            // 项目名称
            {
              label: Vue.gvUtil.getInzTranslate("entryName"),
              prop: "projectName",
              code: "CARU",
              maxlength: 200,
              type: "text",
            },
            // 船舶名称
            {
              label: Vue.gvUtil.getInzTranslate("nameVessel"),
              prop: "vesselName",
              code: "MAR",
              maxlength: 200,
              type: "text",
            },
            // 船舶类型
            {
              label: Vue.gvUtil.getInzTranslate("shipType"),
              prop: "usage",
              code: "MAR",
              maxlength: 100,
              type: "text",
            },
            // 船籍
            {
              label: Vue.gvUtil.getInzTranslate("shipNationality"),
              prop: "registered",
              code: "MAR",
              maxlength: 100,
              type: "text",
            },
            // 载重吨位／重量
            {
              label: Vue.gvUtil.getInzTranslate("dwtWeight"),
              prop: "tonnage",
              code: "MAR",
              maxlength: 9,
              numLen: 2,
              type: "number",
            },
            // 建造年份
            {
              label: Vue.gvUtil.getInzTranslate("yearConstruction"),
              prop: "builtYear",
              code: "MAR",
              maxlength: 4,
              type: "text",
            },
            // 航行区域
            {
              label: Vue.gvUtil.getInzTranslate("navigationArea"),
              prop: "workingArea",
              code: "MAR",
              maxlength: 200,
              type: "text",
            },
            // 层
            {
              label: Vue.gvUtil.getInzTranslate("layer"),
              prop: "layer",
              code: "MAR",
              maxlength: 1,
              type: "text",
            },
            // 属性
            {
              label: Vue.gvUtil.getInzTranslate("attribute"),
              prop: "nature",
              code: "MAR",
              maxlength: 100,
              type: "text",
            },
            // 免赔
            {
              label: Vue.gvUtil.getInzTranslate("deductible"),
              prop: "excess",
              code: "MAR",
              maxlength: 200,
              type: "text",
            },
            // 油田
            {
              label: Vue.gvUtil.getInzTranslate("oilField"),
              prop: "oilField", //oilFieldCode 油田代码
              code: "ODE,OEE,OOPU",
              maxlength: 200,
              type: "text",
            },
            // 井名
            {
              label: Vue.gvUtil.getInzTranslate("wellName"),
              prop: "wellName",
              code: "ODE,OEE",
              maxlength: 200,
              type: "text",
            },
            // 井号
            {
              label: Vue.gvUtil.getInzTranslate("wellNo"),
              prop: "wellNo",
              code: "ODE,OEE",
              maxlength: 50,
              type: "text",
            },
            // 井型
            {
              label: Vue.gvUtil.getInzTranslate("wellType"),
              prop: "wellType",
              code: "OEE",
              maxlength: 50,
              type: "text",
            },
            // 井深（米）
            {
              label: Vue.gvUtil.getInzTranslate("wellDepth(m)"),
              prop: "depthm",
              code: "OEE",
              maxlength: 16,
              numLen: 6,
              type: "number",
            },
            // 井深（英尺）
            {
              label: Vue.gvUtil.getInzTranslate("wellDepth(ft)"),
              prop: "depthft",
              code: "OEE",
              maxlength: 16,
              numLen: 6,
              type: "number",
            },
            // 作业区
            {
              label: Vue.gvUtil.getInzTranslate("operationArea"),
              prop: "area",
              code: "OOPU",
              maxlength: 200,
              type: "text",
            },
            // 财产名称
            {
              label: Vue.gvUtil.getInzTranslate("nameProperty"),
              prop: "propertyDetails",
              code: "OOPU",
              maxlength: 200,
              type: "text",
            },
            // 财产类型
            {
              label: Vue.gvUtil.getInzTranslate("typeProperty"),
              prop: "propertyType",
              code: "OOPU",
              maxlength: 100,
              type: "text",
            },
            // 项
            {
              label: Vue.gvUtil.getInzTranslate("term"),
              prop: "section",
              code: "common",
              maxlength: 10,
              type: "text",
            },
            // 保险起期
            {
              label: Vue.gvUtil.getInzTranslate("startingDateInsurance"),
              prop: "periodStart",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 保险止期
            {
              label: Vue.gvUtil.getInzTranslate("expiryDateInsurance"),
              prop: "periodEnd",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 保额／限额
            {
              label: Vue.gvUtil.getInzTranslate("coverageLimit"),
              prop: "insuredValue",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 海油权益
            {
              label: Vue.gvUtil.getInzTranslate("rightsCnooc"),
              prop: "interestcnooc",
              code: "common",
              maxlength: 9,
              numLen: 6,
              type: "number",
            },
            // 自保比例
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceRatio"),
              prop: "selfInsuranceRate",
              code: "common",
              maxlength: 9,
              numLen: 6,
              type: "number",
            },
            // 自保保额
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceAmount"),
              prop: "cilShareValue",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 自保分入原毛保费
            {
              label: Vue.gvUtil.getInzTranslate("originalGrossInsurance"),
              prop: "cilOriGrossPremium",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
            },
            // 自保分入净保费
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceNetPremium"),
              prop: "totalDue",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 自保费率
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceRate"),
              prop: "cilRate",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 自保佣金
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceCommission"),
              prop: "commission",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 自保毛保费
            {
              label: Vue.gvUtil.getInzTranslate("grossSelfInsurancePremium"),
              prop: "cilGrossPremium",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 承保天数
            {
              label: Vue.gvUtil.getInzTranslate("daysCovered"),
              prop: "insuredDay",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 承保月数
            {
              label: Vue.gvUtil.getInzTranslate("monthsUnderwriting"),
              prop: "oriMonths",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 月保费
            {
              label: Vue.gvUtil.getInzTranslate("monthlyPremium"),
              prop: "oriPerMonth",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 年保费
            {
              label: Vue.gvUtil.getInzTranslate("annualPremium"),
              prop: "oriAnnualPremium",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 备注1
            {
              label: Vue.gvUtil.getInzTranslate("note1"),
              prop: "remark1",
              code: "common",
              maxlength: 200,
              type: "text",
            },
            // 备注2
            {
              label: Vue.gvUtil.getInzTranslate("note2"),
              prop: "remark2",
              code: "common",
              maxlength: 200,
              type: "text",
            },
          ],
        },
      };
    },
    created() {
      this.findCodelist();
      this.findCountry();
    },
    computed: {
      newName() {
        // 算分出分出总保费
        let total = 0; //总分入金额合计算
        let chintotal = 0; //总分出
        this.arrpfDatalist.arrpfData.forEach((item, index) => {
          total += Number(item.paymentAmount);
          item.gcAdjustmentDetailVoList.forEach((c, indexss) => {
            var fenchu = 0;
            c.gcAmortizationVoList.forEach((chilcditem) => {
              //转数字类型
              let churipid = Number(chilcditem.riPid);
              if (chilcditem.feeType == "Deductible") {
                //分出内费用类型为Deductible，相减
                chintotal = chintotal - Number(churipid);
              } else {
                chintotal += Number(churipid);
              }
              fenchu += Number(churipid);
            });
            //单元格自留金额=分入-分出
            this.$nextTick(function () {
              c.retainedAmount = Number(c.paidAmount) - fenchu;
            });
          });
        });
        this.baseInfo.paymentAmountCnAll = total; //总分入金额
        this.baseInfo.riPidCnAll = chintotal; ////总分出金额
        this.baseInfo.retainedAmountAll = total - chintotal; //总自留金额
      },
    },
    components: {
      settlingCeding,
      selfInsurancePolicyCeding,
      selfClm,
    },
    events: {
      //为表格表头添加星号样式
      must: function (obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      must1: function (obj) {
        if (
          obj.columnIndex == 0 ||
          obj.columnIndex == 1 ||
          obj.columnIndex == 2 ||
          obj.columnIndex == 3 ||
          obj.columnIndex == 4 ||
          obj.columnIndex == 5 ||
          obj.columnIndex == 6
        ) {
          return "must";
        }
      },
      must2: function (obj) {
        if (
          obj.columnIndex == 2 ||
          obj.columnIndex == 3 ||
          obj.columnIndex == 4 ||
          obj.columnIndex == 5 ||
          obj.columnIndex == 6
        ) {
          return "must";
        }
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
      //初始化拿到HK兑换率
      initHKRate(ss) {
        this.baseCu = ss;
        var url = Vue.gvUtil.getUrl({
          apiName: "ggCodfindExchange",
          contextName: "selfins",
        });
        let obj = {
          baseCurrency: ss, //美元
          exchCurrency: "USD", //美元
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            this.initHKratemoney = res.resData.exchangeRate;
            this.arrpfDatalist.arrpfData[0].rate = res.resData.exchangeRate;
            this.arrpfDatalist.arrpfData[0].currency = ss;
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
      //点击弹出弹框
      addunderlying(aa) {
        if (aa == "underlying") {
          //标的查询页面 传险种代码过去 以及将标的序号传过去
          this.$emit(
            "addunderlying",
            this.baseInfo,
            this.expandForm.underlying,
            false
          );
        } else if (aa == "originalclaim") {
          // 点击原单赔案号查询
          //是否确认放弃已经填写信息进行重选
          if (this.baseInfo.sourceClaimNo) {
            Vue.gvUtil
              .confirm({
                msg: Vue.gvUtil.getInzTranslate("zbclamchooseinfoemation"),
              })
              .then(
                () => {
                  //传true会重置页面
                  this.$emit("OriginalClaim", this.baseInfo, true);
                },
                function () {}
              );
          } else {
            this.$emit("OriginalClaim", this.baseInfo, false);
          }
        } else if (aa == "inquiryD") {
          // 自保保单号查询页面;
          //如果有保单号/版本号再次选择提示
          //是否确认放弃已经填写信息进行重选
          if (this.baseInfo.policyNo && this.baseInfo.version) {
            Vue.gvUtil
              .confirm({
                msg: Vue.gvUtil.getInzTranslate("zbclamchooseinfoemation"),
              })
              .then(
                () => {
                  //传true会重置页面
                  this.$emit("inquiryD", true);
                },
                function () {}
              );
          } else {
            this.$emit("inquiryD", false);
          }
        }
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
      //改变出险日期(判断出险日期是否在保单起期与止期之间)
      changelossDateTime(self) {
        if (this.baseInfo.effectiveDate && this.baseInfo.expiryDate) {
          var list = [
            self,
            this.baseInfo.effectiveDate,
            this.baseInfo.expiryDate,
          ];
          pushlist = [];
          list.forEach((item, index) => {
            let ss = /\d{1,2}-\d{1,2}-\d{4}/g.exec(item);
            let itemseifa = ss[0].split("-");
            uniteem = itemseifa[2] + "-" + itemseifa[1] + "-" + itemseifa[0];
            chuxian = new Date(uniteem).getTime();
            pushlist.push(chuxian);
          });
          if (pushlist[0] >= pushlist[1] && pushlist[0] <= pushlist[2]) {
          } else {
            //出险日期不在保期内
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("zbDataWithinperiod")
            );
            this.baseInfo.lossDateTime = "";
          }
        } else {
          //请先选择自保保单
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbpleaseChoosepolicyf")
          );
          this.baseInfo.lossDateTime = "";
        }
      },
      //改变理赔的标的序号，得到摊赔值
      changeitemNo(rowindex, scoperow, item) {
        var url = Vue.gvUtil.getUrl({
          apiName: "findAmortization",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, { itemMainId: scoperow.itemNo })
          .then((res) => {
            if (res.resCode === "0000") {
              //将再保人放进该行中的reinsurer字段
              this.arrpfDatalist.arrpfData[item].gcAdjustmentDetailVoList[
                rowindex
              ].reinsurer = res.resData;
            }
          });
      },
      //摊赔弹框保存按钮
      saveshowClaimamortizationDialog(footer, item) {
        this.$refs["tanp"].validate((valid) => {
          if (valid) {
            // let allfenchuMoney = 0; //分出赔款总额
            // let datalist = JSON.parse(JSON.stringify(this.tanp.tabkuanglipei));
            // datalist.forEach((v) => {
            //   allfenchuMoney += Number(v.riPid);
            //   console.log(v.riPid, "num", Number(v.riPid));
            // });
            // let arrlist = this.arrpfDatalist.arrpfData[this.itemindex]
            //   .gcAdjustmentDetailVoList[this.scopeindex];
            // this.$nextTick(function () {
            //   arrlist.retainedAmount = arrlist.paidAmount - allfenchuMoney;
            // });
            // this.arrpfDatalist.arrpfData[
            //   this.itemindex
            // ].gcAdjustmentDetailVoList[
            //   this.scopeindex
            // ].gcAmortizationVoList = datalist;
            this.arrpfDatalist.arrpfData[
              this.itemindex
            ].gcAdjustmentDetailVoList[this.scopeindex].gcAmortizationVoList =
              JSON.parse(JSON.stringify(this.tanp.tabkuanglipei));
            this.showClaimamortizationDialog = false;
          } else {
            return false;
          }
        });
      },
      //点击历次估损
      Previouslossassessment(row) {
        this.lossassessmentData = row.gcEstimateLossHistoryVoList;
        this.PreviouslossassessmentDialog = true;
      },
      //点击新增
      addData(data, index, item) {
        // 新增理赔摊赔信息
        if (index == "amortization") {
          //理赔摊赔信息
          let xulength = this.tanp.tabkuanglipei.length + 1;
          var c = (Array(3).join("0") + xulength).slice(-3);
          this.tanp.tabkuanglipei.push({
            tanpelist: this.b,
            amortizationId: "",
            adjustmentId: "",
            detailId: "",
            lossSerialNo: "",
            layerNo: c, //层序号
            nature: this.reinsurer[0].nature, //损失性质
            reinsurerCode: "",
            currency: this.gsCurrency,
            currencyRate: this.gsrate,
            riShare: "",
            riPid: "0.00", //默认为0.00
            riPidCn: "0.00", //默认为0.00
            feeType: this.feeTypeselect,
            remark: "",
            documentNo: "",
            flag: "02",
            checkStatus: "", //审核状态   “01”表示审核通过，审核通过后的数据不允许修改
          });
        } else if (data == "gcEstimateLossVo") {
          //新增估损信息
          var url = Vue.gvUtil.getUrl({
            apiName: "selectGcClaim",
            contextName: "selfins",
          });
          let obj = {
            itemMainId: item.itemMainId,
            sourceClaimNo: this.baseInfo.sourceClaimNo,
          };
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode === "0000") {
              index.push(res.resData);
            }
          });
        } else if (data == "Compensation") {
          //新增赔付表格   this.arrpfData[index]表示最外层的数据
          if (this.baseInfo.riskCode) {
            item.gcAdjustmentDetailVoList.push({
              detailId: "",
              adjustmentId: "",
              riskCode: this.baseInfo.riskCode,
              itemNo: "",
              itemMainId: "",
              feeType: "",
              paidAmount: 0, //默认为0.00
              paidAmountCn: 0, //默认为0.00
              remarks: "",
              sourceNo: "",
              retainedAmount: 0,
              sourceAccount: 0, //默认为0.00
              rate: "",
              flag: "02", //(00,01,02 删除，修改，新增)
              feeTypeselect: [],
              gcAmortizationVoList: [], //表示摊赔的数据
            });
          } else {
            Vue.gvUtil.message("请选择原保单号");
          }
        } else if (data == "pfData") {
          //新增赔付全部信息
          if (this.baseInfo.riskCode) {
            this.arrpfDatalist.arrpfData.push({
              adjustmentId: "",
              claimMainId: "",
              claimNo: "",
              policyNo: "",
              version: "",
              transactionNo: "",
              documentNo: "",
              paymentDate: "",
              paymentUser: "",
              payType: "",
              payeeCode: "",
              payeeName: "",
              currency: this.baseCu,
              rate: this.initHKratemoney,
              flag: "02", //(00,01,02 删除，修改，新增)
              paymentAmount: 0,
              paymentAmountCn: 0,
              approvedBy: "",
              approvedDate: "",
              //赔付表格  gcAdjustmentDetailVoList
              gcAdjustmentDetailVoList: [],
            });
          } else {
            //请先选择自保保单
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("zbpleaseChoosepolicyf")
            );
          }
        }
      },
      // 点击删除
      remove(index, self, item) {
        if (self == "amortization") {
          //删除理赔摊赔信息
          this.tanp.tabkuanglipei.splice(index, 1);
        } else if (self == "Compensation") {
          //删除赔付表格
          item.gcAdjustmentDetailVoList.splice(index, 1);
          this.pfMoney(item);
          this.changepaidAmountCn("", item);
        } else if (self == "gcEstimateLossVo") {
          //删除估损信息
          item.splice(index, 1);
        } else if (self == "underlying") {
          //删除标的信息
          if (item.isRed && item.isRed == "01") {
            this.isRed = false;
          }
          this.expandForm.underlying.splice(index, 1);
          //如果当前标的删除，理赔里的相同标的序号也会清空,费用类型也清空
          this.arrpfDatalist.arrpfData.forEach((self) => {
            self.gcAdjustmentDetailVoList.forEach((f) => {
              if (item.itemMainId == f.itemNo) {
                f.itemNo = "";
                f.feeType = "";
              }
            });
          });
        } else if (self == "pfData") {
          //删除赔付全部信息
          this.arrpfDatalist.arrpfData.splice(index, 1);
        }
      },
      //删除赔付表格，更新赔付金额
      pfMoney(item) {
        var a = 0;
        item.gcAdjustmentDetailVoList.forEach((v) => {
          v.paidAmount - 0;
          a += v.paidAmount;
        });
        item.paymentAmount = a;
      },
      //改变估损金额
      changegrossLossAmount(e, row) {
        var val = e;
        row.outLossAmount = val - row.paidLossAmount;
      },
      //点击理赔表格中的费用类型
      feeTypese(ss, scoperow) {
        //1.判断当前行是否有标的序号
        if (ss) {
          this.expandForm.underlying.forEach((v) => {
            if (v.itemMainId == ss) {
              scoperow.feeTypeselect = v.gcEstimateLossVoList.map((item) => {
                return { feeTypeCode: item.feeTypeCode };
              });
              //循环码表
              this.ClaimFeeTypelist.forEach((f) => {
                //循环费用类型字段
                scoperow.feeTypeselect.forEach((c, index) => {
                  if (f.codeCode == c.feeTypeCode) {
                    scoperow.feeTypeselect[index].feeTypeName = f.codeName;
                  }
                });
              });
            }
          });
        } else {
          //请先选择标的序号
          Vue.gvUtil.message(Vue.gvUtil.getInzTranslate("zbmarkingselect"));
        }
      },
      //手动更改分入人民币
      changepaidAmountCn(scope, item) {
        let monCN = 0;
        item.gcAdjustmentDetailVoList.forEach((v) => {
          if (v.feeType == "Deductible") {
            monCN = monCN - Number(v.paidAmountCn); //分入人民币相减
          } else {
            monCN += Number(v.paidAmountCn); //分入人民币相加
          }
        });
        let num = monCN.toFixed(2);
        // item.paymentAmountCn = num * item.rate; //总分入人民币
        item.paymentAmountCn = num;
      },
      //改变费用类型
      changedfee(scoperow, item) {
        scoperow.gcAmortizationVoList.forEach((f) => {
          f.feeType = scoperow.feeType;
        });
        if (scoperow.itemNo && scoperow.feeType) {
          this.changesourceAccount(scoperow, item);
        }
      },
      //原赔案赔付金额修改
      changesourceAccount(scoperow, item) {
        if (scoperow.itemNo && scoperow.feeType) {
          //分入金额=原赔案赔付金额*自保比例/100
          scoperow.paidAmount =
            (scoperow.sourceAccount * scoperow.reinsurer[0].cilShare) / 100;
          let toeal = 0;
          ri = scoperow.paidAmount; //分入金额
          scoperow.gcAmortizationVoList.forEach((c) => {
            if (c.feeType == "Deductible") {
              //总金额=总金额-分出摊赔
              toeal = toeal - c.riPid;
            } else {
              toeal += c.riPid;
            }
            c.riPid = (ri * c.riShare) / 100;
            c.riPidCn = c.riPid * c.currencyRate;
          });
          this.$nextTick(function () {
            //自留金额=分入金额-分出金额
            scoperow.retainedAmount = ri - toeal;
          });
          this.totelPaidAmun(item, scoperow);
        } else {
          //请选择标的序号及费用类型
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbpselectsubjectnumextype")
          );
          this.$nextTick(function () {
            scoperow.sourceAccount = null;
          });
        }
      },
      //修改摊赔兑换率
      changetanpei(scoperow) {
        scoperow.riPidCn = scoperow.riPid * scoperow.currencyRate;
      },
      fenchuriPid(scoperow) {
        scoperow.riPidCn = scoperow.currencyRate * scoperow.riPid;
      },
    },
    methods: {
      initPage: function () {
        Vue.gvUtil.initTranslation("ExpenseStatus,Currency,EstimateLossStatus");
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
      //估损审核
      gsClick() {
        var _this = this;
        let sizeLenth = true;
        _this.expandForm.underlying.forEach((v) => {
          v.gcEstimateLossVoList.forEach((f) => {
            if (f.status == "" || f.status == null || f.status == "00") {
              sizeLenth = false;
              return sizeLenth;
            } else {
              sizeLenth = true;
            }
          });
        });
        if (sizeLenth) {
          //  当前无可估损的标的信息
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbnoinforsubmattereastimated")
          );
        } else {
          let xiaoyan = _this.expandFormxiyan();
          let basinxiaoyan = _this.xiaoyan();
          if (xiaoyan == true && basinxiaoyan) {
            //是否确认进行估损审核？
            Vue.gvUtil
              .confirm({
                msg: Vue.gvUtil.getInzTranslate("zbAreyousuereastimate"),
              })
              .then(
                function () {
                  _this.$emit("gsassessmentaudit", "yes");
                },
                function () {}
              );
          } else if (xiaoyan == "tips" && basinxiaoyan) {
            //同一标的下的费用类型不允许相同
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("znexpentypeundercannotasme")
            );
            return false;
          } else {
            //请完善信息！
            Vue.gvUtil.message(
              Vue.filter("translate")("zbPleasecompletetheinformation")
            );
            return false;
          }
        }
      },
      //点击摊赔
      tanpbutton(cIndex, index, scoperow) {
        //判断是否有费用序号与费用类型与兑换率
        this.checkaddbut = true;
        // if (
        //判断是否有再保人
        //   this.arrpfDatalist.arrpfData[index].gcAdjustmentDetailVoList[cIndex]
        //     .reinsurer[0].reinsurer
        // ) {
        if (
          scoperow.itemNo &&
          scoperow.feeType &&
          this.arrpfDatalist.arrpfData[index].rate &&
          scoperow.sourceAccount
        ) {
          //判断当前行是否已经审核通过 1.如通过新增按钮隐藏
          if (scoperow.checkStatus == "01") {
            this.checkaddbut = false;
          }
          //将该条数据设置为全局
          this.scopeindex = cIndex;
          this.itemindex = index;
          this.tanp.tabkuanglipei = JSON.parse(
            JSON.stringify(
              this.arrpfDatalist.arrpfData[index].gcAdjustmentDetailVoList[
                cIndex
              ].gcAmortizationVoList
            )
          );
          // 全局变量reinsurer再保人
          this.reinsurer = JSON.parse(
            JSON.stringify(
              this.arrpfDatalist.arrpfData[index].gcAdjustmentDetailVoList[
                cIndex
              ].reinsurer
            )
          );
          //全局的原赔案赔付金额
          this.qjlcomplant =
            this.arrpfDatalist.arrpfData[index].gcAdjustmentDetailVoList[
              cIndex
            ].sourceAccount;
          //currency币别全局
          this.gsCurrency = this.arrpfDatalist.arrpfData[index].currency;
          //全局兑换率
          this.gsrate = this.arrpfDatalist.arrpfData[index].rate;
          // 全局变量feeTypeselect费用类型只读
          this.feeTypeselect = JSON.parse(JSON.stringify(scoperow.feeType));
          //当前条费用类型和摊赔费用类型一样
          this.showClaimamortizationDialog = true;
        } else {
          //请完善当前行信息
          Vue.gvUtil.message(
            Vue.filter("translate")("zbPleasecompletethecurrentlineinformation")
          );
        }
        // }
      },
      //保存基本数据校验
      xiaoyan() {
        let flag = false;
        this.$refs["baseInfos"].validate((valid) => {
          if (valid) {
            flag = true;
          } else {
            flag = false;
          }
        });
        return flag;
      },
      // 赔付数据校验
      prifuxy() {
        let flag = false;
        this.$refs.arrpfDatas.validate((valid) => {
          if (valid) {
            flag = true;
          } else {
            flag = false;
          }
        });
        return flag;
      },
      //估损数据校验
      expandFormxiyan() {
        let flag = false;
        this.$refs["expandForm"].validate((valid) => {
          if (valid) {
            this.expandForm.underlying.forEach((v) => {
              if (v.gcEstimateLossVoList.length == 0) {
                //zbunderlyingassessment  标的估损不能为空
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbunderlyingassessment")
                );
                flag = false;
                return flag;
              } else {
                var ary = v.gcEstimateLossVoList.map(function (i) {
                  return i.feeTypeCode;
                });
                var nary = ary.sort();
                if (nary.length > 1) {
                  for (var i = 0; i < nary.length - 1; i++) {
                    if (nary[i] == nary[i + 1]) {
                      // Vue.gvUtil.message("同一标的下的费用类型不允许相同");
                      flag = "tips";
                      return flag;
                    } else {
                      flag = true;
                    }
                  }
                } else if ((nary.length = 1)) {
                  flag = true;
                }
              }
            });
          } else {
            flag = false;
          }
        });
        return flag;
      },
      //码表费用类型自调用
      findCodelist() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findListCode",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, { codeType: "ClaimFeeType", validind: "1", isFuzzy: "0" })
          .then((res) => {
            if (res.resCode === "0000") {
              this.ClaimFeeTypelist = res.resData.ggCodeVoList.ClaimFeeType;
            }
          });
      },
      //修改理赔信息
      changeitem(item) {
        //如果为新增就没有修改
        if (item.flag == "02") {
          item.flag = "02";
        } else {
          //表示修改
          item.flag = "01";
        }
      },
      //点击再保人给再保比例
      currencyRate(reinsurer, scoperow) {
        scoperow.riShare = reinsurer[0].selfInsuranceRate;
        scoperow.riPid = (this.qjlcomplant * scoperow.riShare) / 100;
        scoperow.riPidCn = scoperow.riPid * scoperow.currencyRate;
      },
      //修改标的内的估损信息
      changeunderlying(ss) {
        //如果是审核通过以后，修改的话，将状态变为初始化，审核人和审核时间清空
        if (ss.status == "01") {
          ss.status = "00";
          ss.approvedBy = "";
          ss.approvedDate = "";
        } else {
        }
        //如果她修改了估损信息内容，flage="01",01表示修改  02表示新增
        //如果为新增就没有修改
        if (ss.flag == "02") {
        } else {
          //表示修改
          ss.flag = "01";
        }
      },
      //修改整案估损
      changeallGrossLossAmount(e, scoperow) {
        var val = e;
        let a = scoperow;
        a.grossLossAmount = val * (a.cilShare / 100);
        a.outLossAmount = a.grossLossAmount - a.paidLossAmount;
      },
      //理算金额汇总
      totelPaidAmun(item, scoperow) {
        item.paymentAmount = 0;
        var paymentAmount = Number(item.paymentAmount); //转数字类型
        var rateRMB = Number(item.rate); //兑换率转数字类型
        item.gcAdjustmentDetailVoList.forEach((v) => {
          let itempaidAmount = Number(v.paidAmount); //转数字类型
          if (v.feeType == "Deductible") {
            paymentAmount = paymentAmount - itempaidAmount;
          } else {
            paymentAmount += itempaidAmount;
          }
        });
        var totelchinesen = rateRMB * paymentAmount; //理算金额人民币=兑换率*理算金额
        item.paymentAmountCn = totelchinesen + "";
        item.paymentAmount = paymentAmount + ""; //数字类型转字符串并赋值
        this.$nextTick(function () {
          //当前行人民币金额=兑换率*金额
          scoperow.paidAmountCn = rateRMB * scoperow.paidAmount;
        });
        // 如果表格长度大于1，全局声明b=0，将最后一行算差值
        if (item.gcAdjustmentDetailVoList.length > 1) {
          this.b = 0;
          item.gcAdjustmentDetailVoList.forEach((ss, indexss) => {
            let money = Number(ss.paidAmountCn); //转数字类型
            if (indexss != item.gcAdjustmentDetailVoList.length - 1) {
              //如果不是最后一条
              this.b += money;
            } else {
              //差值=总人民币差值-表格内除最后一行的人民币之和
              item.gcAdjustmentDetailVoList[
                item.gcAdjustmentDetailVoList.length - 1
              ].paidAmountCn = item.paymentAmountCn - this.b;
            }
          });
        }
      },
      //改变理赔币别
      changecurrency(item) {
        var ff = 0;
        var url = Vue.gvUtil.getUrl({
          apiName: "ggCodfindExchange",
          contextName: "selfins",
        });
        let obj = {
          baseCurrency: item.currency,
          exchCurrency: "USD",
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            item.rate = res.resData.exchangeRate;
            //理算金额人民币=兑换率*理算金额
            item.paymentAmountCn = item.rate * item.paymentAmount;
            this.c = 0;
            item.gcAdjustmentDetailVoList.forEach((v, index) => {
              // let cmoney = v.paidAmountCn - 0;
              if (item.gcAdjustmentDetailVoList.length - 1 != index) {
                v.paidAmountCn = v.paidAmount * item.rate;
                this.c += v.paidAmountCn;
                ff = this.c;
              } else {
                //最后一行算差值=理算金额人命币总值-除最后一行外的人民名总和
                item.gcAdjustmentDetailVoList[
                  item.gcAdjustmentDetailVoList.length - 1
                ].paidAmountCn = item.paymentAmountCn - ff.toFixed(2);
              }
            });
          }
        });
      },
      //手动改变理赔兑换率
      changeratezb(self, index) {
        var total = 0;
        this.arrpfDatalist.arrpfData[index].gcAdjustmentDetailVoList.forEach(
          (v) => {
            v.paidAmountCn = v.paidAmount * self;
            total += v.paidAmountCn;
          }
        );
        this.arrpfDatalist.arrpfData[index].paymentAmountCn = total;
      },
      //摊赔内调取兑换率
      changetanpCurrency(scoperow) {
        var url = Vue.gvUtil.getUrl({
          apiName: "ggCodfindExchange",
          contextName: "selfins",
        });
        let obj = {
          baseCurrency: scoperow.currency,
          exchCurrency: "USD",
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            scoperow.currencyRate = res.resData.exchangeRate;
            scoperow.riPidCn = scoperow.riPid * scoperow.currencyRate;
          }
        });
      },
    },
    watch: {
      newName: function (New, old) {},
    },
  });
});
