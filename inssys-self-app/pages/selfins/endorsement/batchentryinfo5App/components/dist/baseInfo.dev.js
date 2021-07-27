"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  // 引入API
  var reuqireConfig = require("../index.config.js"); // let config = reuqireConfig.config;
  // // 注册API
  // Vue.gvUtil.setApi(config.api);
  // var Risktype = require('./risktype')


  Vue.gvUtil.setApi({
    // 回显数据
    add: "/endorSelfMain/add",
    // 保存接口
    submit: "/endorSelfMain/submit",
    // 提交接口
    verifyEndorsementType: "/endorSelfMain/verifyEndorsementType",
    // 详情查询
    endorSelfMainendorDetail: "/endorSelfMain/endorDetail",
    // 详情查询 工作流
    calculateItems: "/policySelfMain/calculateItems",
    // 标的重新计算
    calculateInstalment: "/guinstallmain/calculateInstalment",
    // 分期计算
    // 查询子组件
    findProject: "/policySelfMain/findProject",
    //项目
    findScheme: "/policySelfMain/findScheme",
    // 方案
    policySelfMainfindList: "/policySelfMain/findRisk",
    // 原险种
    searchPolicy: "/policySelfMain/findPolicyAllInfo",
    // 查询接口
    exportItemExcel: "/policyItemMain/exportItemExcel",
    // excel导出
    importItemExcel: "/policyItemMain/importItemExcel",
    // excel导入
    importClauseExcel: "/guPolicyClause/importClauseExcel",
    // 条款导入
    findDetail: "/ggRisk/findDetail",
    // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
    findExchange: "/ggCode/findExchangeRate",
    // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
    findReinsurerList: "/policySelfMain/findReinsurerList",
    // 再保人
    findReinsurerList2: "/ggCode/findSupplier",
    // 再保人 自保码表 other list
    findUserList: "/policySelfMain/findUserList",
    // 经办人 承包人
    getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo",
    //保单详情接口
    UserInfo: "/User/UserInfo",
    // 获取用户信息
    verify: "/policySelfMain/verify",
    // 审核接口
    getList: "/document/getList",
    //查打印列表
    printPDF: "/PDF/printPDF",
    // 下载pdf
    findPreviousPolicyNo: "/policySelfMain/findPreviousPolicyNo",
    // 获取上年保单号
    findNewPolicyAllInfo: "/policySelfMain/findNewPolicyAllInfo",
    // 获取续保单号
    historyEndor: "/endorSelfMain/historyEndor" // 历次批单

  });
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    params: function params() {
      return {};
    },
    props: {
      objFromSelectpolicyApp: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    created: function created() {
      var that = this; // 调用接口原币

      Vue.gvUtil.initTranslation("Currency");
      Vue.gvUtil.initTranslation("ShareType"); // 获取上年保单号

      var url4 = Vue.gvUtil.getUrl({
        apiName: "findPreviousPolicyNo",
        contextName: "selfins"
      });
      Vue.gvUtil.http.get(url4).then(function (res) {
        if (res.resCode == "0000") {
          console.log("上年保单号", res); // 这是个数组

          that.previousPolicyNoList = res.resData;
        }
      }); // 获取再保人数据

      var url = Vue.gvUtil.getUrl({
        apiName: "findReinsurerList2",
        contextName: "selfins"
      });
      var params5 = {
        catalog: "0",
        cedInd: "1",
        valid: "1"
      };
      Vue.gvUtil.http.post(url, params5).then(function (res) {
        if (res.resCode == "0000") {
          console.log("再保人", res.resData); // 这是个数组

          that.Underwriter2 = res.resData; // that.baseInfo.exchangeRate = res.resData.exchangeRate
          // Vue.gvUtil.initTranslation("Currency");
        }
      }); // 获取经办人 承包人数据

      var url2 = Vue.gvUtil.getUrl({
        apiName: "findUserList",
        contextName: "selfins"
      });
      Vue.gvUtil.http.get(url2).then(function (res) {
        if (res.resCode == "0000") {
          console.log("经办人 承包人", res.resData); // 这是个数组
          // that.Underwriter1 = res.resData

          var arr = res.resData;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              if (item["default"] == "1") {
                var arr2 = res.resData.filter(function (item2) {
                  return item2["default"] == "0";
                });
                arr2.unshift(item);
                that.Underwriter1 = arr2;
                that.Underwriter = arr2;
                console.log("arr2", arr2); // 经办人

                that.baseInfo.handle = arr2[0].userName;
                that.baseInfo.handleCode = arr2[0].userCode; // 承包人

                that.baseInfo.underWriter = arr2[0].userName;
                that.baseInfo.underwriterCode = arr2[0].userCode;
              }
            } // that.baseInfo.exchangeRate = res.resData.exchangeRate
            // Vue.gvUtil.initTranslation("Currency");

          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }); // 获取承包人和经办人的默认值

      var url3 = Vue.gvUtil.getUrl({
        apiName: "UserInfo",
        contextName: "selfins"
      });
      var params = {};
      Vue.gvUtil.http.post(url3, params).then(function (res) {
        if (res.resCode == "0000") {
          // 经办人
          that.baseInfo.handle = res.resData.userName;
          that.baseInfo.handleCode = res.resData.userCode; // 承包人

          that.baseInfo.underWriter = res.resData.userName;
          that.baseInfo.underwriterCode = res.resData.userCode;
        }
      });
    },
    mounted: function mounted() {// baseinfo子组件获取父组件数据
      // this.dataFromSelectpolicyApp(this.objFromSelectpolicyApp)
    },
    watch: {},
    datas: function datas() {
      var _underlyingRules, _ref;

      return _ref = {
        //折叠窗默认弹开
        baseInfoColl: ["guInstallmentForPolicyVo", "stagingInformation", "CedingPolicy", "baseInfo", "docListInfo", "detailsMatter", "description", "auditOpinion"],
        guInstallmentDetailVoListindex: "",
        //点击分期全局index
        guInstallmentForD: false,
        //分入分期弹框
        guInstallmentForPolicyVo: [],
        //分入分期弹框
        stagingInformationVisible: false,
        //分出分期弹框
        guInstallmentDetailVoList: [],
        //分出分期弹框
        stateWord: "",
        premiumList2: [],
        IsfiveExport: false,
        // 三个  stateWord:'',险种是否被导入 MAR EAS OOPU
        InstallmentData: [{}],
        //分期值绑定
        ReinsuranceForm: [{}],
        //分期详情绑值
        Renewal: false,
        //续保/新保字段可读性否控制
        checked: false,
        //前后端是否一致
        Clausesdata: [],
        //条款值
        CedingPolicy: true,
        //显示原保单号页面与标的页面与再保人页面
        text: false,
        ReinsuranceTableVisible: false,
        //分期详情弹框
        emailTableVisible: false,
        //邮件弹框
        multipleSelection: [],
        //多选框
        Subjectmatter: [],
        node: [],
        emailForm: [],
        //email值
        tableData: [{}],
        //分期
        activeNames: ["1"],
        schemeName: [],
        //自保险种下拉
        continueSignOptions: [],
        //新保续保下拉
        schemeDate: [],
        //临分标志下拉
        riskCode: "OOPD",
        //控制页面显示的自保险种
        isEventChange: false,
        PDFList: [],
        //打印数组
        dialogTableVisible: false,
        //条款弹框
        dialogTableVisible2: false,
        //条款弹框预览内容
        licipidan: false,
        // 历次批单
        textContent: "",
        // 预览具体内容
        printTableVisible: false,
        //打印弹框
        Submit: false,
        //提交后改变只读状态
        isReadonly: false
      }, _defineProperty(_ref, "stateWord", ""), _defineProperty(_ref, "premiumList", []), _defineProperty(_ref, "tableData1", []), _defineProperty(_ref, "pageSize1", 2), _defineProperty(_ref, "pageNo1", 0), _defineProperty(_ref, "pageaA", 0), _defineProperty(_ref, "total1", 0), _defineProperty(_ref, "Underwriter", []), _defineProperty(_ref, "Underwriter1", []), _defineProperty(_ref, "Underwriter2", []), _defineProperty(_ref, "previousPolicyNoList", []), _defineProperty(_ref, "emailrules", {
        From: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }],
        To: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }],
        CC: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }],
        Title: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }],
        Content: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]
      }), _defineProperty(_ref, "printsdata", []), _defineProperty(_ref, "baseInfo", {
        description: "",
        // 批改文本
        proposalNo: "",
        // 自保投保单号
        policyNo: "",
        // 自保保单号
        renewalSign: "02",
        // 新保||续保
        endorsementEffectiveDate: "",
        // 批改生效日期
        endorsementType: "",
        // 批改类型
        riskCode: "",
        // 自保险种
        upstreamSign: "",
        // 上游下游
        riInward: "001",
        // 临分标志
        effectiveDate: "",
        // 保险起期 09-23-2020 15:46:22
        expiryDate: "",
        // 保险止期 09-23-2020 15:46:23
        underWritingYear: "",
        //  承保年度
        maintenancePeriods: [],
        // 维护期 maintenancePeriods maintenancePeriodStart
        discoveryPeriods: [],
        // 发现期
        testingPeriods: [],
        // 测试期
        insuranceDescription: "",
        // 保险期间描述
        handle: "",
        // 经办人
        handleCode: "",
        // 经办人的代码
        underWriter: "",
        // 承包人
        underwriterCode: "",
        // 承包人代码
        projectName: "",
        // 项名名称
        insured: "111",
        // 被保人
        // insuredCode:'111',
        creditNo: "",
        // 对方账单号
        cedingProjectName: "",
        // 原项目名称
        policyStatus: "",
        // 保单状态
        createdBy: "",
        // 创建人
        amendedBy: "",
        // 修改人
        approvedBy: "",
        // 审核人
        createdDate: "",
        // 创建日期
        amendedDate: "",
        // 修改日期
        approvedDate: "",
        // 审核日期
        checkName: "缺字段",
        // 缺字段
        currency: "002",
        // 本单币别 根据险种
        exchangeRate: "",
        // 兑换率
        vatRate: 6,
        // 增值税税率
        vatSurchargeRate: 12,
        // 增值税附加税率
        commissionRate: 6,
        // 佣金率
        cedingCurrency: "",
        // 原币单位 校验四兄弟  ？？？
        cedingCompany: "",
        // 原保险人 校验四兄弟
        programmeCode: "",
        //方案code 新增 校验四兄弟
        projectCode: "",
        // 项目code 新能 校验四兄弟
        totalPremium: "",
        // 标的计算返回的值 自保保单总保费
        insuredValue: "",
        // 标的计算返回的值 自保总保额
        totalDue: "",
        // 标的计算返回的值 自保总分入净保费
        totalDueRi: "",
        // 标的计算返回的值 自保总分出净保费
        versionNo: "",
        // 版本号
        baseInfoRule: {
          // 基础信息校验
          description: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          renewalSign: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          riskCode: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          upstreamSign: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          riInward: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          effectiveDate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          expiryDate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          underWritingYear: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          handle: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          underWriter: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          projectName: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          insured: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          cedingCurrency: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 本币单位
          currency: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 兑换率
          exchangeRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 增值税税率
          vatRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 增值税附加税率
          vatSurchargeRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 佣金率
          commissionRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }]
        }
      }), _defineProperty(_ref, "Clause", {
        guPolicyClauseVoList: [],
        // 数据源
        ClauseRules: {
          // 条款校验
          clauseName: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          clauseContent: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }]
        }
      }), _defineProperty(_ref, "fromData", {
        guPolicyRiVoList: [],
        // 数据源
        ReinsurerdataRules: {
          // 再保人校验
          reinsurer: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          selfInsuranceRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          overrideRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }]
        }
      }), _defineProperty(_ref, "reinsurerCode", ""), _defineProperty(_ref, "reinsurer", ""), _defineProperty(_ref, "objFromSelectpolicyApp2", {}), _defineProperty(_ref, "guPolicyVoList", []), _defineProperty(_ref, "underlying", {
        guPolicyItemMainVoList: [],
        underlyingRules: (_underlyingRules = {
          // 标的校验规则
          // 分出总保费
          fczbf: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 分出佣金
          commission: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 年保费
          annualPremium: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 分出费率
          riRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 分出净保费
          totalDue: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 原分出毛保费
          riOriGrossPremium: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          bz: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          fcbe: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 分出比例
          riShareVal: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 再保人名字
          reinsurer: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 保险起期
          periodStart: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          // 保险止期
          periodEnd: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          // 保额／限额
          insuredValue: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 海油权益
          interestcnooc: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 自保比例
          selfInsuranceRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }],
          // 自保保额
          cilShareValue: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }]
        }, _defineProperty(_underlyingRules, "totalDue", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "cilRate", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "commission", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "cilGrossPremium", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "insuredDay", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "oriMonths", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "oriPerMonth", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "oriAnnualPremium", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "riShareValue", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "riOriGrossPremium", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _defineProperty(_underlyingRules, "totalPremium", [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]), _underlyingRules)
      }), _defineProperty(_ref, "guPolicyItemMainVoListThree", []), _defineProperty(_ref, "guInstallmentForPolicyVo", {
        // 分入对象 里面有公共字段和数组
        guInstallmentRiVo: {
          riskCode: "",
          // 自保险种
          currency: "",
          //币种
          totalDue: "",
          // 保费变化量
          totalPremium: "",
          // 自保总保费
          totalAmount: "",
          // 自保总保额
          displayNo: "",
          // 显示序号
          count: "",
          // 期数	count
          guInstallmentDetailVoList: []
        },
        // 校验规则
        fqInstallmentRules: {
          // 缴费截止日期
          dueDate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          // 分期比例
          installmentRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur"
          }] // 保费
          // premium: [{
          //   required: true,
          //   message: Vue.filter("translate")("cantEmpty"),
          //   trigger: "blur",
          // }, ]
          // 币种
          // currency: [{
          //   required: true,
          //   message: Vue.filter("translate")("cantEmpty"),
          //   trigger: "change",
          // }, ],
          // // 收付款人
          // payee: [{
          //   required: true,
          //   message: Vue.filter("translate")("cantEmpty"),
          //   trigger: "change",
          // }, ],
          // //
          // installmentRate: [{
          //   required: true,
          //   message: Vue.filter("translate")("cantEmpty"),
          //   trigger: "change",
          // }, ],

        }
      }), _defineProperty(_ref, "fqPayee", {
        guInstallmentDetailVoList: [],
        guInstallmentRoVoList: [],
        fqPayeeRules: {
          // 缴费截止日期
          dueDate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          // 收付款人
          payee: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          // 分期比例
          installmentRate: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }],
          premium: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change"
          }]
        }
      }), _defineProperty(_ref, "auditInfo", {
        approvedRemark: ""
      }), _defineProperty(_ref, "rules", {
        approvedRemark: [{
          required: true,
          message: "不能为空",
          trigger: "blur"
        }]
      }), _defineProperty(_ref, "policyNo2", ""), _defineProperty(_ref, "tableData1", []), _ref;
    },
    methods: {
      // 增加-再保人信息
      addReinsuranceInfo: function addReinsuranceInfo() {
        var that = this;
        this.fromData.guPolicyRiVoList.push({
          guPolicyClauseVoList: [],
          reinsurer: "",
          // 再保人名字
          reinsurerCode: "",
          // 再保人代码
          selfInsuranceRate: '',
          // 转分出比例
          overrideRate: '',
          // 转分出手续费比率 这块是从原保单带出来的 保存不需要 但是标的计算需要
          reinsurancePolicyNo: '',
          // 再保方保单号
          reinsuranceDebitCreditNo: '' // 再保方账单号

        }); // 遍历标的 把新增的再保人传到标的里面

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;
            item.guPolicyItemReinsVoList.push({
              annualPremium: null,
              commission: null,
              currency: that.baseInfo.currency,
              itemMainId: null,
              itemNo: null,
              itemReinsId: null,
              mws: null,
              overrideRate: null,
              proposalNo: null,
              reinsurer: "",
              reinsurerCode: "",
              remark1: null,
              remark2: null,
              riGrossPremium: null,
              riOriGrossPremium: null,
              riRate: null,
              riShareValue: null,
              riskCode: null,
              selfInsuranceRate: null,
              totalDue: null,
              totalPremium: null,
              versionNo: null
            });
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },
      // 删除按钮
      remove: function remove(index, self, index2) {
        console.log(index, index2);

        if (self == "guPolicyRiVoList") {
          //删除再保人信息 只剩一个时候不能删除
          if (this.fromData.guPolicyRiVoList.length <= 1) {
            return;
          }

          this.fromData.guPolicyRiVoList.splice(index, 1); // 同时删除标的里面的对应再保人

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var item = _step3.value;
              item.guPolicyItemReinsVoList.splice(index, 1);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else if (self == "guPolicyVoList") {
          //删除已选原保单
          this.guPolicyVoList.splice(index, 1);
        } else if (self == "guPolicyClauseVoList") {
          //删除条款
          this.Clause.guPolicyClauseVoList.splice(index, 1);
        } else if (self == "node") {
          //删除分期分出详情  是否同时删除分期分出数据
          // this.fqPayee.guInstallmentDetailVoList.splice(index, 1);
          this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList.splice(index2, 1);
        } else if (self == "InstallmentData") {
          //删除分期分入详情  是否同时删除分期分入数据
          this.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.splice(index, 1);
        }
      },
      // 再保人 reinsurer reinsurerCode"中国太平洋财产保险股份有限公司-48" 
      selectChanged2: function selectChanged2(value, index) {
        console.log('index', index, value);
        console.log('index', this.fromData.guPolicyRiVoList);
        var reinsurer = this.fromData.guPolicyRiVoList[index].reinsurer;
        var reinsurerCode = this.fromData.guPolicyRiVoList[index].reinsurer; // 给对应的标的再保人 

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;
            item.guPolicyItemReinsVoList[index].reinsurer = reinsurer;
            item.guPolicyItemReinsVoList[index].reinsurerCode = reinsurerCode;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      },
      // 再保人 转分出比例失去焦点的时候
      blur55: function blur55(value, index) {
        var that = this;
        var selfInsuranceRate = this.fromData.guPolicyRiVoList[index].selfInsuranceRate; // 给对应的标的再保人 

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var item = _step5.value;
            item.guPolicyItemReinsVoList[index].selfInsuranceRate = selfInsuranceRate;
          } // 判断是否是三个特殊险种
          // 如果触发重新生成标的接口

        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        if (that.baseInfo.riskCode == "MAR" || that.baseInfo.riskCode == "EAS" || that.baseInfo.riskCode == "OOPU") {// this.checkpolicy()
          // this.$message({
          //   message: "请重新生成标的",
          //   type: "warning",
          // });
        } else {
          this.$message({
            message: "请重新生成标的",
            type: "warning"
          });
        }
      },
      // 佣金失去焦点的时候
      blur5: function blur5() {
        // 判断是否是三个特殊险种
        var that = this; // 如果触发重新生成标的接口

        if (that.baseInfo.riskCode == "MAR" || that.baseInfo.riskCode == "EAS" || that.baseInfo.riskCode == "OOPU") {// this.checkpolicy()
        } else {
          this.$message({
            message: "请重新生成标的",
            type: "warning"
          });
        }
      },
      // 再保人 转分出比例税费失去焦点的时候
      blur6: function blur6(value, index) {
        var that = this;
        var overrideRate = this.fromData.guPolicyRiVoList[index].overrideRate; // 给对应的标的再保人 

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var item = _step6.value;
            item.guPolicyItemReinsVoList[index].overrideRate = overrideRate;
          } // 判断是否是三个特殊险种
          // 如果触发重新生成标的接口

        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        if (that.baseInfo.riskCode == "MAR" || that.baseInfo.riskCode == "EAS" || that.baseInfo.riskCode == "OOPU") {// this.checkpolicy()
          // this.$message({
          //   message: "请重新生成标的",
          //   type: "warning",
          // });
        } else {
          this.$message({
            message: "请重新生成标的",
            type: "warning"
          });
        }
      },
      // mm-dd-yyyy HH:mm:ss => yyyy-mm-dd HH:mm:ss 
      dateFormatChange: function dateFormatChange(date) {
        console.log('date', date);
        var temp1 = date.split(' ');
        console.log('temp1', temp1);
        var temp2 = date.split(' ')[0].split('-');
        var newDate = temp2[2] + '-' + temp2[1] + '-' + temp2[0] + ' ' + temp1[1];
        console.log('newDate', newDate);
        return newDate;
      },
      // date1 - date2 => days
      dateMinus: function dateMinus(start, end) {
        var numStart = new Date(start).getTime();
        var numEnd = new Date(end).getTime();
        console.log(numStart, numEnd);
        var daysCut = (numEnd - numStart) % 86400000;
        var days = (numEnd - numStart - daysCut) / 86400000;

        if (days < 0) {
            this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEarlier"), // "止期不能比起期更早",
            type: "warning",
          });;
          return;
        }

        console.log('days daysCut', days, daysCut);
        return daysCut >= 43200000 ? Number(days) + 1 : Number(days); // 按照下一天 23 59 59 => 00 00 00 
      },
      // js大数除法
      accDiv: function accDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1,
            r2;

        try {
          t1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          t1 = 2;
        }

        try {
          t2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          t2 = 2;
        } // 100.00 => 100   1000


        if (arg1.toString().split(".").length == 1) {
          Number(arg1.toString()) * 100;
        } // 100.10 => 1001
        else if (arg1.toString().split(".")[1].length == 1) {
            Number(arg1.toString()) * 100;
          } else {
            r1 = Number(arg1.toString().replace(".", ""));
          }

        if (arg2.toString().split(".").length == 1) {
          Number(arg2.toString()) * 100;
        } // 100.10 => 1001
        else if (arg2.toString().split(".")[1].length == 1) {
            Number(arg2.toString()) * 100;
          } else {
            r2 = Number(arg2.toString().replace(".", ""));
          }

        var res = r1 / r2;
        var res2 = Math.pow(10, t2 - t1);
        console.log(res, res2);
        console.log('***', res * res2);
        return res * res2;
      },
      // js大数乘法
      accMul: function accMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();

        try {
          m += s1.split(".")[1].length;
        } catch (e) {}

        try {
          m += s2.split(".")[1].length;
        } catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
      },
      // js大数加法
      accAdd: function accAdd(arg1, arg2) {
        var r1, r2, m;

        try {
          r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          r1 = 0;
        }

        try {
          r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          r2 = 0;
        }

        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
      },
      // 承保天数 = 保险止期 - 保险起期 insuredDay = periodEnd - periodStart        J2-I2 
      // 承包月数 Ori Months = Insured Day / 30.5 
      // 月保费 = 自保毛保费 / 承保月数
      // 年保费 = 自保毛保费 / 承保天数
      getDays: function getDays(start, end, index1) {
        if (start == null || end == null) {
          this.$message.warning('截止起期 截止止期不能为空');
        }

        console.log('start end index1 insuredDay this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay', start, end, index1, this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay);
        var newStart = this.dateFormatChange(start);
        var newEnd = this.dateFormatChange(end);
        var days = this.dateMinus(newStart, newEnd);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay = days;
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriMonths = (days / 30.5).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilGrossPremium / days).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilGrossPremium / (days / 30.5).toFixed(2);
      },
      getCilShareValue: function getCilShareValue(insuredValue, cilShare, totalDue, index1) {
        var that = this;

        if (insuredValue == null || cilShare == null) {
          this.$message.warning('保额/限额 自保比例不能为空');
          return;
        }

        console.log('insuredValue cilShare  cc that.premiumList[0] ,that.baseInfo.exchangeRateindex1 totalDue', insuredValue, cilShare, this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilOriGrossPremium, that.premiumList[0], that.baseInfo.exchangeRate, totalDue, index1); // 自保保额 
        // 如果是MAR 自保保额 除以层的数量 guPolicyItemMainVoList数组的length

        if (that.baseInfo.riskCode == 'MAR') {
          var length = this.underlying.guPolicyItemMainVoList.length;
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilShareValue = (insuredValue * (cilShare * 0.01) / length).toFixed(2);
        } else {
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilShareValue = (insuredValue * (cilShare * 0.01)).toFixed(2);
        } // 自保分入原毛保费 


        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilOriGrossPremium = (that.premiumList[0] * (that.baseInfo.exchangeRate * 0.01) * (cilShare * 100) / 100).toFixed(2);
        var ilOriGrossPremium = (that.premiumList[0] * (that.baseInfo.exchangeRate * 0.01) * (cilShare * 100) / 100).toFixed(2); // 自保费率 乘100
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilRate = ((totalDue / (insuredValue * 100) / (cilShare * 100)) * 100).toFixed(4)

        var VAT = (ilOriGrossPremium * (that.baseInfo.vatRate * 0.01 / 1.06)).toFixed(2);
        var VATSurcharge = (VAT * that.baseInfo.vatSurchargeRate * 0.01).toFixed(2);
        var OriCommission = ((ilOriGrossPremium - VAT) * (that.baseInfo.commissionRate * 0.01)).toFixed(2);
        console.log('自保分入原毛保费 - 税费 - 税费附加费 - 佣金计算', ilOriGrossPremium, VAT, VATSurcharge, OriCommission); // 自保分入净保费 = 自保分入原毛保费 - 税费 - 税费附加费 - 佣金计算

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.totalDue = (ilOriGrossPremium - VAT - VATSurcharge - OriCommission).toFixed(2);
      },
      // 自保费率=自保分入净保费/自保保额
      // 自保毛保费  = 自保分入净保费+ 自保佣金
      getcilRate: function getcilRate(totalDue, cilShareValue, index1) {
        if (totalDue == null || cilShareValue == null) {
          this.$message.warning('自保分入净保费 自保保额不能为空');
          return;
        } // 自保费率 


        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilRate = (totalDue / cilShareValue).toFixed(4); // 自保毛保费 = 自保分入净保费+ 自保佣金

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilGrossPremium = (Number(totalDue) + Number(this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.commission)).toFixed(2);
      },
      // 自保毛保费  = 自保分入净保费+ 自保佣金
      getcilGrossPremium: function getcilGrossPremium(totalDue, commission, oriMonths, insuredDay, index1) {
        if (totalDue == null || commission == null) {
          this.$message.warning('自保分入净保费 自保佣金不能为空');
          return;
        }

        console.log('自保分入净保费 自保佣金', totalDue, commission, _typeof(totalDue), _typeof(commission)); // 自保毛保费 = 自保分入净保费+ 自保佣金

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilGrossPremium = (Number(totalDue) + Number(commission)).toFixed(2);
        var cilGrossPremium = (Number(totalDue) + Number(commission)).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (cilGrossPremium / oriMonths).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = (cilGrossPremium * (365 / insuredDay)).toFixed(2);
      },
      // 月保费 = 自保毛保费 / 承保月数  
      getoriPerMonth: function getoriPerMonth(cilGrossPremium, oriMonths, index1) {
        if (cilGrossPremium == null || oriMonths == null) {
          this.$message.warning('自保毛保费 承保月数不能为空');
          return;
        }

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (cilGrossPremium / oriMonths).toFixed(2); // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = (cilGrossPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay)
      },
      // 年保费 = 自保毛保费 / 承保天数
      getoriAnnualPremium: function getoriAnnualPremium(cilGrossPremium, insuredDay, index1) {
        if (cilGrossPremium == null || insuredDay == null) {
          this.$message.warning('自保毛保费 承保天数不能为空');
          return;
        } // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (cilGrossPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriMonths)


        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = (cilGrossPremium * (365 / insuredDay)).toFixed(2);
      },
      // 原分出毛保费 = 自保分入原毛保费 cilOriGrossPremium *分出比例
      // 分出净保费 = 原分出毛保费 - 税费 - 税费附加费 - 佣金计算
      // 分出总保费 = 分出净保费 + 佣金计算
      // 年保费 = 原分出毛保费 /承保天数
      // 分出保额 = 自保保额 * 分出比例
      // 分出费率 = 分出总保费/分出保额
      getriOriGrossPremium: function getriOriGrossPremium(selfInsuranceRate, overrideRate, index1, index2) {
        var that = this; // 分出比例
        // 原分出毛保费

        var riOriGrossPremium = (selfInsuranceRate * 0.01 * this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilOriGrossPremium).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riOriGrossPremium = riOriGrossPremium;
        console.log('selfInsuranceRate index1 index2 riOriGrossPremium 22', selfInsuranceRate, index1, index2, riOriGrossPremium, this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilOriGrossPremium); // 税费  VAT = riOriGrossPremium  * vatRate/1.06 

        var VAT = (riOriGrossPremium * (that.baseInfo.vatRate * 0.01 / 1.06)).toFixed(2); // 税费附加费  VAT Surcharge = VAT * vatSurchargeRate

        var VATSurcharge = (VAT * that.baseInfo.vatSurchargeRate * 0.01).toFixed(2); // 佣金计算 Ori Commission = (riOriGrossPremium-VAT)*selfInsuranceRate

        var OriCommission = ((riOriGrossPremium - VAT) * (overrideRate * 0.01)).toFixed(2);
        console.log('分出 riOriGrossPremium - VAT - VATSurcharge - OriCommission', riOriGrossPremium, VAT, VATSurcharge, OriCommission); // 分出净保费 

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalDue = (riOriGrossPremium - VAT - VATSurcharge - OriCommission).toFixed(2);
        var totalDue = (riOriGrossPremium - VAT - VATSurcharge - OriCommission).toFixed(2); // 分出总保费 = 分出净保费 + 分出佣金                             // commission

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalPremium = (Number(totalDue) + Number(this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].commission)).toFixed(2);
        console.log(riOriGrossPremium, this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay); // 年保费 = 原分出毛保费 /承保天数

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].annualPremium = (riOriGrossPremium * 365 / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay).toFixed(2); // 分出保额 = 自保保额 * 分出比例

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riShareValue = (this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilShareValue * selfInsuranceRate * 0.01).toFixed(2); // 分出费率 = 分出总保费/分出保额

        console.log('2222', this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalPremium, this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riShareValue);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riRate = (this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riShareValue).toFixed(4);
      },
      // 分出佣金触发  推出分出总保费 和分出费率
      getriOriGrossPremium2: function getriOriGrossPremium2(commission, totalDue, index1, index2) {
        console.log('commission, totalDue index1, index2', commission, totalDue, index1, index2); // 分出总保费 = 分出净保费 + 分出佣金                             // commission

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalPremium = (Number(totalDue) + Number(commission)).toFixed(2); // 分出费率 = 分出总保费 / 分出保额

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riRate = (this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].totalPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[index2].riShareValue).toFixed(4);
      },
      // 获取随机唯一数
      getRandomOnly: function getRandomOnly() {
        return Math.random().toString(16);
      },
      // 批改录入 from 历次批单
      detailsData3: function detailsData3(_detailsData) {
        // // debugger
        Vue.gvUtil.redirectTo({
          name: "batchentryApp",
          query: {
            policyno: _detailsData.row.policyNo,
            frombaocha: "yes"
          }
        });
      },
      handle: function handle(row, column, event, cell) {
        console.log("shuju", column.property, row); // row.policyNo

        if (column.property == "policyNoAndVersionNo") {
          // 跳转看详情
          Vue.gvUtil.redirectTo({
            name: "batchentryinfo7App",
            query: {
              pageType: "back",
              row: row
            }
          });
        }
      },
      // 保单详情接口-批改
      getPolicyFeeInfo: function getPolicyFeeInfo(row, flag) {
        var _this2 = this;

        var that = this; // 获取保单信息

        var url = Vue.gvUtil.getUrl({
          apiName: "verifyEndorsementType",
          contextName: "selfins"
        });
        var params = row; // // debugger
        // this.queryTable1(row.policyNo)

        this.policyNo2 = row.policyNo;
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            if (res.resCode == "0000") {
              that.baseInfo = res.resData;
              that.guPolicyItemMainVoListThree = res.resData.guPolicyItemMainVoList; // 有效批改日期 类型

              that.baseInfo.endorsementEffectiveDate = row.endorsementEffectiveDate; // 如果是冲销过来的

              if (flag && flag == "copy2") {
                that.baseInfo.endorsementType = "04";
              } else {
                that.baseInfo.endorsementType = row.endorsementType;
              } //如果审核通过可以打印


              that.$emit("PrintandschemeFor", that.baseInfo.policyStatus); // 文档资料

              _this2.$emit("fromChild", res.resData.ggDocumentList);

              var baseInfoRule = {
                // 基础信息校验
                renewalSign: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                riskCode: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                upstreamSign: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                riInward: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                effectiveDate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                expiryDate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                underWritingYear: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                handle: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                underWriter: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                projectName: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                insured: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                cedingCurrency: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 本币单位
                currency: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 兑换率
                exchangeRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 增值税税率
                vatRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 增值税附加税率
                vatSurchargeRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 佣金率
                commissionRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }]
              };
              that.baseInfo.baseInfoRule = baseInfoRule; // console.log(' that.baseInfo', that.baseInfo)
              // 原保单

              that.guPolicyVoList = res.resData.guPolicyVoList; // 分期分入 guInstallmentForPolicyVo guInstallmentRiVo

              if (res.resData.guInstallmentForPolicyVo == null) {
                that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                  riskCode: null,
                  // 自保险种
                  currency: null,
                  //币种
                  totalDue: null,
                  // 保费变化量
                  totalPremium: null,
                  // 自保总保费
                  totalAmount: null,
                  // 自保总保额
                  displayNo: null,
                  // 显示序号
                  count: null,
                  // 期数	count
                  guInstallmentDetailVoList: []
                };
              } else {
                // guInstallmentForPolicyVo
                that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guInstallmentForPolicyVo.guInstallmentRiVo;
              } // 分期分出 .guInstallmentForPolicyVo


              if (res.resData.guInstallmentForPolicyVo) {
                that.fqPayee.guInstallmentRoVoList = res.resData.guInstallmentForPolicyVo.guInstallmentRoVoList;
              } // 条款


              that.Clause.guPolicyClauseVoList = res.resData.guPolicyClauseVoList; // 标的

              var arr = res.resData.guPolicyItemMainVoList;
              that.underlying.guPolicyItemMainVoList = arr;
              console.log("审核后页面数据和res数据", that.baseInfo, arr); // 再保人

              that.fromData.guPolicyRiVoList = res.resData.guPolicyRiVoList;
              that.isReadonly = true; // 单独获取修改人信息

              var url3 = Vue.gvUtil.getUrl({
                apiName: "UserInfo",
                contextName: "selfins"
              });
              var _params = {};
              Vue.gvUtil.http.post(url3, _params).then(function (res) {
                if (res.resCode == "0000") {
                  console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                  that.baseInfo.amendedBy = res.resData.userName;
                }
              });
            }
          } else {
            that.$message({
              showClose: true,
              message: res.resMsg,
              type: "warning"
            });
          }
        });
      },
      // 保单详情接口-工作流详情
      getPolicyFeeInfo11: function getPolicyFeeInfo11() {
        var _this3 = this;

        var that = this;
        that.stateWord = "modify";
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        //  // debugger

        console.log("taskobj", this.taskObj);
        var obj = JSON.parse(this.taskObj.param1); // 获取保单信息

        var url = Vue.gvUtil.getUrl({
          apiName: "endorSelfMainendorDetail",
          contextName: "selfins"
        });
        var params = {
          policyNo: obj.policyNo,
          endorsementEffectiveDate: obj.endorsementEffectiveDate,
          endorsementType: obj.endorsementType,
          versionNo: obj.versionNo
        }; // this.queryTable1(row.policyNo)
        // this.policyNo2 = row.policyNo

        this.policyNo2 = obj.policyNo;
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            if (res.resCode == "0000") {
              that.baseInfo = res.resData;
              that.guPolicyItemMainVoListThree = res.resData.guPolicyItemMainVoList; // 有效批改日期 类型
              // that.baseInfo.endorsementEffectiveDate = row.endorsementEffectiveDate
              // that.baseInfo.endorsementType = row.endorsementType
              // 文档资料

              _this3.$emit("fromChild", res.resData.ggDocumentList);

              var baseInfoRule = {
                // 基础信息校验
                renewalSign: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                riskCode: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                upstreamSign: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                riInward: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                effectiveDate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                expiryDate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                underWritingYear: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                handle: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                underWriter: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                projectName: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                insured: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                description: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                cedingCurrency: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 本币单位
                currency: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 兑换率
                exchangeRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 增值税税率
                vatRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 增值税附加税率
                vatSurchargeRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }],
                // 佣金率
                commissionRate: [{
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur"
                }]
              };
              that.baseInfo.baseInfoRule = baseInfoRule; // console.log(' that.baseInfo', that.baseInfo)
              // 原保单

              that.guPolicyVoList = res.resData.guPolicyVoList; // 分期分入 guInstallmentForPolicyVo

              if (res.resData.guInstallmentForPolicyVo.guInstallmentRiVo == null) {
                that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                  riskCode: null,
                  // 自保险种
                  currency: null,
                  //币种
                  totalDue: null,
                  // 保费变化量
                  totalPremium: null,
                  // 自保总保费
                  totalAmount: null,
                  // 自保总保额
                  displayNo: null,
                  // 显示序号
                  count: null,
                  // 期数	count
                  guInstallmentDetailVoList: []
                };
              } else {
                // guInstallmentForPolicyVo
                that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guInstallmentForPolicyVo.guInstallmentRiVo;
              } // 分期分出 .guInstallmentForPolicyVo


              that.fqPayee.guInstallmentRoVoList = res.resData.guInstallmentForPolicyVo.guInstallmentRoVoList; // 条款

              that.Clause.guPolicyClauseVoList = res.resData.guPolicyClauseVoList; // 标的

              var arr = res.resData.guPolicyItemMainVoList; // 保费数组 下发修改

              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = arr[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var item = _step7.value;
                  that.premiumList2.push(item.premium);
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                    _iterator7["return"]();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }

              console.log("premiumList222", that.premiumList2);
              that.underlying.guPolicyItemMainVoList = arr;
              console.log("审核后页面数据和res数据", that.baseInfo, arr); // 再保人

              that.fromData.guPolicyRiVoList = res.resData.guPolicyRiVoList;
              that.isReadonly = true; // 单独获取修改人信息

              var url3 = Vue.gvUtil.getUrl({
                apiName: "UserInfo",
                contextName: "selfins"
              });
              var _params2 = {};
              Vue.gvUtil.http.post(url3, _params2).then(function (res) {
                if (res.resCode == "0000") {
                  console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                  that.baseInfo.amendedBy = res.resData.userName;
                }
              });
            }
          } else {
            that.$message({
              showClose: true,
              message: res.resMsg,
              type: "warning"
            });
          }
        });
      },
      removeMulti: function removeMulti() {
        this.licipidan = true;
        var policyNo = this.policyNo2; // this.pageSize1=2
        // this.pageNo1=0

        this.queryTable1(policyNo);
      },
      // 分入分页查询
      queryTable1: function queryTable1(policyNo) {
        var that = this;
        var params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1,
          policyNo: policyNo
        }; //   url = Vue.gvUtil.getUrl({
        //     apiName: 'specialAuditLogFindByBusinessNo',
        //     contextName: 'auth',
        //     urlParams: {business_no: this.businessNo},
        //     serachParms: {pageSize: params._pageSize, pageNo: params._pageNo}
        // });

        var url = Vue.gvUtil.getUrl({
          apiName: "historyEndor",
          contextName: "selfins"
        });
        console.log("url", url, this.pageNo1, this.pageSize1); // selfins/uprRi/findUprRi
        // http://114.251.151.247:8805/selfins/uprMain/findUpr?&_pageSize=10&_pageNo=0

        url = url + "?&_pageSize=" + this.pageSize1 + "&_pageNo=" + this.pageNo1;
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = res.resData.businessList.content[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var item = _step8.value;
                item.effectiveDate = item.effectiveDate + "   " + item.expiryDate;
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }

            that.tableData1 = res.resData.businessList.content;
            that.pageaA = res.resData.businessList.totalPages;
            that.total1 = res.resData.businessList.total;
          } else {}
        });
      },
      handleSizeChanges1: function handleSizeChanges1(val) {
        this.pageSize1 = val;
        console.log(this.pageSize1); // this.xxx();
      },
      handleCurrentChangePages1: function handleCurrentChangePages1(val) {
        this.pageaA = val;
        this.pageNo1 = val - 1;
        var policyNo = this.policyNo2;
        this.queryTable1(policyNo);
        console.log(this.pageaA);
      },
      // 获取续保单号
      getxubodanhao: function getxubodanhao() {
        var that = this;
        var policyNo = that.baseInfo.previousPolicyNo;
        var url = Vue.gvUtil.getUrl({
          apiName: "findNewPolicyAllInfo",
          contextName: "selfins"
        });
        var params = {
          policyNo: policyNo
        };
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("续保单号", res); // if (res.resCode == '0000') {
          //   that.printsdata = res.resData.ggDocumentList
          // }
        });
      },
      // 打印弹窗
      printTableVisible2: function printTableVisible2() {
        var that = this; // 获取险种

        var riskCode = this.baseInfo.riskCode;
        var params = {
          riskCode: riskCode
        };

        if (riskCode) {
          this.printTableVisible = true;
          var url = Vue.gvUtil.getUrl({
            apiName: "getList",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, params).then(function (res) {
            console.log("RES", res);

            if (res.resCode == "0000") {
              that.printsdata = res.resData.ggDocumentList;
            }
          });
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
        }
      },
      getPDFData: function getPDFData(list) {
        console.log("打印list", list);
        this.PDFList = list;
      },
      downloadFDF: function downloadFDF() {
        var that = this;
        var pdf = this.PDFList;

        if (pdf.length != 1) {
           this.$message({
                message: Vue.gvUtil.getInzTranslate("insureapp_PleasePdf"), // 再保人数据不能为空
                type: "warning", // success
           });    
          return;
        } // that.baseInfo.proposalNo = 'ZBTBOOPD2020000046'


        if (that.baseInfo.proposalNo == "" || that.baseInfo.proposalNo == null) {
             this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_missingNumber"), //缺少投保单号
            type: "warning", // success
          });
          return;
        }

        console.log("用户选中的pdf 的 list", pdf);
        var params = {
          proposalNo: that.baseInfo.proposalNo,
          versionNo: "000",
          templateName: pdf[0].templateName
        };
        var url = Vue.gvUtil.getUrl({
          apiName: "printPDF",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params, {
          responseType: "blob"
        }).then(function (res) {
          // if (res.resCode == '0000') {
          // alert('打印成功')
          // console.log(res)
          var str = pdf[0].documentType + ".pdf";
          Vue.gvUtil.resolveBlob(res, str); // }
        }); // Vue.gvUtil.http.post(url, params).then((res) => {
        //   console.log('PDF', res)
        // });
        // Vue.gvUtil.http.post(url, params, {
        //   responseType: 'blob'
        // }).then((res) => {
        //   console.log('PDF', res)
        //   const data = res.resData
        //   let blob = new Blob([data], {
        //     type: 'application/pdf;charset=UTF-8'
        //   });
        //   let fileName = 'download.pdf';
        //   if (window.navigator.msSaveOrOpenBlob) {
        //     navigator.msSaveBlob(blob, fileName)
        //   } else {
        //     var link = document.createElement('a');
        //     link.href = window.URL.createObjectURL(blob);
        //     link.download = fileName;
        //     link.click();
        //     window.URL.revokeObjectURL(link.href) //释放内存
        //   }
        //   // const url = window.URL.createObjectURL(new Blob([data], {
        //   //   type: "application/pdf;charset=UTF-8"
        //   // }))
        //   // const link = document.createElement('a')
        //   // link.style.display = 'none'
        //   // link.href = url
        //   // // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])
        //   // link.setAttribute('download', 'download.xlsx')
        //   // document.body.appendChild(link)
        //   // link.click()
        //   // document.body.removeChild(link)
        // });
      },
      stateFormat3: function stateFormat3(row, column) {
        if (row.isShare == "0") {
          return "否";
        } else {
          return "是";
        }
      },
      // initPage() {
      //   // Vue.gvUtil.initTranslation("Currency");
      // },
      getData: function getData() {
        return this.auditInfo.approvedRemark;
      },
      getValidate: function getValidate() {
        var result = false;

        var _this = this;

        this.$refs["auditInfo"].validate(function (valid, obj) {
          if (!valid) {
            for (i in obj) {
              if (!_this.$refs[i].focus) {
                _this.$refs[i].$children[0].focus();
              } else {
                _this.$refs[i].focus();
              }
            }
          }

          result = valid;
        });
        return result;
      },
      // 审核通过 不通过
      goAudit: function goAudit(code) {
        var _this4 = this;

        var that = this;
        var approveFlag = code; //  01 审核通过 06 审核不通过

        this.$refs.auditInfo.validate(function (valid) {
          if (valid) {
            var url = Vue.gvUtil.getUrl({
              apiName: "verify",
              contextName: "selfins"
            });
            var params = {
              proposalNo: that.baseInfo.proposalNo,
              policyNo: that.baseInfo.policyNo,
              versionNo: that.baseInfo.versionNo,
              policyStatus: that.baseInfo.policyStatus,
              riskCode: that.baseInfo.riskCode,
              approveFlag: approveFlag,
              opinions: that.auditInfo.approvedRemark
            };
            console.log("触发审核接口", params);
            Vue.gvUtil.http.post(url, params).then(function (res) {
              console.log("结果", res); // 跳转保批单查询页面

              _this4.$router.push({
                name: "inquiryApp"
              });
            });
          }
        });
      },
      //审核轨迹
      path: function path() {},
      // 录入保存时候获取创建人和修改人
      saveGetTwo: function saveGetTwo() {
        var that = this;
        var url3 = Vue.gvUtil.getUrl({
          apiName: "UserInfo",
          contextName: "selfins"
        });
        var params = {};
        Vue.gvUtil.http.post(url3, params).then(function (res) {
          if (res.resCode == "0000") {
            // 创建人 baseInfo.createdBy 修改人 baseInfo.amendedBy
            console.log("登录人信息", res.resData); // 这是个数组

            that.baseInfo.createdBy = res.resData.userName;
            that.baseInfo.amendedBy = res.resData.userName; // // 经办人
            // that.baseInfo.handle = res.resData.userName
            // that.baseInfo.handleCode = res.resData.userCode
            // // 承包人
            // that.baseInfo.underWriter = res.resData.userName
            // that.baseInfo.underwriterCode = res.resData.userCode
          }
        });
      },
      // 保单详情接口-查看
      getPolicyFeeInfo3: function getPolicyFeeInfo3(proposalNo, versionNo, word, policyNo) {
        var _this5 = this;

        this.stateWord = word;
        var that = this;
        console.log("保单详情接口", proposalNo, versionNo, policyNo); // 获取保单信息

        var url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins"
        });
        var params = {
          proposalNo: proposalNo,
          versionNo: versionNo,
          policyNo: policyNo
        };
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            that.guPolicyItemMainVoListThree = res.resData.guPolicyItemMainVoList; // 文档资料

            _this5.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);

            var baseInfoRule = {
              // 基础信息校验
              renewalSign: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              riskCode: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              upstreamSign: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              riInward: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              effectiveDate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              expiryDate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              underWritingYear: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              handle: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              underWriter: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              projectName: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              insured: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              cedingCurrency: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 本币单位
              currency: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 兑换率
              exchangeRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 增值税税率
              vatRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 增值税附加税率
              vatSurchargeRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 佣金率
              commissionRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }]
            };
            that.baseInfo.baseInfoRule = baseInfoRule; // console.log(' that.baseInfo', that.baseInfo)
            // 原保单

            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList; // 分期分入

            if (res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo == null) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null,
                // 自保险种
                currency: null,
                //币种
                totalDue: null,
                // 保费变化量
                totalPremium: null,
                // 自保总保费
                totalAmount: null,
                // 自保总保额
                displayNo: null,
                // 显示序号
                count: null,
                // 期数	count
                guInstallmentDetailVoList: []
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            } // 分期分出


            that.fqPayee.guInstallmentRoVoList = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList; // 条款

            that.Clause.guPolicyClauseVoList = res.resData.guPolicyAllInfo.guPolicyClauseVoList; // 标的

            var arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr); // 再保人

            that.fromData.guPolicyRiVoList = res.resData.guPolicyAllInfo.guPolicyRiVoList;
            that.isReadonly = true; // 单独获取修改人信息

            var url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins"
            });
            var _params3 = {};
            Vue.gvUtil.http.post(url3, _params3).then(function (res) {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保单详情接口-修改
      getPolicyFeeInfo2: function getPolicyFeeInfo2(proposalNo, versionNo, word, policyNo) {
        var _this6 = this;

        this.stateWord = word;
        var that = this;
        console.log("保单详情接口", proposalNo, versionNo, policyNo); // 获取保单信息

        var url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins"
        });
        var params = {
          proposalNo: proposalNo,
          versionNo: versionNo,
          policyNo: policyNo
        };
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            that.guPolicyItemMainVoListThree = res.resData.guPolicyItemMainVoList; // 文档资料

            _this6.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);

            var baseInfoRule = {
              // 基础信息校验
              renewalSign: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              riskCode: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              upstreamSign: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              riInward: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              effectiveDate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              expiryDate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              underWritingYear: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              handle: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              underWriter: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              projectName: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              insured: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              cedingCurrency: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 本币单位
              currency: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 兑换率
              exchangeRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 增值税税率
              vatRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 增值税附加税率
              vatSurchargeRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }],
              // 佣金率
              commissionRate: [{
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur"
              }]
            };
            that.baseInfo.baseInfoRule = baseInfoRule; // console.log(' that.baseInfo', that.baseInfo)
            // 原保单

            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList; // 分期分入

            if (res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo == null) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null,
                // 自保险种
                currency: null,
                //币种
                totalDue: null,
                // 保费变化量
                totalPremium: null,
                // 自保总保费
                totalAmount: null,
                // 自保总保额
                displayNo: null,
                // 显示序号
                count: null,
                // 期数	count
                guInstallmentDetailVoList: []
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            } // 分期分出


            that.fqPayee.guInstallmentRoVoList = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList; // 条款

            that.Clause.guPolicyClauseVoList = res.resData.guPolicyAllInfo.guPolicyClauseVoList; // 标的

            var arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr); // 再保人

            that.fromData.guPolicyRiVoList = res.resData.guPolicyAllInfo.guPolicyRiVoList; // that.isReadonly = true
            // 单独获取修改人信息

            var url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins"
            });
            var _params4 = {};
            Vue.gvUtil.http.post(url3, _params4).then(function (res) {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保存 || 提交 的数据
      givedata: function givedata(obj) {
        console.log("保存来的数据", obj); // this.baseInfo = obj

        this.baseInfo.proposalNo = obj.proposalNo;
        this.baseInfo.versionNo = obj.versionNo;
        this.baseInfo.createdBy = obj.createdBy;
        this.baseInfo.amendedBy = obj.amendedBy;
        this.baseInfo.amendedDate = obj.amendedDate;
        this.baseInfo.createdDate = obj.createdDate;
        this.baseInfo.policyStatus = obj.policyStatus;
        this.baseInfo.createdDate = obj.createdDate;
        this.baseInfo.policyStatus = obj.policyStatus;
        this.baseInfo.cancelIndicate = obj.cancelIndicate; // 隐藏新增

        this.baseInfo.policyMainId = obj.policyMainId; // 隐藏新增

        this.baseInfo.cedingPolicyNo = obj.cedingPolicyNo; // 隐藏新增

        this.baseInfo.policyId = obj.policyId; // 隐藏新增
        // 如果obj有submit 且 为true

        if (obj.Submit) {
          console.log("提交的Submit", obj.Submit);
          this.Submit = true;
        } else {
          this.baseInfo.cancelIndicate = obj.cancelIndicate; // 隐藏新增

          this.baseInfo.policyMainId = obj.policyMainId; // 隐藏新增

          this.baseInfo.cedingPolicyNo = obj.cedingPolicyNo; // 隐藏新增

          this.baseInfo.policyId = obj.policyId; // 隐藏新增
          // 保存的话 赋值标的 再保人 分期（分入分出） 原保单

          this.guInstallmentForPolicyVo.guInstallmentRiVo = obj.guInstallmentForPolicyVo.guInstallmentRiVo;
          this.fqPayee.guInstallmentRoVoList = obj.guInstallmentForPolicyVo.guInstallmentRoVoList;
          this.underlying.guPolicyItemMainVoList = obj.guPolicyItemMainVoList;
          this.fromData.guPolicyRiVoList = obj.guPolicyRiVoList;
          this.guPolicyVoList = obj.guPolicyVoList;
        }
      },
      redstar: function redstar(h, _ref2) {
        var column = _ref2.column;
        return [h("span", {
          style: "color: red"
        }, "*"), h("span", " " + column.label)];
      },
      // 查询页面原保单返回来的数据
      dataFromSelectpolicyApp: function dataFromSelectpolicyApp(obj) {
        console.log("obj222", obj); // 干掉查询详情的再保人this.fromData.guPolicyRiVoList

        var arr1 = this.fromData.guPolicyRiVoList.filter(function (item) {
          if (item.policyRiId) {} else {
            return item;
          }
        }); // 原保单 this.guPolicyVoList

        var arr2 = this.guPolicyVoList.filter(function (item) {
          if (item.policyId) {} else {
            return item;
          }
        }); // 标的数据 this.underlying.guPolicyItemMainVoList

        var arr3 = this.underlying.guPolicyItemMainVoList.filter(function (item) {
          if (item.itemMainId) {} else {
            return item;
          }
        }); // }
        // 遍历原保单 给新增原保单增加唯一值
        // if (obj.guPolicyVoList && obj.guPolicyVoList.length >= 1) {
        //   for (let i = 0; i < obj.guPolicyVoList.length; i++) {
        //     let random2 = this.getRandomOnly()
        //     console.log('obj.guPolicyVoList[i]', obj.guPolicyVoList[i])
        //     obj.guPolicyVoList[i].random = random2
        //     // 如果对应有再保人
        //     if (obj.guPolicyRiVoList && obj.guPolicyRiVoList[i] instanceof Object) {
        //       obj.guPolicyRiVoList[i].random = random2
        //     }
        //   }
        // }
        // 遍历原保单 给新增标的增加随机唯一值
        // if (obj.guPolicyVoList && obj.guPolicyVoList.length >= 1) {
        //   for (let i = 0; i < obj.guPolicyItemMainVoList.length; i++) {
        //     let random3 = this.getRandomOnly()
        //     console.log('obj.guPolicyItemMainVoList[i]', obj.guPolicyItemMainVoList[i])
        //     obj.guPolicyItemMainVoList[i].random = random3
        //     // 如果对应有再保人
        //     if (obj.guPolicyItemMainVoList && obj.guPolicyItemMainVoList[i] instanceof Object) {
        //       obj.guPolicyItemMainVoList[i].random = random3
        //     }
        //   }
        // }

        console.log("arr1 arr2 arr3", arr1, arr2, arr3);
        this.fromData.guPolicyRiVoList = arr1;
        this.guPolicyVoList = arr2;
        this.underlying.guPolicyItemMainVoList = arr3;
        var that = this;

        if (obj.guPolicyItemMainVoList) {
          console.log("原保单查询页面来的数据渲染", obj); // 1.渲染原保单 必有

          this.guPolicyVoList = this.guPolicyVoList.concat(obj.guPolicyVoList); // 2.渲染标的 必有

          this.underlying.guPolicyItemMainVoList = this.underlying.guPolicyItemMainVoList.concat(obj.guPolicyItemMainVoList); // 三个险种的标的

          this.guPolicyItemMainVoListThree = this.underlying.guPolicyItemMainVoList;
          var arrr = [];

          if (obj.guPolicyItemMainVoList.length > 0) {
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
              for (var _iterator9 = obj.guPolicyItemMainVoList[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var item = _step9.value;
                arrr.push(item.premium);
              }
            } catch (err) {
              _didIteratorError9 = true;
              _iteratorError9 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                  _iterator9["return"]();
                }
              } finally {
                if (_didIteratorError9) {
                  throw _iteratorError9;
                }
              }
            }
          }

          this.premiumList = this.premiumList.concat(arrr);
          console.log("aeee", this.premiumList); // for(obj.)
          // 3.再保人 未必有

          var arr = [];
          arr = arr.concat(obj.guPolicyRiVoList);
          console.log("再保人", arr);
          this.fromData.guPolicyRiVoList = this.fromData.guPolicyRiVoList.concat(arr);
          this.fqPayee.guInstallmentRoVoList = this.fqPayee.guInstallmentRoVoList.concat(arr); // console.log('开始', this.guPolicyVoList, this.underlying.guPolicyItemMainVoList, this.fromData.guPolicyRiVoList,
          //   '中间', obj.guPolicyVoList, obj.guPolicyItemMainVoList, arr,
          //   '结果', this.guPolicyVoList, this.underlying.guPolicyItemMainVoList, this.fromData.guPolicyRiVoList)
          // 4.四个字段
          // obj.guPolicyVoList[0]
          // 校验？？？？

          this.baseInfo.cedingCurrency = obj.guPolicyVoList[0].currency; // 原币单位 校验四兄弟

          this.baseInfo.cedingCompany = obj.guPolicyVoList[0].cedingCompany; // 原保险人 校验四兄弟

          this.baseInfo.programmeCode = obj.guPolicyVoList[0].programmeCode; //方案code 新增 校验四兄弟

          this.baseInfo.projectCode = obj.guPolicyVoList[0].projectCode; // 项目code 新能 校验四兄弟

          this.baseInfo.projectName = obj.guPolicyVoList[0].projectName; // 项目打印名称

          this.baseInfo.insured = obj.guPolicyVoList[0].insured; // 被保人

          this.baseInfo.effectiveDate = obj.guPolicyVoList[0].periodStart; // 保险起期

          this.baseInfo.expiryDate = obj.guPolicyVoList[0].periodEnd; // 保险止期

          this.baseInfo.renewalPolicyNo = obj.guPolicyVoList[0].renewalPolicyNo; // 续保保单号
          // 承保年度

          console.log("获取承包年度", obj.guPolicyVoList[0].periodStart);

          if (obj.guPolicyVoList[0].periodStart != null && obj.guPolicyVoList[0].periodStart != "") {
            var data = obj.guPolicyVoList[0].periodStart.slice(6, 10);
            console.log("获取承包年度", data);
            this.baseInfo.underWritingYear = data;
          }

          this.baseInfo.cedingProjectName = obj.guPolicyVoList[0].projectName; // 项目code 新能 校验四兄弟
          // 获取兑换率 cedingCurrency

          var params = {
            baseCurrency: that.baseInfo.currency,
            exchCurrency: that.baseInfo.cedingCurrency
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findExchange",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, params).then(function (res) {
            if (res.resCode == "0000") {
              console.log("获得兑换率", res.resData); // 这是个数组

              that.baseInfo.exchangeRate = res.resData.exchangeRate; // Vue.gvUtil.initTranslation("Currency");
            }
          });
        } else {
          console.log("一开是没有数据");
        }
      },
      // 增加-条款信息
      addClauseVoList: function addClauseVoList() {
        this.Clause.guPolicyClauseVoList.push({
          clauseName: "",
          // 条款名称
          clauseContent: "",
          // 条款内容
          reinsurer: "",
          // 再保人名称
          reinsCode: "",
          // 再保人代码
          cedingPolicyNo: "",
          // 原保单号
          source: "" // 来源

        });
      },
      // 再保人数据全部替换标的
      // ReinsuranceInfoReplaceCheckpolicy() {
      //   console.log('再保人信息', this.fromData.guPolicyRiVoList)
      //   this.underlying.guPolicyItemMainVoList.forEach((item) => {
      //     item.guPolicyItemReinsVoList = this.fromData.guPolicyRiVoList
      //   })
      //   console.log('xxxxx', this.underlying.guPolicyItemMainVoList)
      // },
      // 新增-选择原保单 打开弹窗
      ChooseCedingPolicy: function ChooseCedingPolicy() {
        if (this.baseInfo.riskCode == "") {
            this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
          return;
        } // 险种是OOPD


        if (this.baseInfo.riskCode == "OOPD") {
          // 1.打开弹窗
          var isShow = true; // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code

          var vailfFourBrother = {};
          vailfFourBrother.currency = this.baseInfo.cedingCurrency;
          vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
          vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
          vailfFourBrother.projectCode = this.baseInfo.projectCode; // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息

          this.$emit("open-event", isShow, vailfFourBrother, this.baseInfo.riskCode, this.guPolicyVoList);
        } else {
          // 1.打开弹窗
          var _isShow = true; // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code

          var _vailfFourBrother = {};
          _vailfFourBrother.currency = this.baseInfo.cedingCurrency;
          _vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
          _vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
          _vailfFourBrother.projectCode = this.baseInfo.projectCode; // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息

          this.$emit("open-event", _isShow, _vailfFourBrother, this.baseInfo.riskCode, this.guPolicyVoList);
        }
      },
      // 条款保存 校验 || 关闭
      savePolicyClauseVoList: function savePolicyClauseVoList(formName) {
        var that = this; // 如果条款数据为空

        if (this.Clause.guPolicyClauseVoList.length == 0) {
          alert("数据不能为空");
          return;
        } // 先校验


        this.$refs[formName].validate(function (valid) {
          if (valid) {
            that.$message({
              showClose: true,
              message: "条款保存成功!",
              type: "success"
            });
            that.dialogTableVisible = false;
          }
        });
      },
      // 条款关闭
      closedialog: function closedialog(formName) {
        // this.$refs[formName].resetFields();
        console.log("关闭条款弹窗");
        this.reinsurerCode = "";
        this.reinsurer = "";
      },
      // 分期分入增加 同时分出也增加
      addPeriodizationIn: function addPeriodizationIn() {
        console.log("分期分入增加 同时分出也增加");
        this.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.push({
          accountNo: "",
          // 账单接收人号码	accountNo
          feeType: "",
          // 费用类型代码	feeType
          feeSeqNo: "",
          // 费用序号	feeSeqNo
          installmentNo: 1,
          // 缴费期次	installmentNo
          dueDate: "",
          // 缴费截止日期	dueDate
          installmentRate: "",
          // 缴费分期比例	installmentRate
          currency: "",
          // 币别	currency
          premium: "",
          // 金额	premium 也是保费
          billNo: "",
          // 票据号	billNo
          riShare: "" // 转分出比例

        }); // this.fqPayee.guInstallmentDetailVoList.push({
        //   accountNo: "", // 账单接收人号码	accountNo
        //   feeType: "", // 费用类型代码	feeType
        //   feeSeqNo: 9, // 费用序号	feeSeqNo
        //   installmentNo: 5, // 缴费期次	installmentNo
        //   dueDate: "2020-01-02", // 缴费截止日期	dueDate
        //   installmentRate: 20, // 缴费分期比例	installmentRate
        //   currency: "CNY", // 币别	currency
        //   premium: "", // 金额	premium
        //   billNo: "", // 票据号	billNo
        //   riShare: 9, // 转分出比例
        // });
      },
      // 增加分期分出按钮 是否增加分入信息？？？
      addPeriodizationOut: function addPeriodizationOut() {
        // console.log(index);
        // this.guInstallmentDetailVoList;
        // // debugger;
        if (!this.fqPayee.guInstallmentDetailVoList) {
          // this.fqPayee.guInstallmentRoVoList[
          //   this.guInstallmentDetailVoListindex
          // ].guInstallmentDetailVoList = [];
          this.fqPayee.guInstallmentDetailVoList = [];
        }

        this.fqPayee.guInstallmentDetailVoList.push({
          accountNo: "",
          // 账单接收人号码	accountNo
          feeType: "",
          // 费用类型代码	feeType
          feeSeqNo: "",
          // 费用序号	feeSeqNo
          installmentNo: "",
          // 缴费期次	installmentNo
          dueDate: "",
          // 缴费截止日期	dueDate
          installmentRate: "",
          // 缴费分期比例	installmentRate
          currency: "",
          // 币别	currency
          premium: "",
          // 金额	premium
          billNo: "",
          // 票据号	billNo
          riShare: "" // 转分出比例

        }); // this.$forceUpdate()
      },
      // 再保人删除 单个
      removesingle: function removesingle(data, index) {
        console.log("再保人单个删除", data, this.fromData.guPolicyRiVoList); // // 获取唯一标识 cedingPolicyNo
        // let deleteDot = data.cedingPolicyNo
        // // filter标的 删除带有此表示的
        // let arr = this.underlying.guPolicyItemMainVoList.filter(item => {
        //   if (item.cedingPolicyNo == deleteDot) {} else {
        //     return item
        //   }
        // })
        // this.underlying.guPolicyItemMainVoList = arr
        // 删除原保单

        this.guPolicyVoList.splice(index, 1); // 删除对应标的
        // console.log('xxxx', this.underlying.guPolicyItemMainVoList[index], this.fromData.guPolicyRiVoList[index])
        // if (this.underlying.guPolicyItemMainVoList[index] instanceof Object) {
        //   this.underlying.guPolicyItemMainVoList.splice(index, 1);
        // }
        // 删除标的

        var arrbiao = this.underlying.guPolicyItemMainVoList.filter(function (item) {
          if (item.random == data.random) {} else {
            return item;
          }
        });
        this.underlying.guPolicyItemMainVoList = arrbiao; // 删除再保人

        var arrzai = this.fromData.guPolicyRiVoList.filter(function (item) {
          if (item.random == data.random) {} else {
            return item;
          }
        });
        this.fromData.guPolicyRiVoList = arrzai; // if (this.fromData.guPolicyRiVoList[index] instanceof Object) {
        //   this.underlying.guPolicyRiVoList.splice(index, 1);
        // }
        // this.fromData.guPolicyRiVoList
      },
      // 获取在保单选中的数组
      handleSelectionChange: function handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 原保单多个删除
      removeMultiguPolicyVoList: function removeMultiguPolicyVoList() {
        var that = this;

        if (that.multipleSelection.length == 0) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_chooseTodelete"), //请选择要删除的数据
            type: "warning", // success
          });
        } else {
          Vue.gvUtil.confirm({
            msg: "确定要删除吗？"
          }).then(function () {
            console.log("多个原保单", that.multipleSelection);
            var arr = [];
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
              for (var _iterator10 = that.multipleSelection[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var item = _step10.value;
                arr.push(item.cedingPolicyNo);
              }
            } catch (err) {
              _didIteratorError10 = true;
              _iteratorError10 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                  _iterator10["return"]();
                }
              } finally {
                if (_didIteratorError10) {
                  throw _iteratorError10;
                }
              }
            }

            var _loop = function _loop() {
              var deleteDot = _arr[_i];
              var arr1 = that.underlying.guPolicyItemMainVoList.filter(function (item) {
                if (item.cedingPolicyNo == deleteDot) {} else {
                  return item;
                }
              });
              var arr2 = that.guPolicyVoList.filter(function (item) {
                if (item.cedingPolicyNo == deleteDot) {} else {
                  return item;
                }
              });
              that.underlying.guPolicyItemMainVoList = arr1;
              that.guPolicyVoList = arr2;
            };

            for (var _i = 0, _arr = arr; _i < _arr.length; _i++) {
              _loop();
            }
          });
        }
      },
      // 发邮件校验
      savemailForm: function savemailForm(formName) {
        this.$refs[formName].validate(function (valid) {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 续保||新保 下拉菜单
      changeContinueSign: function changeContinueSign(a) {
        console.log(a); // 02是续保

        if (a == "02") {
          //续保
          this.Renewal = false;
        } else {
          this.Renewal = true;
        }
      },
      // 自保险种 下拉菜单
      changeschemeName: function changeschemeName(insurance) {
        console.log(insurance);

        if (insurance) {
          this.baseInfo.riskCode = insurance.codeCode;
        } else {} this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
        // let obj = {};
        // obj = this.schemeName.find((item) => {
        //   return item.value === this.baseInfo.schemeName;
        // });
        // this.riskCode = obj.label;

      },
      // 临分标志 下拉菜单
      chooseTemporaryMarking: function chooseTemporaryMarking(riInward) {
        console.log("临分标志", riInward);
        this.baseInfo.riInward = riInward;
      },
      // 自保险种获取
      getcurrency: function getcurrency(data) {
        var that = this;
        console.log("自保险种", data);
        var params = {};
        params.riskCode = data;
        var url = Vue.gvUtil.getUrl({
          apiName: "findDetail",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode == "0000") {
            console.log("res", res.resData); // 这是个数组

            that.baseInfo.currency = res.resData.defaultCurrency;
            that.baseInfo.upstreamSign = res.resData.streamType; // Vue.gvUtil.initTranslation("Currency");
          }
        });
      },
      // 获取承包年度 并且 标的做一个联动 ？？？？
      getunderWritingYear1: function getunderWritingYear1(date) {
        console.log("获取承包年度", date);
        var data = date.slice(6, 10);
        console.log("获取承包年度", data);
        this.baseInfo.underWritingYear = data;
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var item = _step11.value;
            item.periodStart = date;
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }
      },
      getunderWritingYear2: function getunderWritingYear2(date) {
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var item = _step12.value;
            item.periodEnd = date;
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
              _iterator12["return"]();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      },
      // 重新生成标的计算
      checkpolicy: function checkpolicy() {
        var that = this;
        console.log("重新生成标的"); // 1.有没有险种

        if (this.baseInfo.riskCode) {} else {
          that.$message({
            showClose: true,
            message: "请选择险种",
            type: "wraning"
          });
          return;
        } // 2.标的数据不能为空


        if (this.underlying.guPolicyItemMainVoList.length == 0) {
          that.$message({
            showClose: true,
            message: "标的信息不能为空",
            type: "wraning"
          });
          return;
        } // 将再保人的 转废除比例和转分出手续费比例同步到标的数组里面的数组
        // 标的信息必须完善
        // 标的的信息和基础信息的 本单币别 兑换率 增值税税率 增值税附加税率 佣金率


        var params = {}; // 如果是那五个险种

        console.log("22222222", that.IsfiveExport);

        if (that.IsfiveExport) {
          // // debugger
          params.guPolicyItemMainVoList = that.guPolicyItemMainVoListThree;
        } else {
          // // debugger
          params.guPolicyItemMainVoList = that.underlying.guPolicyItemMainVoList;
          params.itemReinsVo = that.fromData.guPolicyRiVoList;
        } // params.guPolicyRiVoList = that.fromData.guPolicyRiVoList


        params.currency = that.baseInfo.currency;
        params.exchangeRate = that.baseInfo.exchangeRate;
        params.vatRate = that.baseInfo.vatRate;
        params.vatSurchargeRate = that.baseInfo.vatSurchargeRate;
        params.commissionRate = that.baseInfo.commissionRate;
        params.riskCode = that.baseInfo.riskCode; // 自保险种

        var url = Vue.gvUtil.getUrl({
          apiName: "calculateItems",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode == "0000") {
            console.log("res", res.resData); // 这是个数组

            that.underlying.guPolicyItemMainVoList = res.resData.guPolicyItemMainVoList;
            that.baseInfo.totalPremium = res.resData.totalPremium;
            that.baseInfo.insuredValue = res.resData.insuredValue;
            that.baseInfo.totalDue = res.resData.totalDue;
            that.baseInfo.totalDueRi = res.resData.totalDueRi;
            that.$message({
              showClose: true,
              message: "标的计算成功！",
              type: "success"
            });
          } else {
            that.$message({
              showClose: true,
              message: res.resMsg,
              type: "wraning"
            });
          }
        });
      },
      // 导出标的
      exportExcel: function exportExcel() {
        if (this.baseInfo.riskCode == "") {
            this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
          return;
        }

        var that = this; // 标的的信息和基础信息的 本单币别 兑换率 增值税税率 增值税附加税率 佣金率

        var params = {};
        params.guPolicyItemMainVoList = this.underlying.guPolicyItemMainVoList;
        params.currency = this.baseInfo.currency;
        params.exchangeRate = this.baseInfo.exchangeRate;
        params.vatRate = this.baseInfo.vatRate;
        params.vatSurchargeRate = this.baseInfo.vatSurchargeRate;
        params.commissionRate = this.baseInfo.commissionRate;
        params.riskCode = this.baseInfo.riskCode; // 自保险种

        params.totalPremium = null;
        params.insuredValue = null;
        params.totalDue = null;
        params.totalDueRi = null;
        var url = Vue.gvUtil.getUrl({
          apiName: "exportItemExcel",
          contextName: "selfins"
        });
        /**
         * Vue.gvUtil.http.post(url, this.rowObj, {
          responseType: 'blob'
        }).then(res => {
          // if (res.resCode == '0000') {
           // alert('打印成功')
            // console.log(res)
             Vue.gvUtil.resolveBlob(res, 'excel.doc')
          // }
        })
         */

        Vue.gvUtil.http.post(url, params, {
          responseType: "blob"
        }).then(function (res) {
          console.log("res", res);
          var data = res;
          var url = window.URL.createObjectURL(new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
          }));
          var link = document.createElement("a");
          link.style.display = "none";
          link.href = url; // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])

          link.setAttribute("download", "download.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      },
      // 标的导入
      importExcel: function importExcel(file) {
        var _this7 = this;

        var that = this;

        if (!that.baseInfo.riskCode) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
          return;
        }

        var overrideRateArr = [];
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = that.fromData.guPolicyRiVoList[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var item = _step13.value;
            overrideRateArr.push(item.overrideRate);
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
              _iterator13["return"]();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }

        if (overrideRateArr.length == 0) {
          overrideRateArr = "";
        }

        console.log("overrideRateArr", overrideRateArr);
        var premiumList = [];

        if (that.stateWord == "modify") {
          premiumList = that.premiumList2;
        } else {
          premiumList = that.premiumList;
        }

        if (that.baseInfo.riskCode != "EAS" && that.baseInfo.riskCode != "MAR" && that.baseInfo.riskCode != "OOPU") {
          this.$confirm("当前保单的标的详情信息已由原保单带入，是否确认要通过导入清单导入？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function () {
            var url = Vue.gvUtil.getUrl({
              apiName: "importItemExcel",
              contextName: "selfins",
              serachParms: {
                premiumList: premiumList,
                exchangeRate: that.baseInfo.exchangeRate,
                overrideRate: overrideRateArr
              }
            });
            formData = new FormData();
            formData.append("file", file.file);
            formData.append("premiumList", premiumList);
            formData.append("exchangeRate", that.baseInfo.exchangeRate);
            formData.append("overrideRate", overrideRateArr);
            Vue.gvUtil.http.post(url, formData).then(function (res) {
              console.log("res", res);

              if (res.resCode != "0000") {
                // this.$message.error(res.resMsg)
                _this7.$message.success("导入失败");

                return;
              }

              if (res.resData[0].riskCode != that.baseInfo.riskCode) {
                _this7.$message.success("请勿导入不同险种的标的");

                return;
              }

              _this7.$message.success("导入成功！"); // 是这五个险种


              that.IsfiveExport = true;
              console.log("that.underlying.guPolicyItemMainVoList ", that.underlying.guPolicyItemMainVoList);
              that.underlying.guPolicyItemMainVoList = res.resData; // 再保人

              if (that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList) {
                that.fromData.guPolicyRiVoList = that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
              }
            });
          })["catch"](function () {
            _this7.$message({
              type: "info",
              message: "已取消"
            });
          });
        } else {
          var url = Vue.gvUtil.getUrl({
            apiName: "importItemExcel",
            contextName: "selfins",
            serachParms: {
              premiumList: premiumList,
              exchangeRate: that.baseInfo.exchangeRate,
              overrideRate: overrideRateArr
            }
          });
          formData = new FormData();
          formData.append("file", file.file);
          formData.append("premiumList", premiumList);
          formData.append("exchangeRate", that.baseInfo.exchangeRate);
          formData.append("overrideRate", overrideRateArr);
          Vue.gvUtil.http.post(url, formData).then(function (res) {
            console.log("res", res);

            if (res.resCode != "0000") {
              // this.$message.error(res.resMsg)
              _this7.$message.success("导入失败");

              return;
            }

            if (res.resData[0].riskCode != that.baseInfo.riskCode) {
              _this7.$message.success("请勿导入不同险种的标的");

              return;
            }

            _this7.$message.success("导入成功！"); // 传递premiumList 接口 ？？？？


            console.log("that.underlying.guPolicyItemMainVoList ", that.underlying.guPolicyItemMainVoList);
            that.underlying.guPolicyItemMainVoList = res.resData;

            if (that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList) {
              that.fromData.guPolicyRiVoList = that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
            }
          });
        }
      },
      // 条款导入
      importClauseExcel: function importClauseExcel(file) {
        var _this8 = this;

        var that = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "importClauseExcel",
          contextName: "selfins",
          serachParms: {}
        });
        formData = new FormData();
        formData.append("file", file.file);
        formData.append("reinsurerCode", this.reinsurerCode);
        formData.append("reinsurer", this.reinsurer);
        Vue.gvUtil.http.post(url, formData).then(function (res) {
          console.log("res", res);

          if (res.resCode != "0000") {
            // this.$message.error(res.resMsg)
            _this8.$message.success("导入失败");

            return;
          }

          that.Clause.guPolicyClauseVoList = that.Clause.guPolicyClauseVoList.concat(res.resData);

          _this8.$message.success("导入成功！"); // console.log('that.underlying.guPolicyItemMainVoList ',that.underlying.guPolicyItemMainVoList )
          // that.underlying.guPolicyItemMainVoList = res.resData

        });
      },
      // 打开条款弹窗 获取再保人名字和code
      openClause: function openClause(index) {
        // let index = index
        this.dialogTableVisible = true;
        this.reinsurerCode = this.fromData.guPolicyRiVoList[index].reinsurerCode;
        this.reinsurer = this.fromData.guPolicyRiVoList[index].reinsurer;
      },
      // 条款导入2
      importClauseExcel2: function importClauseExcel2(file) {},
      // 分期计算并且渲染到页面
      Cal: function Cal() {
        var _this9 = this;

        var params = {
          // 分期
          guInstallmentForPolicyVo: {
            // 分入
            guInstallmentRiVo: {},
            // 分出
            guInstallmentRoVoList: []
          },
          // 标的
          guPolicyItemMainVoList: []
        }; // 再保人数据不能

        var that = this; // 校验一下

        this.$refs.fqfrom.validate(function (valid) {
          console.log("分期校验", valid);

          if (valid) {
            // 标的数组
            params.guPolicyItemMainVoList = that.underlying.guPolicyItemMainVoList; // 分期 分入

            params.guInstallmentForPolicyVo.guInstallmentRiVo = that.guInstallmentForPolicyVo.guInstallmentRiVo;

            if (that.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList && that.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.length >= 1) {
              var scope = 0; // 分期 分入批次相加必须为100

              var _iteratorNormalCompletion14 = true;
              var _didIteratorError14 = false;
              var _iteratorError14 = undefined;

              try {
                for (var _iterator14 = that.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                  var item = _step14.value;
                  scope = scope + Number(item.installmentRate);
                }
              } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
                    _iterator14["return"]();
                  }
                } finally {
                  if (_didIteratorError14) {
                    throw _iteratorError14;
                  }
                }
              }

              if (scope != 100) {
                _this9.$message({
                  // showClose: true,
                  message: '保费计算分入比例相加必须为100并且不能为空',
                  type: 'warn'
                });

                return;
              }
            } // 分出这块 需要把再保人需要的一些字段赋值给分出结构
            // 首先早出出数据结构
            // 获取再保人信息数组 如果没有再保人


            if (that.fromData.guPolicyRiVoList.length > 0) {
              for (var _i2 = 0; _i2 < that.fromData.guPolicyRiVoList.length; _i2++) {
                var obj = {
                  riskCode: "",
                  // 自保险种	riskCode
                  currency: "",
                  // 币种	currency
                  totalDue: 0,
                  // 保费变化量	totalDue
                  totalPremium: 0,
                  // 自保总保费	totalPremium
                  totalAmount: "",
                  // 自保总保额	totalAmount
                  reinsurer: "",
                  // 再保人	reinsurer
                  reinsurerCode: "",
                  // 再保人代码	reinsurerCode
                  payeeCode: "",
                  // 收付款人代码	payeeCode
                  payee: "",
                  // 收付款人名称	payee
                  layer: "",
                  // 层	layer
                  mws: 0,
                  // 检验费	mws
                  displayNo: "",
                  // 显示序号	displayNo
                  count: "",
                  // 期数	count
                  riShare: 0,
                  // 分出比例 后台单独加的 api上没有
                  guInstallmentDetailVoList: [{
                    accountNo: "",
                    // 账单接收人号码	accountNo
                    feeType: "",
                    // 费用类型代码	feeType
                    feeSeqNo: 0,
                    // 费用序号	feeSeqNo
                    installmentNo: 0,
                    // 期次	installmentNo
                    dueDate: "",
                    // 截止日期	dueDate
                    installmentRate: 0,
                    // 分期比例	installmentRate
                    currency: "",
                    // 币别	currency
                    premium: 0,
                    // 金额	premium
                    billNo: "",
                    // 票据号	billNo
                    riShare: "" // 转分出比例

                  }]
                }; // obj.riskCode = that.fromData.guPolicyRiVoList[i].riskCode

                obj.reinsurer = that.fromData.guPolicyRiVoList[_i2].reinsurer;
                obj.reinsurerCode = that.fromData.guPolicyRiVoList[_i2].reinsurerCode; // obj.currency = that.fromData.guPolicyRiVoList[i].currency
                // obj.totalDue = that.fromData.guPolicyRiVoList[i].totalDue
                // obj.totalPremium = that.fromData.guPolicyRiVoList[i].totalPremium

                obj.riShare = that.fromData.guPolicyRiVoList[_i2].selfInsuranceRate;
                params.guInstallmentForPolicyVo.guInstallmentRoVoList.push(obj);
              }
            } else {
              _this9.$message({
                showClose: true,
                message: "再保人数据不能为空",
                type: "warn"
              });

              return;
            }

            var url = Vue.gvUtil.getUrl({
              apiName: "calculateInstalment",
              contextName: "selfins"
            });
            Vue.gvUtil.http.post(url, params).then(function (res) {
              console.log("res", res.resData);

              if (res.resCode == "0017") {
                _this9.$message({
                  showClose: true,
                  message: res.resData,
                  type: "warn"
                });

                return;
              } // 分入


              that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guInstallmentRiVo;
              console.log("类型", _typeof(res.resData.guInstallmentRiVo.totalAmount)); // 分出

              that.fqPayee.guInstallmentRoVoList = res.resData.guInstallmentRoVoList;
            });
          }
        });
      },
      // 分期详情按钮
      goDetail: function goDetail(data) {
        this.dialogTableVisible2 = true;
        console.log("预览内容", data);
        this.textContent = data.clauseContent;
      },
      // 所有校验是否通过 保存
      validatebase: function validatebase() {
        var postV = false;
        var valid1 = false;
        valid2 = false;
        valid3 = false;
        valid4 = false;
        valid5 = false;
        this.$refs.baseInfo.validate(function (valid) {
          console.log("基本信息", valid);

          if (valid) {
            valid1 = true;
          } else {
            return false;
          }
        });
        this.$refs.from.validate(function (valid) {
          console.log("再保人数据", valid);

          if (valid) {
            valid2 = true;
          } else {
            return false;
          }
        });
        this.$refs.underfrom.validate(function (valid) {
          console.log("标的详情", valid);

          if (valid) {
            valid3 = true;
          } else {
            return false;
          }
        }); // this.$refs.fqfrom.validate((valid) => {
        //   console.log("分期分入数据", valid);
        //   if (valid) {
        //     valid4 = true;
        //   } else {
        //     return false;
        //   }
        // });
        // this.$refs.ayee.validate((valid) => {
        //   console.log("分期分出数据", valid);
        //   if (valid) {
        //     valid5 = true;
        //   } else {
        //     return false;
        //   }
        // });
        // && valid4 && valid5

        if (valid1 && valid2 && valid3) {
          postV = true;
          this.$emit("vaild-event", postV);
        } else {
          postV = false;
          this.$emit("vaild-event", postV);
          this.$message({
            showClose: true,
            message: "请完善信息",
            type: "warning"
          });
        }

        console.log("postV", postV);
      },
      // 所有校验是否通过 提交
      validatebase2: function validatebase2() {
        var postV = false;
        var valid1 = false;
        valid2 = false;
        valid3 = false;
        valid4 = false;
        valid5 = false;
        this.$refs.baseInfo.validate(function (valid) {
          console.log("基本信息", valid);

          if (valid) {
            valid1 = true;
          } else {
            return false;
          }
        });
        this.$refs.from.validate(function (valid) {
          console.log("再保人数据", valid);

          if (valid) {
            valid2 = true;
          } else {
            return false;
          }
        });
        this.$refs.underfrom.validate(function (valid) {
          console.log("标的详情", valid);

          if (valid) {
            valid3 = true;
          } else {
            return false;
          }
        }); // this.$refs.fqfrom.validate((valid) => {
        //   console.log("分期分入数据", valid);
        //   if (valid) {
        //     valid4 = true;
        //   } else {
        //     return false;
        //   }
        // });
        // this.$refs.ayee.validate((valid) => {
        //   console.log("分期分出数据", valid);
        //   if (valid) {
        //     valid5 = true;
        //   } else {
        //     return false;
        //   }
        // });
        // && valid4 && valid5

        if (valid1 && valid2 && valid3) {
          postV = true;
          this.$emit("vaild-event2", postV);
        } else {
          postV = false;
          this.$emit("vaild-event2", postV);
          this.$message({
            showClose: true,
            message: "请完善信息",
            type: "warning"
          });
        }

        console.log("postV", postV);
      },
      Submitss: function Submitss() {
        //提交后全部只读
        this.Submit = true;
        this.Renewal = false;
      },
      // changexiangq(row, expand) {  //展开事件--动态获取内嵌表数据
      //   //该处是用于判断展开还是收起，只有展开的时候请求
      //   //展开时expand有值，收起时为空
      //   console.log(row)
      //   console.log(expand)
      // },
      // 选择保险险种-自保险种
      // 货币选择
      changeschemeName2: function changeschemeName2(e) {
        console.log("看看");
      },
      // 货币选择
      changeschemeName3: function changeschemeName3(e) {
        console.log("看看"); // 获取兑换率 cedingCurrency

        var that = this;
        var params = {
          baseCurrency: that.baseInfo.currency,
          exchCurrency: that.baseInfo.cedingCurrency
        };
        var url = Vue.gvUtil.getUrl({
          apiName: "findExchange",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode == "0000") {
            console.log("获得兑换率", res.resData); // 这是个数组

            that.baseInfo.exchangeRate = res.resData.exchangeRate; // Vue.gvUtil.initTranslation("Currency");
          }
        });
      }
    },
    events: {
      //分期信息弹框
      stagingInformationList: function stagingInformationList(scopeRow, $index) {
        this.guInstallmentDetailVoListindex = $index;
        this.fqPayee.guInstallmentDetailVoList = scopeRow.guInstallmentDetailVoList;
        this.stagingInformationVisible = true;
      },
      //保存分期弹框
      savePeriodizationOut: function savePeriodizationOut() {
        var _this10 = this;

        //校验
        this.$refs.fqfrom.validate(function (valid) {
          if (valid) {
            _this10.fqPayee.guInstallmentRoVoList[_this10.guInstallmentDetailVoListindex].fqPayee.guInstallmentDetailVoList = _this10.fqPayee.guInstallmentDetailVoList;
            _this10.stagingInformationVisible = false;
          }
        });
      },
      //为表格表头添加星号样式
      must: function must(obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      must1: function must1(obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2 || obj.columnIndex == 3) {
          return "must";
        }
      },
      must2: function must2(obj) {// if (obj.columnIndex == 3) {
        //   return "must";
        // }
      }
    },
    computed: {// StreamTypeOptions() {
      //   return this.$store.state.publicClock.StreamType;
      // },
      // ResumeRemarkOptions() {
      //   return this.$store.state.publicClock.ResumeRemark;
      // },
    }
  });
});