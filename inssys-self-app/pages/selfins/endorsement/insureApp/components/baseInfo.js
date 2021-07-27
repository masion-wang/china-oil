/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  // 引入API
  let reuqireConfig = require("../index.config.js");
  // let config = reuqireConfig.config;
  // // 注册API
  // Vue.gvUtil.setApi(config.api);
  // var Risktype = require('./risktype')
  Vue.gvUtil.setApi({
    policySelfMainpagetWorkNext: "/policySelfMain/getWorkNext", //工作流弹框
    // 回显数据
    add: "/policySelfMain/add", // 保存接口
    submit: "/policySelfMain/submit", // 提交接口
    calculateItems: "/policySelfMain/calculateItems", // 标的重新计算
    calculateInstalment: "/guinstallmain/calculateInstalment", // 分期计算
    // 查询子组件
    findProject: "/policySelfMain/findProject", //项目
    findScheme: "/policySelfMain/findScheme", // 方案
    policySelfMainfindList: "/policySelfMain/findRisk", // 原险种
    searchPolicy: "/policySelfMain/findPolicyAllInfo", // 查询接口
    exportItemExcel: "/policyItemMain/exportItemExcel", // excel导出
    importItemExcel: "/policyItemMain/importItemExcel", // excel导入
    importClauseExcel: "/guPolicyClause/importClauseExcel", // 条款导入
    findDetail: "/ggRisk/findDetail", // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
    findExchange: "/ggCode/findExchangeRate", // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
    findReinsurerList: "/policySelfMain/findReinsurerList", // 再保人
    findReinsurerList2: "/ggCode/findSupplier", // 再保人 自保码表 other list
    findUserList: "/policySelfMain/findUserList", // 经办人 承包人
    getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //保单详情接口
    UserInfo: "/User/UserInfo", // 获取用户信息
    verify: "/policySelfMain/verify", // 审核接口
    getList: "/document/getList", //查打印列表
    printPDF: "/PDF/printPDF", // 下载pdf
    sendEmail: "/PDF/sendEmail", // 发送邮件
    findPreviousPolicyNo: "/policySelfMain/findPreviousPolicyNo", // 获取上年保单号
    findNewPolicyAllInfo: "/policySelfMain/findNewPolicyAllInfo", // 获取续保单号
    historyEndor: "/policySelfMain/historyEndor", // 历次批单
    historyEndor2: "/endorSelfMain/historyEndor", // 历次批单
    checkDueDate: "/policySelfMain/checkDueDate", //审核通过前校验缴费截止日期
  });
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    params: function () {
      return {};
    },
    props: {
      objFromSelectpolicyApp: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
    created() {
      let that = this;
      // 调用接口原币

      Vue.gvUtil.initTranslation("Currency");
      Vue.gvUtil.initTranslation("ShareType");
      // 获取上年保单号
      let url4 = Vue.gvUtil.getUrl({
        apiName: "findPreviousPolicyNo",
        contextName: "selfins",
      });
      Vue.gvUtil.http.get(url4).then((res) => {
        if (res.resCode == "0000") {
          console.log("上年保单号", res); // 这是个数组
          that.previousPolicyNoList = res.resData;
        }
      });
      // 获取再保人数据
      let url = Vue.gvUtil.getUrl({
        apiName: "findReinsurerList2",
        contextName: "selfins",
      });
      let params5 = {
        catalog: "0",
        cedInd: "1",
        valid: "1",
      };
      Vue.gvUtil.http.post(url, params5).then((res) => {
        if (res.resCode == "0000") {
          console.log("再保人", res.resData); // 这是个数组
          that.Underwriter2 = res.resData;
          // that.baseInfo.exchangeRate = res.resData.exchangeRate
          // Vue.gvUtil.initTranslation("Currency");
        }
      });
      // 获取经办人 承包人数据
      let url2 = Vue.gvUtil.getUrl({
        apiName: "findUserList",
        contextName: "selfins",
      });
      Vue.gvUtil.http.get(url2).then((res) => {
        if (res.resCode == "0000") {
          console.log("经办人 承包人", res.resData); // 这是个数组
          // 假设没有李建辉
          let isLee = false;
          let arr = res.resData;
          for (let item of arr) {
            // 如果有
            if (item.default == "1") {
              let arr2 = res.resData.filter((item2) => {
                return item2.default == "0";
              });
              arr2.unshift(item);
              that.Underwriter1 = arr2;
              that.Underwriter = arr2;
              console.log("arr2", arr2);
              // // 经办人
              // that.baseInfo.handle = arr2[0].userName
              // that.baseInfo.handleCode = arr2[0].userCode
              // 承包人
              that.baseInfo.underWriter = arr2[0].userName;
              that.baseInfo.underwriterCode = arr2[0].userCode;
              isLee = true;
            }
          }
          // 如果没有李建辉
          if (!isLee) {
            that.Underwriter1 = res.resData;
            that.Underwriter = res.resData;
          }

          // that.baseInfo.exchangeRate = res.resData.exchangeRate
          // Vue.gvUtil.initTranslation("Currency");
        }
      });
      // 获取经办人的默认值
      let url3 = Vue.gvUtil.getUrl({
        apiName: "UserInfo",
        contextName: "selfins",
      });
      let params = {};
      Vue.gvUtil.http.post(url3, params).then((res) => {
        if (res.resCode == "0000") {
          console.log("经办人22222", res);
          // 经办人
          that.baseInfo.handle = res.resData.userName;
          that.baseInfo.handleCode = res.resData.userCode;
          // // 承包人
          // that.baseInfo.underWriter = res.resData.userName
          // that.baseInfo.underwriterCode = res.resData.userCode
        }
      });
    },
    mounted() {
      // baseinfo子组件获取父组件数据
      // this.dataFromSelectpolicyApp(this.objFromSelectpolicyApp)
    },
    watch: {},
    datas: function () {
      return {
        docList: [],
        //折叠窗默认弹开
        baseInfoColl: [
          "guInstallmentForPolicyVo",
          "stagingInformation",
          "CedingPolicy",
          "baseInfo",
          "docListInfo",
          "detailsMatter",
          "description",
        ],
        guInstallmentDetailVoListindex: "",
        guInstallmentForD: false, //分入分期弹框
        stagingInformationVisible: false, //分出分期弹框
        guInstallmentDetailVoList: [], //分出分期弹框
        workflowdialog: false, //工作流弹框
        taskObj: {},
        gwNextNodeExecutorsList: [], //
        check: "", //
        checkboxGroup: [], //
        IsfiveExport: false, // 三个险种是否被导入 MAR EAS OOPU
        InstallmentData: [{}], //分期值绑定
        ReinsuranceForm: [{}], //分期详情绑值
        Renewal: false, //续保/新保字段可读性否控制
        checked: false, //前后端是否一致
        Clausesdata: [], //条款值
        CedingPolicy: true, //显示原保单号页面与标的页面与再保人页面
        text: false,
        policyNo33: "",
        ReinsuranceTableVisible: false, //分期详情弹框
        emailTableVisible: false, //邮件弹框
        multipleSelection: [], //多选框
        Subjectmatter: [],
        node: [],
        isLOOk: false,
        emailForm: {
          To: [], // 收件人
          Title: "", // 主题
          content: "", // 内容
        }, //email值
        options: [],
        editEmailDialog: false, // 新增收件人
        editEmails: [],
        tableData: [{}], //分期
        activeNames: ["1"],
        schemeName: [], //自保险种下拉
        continueSignOptions: [], //新保续保下拉
        schemeDate: [], //临分标志下拉
        riskCode: "OOPD", //控制页面显示的自保险种
        isEventChange: false,
        PDFList: [], //打印数组
        dialogTableVisible: false, //条款弹框
        dialogTableVisible2: false, //条款弹框预览内容
        licipidan: false, // 历次批单
        textContent: "", // 预览具体内容
        printTableVisible: false, //打印弹框
        Submit: false, //提交后改变只读状态
        isReadonly: false, //是否只读
        stateWord: "", // 查看 审核 修改 Look Approve modify
        premiumList: [], // 保费素组
        premiumList2: [], // 保费素组 下发修改
        // 经办人
        Underwriter: [],
        // 承保人
        Underwriter1: [],
        // 再保人
        Underwriter2: [],
        previousPolicyNoList: [], // 上年保单号
        //邮件校验
        emailrules: {
          From: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          To: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          CC: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          Title: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          content: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        },
        // 邮箱地址
        attachments: [],
        attachments2: [],
        insertkeys: [],
        value: "", // 富文本
        printsdata: [], //打印绑定的值
        tableData1: [], // 显示的数组
        pageSize1: 2, // 每页数量
        pageNo1: 0, //当前页数
        pageaA: 0, //总页数
        total1: 0, // 总条数
        // 1.Submit
        baseInfo: {
          cancelIndicate: "", // 隐藏新增
          policyMainId: "", // 隐藏新增
          cedingPolicyNo: "", // 隐藏新增
          policyId: "", // 隐藏新增
          proposalNo: "", // 自保投保单号
          policyNo: "", // 自保保单号
          renewalSign: "02", // 新保||续保
          previousPolicyNo: "", // 上年保单号
          renewalPolicyNo: "", // 续保保单号
          riskCode: "", // 自保险种
          upstreamSign: "", // 上游下游
          riInward: "01", // 临分标志
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
          insured: "111", // 被保人

          // insuredCode:'111',
          creditNo: "", // 对方账单号
          cedingProjectName: "", // 原项目名称
          policyStatus: "", // 保单状态
          createdBy: "", // 创建人
          amendedBy: "", // 修改人
          approvedBy: "", // 审核人
          createdDate: "", // 创建日期
          amendedDate: "", // 修改日期
          approvedDate: "", // 审核日期
          checkName: "缺字段", // 缺字段
          currency: "USD", // 本单币别 根据险种  CNY USD
          exchangeRate: "", // 兑换率
          vatRate: 6, // 增值税税率
          vatSurchargeRate: 12, // 增值税附加税率
          commissionRate: 6, // 佣金率
          cedingCurrency: "", // 原币单位 校验四兄弟  ？？？
          cedingCompany: "", // 原保险人 校验四兄弟
          programmeCode: "", //方案code 新增 校验四兄弟
          projectCode: "", // 项目code 新能 校验四兄弟
          totalPremium: "", // 标的计算返回的值 自保保单总保费
          insuredValue: "", // 标的计算返回的值 自保总保额
          totalDue: "", // 标的计算返回的值 自保总分入净保费
          totalDueRi: "", // 标的计算返回的值 自保总分出净保费
          versionNo: "", // 版本号
          baseInfoRule: {
            // 基础信息校验
            renewalSign: [
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
                trigger: "blur",
              },
            ],
            upstreamSign: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            riInward: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            effectiveDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            expiryDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            underWritingYear: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            handle: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            underWriter: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            projectName: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            insured: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            cedingCurrency: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 本币单位
            currency: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 兑换率
            exchangeRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 增值税税率
            vatRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 增值税附加税率
            vatSurchargeRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 佣金率
            commissionRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        },
        // 2.条款信息
        Clause: {
          guPolicyClauseVoList: [], // 数据源
          ClauseRules: {
            // 条款校验
            clauseName: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            clauseContent: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        },
        // 3.1再保人信息
        fromData: {
          guPolicyRiVoList: [], // 数据源
          ReinsurerdataRules: {
            // 再保人校验
            reinsurer: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            selfInsuranceRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            overrideRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        },
        reinsurerCode: "",
        reinsurer: "",
        // 3.2从查询页面返回来的数据
        objFromSelectpolicyApp2: {},
        // 4.已选原保单信息 ？？？
        guPolicyVoList: [],
        // 5.标的信息
        underlying: {
          guPolicyItemMainVoList: [],
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
        guPolicyItemMainVoListThree: [], // 三个险种获取的保存标的数据
        // 6.分期信息(分入信息集合) fqfrom
        guInstallmentForPolicyVo: {
          // 分入对象 里面有公共字段和数组
          guInstallmentRiVo: {
            riskCode: "", // 自保险种
            currency: "", //币种
            totalDue: "", // 保费变化量
            totalPremium: "", // 自保总保费
            totalAmount: "", // 自保总保额
            displayNo: "", // 显示序号
            count: "", // 期数	count
            guInstallmentDetailVoList: [],
          },
          // 校验规则
          fqInstallmentRules: {
            // 缴费截止日期
            dueDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 分期比例
            installmentRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            // 保费
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
          },
        },
        // 7.分期信息(分期分出集合)
        fqPayee: {
          guInstallmentDetailVoList: [],
          guInstallmentRoVoList: [],
          fqPayeeRules: {
            // 缴费截止日期
            dueDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 收付款人
            payee: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 分期比例
            installmentRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            premium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
          },
        },
        totalRiCilShareValue: "",
        //分出总保费
        totalRiSumTotalDue: "",
        //分出保费变化量
        totalRiNowTotalDue: "",
        // 8.审核
        auditInfo: {
          approvedRemark: "同意",
        },
        rules: {
          approvedRemark: [
            {
              required: true,
              message: "不能为空",
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      // 增加-再保人信息
      addReinsuranceInfo() {
        let that = this;
        this.fromData.guPolicyRiVoList.push({
          guPolicyClauseVoList: [],
          reinsurer: "", // 再保人名字
          reinsurerCode: "", // 再保人代码
          selfInsuranceRate: "", // 转分出比例
          overrideRate: "", // 转分出手续费比率 这块是从原保单带出来的 保存不需要 但是标的计算需要
          reinsurancePolicyNo: "", // 再保方保单号
          reinsuranceDebitCreditNo: "", // 再保方账单号
        });
        // 遍历标的 把新增的再保人传到标的里面
        for (let item of this.underlying.guPolicyItemMainVoList) {
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
            versionNo: null,
          });
        }
      },
      // 删除按钮
      remove(index, self, index2) {
        console.log(index, index2);
        if (self == "guPolicyRiVoList") {
          //删除再保人信息 只剩一个时候不能删除
          if (this.fromData.guPolicyRiVoList.length <= 1) {
            return;
          }
          this.fromData.guPolicyRiVoList.splice(index, 1);
          // 同时删除标的里面的对应再保人
          for (let item of this.underlying.guPolicyItemMainVoList) {
            item.guPolicyItemReinsVoList.splice(index, 1);
          }
        } else if (self == "guPolicyVoList") {
          //删除已选原保单

          this.guPolicyVoList.splice(index, 1);
        } else if (self == "guPolicyClauseVoList") {
          //删除条款
          this.Clause.guPolicyClauseVoList.splice(index, 1);
        } else if (self == "node") {
          this.fqPayee.guInstallmentDetailVoList.splice(index2, 1);
        } else if (self == "InstallmentData") {
          //删除分期分入详情  是否同时删除分期分入数据
          this.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.splice(
            index,
            1
          );
        }
      },
      // 再保人 reinsurer reinsurerCode"中国太平洋财产保险股份有限公司-48"
      selectChanged2(value, index) {
        console.log("index", index, value);
        console.log("index", this.fromData.guPolicyRiVoList);
        let reinsurer = this.fromData.guPolicyRiVoList[index].reinsurer;
        let reinsurerCode = this.fromData.guPolicyRiVoList[index].reinsurer;
        // 给对应的标的再保人
        for (let item of this.underlying.guPolicyItemMainVoList) {
          item.guPolicyItemReinsVoList[index].reinsurer = reinsurer;
          item.guPolicyItemReinsVoList[index].reinsurerCode = reinsurerCode;
        }
      },
      // 再保人 转分出比例失去焦点的时候
      blur55(value, index) {
        let that = this;
        let selfInsuranceRate =
          this.fromData.guPolicyRiVoList[index].selfInsuranceRate;

        // 给对应的标的再保人
        for (let item of this.underlying.guPolicyItemMainVoList) {
          item.guPolicyItemReinsVoList[index].selfInsuranceRate =
            selfInsuranceRate;
        }
        // 判断是否是三个特殊险种
        // 如果触发重新生成标的接口
        if (
          that.baseInfo.riskCode == "MAR" ||
          that.baseInfo.riskCode == "EAS" ||
          that.baseInfo.riskCode == "OOPU"
        ) {
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_regenerateTarget"), // "请重新生成标的",
            type: "warning",
          });
        }
      },
      // 佣金失去焦点的时候
      blur5() {
        // 判断是否是三个特殊险种
        let that = this;
        // 如果触发重新生成标的接口
        if (
          that.baseInfo.riskCode == "MAR" ||
          that.baseInfo.riskCode == "EAS" ||
          that.baseInfo.riskCode == "OOPU"
        ) {
          // this.checkpolicy()
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_regenerateTarget"), // "请重新生成标的",
            type: "warning",
          });
        }
      },
      // 再保人 转分出比例税费失去焦点的时候
      blur6(value, index) {
        let that = this;
        let overrideRate = this.fromData.guPolicyRiVoList[index].overrideRate;

        // 给对应的标的再保人
        for (let item of this.underlying.guPolicyItemMainVoList) {
          item.guPolicyItemReinsVoList[index].overrideRate = overrideRate;
        }
        // 判断是否是三个特殊险种
        // 如果触发重新生成标的接口
        if (
          that.baseInfo.riskCode == "MAR" ||
          that.baseInfo.riskCode == "EAS" ||
          that.baseInfo.riskCode == "OOPU"
        ) {
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_regenerateTarget"), // "请重新生成标的",
            type: "warning",
          });
        }
      },
      // mm-dd-yyyy HH:mm:ss => yyyy-mm-dd HH:mm:ss
      dateFormatChange(date) {
        console.log("date", date);
        let temp1 = date.split(" ");
        console.log("temp1", temp1);
        let temp2 = date.split(" ")[0].split("-");
        let newDate =
          temp2[2] + "-" + temp2[1] + "-" + temp2[0] + " " + temp1[1];
        console.log("newDate", newDate);
        return newDate;
      },
      // date1 - date2 => days
      dateMinus(start, end) {
        let numStart = new Date(start).getTime();
        let numEnd = new Date(end).getTime();
        console.log(numStart, numEnd);
        let daysCut = (numEnd - numStart) % 86400000;
        let days = (numEnd - numStart - daysCut) / 86400000;
        if (days < 0) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEarlier"), // "止期不能比起期更早",
            type: "warning",
          });

          return;
        }
        console.log("days daysCut", days, daysCut);
        return daysCut >= 43200000 ? Number(days) + 1 : Number(days); // 按照下一天 23 59 59 => 00 00 00
      },
      // js大数除法
      accDiv(arg1, arg2) {
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
        }
        // 100.00 => 100   1000
        if (arg1.toString().split(".").length == 1) {
          Number(arg1.toString()) * 100;
        }
        // 100.10 => 1001
        else if (arg1.toString().split(".")[1].length == 1) {
          Number(arg1.toString()) * 100;
        } else {
          r1 = Number(arg1.toString().replace(".", ""));
        }
        if (arg2.toString().split(".").length == 1) {
          Number(arg2.toString()) * 100;
        }
        // 100.10 => 1001
        else if (arg2.toString().split(".")[1].length == 1) {
          Number(arg2.toString()) * 100;
        } else {
          r2 = Number(arg2.toString().replace(".", ""));
        }

        let res = r1 / r2;
        let res2 = Math.pow(10, t2 - t1);
        console.log(res, res2);
        console.log("***", res * res2);
        return res * res2;
      },
      // js大数乘法
      accMul(arg1, arg2) {
        var m = 0,
          s1 = arg1.toString(),
          s2 = arg2.toString();
        try {
          m += s1.split(".")[1].length;
        } catch (e) {}
        try {
          m += s2.split(".")[1].length;
        } catch (e) {}
        return (
          (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
          Math.pow(10, m)
        );
      },
      // js大数加法
      accAdd(arg1, arg2) {
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
      getDays(start, end, index1) {
        if (start == null || end == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty"), // "截止起期 截止止期不能为空",
            type: "warning",
          });
        }
        console.log(
          "start end index1 insuredDay this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay",
          start,
          end,
          index1,
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .insuredDay
        );
        let newStart = this.dateFormatChange(start);
        let newEnd = this.dateFormatChange(end);
        let days = this.dateMinus(newStart, newEnd);
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.insuredDay = days;
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriMonths = (days / 30.5).toFixed(2);
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriPerMonth = (
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .cilGrossPremium / days
        ).toFixed(2);
        // this.underlying.guPolicyItemMainVoList[
        //     index1
        //   ].guPolicyItemCedingVo.oriAnnualPremium =
        //   this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
        //   .cilGrossPremium / (days / 30.5).toFixed(2);
      },
      // 1.自保保额 = 保额/限额 * 自保比例
      // 2.自保分入原毛保费 = 保费(原保单查的perminm)*兑换率 * 自保比例(不固定)
      // 3.自保分入净保费 = 自保分入原毛保费(不固定) - 税费 - 税费附加费 - 佣金计算 ???
      // totalDue = ciloriGrossPremium – VAT – VAT Surcharge – Ori Commission
      // 3.1税费 = 自保分入原毛保费*(增值税税率/1.06)
      //   VAT = cILoriGrossPremium * vatRate/1.06 （注：1.06为固定值）
      // 3.2税费附加费 =税费*增值税附加税率
      //   VAT Surcharge = VAT * vatSurchargeRate
      // 3.3佣金计算 = (自保分入原毛保费-税费附加费)*佣金率
      //   Ori Commission = (cILoriGrossPremium - VAT) *  commissionRate
      getCilShareValue(insuredValue, cilShare, totalDue, index1) {
        let that = this;
        if (insuredValue == null || cilShare == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty2"), // "保额/限额 自保比例不能为空",
            type: "warning",
          });
          return;
        }
        console.log(
          "insuredValue cilShare  cc that.premiumList[0] ,that.baseInfo.exchangeRateindex1 totalDue",
          insuredValue,
          cilShare,
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .cilOriGrossPremium,
          that.premiumList[0],
          that.baseInfo.exchangeRate,
          totalDue,
          index1
        );
        // 自保保额
        // 如果是MAR 自保保额 除以层的数量 guPolicyItemMainVoList数组的length
        if (that.baseInfo.riskCode == "MAR") {
          let length = this.underlying.guPolicyItemMainVoList.length;
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilShareValue = (
            insuredValue *
            cilShare *
            0.01
          ).toFixed(2); //  /length
        } else {
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilShareValue = (
            insuredValue *
            (cilShare * 0.01)
          ).toFixed(2);
        }

        // 自保分入原毛保费
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.cilOriGrossPremium = (
          (that.premiumList[0] *
            (that.baseInfo.exchangeRate * 0.01) *
            (cilShare * 100)) /
          100
        ).toFixed(2);
        let ilOriGrossPremium = (
          (that.premiumList[0] *
            (that.baseInfo.exchangeRate * 0.01) *
            (cilShare * 100)) /
          100
        ).toFixed(2);
        // 自保费率 乘100
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.cilRate = ((totalDue / (insuredValue * 100) / (cilShare * 100)) * 100).toFixed(6)

        let VAT = (
          ilOriGrossPremium *
          ((that.baseInfo.vatRate * 0.01) / 1.06)
        ).toFixed(2);
        let VATSurcharge = (
          VAT *
          that.baseInfo.vatSurchargeRate *
          0.01
        ).toFixed(2);
        let OriCommission = (
          (ilOriGrossPremium - VAT) *
          (that.baseInfo.commissionRate * 0.01)
        ).toFixed(2);
        console.log(
          "自保分入原毛保费 - 税费 - 税费附加费 - 佣金计算",
          ilOriGrossPremium,
          VAT,
          VATSurcharge,
          OriCommission
        );
        // 自保分入净保费 = 自保分入原毛保费 - 税费 - 税费附加费 - 佣金计算
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.totalDue = (
          ilOriGrossPremium -
          VAT -
          VATSurcharge -
          OriCommission
        ).toFixed(2);
        // 分入总保费
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.oriAnnualPremium = (
        //   totalDue / (cilShare * 0.01)

        // ).toFixed(2);
      },
      // 自保费率=自保分入净保费/自保保额
      // 自保毛保费  = 自保分入净保费+ 自保佣金   OEE 分入总保费/井深
      getcilRate(
        oriAnnualPremium,
        cilShare,
        totalDue,
        cilShareValue,
        oriMonths,
        insuredDay,
        index1
      ) {
        console.log(
          "oriAnnualPremium, depthft",
          oriAnnualPremium,
          this.underlying.guPolicyItemMainVoList[index1].depthft
        );

        if (totalDue == null || cilShareValue == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty3"), // 自保分入净保费 自保保额不能为空
            type: "warning", // success
          });
          return;
        }

        // this.$message({
        //   message: Vue.gvUtil.getInzTranslate("insureapp_pleaseClickButton1"), // 请点击分期计算
        //   type: "warning", // success
        // });

        // 自保毛保费 = 自保分入净保费+ 自保佣金
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.cilGrossPremium = (
          Number(totalDue) +
          Number(
            this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
              .commission
          )
        ).toFixed(2);

        let cilGrossPremium = (
          Number(totalDue) +
          Number(
            this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
              .commission
          )
        ).toFixed(2);
        // 月保费
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriPerMonth = (
          cilGrossPremium / oriMonths
        ).toFixed(2);
        // 年保费
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.oriAnnualPremium = (
        //   cilGrossPremium *
        //   (365 / insuredDay)
        // ).toFixed(2);
        // 分入总保费
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriAnnualPremium = (
          totalDue /
          (cilShare * 0.01)
        ).toFixed(2);

        // 如果OEE 不做这个公式计算 换成这个  OEE 分入总保费/井深 cilRate  = oriAnnualPremium/depthft
        if (this.baseInfo.riskCode == "OEE") {
          let oriAnnualPremium =
            this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
              .oriAnnualPremium;
          let depthft = this.underlying.guPolicyItemMainVoList[index1].depthft;
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (oriAnnualPremium / depthft).toFixed(
            6
          );
        } else {
          // 自保费率
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (totalDue / cilShareValue).toFixed(
            6
          );
        }

        this.Cal();
      },
      // 分入总保费100% OEE 分入总保费/井深 cilRate  = oriAnnualPremium/depthft
      getOriAnnualPremium2(oriAnnualPremium, index1) {
        if (this.baseInfo.riskCode == "OEE") {
          let depthft = this.underlying.guPolicyItemMainVoList[index1].depthft;
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (oriAnnualPremium / depthft).toFixed(
            6
          );
        } else {
        }
      },
      // 改了自保费率  求 自保分入净保费 = 自保费率*自保保额
      getcilRate2(
        totalDue,
        cilRate,
        cilShareValue,
        commission,
        oriMonths,
        index1
      ) {
        // // 净保费
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.totalDue = (cilRate * cilShareValue).toFixed(2);
        // // 求自保毛保费  = 自保分入净保费+ 自保佣金
        // let totalDue2 = (cilRate * cilShareValue).toFixed(2);
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.cilGrossPremium = (
        //   Number(totalDue2) + Number(commission)
        // ).toFixed(2);
        // let cilGrossPremium2 = (Number(totalDue2) + Number(commission)).toFixed(2);
        // // 自保毛保费 又影响了月保费和年保费
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (cilGrossPremium2 / oriMonths).toFixed(2);
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = cilGrossPremium2 * 365 / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay;
      },
      // 自保保额触发
      getcilRate3(totalDue, cilShareValue, index1) {
        if (this.baseInfo.riskCode == "OEE") {
        } else {
          // 自保费率
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (totalDue / cilShareValue).toFixed(
            6
          );
        }
      },
      // 自保毛保费  = 自保分入净保费+ 自保佣金
      getcilGrossPremium(totalDue, commission, oriMonths, insuredDay, index1) {
        if (totalDue == null || commission == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty4"), // 自保分入净保费 自保佣金不能为空
            type: "warning", // success
          });
          return;
        }
        console.log(
          "自保分入净保费 自保佣金",
          totalDue,
          commission,
          typeof totalDue,
          typeof commission
        );
        // 自保毛保费 = 自保分入净保费+ 自保佣金
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.cilGrossPremium = (
          Number(totalDue) + Number(commission)
        ).toFixed(2);

        let cilGrossPremium = (Number(totalDue) + Number(commission)).toFixed(
          2
        );
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriPerMonth = (
          cilGrossPremium / oriMonths
        ).toFixed(2);
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.oriAnnualPremium = (
        //   cilGrossPremium *
        //   (365 / insuredDay)
        // ).toFixed(2);
      },
      // 月保费 = 自保毛保费 / 承保月数
      getoriPerMonth(cilGrossPremium, oriMonths, index1) {
        if (cilGrossPremium == null || oriMonths == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty5"), // 自保毛保费 承保月数不能为空
            type: "warning", // success
          });
          return;
        }
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriPerMonth = (
          cilGrossPremium / oriMonths
        ).toFixed(2);
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriAnnualPremium = (cilGrossPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay)
      },
      // 自保毛保费 触发月保费和年保费
      // 月保费 = 自保毛保费 / 承保月数
      // 年保费 = 自保毛保费 / 承保天数
      // 分入净保费 = 自保毛保费 - 自保佣金
      // 改了自保毛保费 求分入净保费
      getoriPerMonth2(
        cilShare,
        cilGrossPremium,
        commission,
        oriMonths,
        cilShareValue,
        index1
      ) {
        if (cilGrossPremium == null || oriMonths == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty5"), // 自保毛保费 承保月数不能为空
            type: "warning", // success
          });
          return;
        }
        // 分入净保费 = 自保毛保费 - 自保佣金
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.totalDue = (
          cilGrossPremium - commission
        ).toFixed(2);
        let totalDue = (cilGrossPremium - commission).toFixed(2);

        console.log(
          "totalDue / cilShareValue",
          totalDue,
          cilShareValue,
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .cilRate
        );
        // 月保费 年保费
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriPerMonth = (
          cilGrossPremium / oriMonths
        ).toFixed(2);
        // // 年保费
        // this.underlying.guPolicyItemMainVoList[
        //     index1
        //   ].guPolicyItemCedingVo.oriAnnualPremium =
        //   cilGrossPremium * 365 /
        //   this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
        //   .insuredDay;
        // 分入总保费
        this.underlying.guPolicyItemMainVoList[
          index1
        ].guPolicyItemCedingVo.oriAnnualPremium = (
          totalDue /
          (cilShare * 0.01)
        ).toFixed(2);
        // OEE 分入总保费/井深 cilRate  = oriAnnualPremium/depthft
        if (this.baseInfo.riskCode == "OEE") {
          let oriAnnualPremium =
            this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
              .oriAnnualPremium;
          let depthft = this.underlying.guPolicyItemMainVoList[index1].depthft;
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (oriAnnualPremium / depthft).toFixed(
            6
          );
        } else {
          // 自保费率 = 自保分入净保费/自保保额
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemCedingVo.cilRate = (totalDue / cilShareValue).toFixed(
            6
          );
        }
      },
      // 年保费 = 自保毛保费 / 承保天数
      getoriAnnualPremium(cilGrossPremium, insuredDay, index1) {
        if (cilGrossPremium == null || insuredDay == null) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty6"), // 自保毛保费 承保天数不能为空
            type: "warning", // success
          });
          return;
        }
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriPerMonth = (cilGrossPremium / this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.oriMonths)
        // this.underlying.guPolicyItemMainVoList[
        //   index1
        // ].guPolicyItemCedingVo.oriAnnualPremium = (
        //   cilGrossPremium *
        //   (365 / insuredDay)
        // ).toFixed(2);
      },

      // 原分出毛保费 = 自保分入原毛保费 cilOriGrossPremium *分出比例
      // 分出净保费 = 原分出毛保费 - 税费 - 税费附加费 - 佣金计算
      // 分出总保费 = 分出净保费 + 佣金计算
      // 年保费 = 原分出毛保费 /承保天数
      // 分出保额 = 自保保额 * 分出比例
      // 分出费率 = 分出总保费/分出保额
      getriOriGrossPremium(selfInsuranceRate, overrideRate, index1, index2) {
        let that = this;
        // 分出比例
        // 原分出毛保费
        let riOriGrossPremium = (
          selfInsuranceRate *
          0.01 *
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .cilOriGrossPremium
        ).toFixed(2);
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].riOriGrossPremium = riOriGrossPremium;
        console.log(
          "selfInsuranceRate index1 index2 riOriGrossPremium 22",
          // selfInsuranceRate,
          // index1,
          // index2,
          // riOriGrossPremium,
          this.underlying.guPolicyItemMainVoList[index1]
        );
        // 税费  VAT = riOriGrossPremium  * vatRate/1.06
        let VAT = (
          riOriGrossPremium *
          ((that.baseInfo.vatRate * 0.01) / 1.06)
        ).toFixed(2);
        // 税费附加费  VAT Surcharge = VAT * vatSurchargeRate
        let VATSurcharge = (
          VAT *
          that.baseInfo.vatSurchargeRate *
          0.01
        ).toFixed(2);
        // 佣金计算 Ori Commission = (riOriGrossPremium-VAT)*selfInsuranceRate
        let OriCommission = (
          (riOriGrossPremium - VAT) *
          (overrideRate * 0.01)
        ).toFixed(2);
        console.log(
          "分出 riOriGrossPremium - VAT - VATSurcharge - OriCommission",
          riOriGrossPremium,
          VAT,
          VATSurcharge,
          OriCommission
        );
        // 分出净保费
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].totalDue = (
          riOriGrossPremium -
          VAT -
          VATSurcharge -
          OriCommission
        ).toFixed(2);
        let totalDue = (
          riOriGrossPremium -
          VAT -
          VATSurcharge -
          OriCommission
        ).toFixed(2);
        // 分出总保费 = 分出净保费 + 分出佣金                             // commission
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].totalPremium = (
          Number(totalDue) +
          Number(
            this.underlying.guPolicyItemMainVoList[index1]
              .guPolicyItemReinsVoList[index2].commission
          )
        ).toFixed(2);
        console.log(
          riOriGrossPremium,
          this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
            .insuredDay
        );

        // // 年保费 = 原分出毛保费 /承保天数
        // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
        //   index2
        // ].annualPremium = (
        //   (riOriGrossPremium * 365) /
        //   this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
        //   .insuredDay
        // ).toFixed(2);
        // 分出总保费
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].annualPremium = (totalDue / (selfInsuranceRate * 0.01)).toFixed(2);

        // 分出保额 = 自保保额 * 分出比例
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].riShareValue = // this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo
          // .cilShareValue *
          (
            this.underlying.guPolicyItemMainVoList[index1].insuredValue *
            selfInsuranceRate *
            0.01
          ).toFixed(2);
        // 分出费率 = 分出总保费/分出保额
        console.log(
          "2222",
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].totalPremium,
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].riShareValue
        );
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].riRate = (
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].totalPremium /
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].riShareValue
        ).toFixed(6);
      },
      // 分出佣金触发  推出分出总保费 和分出费率
      getriOriGrossPremium2(commission, totalDue, index1, index2) {
        let that = this;
        console.log(
          "commission, totalDue index1, index2",
          commission,
          totalDue,
          index1,
          index2
        );
        // 如果是CARD和CARU 则需要算上检验费
        // 分出总保费 = 分出净保费 + 分出佣金 + 检验费
        if (
          that.baseInfo.riskCode == "CARD" ||
          that.baseInfo.riskCode == "CARU"
        ) {
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemReinsVoList[index2].totalPremium =
            Number(totalDue) +
            Number(
              that.underlying.guPolicyItemMainVoList[index1]
                .guPolicyItemReinsVoList[index2].mws
            ) +
            Number(Number(commission).toFixed(2));
        } else {
          // 否则不用
          // 分出总保费 = 分出净保费 + 分出佣金                             // commission
          this.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemReinsVoList[index2].totalPremium =
            Number(totalDue) + Number(Number(commission).toFixed(2));
        }
        // 分出费率 = 分出总=>净保费 / 分出保额
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].riRate = (
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].totalDue /
          this.underlying.guPolicyItemMainVoList[index1]
            .guPolicyItemReinsVoList[index2].riShareValue
        ).toFixed(6);
      },
      // 分出净保费触发 分出费率=分出净保费/分出保额   承保天数 this.underlying.guPolicyItemMainVoList[index1].guPolicyItemCedingVo.insuredDay
      gettotalDue2(selfInsuranceRate, totalDue, riShareValue, index1, index2) {
        let that = this;
        // 分出净保费改变
        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].riRate = (Number(totalDue) / Number(riShareValue)).toFixed(6);
        // totalDue 分出净保费 commission 佣金 mws 检验费 totalPremium 分出总保费
        // 分出总保费=分出净保费+分出佣金+检验费 (only CARD CARU)
        if (
          that.baseInfo.riskCode == "CARD" ||
          that.baseInfo.riskCode == "CARU"
        ) {
          that.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemReinsVoList[index2].totalPremium =
            Number(
              Number(
                that.underlying.guPolicyItemMainVoList[index1]
                  .guPolicyItemReinsVoList[index2].commission
              ).toFixed(2)
            ) +
            Number(
              that.underlying.guPolicyItemMainVoList[index1]
                .guPolicyItemReinsVoList[index2].mws
            ) +
            Number(totalDue);
        } else {
          that.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemReinsVoList[index2].totalPremium =
            Number(
              Number(
                that.underlying.guPolicyItemMainVoList[index1]
                  .guPolicyItemReinsVoList[index2].commission
              ).toFixed(2)
            ) + Number(totalDue);
        }

        this.underlying.guPolicyItemMainVoList[index1].guPolicyItemReinsVoList[
          index2
        ].annualPremium = (totalDue / (selfInsuranceRate * 0.01)).toFixed(2);
        this.Cal();
      },
      // 分出检验费触发
      getmws(mws, totalDue, index1, index2) {
        let that = this;
        // 如果是CARD CARU    分出总保费 = 分出净保费 + 分出佣金 + 检验费
        if (
          that.baseInfo.riskCode == "CARD" ||
          that.baseInfo.riskCode == "CARU"
        ) {
          that.underlying.guPolicyItemMainVoList[
            index1
          ].guPolicyItemReinsVoList[index2].totalPremium =
            Number(
              Number(
                that.underlying.guPolicyItemMainVoList[index1]
                  .guPolicyItemReinsVoList[index2].commission
              ).toFixed(2)
            ) +
            Number(mws) +
            Number(totalDue);
        }
        // 否则啥也不干
      },
      // 查询页面原保单返回来的数据
      dataFromSelectpolicyApp(obj) {
        let that = this;
        if (obj.guPolicyItemMainVoList) {
          console.log("原保单查询页面来的数据渲染", obj);

          // 1.渲染原保单 必有
          this.guPolicyVoList = this.guPolicyVoList.concat(obj.guPolicyVoList);

          // 2.渲染标的 必有 如果三个险种特殊 不显示
          if (
            that.baseInfo.riskCode != "EAS" &&
            that.baseInfo.riskCode != "MAR" &&
            that.baseInfo.riskCode != "OOPU"
          ) {
            this.underlying.guPolicyItemMainVoList =
              this.underlying.guPolicyItemMainVoList.concat(
                obj.guPolicyItemMainVoList
              );
          } else {
          }
          // 三个险种的标的
          this.guPolicyItemMainVoListThree =
            this.underlying.guPolicyItemMainVoList;

          let arrr = [];
          if (obj.guPolicyItemMainVoList.length > 0) {
            for (let item of obj.guPolicyItemMainVoList) {
              arrr.push(item.premium);
            }
          }
          this.premiumList = this.premiumList.concat(arrr);
          console.log("aeee", this.premiumList);
          // for(obj.)
          // 3.再保人 未必有
          let arr = [];
          arr = arr.concat(obj.guPolicyRiVoList);
          console.log("再保人", arr);
          this.fromData.guPolicyRiVoList =
            this.fromData.guPolicyRiVoList.concat(arr);
          this.fqPayee.guInstallmentRoVoList =
            this.fqPayee.guInstallmentRoVoList.concat(arr);
          // console.log('开始', this.guPolicyVoList, this.underlying.guPolicyItemMainVoList, this.fromData.guPolicyRiVoList,
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

          console.log("获取承包年度", obj.guPolicyVoList[0].periodStart);
          if (
            obj.guPolicyVoList[0].periodStart != null &&
            obj.guPolicyVoList[0].periodStart != ""
          ) {
            let data = obj.guPolicyVoList[0].periodStart.slice(6, 10);
            console.log("获取承包年度", data);
            this.baseInfo.underWritingYear = data;
          }
          this.baseInfo.cedingProjectName = obj.guPolicyVoList[0].projectName; // 项目code 新能 校验四兄弟
          // 获取兑换率 cedingCurrency
          let params = {
            baseCurrency: that.baseInfo.currency,
            exchCurrency: that.baseInfo.cedingCurrency,
          };
          let url = Vue.gvUtil.getUrl({
            apiName: "findExchange",
            contextName: "selfins",
          });

          Vue.gvUtil.http.post(url, params).then((res) => {
            if (res.resCode == "0000") {
              console.log("获得兑换率", res.resData); // 这是个数组
              that.baseInfo.exchangeRate = res.resData.exchangeRate;
              // Vue.gvUtil.initTranslation("Currency");
            }
          });
        } else {
          console.log("一开是没有数据");
        }
      },
      onEditorChange: function (val) {
        this.emailForm.content = val.text;
        console.log("邮件内容", val, this.emailForm.content);
      },
      // 批改录入 from 历次批单
      detailsData3(detailsData3) {
        Vue.gvUtil.redirectTo({
          name: "batchentryApp",
          query: {
            policyno: detailsData3.row.policyNo,
            frombaocha: "yes",
          },
        });
      },
      removeMulti() {
        this.licipidan = true;
        this.queryTable1();
      },
      // 分入分页查询-历次批单
      queryTable1() {
        let that = this;
        let params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1,
          policyNo: this.policyNo33,
          // inwardInd: 'I'
        };
        //   url = Vue.gvUtil.getUrl({
        //     apiName: 'specialAuditLogFindByBusinessNo',
        //     contextName: 'auth',
        //     urlParams: {business_no: this.businessNo},
        //     serachParms: {pageSize: params._pageSize, pageNo: params._pageNo}
        // });
        let url = Vue.gvUtil.getUrl({
          apiName: "historyEndor2",
          contextName: "selfins",
        });
        console.log("url", url, this.pageNo1, this.pageSize1);
        // selfins/uprRi/findUprRi
        // http://114.251.151.247:8805/selfins/uprMain/findUpr?&_pageSize=10&_pageNo=0
        url =
          url +
          "?&_pageSize=" +
          this.pageSize1 +
          "&_pageNo=" +
          (this.pageNo1 - 1);
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("历次批单", res);
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
      handleSizeChanges1(val) {
        this.pageSize1 = val;
        console.log(this.pageSize1);
        // this.xxx();
      },
      handleCurrentChangePages1(val) {
        this.pageaA = val;
        this.queryTable1();
        console.log(this.pageaA);
      },
      // 获取续保单号
      getxubodanhao() {
        let that = this;
        let policyNo = that.baseInfo.previousPolicyNo;

        var url = Vue.gvUtil.getUrl({
          apiName: "findNewPolicyAllInfo",
          contextName: "selfins",
        });
        let params = {
          policyNo: policyNo,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("续保单号", res);
          // if (res.resCode == '0000') {
          //   that.printsdata = res.resData.ggDocumentList

          // }
        });
      },
      // 打印弹窗
      printTableVisible2() {
        let that = this;
        // 获取险种
        let riskCode = this.baseInfo.riskCode;
        let params = {
          riskCode: riskCode,
        };
        if (riskCode) {
          this.printTableVisible = true;
          var url = Vue.gvUtil.getUrl({
            apiName: "getList",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params).then((res) => {
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
      getPDFData(list) {
        console.log("打印list", list);
        this.PDFList = list;
      },
      // 下载多个pdf
      downloadFDF() {
        let that = this;
        let pdf = this.PDFList;
        if (pdf.length < 1) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne2"), //请至少选择一个
            type: "warning", // success
          });
          return;
        }
        // that.baseInfo.proposalNo = 'ZBTBOOPD2020000046'
        if (
          that.baseInfo.proposalNo == "" ||
          that.baseInfo.proposalNo == null
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_missingNumber"), //缺少投保单号
            type: "warning", // success
          });
          return;
        }
        console.log("用户选中的pdf 的 list", pdf);
        for (let obj of pdf) {
          let params = {
            proposalNo: that.baseInfo.proposalNo,
            versionNo: "000",
            // templateName: pdf[0].templateName
            templateName: obj.templateName,
            isEmail: false,
          };

          var url = Vue.gvUtil.getUrl({
            apiName: "printPDF",
            contextName: "selfins",
          });
          Vue.gvUtil.http
            .post(url, params, {
              responseType: "blob",
            })
            .then((res) => {
              // if (res.resCode == '0000') {
              // alert('打印成功')
              // console.log(res)
              let str = pdf[0].documentType + ".pdf";
              Vue.gvUtil.resolveBlob(res, str);
              // }
            });
        }
      },
      // 发送邮件
      emailTableVisible2() {
        let that = this;
        let pdf = this.PDFList;
        if (pdf.length < 1) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne2"), //请至少选择一个
            type: "warning", // success
          });
          return;
        }
        // that.baseInfo.proposalNo = 'ZBTBOOPD2020000046'
        if (
          that.baseInfo.proposalNo == "" ||
          that.baseInfo.proposalNo == null
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_missingNumber"), //缺少投保单号
            type: "warning", // success
          });
          return;
        }
        this.emailTableVisible = true;
        console.log("用户选中的pdf 的 list", pdf);
        for (let obj of pdf) {
          let params = {
            proposalNo: that.baseInfo.proposalNo,
            versionNo: "000",
            // templateName: pdf[0].templateName
            templateName: obj.templateName,
            isEmail: true,
          };

          var url = Vue.gvUtil.getUrl({
            apiName: "printPDF",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params).then((res) => {
            if (res.resCode == "0000") {
              that.attachments.push(res.resData);
              console.log("that.attachments", that.attachments);
            }
          });
        }
      },
      editEmail() {
        this.editEmails = [];
        this.emailForm.To.forEach((element) => {
          this.options.forEach((item) => {
            if (element == item.userName) {
              this.editEmails.push(item);
            }
          });
        });
        this.editEmailDialog = true;
      },
      addEmail() {
        this.editEmails.push({
          userName: "",
          email: "",
        });
      },
      deleteEmail(index) {
        this.editEmails.splice(index, 1);
      },
      confirmEmail() {
        for (var i = 0; i < this.editEmails.length; i++) {
          if (
            this.editEmails[i].userName == "" ||
            this.editEmails[i].email == ""
          ) {
            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_pleaseEnter1"), // 请输入完整的用户名和邮箱
              type: "error", // success
            });
            return;
          }
        }

        this.options = [];
        this.emailForm.To = [];

        for (var i = 0; i < this.editEmails.length; i++) {
          this.emailForm.To.push(this.editEmails[i].email);
          let obj = {};
          obj.userName = this.editEmails[i].userName;
          obj.email = this.editEmails[i].email;
          this.options.push(obj);
        }

        this.editEmailDialog = false;
      },
      // 发送
      sendEmail(formName) {
        // 邮箱内容不能为空
        let that = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
            params.topic = that.emailForm.Title;
            params.emailAddress = that.emailForm.To;
            params.attachments = that.attachments;
            params.content = that.emailForm.content;
            var url = Vue.gvUtil.getUrl({
              apiName: "sendEmail",
              contextName: "selfins",
            });
            Vue.gvUtil.http.post(url, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("res", res);

                this.$message({
                  message: Vue.gvUtil.getInzTranslate("insureapp_success"), // 操作成功
                  type: "success", // success
                });
                that.emailTableVisible = false;
                that.printTableVisible = false;
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      stateFormat3(row, column) {
        if (row.isShare == "0") {
          return "否";
        } else {
          return "是";
        }
      },

      getData: function () {
        return this.auditInfo.approvedRemark;
      },
      getValidate: function () {
        var result = false;
        let _this = this;
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
      //审核通过前需要(工作流跳转)
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //如果是审核通过或者不通过

          this.goAudit22();

          //提交接口
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne"), // 至少选择一个操作人
            type: "warning", // success
          });
        }
      },
      //提交成功工作流弹框
      WorkingNext() {
        let that = this;

        this.$refs.auditInfo.validate((valid) => {
          if (valid) {
            var url = Vue.gvUtil.getUrl({
              apiName: "policySelfMainpagetWorkNext",
              contextName: "selfins",
            });
            Vue.gvUtil.http.post(url, that.taskObj).then((res) => {
              if (res.resCode === "0000") {
                if (res.resData.length != 0) {
                  //工作流弹框
                  that.workflowdialog = true;
                  that.gwNextNodeExecutorsList = res.resData;
                  this.check = "01";
                }
                // 如果为零 直接审核通过接口
                else if (res.resData.length == 0) {
                  that.goAudit("01");
                }
              }
            });
          }
        });
      },
      //审核通过前校验缴费截止日期大于审核通过日期，若不符合条件，弹窗提示，手动进行下发修改
      deadlineDate() {
        let url = Vue.gvUtil.getUrl({
          apiName: "checkDueDate",
          contextName: "selfins",
        });
        let params = {
          proposalNo: that.baseInfo.proposalNo,
          policyNo: that.baseInfo.policyNo,
          versionNo: that.baseInfo.versionNo,
          policyStatus: that.baseInfo.policyStatus,
          riskCode: that.baseInfo.riskCode,
          approveFlag: "01",
          opinions: that.auditInfo.approvedRemark,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            debugger;
            if (res.resData == "true") {
              this.WorkingNext();
            } else {
              Vue.gvUtil
                .alert({
                  msg: "缴费截止日期小于当前日期，请退回后修改",
                })
                .then(
                  function () {
                    console.log("点击确认按钮");
                  },
                  function () {
                    console.log("点击关闭");
                  }
                );
            }
          }
        });
      },
      // 审核通过工作流
      goAudit22() {
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "verify",
          contextName: "selfins",
        });
        let params = {
          proposalNo: that.baseInfo.proposalNo,
          policyNo: that.baseInfo.policyNo,
          versionNo: that.baseInfo.versionNo,
          policyStatus: that.baseInfo.policyStatus,
          riskCode: that.baseInfo.riskCode,
          approveFlag: "01",
          opinions: that.auditInfo.approvedRemark,
        };
        // 增加审核人+工作流
        var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        params.gwWorkTask = that.taskObj; //工作流对象
        params.nextUserCode = s;
        console.log("触发审核接口", params);
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("结果", res);
          if (res.resCode == "0000") {
            this.$router.push({
              name: "workbenchApp",
            }); //跳转到工作台
          } else {
            Vue.gvUtil.message(res.resMsg);
          }
        });
      },
      // 审核不通过
      goAudit(code) {
        let that = this;
        let approveFlag = code; //  01 审核通过 06 审核不通过
        this.check = code;
        this.$refs.auditInfo.validate((valid) => {
          if (valid) {
            let url = Vue.gvUtil.getUrl({
              apiName: "verify",
              contextName: "selfins",
            });
            let params = {
              proposalNo: that.baseInfo.proposalNo,
              policyNo: that.baseInfo.policyNo,
              versionNo: that.baseInfo.versionNo,
              policyStatus: that.baseInfo.policyStatus,
              riskCode: that.baseInfo.riskCode,
              approveFlag: approveFlag,
              opinions: that.auditInfo.approvedRemark,
            };
            var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
            params.gwWorkTask = that.taskObj; //工作流对象
            params.nextUserCode = s;
            console.log("触发审核接口", params);
            Vue.gvUtil.http.post(url, params).then((res) => {
              console.log("结果", res);
              if (res.resCode == "0000") {
                this.$router.push({
                  name: "workbenchApp",
                }); //跳转到工作台
              } else {
                Vue.gvUtil.message(res.resMsg);
              }
            });
          }
        });
      },
      //关闭按钮
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
      //审核轨迹
      path() {},
      // 录入保存时候获取创建人和修改人
      saveGetTwo() {
        let that = this;
        let url3 = Vue.gvUtil.getUrl({
          apiName: "UserInfo",
          contextName: "selfins",
        });
        let params = {};
        Vue.gvUtil.http.post(url3, params).then((res) => {
          if (res.resCode == "0000") {
            // 创建人 baseInfo.createdBy 修改人 baseInfo.amendedBy

            console.log("登录人信息", res.resData); // 这是个数组
            that.baseInfo.createdBy = res.resData.userName;
            that.baseInfo.amendedBy = res.resData.userName;
            // // 经办人
            // that.baseInfo.handle = res.resData.userName
            // that.baseInfo.handleCode = res.resData.userCode
            // // 承包人
            // that.baseInfo.underWriter = res.resData.userName
            // that.baseInfo.underwriterCode = res.resData.userCode
          }
        });
      },
      // 保单详情接口-审核
      getPolicyFeeInfo(proposalNo, versionNo, word, policyNo, policyMainId) {
        this.stateWord = word;
        let that = this;
        console.log("保单详情接口", proposalNo, versionNo, policyNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,
          policyNo: policyNo,
          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);
            //如果审核通过可以打印
            that.$emit("PrintandschemeFor", that.baseInfo.policyStatus);
            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }
            // 分期分出

            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            // 分出总保额
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }
            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }

            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }

            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;
            // // 分出的三个费用
            // that.totalRiCilShareValue =
            // //分出总保费
            // that.totalRiSumTotalDue =
            // //分出保费变化量
            // that.totalRiNowTotalDue=
            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            that.isReadonly = true;
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保单详情接口-审核 工作流
      getPolicyFeeInfo11(proposalNo, versionNo, word, policyMainId) {
        let that = this;
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.stateWord = word;

        console.log("保单详情接口", proposalNo, versionNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,

          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);

            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }
            // 分期分出

            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }

            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }
            // that.totalRiSumTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue
            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }
            // that.totalRiNowTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            that.isReadonly = true;
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保单详情接口-修改(临时)
      getPolicyFeeInfo2(proposalNo, versionNo, word, policyNo, policyMainId) {
        this.stateWord = word;
        let that = this;
        console.log("保单详情接口", proposalNo, versionNo, policyNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,
          policyNo: policyNo,
          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);
            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }

            // 分期分出
            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }
            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }
            // that.totalRiSumTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue
            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }
            // that.totalRiNowTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            // that.isReadonly = true
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保单详情接口-修改(工作流跳转)
      getPolicyFeeInfo22(proposalNo, versionNo, word, policyMainId) {
        this.stateWord = word;
        let that = this;
        console.log("保单详情接口", proposalNo, versionNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,

          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // 工作台下发修改 获取前端毛保费
            that.premiumList.push(
              res.resData.guPolicyAllInfo.guPolicyItemMainVoList[0].premium
            );
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);
            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }

            // 分期分出
            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }

            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }
            // that.totalRiSumTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue
            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }
            // that.totalRiNowTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            // 保费数组 下发修改
            for (let item of arr) {
              that.premiumList2.push(item.premium);
            }
            console.log("premiumList222", that.premiumList2);

            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            // that.isReadonly = true
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 保单详情接口-查看
      getPolicyFeeInfo3(proposalNo, versionNo, word, policyNo, policyMainId) {
        this.stateWord = word;
        let that = this;
        this.policyNo33 = policyNo;
        console.log("保单详情接口", proposalNo, versionNo, policyNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,
          policyNo: policyNo,
          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            that.$emit("PrintandschemeFor", that.baseInfo.policyStatus);
            this.$emit(
              "cedingCompany",
              res.resData.guPolicyAllInfo.cedingCompany
            );
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);
            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }
            // 分期分出

            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }

            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }
            // that.totalRiSumTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue
            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }
            // that.totalRiNowTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            that.isReadonly = true;
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      getPolicyFeeInfo44(proposalNo, versionNo, word, policyMainId) {
        this.stateWord = word;
        let that = this;
        console.log("保单详情接口", proposalNo, versionNo);
        // 获取保单信息
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        let params = {
          proposalNo: proposalNo,
          versionNo: versionNo,

          policyMainId: policyMainId,
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // 文档资料
            this.$emit("fromChild", res.resData.guPolicyAllInfo.ggDocumentList);
            let baseInfoRule = {
              // 基础信息校验
              renewalSign: [
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
                  trigger: "blur",
                },
              ],
              upstreamSign: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              riInward: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              effectiveDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              expiryDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWritingYear: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              handle: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              underWriter: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              projectName: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              insured: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              cedingCurrency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 本币单位
              currency: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 兑换率
              exchangeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税税率
              vatRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 增值税附加税率
              vatSurchargeRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
              // 佣金率
              commissionRate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo.baseInfoRule = baseInfoRule;
            // console.log(' that.baseInfo', that.baseInfo)
            // 原保单
            that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
            // 分期分入
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentForPolicyVo.guInstallmentRiVo = {
                riskCode: null, // 自保险种
                currency: null, //币种
                totalDue: null, // 保费变化量
                totalPremium: null, // 自保总保费
                totalAmount: null, // 自保总保额
                displayNo: null, // 显示序号
                count: null, // 期数	count
                guInstallmentDetailVoList: [],
              };
            } else {
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
            }
            // 分期分出

            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList;
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiCilShareValue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiCilShareValue;
            }

            //分出总保费
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiSumTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue;
            }
            // that.totalRiSumTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiSumTotalDue
            //分出保费变化量
            if (
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList.length == 0 ||
              res.resData.guPolicyAllInfo.guInstallmentForPolicyVo
                .guInstallmentRoVoList == null
            ) {
            } else {
              that.totalRiNowTotalDue =
                res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue;
            }
            // that.totalRiNowTotalDue = res.resData.guPolicyAllInfo.guInstallmentForPolicyVo.guInstallmentRoVoList[0].totalRiNowTotalDue
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人

            that.fromData.guPolicyRiVoList =
              res.resData.guPolicyAllInfo.guPolicyRiVoList;
            that.isReadonly = true;
            // 单独获取修改人信息
            let url3 = Vue.gvUtil.getUrl({
              apiName: "UserInfo",
              contextName: "selfins",
            });
            let params = {};
            Vue.gvUtil.http.post(url3, params).then((res) => {
              if (res.resCode == "0000") {
                console.log("修改人信息", res.resData, that.baseInfo.amendedBy);
                that.baseInfo.amendedBy = res.resData.userName;
              }
            });
          }
        });
      },
      // 禁用重新生成标的按钮
      disabledCheckpolicy() {
        this.isLOOk = true;
      },
      // 历次批单打开弹窗
      // 经办人code
      handle(val) {
        console.log("经办人", val);
        let code = val.split("-");
        console.log(code[1]);
        this.baseInfo.handleCode = code[1];
      },
      // 承包人code
      underWriter(val) {
        console.log("承报人", val);
        let code = val.split("-");
        console.log(code[1]);
        this.baseInfo.underwriterCode = code[1];
      },
      // 保存 || 提交 的数据
      givedata(obj) {
        console.log("保存来的数据", obj);
        // this.baseInfo = obj
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
          this.guInstallmentForPolicyVo.guInstallmentRiVo =
            obj.guInstallmentForPolicyVo.guInstallmentRiVo;
          this.fqPayee.guInstallmentRoVoList =
            obj.guInstallmentForPolicyVo.guInstallmentRoVoList;
          this.underlying.guPolicyItemMainVoList = obj.guPolicyItemMainVoList;
          this.fromData.guPolicyRiVoList = obj.guPolicyRiVoList;
          this.guPolicyVoList = obj.guPolicyVoList;
        }
      },
      redstar(h, { column }) {
        return [
          h(
            "span",
            {
              style: "color: red",
            },
            "*"
          ),
          h("span", " " + column.label),
        ];
      },
      // 增加-条款信息
      addClauseVoList() {
        this.Clause.guPolicyClauseVoList.push({
          clauseName: "", // 条款名称
          clauseContent: "", // 条款内容
          reinsurer: "", // 再保人名称
          reinsCode: "", // 再保人代码
          cedingPolicyNo: "", // 原保单号
          source: "", // 来源
        });
      },
      // 新增-选择原保单 打开弹窗
      ChooseCedingPolicy() {
        if (this.baseInfo.riskCode == "") {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
          return;
        }

        // 险种是OOPD
        if (this.baseInfo.riskCode == "OOPD") {
          // 1.打开弹窗
          let isShow = true;
          // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code
          let vailfFourBrother = {};
          vailfFourBrother.currency = this.baseInfo.cedingCurrency;
          vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
          vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
          vailfFourBrother.projectCode = this.baseInfo.projectCode;

          // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息
          this.$emit(
            "open-event",
            isShow,
            vailfFourBrother,
            this.baseInfo.riskCode,
            this.guPolicyVoList
          );
        } else {
          // 1.打开弹窗
          let isShow = true;
          // 2.传递校验四兄弟  本币单位 原保险人 方案code 项目code
          let vailfFourBrother = {};
          vailfFourBrother.currency = this.baseInfo.cedingCurrency;
          vailfFourBrother.cedingCompany = this.baseInfo.cedingCompany;
          vailfFourBrother.programmeCode = this.baseInfo.programmeCode;
          vailfFourBrother.projectCode = this.baseInfo.projectCode;

          // 3.传递险种  打开弹窗 校验四兄弟 险种 原保单信息
          this.$emit(
            "open-event",
            isShow,
            vailfFourBrother,
            this.baseInfo.riskCode,
            this.guPolicyVoList
          );
        }
      },
      // 条款保存 校验 || 关闭
      savePolicyClauseVoList(formName) {
        let that = this;
        // 如果条款数据为空
        if (this.Clause.guPolicyClauseVoList.length == 0) {
          alert("数据不能为空");
          return;
        }
        // 先校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$message({
              showClose: true,
              message: "条款保存成功!",
              type: "success",
            });
            that.dialogTableVisible = false;
          }
        });
      },
      // 条款关闭
      closedialog(formName) {
        // this.$refs[formName].resetFields();
        console.log("关闭条款弹窗");
        this.reinsurerCode = "";
        this.reinsurer = "";
      },
      // 分期分入增加 同时分出也增加
      addPeriodizationIn() {
        console.log("分期分入增加 同时分出也增加");
        this.guInstallmentForPolicyVo.guInstallmentRiVo.guInstallmentDetailVoList.push(
          {
            accountNo: "", // 账单接收人号码	accountNo
            feeType: "", // 费用类型代码	feeType
            feeSeqNo: "", // 费用序号	feeSeqNo
            installmentNo: 1, // 缴费期次	installmentNo
            dueDate: "", // 缴费截止日期	dueDate
            installmentRate: "", // 缴费分期比例	installmentRate
            currency: "", // 币别	currency
            premium: "", // 金额	premium 也是保费
            billNo: "", // 票据号	billNo
            riShare: "", // 转分出比例
          }
        );
      },
      // 增加分期分出按钮 是否增加分入信息？？？
      addPeriodizationOut(index) {
        // console.log(index);
        // this.guInstallmentDetailVoList;

        if (!this.fqPayee.guInstallmentDetailVoList) {
          // this.fqPayee.guInstallmentRoVoList[
          //   this.guInstallmentDetailVoListindex
          // ].guInstallmentDetailVoList = [];
          this.fqPayee.guInstallmentDetailVoList = [];
        }

        this.fqPayee.guInstallmentDetailVoList.push({
          accountNo: "", // 账单接收人号码	accountNo
          feeType: "", // 费用类型代码	feeType
          feeSeqNo: "", // 费用序号	feeSeqNo
          installmentNo: "", // 缴费期次	installmentNo
          dueDate: "", // 缴费截止日期	dueDate
          installmentRate: "", // 缴费分期比例	installmentRate
          currency: "", // 币别	currency
          premium: "", // 金额	premium
          billNo: "", // 票据号	billNo
          riShare: "", // 转分出比例
        });
        // this.$forceUpdate()
      },
      // 再保人删除 单个
      removesingle(data, index) {
        console.log("再保人单个删除", data, index);
        // 获取唯一标识 cedingPolicyNo
        let deleteDot = data.cedingPolicyNo;
        // filter标的 删除带有此表示的
        let arr = this.underlying.guPolicyItemMainVoList.filter((item) => {
          if (item.cedingPolicyNo == deleteDot) {
          } else {
            return item;
          }
        });
        this.underlying.guPolicyItemMainVoList = arr;
        this.guPolicyVoList.splice(index, 1);
        // this.fromData.guPolicyRiVoList
      },
      // 获取在保单选中的数组
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 原保单多个删除
      removeMultiguPolicyVoList() {
        let that = this;
        if (that.multipleSelection.length == 0) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_chooseTodelete"), //请选择要删除的数据
            type: "warning", // success
          });
        } else {
          Vue.gvUtil
            .confirm({
              msg: "确定要删除吗？",
            })
            .then(() => {
              console.log("多个原保单", that.multipleSelection);
              let arr = [];
              for (let item of that.multipleSelection) {
                arr.push(item.cedingPolicyNo);
              }
              for (let deleteDot of arr) {
                let arr1 = that.underlying.guPolicyItemMainVoList.filter(
                  (item) => {
                    if (item.cedingPolicyNo == deleteDot) {
                    } else {
                      return item;
                    }
                  }
                );
                let arr2 = that.guPolicyVoList.filter((item) => {
                  if (item.cedingPolicyNo == deleteDot) {
                  } else {
                    return item;
                  }
                });
                that.underlying.guPolicyItemMainVoList = arr1;
                that.guPolicyVoList = arr2;
              }
            });
        }
      },
      // 续保||新保 下拉菜单
      changeContinueSign(a) {
        console.log(a);
        // 02是续保
        if (a == "02") {
          //续保
          this.Renewal = false;
        } else {
          this.Renewal = true;
        }
      },
      // 自保险种 下拉菜单
      changeschemeName(insurance) {},
      // 自保险种获取
      getcurrency(data) {
        let that = this;
        console.log("自保险种", data);
        let params = {};
        params.riskCode = data;
        // 先清除之前的数据
        // 基础信息 不碰

        // 再保人
        this.fromData.guPolicyRiVoList = [];
        (this.fromData.ReinsurerdataRules = {
          // 再保人校验
          reinsurer: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          selfInsuranceRate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          overrideRate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        }),
          // 原保单
          (this.guPolicyVoList = []);
        // 标的
        this.underlying.guPolicyItemMainVoList = [];
        (this.underlying.underlyingRules = {
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
        }),
          // 历次批单
          (this.tableData1 = []);
        // 分入
        (this.guInstallmentForPolicyVo = {
          guInstallmentRiVo: {
            riskCode: "", // 自保险种
            currency: "", //币种
            totalDue: "", // 保费变化量
            totalPremium: "", // 自保总保费
            totalAmount: "", // 自保总保额
            displayNo: "", // 显示序号
            count: "", // 期数	count
            guInstallmentDetailVoList: [],
          },
          // 校验规则
          fqInstallmentRules: {
            // 缴费截止日期
            dueDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            // 分期比例
            installmentRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        }),
          // 分出
          (this.fqPayee.guInstallmentRoVoList = []);
        (this.fqPayee.fqPayeeRules = {
          // 缴费截止日期
          dueDate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          // 收付款人
          payee: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          // 分期比例
          installmentRate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          premium: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
        }),
          // 条款
          (this.Clause.guPolicyClauseVoList = []);
        (this.Clause.ClauseRules = {
          // 条款校验
          clauseName: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
          clauseContent: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        }),
          // 清空查询原保单 数据
          this.$emit("clear");

        this.baseInfo.riskCode = data;
        let url = Vue.gvUtil.getUrl({
          apiName: "findDetail",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("res", res.resData); // 这是个数组
            // that.baseInfo.currency = res.resData.defaultCurrency
            that.baseInfo.upstreamSign = res.resData.streamType;
            // Vue.gvUtil.initTranslation("Currency");
          }
        });
      },
      // 临分标志 下拉菜单
      chooseTemporaryMarking(riInward) {
        console.log("临分标志", riInward);
        this.baseInfo.riInward = riInward;
      },
      // 获取承包年度 并且 标的做一个联动 ？？？？
      getunderWritingYear1(date) {
        console.log("获取承包年度", date);
        let data = date.slice(6, 10);
        console.log("获取承包年度", data);
        this.baseInfo.underWritingYear = data;
        for (let item of this.underlying.guPolicyItemMainVoList) {
          item.periodStart = date;
        }
      },
      getunderWritingYear2(date) {
        for (let item of this.underlying.guPolicyItemMainVoList) {
          item.periodEnd = date;
        }
      },
      // 重新生成标的计算
      checkpolicy() {
        let that = this;
        console.log("重新生成标的");
        // 1.有没有险种
        if (this.baseInfo.riskCode) {
        } else {
          that.$message({
            showClose: true,
            message: "请选择险种",
            type: "wraning",
          });
          return;
        }
        // 2.标的数据不能为空
        if (this.underlying.guPolicyItemMainVoList.length == 0) {
          that.$message({
            showClose: true,
            message: "标的信息不能为空",
            type: "wraning",
          });
          return;
        }
        // 将再保人的 转废除比例和转分出手续费比例同步到标的数组里面的数组
        // 标的信息必须完善

        // 标的的信息和基础信息的 本单币别 兑换率 增值税税率 增值税附加税率 佣金率
        let params = {};
        // 如果是那五个险种
        if (that.IsfiveExport) {
          params.guPolicyItemMainVoList = that.guPolicyItemMainVoListThree;
          console.log(
            "xxxxx",
            that.IsfiveExport,
            that.guPolicyItemMainVoListThree
          );
        } else {
          params.guPolicyItemMainVoList =
            that.underlying.guPolicyItemMainVoList;
          params.itemReinsVo = that.fromData.guPolicyRiVoList;
        }

        // params.guPolicyRiVoList = that.fromData.guPolicyRiVoList
        params.currency = that.baseInfo.currency;
        params.exchangeRate = that.baseInfo.exchangeRate;
        params.vatRate = that.baseInfo.vatRate;
        params.vatSurchargeRate = that.baseInfo.vatSurchargeRate;
        params.commissionRate = that.baseInfo.commissionRate;
        params.riskCode = that.baseInfo.riskCode; // 自保险种
        let url = Vue.gvUtil.getUrl({
          apiName: "calculateItems",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("res", res.resData); // 这是个数组
            that.underlying.guPolicyItemMainVoList =
              res.resData.guPolicyItemMainVoList;
            that.baseInfo.totalPremium = res.resData.totalPremium;
            that.baseInfo.insuredValue = res.resData.insuredValue;
            that.baseInfo.totalDue = res.resData.totalDue;
            that.baseInfo.totalDueRi = res.resData.totalDueRi;
            that.$message({
              showClose: true,
              message: "标的计算成功！",
              type: "success",
            });
          } else {
            that.$message({
              showClose: true,
              message: res.resMsg,
              type: "wraning",
            });
          }
        });
      },
      // 导出标的
      exportExcel() {
        if (this.baseInfo.riskCode == "") {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });
          return;
        }
        let that = this;
        // 标的的信息和基础信息的 本单币别 兑换率 增值税税率 增值税附加税率 佣金率
        let params = {};
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
        let url = Vue.gvUtil.getUrl({
          apiName: "exportItemExcel",
          contextName: "selfins",
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
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            console.log("res", res);
            const data = res;
            const url = window.URL.createObjectURL(
              new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
              })
            );
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])
            link.setAttribute("download", "download.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      },
      // 标的导入
      importExcel(file) {
        let that = this;
        let overrideRateArr = [];
        for (let item of that.fromData.guPolicyRiVoList) {
          overrideRateArr.push(item.overrideRate);
        }
        if (overrideRateArr.length == 0) {
          overrideRateArr = "";
        }
        console.log("overrideRateArr", overrideRateArr);
        if (!that.baseInfo.riskCode) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectRisks"), // 请选择险种
            type: "warning", // success
          });

          return;
        }
        let premiumList = [];
        // 下发修改
        if (that.stateWord == "modify") {
          premiumList = that.premiumList2;
        } else {
          premiumList = that.premiumList;
        }
        console.log("premiumList", premiumList);
        if (
          that.baseInfo.riskCode != "EAS" &&
          that.baseInfo.riskCode != "MAR" &&
          that.baseInfo.riskCode != "OOPU"
        ) {
          this.$confirm(
            "当前保单的标的详情信息已由原保单带入，是否确认要通过导入清单导入？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              var url = Vue.gvUtil.getUrl({
                apiName: "importItemExcel",
                contextName: "selfins",
                serachParms: {
                  premiumList: premiumList,
                  exchangeRate: that.baseInfo.exchangeRate,
                  overrideRate: overrideRateArr,
                },
              });

              formData = new FormData();
              formData.append("file", file.file);
              formData.append("premiumList", premiumList);
              formData.append("exchangeRate", that.baseInfo.exchangeRate);
              formData.append("overrideRate", overrideRateArr);
              Vue.gvUtil.http.post(url, formData).then((res) => {
                console.log("res", res);
                if (res.resCode != "0000") {
                  this.$message({
                    message: Vue.gvUtil.getInzTranslate("insureapp_failed"), // 操作失败
                    type: "warning", // success
                  });
                  return;
                }
                if (res.resData[0].riskCode != that.baseInfo.riskCode) {
                  this.$message({
                    message: Vue.gvUtil.getInzTranslate(
                      "insureapp_notImportDifferentTypes"
                    ), // 请勿导入不同险种的标的
                    type: "warning", // success
                  });
                  return;
                }

                this.$message({
                  message: Vue.gvUtil.getInzTranslate("insureapp_success"), // 操作成功
                  type: "success", // success
                });
                // 是这五个险种
                that.IsfiveExport = true;

                that.underlying.guPolicyItemMainVoList = res.resData;
                console.log(
                  "that.underlying.guPolicyItemMainVoList ",
                  that.underlying.guPolicyItemMainVoList,
                  that.IsfiveExport,
                  that.guPolicyItemMainVoListThree
                );
                // 再保人
                if (
                  that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList
                ) {
                  that.fromData.guPolicyRiVoList =
                    that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
                }
              });
            })
            .catch(() => {
              this.$message({
                message: Vue.gvUtil.getInzTranslate("insureapp_cancel"), // 取消
                type: "info", // success
              });
            });
        } else {
          var url = Vue.gvUtil.getUrl({
            apiName: "importItemExcel",
            contextName: "selfins",
            serachParms: {
              premiumList: premiumList,
              exchangeRate: that.baseInfo.exchangeRate,
              overrideRate: overrideRateArr,
            },
          });

          formData = new FormData();
          formData.append("file", file.file);
          formData.append("premiumList", premiumList);
          formData.append("exchangeRate", that.baseInfo.exchangeRate);
          formData.append("overrideRate", overrideRateArr);
          Vue.gvUtil.http.post(url, formData).then((res) => {
            console.log("res", res);
            if (res.resCode != "0000") {
              this.$message({
                message: Vue.gvUtil.getInzTranslate("insureapp_failed"), // 操作失败
                type: "warning", // success
              });
              return;
            }
            if (res.resData[0].riskCode != that.baseInfo.riskCode) {
              this.$message({
                message: Vue.gvUtil.getInzTranslate(
                  "insureapp_notImportDifferentTypes"
                ), // 请勿导入不同险种的标的
                type: "warning", // success
              });
              return;
            }

            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_success"), // 操作成功
              type: "success", // success
            });
            console.log(
              "that.underlying.guPolicyItemMainVoList ",
              that.underlying.guPolicyItemMainVoList
            );
            that.underlying.guPolicyItemMainVoList = res.resData;
            if (that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList) {
              that.fromData.guPolicyRiVoList =
                that.underlying.guPolicyItemMainVoList[0].guPolicyRiVoList;
            }
            // 三个特殊险种 从已选原保单取值list【0】。xx赋给标的
            if (
              that.baseInfo.riskCode == "EAS" ||
              that.baseInfo.riskCode == "MAR" ||
              that.baseInfo.riskCode == "OOPU"
            ) {
              let cedingRiskName = that.guPolicyVoList[0].cedingRiskName;
              let cedingRiskCode = that.guPolicyVoList[0].cedingRiskCode;
              for (let item of that.underlying.guPolicyItemMainVoList) {
                item.guPolicyItemCedingVo.cedingRiskName = cedingRiskName;
                item.guPolicyItemCedingVo.cedingRiskCode = cedingRiskCode;
              }
              console.log(
                "vdfdvd",
                cedingRiskName,
                cedingRiskCode,
                that.underlying.guPolicyItemMainVoList
              );
            }
          });
        }
      },
      // 条款导入
      importClauseExcel(file) {
        let that = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "importClauseExcel",
          contextName: "selfins",
          serachParms: {},
        });
        formData = new FormData();
        formData.append("file", file.file);
        formData.append("reinsurerCode", this.reinsurerCode);
        formData.append("reinsurer", this.reinsurer);
        Vue.gvUtil.http.post(url, formData).then((res) => {
          console.log("res", res);
          if (res.resCode != "0000") {
            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_failed"), // 操作失败
              type: "warning", // success
            });
            return;
          }
          that.Clause.guPolicyClauseVoList =
            that.Clause.guPolicyClauseVoList.concat(res.resData);

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_success"), // 操作成功
            type: "success", // success
          });
        });
      },
      // 打开条款弹窗 获取再保人名字和code
      openClause(index) {
        // let index = index
        this.dialogTableVisible = true;
        this.reinsurerCode =
          this.fromData.guPolicyRiVoList[index].reinsurerCode;
        this.reinsurer = this.fromData.guPolicyRiVoList[index].reinsurer;
      },
      // 条款导入2
      importClauseExcel2(file) {},
      // 分期计算并且渲染到页面
      Cal() {
        let params = {
          // 分期
          guInstallmentForPolicyVo: {
            // 分入
            guInstallmentRiVo: {},
            // 分出
            guInstallmentRoVoList: [],
          },
          // 标的
          guPolicyItemMainVoList: [],
        };
        // 再保人数据不能
        let that = this;
        // 校验一下
        this.$refs.fqfrom.validate((valid) => {
          console.log("分期校验", valid);
          if (valid) {
            // 标的数组
            params.guPolicyItemMainVoList =
              that.underlying.guPolicyItemMainVoList;
            // 分期 分入
            params.guInstallmentForPolicyVo.guInstallmentRiVo =
              that.guInstallmentForPolicyVo.guInstallmentRiVo;
            // 如果保费分期分入信息批次存在并且数量大于等于1
            if (
              that.guInstallmentForPolicyVo.guInstallmentRiVo
                .guInstallmentDetailVoList &&
              that.guInstallmentForPolicyVo.guInstallmentRiVo
                .guInstallmentDetailVoList.length >= 1
            ) {
              let scope = 0;
              // 分期 分入批次相加必须为100
              for (let item of that.guInstallmentForPolicyVo.guInstallmentRiVo
                .guInstallmentDetailVoList) {
                scope = scope + Number(item.installmentRate);
              }
              if (scope != 100) {
                this.$message({
                  message: Vue.gvUtil.getInzTranslate("insureapp_mustBe100"), //保费计算分入比例相加必须为100并且不能为空
                  type: "warning", // success
                });
                return;
              }
            }

            // 分出这块 需要把再保人需要的一些字段赋值给分出结构
            // 首先早出出数据结构
            // 获取再保人信息数组 如果没有再保人
            if (that.fromData.guPolicyRiVoList.length > 0) {
              for (let i = 0; i < that.fromData.guPolicyRiVoList.length; i++) {
                let obj = {
                  riskCode: "", // 自保险种	riskCode
                  currency: "", // 币种	currency
                  totalDue: 0, // 保费变化量	totalDue
                  totalPremium: 0, // 自保总保费	totalPremium
                  totalAmount: "", // 自保总保额	totalAmount
                  reinsurer: "", // 再保人	reinsurer
                  reinsurerCode: "", // 再保人代码	reinsurerCode
                  payeeCode: "", // 收付款人代码	payeeCode
                  payee: "", // 收付款人名称	payee
                  layer: "", // 层	layer
                  mws: 0, // 检验费	mws
                  displayNo: "", // 显示序号	displayNo
                  count: "", // 期数	count
                  riShare: 0, // 分出比例 后台单独加的 api上没有
                  // id: '',
                  policyRiId: "",
                  guInstallmentDetailVoList: [
                    {
                      accountNo: "", // 账单接收人号码	accountNo
                      feeType: "", // 费用类型代码	feeType
                      feeSeqNo: 0, // 费用序号	feeSeqNo
                      installmentNo: 0, // 期次	installmentNo
                      dueDate: "", // 截止日期	dueDate
                      installmentRate: 0, // 分期比例	installmentRate
                      currency: "", // 币别	currency
                      premium: 0, // 金额	premium
                      billNo: "", // 票据号	billNo
                      riShare: "", // 转分出比例
                    },
                  ],
                };

                obj.reinsurer = that.fromData.guPolicyRiVoList[i].reinsurer;
                obj.reinsurerCode =
                  that.fromData.guPolicyRiVoList[i].reinsurerCode;

                obj.policyRiId = that.fromData.guPolicyRiVoList[i].policyRiId;

                obj.riShare =
                  that.fromData.guPolicyRiVoList[i].selfInsuranceRate;
                params.guInstallmentForPolicyVo.guInstallmentRoVoList.push(obj);
              }
            } else {
              // this.$message({
              //   message: Vue.gvUtil.getInzTranslate("insureapp_cannotBeEmpty7"), // 再保人数据不能为空
              //   type: "warning", // success
              // });
              // return;
            }

            let url = Vue.gvUtil.getUrl({
              apiName: "calculateInstalment",
              contextName: "selfins",
            });
            Vue.gvUtil.http.post(url, params).then((res) => {
              console.log("res", res.resData);
              if (res.resCode == "0017") {
                this.$message({
                  showClose: true,
                  message: res.resData,
                  type: "warn",
                });
                return;
              }
              // 分入
              that.guInstallmentForPolicyVo.guInstallmentRiVo =
                res.resData.guInstallmentRiVo;
              console.log(
                "类型",
                typeof res.resData.guInstallmentRiVo.totalAmount
              );
              // 分出
              that.fqPayee.guInstallmentRoVoList =
                res.resData.guInstallmentRoVoList;
              //分出总保额
              // that.guInstallmentForPolicyVo.guInstallmentRiVo
              that.totalRiCilShareValue = res.resData.totalRiCilShareValue;
              //分出总保费
              that.totalRiSumTotalDue = res.resData.totalRiSumTotalDue;
              //分出保费变化量
              that.totalRiNowTotalDue = res.resData.totalRiNowTotalDue;
            });
          }
        });
      },
      // 分期详情按钮
      goDetail(data) {
        this.dialogTableVisible2 = true;
        console.log("预览内容", data);
        this.textContent = data.clauseContent;
      },
      // 所有校验是否通过 保存
      validatebase() {
        let postV = false;
        let valid1 = false;
        valid2 = true;
        valid3 = false;
        valid4 = false;
        valid5 = false;
        this.$refs.baseInfo.validate((valid) => {
          console.log("基本信息", valid);
          if (valid) {
            valid1 = true;
          } else {
            return false;
          }
        });
        // this.$refs.from.validate((valid) => {
        //   console.log("再保人数据", valid);
        //   if (valid) {
        //     valid2 = true;
        //   } else {
        //     return false;
        //   }
        // });
        this.$refs.underfrom.validate((valid) => {
          console.log("标的详情", valid);
          if (valid) {
            valid3 = true;
          } else {
            return false;
          }
        });
        this.$refs.fqfrom.validate((valid) => {
          console.log("分期分入数据", valid);
          if (valid) {
            valid4 = true;
          } else {
            return false;
          }
        });
        this.$refs.ayee.validate((valid) => {
          console.log("分期分出数据", valid);
          if (valid) {
            valid5 = true;
          } else {
            return false;
          }
        });

        if (valid1 && valid2 && valid3 && valid4 && valid5) {
          postV = true;
          this.$emit("vaild-event", postV);
        } else {
          postV = false;
          this.$emit("vaild-event", postV);

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_improveInformation"), //请完善信息
            type: "warning", // success
          });
        }
        console.log("postV", postV);
      },
      // 所有校验是否通过 提交
      validatebase2() {
        let postV = false;
        let valid1 = false;
        valid2 = true;
        valid3 = false;
        valid4 = false;
        valid5 = false;
        console.log("this.$refs.baseInfo", this.$refs.baseInfo);
        this.$refs.baseInfo.validate((valid) => {
          console.log("基本信息", valid);
          if (valid) {
            valid1 = true;
          } else {
            return false;
          }
        });
        // this.$refs.from.validate((valid) => {
        //   console.log("再保人数据", valid);
        //   if (valid) {
        //     valid2 = true;
        //   } else {
        //     return false;
        //   }
        // });
        this.$refs.underfrom.validate((valid) => {
          console.log("标的详情", valid);
          if (valid) {
            valid3 = true;
          } else {
            return false;
          }
        });
        this.$refs.fqfrom.validate((valid) => {
          console.log("分期分入数据", valid);
          if (valid) {
            valid4 = true;
          } else {
            return false;
          }
        });
        this.$refs.ayee.validate((valid) => {
          console.log("分期分出数据", valid);
          if (valid) {
            valid5 = true;
          } else {
            return false;
          }
        });

        if (valid1 && valid2 && valid3 && valid4 && valid5) {
          postV = true;
          this.$emit("vaild-event2", postV);
        } else {
          postV = false;
          this.$emit("vaild-event2", postV);
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_improveInformation"), //请完善信息
            type: "warning", // success
          });
        }
        console.log("postV", postV);
      },
      Submitss() {
        //提交后全部只读
        this.Submit = true;
        this.Renewal = false;
      },
      // 选择保险险种-自保险种
      changeschemeName2() {},
      // 货币选择
      changeschemeName3(e) {
        console.log("看看");
        // 获取兑换率 cedingCurrency
        let that = this;
        let params = {
          baseCurrency: that.baseInfo.currency,
          exchCurrency: that.baseInfo.cedingCurrency,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findExchange",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("获得兑换率", res.resData); // 这是个数组
            that.baseInfo.exchangeRate = res.resData.exchangeRate;
            // Vue.gvUtil.initTranslation("Currency");
          }
        });
      },
    },
    events: {
      //分期信息弹框
      stagingInformationList(scopeRow, $index) {
        this.guInstallmentDetailVoListindex = $index;
        console.log("scopeRow", scopeRow);
        this.fqPayee.guInstallmentDetailVoList =
          scopeRow.guInstallmentDetailVoList;
        this.stagingInformationVisible = true;
      },
      //保存分期弹框
      savePeriodizationOut() {
        //校验
        this.$refs.ayee.validate((valid) => {
          if (valid) {
            this.fqPayee.guInstallmentRoVoList[
              this.guInstallmentDetailVoListindex
            ].guPolicyClauseVoList = this.fqPayee.guInstallmentDetailVoList;
            this.stagingInformationVisible = false;
          } else {
            this.$message({
              message: Vue.gvUtil.getInzTranslate(
                "insureapp_improveInformation"
              ), //请完善信息
              type: "warning", // success
            });
            return false;
          }
        });
      },

      //为表格表头添加星号样式
      must: function (obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      must1: function (obj) {
        if (
          obj.columnIndex == 1 ||
          obj.columnIndex == 2 ||
          obj.columnIndex == 3
        ) {
          return "must";
        }
      },
      must2: function (obj) {
        if (obj.columnIndex == 3) {
          return "must";
        }
      },
    },
    computed: {},
  });
});
