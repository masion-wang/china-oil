/**
 * 索赔查看处理页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var BaseInfo = require("./components/baseInfo"),
    PolicyInfo = require("./components/policyInfo"),
    DocList = require("./components/docList"),
    LossInfo = require("./components/lossInfo"),
    LossAdjustingInfo = require("./components/lossAdjustingInfo"),
    ClaimInfo = require("./components/claimInfo"),
    ReopenInfo = require("./components/reopenInfo"),
    CancelRecovery = require("./components/cancelRecovery"),
    OtherReview = require("./components/otherReview");
  var config = {
    api: {
      getClaimInfo: "/claim/claim/pre_search",
      auditAdjustment: "/claim/claim/audit_adjustment",
      claimDocument: "/claim/claim/document",
      claimNotion: "/claim/claim/claim_notion",
      getPolicyDeductible: "/policy/getPolicyDeductible",
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "claimViewApp",
    shareStore: function () {
      return {
        baseInfoForm: null,
        tableData: null,
      };
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        activeNames: [
          "lossAdviceInfo",
          "lossInfo",
          "lossAdjustingInfo",
          "claimInfo",
          "docInfo",
          "otherReview",
        ],
        //基本信息表单
        baseInfoForm: {
          updateTime: "", //更新时间
          claimNotificationNo: "", //出险通知单号
          insuredCompanyName: "", //投保单位名称
          insuredCompanyCode: "", //投保单位代码
          lossDate: "", //出险时间
          catastropheCode: "", //巨灾代码
          submitterName: "", //提交人名称
          submitterCode: "", //提交人代码
          submissionDate: "", //提交时间
          createTime: "", //创建时间
          claimNotificationStatus: "01", //出险通知状态
          approvedName: "", //审核人名称
          approvedCode: "", //审核人代码
          approvalDate: "", //审核日期
          lossDescription: "", //出险描述
          remark: "", //备注
        },
        //保单信息列表
        policyInfoData: [],
        //出险通知文档资料列表
        docData: [],
        //索赔的文档资料列表
        claimDocData: [],
        //出险信息表单
        lossInfoForm: {
          lossReason: "", //出险原因
          lossDate: "", //出险时间
          submitterName: "", //提交人
          submitterCode: "", //提交人
          country: "", //国家
          province: "", //省
          city: "", //市
          district: "", //区
          postalCode: "", //邮编
          submissionDate: "", //提交日期
          address: "", //地址
          lossDescription: "", //出险描述
        },
        //公估/理算信息
        lossAdjustingData: {
          lossAdInfo: {
            claimNo: "", //赔案号
            riskCode: "", //险种
            riskName: "",
            claimStatus: "", //索赔状态
            withinPolicyCoverage: "", //是否属于保单保障范围
            insuranceInterest: null, //保险利益
            submitterName: "", //提交人
            approvedName: "", //审核人
            approvedCode: "", //审核人code
            approvalDate: "", //审核日期
            submissionDate: "", //提交日期
            submitterCode: "",
            submitterName: "",
            claimCurrency: "", //索赔币别
            defaultCurrency: "", //默认币别
            exchangeRate: "", //汇率
          },
          lossAmountList: [],
        },
        //赔付信息
        claimData: {
          claimInfo: {
            claimCurrency: "", //索赔币别
            defaultCurrency: "", //默认币别
            exchangeRate: "", //汇率
            claimNo: "",
            claimNotificationNo: "",
            createTime: "",
            createCode: "",
            isSave: "",
            submissionDate: "",
            submitterCode: "",
            submitterName: "",
            claimStatus: "",
            cancelStatus: "",
            reopenStatus: "",
            totalAdjustmentAmount: "", //理算汇总金额
            totalDeductible: "", //免赔额汇总金额
            totalEstimatedLossAmount: "", //估损金额汇总
            totalPrepaidAmount: "", //预付金额汇总
            totalReceivableAmountClaim: "", //本次应收金额汇总_索赔币别
            totalReceivableAmountDefault: "", //本次应收金额汇总
            totalReceivedAmount: "", //本次应收金额汇总
            totalReceivedAmountClaim: "", //实收汇总金额_索赔币别
            totalReceivedAmountDefault: "", //实收汇总金额_默认币别
            updateTime: "",
            updateCode: "",
            gcClaimPaymentDetailList: "",
          },
          claimAmountList: [],
        },
        //重开信息
        reopenData: [],
        //注销/恢复信息
        CancelRecoveryData: [],
        isReadonly: false,
        //那一块可修改
        whichCanChange: "",
        //保存完成弹窗
        copyVisible: false,
        dialogMsg: "",
        //保单免赔额弹窗
        mpeVisible: false,
        mpe: {
          detail: "",
        },
        claimNo: "",
        isDialog: false,
      };
    },
    events: {
      choosePolicy: function (val) {
        this.baseInfoForm = val;
        Vue.gvUtil.redirectTo({
          name: "assetQueryApp",
          query: {},
          shareStore: {
            tableData: this.tableData,
            baseInfoForm: this.baseInfoForm,
          },
        });
      },
      changeReadonly: function () {
        this.isReadonly = false;
      },
      saveConfirm: function (val = Vue.filter("translate")("submitSuccess")) {
        this.dialogMsg = val;
        this.copyVisible = true;
      },
      closeCopyVisible: function () {
        Vue.gvUtil.redirectTo({
          name: "claimQueryApp",
        });
      },
      showMpe: function () {
        let url = Vue.gvUtil.getUrl({
          apiName: "getPolicyDeductible",
          contextName: "product",
        });
        let policyList = this.$refs.policyInfo.getData();
        console.log(policyList);
        Vue.gvUtil.http
          .post(url, { policyNo: policyList[0].policyNo })
          .then((res) => {
            let str = "";
            if (res.resCode === "0000") {
              if (res.resData.length > 0) {
                var data = res.resData;
                for (let i in data) {
                  if (data[i].deductible) {
                    str += data[i].deductible;
                  }
                }
              }
            }
            this.mpe.detail = str;
          });
        this.mpeVisible = true;
      },
      goBack: function () {
        Vue.gvUtil.redirectBack();
      },
      auditAdjusting: function (type) {
        let result = this.$refs["otherReview"].getValidate();
        if (result) {
          var obj = {};
          let auditItem = this.$refs["lossAdjustingInfo"].getAuditItem();
          // if(!auditItem || auditItem.length == 0) {
          //   Vue.gvUtil.message('请选择需要审核的数据');
          //   return
          // } else {
          //   if(auditItem.some(item => item.status != '09')) {
          //     Vue.gvUtil.message('请选择待审核的数据');
          //     return
          //   }
          // }
          obj.auditType = type;
          if (
            this.$route.query.pageType &&
            this.$route.query.pageType == "task" &&
            sessionStorage.getItem("taskObj")
          ) {
            var taskObj = JSON.parse(sessionStorage.getItem("taskObj"));
            obj.taskNo = taskObj.taskNo;
            obj.claimNo = taskObj.innerRefNo.split("#")[0];
          }
          obj.gcClaimEstimatedAdjustmentDetailList = auditItem;
          let url = Vue.gvUtil.getUrl({
            apiName: "auditAdjustment",
            contextName: "product",
          });
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode === "0000") {
              // _this.copyVisible = true;
              if (JSON.stringify(res.resData) != "{}") {
                var gwNextNodeExecutorsList =
                  res.resData.gwNextNodeExecutorsList;
                gwNextNodeExecutorsList[0].exStr =
                  res.resData.next_activity_and_executor_list;
                // _this.gwNextNodeExecutorsList[0].approveOpinion = auditInfo.claimRemark
                if (
                  this.$route.query.pageType &&
                  this.$route.query.pageType == "task" &&
                  sessionStorage.getItem("taskObj")
                ) {
                  var taskObj1 = JSON.parse(sessionStorage.getItem("taskObj"));
                  gwNextNodeExecutorsList[0].taskNo = taskObj1.taskNo;
                }
                if (type == "1") {
                  Vue.gvUtil.showWorkflow({
                    gwNextNodeExecutorsList: gwNextNodeExecutorsList,
                    type: "0", // 0 提价 // 1 驳回
                    code: gwNextNodeExecutorsList[0].innerRefNo
                      ? gwNextNodeExecutorsList[0].innerRefNo.split("#")[0]
                      : gwNextNodeExecutorsList[0].param3.split("#")[0],
                    showCode: true,
                    showCodeLabel: "赔案号",
                  });
                } else {
                  Vue.gvUtil.showWorkflow({
                    gwNextNodeExecutorsList: gwNextNodeExecutorsList,
                    type: "1", // 0 提价 // 1 驳回
                    code: gwNextNodeExecutorsList[0].innerRefNo
                      ? gwNextNodeExecutorsList[0].innerRefNo.split("#")[0]
                      : gwNextNodeExecutorsList[0].param3.split("#")[0],
                    showCode: true,
                    showCodeLabel: "赔案号",
                  });
                }
              } else {
                this.dialogMsg = Vue.filter("translate")("submitSuccess"); //提交成功
                this.copyVisible = true;
              }
            }
          });
        }
      },
      showLossTrail: function () {
        var baseInfo = this.$refs.baseInfo.getData();
        Vue.gvUtil.showTrail({
          innerRefNo: baseInfo.claimNotificationNo, //内部参考号
          typeCode: "reportManagement", //业务类型
        });
      },
      showTrail: function () {
        var claimNo = this.$refs["lossAdjustingInfo"].getClaimNo();
        Vue.gvUtil.showTrail({
          innerRefNo: claimNo, //内部参考号
          typeCode: "claimManagement", //业务类型
        });
      },
      uploadFinish: function (val) {
        let url = Vue.gvUtil.getUrl({
          apiName: "claimDocument",
          contextName: "product",
        });
        var obj = {
          businessNo: this.claimNo,
          documentList: val,
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
        });
      },
      showReopenTrail: function () {
        var claimNo = this.$refs["lossAdjustingInfo"].getClaimNo();
        Vue.gvUtil.showTrail({
          innerRefNo: claimNo, //内部参考号
          typeCode: "reopenManagement", //业务类型
        });
      },
      showCancelTrail: function () {
        var claimNo = this.$refs["lossAdjustingInfo"].getClaimNo();
        Vue.gvUtil.showTrail({
          innerRefNo: claimNo, //内部参考号
          typeCode: "cancelManagement", //业务类型
        });
      },
    },
    methods: {
      initPage() {
        if (this.shareStore && this.shareStore.tableData) {
          this.tableData = this.shareStore.tableData;
        }
        if (this.shareStore && this.shareStore.baseInfoForm) {
          this.baseInfoForm = this.shareStore.baseInfoForm;
        }
        if (
          this.$route.query.pageType &&
          this.$route.query.pageType == "task" &&
          sessionStorage.getItem("taskObj")
        ) {
          var taskObj = JSON.parse(sessionStorage.getItem("taskObj"));
          if (taskObj.code == "0902") {
            this.whichCanChange = "lossInfo";
          }
          if (taskObj.code == "0903") {
            this.whichCanChange = "lossAdjustingInfo";
          }
          if (taskObj.code == "0904") {
            this.whichCanChange = "auditAdjusting";
          }
          if (taskObj.code == "0905") {
            this.whichCanChange = "claimInfo";
          }
          if (taskObj.taskStatus == "03") {
            this.isReadonly = true;
          }
          this.getClaimInfo(taskObj.innerRefNo.split("#")[0]);
        }
        if (this.$route.query.claimNo) {
          this.getClaimInfo(this.$route.query.claimNo);
          this.isReadonly = true;
        }
      },
      initClaimDetail: function (code) {
        this.isReadonly = true;
        this.isDialog = true;
        this.getClaimInfo(code);
      },
      async getClaimNotion(val, type) {
        let url = Vue.gvUtil.getUrl({
          apiName: "claimNotion",
          contextName: "product",
        });
        let list = await Vue.gvUtil.http.post(url, {
          businessNo: val,
          type: type,
        });
        let result = await this.mixReopenTrail(list.resData, type);
        return result;
      },
      // let submitObj = await this.getClaimNotion(val, type);
      async getClaimInfo(val) {
        let url = Vue.gvUtil.getUrl({
          apiName: "getClaimInfo",
          contextName: "product",
        });
        let _this = this;
        let rate = await Vue.gvUtil.getGgExch("002", "001");
        Vue.gvUtil.http
          // .post(url, { claimNo: "PA-2020-F-PAR-000300" })
          .post(url, { claimNo: val })
          .then(async (res) => {
            if (res.resCode === "0000") {
              let data = res.resData;
              //出险通知信息-基本信息
              _this.baseInfoForm =
                data.common.gcClaimNotification || _this.baseInfoForm;
              _this.claimDocData = data.claimDocumentList;
              _this.docData = data.common.documents;
              //出险通知信息-保单信息
              _this.policyInfoData = data.common.gcClaimPolicyList || [];
              //出险信息
              _this.lossInfoForm =
                JSON.parse(JSON.stringify(data.claimLossInfo)) ||
                _this.lossInfoForm;
              _this.lossInfoForm.lossDate =
                data.common.gcClaimNotification.lossDate;
              _this.lossInfoForm.lossDescription =
                data.common.gcClaimNotification.lossDescription;
              if (data.claimLossInfo) {
                _this.lossInfoForm.lossDescription =
                  data.claimLossInfo.lossDescription ||
                  _this.lossInfoForm.lossDescription;
                _this.lossInfoForm.submissionDate =
                  data.claimLossInfo.submissionDate ||
                  _this.lossInfoForm.submissionDate;
                _this.lossInfoForm.submitterCode =
                  data.claimLossInfo.submitterCode ||
                  _this.lossInfoForm.submitterCode;
                _this.lossInfoForm.submitterName =
                  data.claimLossInfo.submitterName ||
                  _this.lossInfoForm.submitterName;
              }
              _this.claimNo = data.common.claimNo;
              _this.lossInfoForm.claimNo = data.common.claimNo || "";
              _this.lossInfoForm.claimNotificationNo =
                data.common.gcClaimNotification.claimNotificationNo || "";
              //估算信息基本信息
              _this.lossAdjustingData.lossAdInfo =
                data.claimEstimatedAdjustmentInfo ||
                _this.lossAdjustingData.lossAdInfo;
              //估算信息详情数据列表
              _this.lossAdjustingData.lossAmountList =
                data.claimEstimatedAdjustmentInfo
                  .gcClaimEstimatedAdjustmentDetailList || [];
              _this.lossAdjustingData.lossAdInfo.claimNotificationNo =
                data.claimEstimatedAdjustmentInfo.claimNotificationNo ||
                data.common.gcClaimNotification.claimNotificationNo;
              _this.lossAdjustingData.lossAdInfo.claimNo =
                data.claimEstimatedAdjustmentInfo.claimNo ||
                data.common.claimNo;
              _this.lossAdjustingData.lossAdInfo.riskCode =
                data.claimEstimatedAdjustmentInfo.riskCode ||
                data.common.gcClaimPolicyList[0].riskCode;
              _this.lossAdjustingData.lossAdInfo.riskName =
                data.claimEstimatedAdjustmentInfo.riskName ||
                data.common.gcClaimPolicyList[0].riskName;
              _this.lossAdjustingData.lossAdInfo.claimStatus =
                data.claimEstimatedAdjustmentInfo.claimStatus ||
                data.common.gcClaimPolicyList[0].claimStatus;
              _this.lossAdjustingData.lossAdInfo.withinPolicyCoverage =
                data.claimEstimatedAdjustmentInfo.withinPolicyCoverage || "Y"; //是否属于保单保障范围 默认为是
              _this.lossAdjustingData.lossAdInfo.claimCurrency =
                data.claimEstimatedAdjustmentInfo.claimCurrency || "002";
              _this.lossAdjustingData.lossAdInfo.defaultCurrency =
                data.claimEstimatedAdjustmentInfo.defaultCurrency || "001";
              _this.lossAdjustingData.lossAdInfo.exchangeRate =
                data.claimEstimatedAdjustmentInfo.exchangeRate || rate;
              //赔付信息基本信息
              _this.claimData.claimInfo =
                data.paymentInfo || _this.claimData.claimInfo;
              //佩服信息详情数据列表
              _this.claimData.claimAmountList =
                data.paymentInfo.gcClaimPaymentDetailList || [];
              _this.claimData.claimAmountList.forEach((item) => {
                if (
                  item.instalmentCount != "" &&
                  item.instalmentCount != null
                ) {
                  item.instalmentCount = item.instalmentCount.split(",");
                } else {
                  item.instalmentCount = [];
                }
              });
              _this.claimData.claimInfo.claimNotificationNo =
                data.paymentInfo.claimNotificationNo ||
                data.common.gcClaimNotification.claimNotificationNo;
              _this.claimData.claimInfo.claimNo =
                data.paymentInfo.claimNo || data.common.claimNo;
              _this.claimData.claimInfo.claimCurrency =
                data.paymentInfo.claimCurrency || "002";
              _this.claimData.claimInfo.defaultCurrency =
                data.paymentInfo.defaultCurrency || "001";
              _this.claimData.claimInfo.exchangeRate =
                data.paymentInfo.exchangeRate || rate;

              //重开信息
              // _this.reopenData = data.reopenList || [];
              _this.reopenData = await this.getClaimNotion(
                _this.lossInfoForm.claimNo,
                "0"
              );
              if (_this.reopenData.length > 0) {
                _this.activeNames.push("reopenInfo");
              }
              //注销/恢复信息
              let cancelList = await this.getClaimNotion(
                _this.lossInfoForm.claimNo,
                "1"
              );
              let recoveryList = await this.getClaimNotion(
                _this.lossInfoForm.claimNo,
                "2"
              );
              _this.CancelRecoveryData = cancelList.concat(recoveryList);
              // _this.CancelRecoveryData = data.cancelResumeList || [];
              if (_this.CancelRecoveryData.length > 0) {
                _this.activeNames.push("CancelRecoveryInfo");
              }
            }
          });
      },
      mixReopenTrail(arr, flag) {
        // return Promise.all([this.initTranslation(codeType.join(',')), this.initTranslationPoName(poList)])
        return new Promise((resolve, reject) => {
          //提交信息的数组
          var arr1 = [];
          //审核信息的数组
          var arr2 = [];
          //开头不是审核二字的表示 是提交重开信息的数组 是审核二字开头的表示是审核重开信息的数组
          arr1 = arr.filter((v) => v.operation.substr(0, 2) != "审核");
          arr2 = arr.filter((v) => v.operation.substr(0, 2) == "审核");
          var list = [];
          for (let i = 0; i < arr1.length; i++) {
            let approvedObj = arr2.find(
              (l) =>
                new Date(l.inTime).getTime() >
                  new Date(arr1[i].inTime).getTime() &&
                new Date(l.inTime).getTime() ==
                  Math.min.apply(
                    Math,
                    arr2.map((o) => new Date(o.inTime).getTime())
                  )
            );
            let obj = {
              flag: flag,
              submitName: arr1[i].submitterName,
              submitTime: arr1[i].inTime,
              submitReason: arr1[i][this.getKey(flag)],
              approvedName: approvedObj ? approvedObj.submitterName : "",
              approvedTime: approvedObj ? approvedObj.inTime : "",
              approvedOperation: approvedObj ? approvedObj.opinion : "",
            };
            list.push(obj);
          }
          resolve(list);
        });
      },
      getKey(flag) {
        const KEYLIST = {
          0: "reopenReason",
          1: "cancelReason",
          2: "resumeReason",
        };
        return KEYLIST[flag];
      },
    },
    destroyed: function () {
      if (sessionStorage.getItem("taskObj")) {
        sessionStorage.removeItem("taskObj");
      }
    },
    components: {
      BaseInfo,
      PolicyInfo,
      DocList,
      LossInfo,
      LossAdjustingInfo,
      ClaimInfo,
      ReopenInfo,
      CancelRecovery,
      OtherReview,
    },
  });
});
