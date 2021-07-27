/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */

define(function (require) {
  // 引入API
  let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi({
    findGpPayment: "/gppayment/findGpPayment", // 分页查询1
    findPaymentDetail: "/gppayment/findPaymentDetail", // 详情接口
    findBillOut: "/gppayment/bringOutBill", // 分页查询2 新增单据
    addGpPayment: "/gppayment/addGpPayment", // 新增接口
    findfeetypecode: "/guFeetype/findfeetypecode", // 单据类型
    offsetCalculation: "/gppayment/offsetCalculation", // 计算轧差
    policySelfMainpagetWorkNext: "/gppayment/getWorkNext", //工作流弹框
    gppaymentsubmit: "/gppayment/submit", // 提交
    printPDF: "/PDF/printPDF", // 下载pdf
  });
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "paymentrequestApp",
    components: {},
    datas: function () {
      // 双向绑定页面显示数据
      return {
        // 分页查询
        table: {
          basic: {
            api: "findGpPayment", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          //查询域元数据
          search: {
            applicationNo: "", //付款申请号
            correspondence: "", //账单接收人
            createBy: "", //创建人
            vercherNo: "", //凭证号
            createDatesStart: "", // 创建日期
            createDatesEnd: "", // 创建日期
            status: "", //付款申请状态
          },
          fields: [
            {
              labelKey: "付款申请号",
              prop: "applicationNo",
            },
            {
              labelKey: "凭证号",
              btns: [
                {
                  prop: "vercherNo",
                  flag: "view",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              labelKey: "账单接收人",
              prop: "correspCode",
            },
            {
              labelKey: "分入/分出",
              prop: "inwardInd",
              format: {
                type: "ggcode",
                codeType: "InAndOut",
              },
            },
            {
              labelKey: "保费/赔款", // ？？？
              prop: "exchRate",
            },
            {
              labelKey: "申请总金额",
              prop: "amount ",
            },
            {
              labelKey: "付款申请状态",
              prop: "status",
              format: {
                type: "ggcode",
                codeType: "PaymentApplicationStatus",
              },
            },
            {
              labelKey: "缴费截止日期",
              prop: "dueDate",
            },
            {
              labelKey: "预期付款日期", // ？？？
              prop: "validInd",
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  btnKey: "任务列表",
                  flag: "Add",
                  type: "btn",
                },
              ],
            },
          ],
        },
        // 付款和收款
        paymentMark: "",
        // 付款基础信息
        baseInfo1: {
          applicationNo: "", // 付款申请号
          voucherNo: "", // 凭证号
          correspCode: "", //        账单接收人编码
          Correspondence: "", // 账单接收人名称
          documentType: "", // 保费/赔费
          inwardInd: "", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          dueDatesEnd: "", // 缴费截止日期
          outstanding: "", // 申请总金额
          status: "", // 付款申请状态
          expectedPayDate: "", // 预期付款日期
          payDate: "", // 付款日期
          createBy: "", //                 创建人
          auditBy: "", //                 审核人
          updateBy: "", //              修改人
          createDate: "", //                 创建时间
          auditDate: "", //                审核时间
          updateDate: "", //                修改时间
          note: "", // 备注
          baseInfoRule: {
            // 基础信息校验
            correspCode: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
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
        // 收款基础信息
        baseInfo12: {
          applicationNo: "", // 付款申请号
          voucherNo: "", // 凭证号
          correspCode: "", //        账单接收人编码
          Correspondence: "", // 账单接收人名称
          documentType: "", // 保费/赔费
          inwardInd: "", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          dueDatesEnd: "", // 缴费截止日期
          outstanding: "", // 申请总金额
          status: "", // 付款申请状态
          expectedPayDate: "", // 预期付款日期
          payDate: "", // 收款日期
          createBy: "", //                 创建人
          auditBy: "", //                 审核人
          updateBy: "", //              修改人
          createDate: "", //                 创建时间
          auditDate: "", //                审核时间
          updateDate: "", //                修改时间
          note: "", // 备注
          baseInfoRule: {
            // 基础信息校验
            correspCode: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
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
        // 弹窗付款的 已选结果
        guPolicyVoListfukuan: [],
        // 弹窗收款的 已选结果
        guPolicyVoListshoukuan: [],
        // 付款 新增查询页面
        table2: {
          basic: {
            api: "findBillOut", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          //查询域元数据
          search: {
            correspCode: "", //账单接收人编码
            inwardInd: "", //分入分出标识
            documentType: "", //保费/赔费
            dueDatesStart: "", //缴费截止日期起期
            dueDatesEnd: "", // 缴费截止日期止期
            billType: "", // 单据类型
            paymentMark: "", // 收付款标致 收款传00 付款传01
          },
          fields: [
            {
              labelKey: "缴费截止日期",
              prop: "dueDate",
            },
            {
              labelKey: "业务号",
              prop: "businessNo",
            },
            {
              labelKey: "单据号",
              prop: "billNo",
            },
            {
              labelKey: "币别",
              prop: "currency",
              format: {
                type: "ggcode",
                codeType: "Currency",
              },
            },
            {
              labelKey: "账单金额",
              prop: "amount",
            },
            {
              labelKey: "period",
              prop: "instalmentNo",
            },
            {
              labelKey: "可申请金额",
              prop: "outstanding",
            },
            // {
            //   //配置最后列按钮
            //   prop: "operation",
            //   labelKey: "operation",
            //   btns: [{
            //     btnKey: "任务列表",
            //     flag: "Add",
            //     type: "btn",
            //   }, ],
            // },
          ],
        },
        //  收款 新增查询页面
        table4: {
          basic: {
            api: "findBillOut", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          //查询域元数据
          search: {
            correspCode: "", //账单接收人编码
            inwardInd: "", //分入分出标识
            documentType: "", //保费/赔费
            dueDatesStart: "", //缴费截止日期起期
            dueDatesEnd: "", // 缴费截止日期止期
            billType: "", // 单据类型
            paymentMark: "", // 收付款标致 收款传00 付款传01
          },
          fields: [
            {
              labelKey: "缴费截止日期",
              prop: "dueDate",
            },
            {
              labelKey: "业务号",
              prop: "businessNo",
            },
            {
              labelKey: "单据号",
              prop: "billNo",
            },
            {
              labelKey: "币别",
              prop: "currency",
              format: {
                type: "ggcode",
                codeType: "Currency",
              },
            },
            {
              labelKey: "账单金额",
              prop: "amount",
            },
            {
              labelKey: "期次",
              prop: "instalmentNo",
            },
            {
              labelKey: "可申请金额",
              prop: "outstanding",
            },
            // {
            //   //配置最后列按钮
            //   prop: "operation",
            //   labelKey: "operation",
            //   btns: [{
            //     btnKey: "任务列表",
            //     flag: "Add",
            //     type: "btn",
            //   }, ],
            // },
          ],
        },
        // 收款基础信息
        // 付款
        isShow1: false,
        // 收款
        isShow3: false,
        isShow4: false,
        // 弹窗2 基础信息
        baseInfo2: {
          proposalNo: "", // 自保投保单号
          policyNo: "", // 自保保单号
          renewalSign: "", // 新保||续保
          previousPolicyNo: "", // 上年保单号
          renewalPolicyNo: "", // 续保保单号
          riskCode: "", // 自保险种
          upstreamSign: "U", // 上游下游
          riInward: "01", // 临分标志
          effectiveDate: "", // 保险起期 09-23-2020 15:46:22
          expiryDate: "", // 保险止期 09-23-2020 15:46:23
          underWritingYear: "", //  承保年度
          maintenancePeriods: [], // 维护期 maintenancePeriods maintenancePeriodStart
          discoveryPeriods: [], // 发现期
          testingPeriods: [], // 测试期
          insuranceDescription: "", // 保险期间描述
          handle: "王松", // 经办人
          handleCode: "123", // 经办人的代码
          underWriter: "王松2", // 承包人
          underwriterCode: "1234", // 承包人代码
          projectName: "项名名称", // 项名名称
          insured: "王松3", // 被保人
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
          currency: "CNY", // 本单币别 根据险种
          exchangeRate: 1, // 兑换率
          vatRate: 6, // 增值税税率
          vatSurchargeRate: 12, // 增值税附加税率
          commissionRate: 6, // 佣金率
          cedingCurrency: "CNY", // 原币单位 校验四兄弟
          cedingCompany: "", // 原保险人 校验四兄弟
          programmeCode: "", //方案code 新增 校验四兄弟
          projectCode: "", // 项目code 新能 校验四兄弟
          totalPremium: null, // 标的计算返回的值 自保保单总保费
          insuredValue: null, // 标的计算返回的值 自保总保额
          totalDue: null, // 标的计算返回的值 自保总分入净保费
          totalDueRi: null, // 标的计算返回的值 自保总分出净保费
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
        // 弹窗1 已选结果
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
        status: [
          {
            username: "E",
            id: 1,
          },
          {
            username: "P",
            id: 2,
          },
        ],
        //文档资料列表
        docList: [],
        isReadonly: false,
        Submit: false,
        // 弹窗2 新增
        isShow2: false,
        // 弹窗2 table
        // 弹窗2 分页
        currentPage: 0,
        pageSize: 10,
        cedingCompany: [], //账单日期
        projectNamelist: [],
        dialogFormVisible: false, //详情页面
        guFeetypeVos: [], // 单据类型
        workflowdialog: false, // 工作流
        checkboxGroup: [],
        taskObj: {},
        gwNextNodeExecutorsList: [],
        billtype: "", // 单据类型
      };
    },
    methods: {
      printTableVisible2(word) {
        console.log("word", word);
      },
      // 审核人员修改 付款
      getPolicyFeeInfo(applicationNo, paymentMark) {
        let that = this;
        let params = {
          applicationNo: applicationNo,
          paymentMark: paymentMark,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findPaymentDetail",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("res", res);
          if (res.resCode == "0000") {
            that.docList = res.resData.ggDocumentList;
            that.guPolicyVoListfukuan = res.resData.gpToPaymentVoList;
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
            if (that.paymentMark == "01") {
              that.baseInfo1 = res.resData.gpToPaymentVo;
              that.baseInfo1.baseInfoRule = baseInfoRule;
            } else {
              that.baseInfo12 = res.resData.gpToPaymentVo;
              that.baseInfo12.baseInfoRule = baseInfoRule;
            }
          } else {
            this.$message({
              showClose: true,
              message: res.resData,
              type: "warn",
            });
          }
        });
      },
      // 审核人员修改 收款
      getPolicyFeeInfo2(applicationNo, paymentMark) {
        let that = this;
        let params = {
          applicationNo: applicationNo,
          paymentMark: paymentMark,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findPaymentDetail",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("res", res);
          if (res.resCode == "0000") {
            that.baseInfo12 = res.resData.gpToPaymentVo;
            that.docList = res.resData.ggDocumentList;
            that.guPolicyVoListshoukuan = res.resData.gpToPaymentVoList;
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
            that.baseInfo12.baseInfoRule = baseInfoRule;
          } else {
            this.$message({
              showClose: true,
              message: res.resData,
              type: "warn",
            });
          }
        });
      },
      //提交成功工作流弹框
      WorkingNext() {
        var url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainpagetWorkNext",
          contextName: "selfins",
        });
        let params = {
          workFee: this.billtype,
          paymentMark: this.paymentMark,
          gwWorkTask: {},
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.workflowdialog = true;
              this.gwNextNodeExecutorsList = res.resData[0].mapList;
            }
          }
        });
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //如果是审核通过或者不通过
          if (this.check == "01" || this.check == "06") {
            if (this.check == "01") {
              var url = Vue.gvUtil.getUrl({
                apiName: "verifyGcClaimMainSelf",
                contextName: "selfins",
              });
            } else if (this.check == "06") {
              var url = Vue.gvUtil.getUrl({
                apiName: "notVerifyGcClaimMainSelf",
                contextName: "selfins",
              });
            }
          } else {
            // 不是审核 走普通提交
            this.submitByWS();
          }
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne"), //至少选择一个操作人
            type: "warning", // success
          });
        }
      },
      // 提交
      submitByWS() {
        let that = this;
        // that.taskObj={}
        let s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        let params = {
          paymentMark: that.paymentMark, //标志
          ggDocumentList: that.docList, //文件数组
          nextUserCode: s, //下级接点人
          gwWorkTask: that.taskObj, //工作流任务
        };
        // 付款
        if (that.paymentMark == "01") {
          delete that.baseInfo1.baseInfoRule;
          params.gpToPaymentVoList = that.guPolicyVoListfukuan; // 数组
          params.gpToPaymentVo = that.baseInfo1; //轧差后的对象
        }
        // 收款
        else if (that.paymentMark == "00") {
          delete that.baseInfo12.baseInfoRule;
          params.gpToPaymentVoList = that.guPolicyVoListshoukuan; // 数组

          params.gpToPaymentVo = that.baseInfo12; //轧差后的对象
        }

        let url = Vue.gvUtil.getUrl({
          apiName: "gppaymentsubmit",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("res", res);
          // that.taskObj = {}
          if (res.resCode == "0000") {
            this.$router.push({
              name: "workbenchApp",
            }); //跳转到工作台
          } else {
            that.$message({
              showClose: true,
              message: res.resData,
              type: "wraning",
            });
          }
        });
      },
      // 提交的时候判断是手段还是付款
      calfukuanOrcalshoukuan() {
        let that = this;
        that.paymentMark;
        if (that.paymentMark == "00") {
          this.calshoukuan();
        } else if (that.paymentMark == "01") {
          this.calfukuan();
        }
      },
      // 付款计算轧差
      calfukuan() {
        let that = this;
        let obj = {};
        Object.assign(obj, this.baseInfo1);
        delete obj.baseInfoRule;
        let params = {
          gpToPaymentVoList: this.guPolicyVoListfukuan,
          paymentMark: this.paymentMark,
          gpToPaymentVo: obj,
          auditStatu: "06",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "offsetCalculation",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("res", res);
          if (res.resCode == "0000") {
            that.baseInfo1 = res.resData;
            let baseInfoRule = {
              // 基础信息校验
              correspCode: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
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
            that.baseInfo1.baseInfoRule = baseInfoRule;
            // 弹出弹窗 获取后台返回单据类型
            that.billtype = res.resData.billType;
            that.WorkingNext();
          } else {
            that.$message({
              showClose: true,
              message: res.resData,
              type: "wraning",
            });
          }
        });
      },
      // 收款计算轧差
      calshoukuan() {
        let that = this;
        let obj = {};
        Object.assign(obj, this.baseInfo12);
        delete obj.baseInfoRule;
        let params = {
          gpToPaymentVoList: this.guPolicyVoListshoukuan,
          paymentMark: this.paymentMark,
          gpToPaymentVo: obj,
          auditStatu: "06",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "offsetCalculation",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          console.log("res", res);
          if (res.resCode == "0000") {
            that.baseInfo12 = res.resData;
            let baseInfoRule = {
              // 基础信息校验
              correspCode: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
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
            that.baseInfo12.baseInfoRule = baseInfoRule;
            // 弹出弹窗 获取后台返回单据类型
            that.billtype = res.resData.billType;
            that.WorkingNext();
          } else {
            that.$message({
              showClose: true,
              message: res.resData,
              type: "wraning",
            });
          }
        });
      },
      // 付款申请新增弹出页面
      openpaymentadd() {
        // 如果输入五项必选数据 才可打开新增单据查询页面
        if (
          this.baseInfo1.correspCode == "" ||
          this.baseInfo1.inwardInd == "" ||
          this.baseInfo1.documentType == ""
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("payment_cannotBeEmpty"), //账单接收人 分入/分出 保费/赔费 不能为空
            type: "warning", // success
          });
          return;
        }

        this.table2.search.correspCode = this.baseInfo1.correspCode; //账单接收人编码
        this.table2.search.inwardInd = this.baseInfo1.inwardInd; //分入分出标识
        this.table2.search.documentType = this.baseInfo1.documentType; //保费/赔费
        this.table2.search.dueDatesStart = this.baseInfo1.dueDatesStart; //缴费截止日期起期
        this.table2.search.dueDatesEnd = this.baseInfo1.dueDatesEnd; // 缴费截止日期止期
        this.table2.search.paymentMark = this.paymentMark; // 收付款标致 收款传00 付款传01
        // debugger
        this.isShow2 = true;
      },
      // 收款申请新增弹出页面
      openpaymentadd22() {
        // 如果输入五项必选数据 才可打开新增单据查询页面
        if (
          this.baseInfo1.correspCode == "" ||
          this.baseInfo1.inwardInd == "" ||
          this.baseInfo1.documentType == ""
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("payment_cannotBeEmpty"), //账单接收人 分入/分出 保费/赔费 不能为空
            type: "warning", // success
          });
          return;
        }

        this.table4.search.correspCode = this.baseInfo12.correspCode; //账单接收人编码
        this.table4.search.inwardInd = this.baseInfo12.inwardInd; //分入分出标识
        this.table4.search.documentType = this.baseInfo12.documentType; //保费/赔费
        this.table4.search.dueDatesStart = this.baseInfo12.dueDatesStart; //缴费截止日期起期
        this.table4.search.dueDatesEnd = this.baseInfo12.dueDatesEnd; // 缴费截止日期止期
        this.table4.search.paymentMark = this.paymentMark; // 收付款标致 收款传00 付款传01
        // debugger
        this.isShow4 = true;
      },
      // 添加 付款
      addData1() {
        let a = this.$refs.table2.getSelectData();
        console.log("添加 a", a);
        for (item of a) {
          item.EP = "01";
          item.isDisable = true;
        }
        this.guPolicyVoListfukuan = this.guPolicyVoListfukuan.concat(a);
        this.isShow2 = false;
      },
      // 添加 收款
      addData2() {
        let a = this.$refs.table4.getSelectData();
        console.log("添加 a", a);
        for (item of a) {
          item.EP = "01";
          item.isDisable = true;
        }

        this.guPolicyVoListshoukuan = this.guPolicyVoListshoukuan.concat(a);

        this.isShow4 = false;
      },

      removedata() {},

      // 申请状态-fukuan
      changeschemeName2(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.EP = e.codeCode;
        this.$set(that.guPolicyVoListfukuan, index, row);
      },
      // 申请状态-shoukuan
      changeschemeName3(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.EP = e.codeCode;
        this.$set(that.guPolicyVoListshoukuan, index, row);
      },
      // 付款申请状态
      PaymentApplicationStatusEvent() {},
      // 付款申请弹出页面
      openpayment() {
        this.isShow1 = true;
        this.paymentMark = "01";
      },
      // 收款确认弹出页面
      opengetment() {
        this.isShow3 = true;
        this.paymentMark = "00";
      },
      // 付款移除
      removefukuan(index) {
        this.guPolicyVoListfukuan.splice(index, 1);
      },
      // 收款移除
      removeshoukuan(index) {
        this.guPolicyVoListshoukuan.splice(index, 1);
      },
      // 分页查询
      onListBtn(row, type) {},
      // 付款查询
      onListBtn2(row, type) {
        console.log("row type", row, type);
      },
      // 付款 剩余金额
      getrestMoneyfukuan(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.availAmount = row.outstanding - e;
        this.$set(that.guPolicyVoListfukuan, index, row);
      },
      // 收款 剩余金额
      getrestMoneyshoukuan(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.availAmount = row.outstanding - e;
        this.$set(that.guPolicyVoListshoukuan, index, row);
      },
      // 收款查询
      BillTypelistchange(a) {
        if (a == "选项1" || a == "选项2") {
          this.cedingCompany = [];
          this.Biltime = true;
        } else {
          this.Biltime = false;
        }
      },
    },
    created() {
      let that = this;
      let url = Vue.gvUtil.getUrl({
        apiName: "findfeetypecode",
        contextName: "selfins",
      });
      let params = {
        feetypeCode: "",
        inwardInd: "I",
      };
      Vue.gvUtil.http.post(url, params).then((res) => {
        console.log("res", res);
        if (res.resCode == "0000") {
          console.log("单据类型", res);

          that.guFeetypeVos = res.resData.guFeetypeVos;
        }
      });
      Vue.gvUtil.initTranslation(
        "Currency",
        "InAndOut",
        "PaymentApplicationStatus"
      );
    },
    mounted() {
      // this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据

      if (this.$route.query.pageType == "amend") {
        // this.isLook = true
        console.log("查看", this.$route.query);
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        if (this.taskObj == null) {
          this.taskObj = {};
        }
        let obj = JSON.parse(this.taskObj.param1);
        console.log("taskobj obj", this.taskObj, obj);
        let applicationNo = obj.gpPaymentVo.applicationNo;
        this.paymentMark = obj.gpPaymentVo.paymentMark;
        if (obj.gpPaymentVo.paymentMark == "01") {
          this.getPolicyFeeInfo(applicationNo, this.paymentMark);
        } else if (obj.gpPaymentVo.paymentMark == "00") {
          this.getPolicyFeeInfo2(applicationNo, this.paymentMark);
        }
      }
    },
    events: {
      // 为表格表头添加星号样式
      must: function (obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      handleSelectionChange() {},
      // initPage() {},
      // selectall() {
      //   //搜索的下拉
      //   let url = Vue.gvUtil.getUrl({
      //     apiName: "policySelfMainfindList",
      //     contextName: "selfins",
      //   });
      //   Vue.gvUtil.http.post(url).then((res) => {
      //     if (res.resCode == "0000") {
      //       this.projectNamelist = res.resData;
      //     }
      //   });
      // },
    },
  });
});
