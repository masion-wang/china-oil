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
    find_other_list: "/gg_code/find_other_list", // 账单人名称
    getUserInfo: "/common/searchInfo", // 获取当前用户信息
    showPaymentMark: "/gppayment/showPaymentMark", // 判断付款还是收款
    printPDF: "/PDF/printPDF", // 下载pdf
    setBillMapping: "/gppayment/setBillMapping", // 带出账单数据映射
    gpbillmainfindBybusinessNo: "/gpbillmain/findBybusinessNo", // 获取业务号数组
    findBybusinessNo: "/gpbillmain/findBybusinessNo", // 业务号
    gppaymentbringOutDatas: "/gppayment/bringOutDatas", // 付款收款洗数据   gpToPaymentVoListOld  gpToPaymentVoListNew
  });
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "paymentrequestApp",
    components: {},
    datas: function () {
      // 双向绑定页面显示数据
      return {
        businessNolist: [],
        showCode: "",
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
            businessNo: "", // 业务号
          },
          fields: [
            {
              labelKey: "收付款申请号",
              // prop: "applicationNo",
              btns: [
                {
                  prop: "applicationNo",
                  flag: "view",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              labelKey: "项目名称",
              // correspondence correspCode
              prop: "projectName",
            },
            {
              labelKey: "凭证号",
              prop: "vercherNo",
              // btns: [{
              //   prop: "vercherNo",
              //   flag: "view",
              //   type: "a", //类型按钮 icon/a/btn
              // }, ],
            },
            {
              labelKey: "账单接收人",
              // correspondence correspCode
              prop: "correspondence",
            },
            {
              labelKey: "分入/分出",
              prop: "inwardIndName",
              // format: {
              //   type: "ggcode",
              //   codeType: "paymentInAndOut",
              // },
            },
            {
              labelKey: "保费/赔款", // ？？？
              prop: "documentTypeName",
            },
            {
              labelKey: "申请总金额",
              prop: "amount",
            },
            {
              labelKey: "收付款申请状态",
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
            // {
            //   labelKey: "预期付款日期", // ？？？
            //   prop: "expectedPayDate",
            // },
            {
              labelKey: "收付款日期", // ？？？
              prop: "payDate", // settledDate
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  btnKey: "taskList", //任务列表
                  flag: "operation",
                  type: "btn",
                },
              ],
            },
          ],
        },
        pageSub: [], // 分页集合
        // 付款和收款
        paymentMark: "",
        // 付款基础信息
        baseInfo1: {
          applicationNo: "", // 付款申请号
          voucherNo: "", // 凭证号
          correspCode: "", //        账单接收人编码
          Correspondence: "", // 账单接收人名称
          documentType: "02", // 保费/赔费
          inwardInd: "02", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          dueDatesEnd: "", // 缴费截止日期
          outstanding: "", // 申请总金额
          status: "", // 付款申请状态
          expectedPayDate: "", // 预期付款日期
          payDate: "",
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
          documentType: "02", // 保费/赔费
          inwardInd: "02", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          dueDatesEnd: "", // 缴费截止日期
          outstanding: "", // 申请总金额
          status: "", // 付款申请状态
          expectedPayDate: "", // 预期付款日期
          payDate: "", // 付款日期/收款日期
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
        status2: "", // 审核状态
        businessType2: "", // 保费 赔案
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
            businessNo: "", // 业务号
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
            businessNo: "", // 业务号
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
        businessNoArr: [], // 业务号
        workflowdialog: false, // 工作流
        checkboxGroup: [],
        taskObj: {},
        gwNextNodeExecutorsList: [],
        billtype: "", // 单据类型
        // 查看详情 付款
        baseInfo11: {
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
        // 查看详情 收款
        baseInfo122: {
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
        guPolicyVoListfukuan1: [],
        guPolicyVoListshoukuan2: [],
        lookfukuan: false,
        lookshoukuan: false,
        docList1: [],
        docList2: [],
        correspondenceList: [], // 账单人名称数组
        paymentMark2: "",
        applicationNo2: "",
      };
    },
    created() {
      this.businessNoSelect(); // 业务号
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
      let url3 = "product/common/searchInfo";
      Vue.gvUtil.http.get(url3).then((res) => {
        if (res.resCode == "0000") {
          console.log("集团个人信息", res.resData.userInfo.companyName); // 这是个数组
          let companyName = res.resData.userInfo.companyName;
          that.table.search.createBy = res.resData.userInfo.userName;
          let params3 = {
            companyName: companyName,
          };
          let url4 = Vue.gvUtil.getUrl({
            apiName: "showPaymentMark",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url4, params3).then((res) => {
            console.log("res", res);
            if (res.resCode == "0000") {
              console.log("判断", res.resData);
              that.showCode = res.resData;
            }
          });
        }
      });
      let url4 = Vue.gvUtil.getUrl({
        apiName: "gpbillmainfindBybusinessNo",
        contextName: "selfins",
      });
      let params4 = {
        businessNo: "",
      };
      Vue.gvUtil.http.post(url4, params4).then((res) => {
        if (res.resCode == "0000") {
          console.log("业务号数组", res.resData); // 这是个数组
          that.businessNoArr = res.resData;
        }
      });
      Vue.gvUtil.initTranslation(
        "Currency",
        "InAndOut",
        "PaymentApplicationStatus"
      );
    },
    methods: {
      // 查看详情
      onListBtn(row, type) {
        console.log("row type", type, row, row.paymentMark);
        let paymentMark = row.paymentMark;
        let applicationNo = row.applicationNo;
        this.paymentMark2 = paymentMark;
        this.applicationNo2 = applicationNo;
        if (type == "operation") {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
        } else {
          // 查看付款
          if (paymentMark == "01") {
            this.lookfukuan = true;
            this.getlookdata(applicationNo, paymentMark);
          }
          // 查看收款
          else if (paymentMark == "00") {
            this.lookshoukuan = true;
            this.getlookdata(applicationNo, paymentMark);
          }
        }
      },
      businessNoSelect() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findBybusinessNo",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            businessNo: "",
          })
          .then((res) => {
            if (res.resCode === "0000") {
              console.log("业务号", res);

              this.businessNolist = res.resData;
            }
          });
      },
      // 打印 收款权限的人showCode==00 审核通过status2=='01' 可以打印
      // businessType2保费(世涛) 赔案(佳豪) 保费 02 赔案01
      dayin() {
        let that = this;
        console.log(
          "showCode status2 businessType2",
          this.showCode,
          this.status2,
          this.businessType2
        );
        // 保费
        let params = {};
        if (this.businessType2 == "02") {
          params = {
            templateName: "PremiumWorksheet-Premium",
            paymentMarK: this.paymentMark2,
            // gwWorkTask: that.taskObj,
            applicationNo: this.applicationNo2,
            isEmail: false,
          };
        }
        // 赔案
        else if (this.businessType2 == "01") {
          params = {
            templateName: "PremiumWorksheet-Claims",
            isEmail: false,
            paymentMarK: this.paymentMark2,
            // gwWorkTask: that.taskObj,
            applicationNo: this.applicationNo2,
          };
        }
        let url = Vue.gvUtil.getUrl({
          apiName: "printPDF",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            // 保费
            if (that.businessType2 == "02") {
              Vue.gvUtil.resolveBlob(res, "保费.pdf");
            }
            // 赔案
            else if (that.businessType2 == "01") {
              Vue.gvUtil.resolveBlob(res, "赔案.pdf");
            }
          });
      },
      // 查看付款 收款
      getlookdata(applicationNo, paymentMark) {
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
            if (paymentMark == "01") {
              that.baseInfo11 = res.resData.gpToPaymentVo;
              that.status2 = res.resData.gpToPaymentVo.status;
              that.businessType2 = res.resData.gpToPaymentVo.documentType;
              that.docList1 = res.resData.ggDocumentList;

              that.guPolicyVoListfukuan1 = res.resData.gpToPaymentVoList;
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
              that.baseInfo11.baseInfoRule = baseInfoRule;
            } else if (paymentMark == "00") {
              that.baseInfo122 = res.resData.gpToPaymentVo;
              that.status2 = res.resData.gpToPaymentVo.status;
              that.docList2 = res.resData.ggDocumentList;
              that.businessType2 = res.resData.gpToPaymentVo.documentType;
              that.guPolicyVoListshoukuan2 = res.resData.gpToPaymentVoList;
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
              that.baseInfo122.baseInfoRule = baseInfoRule;
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
      //提交成功工作流弹框
      WorkingNext() {
        var url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainpagetWorkNext",
          contextName: "selfins",
        });
        let params = {
          // 001 212 383 500 699
          workFee: this.billtype,
          paymentMark: this.paymentMark,
          gwWorkTask: {},
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.workflowdialog = true;
              if (res.resData[0].mapList) {
                this.gwNextNodeExecutorsList = res.resData[0].mapList;
              } else {
                this.gwNextNodeExecutorsList = res.resData;
              }
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
        let s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        let params = {
          paymentMark: that.paymentMark, //标志
          ggDocumentList: that.docList, //文件数组
          nextUserCode: s, //下级接点人
          gwWorkTask: that.taskObj, //工作流任务
          submitMark: "01",
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
          if (res.resCode == "0000") {
            that.taskObj = {}; // 提交完以后清空工作流数据
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
      // 付款计算轧差
      calfukuan() {
        let that = this;
        if (
          this.baseInfo1.expectedPayDate == "" ||
          this.baseInfo1.inwardInd == "" ||
          this.baseInfo1.documentType == ""
        ) {
          that.$message({
            showClose: true,
            message: "保费/赔费 分入/分出 预期付款日期不能为空",
            type: "wraning",
          });
          return;
        }
        delete this.baseInfo1.baseInfoRule;
        let params = {
          gpToPaymentVoList: this.guPolicyVoListfukuan,
          gpToPaymentVo: this.baseInfo1,
          paymentMark: this.paymentMark,
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
        if (
          this.baseInfo12.expectedPayDate == "" ||
          this.baseInfo12.inwardInd == "" ||
          this.baseInfo12.documentType == ""
        ) {
          that.$message({
            showClose: true,
            message: "保费/赔费 分入/分出 预期付款日期不能为空",
            type: "wraning",
          });
          return;
        }
        delete this.baseInfo12.baseInfoRule;
        let params = {
          gpToPaymentVoList: this.guPolicyVoListshoukuan,
          gpToPaymentVo: this.baseInfo12,
          paymentMark: this.paymentMark,
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
        // 如果输入五项必选数据 才可打开新增单据查询页面 预期付款日期
        if (
          this.baseInfo1.inwardInd == "" ||
          this.baseInfo1.documentType == ""
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("payment_cannotBeEmpty2"), //分入/分出 保费/赔费 不能为空
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
          this.baseInfo12.inwardInd == "" ||
          this.baseInfo12.documentType == ""
        ) {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("payment_cannotBeEmpty2"), //分入/分出 保费/赔费 不能为空
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
        let that = this;
        let a = this.$refs.table2.getSelectData();
        console.log("添加 a", a);
        for (item of a) {
          item.EP = "01";
          item.isDisable = true;
        }

        let params = {
          gpToPaymentVoListOld: that.guPolicyVoListfukuan,
          gpToPaymentVoListNew: a,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "gppaymentbringOutDatas",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("付款洗一遍数据", res.resData);

            that.guPolicyVoListfukuan = res.resData;
          }
        });
        // let params = {
        //   gpToPaymentVoList: a, //为勾选新增的数据
        //   paymentMark: this.paymentMark //收款或者付款标识
        // }
        // let url = Vue.gvUtil.getUrl({
        //   apiName: "setBillMapping",
        //   contextName: "selfins",
        // });
        // Vue.gvUtil.http.post(url, params).then((res) => {
        //   if (res.resCode == "0000") {
        //     console.log('付款洗一遍数据', res.resData)
        //     // that.guPolicyVoListfukuan.concat(res.resData)
        //     that.guPolicyVoListfukuan = res.resData
        //   }
        // });
        // this.guPolicyVoListfukuan = this.guPolicyVoListfukuan.concat(a)
        this.isShow2 = false;
        // this.$refs.table2.clearSelection()
      },
      // 添加 收款
      addData2() {
        let that = this;
        let a = this.$refs.table4.getSelectData();
        console.log("添加 a", a);
        for (item of a) {
          item.EP = "01";
          item.isDisable = true;
        }
        let params = {
          gpToPaymentVoListOld: that.guPolicyVoListshoukuan,
          gpToPaymentVoListNew: a,
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "gppaymentbringOutDatas",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log("付款洗一遍数据", res.resData);

            that.guPolicyVoListshoukuan = res.resData;
          }
        });

        // let params = {
        //   gpToPaymentVoList: a, //为勾选新增的数据
        //   paymentMark: this.paymentMark //收款或者付款标识
        // }
        // let url = Vue.gvUtil.getUrl({
        //   apiName: "setBillMapping",
        //   contextName: "selfins",
        // });
        // Vue.gvUtil.http.post(url, params).then((res) => {
        //   if (res.resCode == "0000") {
        //     console.log('收款洗一遍数据', res.resData)
        //     // that.guPolicyVoListshoukuan.concat(res.resData)
        //     that.guPolicyVoListshoukuan = res.resData

        //   }
        // });

        // this.guPolicyVoListshoukuan = this.guPolicyVoListshoukuan.concat(a)

        this.isShow4 = false;
        console.log(" this.$refs", this.$refs);
        // this.$refs.table4.clearSelection()
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
      // 付款查询
      onListBtn2(row, type) {
        console.log("row type", row, type);
      },
      // 付款 剩余金额
      getrestMoneyfukuan(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.availAmount = row.outstanding - e;
        row.availAmount = Number(row.availAmount.toFixed(2));
        this.$set(that.guPolicyVoListfukuan, index, row);
      },
      // 收款 剩余金额
      getrestMoneyshoukuan(e, row, index) {
        console.log("看看", e, row, index);
        let that = this;
        row.availAmount = row.outstanding - e;
        row.availAmount = Number(row.availAmount.toFixed(2));
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
    mounted() {
      this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
      if (this.taskObj == null) {
        this.taskObj = {};
      }
      console.log("taskobj", this.taskObj);
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
