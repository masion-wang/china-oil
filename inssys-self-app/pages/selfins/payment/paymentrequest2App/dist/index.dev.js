"use strict";

/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  // 引入API
  var reuqireConfig = require("./index.config.js"); // let config = reuqireConfig.config;
  // 注册API

  Vue.gvUtil.setApi({
    findGpPayment: "/gppayment/findGpPayment",
    // 分页查询1
    findBillOut: "/gppayment/findBillOut",
    // 分页查询2
    addGpPayment: "/gppayment/addGpPayment",
    // 新增接口
    submit: "/gppayment/submit", // 提交
  });
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "paymentrequestApp",
    components: {},
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        // 分页查询1
        table: {
          basic: {
            api: "findGpPayment",
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
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          //查询域元数据
          search: {
            applicationNo: "",
            //付款申请号
            correspondence: "",
            //账单接收人
            createBy: "",
            //创建人
            vercherNo: "",
            //凭证号
            createDatesStart: "",
            // 创建日期
            createDatesEnd: "",
            // 创建日期
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
              labelKey: "保费/赔款",
              // ？？？
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
              labelKey: "预期付款日期",
              // ？？？
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
        // 分页查询2
        table2: {
          basic: {
            api: "findBillOut",
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
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          //查询域元数据
          search: {
            correspCode: "",
            //账单接收人编码
            inwardInd: "",
            //分入分出标识
            BillingType: "",
            //保费/赔费
            dueDatesStart: "",
            //缴费截止日期起期
            dueDatesEnd: "",
            // 缴费截止日期止期
            DocumentType: "", // 单据类型
          },
          fields: [
            {
              labelKey: "账单日期",
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
              labelKey: "票单金额",
              prop: "amount",
            },
            {
              labelKey: "期次",
              prop: "instalmentNo",
            },
            {
              labelKey: "可申请金额",
              prop: "outstanding",
            }, // {
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
        // 弹窗1 基础信息
        baseInfo: {
          applicationNo: "",
          // 付款申请号
          voucherNo: "",
          // 凭证号
          correspCode: "",
          //        账单接收人编码
          Correspondence: "",
          // 账单接收人名称
          businessType: "",
          // 保费/赔费
          inwardInd: "",
          // 分入分出
          dueDatesStart: "",
          // 缴费截止日期
          duDatesEnd: "",
          // 缴费截止日期
          outstanding: "",
          // 申请总金额
          status: "",
          // 付款申请状态
          expectedPayDate: "",
          // 预期付款日期
          createBy: "",
          //                 创建人
          auditBy: "",
          //                 审核人
          updateBy: "",
          //              修改人
          createDate: "",
          //                 创建时间
          auditDate: "",
          //                审核时间
          updateDate: "",
          //                修改时间
          note: "",
          // 备注
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
        guPolicyVoList: [
          // {
          //   EP: "01",
          //   amount: 100,
          //   applicationNo: null,
          //   applicationsAmount: 100,
          //   approvedDate: null,
          //   availAmount: null,
          //   balance: -100,
          //   billNo: "DN20B011-R",
          //   billType: "212",
          //   branch: "CIL",
          //   businessNo: "ZBPLOOPD2020000001",
          //   businessType: "02",
          //   claimNo: null,
          //   clearInd: "0",
          //   correspCode: null,
          //   correspondence: null,
          //   createBy: null,
          //   createDate: null,
          //   currency: "001",
          //   dateOfPaymentEnd: null,
          //   dateOfPaymentStart: null,
          //   deposit: 100,
          //   description: "policy",
          //   documentType: "02",
          //   dueDate: "07-12-2020",
          //   dueDates: null,
          //   dueDatesEnd: null,
          //   dueDatesStart: null,
          //   expectedPayDate: null,
          //   gpPaymentList: null,
          //   hkAmount: null,
          //   instalment: 1,
          //   instalmentNo: 1,
          //   inwardInd: "O",
          //   isDisable: true,
          //   outstanding: 100,
          //   payableDetails: null,
          //   policyNo: "ZBPLOOPD2020000001",
          //   postedDate: null,
          //   postedStatus: null,
          //   rate: 1,
          //   registerNo: null,
          //   selfAmount: 100,
          //   settledAmount: 0,
          //   status: "00",
          //   vercherDate: null,
          //   version: "000",
          //   voucherNo: null,
          //   withdrawal: 0
          // },
          // {
          //   createDate: '', //创建日期
          //   businessNo: '', //业务号
          //   billType: '', //单据类型
          //   billNo: '', //单据号
          //   currency: '', //币别
          //   amount: '', //账单金额
          //   instalmentNo: '', //期次
          //   outstanding: '', //未清金额 (可申请金额)
          //   EP: "01", // 申请状态
          //   applicationsAmount: '', //申请金额
          //   businessType: '', //业务类型
          //   documentType: '', //账单类型
          //   inwardInd: '', //分入分出
          //   correspCode: '', //账单接收人编码
          //   correspondence: '', //账单接收人名称
          //   dueDate: '', //缴费截止日期
          //   currency: '', //账单币别
          //   settledAmount: '', //已结金额
          //   balance: '', //余额
          //   selfAmount: '', //本位币金额
          //   rate: '', //兑换率
          //   approvedDate: '', //业务审核通过日期
          //   applicationNo: '', //付款申请号
          //   availAmount: '' //剩余申请金额
          // }
        ],
        // 弹窗1
        isShow1: false,
        // 弹窗2 基础信息
        baseInfo2: {
          proposalNo: "",
          // 自保投保单号
          policyNo: "",
          // 自保保单号
          renewalSign: "",
          // 新保||续保
          previousPolicyNo: "",
          // 上年保单号
          renewalPolicyNo: "",
          // 续保保单号
          riskCode: "",
          // 自保险种
          upstreamSign: "U",
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
          handle: "王松",
          // 经办人
          handleCode: "123",
          // 经办人的代码
          underWriter: "王松2",
          // 承包人
          underwriterCode: "1234",
          // 承包人代码
          projectName: "项名名称",
          // 项名名称
          insured: "王松3",
          // 被保人
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
          currency: "CNY",
          // 本单币别 根据险种
          exchangeRate: 1,
          // 兑换率
          vatRate: 6,
          // 增值税税率
          vatSurchargeRate: 12,
          // 增值税附加税率
          commissionRate: 6,
          // 佣金率
          cedingCurrency: "CNY",
          // 原币单位 校验四兄弟
          cedingCompany: "",
          // 原保险人 校验四兄弟
          programmeCode: "",
          //方案code 新增 校验四兄弟
          projectCode: "",
          // 项目code 新能 校验四兄弟
          totalPremium: null,
          // 标的计算返回的值 自保保单总保费
          insuredValue: null,
          // 标的计算返回的值 自保总保额
          totalDue: null,
          // 标的计算返回的值 自保总分入净保费
          totalDueRi: null,
          // 标的计算返回的值 自保总分出净保费
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
          guPolicyRiVoList: [],
          // 数据源
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
        cedingCompany: [],
        //账单日期
        projectNamelist: [],
        dialogFormVisible: false,
        //详情页面
        BillTypelist: [
          //单据类型下拉
          {
            value: "选项1",
            label: "承保保费",
          },
          {
            value: "选项2",
            label: "承保费用",
          },
          {
            value: "选项3",
            label: "其他",
          },
        ],
      };
    },
    methods: {
      // 审核
      audit: function audit() {
        var a = this.$refs.table.getSelectData();
        console.log("a", a);

        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].status == "11") {
            this.$router.push({
              name: "paymentrequestexamineApp",
              query: {
                row: a,
                flag: "Approve",
              },
            });
          } else {
            Vue.gvUtil.message("该条数据不可审核");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 分页1
      onListBtn: function onListBtn(row, type) {},
      // 分页2
      onListBtn2: function onListBtn2(row, type) {
        console.log("row type", row, type);
      },
      // 添加
      addData: function addData() {
        var a = this.$refs.table2.getSelectData();
        console.log("添加 a", a);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = a[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            item = _step.value;
            item.EP = "01";
            item.isDisable = true;
          }
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

        this.guPolicyVoList = this.guPolicyVoList.concat(a);
        this.isShow2 = false;
      },
      // 提交
      submitByWS: function submitByWS() {
        var _this = this;

        var that = this;
        var obj = this.baseInfo;
        delete obj.baseInfoRule;
        var params = {
          gpToPaymentVo: this.baseInfo,
          gpToPaymentVoList: this.guPolicyVoList,
          ggDocumentList: [],
        };
        var url = Vue.gvUtil.getUrl({
          apiName: "submit",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            that.isShow1 = false;
            var baseInfoRule = {
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
            _this.baseInfo.baseInfoRule = baseInfoRule;
          } else {
            that.$message({
              showClose: true,
              message: res.resData,
              type: "wraning",
            });
          }
        });
      },
      // 付款申请弹出页面
      openpayment: function openpayment() {
        this.isShow1 = true;
      },
      // 付款申请新增弹出页面
      openpaymentadd: function openpaymentadd() {
        this.isShow2 = true;
      },
      // 查询新增弹出页面 清单导出
      openpaymentadd2: function openpaymentadd2() {},
      BillTypelistchange: function BillTypelistchange(a) {
        if (a == "选项1" || a == "选项2") {
          this.cedingCompany = [];
          this.Biltime = true;
        } else {
          this.Biltime = false;
        }
      },
      // 申请状态
      changeschemeName2: function changeschemeName2(e, row, index) {
        console.log("看看", e, row, index);
        var that = this;
        row.EP = e.codeCode; // let obj = that.guPolicyVoList[index]

        this.$set(that.guPolicyVoList, index, row); // console.log('that.guPolicyVoList',that.guPolicyVoList)
        // this.$nextTick(() => {
        // that.guPolicyVoList[index].EP = e.codeCode
        // })
        // if (e.codeCode == '02') {
        //   this.$nextTick(() => {
        //     that.guPolicyVoList[index].isDisable = false
        //   })
        // } else if (e.codeType == '01') {
        //   this.$nextTick(() => {
        //     that.guPolicyVoList[index].isDisable = true
        //   })
        // }
      },
      // 付款申请状态
      PaymentApplicationStatusEvent:
        function PaymentApplicationStatusEvent() {},
    },
    created: function created() {
      Vue.gvUtil.initTranslation(
        "Currency",
        "InAndOut",
        "PaymentApplicationStatus"
      );
    },
    events: {
      // 为表格表头添加星号样式
      must: function must(obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      handleSelectionChange: function handleSelectionChange() {}, // initPage() {},
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
