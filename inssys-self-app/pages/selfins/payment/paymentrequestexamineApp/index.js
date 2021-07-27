/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi({
    findPaymentDetail: "/gppayment/findPaymentDetail", // 详情接口
    policySelfMainpagetWorkNext: "/gppayment/getWorkNext", //工作流弹框
    findfeetypecode: "/guFeetype/findfeetypecode", // 单据类型
    gppaymentsubmit: "/gppayment/submit", // 提交
    audit: "/gppayment/audit", // 审核通过 驳回
  });
  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentrequestApp",
    components: {},
    datas: function () {
      // 双向绑定页面显示数据
      return {
        cedingCompany: [], //账单日期
        projectNamelist: [],
        dialogFormVisible: false, //详情页面
        // 弹窗1
        isShow1: false,
        // 基础信息
        baseInfo1: {
          applicationNo: "", // 付款申请号
          voucherNo: "", // 凭证号
          correspCode: "", //        账单接收人编码
          Correspondence: "", // 账单接收人名称
          documentType: "", // 保费/赔费
          inwardInd: "", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          duDatesEnd: "", // 缴费截止日期
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
        baseInfo12: {
          applicationNo: "", // 付款申请号
          voucherNo: "", // 凭证号
          correspCode: "", //        账单接收人编码
          Correspondence: "", // 账单接收人名称
          documentType: "", // 保费/赔费
          inwardInd: "", // 分入分出
          dueDatesStart: "", // 缴费截止日期
          duDatesEnd: "", // 缴费截止日期
          outstanding: "", // 申请总金额
          status: "", // 付款申请状态
          expectedPayDate: "", // 预期付款日期
          padDate: "", // 收款日期
          createBy: "", //                 创建人
          auditBy: "", //                 审核人
          updateBy: "", //              修改人
          createDate: "", //                 创建时间
          auditDate: "", //                审核时间
          updateDate: "", //                修改时间
          note: "", // 备注
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
        //  已选结果
        guPolicyVoList: [],
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
        isLook: false,
        currentPage: 0,
        pageSize: 10,
        workflowdialog: false,
        gwNextNodeExecutorsList: [],
        checkboxGroup: [],
        taskObj: {},
        paymentMark: "",
        check: "",
        guFeetypeVos: [],
      };
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
    },
    mounted: function () {
      console.log("审核人员选中返回来的数据", this.$route.query);
      // 修改
      // if (this.$route.query.flag == "add") {
      //   // let id = this.$route.query.row[0].id
      //   // let versionNo = this.$route.query.row[0].versionNo
      //   // this.status = 'Approve'
      //   this.$refs.baseInfo.getPolicyFeeInfo('add')

      //   // this.$refs.baseInfo.status = 'add'

      // }
      // 审核 工作流待处理
      if (this.$route.query.pageType == "task") {
        console.log("审核", this.$route.query);
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let obj = JSON.parse(this.taskObj.param1);
        console.log("taskobj obj", this.taskObj, obj);
        let applicationNo = obj.gpPaymentVo.applicationNo;
        this.paymentMark = obj.gpPaymentVo.paymentMark;
        this.getPolicyFeeInfo2(applicationNo, this.paymentMark);
        // let converCurrency = this.$route.query.row[0].converCurrency
        // let batchNo = this.$route.query.row[0].batchNo
        // let proposalNo = this.$route.query.row[0].proposalNo
        // let versionNo = this.$route.query.row[0].versionNo
        // this.status= 'modify'
        // this.$refs.baseInfo.getPolicyFeeInfo2(id, converCurrency,batchNo,"Approve")
        // this.$refs.baseInfo.status = 'Approve'
      }
      // 查看  工作流已经处理
      else if (this.$route.query.pageType == "back") {
        this.isLook = true;
        console.log("查看", this.$route.query);
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let obj = JSON.parse(this.taskObj.param1);
        console.log("taskobj obj", this.taskObj, obj);
        let applicationNo = obj.gpPaymentVo.applicationNo;
        this.paymentMark = obj.gpPaymentVo.paymentMark;
        this.getPolicyFeeInfo3(applicationNo, this.paymentMark);
      }
    },
    methods: {
      //返回
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
      PaymentApplicationStatusEvent() {},
      // 审核 from 工作流 获取详情
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
            // that.baseInfo = res.resData.gpToPaymentVo
            that.docList = res.resData.ggDocumentList;
            that.guPolicyVoList = res.resData.gpToPaymentVoList;
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
      // 查看 from 工作流 获取详情
      getPolicyFeeInfo3(applicationNo, paymentMark) {
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
            // that.baseInfo = res.resData.gpToPaymentVo
            that.docList = res.resData.ggDocumentList;
            that.guPolicyVoList = res.resData.gpToPaymentVoList;
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
      //提交成功工作流弹框
      WorkingNext() {
        let that = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainpagetWorkNext",
          contextName: "selfins",
        });
        let params = {
          // workFee: this.baseInfo.billType,
          paymentMark: this.paymentMark,
          gwWorkTask: this.taskObj,
        };
        if (that.paymentMark == "01") {
          params.workFee = this.baseInfo1.billType;
        } else {
          params.workFee = this.baseInfo12.billType;
        }
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              that.workflowdialog = true;
              that.gwNextNodeExecutorsList = res.resData[0].mapList;
            }
            // 如果为零 直接审核通过接口
            else if (res.resData.length == 0) {
              that.goAudit("01");
            }
          }
        });
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          this.goAudit("01");
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne"), //至少选择一个操作人
            type: "warning", // success
          });
        }
      },
      // 审核不通过 通过
      goAudit(code) {
        let that = this;
        let approveFlag = code; //  01 审核通过 06 审核不通过

        this.$refs.auditInfo.validate((valid) => {
          if (valid) {
            let url = Vue.gvUtil.getUrl({
              apiName: "audit",
              contextName: "selfins",
            });
            let params = {
              gpToPaymentVoList: that.guPolicyVoList, //数组
              auditStatu: approveFlag, //审核状态;
              opinions: that.auditInfo.approvedRemark, //审核意见;
              // gpToPaymentVo: that.baseInfo,
              gwWorkTask: that.taskObj,
              paymentMark: that.paymentMark,
            };
            if (that.paymentMark == "01") {
              delete that.baseInfo1.baseInfoRule;
              params.gpToPaymentVo = that.baseInfo1;
            } else {
              delete that.baseInfo12.baseInfoRule;
              params.gpToPaymentVo = that.baseInfo12;
            }

            console.log("触发审核接口", params);
            Vue.gvUtil.http.post(url, params).then((res) => {
              console.log("结果", res);
              that.destroyed();
              this.$router.push({
                name: "workbenchApp",
              }); //跳转到工作台
            });
          }
        });
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
          // that.taskObj = {}
          that.destroyed();
          console.log("res", res);
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
      destroyed() {
        if (sessionStorage.getItem("taskObj")) {
          sessionStorage.removeItem("taskObj");
        }
      },
      //审核轨迹
      path() {
        let row = this.taskObj;
        Vue.gvUtil.showTrail({
          innerRefNo: row, //内部参考号
        });
      },
      // 付款table里面的按钮
      onListBtn(row, type) {},
      // 付款申请弹出页面
      openpayment() {
        this.isShow1 = true;
      },
      // 付款申请新增弹出页面
      openpaymentadd() {
        this.isShow2 = true;
      },
      // 查询新增弹出页面 清单导出
      openpaymentadd2() {},
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
