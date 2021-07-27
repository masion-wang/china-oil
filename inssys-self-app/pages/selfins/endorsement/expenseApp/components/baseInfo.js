/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //费用页面基本数据接口
      PremiumWorksheet: "/PDF/PremiumWorksheet", //打印
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    query: function () {
      return {};
    },
    props: {
      isExpense: {
        //true:费用录入 false:批单录入
        type: Boolean,
        default: true,
      },
      Premium: {
        //金批只读状态
        type: Boolean,
        default: true,
      },
      NonPremium: {
        //文批只读状态
        type: Boolean,
        default: true,
      },
      Cancellation: {
        //退保只读状态
        type: Boolean,
        default: true,
      },
      Write: {
        //冲销只读状态
        type: Boolean,
        default: true,
      },
    },
    datas: function () {
      return {
        //1. 基础信息  页面ID  endorsement为批单 policy为保单 默认为保单
        baseInfo: {
          proposalNo: "", // 自保投保单号
          policyNo: "", // 自保保单号
          renewalSign: "", // 新保||续保
          previousPolicyNo: "", // 上年保单号
          renewalPolicyNo: "", // 续保保单号
          riskCode: "", // 自保险种
          upstreamSign: "", // 上游下游
          riInward: "", // 临分标志
          effectiveDate: "", // 保险起期 09-23-2020 15:46:22
          expiryDate: "", // 保险止期 09-23-2020 15:46:23
          underWritingYear: "", //  承保年度
          maintenancePeriods: [], // 维护期 maintenancePeriods maintenancePeriodStart
          discoveryPeriods: [], // 发现期
          testingPeriods: [], // 测试期
          insuranceDescription: "", // 保险期间描述
          handle: "", // 经办人
          handleCode: "", // 经办人的代码
          underWriter: "", // 承包人
          underwriterCode: "", // 承包人代码
          projectName: "", // 项名名称
          insured: "", // 被保人
          creditNo: "", // 对方账单号
          cedingCompany: "", // 原保险人
          cedingProjectName: "", // 原项目名称
          policyStatus: "", // 保单状态
          createdBy: "", // 创建人
          amendedBy: "", // 修改人
          approvedBy: "", // 审核人
          createdDate: "", // 创建日期
          amendedDate: "", // 修改日期
          approvedDate: "", // 审核日期
          checkName: "缺字段", // 缺字段
          cedingCurrency: "", // 原单币别
          currency: "", // 本币单位
          exchangeRate: 0, // 兑换率
          vatRate: 0, // 增值税税率
          vatSurchargeRate: 0, // 增值税附加税率
          commissionRate: 0, // 佣金率
        },
        //2.基本数据中再保人绑值
        tableData: [{}],
        //3.已选原保单绑值
        choscedta: [{}],
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
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出比例
            {
              label: Vue.gvUtil.getInzTranslate("distributionRatio"),
              prop: "selfInsuranceRate",
              maxlength: 16,
              numLen: 6,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 原分出毛保费
            {
              label: Vue.gvUtil.getInzTranslate("originalGrossPremium"),
              prop: "riOriGrossPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出保额
            {
              label: Vue.gvUtil.getInzTranslate("cededAmount"),
              prop: "riShareValue",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出净保费
            {
              label: Vue.gvUtil.getInzTranslate("netPremiumPaidOut"),
              prop: "totalDue",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出费率
            {
              label: Vue.gvUtil.getInzTranslate("cededRate"),
              prop: "riRate",
              maxlength: 16,
              numLen: 4,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 年保费
            {
              label: Vue.gvUtil.getInzTranslate("annualPremium"),
              prop: "annualPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 检验费
            {
              label: Vue.gvUtil.getInzTranslate("inspectionFee"),
              prop: "mws",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出佣金
            {
              label: Vue.gvUtil.getInzTranslate("commissionOut"),
              prop: "commission",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出总保费
            {
              label: Vue.gvUtil.getInzTranslate("totalPremiumPaidOut"),
              prop: "totalPremium",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 备注1
            {
              label: Vue.gvUtil.getInzTranslate("note1"),
              prop: "remark1",
              maxlength: 200,
              numLen: 0,
              type: "textarea",
              // rule: { required: false, message: '', trigger: 'blur' }
            },
            // 备注2
            {
              label: Vue.gvUtil.getInzTranslate("note2"),
              prop: "remark2",
              maxlength: 200,
              numLen: 0,
              type: "textarea",
              // rule: { required: false, message: '', trigger: 'blur' }
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
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 工程名称
            {
              label: Vue.gvUtil.getInzTranslate("projectName"),
              prop: "project",
              code: "CARD",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 工程地址
            {
              label: Vue.gvUtil.getInzTranslate("projectAddress"),
              prop: "location",
              code: "CARD",
              maxlength: 2000,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 原险种代码
            {
              label: Vue.gvUtil.getInzTranslate("originalInsuranceCode"),
              prop: "cedingRiskCode",
              code: "CARD,EAS,OOPD",
              maxlength: 10,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 原险种名称
            {
              label: Vue.gvUtil.getInzTranslate("nameInsurance"),
              prop: "cedingRiskName",
              code: "CARD,EAS,OOPD",
              maxlength: 100,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 原保单号
            {
              label: Vue.gvUtil.getInzTranslate("originalWarrantyNumber"),
              prop: "cedingPolicyNo",
              code: "CARD,OOPD",
              maxlength: 21,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 项目名称
            {
              label: Vue.gvUtil.getInzTranslate("entryName"),
              prop: "projectName",
              code: "CARU",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 船舶名称
            {
              label: Vue.gvUtil.getInzTranslate("nameVessel"),
              prop: "vesselName",
              code: "MAR",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 船舶类型
            {
              label: Vue.gvUtil.getInzTranslate("shipType"),
              prop: "usage",
              code: "MAR",
              maxlength: 100,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 船籍
            {
              label: Vue.gvUtil.getInzTranslate("shipNationality"),
              prop: "registered",
              code: "MAR",
              maxlength: 100,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 载重吨位／重量
            {
              label: Vue.gvUtil.getInzTranslate("dwtWeight"),
              prop: "tonnage",
              code: "MAR",
              maxlength: 9,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 建造年份
            {
              label: Vue.gvUtil.getInzTranslate("yearConstruction"),
              prop: "builtYear",
              code: "MAR",
              maxlength: 4,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 航行区域
            {
              label: Vue.gvUtil.getInzTranslate("navigationArea"),
              prop: "workingArea",
              code: "MAR",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 层
            {
              label: Vue.gvUtil.getInzTranslate("layer"),
              prop: "layer",
              code: "MAR",
              maxlength: 1,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 属性
            {
              label: Vue.gvUtil.getInzTranslate("attribute"),
              prop: "nature",
              code: "MAR",
              maxlength: 100,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 免赔
            {
              label: Vue.gvUtil.getInzTranslate("deductible"),
              prop: "excess",
              code: "MAR",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 油田
            {
              label: Vue.gvUtil.getInzTranslate("oilField"),
              prop: "oilField", //oilFieldCode 油田代码
              code: "ODE,OEE,OOPU",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 井名
            {
              label: Vue.gvUtil.getInzTranslate("wellName"),
              prop: "wellName",
              code: "ODE,OEE",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 井号
            {
              label: Vue.gvUtil.getInzTranslate("wellNo"),
              prop: "wellNo",
              code: "ODE,OEE",
              maxlength: 50,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 井型
            {
              label: Vue.gvUtil.getInzTranslate("wellType"),
              prop: "wellType",
              code: "OEE",
              maxlength: 50,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 井深（米）
            {
              label: Vue.gvUtil.getInzTranslate("wellDepth(m)"),
              prop: "depthm",
              code: "OEE",
              maxlength: 16,
              numLen: 6,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 井深（英尺）
            {
              label: Vue.gvUtil.getInzTranslate("wellDepth(ft)"),
              prop: "depthft",
              code: "OEE",
              maxlength: 16,
              numLen: 6,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 作业区
            {
              label: Vue.gvUtil.getInzTranslate("operationArea"),
              prop: "area",
              code: "OOPU",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "作业区不能为空",
                trigger: "blur",
              },
            },
            // 财产名称
            {
              label: Vue.gvUtil.getInzTranslate("nameProperty"),
              prop: "propertyDetails",
              code: "OOPU",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 财产类型
            {
              label: Vue.gvUtil.getInzTranslate("typeProperty"),
              prop: "propertyType",
              code: "OOPU",
              maxlength: 100,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 项
            {
              label: Vue.gvUtil.getInzTranslate("term"),
              prop: "section",
              code: "common",
              maxlength: 10,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 保险起期
            {
              label: Vue.gvUtil.getInzTranslate("startingDateInsurance"),
              prop: "periodStart",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 保险止期
            {
              label: Vue.gvUtil.getInzTranslate("expiryDateInsurance"),
              prop: "periodEnd",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 保额／限额
            {
              label: Vue.gvUtil.getInzTranslate("coverageLimit"),
              prop: "insuredValue",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 海油权益
            {
              label: Vue.gvUtil.getInzTranslate("rightsCnooc"),
              prop: "interestcnooc",
              code: "common",
              maxlength: 9,
              numLen: 6,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保比例
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceRatio"),
              prop: "selfInsuranceRate",
              code: "common",
              maxlength: 9,
              numLen: 6,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保保额
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceAmount"),
              prop: "cilShareValue",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保分入原毛保费
            {
              label: Vue.gvUtil.getInzTranslate("originalGrossInsurance"),
              prop: "cilOriGrossPremium",
              code: "common",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保分入净保费
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceNetPremium"),
              prop: "totalDue",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保费率
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceRate"),
              prop: "cilRate",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保佣金
            {
              label: Vue.gvUtil.getInzTranslate("selfInsuranceCommission"),
              prop: "commission",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 自保毛保费
            {
              label: Vue.gvUtil.getInzTranslate("grossSelfInsurancePremium"),
              prop: "cilGrossPremium",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 承保天数
            {
              label: Vue.gvUtil.getInzTranslate("daysCovered"),
              prop: "insuredDay",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 承保月数
            {
              label: Vue.gvUtil.getInzTranslate("monthsUnderwriting"),
              prop: "oriMonths",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 月保费
            {
              label: Vue.gvUtil.getInzTranslate("monthlyPremium"),
              prop: "oriPerMonth",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 年保费
            {
              label: Vue.gvUtil.getInzTranslate("annualPremium"),
              prop: "oriAnnualPremium",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 备注1
            {
              label: Vue.gvUtil.getInzTranslate("note1"),
              prop: "remark1",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: false,
                message: "",
                trigger: "blur",
              },
            },
            // 备注2
            {
              label: Vue.gvUtil.getInzTranslate("note2"),
              prop: "remark2",
              code: "common",
              maxlength: 200,
              type: "text",
              rule: {
                required: false,
                message: "",
                trigger: "blur",
              },
            },
          ],
        },
        //5.分期计算表单验证规则
        stagesTableForm: {
          stagesTableList: [{}], // 分期期次table
          stagesAllTableList: [{}], // 再保人表格数据
          expandstagesTableList: [{}], //拓展表格
          stagesTableLabel: [
            //外层分期表格字段
            // 期次
            {
              label: Vue.gvUtil.getInzTranslate("period"),
              prop: "proposalName",
              readonly: "Premium && Write && Cancellation",
              maxlength: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 缴费截止日期
            {
              label: Vue.gvUtil.getInzTranslate("paymentDeadline"),
              prop: "dueDate",
              readonly: "Premium && Write",
              type: "date",
              rule: {
                required: false,
                message: "",
                trigger: "blur",
              },
            },
            // 分期比例
            {
              label: Vue.gvUtil.getInzTranslate("stageRatio"),
              prop: "installmentRate",
              readonly: "Premium && Write && Cancellation",
              percentage: true,
              maxlength: 7,
              numLen: 4,
              type: "number",
              rule: {
                required: false,
                message: "",
                trigger: "blur",
              },
            },
            // 保费
            {
              label: Vue.gvUtil.getInzTranslate("premium"),
              prop: "currency",
              readonly: "Premium && Write && Cancellation",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: false,
                message: "",
                trigger: "blur",
              },
            },
            // 单据号
            {
              label: Vue.gvUtil.getInzTranslate("documentNo"),
              prop: "billNo",
              readonly: "Premium && Write && Cancellation",
              maxlength: 23,
              type: "text",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
          ],
          reinsurerTableLabel: [
            //分期再保人表格字段
            // 再保人
            {
              label: Vue.gvUtil.getInzTranslate("reinsurer"),
              prop: "reinsurerCode", //reinsurer 再保人名称
              maxlength: 200,
              numLen: 0,
              type: "reinsurer",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出比例
            {
              label: Vue.gvUtil.getInzTranslate("distributionRatio"),
              prop: "riShare",
              percentage: true,
              maxlength: 30,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 收付款人
            {
              label: Vue.gvUtil.getInzTranslate("distributionRatio"),
              prop: "payee",
              maxlength: 200,
              type: "text",
              rule: {
                required: false,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 层
            {
              label: Vue.gvUtil.getInzTranslate("layer"),
              prop: "layer",
              code: "MAR",
              maxlength: 1,
              type: "text",
              rule: {
                required: false,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出总保费
            {
              label: Vue.gvUtil.getInzTranslate("totalPremiumPaidOut"),
              prop: "totalPremium",
              currency: true,
              val: "currency", //代表币别码表的值
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 分出保费变化量
            {
              label: Vue.gvUtil.getInzTranslate("changePremiumOut"),
              prop: "totalDue",
              currency: true,
              val: "123",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
            // 检验费
            {
              label: Vue.gvUtil.getInzTranslate("inspectionFee"),
              prop: "mws",
              currency: true,
              val: "456",
              maxlength: 16,
              numLen: 2,
              type: "number",
              rule: {
                required: true,
                message: "该字段不能为空",
                trigger: "blur",
              },
            },
          ],
        },
        guInstallmentRiVo: [{}], //分期总价格
        //分期分出
        Subjectmatter: [{}],
        Clausesdata: [{ clauseName: "", clauseContent: "" }], //条款值
        // goldPremium: true,//金批批单录入页面显示隐藏状态
        value3: "",
        Submit: false, //提交后改变只读状态
        isAdd: false, //已选原保单是否是新增的标识，后端返回
        emailTableVisible: false, //邮件弹框
        Renewal: false, //续保/新保字段可读性否控制
        printsdata: [{}], //打印绑定的值
        checked: true, //前后端是否一致
        text: false,
        printTableVisible: false, //打印弹框
        dialogTableVisible: false, //条款弹框
        multipleSelection: [], //多选框
        emailForm: [
          {
            name: "2",
          },
        ], //email值
        schemeDate: [
          {
            value: "01",
            label: "是",
          },
          {
            value: "02",
            label: "否",
          },
        ],
        activeNames: ["1", "2", "3", "4"],
        isReadonly: true, //是否只读
        rules: {},
        continueSignOptions: [
          {
            value: "01",
            label: "续保",
          },
          {
            value: "02",
            label: "新保",
          },
        ],
        isEventChange: false,
        riskCodeValue: "",
        riskCode: "",
      };
    },
    computed: {
      planTypeOptions() {
        //新保续保
        return this.$store.state.publicClock.ResumeRemark;
      },
    },
    created() {
      Vue.gvUtil.initTranslation("Currency");
    },
    events: {
      //为表格表头添加星号样式
      must: function (obj) {
        // console.log(obj.columnIndex);
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
    },
    methods: {
      //基本信息回显只读，查询页面点击自保保单号
      baseinfor(ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            // proposalNo: "ZBTBOOPD2020000028",
            proposalNo: ss.row.proposalNo,
            versionNo: ss.row.versionNo,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              //基本数据ok
              this.baseInfo = res.resData.guPolicyAllInfo;
              //再保人信息ok
              this.tableData = res.resData.guPolicyAllInfo.guPolicyRiVoList;
              // //已选原保单信息ok
              this.choscedta = res.resData.guPolicyAllInfo.guPolicyVoList;
              // 分期总价值
              this.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
              // // 分期期次信息 ok
              this.stagesTableForm.stagesTableList =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo.guInstallmentDetailVoList;
              //分期分出信息
              this.Subjectmatter =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
              // 分期分出信息 内部循环
              this.Subjectmatter.forEach((f) => {
                this.stagesTableForm.expandstagesTableList =
                  f.guInstallmentDetailVoList;
              });
              // //标的分入 ok
              this.matterTableForm.recognizeeTableList =
                res.resData.guPolicyAllInfo.guPolicyItemMainVoList.map((v) => {
                  return v.guPolicyItemCedingVo;
                });
              // //标的分出 ok
              this.matterTableForm.recognizeeTableList.forEach((v) => {
                this.matterTableForm.reinsurerTableList =
                  v.guPolicyItemReinsVoList;
              });
            } else {
            }
          });
      },
      //基本信息回显费用页面
      basein() {
        var url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            proposalNo: this.$route.query.row.proposalNo,
            versionNo: this.$route.query.row.versionNo,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              //基本数据ok
              this.baseInfo = res.resData.guPolicyAllInfo;
              //再保人信息ok
              this.tableData = res.resData.guPolicyAllInfo.guPolicyRiVoList;
              // //已选原保单信息ok
              this.choscedta = res.resData.guPolicyAllInfo.guPolicyVoList;
              // 分期总价值
              this.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
              // // 分期期次信息 ok
              this.stagesTableForm.stagesTableList =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo.guInstallmentDetailVoList;
              //分期分出信息
              this.Subjectmatter =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
              // 分期分出信息 内部循环
              this.Subjectmatter.forEach((f) => {
                this.stagesTableForm.expandstagesTableList =
                  f.guInstallmentDetailVoList;
              });
              // //标的分入 ok
              this.matterTableForm.recognizeeTableList =
                res.resData.guPolicyAllInfo.guPolicyItemMainVoList.map((v) => {
                  return v.guPolicyItemCedingVo;
                });
              // //标的分出 ok
              this.matterTableForm.recognizeeTableList.forEach((v) => {
                this.matterTableForm.reinsurerTableList =
                  v.guPolicyItemReinsVoList;
              });
              //条款
              this.Clausesdata =
                res.resData.guPolicyAllInfo.guPolicyClauseVoList;
            } else {
            }
          });
      },
      // 自保险种 下拉菜单
      changeschemeName(insurance) {
        if (insurance) {
          this.baseInfo.riskCode = insurance.codeCode;
        } else {
          // 请选择自保险种
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbplechooselfIn"),
            type: "warning",
          });
        }
      },
      goDetail() {
        //分期详情
      },
      checkemail() {
        this.emailTableVisible = true;
      },
      //打印
      getprint() {
        let url = Vue.gvUtil.getUrl({
          apiName: "PremiumWorksheet",
          contextName: "selfins",
        });

        Vue.gvUtil.http
          .post(
            url,
            {
              proposalNo: this.$route.query.row.proposalNo,
              versionNo: this.$route.query.row.versionNo,
            },
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            // if (res.resCode == '0000') {
            // alert('打印成功')
            // console.log(res)
            Vue.gvUtil.resolveBlob(res, "excel.pdf");
            // }
          });
      },
      //打印按钮
      Print() {
        // var url = Vue.gvUtil.getUrl({
        //   apiName: "getPolicyFeeInfo",
        //   contextName: "selfins",
        // });
        // Vue.gvUtil.http
        //   .post(url, {
        //     riskCode: "OOPD",
        //   })
        //   .then((res) => {});
        this.printTableVisible = true;
      },
      //点击条款按钮
      clickClauses(ss) {
        this.Clausesdata = ss.guPolicyClauseVoList;
        this.dialogTableVisible = true;
      },
      //新增条款按钮
      addClausesdata() {
        this.Clausesdata.push({
          address: "",
        });
      },
      //点击续保还是新保
      changeContinueSign(a) {
        if (a == "02") {
          //续保
          this.Renewal = true;
        } else {
          this.Renewal = false;
        }
      },
      //原保单新增按钮
      checkpolicy() {
        Vue.gvUtil.redirectTo({
          path: "selectpolicy_app",
        }); //跳转查询页面
      },
      //多选框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //多个删除
      removeMulti() {
        var _this = this;
        if (_this.multipleSelection.length == 0) {
          Vue.gvUtil.message("请选择要删除的数据");
        } else {
          Vue.gvUtil
            .confirm({
              msg: "确定要删除吗？",
            })
            .then(function () {
              _this.multipleSelection.forEach((element) => {
                _this.choscedta.forEach(function (item, index) {
                  if (element.checkName == item.checkName) {
                    _this.choscedta.splice(index, 1);
                  }
                });
              });
            });
        }
      },
      // 点击当前单元格出现输入框
      handle(row, column, event, cell) {},
      //自保险种变化
      // codeSelectChange() {
      //   let obj = {};
      //   obj = this.riskCodeOptions.find((item) => {
      //     return item.value === this.riskCodeValue;
      //   });
      //   this.riskCode = obj.label;

      //
      // },
      //再保人信息增加
      addtabledata() {
        this.stagesTableForm.stagesTableList.push({
          proposalName: "",
        });
      },
      //删除按钮
      remove(index, self) {
        if (self == "tableData") {
          //删除再保人信息
          this.tableData.splice(index, 1);
        } else if (self == "choscedta") {
          //删除已选原保单
          this.choscedta.splice(index, 1);
        } else if (self == "Clausesdata") {
          this.Clausesdata.splice(index, 1);
        }
      },
      selectCo() {
        //条款
      },
      //佣金失去焦点的时候
      blur() {
        Vue.gvUtil.message("请重新生成标的");
      },
    },
    watch: {},
    components: {
      // Risktype,
    },
  });
});
