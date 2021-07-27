/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  // 引入API
  let reuqireConfig = require("../index.config.js");
  let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi(config.api);
  // var Risktype = require('./risktype')
  return Vue.gvUtil.Page({
    template: require("./baseInfoCopy.html"),
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
    // created() {
    //   let that = this
    //   // 调用接口原币
    //   Vue.gvUtil.initTranslation("Currency");

    //   // 获取再保人数据
    //   let url = Vue.gvUtil.getUrl({
    //     apiName: "findReinsurerList",
    //     contextName: "selfins",
    //   });
    //   Vue.gvUtil.http.get(url).then((res) => {
    //     if (res.resCode == '0000') {
    //       console.log("再保人", res.resData); // 这是个数组
    //       that.Underwriter2 = res.resData
    //       // that.baseInfo.exchangeRate = res.resData.exchangeRate
    //       // Vue.gvUtil.initTranslation("Currency");
    //     }

    //   });
    //   // 获取经办人 承包人数据
    //   let url2 = Vue.gvUtil.getUrl({
    //     apiName: "findUserList",
    //     contextName: "selfins",
    //   });
    //   Vue.gvUtil.http.get(url2).then((res) => {
    //     if (res.resCode == '0000') {
    //       console.log("经办人 承包人", res.resData); // 这是个数组
    //       that.Underwriter = res.resData
    //       // that.baseInfo.exchangeRate = res.resData.exchangeRate
    //       // Vue.gvUtil.initTranslation("Currency");
    //     }

    //   });
    //   // 获取承包人和经办人的默认值
    //   let url3 = Vue.gvUtil.getUrl({
    //     apiName: "UserInfo",
    //     contextName: "selfins",
    //   });
    //   let params = {}
    //   Vue.gvUtil.http.post(url3, params).then((res) => {
    //     if (res.resCode == '0000') {

    //       // 经办人
    //       that.baseInfo.handle = res.resData.userName
    //       that.baseInfo.handleCode = res.resData.userCode
    //       // 承包人
    //       that.baseInfo.underWriter = res.resData.userName
    //       that.baseInfo.underwriterCode = res.resData.userCode
    //     }

    //   });
    // },
    mounted() {
      // baseinfo子组件获取父组件数据
      // this.dataFromSelectpolicyApp(this.objFromSelectpolicyApp)
    },
    watch: {},
    datas: function () {
      return {
        InstallmentData: [{}], //分期值绑定
        ReinsuranceForm: [{}], //分期详情绑值
        Renewal: true, //续保/新保字段可读性否控制

        checked: false, //前后端是否一致
        Clausesdata: [], //条款值
        CedingPolicy: true, //显示原保单号页面与标的页面与再保人页面
        text: false,
        ReinsuranceTableVisible: false, //分期详情弹框
        emailTableVisible: false, //邮件弹框
        multipleSelection: [], //多选框
        Subjectmatter: [],
        node: [],
        emailForm: [], //email值
        tableData: [{}], //分期
        activeNames: ["1"],
        schemeName: [], //自保险种下拉
        continueSignOptions: [], //新保续保下拉
        schemeDate: [], //临分标志下拉
        riskCode: "OOPD", //控制页面显示的自保险种
        isEventChange: false,
        dialogTableVisible: false, //条款弹框
        dialogTableVisible2: false, //条款弹框预览内容
        textContent: "", // 预览具体内容
        printTableVisible: false, //打印弹框
        Submit: false, //提交后改变只读状态
        isReadonly: false, //是否只读
        stateWord: "", // 查看 审核 修改
        // 经办人
        Underwriter: [],
        // 承保人
        Underwriter1: [],
        // 再保人
        Underwriter2: [],
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
          Content: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "blur",
            },
          ],
        },
        printsdata: [], //打印绑定的值
        // 1.Submit
        baseInfo: {
          proposalNo: "", // 自保投保单号
          policyNo: "", // 自保保单号
          renewalSign: "01", // 新保||续保
          previousPolicyNo: "", // 上年保单号
          renewalPolicyNo: "", // 续保保单号
          riskCode: "", // 自保险种
          upstreamSign: "", // 上游下游
          riInward: "001", // 临分标志
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
          cedingProjectName: "", // 原项目名称
          policyStatus: "", // 保单状态
          createdBy: "", // 创建人
          amendedBy: "", // 修改人
          approvedBy: "", // 审核人
          createdDate: "", // 创建日期
          amendedDate: "", // 修改日期
          approvedDate: "", // 审核日期
          checkName: "缺字段", // 缺字段
          currency: "", // 本单币别 根据险种
          exchangeRate: "", // 兑换率
          vatRate: 6, // 增值税税率
          vatSurchargeRate: 12, // 增值税附加税率
          commissionRate: 6, // 佣金率
          cedingCurrency: "", // 原币单位 校验四兄弟
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
        // 4.已选原保单信息
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
        // 6.分期信息(分入信息集合) fqfrom
        guInstallmentAddVo: {
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
            premium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
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
        // 8.审核
        auditInfo: {
          approvedRemark: "",
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
          this.$message.success("请选择险种");
        }
      },
      selectChanged2(value, index) {
        console.log("index", index, value);
        console.log("index", this.fromData.guPolicyRiVoList);
      },
      // initPage() {
      //   // Vue.gvUtil.initTranslation("Currency");
      // },
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
      // 审核通过 不通过
      goAudit(code) {
        let that = this;
        let approveFlag = code; //  01 审核通过 06 审核不通过
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
            console.log("触发审核接口", params);
            Vue.gvUtil.http.post(url, params).then((res) => {
              console.log("结果", res);
              // 跳转保批单查询页面
              this.$router.push({
                name: "inquiryApp",
              });
            });
          }
        });
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
      // 保单详情接口-查看
      getPolicyFeeInfo3(proposalNo, versionNo, word) {
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
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // debugger
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
              res.resData.guPolicyAllInfo.guInstallmentAddVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentAddVo.guInstallmentRiVo = {
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
              that.guInstallmentAddVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
            }
            // 分期分出

            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人
            // debugger
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
      // 保单详情接口-审核
      getPolicyFeeInfo(proposalNo, versionNo, word) {
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
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // debugger
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
              res.resData.guPolicyAllInfo.guInstallmentAddVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentAddVo.guInstallmentRiVo = {
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
              that.guInstallmentAddVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
            }
            // 分期分出
            debugger;
            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人
            // debugger
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
      // 保单详情接口-修改
      getPolicyFeeInfo2(proposalNo, versionNo, word) {
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
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.baseInfo = res.resData.guPolicyAllInfo;
            // debugger
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
              res.resData.guPolicyAllInfo.guInstallmentAddVo
                .guInstallmentRiVo == null
            ) {
              that.guInstallmentAddVo.guInstallmentRiVo = {
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
              that.guInstallmentAddVo.guInstallmentRiVo =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
            }

            // 分期分出
            that.fqPayee.guInstallmentRoVoList =
              res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
            // 条款
            that.Clause.guPolicyClauseVoList =
              res.resData.guPolicyAllInfo.guPolicyClauseVoList;

            // 标的
            let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
            that.underlying.guPolicyItemMainVoList = arr;
            console.log("审核后页面数据和res数据", that.baseInfo, arr);
            // 再保人
            // debugger
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
      removeMulti() {},
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
        // 如果obj有submit 且 为true

        if (obj.Submit) {
          console.log("提交的Submit", obj.Submit);
          this.Submit = true;
        }
      },
      // 查询页面原保单返回来的数据
      dataFromSelectpolicyApp(obj) {
        debugger;
        let that = this;
        if (obj.guPolicyItemMainVoList) {
          console.log("原保单查询页面来的数据渲染", obj);
          // 1.渲染原保单 必有
          this.guPolicyVoList = this.guPolicyVoList.concat(obj.guPolicyVoList);
          // 2.渲染标的 必有
          this.underlying.guPolicyItemMainVoList =
            this.underlying.guPolicyItemMainVoList.concat(
              obj.guPolicyItemMainVoList
            );
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
          obj.guPolicyVoList[0];
          // 校验
          this.baseInfo.cedingCurrency = obj.guPolicyVoList[0].currency; // 原币单位 校验四兄弟
          this.baseInfo.cedingCompany = obj.guPolicyVoList[0].cedingCompany; // 原保险人 校验四兄弟
          this.baseInfo.programmeCode = obj.guPolicyVoList[0].programmeCode; //方案code 新增 校验四兄弟
          this.baseInfo.projectCode = obj.guPolicyVoList[0].projectCode; // 项目code 新能 校验四兄弟
          // 显示
          console.log("原币单位", obj.guPolicyVoList[0].currency);
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
      // 增加-再保人信息
      addReinsuranceInfo() {
        this.fromData.guPolicyRiVoList.push({
          guPolicyClauseVoList: [],
          reinsurer: "", // 再保人名字
          reinsurerCode: "", // 再保人代码
          selfInsuranceRate: "", // 转分出比例
          overrideRate: "", // 转分出手续费比率 这块是从原保单带出来的 保存不需要 但是标的计算需要
          reinsurancePolicyNo: "", // 再保方保单号
          reinsuranceDebitCreditNo: "", // 再保方账单号
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
      ChooseCedingPolicy() {
        if (this.baseInfo.riskCode == "") {
          // 请选择自保险种
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbplechooselfIn"),
            type: "warning",
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
        this.guInstallmentAddVo.guInstallmentRiVo.guInstallmentDetailVoList.push(
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
        // this.fqPayee.guInstallmentDetailVoList.push({
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
      addPeriodizationOut(index) {
        console.log(index);
        if (
          !this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList
        ) {
          this.fqPayee.guInstallmentRoVoList[index].guInstallmentDetailVoList =
            [];
        }

        this.fqPayee.guInstallmentRoVoList[
          index
        ].guInstallmentDetailVoList.push({
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
          Vue.gvUtil.message("请选择要删除的数据");
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
      // 删除按钮
      remove(index, self, index2) {
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

          this.fqPayee.guInstallmentRoVoList[
            index
          ].guInstallmentDetailVoList.splice(index2, 1);
        } else if (self == "InstallmentData") {
          //删除分期分入详情  是否同时删除分期分入数据
          this.guInstallmentAddVo.guInstallmentRiVo.guInstallmentDetailVoList.splice(
            index,
            1
          );
        }
      },
      // 发邮件校验
      savemailForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
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
      changeschemeName(insurance) {
        console.log(insurance);
        if (insurance) {
          this.baseInfo.riskCode = insurance.codeCode;
        } else {
          // 请选择自保险种
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbplechooselfIn"),
            type: "warning",
          });
        }
        // let obj = {};
        // obj = this.schemeName.find((item) => {
        //   return item.value === this.baseInfo.schemeName;
        // });
        // this.riskCode = obj.label;
      },
      // 临分标志 下拉菜单
      chooseTemporaryMarking(riInward) {
        console.log("临分标志", riInward);
        this.baseInfo.riInward = riInward;
      },
      // 自保险种获取
      getcurrency(data) {
        let that = this;
        console.log("自保险种", data);

        let params = {};
        params.riskCode = data;
        let url = Vue.gvUtil.getUrl({
          apiName: "findDetail",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("res", res.resData); // 这是个数组
            that.baseInfo.currency = res.resData.defaultCurrency;
            that.baseInfo.upstreamSign = res.resData.streamType;
            // Vue.gvUtil.initTranslation("Currency");
          }
        });
      },
      // 获取承包年度
      getunderWritingYear(date) {
        console.log("获取承包年度", date);
        let data = date.slice(6, 10);
        console.log("获取承包年度", data);
        this.baseInfo.underWritingYear = data;
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
        params.guPolicyItemMainVoList = that.underlying.guPolicyItemMainVoList;
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
          // 请选择自保险种
          this.$message({
            message: Vue.gvUtil.getInzTranslate("zbplechooselfIn"),
            type: "warning",
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
        if (!that.baseInfo.riskCode) {
          this.$message.success("请选择险种");
          return;
        }
        var url = Vue.gvUtil.getUrl({
          apiName: "importItemExcel",
          contextName: "selfins",
          serachParms: {},
        });
        formData = new FormData();
        formData.append("file", file.file);
        Vue.gvUtil.http.post(url, formData).then((res) => {
          console.log("res", res);
          if (res.resCode != "0000") {
            // this.$message.error(res.resMsg)
            this.$message.success("导入失败");
            return;
          }
          if (res.resData[0].riskCode != that.baseInfo.riskCode) {
            this.$message.success("请勿导入不同险种的标的");
            return;
          }
          this.$message.success("导入成功！");
          console.log(
            "that.underlying.guPolicyItemMainVoList ",
            that.underlying.guPolicyItemMainVoList
          );
          that.underlying.guPolicyItemMainVoList = res.resData;
        });
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
            // this.$message.error(res.resMsg)
            this.$message.success("导入失败");
            return;
          }
          that.Clause.guPolicyClauseVoList =
            that.Clause.guPolicyClauseVoList.concat(res.resData);

          this.$message.success("导入成功！");
          // console.log('that.underlying.guPolicyItemMainVoList ',that.underlying.guPolicyItemMainVoList )
          // that.underlying.guPolicyItemMainVoList = res.resData
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
          guInstallmentAddVo: {
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
            params.guInstallmentAddVo.guInstallmentRiVo =
              that.guInstallmentAddVo.guInstallmentRiVo;
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
                // obj.riskCode = that.fromData.guPolicyRiVoList[i].riskCode
                obj.reinsurer = that.fromData.guPolicyRiVoList[i].reinsurer;
                obj.reinsurerCode =
                  that.fromData.guPolicyRiVoList[i].reinsurerCode;
                // obj.currency = that.fromData.guPolicyRiVoList[i].currency
                // obj.totalDue = that.fromData.guPolicyRiVoList[i].totalDue
                // obj.totalPremium = that.fromData.guPolicyRiVoList[i].totalPremium
                obj.riShare =
                  that.fromData.guPolicyRiVoList[i].selfInsuranceRate;
                params.guInstallmentAddVo.guInstallmentRoVoList.push(obj);
              }
            } else {
              this.$message({
                showClose: true,
                message: "再保人数据不能为空",
                type: "warn",
              });

              return;
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
              that.guInstallmentAddVo.guInstallmentRiVo =
                res.resData.guInstallmentRiVo;
              console.log(
                "类型",
                typeof res.resData.guInstallmentRiVo.totalAmount
              );
              // 分出
              that.fqPayee.guInstallmentRoVoList =
                res.resData.guInstallmentRoVoList;
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
        valid2 = false;
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
        this.$refs.from.validate((valid) => {
          console.log("再保人数据", valid);
          if (valid) {
            valid2 = true;
          } else {
            return false;
          }
        });
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
            showClose: true,
            message: "请完善信息",
            type: "warning",
          });
        }
        console.log("postV", postV);
      },
      // 所有校验是否通过 提交
      validatebase2() {
        let postV = false;
        let valid1 = false;
        valid2 = false;
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
        this.$refs.from.validate((valid) => {
          console.log("再保人数据", valid);
          if (valid) {
            valid2 = true;
          } else {
            return false;
          }
        });
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
            showClose: true,
            message: "请完善信息",
            type: "warning",
          });
        }
        console.log("postV", postV);
      },
      Submitss() {
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
      changeschemeName2(e) {
        console.log("看看");
      },
      // 佣金失去焦点的时候
      blur() {
        this.$message({
          message: "请重新生成标的",
          type: "warning",
        });
      },
    },
    events: {
      //基本信息回显费用页面
      basein() {
        this.stateWord = "Look";
        let that = this;
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
              that.baseInfo = res.resData.guPolicyAllInfo;
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
              // 原保单
              that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
              // 分期分入
              if (
                res.resData.guPolicyAllInfo.guInstallmentAddVo
                  .guInstallmentRiVo == null
              ) {
                that.guInstallmentAddVo.guInstallmentRiVo = {
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
                that.guInstallmentAddVo.guInstallmentRiVo =
                  res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
              }
              // 分期分出
              that.fqPayee.guInstallmentRoVoList =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
              // 条款
              that.Clause.guPolicyClauseVoList =
                res.resData.guPolicyAllInfo.guPolicyClauseVoList;
              // 标的
              let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
              that.underlying.guPolicyItemMainVoList = arr;
              // 再保人
              that.fromData.guPolicyRiVoList =
                res.resData.guPolicyAllInfo.guPolicyRiVoList;
              that.isReadonly = true;
              // // 单独获取修改人信息
              // let url3 = Vue.gvUtil.getUrl({
              //   apiName: "UserInfo",
              //   contextName: "selfins",
              // });
              // let params = {};
              // Vue.gvUtil.http.post(url3, params).then((res) => {
              //   if (res.resCode == "0000") {
              //     that.baseInfo.amendedBy = res.resData.userName;
              //   }
              // });
            }
          });
      },

      //基本信息回显只读，查询页面点击自保保单号
      baseinfor(ss) {
        debugger;
        this.stateWord = "Look";
        let that = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "getPolicyFeeInfo",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            proposalNo: ss.row.proposalNo,
            versionNo: ss.row.versionNo,
            policyNo: ss.row.policyNo,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              that.baseInfo = res.resData.guPolicyAllInfo;
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
              // 原保单
              that.guPolicyVoList = res.resData.guPolicyAllInfo.guPolicyVoList;
              // 分期分入
              if (
                res.resData.guPolicyAllInfo.guInstallmentAddVo
                  .guInstallmentRiVo == null
              ) {
                that.guInstallmentAddVo.guInstallmentRiVo = {
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
                that.guInstallmentAddVo.guInstallmentRiVo =
                  res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRiVo;
              }
              // 分期分出
              that.fqPayee.guInstallmentRoVoList =
                res.resData.guPolicyAllInfo.guInstallmentAddVo.guInstallmentRoVoList;
              // 条款
              that.Clause.guPolicyClauseVoList =
                res.resData.guPolicyAllInfo.guPolicyClauseVoList;
              // 标的
              let arr = res.resData.guPolicyAllInfo.guPolicyItemMainVoList;
              that.underlying.guPolicyItemMainVoList = arr;
              // 再保人
              that.fromData.guPolicyRiVoList =
                res.resData.guPolicyAllInfo.guPolicyRiVoList;
              that.isReadonly = true;
              // // 单独获取修改人信息
              // let url3 = Vue.gvUtil.getUrl({
              //   apiName: "UserInfo",
              //   contextName: "selfins",
              // });
              // let params = {};
              // Vue.gvUtil.http.post(url3, params).then((res) => {
              //   if (res.resCode == "0000") {
              //     that.baseInfo.amendedBy = res.resData.userName;
              //   }
              // });
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
    computed: {
      // StreamTypeOptions() {
      //   return this.$store.state.publicClock.StreamType;
      // },
      // ResumeRemarkOptions() {
      //   return this.$store.state.publicClock.ResumeRemark;
      // },
    },
  });
});
