"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var _api, _methods;

  var config = {
    api: (_api = {
      findpolicyselfmain: "/policySelfMain/findPolicySelf",
      //保批单查询
      historyEndor2: '/endorSelfMain/historyEndor',
      // 历次批单
      findUserList: '/policySelfMain/findUserList',
      // 经办人 承包人
      getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo",
      //保单详情接口
      policySelfMainpagetWorkNext: "/policySelfMain/getWorkNext",
      //工作流弹框
      // 回显数据
      add: '/policySelfMain/add',
      // 保存接口
      submit: '/policySelfMain/submit',
      // 提交接口
      calculateItems: '/policySelfMain/calculateItems',
      // 标的重新计算
      calculateInstalment: '/guinstallmain/calculateInstalment',
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
      exportItemExcel: '/policyItemMain/exportItemExcel',
      // excel导出
      importItemExcel: '/policyItemMain/importItemExcel',
      // excel导入
      importClauseExcel: '/guPolicyClause/importClauseExcel',
      // 条款导入
      findDetail: '/ggRisk/findDetail',
      // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
      findExchange: '/ggCode/findExchangeRate',
      // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
      findReinsurerList: '/policySelfMain/findReinsurerList'
    }, _defineProperty(_api, "findUserList", '/policySelfMain/findUserList'), _defineProperty(_api, "getPolicyFeeInfo", "/policySelfMain/getPolicyFeeInfo"), _defineProperty(_api, "UserInfo", '/User/UserInfo'), _defineProperty(_api, "verify", '/policySelfMain/verify'), _defineProperty(_api, "getList", "/document/getList"), _defineProperty(_api, "printPDF", '/PDF/printPDF'), _defineProperty(_api, "sendEmail", '/PDF/sendEmail'), _defineProperty(_api, "findPreviousPolicyNo", '/policySelfMain/findPreviousPolicyNo'), _defineProperty(_api, "findNewPolicyAllInfo", '/policySelfMain/findNewPolicyAllInfo'), _defineProperty(_api, "historyEndor", '/policySelfMain/historyEndor'), _defineProperty(_api, "historyEndor2", '/endorSelfMain/historyEndor'), _defineProperty(_api, "checkOriginalPolicyWriteOff", '/endorSelfMain/checkOriginalPolicyWriteOff'), _api)
  };
  Vue.gvUtil.setApi(config.api);

  var expenseDetail = require("../expenseApp/index");

  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "inquiryApp",
    components: {
      expenseDetail: expenseDetail
    },
    datas: function datas() {
      var _underlyingRules, _ref;

      // 双向绑定页面显示数据
      return _ref = {
        // by王松
        islock: false,
        // 保单号不可修改
        policyNo: '',
        // 保单号
        policyNo3: '',
        // 保单号
        // by王松
        projectVisible: false,
        //自保弹框
        check: true,
        //保存按钮是否可见
        disabled: false,
        //只读模式
        isEdit: "新增",
        //编辑新增
        rules: {//校验
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
          remark: ""
        },
        dialogFormVisible: false,
        //详情页面
        table: {
          basic: {
            api: "findpolicyselfmain",
            //分页列表请求api
            vo: "businessList",
            //分页列表返回的vo
            context: "selfins",
            //分页列表请求上下文
            singleElection: false,
            //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true,
            //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"]
            } //导出按钮控制，不需要可以删除此属性

          },
          search: _defineProperty({
            //查询域元数据
            policyNo: "",
            versionNo: "",
            cedingPolicyNo: "",
            renewalSign: "",
            projectName: "",
            riskCode: "",
            cedingCompanyCode: '',
            effectiveDateStart: "",
            effectiveDateEnd: "",
            expiryDateStart: "",
            expiryDateEnd: "",
            underWritingYear: "",
            handle: "",
            policyStatus: ""
          }, "versionNo", '000'),
          fields: [// 1 自保保单号
          {
            labelKey: "selfinsurancepolicyno",
            btns: [{
              prop: "policyNoAndVersionNo",
              flag: "policyNoAndVersionNo",
              type: "a"
            }],
            width: "100px",
            showTip: true
          }, // 2 自保险种
          {
            labelKey: "selfInsurance",
            prop: "riskCode",
            format: {
              type: "ggcode",
              codeType: "RiskType"
            },
            width: "85px"
          }, // 3 项目打印名称
          {
            labelKey: "projectPrintName",
            prop: "projectName",
            width: "110px"
          }, // 4 保险起期
          {
            labelKey: "startingDateInsurance",
            prop: "effectiveDate",
            width: "85px",
            showTip: true
          }, // 5 保险止期
          {
            labelKey: "PeriodTo",
            prop: "expiryDate",
            width: "85px",
            showTip: true
          }, // 6 原保险人 = 原保险公司缩写
          {
            labelKey: "originalInsurer",
            prop: "supplierShortName",
            width: "100px"
          }, // 7 币种  本单币别
          {
            labelKey: "本单币别",
            prop: "currency",
            format: {
              type: "ggcode",
              codeType: "Currency"
            },
            width: "85px"
          }, // 8 分入保费
          {
            labelKey: "分入保费",
            prop: "totalPremium",
            width: "85px"
          }, // 9 再保险人 ？？？
          {
            labelKey: "再保险人",
            prop: "reinsList",
            width: "85px",
            showTip: true
          }, // 10 分出保费
          {
            labelKey: "分出保费",
            prop: "totalDue",
            width: "85px"
          }, //  11 原被保险人
          {
            labelKey: "原被保险人",
            prop: "insured",
            width: "100px"
          }, //  12 录入保单时间
          {
            labelKey: "录入保单时间",
            prop: "createdDate",
            width: "110px"
          }, //  13 录单人
          {
            labelKey: "录单人",
            prop: "createdBy",
            width: "85px"
          }, //  14 保单状态
          {
            labelKey: "policyStatus",
            prop: "policyStatus",
            format: {
              type: "ggcode",
              codeType: "PolicyStatus"
            },
            width: "100px"
          }, {
            //配置最后列按钮
            prop: "operation",
            labelKey: "operation",
            btns: [{
              btnKey: "taskList",
              //任务列表
              flag: "operation",
              type: "btn"
            }]
          }]
        },
        Underwriter1: [],
        Underwriter: [],
        tableData1: [],
        pageSize1: 2,
        // 每页数量
        // pageNo2:1,
        pageNo1: 0,
        //当前页数
        pageaA: 0,
        //总页数
        total1: 0,
        // 总条数
        licipidan: false,
        // 打开弹窗
        licipidan2: false,
        licipidan3: false,
        workflowdialog: false,
        //工作流弹框
        taskObj: {},
        gwNextNodeExecutorsList: []
      }, _defineProperty(_ref, "check", ''), _defineProperty(_ref, "checkboxGroup", []), _defineProperty(_ref, "IsfiveExport", false), _defineProperty(_ref, "InstallmentData", [{}]), _defineProperty(_ref, "ReinsuranceForm", [{}]), _defineProperty(_ref, "Renewal", false), _defineProperty(_ref, "checked", false), _defineProperty(_ref, "Clausesdata", []), _defineProperty(_ref, "CedingPolicy", true), _defineProperty(_ref, "text", false), _defineProperty(_ref, "policyNo33", ''), _defineProperty(_ref, "ReinsuranceTableVisible", false), _defineProperty(_ref, "emailTableVisible", false), _defineProperty(_ref, "multipleSelection", []), _defineProperty(_ref, "Subjectmatter", []), _defineProperty(_ref, "node", []), _defineProperty(_ref, "emailForm", {
        To: [],
        // 收件人
        Title: '',
        // 主题
        content: '' // 内容

      }), _defineProperty(_ref, "options", []), _defineProperty(_ref, "editEmailDialog", false), _defineProperty(_ref, "editEmails", []), _defineProperty(_ref, "tableData", [{}]), _defineProperty(_ref, "activeNames", ["1"]), _defineProperty(_ref, "schemeName", []), _defineProperty(_ref, "continueSignOptions", []), _defineProperty(_ref, "schemeDate", []), _defineProperty(_ref, "riskCode", "OOPD"), _defineProperty(_ref, "isEventChange", false), _defineProperty(_ref, "PDFList", []), _defineProperty(_ref, "dialogTableVisible", false), _defineProperty(_ref, "dialogTableVisible2", false), _defineProperty(_ref, "licipidan", false), _defineProperty(_ref, "textContent", ''), _defineProperty(_ref, "printTableVisible", false), _defineProperty(_ref, "Submit", false), _defineProperty(_ref, "isReadonly", false), _defineProperty(_ref, "stateWord", ''), _defineProperty(_ref, "premiumList", []), _defineProperty(_ref, "Underwriter", []), _defineProperty(_ref, "Underwriter1", []), _defineProperty(_ref, "Underwriter2", []), _defineProperty(_ref, "previousPolicyNoList", []), _defineProperty(_ref, "emailrules", {
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
        content: [{
          required: true,
          message: Vue.filter("translate")("cantEmpty"),
          trigger: "blur"
        }]
      }), _defineProperty(_ref, "attachments", []), _defineProperty(_ref, "attachments2", []), _defineProperty(_ref, "insertkeys", []), _defineProperty(_ref, "value", ''), _defineProperty(_ref, "printsdata", []), _defineProperty(_ref, "tableData1", []), _defineProperty(_ref, "pageSize1", 2), _defineProperty(_ref, "pageNo1", 0), _defineProperty(_ref, "pageaA", 0), _defineProperty(_ref, "total1", 0), _defineProperty(_ref, "baseInfo", {
        cancelIndicate: '',
        // 隐藏新增
        policyMainId: '',
        // 隐藏新增
        cedingPolicyNo: '',
        // 隐藏新增
        policyId: '',
        // 隐藏新增
        proposalNo: "",
        // 自保投保单号
        policyNo: "",
        // 自保保单号
        renewalSign: "02",
        // 新保||续保
        previousPolicyNo: "",
        // 上年保单号
        renewalPolicyNo: "",
        // 续保保单号
        riskCode: "",
        // 自保险种
        upstreamSign: '',
        // 上游下游
        riInward: '001',
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
        projectName: '',
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
        currency: '002',
        // 本单币别 根据险种
        exchangeRate: '',
        // 兑换率
        vatRate: 6,
        // 增值税税率
        vatSurchargeRate: 12,
        // 增值税附加税率
        commissionRate: 6,
        // 佣金率
        cedingCurrency: '',
        // 原币单位 校验四兄弟  ？？？
        cedingCompany: "",
        // 原保险人 校验四兄弟
        programmeCode: '',
        //方案code 新增 校验四兄弟
        projectCode: '',
        // 项目code 新能 校验四兄弟
        totalPremium: '',
        // 标的计算返回的值 自保保单总保费
        insuredValue: '',
        // 标的计算返回的值 自保总保额
        totalDue: '',
        // 标的计算返回的值 自保总分入净保费
        totalDueRi: '',
        // 标的计算返回的值 自保总分出净保费
        versionNo: '',
        // 版本号
        baseInfoRule: {
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
      }), _defineProperty(_ref, "reinsurerCode", ''), _defineProperty(_ref, "reinsurer", ''), _defineProperty(_ref, "objFromSelectpolicyApp2", {}), _defineProperty(_ref, "guPolicyVoList", []), _defineProperty(_ref, "underlying", {
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
          totalDue: '',
          // 保费变化量
          totalPremium: '',
          // 自保总保费
          totalAmount: '',
          // 自保总保额
          displayNo: '',
          // 显示序号
          count: '',
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
        approvedRemark: "同意"
      }), _defineProperty(_ref, "rules", {
        approvedRemark: [{
          required: true,
          message: "不能为空",
          trigger: "blur"
        }]
      }), _defineProperty(_ref, "isOK", null), _ref;
    },
    created: function created() {
      Vue.gvUtil.initTranslation("supplierCode,Currency");
      var that = this;
      var url2 = Vue.gvUtil.getUrl({
        apiName: "findUserList",
        contextName: "selfins"
      });
      Vue.gvUtil.http.get(url2).then(function (res) {
        if (res.resCode == '0000') {
          console.log("经办人 承包人", res.resData); // 这是个数组
          // 假设没有李建辉

          var isLee = false;
          var arr = res.resData;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              // 如果有
              if (item["default"] == '1') {
                var arr2 = res.resData.filter(function (item2) {
                  return item2["default"] == '0';
                });
                arr2.unshift(item);
                that.Underwriter1 = arr2;
                that.Underwriter = arr2;
                console.log('arr2', arr2); // // 经办人
                // that.baseInfo.handle = arr2[0].userName
                // that.baseInfo.handleCode = arr2[0].userCode
                // 承包人
                // that.baseInfo.underWriter = arr2[0].userName
                // that.baseInfo.underwriterCode = arr2[0].userCode

                isLee = true;
              }
            } // 如果没有李建辉

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

          if (!isLee) {
            that.Underwriter1 = res.resData;
            that.Underwriter = res.resData;
          } // that.baseInfo.exchangeRate = res.resData.exchangeRate
          // Vue.gvUtil.initTranslation("Currency");

        }
      }); // by王松

      console.log('审核人员选中返回来的数据', this.$route.query);
      this.policyNo = this.$route.query.policyNo;
      this.islock = this.$route.query.islock;
      this.table.search.policyNo = this.policyNo; // by王松

      if (this.$route.query.islock) {
        this.table.search.versionNo = '';
      }
    },
    mounted: function mounted() {
      console.log('自保保单号', this.$route.query.content);
      this.table.search.policyNo = this.$route.query.content;
    },
    events: {
      initPage: function initPage() {
        Vue.gvUtil.initTranslation("supplierCode,Currency");
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
      must2: function must2(obj) {
        if (obj.columnIndex == 3) {
          return "must";
        }
      }
    },
    methods: (_methods = {
      handle2: function handle2(val) {// console.log('经办人', val)
        // let code = val.split('-')
        // console.log(code[1])
        // this.baseInfo.handleCode = code[1]
      },
      Claimsettlingnew: function Claimsettlingnew() {
        var a = this.$refs.table.getSelectData();

        if (a && a.length == 1 && a[0].policyStatus == "01") {
          Vue.gvUtil.redirectTo({
            name: "settlingNewApp",
            query: {
              inqurow: a[0]
            }
          });
        } else {
          Vue.gvUtil.message("请选择一条审核通过的数据");
        }
      },
      // 查看
      onListBtn: function onListBtn(row, type) {
        if (type == "operation") {
          Vue.gvUtil.showTrail({
            innerRefNo: row //内部参考号

          });
        } else {
          console.log("row", row);
          this.licipidan2 = true; //  弹窗

          this.createdFunc();
          var proposalNo = row.proposalNo;
          var versionNo = row.versionNo;
          var policyNo = row.policyNo;
          var policyMainId = row.policyMainId;
          this.status2 = 'Look';
          this.getPolicyFeeInfo3(proposalNo, versionNo, 'Look', policyNo, policyMainId);
        }
      },
      createdFunc: function createdFunc() {
        // 调用接口原币
        var that = this;
        Vue.gvUtil.initTranslation("Currency");
        Vue.gvUtil.initTranslation("ShareType"); // 获取上年保单号

        var url44 = Vue.gvUtil.getUrl({
          apiName: "findPreviousPolicyNo",
          contextName: "selfins"
        });
        Vue.gvUtil.http.get(url44).then(function (res) {
          if (res.resCode == '0000') {
            console.log("上年保单号", res); // 这是个数组

            that.previousPolicyNoList = res.resData;
          }
        }); // 获取再保人数据

        var url = Vue.gvUtil.getUrl({
          apiName: "findReinsurerList",
          contextName: "selfins"
        });
        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode == '0000') {
            console.log("再保人", res.resData); // 这是个数组

            that.Underwriter2 = res.resData;
          }
        }); // 获取经办人 承包人数据

        var url22 = Vue.gvUtil.getUrl({
          apiName: "findUserList",
          contextName: "selfins"
        });
        Vue.gvUtil.http.get(url22).then(function (res) {
          if (res.resCode == '0000') {
            console.log("经办人 承包人", res.resData); // 这是个数组
            // 假设没有李建辉

            var isLee = false;
            var arr = res.resData;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                // 如果有
                if (item["default"] == '1') {
                  var arr2 = res.resData.filter(function (item2) {
                    return item2["default"] == '0';
                  });
                  arr2.unshift(item);
                  that.Underwriter1 = arr2;
                  that.Underwriter = arr2;
                  console.log('arr2', arr2); // // 经办人
                  // that.baseInfo.handle = arr2[0].userName
                  // that.baseInfo.handleCode = arr2[0].userCode
                  // 承包人

                  that.baseInfo.underWriter = arr2[0].userName;
                  that.baseInfo.underwriterCode = arr2[0].userCode;
                  isLee = true;
                }
              } // 如果没有李建辉

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

            if (!isLee) {
              that.Underwriter1 = res.resData;
              that.Underwriter = res.resData;
            } // that.baseInfo.exchangeRate = res.resData.exchangeRate
            // Vue.gvUtil.initTranslation("Currency");

          }
        }); // 获取经办人的默认值

        var url33 = Vue.gvUtil.getUrl({
          apiName: "UserInfo",
          contextName: "selfins"
        });
        var params = {};
        Vue.gvUtil.http.post(url33, params).then(function (res) {
          if (res.resCode == '0000') {
            console.log('经办人22222', res); // 经办人

            that.baseInfo.handle = res.resData.userName;
            that.baseInfo.handleCode = res.resData.userCode; // // 承包人
            // that.baseInfo.underWriter = res.resData.userName
            // that.baseInfo.underwriterCode = res.resData.userCode
          }
        });
      },
      //复制和批改按钮
      copy: function copy() {
        Vue.gvUtil.message("该功能正在建设中");
      },
      print: function print() {
        Vue.gvUtil.message("该功能正在建设中");
      },
      //费用录入
      detailsData: function detailsData() {
        var a = this.$refs.table.getSelectData();

        if (a && a.length == 1) {
          if (a[0].policyStatus == "01") {
            Vue.gvUtil.redirectTo({
              name: "feeinquiryApp",
              query: {
                policyno: a[0].policyNo
              }
            });
          } else {
            Vue.gvUtil.message("审核通过才能费用录入");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      //审核按钮
      audit: function audit() {
        var a = this.$refs.table.getSelectData();
        console.log("a", a);

        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].policyStatus == "09") {
            this.$router.push({
              name: "insureApp",
              query: {
                row: a,
                flag: "Approve"
              }
            });
          } else {
            Vue.gvUtil.message("该条数据不可审核");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      //冲销批改按钮
      copy2: function copy2() {
        var _this2 = this;

        var a = this.$refs.table.getSelectData();
        console.log("a", a);

        if (a && a.length == 1) {
          // 如果审核通过
          if (a[0].policyStatus == "01") {
            var url = Vue.gvUtil.getUrl({
              apiName: "checkOriginalPolicyWriteOff",
              contextName: "selfins"
            });
            params = {
              policyNo: a[0].policyNo
            };
            Vue.gvUtil.http.post(url, params).then(function (res) {
              if (res.resCode == '0000') {
                if (a[0].endorsementType == "01") {
                  a[0].endorsementType = "04";

                  _this2.$router.push({
                    name: "batchentryinfoApp",
                    query: {
                      row: a[0],
                      flag: "copy2"
                    }
                  });
                } else if (a[0].endorsementType == "05") {
                  a[0].endorsementType = "04";

                  _this2.$router.push({
                    name: "batchentryinfo5App",
                    query: {
                      row: a[0],
                      flag: "copy2"
                    }
                  });
                } else if (a[0].endorsementType == null) {
                  Vue.gvUtil.redirectTo({
                    name: "batchentryApp",
                    query: {
                      policyno: a[0].policyNo,
                      frombaochachongxiao: 'yes'
                    }
                  });
                }
              } else {
                _this2.$message({
                  showClose: true,
                  message: res.resMsg,
                  type: 'warn'
                });
              }
            }); //   // 版本号不能为000
            //   var disLength = a[0].policyNoAndVersionNo.length
            //   if (a[0].policyNoAndVersionNo.substring(disLength - 3, disLength) != '000') {
            //     //'09'表示待审核数据
            //     if (a[0].endorsementType == "01") {
            //       a[0].endorsementType = "04"
            //       this.$router.push({
            //         name: "batchentryinfoApp",
            //         query: {
            //           row: a[0],
            //           flag: "copy2",
            //         },
            //       });
            //     } else if (a[0].endorsementType == "05") {
            //       a[0].endorsementType = "04"
            //       this.$router.push({
            //         name: "batchentryinfo5App",
            //         query: {
            //           row: a[0],
            //           flag: "copy2",
            //         },
            //       });
            //     } else {
            //       Vue.gvUtil.message('当前被选择的自保批单的批改类型为文批，不可进行冲销批改')
            //     }
            //   } else {
            //     Vue.gvUtil.message("版本号为000不可批改");
            //   }
          } else {
            Vue.gvUtil.message("审核通过才能批改");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 修改按钮
      modify: function modify() {
        var a = this.$refs.table.getSelectData(); // console.log("a", a);

        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].policyStatus == "09" || a[0].policyStatus == "01") {
            Vue.gvUtil.message("该条数据不可修改");
          } else {
            this.$router.push({
              name: "insureApp",
              query: {
                row: a,
                flag: "modify"
              }
            });
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 批改录入
      detailsData2: function detailsData2() {
        var a = this.$refs.table.getSelectData();
        this.isOK = a[0].isEndorsement;

        if (a && a.length == 1) {
          // 是否可以批单录入(00为可以，01为不能)
          if (a[0].isEndorsement == "00") {
            Vue.gvUtil.redirectTo({
              name: "batchentryApp",
              query: {
                policyno: a[0].policyNo,
                frombaocha: 'yes'
              }
            });
          } else {
            Vue.gvUtil.message("该保单存在未审核通过批单");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 批改录入 from 历次批单
      detailsData3: function detailsData3(_detailsData) {
        console.log('detailsData3.row', _detailsData.row);
        console.log('this.isOK ', this.isOK);

        if (this.isOK == '00') {
          Vue.gvUtil.redirectTo({
            name: "batchentryApp",
            query: {
              policyno: _detailsData.row.policyNo,
              frombaocha: 'yes'
            }
          });
        } else {
          Vue.gvUtil.message("该保单存在未审核通过批单");
        }
      },
      // 历次批单打开弹窗
      removeMulti2: function removeMulti2() {
        var a = this.$refs.table.getSelectData();
        this.isOK = a[0].isEndorsement;

        if (a && a.length == 1) {
          console.log('(a[0]', a[0]);
          this.pageSize1 = 2;
          this.pageNo1 = 0;
          this.licipidan = true;
          this.policyNo3 = a[0].policyNo;
          var policyNo = a[0].policyNo;
          this.queryTable11(policyNo);
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 分入分页查询
      queryTable11: function queryTable11(policyNo) {
        var that = this;
        var params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1,
          policyNo: this.policyNo3
        };
        var url = Vue.gvUtil.getUrl({
          apiName: "historyEndor2",
          contextName: "selfins"
        });
        console.log('url', url, this.pageNo1, this.pageSize1);
        url = url + "?&_pageSize=" + this.pageSize1 + '&_pageNo=' + this.pageNo1;
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = res.resData.businessList.content[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;
                item.effectiveDate = item.effectiveDate + '   ' + item.expiryDate;
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

            that.tableData1 = res.resData.businessList.content;
            that.pageaA = res.resData.businessList.totalPages;
            that.total1 = res.resData.businessList.total;
          } else {}
        });
      },
      handleSizeChanges1: function handleSizeChanges1(val) {
        this.pageSize1 = val;
        console.log(this.pageSize1);
      },
      handleCurrentChangePages1: function handleCurrentChangePages1(val) {
        console.log('val', val);
        this.pageaA = val;
        this.pageNo1 = val - 1;
        var policyNo = this.policyNo3;
        this.queryTable11(policyNo);
        console.log(this.pageaA);
      },
      handle: function handle(row, column, event, cell) {
        console.log('shuju', column.property, row); // row.policyNo

        if (column.property == 'policyNoAndVersionNo') {
          // 跳转看详情
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo7App',
            query: {
              pageType: "back",
              row: row
            }
          });
        }
      },
      // 查询页面原保单返回来的数据
      dataFromSelectpolicyApp: function dataFromSelectpolicyApp(obj) {
        var that = this;

        if (obj.guPolicyItemMainVoList) {
          console.log('原保单查询页面来的数据渲染', obj); // 0.拼接续保单号
          // let str = ''
          // for (let item of obj.guPolicyVoList) {
          //   if (item.renewalPolicyNo == '' || item.renewalPolicyNo == null) {
          //   } else if (str == '') {
          //     str = item.renewalPolicyNo
          //   } else {
          //     str = str + ',' + item.renewalPolicyNo
          //   }
          // }
          // if (that.baseInfo.renewalPolicyNo == '' || that.baseInfo.renewalPolicyNo == null) {
          //   that.baseInfo.renewalPolicyNo = str
          // } else {
          //   that.baseInfo.renewalPolicyNo = that.baseInfo.renewalPolicyNo + ',' + str
          // }
          // 1.渲染原保单 必有

          this.guPolicyVoList = this.guPolicyVoList.concat(obj.guPolicyVoList); // 2.渲染标的 必有 如果三个险种特殊 不显示

          if (that.baseInfo.riskCode != 'EAS' && that.baseInfo.riskCode != 'MAR' && that.baseInfo.riskCode != 'OOPU') {} else {
            this.underlying.guPolicyItemMainVoList = this.underlying.guPolicyItemMainVoList.concat(obj.guPolicyItemMainVoList);
          } // 三个险种的标的


          this.guPolicyItemMainVoListThree = this.underlying.guPolicyItemMainVoList;
          var arrr = [];

          if (obj.guPolicyItemMainVoList.length > 0) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = obj.guPolicyItemMainVoList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;
                arrr.push(item.premium);
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
          }

          this.premiumList = this.premiumList.concat(arrr);
          console.log('aeee', this.premiumList); // for(obj.)
          // 3.再保人 未必有

          var arr = [];
          arr = arr.concat(obj.guPolicyRiVoList);
          console.log('再保人', arr);
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

          this.baseInfo.commissionRate = obj.guPolicyVoList[0].commissionRate; //佣金率
          // 承保年度

          console.log('获取承包年度', obj.guPolicyVoList[0].periodStart);

          if (obj.guPolicyVoList[0].periodStart != null && obj.guPolicyVoList[0].periodStart != '') {
            var data = obj.guPolicyVoList[0].periodStart.slice(6, 10);
            console.log('获取承包年度', data);
            this.baseInfo.underWritingYear = data;
          }

          this.baseInfo.cedingProjectName = obj.guPolicyVoList[0].projectName; // 项目code 新能 校验四兄弟
          // 获取兑换率 cedingCurrency

          var _params = {
            baseCurrency: that.baseInfo.currency,
            exchCurrency: that.baseInfo.cedingCurrency
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findExchange",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, _params).then(function (res) {
            if (res.resCode == '0000') {
              console.log("获得兑换率", res.resData); // 这是个数组

              that.baseInfo.exchangeRate = res.resData.exchangeRate; // Vue.gvUtil.initTranslation("Currency");
            }
          });
        } else {
          console.log('一开是没有数据');
        }
      },
      onEditorChange: function onEditorChange(val) {
        this.emailForm.content = val.text;
        console.log('邮件内容', val, this.emailForm.content);
      },
      // 批改录入 from 历次批单
      detailsData33: function detailsData33(detailsData3) {
        // // debugger
        Vue.gvUtil.redirectTo({
          name: "batchentryApp",
          query: {
            policyno: detailsData3.row.policyNo,
            frombaocha: 'yes'
          }
        });
      },
      removeMulti: function removeMulti() {
        this.licipidan = true;
        this.queryTable1();
      },
      // 分入分页查询-历次批单
      queryTable1: function queryTable1() {
        var that = this;
        var params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1,
          policyNo: this.policyNo33 // inwardInd: 'I'

        }; //   url = Vue.gvUtil.getUrl({
        //     apiName: 'specialAuditLogFindByBusinessNo',
        //     contextName: 'auth',
        //     urlParams: {business_no: this.businessNo},
        //     serachParms: {pageSize: params._pageSize, pageNo: params._pageNo}
        // });

        var url = Vue.gvUtil.getUrl({
          apiName: "historyEndor2",
          contextName: "selfins"
        });
        console.log('url', url, this.pageNo1, this.pageSize1); // selfins/uprRi/findUprRi
        // http://114.251.151.247:8805/selfins/uprMain/findUpr?&_pageSize=10&_pageNo=0

        url = url + "?&_pageSize=" + this.pageSize1 + '&_pageNo=' + (this.pageNo1 - 1);
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("历次批单", res);

          if (res.resCode == "0000") {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = res.resData.businessList.content[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var item = _step5.value;
                item.effectiveDate = item.effectiveDate + '   ' + item.expiryDate;
              }
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

            that.tableData1 = res.resData.businessList.content;
            that.pageaA = res.resData.businessList.totalPages;
            that.total1 = res.resData.businessList.total;
          } else {}
        });
      }
    }, _defineProperty(_methods, "handleSizeChanges1", function handleSizeChanges1(val) {
      this.pageSize1 = val;
      console.log(this.pageSize1);
      this.queryTable11(); // this.xxx();
    }), _defineProperty(_methods, "handleCurrentChangePages11", function handleCurrentChangePages11(val) {
      this.pageaA = val;
      this.queryTable1();
      console.log(this.pageaA);
    }), _defineProperty(_methods, "getxubodanhao", function getxubodanhao() {
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
        console.log('续保单号', res); // if (res.resCode == '0000') {
        //   that.printsdata = res.resData.ggDocumentList
        // }
      });
    }), _defineProperty(_methods, "printTableVisible2", function printTableVisible2() {
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
          console.log('RES', res);

          if (res.resCode == '0000') {
            that.printsdata = res.resData.ggDocumentList;
          }
        });
      } else {
        this.$message.success('请选择险种');
      }
    }), _defineProperty(_methods, "getPDFData", function getPDFData(list) {
      console.log('打印list', list);
      this.PDFList = list;
    }), _defineProperty(_methods, "downloadFDF", function downloadFDF() {
      var that = this;
      var pdf = this.PDFList;

      if (pdf.length < 1) {
        Vue.gvUtil.message("请至少选择一个");
        return;
      } // that.baseInfo.proposalNo = 'ZBTBOOPD2020000046'


      if (that.baseInfo.proposalNo == '' || that.baseInfo.proposalNo == null) {
           this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_missingNumber"), //缺少投保单号
            type: "warning", // success
          });
        return;
      }

      console.log('用户选中的pdf 的 list', pdf);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = pdf[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var obj = _step6.value;
          var _params2 = {
            proposalNo: that.baseInfo.proposalNo,
            policyNo: that.baseInfo.proposalNo,
            versionNo: "000",
            // templateName: pdf[0].templateName
            templateName: obj.templateName,
            isEmail: false
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "printPDF",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, _params2, {
            responseType: "blob"
          }).then(function (res) {
            // if (res.resCode == '0000') {
            // alert('打印成功')
            // console.log(res)
            var str = pdf[0].documentType + '.pdf';
            Vue.gvUtil.resolveBlob(res, str); // }
          });
        }
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
    }), _defineProperty(_methods, "emailTableVisible2", function emailTableVisible2() {
      var that = this;
      var pdf = this.PDFList;

      if (pdf.length < 1) {
        Vue.gvUtil.message("请至少选择一个");
        return;
      } // that.baseInfo.proposalNo = 'ZBTBOOPD2020000046'


      if (that.baseInfo.proposalNo == '' || that.baseInfo.proposalNo == null) {
           this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_missingNumber"), //缺少投保单号
            type: "warning", // success
          });
        return;
      }

      this.emailTableVisible = true;
      console.log('用户选中的pdf 的 list', pdf);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = pdf[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var obj = _step7.value;
          var _params3 = {
            proposalNo: that.baseInfo.proposalNo,
            versionNo: "000",
            // templateName: pdf[0].templateName
            templateName: obj.templateName,
            isEmail: true
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "printPDF",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, _params3).then(function (res) {
            if (res.resCode == '0000') {
              that.attachments.push(res.resData);
              console.log('that.attachments', that.attachments);
            }
          });
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
    }), _defineProperty(_methods, "editEmail", function editEmail() {
      var _this3 = this;

      this.editEmails = [];
      this.emailForm.To.forEach(function (element) {
        _this3.options.forEach(function (item) {
          if (element == item.userName) {
            _this3.editEmails.push(item);
          }
        });
      });
      this.editEmailDialog = true;
    }), _defineProperty(_methods, "addEmail", function addEmail() {
      this.editEmails.push({
        userName: '',
        email: ''
      });
    }), _defineProperty(_methods, "deleteEmail", function deleteEmail(index) {
      this.editEmails.splice(index, 1);
    }), _defineProperty(_methods, "confirmEmail", function confirmEmail() {
      for (var i = 0; i < this.editEmails.length; i++) {
        if (this.editEmails[i].userName == '' || this.editEmails[i].email == '') {
          this.$message.error("请输入完整的用户名和邮箱");
          return;
        }
      }

      this.options = [];
      this.emailForm.To = [];

      for (var i = 0; i < this.editEmails.length; i++) {
        this.emailForm.To.push(this.editEmails[i].email);
        var obj = {};
        obj.userName = this.editEmails[i].userName;
        obj.email = this.editEmails[i].email;
        this.options.push(obj);
      }

      this.editEmailDialog = false;
    }), _defineProperty(_methods, "sendEmail", function sendEmail(formName) {
      var _this4 = this;

      // 邮箱内容不能为空
      var that = this;
      console.log('value', that.value);
      var params = {};
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          params.topic = that.emailForm.Title;
          params.emailAddress = that.emailForm.To;
          params.attachments = that.attachments;
          params.content = that.emailForm.content;
          var url = Vue.gvUtil.getUrl({
            apiName: "sendEmail",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, params).then(function (res) {
            if (res.resCode == '0000') {
              console.log('res', res);

              _this4.$message.success("操作成功");

              that.emailTableVisible = false;
              that.printTableVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }), _defineProperty(_methods, "stateFormat3", function stateFormat3(row, column) {
      if (row.isShare == '0') {
        return '否';
      } else {
        return '是';
      }
    }), _defineProperty(_methods, "selectChanged2", function selectChanged2(value, index) {
      console.log('index', index, value);
      console.log('index', this.fromData.guPolicyRiVoList);
    }), _defineProperty(_methods, "getData", function getData() {
      return this.auditInfo.approvedRemark;
    }), _defineProperty(_methods, "getValidate", function getValidate() {
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
    }), _defineProperty(_methods, "confirmExecotor", function confirmExecotor() {
      if (this.checkboxGroup.length > 0) {
        //如果是审核通过或者不通过
        // if (this.check == "01" || this.check == "06") {
        //   if (this.check == "01") {
        this.goAudit22(); // } else if (this.check == "06") {
        //   var url = Vue.gvUtil.getUrl({
        //     apiName: "notVerifyGcClaimMainSelf",
        //     contextName: "selfins",
        //   });
        // }
        // // ggApproveHistoryVo为审核意见obj
        // var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        // this.Apppassretrun.nextUserCode = s;
        // this.Apppassretrun.ggApproveHistoryVo = {};
        // this.Apppassretrun.gwWorkTask = this.taskObj; //工作流对象
        // this.Apppassretrun.ggApproveHistoryVo.opinions = this.$refs.auditInfo.getData();
        // Vue.gvUtil.http.post(url, this.Apppassretrun).then((res) => {
        //   if (res.resCode == "0000") {
        //     this.$message.success("操作成功");
        //     this.$router.push({
        //       name: "workbenchApp",
        //     }); //跳转到工作台
        //   }
        // });
        //提交接口
      } else {
        this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne"), // 至少选择一个操作人
            type: "warning", // success
          });
      }
    }), _defineProperty(_methods, "WorkingNext", function WorkingNext() {
      var _this5 = this;

      var that = this;
      this.$refs.auditInfo.validate(function (valid) {
        if (valid) {
          var url = Vue.gvUtil.getUrl({
            apiName: "policySelfMainpagetWorkNext",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, that.taskObj).then(function (res) {
            if (res.resCode === "0000") {
              if (res.resData.length != 0) {
                //工作流弹框
                that.workflowdialog = true;
                that.gwNextNodeExecutorsList = res.resData;
                _this5.check = '01';
              } // 如果为零 直接审核通过接口
              else if (res.resData.length == 0) {
                  that.goAudit('01');
                }
            }
          });
        }
      });
    }), _defineProperty(_methods, "goAudit22", function goAudit22() {
      var _this6 = this;

      var that = this;
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
        approveFlag: '01',
        opinions: that.auditInfo.approvedRemark
      }; // 增加审核人+工作流

      var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2

      params.gwWorkTask = that.taskObj; //工作流对象

      params.nextUserCode = s;
      console.log('触发审核接口', params);
      Vue.gvUtil.http.post(url, params).then(function (res) {
        console.log('结果', res);

        if (res.resCode == '0000') {
          _this6.$router.push({
            name: "workbenchApp"
          }); //跳转到工作台

        } else {
          Vue.gvUtil.message(res.resMsg);
        }
      });
    }), _defineProperty(_methods, "goAudit", function goAudit(code) {
      var _this7 = this;

      var that = this;
      var approveFlag = code; //  01 审核通过 06 审核不通过

      this.check = code;
      this.$refs.auditInfo.validate(function (valid) {
        if (valid) {
          var url = Vue.gvUtil.getUrl({
            apiName: "verify",
            contextName: "selfins"
          });
          var _params4 = {
            proposalNo: that.baseInfo.proposalNo,
            policyNo: that.baseInfo.policyNo,
            versionNo: that.baseInfo.versionNo,
            policyStatus: that.baseInfo.policyStatus,
            riskCode: that.baseInfo.riskCode,
            approveFlag: approveFlag,
            opinions: that.auditInfo.approvedRemark
          };

          var s = _this7.checkboxGroup.toString(); //将选中的值Tostring赋给param2


          _params4.gwWorkTask = that.taskObj; //工作流对象

          _params4.nextUserCode = s;
          console.log('触发审核接口', _params4);
          Vue.gvUtil.http.post(url, _params4).then(function (res) {
            console.log('结果', res);

            if (res.resCode == '0000') {
              _this7.$router.push({
                name: "workbenchApp"
              }); //跳转到工作台

            } else {
              Vue.gvUtil.message(res.resMsg);
            }
          });
        }
      });
    }), _defineProperty(_methods, "path", function path() {}), _defineProperty(_methods, "saveGetTwo", function saveGetTwo() {
      var that = this;
      var url3 = Vue.gvUtil.getUrl({
        apiName: "UserInfo",
        contextName: "selfins"
      });
      var params = {};
      Vue.gvUtil.http.post(url3, params).then(function (res) {
        if (res.resCode == '0000') {
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
    }), _defineProperty(_methods, "getPolicyFeeInfo", function getPolicyFeeInfo(proposalNo, versionNo, word, policyNo, policyMainId) {
      var _this8 = this;

      this.stateWord = word;
      var that = this;
      console.log('保单详情接口', proposalNo, versionNo, policyNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyNo: policyNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo; // 文档资料

          _this8.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params5 = {};
          Vue.gvUtil.http.post(url3, _params5).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "getPolicyFeeInfo11", function getPolicyFeeInfo11(proposalNo, versionNo, word, policyMainId) {
      var _this9 = this;

      var that = this;
      this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据

      this.stateWord = word;
      console.log('保单详情接口', proposalNo, versionNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo; // 文档资料

          _this9.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params6 = {};
          Vue.gvUtil.http.post(url3, _params6).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "getPolicyFeeInfo2", function getPolicyFeeInfo2(proposalNo, versionNo, word, policyNo, policyMainId) {
      var _this10 = this;

      this.stateWord = word;
      var that = this;
      console.log('保单详情接口', proposalNo, versionNo, policyNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyNo: policyNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo; // 文档资料

          _this10.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params7 = {};
          Vue.gvUtil.http.post(url3, _params7).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "getPolicyFeeInfo22", function getPolicyFeeInfo22(proposalNo, versionNo, word, policyMainId) {
      var _this11 = this;

      this.stateWord = word;
      var that = this;
      console.log('保单详情接口', proposalNo, versionNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo; // 文档资料

          _this11.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params8 = {};
          Vue.gvUtil.http.post(url3, _params8).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "getPolicyFeeInfo3", function getPolicyFeeInfo3(proposalNo, versionNo, word, policyNo, policyMainId) {
      var _this12 = this;

      this.stateWord = word;
      var that = this;
      this.policyNo33 = policyNo;
      console.log('保单详情接口', proposalNo, versionNo, policyNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyNo: policyNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo;

          _this12.$emit("cedingCompany", res.resData.guPolicyAllInfo.cedingCompany); // 文档资料


          _this12.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params9 = {};
          Vue.gvUtil.http.post(url3, _params9).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "getPolicyFeeInfo44", function getPolicyFeeInfo44(proposalNo, versionNo, word, policyMainId) {
      var _this13 = this;

      this.stateWord = word;
      var that = this;
      console.log('保单详情接口', proposalNo, versionNo); // 获取保单信息

      var url = Vue.gvUtil.getUrl({
        apiName: "getPolicyFeeInfo",
        contextName: "selfins"
      });
      var params = {
        proposalNo: proposalNo,
        versionNo: versionNo,
        policyMainId: policyMainId
      };
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          that.baseInfo = res.resData.guPolicyAllInfo; // 文档资料

          _this13.$emit('fromChild', res.resData.guPolicyAllInfo.ggDocumentList);

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
          var _params10 = {};
          Vue.gvUtil.http.post(url3, _params10).then(function (res) {
            if (res.resCode == '0000') {
              console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
              that.baseInfo.amendedBy = res.resData.userName;
            }
          });
        }
      });
    }), _defineProperty(_methods, "underWriter", function underWriter(val) {
      console.log('承报人', val);
      var code = val.split('-');
      console.log(code[1]);
      this.baseInfo.underwriterCode = code[1];
    }), _defineProperty(_methods, "givedata", function givedata(obj) {
      console.log('保存来的数据', obj); // this.baseInfo = obj

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
        console.log('提交的Submit', obj.Submit);
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
    }), _defineProperty(_methods, "redstar", function redstar(h, _ref2) {
      var column = _ref2.column;
      return [h('span', {
        style: 'color: red'
      }, '*'), h('span', ' ' + column.label)];
    }), _defineProperty(_methods, "addClauseVoList", function addClauseVoList() {
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
    }), _defineProperty(_methods, "addReinsuranceInfo", function addReinsuranceInfo() {
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
        // 再保方保单号
        reinsuranceDebitCreditNo: '' // 再保方账单号

      });
    }), _defineProperty(_methods, "ChooseCedingPolicy", function ChooseCedingPolicy() {
      if (this.baseInfo.riskCode == '') {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
        return;
      } // 险种是OOPD


      if (this.baseInfo.riskCode == 'OOPD') {
        // 1.打开弹窗 
        var isShow = true; // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code

        var vailfFourBrother = {};
        vailfFourBrother.currency = this.baseInfo.cedingCurrency;
        vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
        vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
        vailfFourBrother.projectCode = this.baseInfo.projectCode; // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息

        this.$emit('open-event', isShow, vailfFourBrother, this.baseInfo.riskCode, this.guPolicyVoList);
      } else {
        // // debugger
        // 1.打开弹窗 
        var _isShow = true; // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code

        var _vailfFourBrother = {};
        _vailfFourBrother.currency = this.baseInfo.cedingCurrency;
        _vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
        _vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
        _vailfFourBrother.projectCode = this.baseInfo.projectCode; // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息

        this.$emit('open-event', _isShow, _vailfFourBrother, this.baseInfo.riskCode, this.guPolicyVoList);
      }
    }), _defineProperty(_methods, "savePolicyClauseVoList", function savePolicyClauseVoList(formName) {
      var that = this; // 如果条款数据为空

      if (this.Clause.guPolicyClauseVoList.length == 0) {
        alert("数据不能为空");
        return;
      } // 先校验


      this.$refs[formName].validate(function (valid) {
        if (valid) {
          that.$message({
            showClose: true,
            message: '条款保存成功!',
            type: 'success'
          });
          that.dialogTableVisible = false;
        }
      });
    }), _defineProperty(_methods, "closedialog", function closedialog(formName) {
      // this.$refs[formName].resetFields();
      console.log('关闭条款弹窗');
      this.reinsurerCode = '';
      this.reinsurer = '';
    }), _defineProperty(_methods, "addPeriodizationIn", function addPeriodizationIn() {
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

      });
    }), _defineProperty(_methods, "addPeriodizationOut", function addPeriodizationOut(index) {
      console.log(index);

      if (!this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList) {
        this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList = [];
      }

      this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList.push({
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
    }), _defineProperty(_methods, "removesingle", function removesingle(data, index) {
      console.log('再保人单个删除', data, index); // 获取唯一标识 cedingPolicyNo

      var deleteDot = data.cedingPolicyNo; // filter标的 删除带有此表示的 

      var arr = this.underlying.guPolicyItemMainVoList.filter(function (item) {
        if (item.cedingPolicyNo == deleteDot) {} else {
          return item;
        }
      });
      this.underlying.guPolicyItemMainVoList = arr;
      this.guPolicyVoList.splice(index, 1); // this.fromData.guPolicyRiVoList
    }), _defineProperty(_methods, "handleSelectionChange", function handleSelectionChange(val) {
      this.multipleSelection = val;
    }), _defineProperty(_methods, "removeMultiguPolicyVoList", function removeMultiguPolicyVoList() {
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
          console.log('多个原保单', that.multipleSelection);
          var arr = [];
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = that.multipleSelection[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var item = _step8.value;
              arr.push(item.cedingPolicyNo);
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
    }), _defineProperty(_methods, "remove", function remove(index, self, index2) {
      console.log(index, index2);

      if (self == "guPolicyRiVoList") {
        //删除再保人信息 只剩一个时候不能删除
        // if( this.fromData.guPolicyRiVoList.length<=1){
        //   return
        // }
        this.fromData.guPolicyRiVoList.splice(index, 1);
      } else if (self == "guPolicyVoList") {
        //删除已选原保单
        this.guPolicyVoList.splice(index, 1);
      } else if (self == "guPolicyClauseVoList") {
        //删除条款
        this.Clause.guPolicyClauseVoList.splice(index, 1);
      } else if (self == "node") {
        //删除分期分出详情  是否同时删除分期分出数据
        // this.fqPayee.guInstallmentDetailVoList.splice(index, 1);
        this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList.splice(index2, 1);
      } else if (self == "InstallmentData") {
        //删除分期分入详情  是否同时删除分期分入数据
        this.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.splice(index, 1);
      }
    }), _defineProperty(_methods, "changeContinueSign", function changeContinueSign(a) {
      console.log(a); // 02是续保

      if (a == "02") {
        //续保
        this.Renewal = false;
      } else {
        this.Renewal = true;
      }
    }), _defineProperty(_methods, "changeschemeName", function changeschemeName(insurance) {
      console.log(insurance);

      if (insurance) {
        this.baseInfo.riskCode = insurance.codeCode;
      } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
      }
    }), _defineProperty(_methods, "chooseTemporaryMarking", function chooseTemporaryMarking(riInward) {
      console.log("临分标志", riInward);
      this.baseInfo.riInward = riInward;
    }), _defineProperty(_methods, "getcurrency", function getcurrency(data) {
      var that = this;
      console.log('自保险种', data);
      var params = {};
      params.riskCode = data;
      var url = Vue.gvUtil.getUrl({
        apiName: "findDetail",
        contextName: "selfins"
      });
      Vue.gvUtil.http.post(url, params).then(function (res) {
        if (res.resCode == '0000') {
          console.log("res", res.resData); // 这是个数组
          // that.baseInfo.currency = res.resData.defaultCurrency

          that.baseInfo.upstreamSign = res.resData.streamType; // Vue.gvUtil.initTranslation("Currency");
        }
      });
    }), _defineProperty(_methods, "getunderWritingYear1", function getunderWritingYear1(date) {
      console.log('获取承包年度', date);
      var data = date.slice(6, 10);
      console.log('获取承包年度', data);
      this.baseInfo.underWritingYear = data;
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var item = _step9.value;
          item.periodStart = date;
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
    }), _defineProperty(_methods, "getunderWritingYear2", function getunderWritingYear2(date) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var item = _step10.value;
          item.periodEnd = date;
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
    }), _defineProperty(_methods, "checkpolicy", function checkpolicy() {
      var that = this;
      console.log('重新生成标的'); // 1.有没有险种

      if (this.baseInfo.riskCode) {} else {
        that.$message({
          showClose: true,
          message: '请选择险种',
          type: 'wraning'
        });
        return;
      } // 2.标的数据不能为空


      if (this.underlying.guPolicyItemMainVoList.length == 0) {
        that.$message({
          showClose: true,
          message: '标的信息不能为空',
          type: 'wraning'
        });
        return;
      } // 将再保人的 转废除比例和转分出手续费比例同步到标的数组里面的数组
      // 标的信息必须完善
      // 标的的信息和基础信息的 本单币别 兑换率 增值税税率 增值税附加税率 佣金率


      var params = {}; // 如果是那五个险种

      if (that.IsfiveExport) {
        // debugger;
        params.guPolicyItemMainVoList = that.guPolicyItemMainVoListThree;
        console.log('xxxxx', that.IsfiveExport, that.guPolicyItemMainVoListThree);
      } else {
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
        if (res.resCode == '0000') {
          console.log("res", res.resData); // 这是个数组

          that.underlying.guPolicyItemMainVoList = res.resData.guPolicyItemMainVoList;
          that.baseInfo.totalPremium = res.resData.totalPremium;
          that.baseInfo.insuredValue = res.resData.insuredValue;
          that.baseInfo.totalDue = res.resData.totalDue;
          that.baseInfo.totalDueRi = res.resData.totalDueRi;
          that.$message({
            showClose: true,
            message: '标的计算成功！',
            type: 'success'
          });
        } else {
          that.$message({
            showClose: true,
            message: res.resMsg,
            type: 'wraning'
          });
        }
      });
    }), _defineProperty(_methods, "exportExcel", function exportExcel() {
      if (this.baseInfo.riskCode == '') {
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
        responseType: 'blob'
      }).then(function (res) {
        console.log('res', res);
        var data = res;
        var url = window.URL.createObjectURL(new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }));
        var link = document.createElement('a');
        link.style.display = 'none';
        link.href = url; // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])

        link.setAttribute('download', 'download.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }), _defineProperty(_methods, "importExcel", function importExcel(file) {
      var _this14 = this;

      var that = this;
      var overrideRateArr = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = that.fromData.guPolicyRiVoList[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var item = _step11.value;
          overrideRateArr.push(item.overrideRate);
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

      if (overrideRateArr.length == 0) {
        overrideRateArr = '';
      }

      console.log('overrideRateArr', overrideRateArr);

      if (!that.baseInfo.riskCode) {
        this.$message.success('请选择险种');
        return;
      }

      if (that.baseInfo.riskCode != 'EAS' && that.baseInfo.riskCode != 'MAR' && that.baseInfo.riskCode != 'OOPU') {
        this.$confirm('当前保单的标的详情信息已由原保单带入，是否确认要通过导入清单导入？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var url = Vue.gvUtil.getUrl({
            apiName: 'importItemExcel',
            contextName: 'selfins',
            serachParms: {
              premiumList: that.premiumList,
              exchangeRate: that.baseInfo.exchangeRate,
              overrideRate: overrideRateArr
            }
          });
          formData = new FormData();
          formData.append('file', file.file);
          formData.append('premiumList', that.premiumList);
          formData.append('exchangeRate', that.baseInfo.exchangeRate);
          formData.append('overrideRate', overrideRateArr);
          Vue.gvUtil.http.post(url, formData).then(function (res) {
            console.log('res', res);

            if (res.resCode != '0000') {
              // this.$message.error(res.resMsg)
              _this14.$message.success('导入失败');

              return;
            }

            if (res.resData[0].riskCode != that.baseInfo.riskCode) {
              _this14.$message.success('请勿导入不同险种的标的');

              return;
            }

            _this14.$message.success('导入成功！'); // 是这五个险种


            that.IsfiveExport = true;
            that.underlying.guPolicyItemMainVoList = res.resData;
            console.log('that.underlying.guPolicyItemMainVoList ', that.underlying.guPolicyItemMainVoList, that.IsfiveExport, that.guPolicyItemMainVoListThree); // 再保人

            if (that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList) {
              that.fromData.guPolicyRiVoList = that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
            }
          });
        })["catch"](function () {
          _this14.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        var url = Vue.gvUtil.getUrl({
          apiName: 'importItemExcel',
          contextName: 'selfins',
          serachParms: {
            premiumList: that.premiumList,
            exchangeRate: that.baseInfo.exchangeRate,
            overrideRate: overrideRateArr
          }
        });
        formData = new FormData();
        formData.append('file', file.file);
        formData.append('premiumList', that.premiumList);
        formData.append('exchangeRate', that.baseInfo.exchangeRate);
        formData.append('overrideRate', overrideRateArr);
        Vue.gvUtil.http.post(url, formData).then(function (res) {
          console.log('res', res);

          if (res.resCode != '0000') {
            // this.$message.error(res.resMsg)
            _this14.$message.success('导入失败');

            return;
          }

          if (res.resData[0].riskCode != that.baseInfo.riskCode) {
            _this14.$message.success('请勿导入不同险种的标的');

            return;
          }

          _this14.$message.success('导入成功！');

          console.log('that.underlying.guPolicyItemMainVoList ', that.underlying.guPolicyItemMainVoList);
          that.underlying.guPolicyItemMainVoList = res.resData;

          if (that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList) {
            that.fromData.guPolicyRiVoList = that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
          } // 三个特殊险种 从已选原保单取值list【0】。xx赋给标的


          if (that.baseInfo.riskCode == 'EAS' || that.baseInfo.riskCode == 'MAR' || that.baseInfo.riskCode == 'OOPU') {
            var cedingRiskName = that.guPolicyVoList[0].cedingRiskName;
            var cedingRiskCode = that.guPolicyVoList[0].cedingRiskCode;
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
              for (var _iterator12 = that.underlying.guPolicyItemMainVoList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                var item = _step12.value;
                item.guPolicyItemCedingVo.cedingRiskName = cedingRiskName;
                item.guPolicyItemCedingVo.cedingRiskCode = cedingRiskCode;
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

            console.log('vdfdvd', cedingRiskName, cedingRiskCode, that.underlying.guPolicyItemMainVoList);
          }
        });
      }
    }), _defineProperty(_methods, "importClauseExcel", function importClauseExcel(file) {
      var _this15 = this;

      var that = this;
      var url = Vue.gvUtil.getUrl({
        apiName: 'importClauseExcel',
        contextName: 'selfins',
        serachParms: {}
      });
      formData = new FormData();
      formData.append('file', file.file);
      formData.append('reinsurerCode', this.reinsurerCode);
      formData.append('reinsurer', this.reinsurer);
      Vue.gvUtil.http.post(url, formData).then(function (res) {
        console.log('res', res);

        if (res.resCode != '0000') {
          // this.$message.error(res.resMsg)
          _this15.$message.success('导入失败');

          return;
        }

        that.Clause.guPolicyClauseVoList = that.Clause.guPolicyClauseVoList.concat(res.resData);

        _this15.$message.success('导入成功！'); // console.log('that.underlying.guPolicyItemMainVoList ',that.underlying.guPolicyItemMainVoList )
        // that.underlying.guPolicyItemMainVoList = res.resData

      });
    }), _defineProperty(_methods, "openClause", function openClause(index) {
      // let index = index
      this.dialogTableVisible = true;
      this.reinsurerCode = this.fromData.guPolicyRiVoList[index].reinsurerCode;
      this.reinsurer = this.fromData.guPolicyRiVoList[index].reinsurer;
    }), _defineProperty(_methods, "importClauseExcel2", function importClauseExcel2(file) {}), _defineProperty(_methods, "Cal", function Cal() {
      var _this16 = this;

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
        console.log('分期校验', valid);

        if (valid) {
          // 标的数组
          params.guPolicyItemMainVoList = that.underlying.guPolicyItemMainVoList; // 分期 分入

          params.guInstallmentForPolicyVo.guInstallmentRiVo = that.guInstallmentForPolicyVo.guInstallmentRiVo; // 分出这块 需要把再保人需要的一些字段赋值给分出结构
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
                // id: '',
                policyRiId: '',
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
                  riShare: '' // 转分出比例

                }]
              }; // obj.riskCode = that.fromData.guPolicyRiVoList[i].riskCode

              obj.reinsurer = that.fromData.guPolicyRiVoList[_i2].reinsurer;
              obj.reinsurerCode = that.fromData.guPolicyRiVoList[_i2].reinsurerCode; // obj.id = that.fromData.guPolicyRiVoList[i].id

              obj.policyRiId = that.fromData.guPolicyRiVoList[_i2].policyRiId; // obj.policyRiId2 = that.fromData.guPolicyRiVoList[i].policyRiId2
              // obj.currency = that.fromData.guPolicyRiVoList[i].currency
              // obj.totalDue = that.fromData.guPolicyRiVoList[i].totalDue
              // obj.totalPremium = that.fromData.guPolicyRiVoList[i].totalPremium

              obj.riShare = that.fromData.guPolicyRiVoList[_i2].selfInsuranceRate;
              params.guInstallmentForPolicyVo.guInstallmentRoVoList.push(obj);
            }
          } else {
            _this16.$message({
              showClose: true,
              message: '再保人数据不能为空',
              type: 'warn'
            });

            return;
          }

          var url = Vue.gvUtil.getUrl({
            apiName: "calculateInstalment",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, params).then(function (res) {
            console.log("res", res.resData);

            if (res.resCode == '0017') {
              _this16.$message({
                showClose: true,
                message: res.resData,
                type: 'warn'
              });

              return;
            } // 分入


            that.guInstallmentForPolicyVo.guInstallmentRiVo = res.resData.guInstallmentRiVo;
            console.log('类型', _typeof(res.resData.guInstallmentRiVo.totalAmount)); // 分出

            that.fqPayee.guInstallmentRoVoList = res.resData.guInstallmentRoVoList;
          });
        }
      });
    }), _defineProperty(_methods, "goDetail", function goDetail(data) {
      this.dialogTableVisible2 = true;
      console.log('预览内容', data);
      this.textContent = data.clauseContent;
    }), _defineProperty(_methods, "validatebase", function validatebase() {
      var postV = false;
      var valid1 = false;
      valid2 = false;
      valid3 = false;
      valid4 = false;
      valid5 = false;
      this.$refs.baseInfo.validate(function (valid) {
        console.log('基本信息', valid);

        if (valid) {
          valid1 = true;
        } else {
          return false;
        }
      });
      this.$refs.from.validate(function (valid) {
        console.log('再保人数据', valid);

        if (valid) {
          valid2 = true;
        } else {
          return false;
        }
      });
      this.$refs.underfrom.validate(function (valid) {
        console.log('标的详情', valid);

        if (valid) {
          valid3 = true;
        } else {
          return false;
        }
      });
      this.$refs.fqfrom.validate(function (valid) {
        console.log('分期分入数据', valid);

        if (valid) {
          valid4 = true;
        } else {
          return false;
        }
      });
      this.$refs.ayee.validate(function (valid) {
        console.log('分期分出数据', valid);

        if (valid) {
          valid5 = true;
        } else {
          return false;
        }
      });

      if (valid1 && valid2 && valid3 && valid4 && valid5) {
        postV = true;
        this.$emit('vaild-event', postV);
      } else {
        postV = false;
        this.$emit('vaild-event', postV);
        this.$message({
          showClose: true,
          message: '请完善信息',
          type: 'warning'
        });
      }

      console.log('postV', postV);
    }), _defineProperty(_methods, "validatebase2", function validatebase2() {
      var postV = false;
      var valid1 = false;
      valid2 = false;
      valid3 = false;
      valid4 = false;
      valid5 = false;
      this.$refs.baseInfo.validate(function (valid) {
        console.log('基本信息', valid);

        if (valid) {
          valid1 = true;
        } else {
          return false;
        }
      });
      this.$refs.from.validate(function (valid) {
        console.log('再保人数据', valid);

        if (valid) {
          valid2 = true;
        } else {
          return false;
        }
      });
      this.$refs.underfrom.validate(function (valid) {
        console.log('标的详情', valid);

        if (valid) {
          valid3 = true;
        } else {
          return false;
        }
      });
      this.$refs.fqfrom.validate(function (valid) {
        console.log('分期分入数据', valid);

        if (valid) {
          valid4 = true;
        } else {
          return false;
        }
      });
      this.$refs.ayee.validate(function (valid) {
        console.log('分期分出数据', valid);

        if (valid) {
          valid5 = true;
        } else {
          return false;
        }
      });

      if (valid1 && valid2 && valid3 && valid4 && valid5) {
        postV = true;
        this.$emit('vaild-event2', postV);
      } else {
        postV = false;
        this.$emit('vaild-event2', postV);
        this.$message({
          showClose: true,
          message: '请完善信息',
          type: 'warning'
        });
      }

      console.log('postV', postV);
    }), _defineProperty(_methods, "Submitss", function Submitss() {
      //提交后全部只读
      this.Submit = true;
      this.Renewal = false;
    }), _defineProperty(_methods, "changeschemeName2", function changeschemeName2() {}), _defineProperty(_methods, "changeschemeName3", function changeschemeName3(e) {
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
        if (res.resCode == '0000') {
          console.log("获得兑换率", res.resData); // 这是个数组

          that.baseInfo.exchangeRate = res.resData.exchangeRate; // Vue.gvUtil.initTranslation("Currency");
        }
      });
    }), _defineProperty(_methods, "blur5", function blur5() {
      // 判断是否是三个特殊险种
      var that = this; // 如果触发重新生成标的接口

      if (that.baseInfo.riskCode == "MAR" || that.baseInfo.riskCode == "EAS" || that.baseInfo.riskCode == "OOPU") {// this.checkpolicy()
        // this.$message({
        //   message: "请重新生成标的",
        //   type: "warning",
        // });
      } else {
        this.$message({
          message: "请重新生成标的",
          type: "warning"
        });
      }
    }), _methods)
  });
});