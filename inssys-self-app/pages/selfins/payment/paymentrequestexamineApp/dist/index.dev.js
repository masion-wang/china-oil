"use strict";

/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html"); // 引入API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  // 注册API


  Vue.gvUtil.setApi({
    findPaymentDetail: '/gppayment/findPaymentDetail',
    // 详情接口
    audit: '/gppayment/audit' // 审核通过 驳回 

  });
  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentrequestApp",
    components: {},
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        cedingCompany: [],
        //账单日期
        projectNamelist: [],
        dialogFormVisible: false,
        //详情页面
        // 弹窗1
        isShow1: false,
        // 基础信息
        baseInfo: {
          applicationNo: '',
          // 付款申请号
          voucherNo: "",
          // 凭证号
          correspCode: '',
          //        账单接收人编码     
          Correspondence: '',
          // 账单接收人名称 
          businessType: "",
          // 保费/赔费
          inwardInd: '',
          // 分入分出
          dueDatesStart: '',
          // 缴费截止日期
          duDatesEnd: '',
          // 缴费截止日期
          outstanding: '',
          // 申请总金额
          status: '',
          // 付款申请状态
          expectedPayDate: '',
          // 预期付款日期
          createBy: '',
          //                 创建人   
          auditBy: '',
          //                 审核人   
          updateBy: '',
          //              修改人 
          createDate: '',
          //                 创建时间            
          auditDate: '',
          //                审核时间                     
          updateDate: '',
          //                修改时间        
          note: '',
          // 备注
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
        },
        //  已选结果
        guPolicyVoList: [],
        // 8.审核
        auditInfo: {
          approvedRemark: ""
        },
        rules: {
          approvedRemark: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }]
        },
        // 弹窗1 已选结果
        fromData: {
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
        },
        status: [{
          username: 'E',
          id: 1
        }, {
          username: 'P',
          id: 2
        }],
        //文档资料列表
        docList: [],
        isReadonly: false,
        Submit: false,
        // 弹窗2 新增
        isShow2: false,
        // 弹窗2 table
        // 弹窗2 分页
        currentPage: 0,
        pageSize: 10
      };
    },
    mounted: function mounted() {
      console.log('审核人员选中返回来的数据', this.$route.query); // 增加

      if (this.$route.query.flag == "add") {
        // let id = this.$route.query.row[0].id
        // let versionNo = this.$route.query.row[0].versionNo
        // this.status = 'Approve'
        this.$refs.baseInfo.getPolicyFeeInfo('add'); // this.$refs.baseInfo.status = 'add'
      } // 审核
      else if (this.$route.query.flag == "Approve") {
          console.log('审核', this.$route.query);
          var applicationNo = this.$route.query.row[0].applicationNo;
          this.getPolicyFeeInfo2(applicationNo); // let converCurrency = this.$route.query.row[0].converCurrency
          // let batchNo = this.$route.query.row[0].batchNo
          // let proposalNo = this.$route.query.row[0].proposalNo
          // let versionNo = this.$route.query.row[0].versionNo
          // this.status= 'modify'
          // this.$refs.baseInfo.getPolicyFeeInfo2(id, converCurrency,batchNo,"Approve")
          // this.$refs.baseInfo.status = 'Approve'
        } // 查看
        else if (this.$route.query.flag == "Look") {// console.log('跳转的修改')
            // let proposalNo = this.$route.query.row.proposalNo
            // let versionNo = this.$route.query.row.versionNo
            // this.status = 'Look'
            // this.$refs.baseInfo.getPolicyFeeInfo3(proposalNo, versionNo, 'Look')
          }
    },
    events: {
      // 为表格表头添加星号样式
      must: function must(obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2) {
          return "must";
        }
      },
      handleSelectionChange: function handleSelectionChange() {} // initPage() {},
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
    methods: {
      getPolicyFeeInfo2: function getPolicyFeeInfo2(applicationNo) {
        var _this = this;

        var that = this;
        var params = {
          applicationNo: applicationNo
        };
        var url = Vue.gvUtil.getUrl({
          apiName: "findPaymentDetail",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          console.log("res", res);

          if (res.resCode == "0000") {
            that.baseInfo = res.resData.gpToPaymentVo;
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
            that.baseInfo.baseInfoRule = baseInfoRule;
            that.guPolicyVoList = res.resData.gpToPaymentVoList;
          } else {
            _this.$message({
              showClose: true,
              message: res.resData,
              type: 'warn'
            });
          }
        });
      },
      // 审核通过 不通过
      goAudit: function goAudit(code) {
        var that = this;
        var approveFlag = code; //  01 审核通过 06 审核不通过

        this.$refs.auditInfo.validate(function (valid) {
          if (valid) {
            var url = Vue.gvUtil.getUrl({
              apiName: "audit",
              contextName: "selfins"
            });
            var params = {
              gpToPaymentVoList: that.guPolicyVoList,
              //数组
              auditStatu: approveFlag,
              //审核状态;
              opinions: that.auditInfo.approvedRemark //审核意见;

            };
            console.log('触发审核接口', params);
            Vue.gvUtil.http.post(url, params).then(function (res) {
              console.log('结果', res); // 跳转保批单查询页面
              // this.$router.push({
              //   name: "inquiryApp",
              // });
            });
          }
        });
      },
      //审核轨迹
      path: function path() {},
      // 付款table里面的按钮
      onListBtn: function onListBtn(row, type) {},
      // 付款申请弹出页面
      openpayment: function openpayment() {
        this.isShow1 = true;
      },
      // 付款申请新增弹出页面
      openpaymentadd: function openpaymentadd() {
        this.isShow2 = true;
      },
      // 查询新增弹出页面 清单导出
      openpaymentadd2: function openpaymentadd2() {}
    }
  });
});