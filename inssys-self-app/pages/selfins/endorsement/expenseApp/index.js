/**
 * 费用页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      findSupplierfindList: "/ggCode/findSupplier", //收付款人码表
      audit: "/guPolicyFee/audit", //审核接口
      addbypolicyfee: "/guPolicyFee/addbypolicyfee", //插入费用,保存当前数据（post）
      submitfee: "/guPolicyFee/submit", //大提交接口
      guPolicyFeeWork: "/guPolicyFee/getWorkNext", //下级节点工作流
      findpolicyfee: "/guPolicyFee/findpolicyfee	", //查询费用详情信息（post）
      addFileNoEntryNodefee: "/guPolicyFee/addFileNoEntryNode", //查看页面时传文档资料
      dueDateCheck: "/guPolicyFee/dueDateCheck", //审核前校验接口
    },
  };
  Vue.gvUtil.setApi(config.api);
  var BaseInfo = require("../insureApp/components/baseInfo"),
    paymentPlan = require("./components/paymentPlan"),
    DocList = require("./components/docList"),
    paymentPlanDetail = require("./components/paymentPlanDetail");
  audit = require("./components/audit");
  const ROUTETYPELIST = {
    "01": "focus",
    "02": "authorizedSystemt",
    "03": "authorized",
    "04": "jointStock",
  };
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "expenseApp",
    shareStore: function () {
      return {
        policyInfo: null,
      };
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        deadline: false,
        seachView: true,
        mwsFeetotel: "", //保单总检测费
        paymanname: "",
        gysname: false, //供应商是否在码表内，默认false
        policyFa: "", //policy号传给费用
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        currentFeeTypeNum: "", //费用类型
        handleBtn: true, // 操作或关闭
        viewcheack: true, //保单查看页面
        Approve: true, //费用审核
        //页面ID policy为保单页面 endorsement为批单页面 默认为保单 由路由路径param对象的id属性获取该值
        pageId: "policy",
        //type值 init（初始化）、detail（详情）、edit（编辑/批改）、audit（审核）
        pageType: "",
        pageStyle: "",
        //折叠窗默认弹开
        activeNames: [
          "baseInfo",
          "paymentPlanInfo",
          "docListInfo",
          "auditInfo",
        ],
        //保单基本信息表单项
        baseInfo: {
          innerPolicyNo: "", //内部保单号
          policyVersion: "", //保单版本号
          continueSign: "02", //新保续保标志
          policyNo: "", //保险公司保单号
          policyCompanyVersion: "",
          policyName: "", //保险公司保单名称
          bigPolicyNo: "", //大保单号
          noticeCode: "", //出单通知编号
          projectCode: "", //项目代码
          projectName: "", //项目名称
          schemeName: "", //方案名称
          schemeCode: "", //方案代码
          schemeCrename: "", //方案提交人名称
          schemeCrecode: "", //方案提交人代码
          schemeDate: "", //方案提交时间
          supplierName: "", //出单公司名称
          supplierCode: "", //出单公司代码
          uwyear: "", //年度
          prePolicyNo: "", //上一年保单
          nextPolicyNo: "", //下一年保单
          maintainStartTime: "", //维护期开始时间
          maintainEndTime: "", //维护期结束时间
          findStartTime: "", //发现期开始时间
          findEndTime: "", //发现期结束时间
          testStartTime: "", //测试期开始时间
          testEndTime: "", //测试期结束时间
          saprelatedNo: "", //SAP关联号
          ppd: "", //PPD
          premium: "", //保费
          remark: "", //备注
          correctText: "", //批改文本
          updateName: "", //提交人
          updateCode: "", //提交人代码
          updateTime: "", //提交日期
          submissionDate: "", //提交时间
          policyType: "", //保单类型
          checkName: "", //审核人
          checkCode: "", //审核人代码
          checkTime: "", //审核日期
          checkInd: "", //保单状态
          createCode: "",
          createComcode: "",
          createName: "",
          createTime: "",
          durationDescript: "",
          startDate: "",
          endDate: "",
          self_insurance: "", //是否自保
          id: "",
          isNew: "",
          validInd: "",
        },
        //险种明细
        riskDetailInfo: [],
        //缴费计划
        paymentPlanInfo: [],
        //共保结构
        coinsuranceInfo: [],
        //文档资料列表
        docList: [],
        //缴费计划详情弹窗显示/隐藏
        showPaymentPlanDialog: false,
        //缴费计划详情列表数组
        paymentPlanDetailList: [],
        //勾选的出单信息数据
        policyNoticeResultPos: [],
        //保存成功提示框
        copyVisible: false,
        //是否只读
        isReadonly: false,
        //当保单类型为参股时，该值为false 险种明细、缴费计划、公报结构就可以手动录入了，控制只读的
        isJointStock: true,
        //弹窗提示语
        dialogText: "",
        isExpense: true, //true:费用录入 false:批单录入
        goldPremium: true, //金批批单录入页面显示隐藏状态
        Premium: true, //金批批单录入页面只读状态
        NonPremium: true, //文批批单录入页面只读状态
        Cancellation: true, //退保批单录入页面只读状态
        Write: true, //冲销批单录入页面只读状态
      };
    },
    events: {
      //补录文档资料
      UPfile() {
        var url = Vue.gvUtil.getUrl({
          apiName: "addFileNoEntryNodefee",
          contextName: "selfins",
        });
        // debugger;
        let obj = {
          policyNo: this.$refs.baseInfo.baseInfo.policyNo,
          fileType: "2",
          ggDocumentList: this.$refs.uploadFile.getData(), //文档资料, //文档资料
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            // 补录成功
            this.$message.success(
              Vue.gvUtil.getInzTranslate("zbSuccessfullyadded")
            );
            //
          }
        });
      },
    },
    methods: {
      //查保单的供应商接口默认带出
      cedingCompany(ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "findSupplierfindList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {}).then((res) => {
          if (res.resCode === "0000") {
            //新增费用时默认带出
            let allbulist = res.resData;
            allbulist.forEach((v) => {
              if (v.supplierChineseName == ss) {
                this.$refs.paymentPlanInfo.yuancedingCompany =
                  v.supplierEnglishName;
              }
            });
            if (this.$refs.paymentPlanInfo.yuancedingCompany == "") {
              this.$refs.paymentPlanInfo.yuancedingCompany = ss;
              this.paymanname = ss;
            }
          }
        });
      },
      //审核轨迹
      auditTrail() {
        Vue.gvUtil.showTrail({
          innerRefNo: this.taskObj.innerRefNo, //内部参考号
          billTypeCode: "BROKERAGEFEE", //业务类型
        });
      },
      //判断路由值查费用信息
      checkpolicyid(ss) {
        //如果是工作流进来的审核页面
        if (
          this.$route.query.pageType == "task" ||
          this.$route.query.pageType == "back"
        ) {
          let c = JSON.parse(this.taskObj.param1);
          this.currentFeeTypeNum = c.guPolicyFeeVo.feeType;
          var params = {
            policyMainId: c.guPolicyFeeVo.policyMainId,
            policyFeeId: c.guPolicyFeeVo.policyFeeId,
            feeSeqNo: c.guPolicyFeeVo.feeSeqNo,
            feeType: c.guPolicyFeeVo.feeType,
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findpolicyfee",
            contextName: "selfins",
            serachParms: {
              proposalNo: ss,
              ToAudit: c.guPolicyFeeVo.ToAudit,
            },
          });
          //如果是费用录入页面
        } else if (this.$route.query.flag == "expense") {
          this.currentFeeTypeNum = this.$route.query.row.feeType;
          var params = {
            policyMainId: this.$route.query.row.policyMainId,
            policyFeeId: this.$route.query.row.policyFeeId,
            feeSeqNo: this.$route.query.row.feeSeqNo,
            feeType: this.$route.query.row.feeType,
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findpolicyfee",
            contextName: "selfins",
            serachParms: {
              proposalNo: ss,
              ToAudit: "00", //写死
            },
          });
          //工作流进来的修改
        } else if (this.$route.query.pageType == "amend") {
          let c = JSON.parse(this.taskObj.param1);
          this.currentFeeTypeNum = c.guPolicyFeeVo.feeType;
          var params = {
            policyMainId: c.guPolicyFeeVo.policyMainId,
            policyFeeId: c.guPolicyFeeVo.policyFeeId,
            feeSeqNo: c.guPolicyFeeVo.feeSeqNo,
            feeType: c.guPolicyFeeVo.feeType,
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findpolicyfee",
            contextName: "selfins",
            serachParms: {
              proposalNo: ss,
              ToAudit: c.guPolicyFeeVo.ToAudit,
            },
          });
        }

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            if (res.resData.guPolicyFees.length > 0) {
              this.$refs.paymentPlanInfo.feeType =
                res.resData.guPolicyFees[0].feeType;
            }
            this.mwsFeetotel = res.resData.mwsFee;
            this.$refs.paymentPlanInfo.policyFeeMaxNo =
              res.resData.policyFeeMaxNo;
            this.$refs.paymentPlanInfo.fromData.paymentList =
              res.resData.guPolicyFees.guPolicyFeeVoList;
            this.docList = res.resData.guPolicyFees.ggDocumentList;
          }
        });
      },
      //保存.提交校验
      saveSubmit(aa) {
        //如果路由有expense表示费用路由;
        let valid = this.$refs.paymentPlanInfo.xiaoyan();
        let istrueorfalse = this.$refs.paymentPlanInfo.ishavepayee();
        let ViewStatus2 = this.$refs.paymentPlanInfo.ViewStatus();
        //校验是否通过
        if (valid) {
          if (istrueorfalse) {
            // 费用信息必须填校验
            if (aa == "1") {
              //保存
              this.addarr();
            } else if (aa == "2") {
              if (ViewStatus2) {
                //提交先调下级节点人成功后走提交
                let targetObj = JSON.parse(
                  JSON.stringify(
                    this.$refs.paymentPlanInfo.fromData.paymentList
                  )
                );
                let softtext = false;
                total = 0;
                targetObj.forEach((f) => {
                  if (f.feeType.indexOf("MWS") != -1) {
                    total += Number(f.amount);
                  }
                });
                if (total > this.mwsFeetotel) {
                  softtext = true;
                }
                //如果费用初始化状态为‘’并且为MWS费用时，并且当前条金额大于保单汇总后的检测费金额
                // 软提示费用金额大于保单检测费金额
                if (softtext == true) {
                  this.$message(
                    Vue.filter("translate")("zbamountMWSinsoefeeL")
                  );
                }
                setTimeout(() => {
                  (this.check = "sumit"), this.WorkingNext();
                }, 1000); //延迟1秒
              } else {
                //必填数据不能为空
                this.$message({
                  showClose: true,
                  message: Vue.filter("translate")("requireDataMessage"),
                  type: "warning",
                });
                return false;
              }
            }
          } else {
            Vue.gvUtil
              .alert({
                msg: "请确认<" + this.paymanname + ">是否在自保供应商中?",
              })
              .then(function () {
                return false;
              });
          }
        } else {
          //请完善信息,分期信息不能为空.
          this.$message({
            showClose: true,
            message: Vue.filter("translate")("zbstagincannotbeemptyL"),
            type: "warning",
          });
          return false;
        }
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //表示提交
          if (this.check == "sumit") {
            this.sumbit();
            //表示审核通过
          } else if (this.check == "goAudits") {
            this.shenhe("01");
          }
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.filter("translate")("zbseleoneoprat"));
        }
      },
      //提交,审核通过工作流弹框
      WorkingNext() {
        var url = Vue.gvUtil.getUrl({
          apiName: "guPolicyFeeWork",
          contextName: "selfins",
        });
        let obj = {
          workFeeList: [],
          gwWorkTask: this.taskObj,
        };
        this.$refs.paymentPlanInfo.fromData.paymentList.forEach((v) => {
          if (v.status != "01") {
            obj.workFeeList.push(v.feeType);
          }
        });

        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.workflowdialog = true;
              this.gwNextNodeExecutorsList = res.resData;
            } else if (res.resData.length == 0) {
              //表示审核通过到最后以及节点人了，直接调审核通过接口
              let url = Vue.gvUtil.getUrl({
                apiName: "audit",
                contextName: "selfins",
              });
              let targetObj = {
                auditStatu: "01", //审核通过还是不通过  ‘01’通过  ‘06’不通过
                opinions: this.$refs.auditInfo.getData(), //审核意见
                policyNo: this.$refs.baseInfo.baseInfo.policyNo, //保单号
                feeType:
                  this.$refs.paymentPlanInfo.fromData.paymentList[0].feeType, //第一条的费用类型
                gwWorkTask: this.taskObj,
              };
              Vue.gvUtil.http.post(url, targetObj).then((res) => {
                if (res.resCode == "0000") {
                  //操作成功

                  this.$message.success(
                    Vue.filter("translate")("gOperationSuccessful")
                  );
                  this.$router.push({
                    name: "workbenchApp",
                  }); //跳转到工作台
                }
              });
            }
          }
        });
      },
      //审核接口  ‘01’通过  ‘06’不通过
      shenhe(code) {
        let url = Vue.gvUtil.getUrl({
          apiName: "audit",
          contextName: "selfins",
        });
        let targetObj = {
          auditStatu: code, //审核通过还是不通过  ‘01’通过  ‘06’不通过
          opinions: this.$refs.auditInfo.getData(), //审核意见
          policyNo: this.$refs.baseInfo.baseInfo.policyNo, //保单号
          feeType: this.$refs.paymentPlanInfo.fromData.paymentList[0].feeType, //第一条的费用类型
          gwWorkTask: this.taskObj,
          ggDocumentList: this.$refs.uploadFile.getData(), //文档资料
        };
        Vue.gvUtil.http.post(url, targetObj).then((res) => {
          if (res.resCode == "0000") {
            //操作成功
            this.$message.success(
              Vue.filter("translate")("gOperationSuccessful")
            );
            this.$router.push({
              name: "workbenchApp",
            }); //跳转到工作台
          }
        });
      },
      //审核校验节点
      goAudit(code) {
        let valid = this.$refs.auditInfo.getValidate();
        if (valid) {
          // ‘01’通过  ‘06’不通过
          //不通过直接调审核接口
          //通过调工作流
          if (code == "01") {
            // 校验截止日期;
            let url = Vue.gvUtil.getUrl({
              apiName: "dueDateCheck",
              contextName: "selfins",
            });
            let obj = {
              auditStatu: "01", //审核通过还是不通过  ‘01’通过  ‘06’不通过
              opinions: this.$refs.auditInfo.getData(), //审核意见
              policyNo: this.$refs.baseInfo.baseInfo.policyNo, //保单号
              feeType:
                this.$refs.paymentPlanInfo.fromData.paymentList[0].feeType, //第一条的费用类型
              gwWorkTask: this.taskObj, //工作台的数据
              ggDocumentList: this.$refs.uploadFile.getData(), //文档资料
            };
            Vue.gvUtil.http.post(url, obj).then((res) => {
              if (res.resCode == "0000") {
                if (res.resData == "true") {
                  (this.check = "goAudits"), this.WorkingNext();
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
          } else if (code == "06") {
            //不通过直接走审核接口，不走工作流接口
            //审核通过还是不通过  ‘01’通过  ‘06’不通过
            this.shenhe("06");
          }
        } else {
          //请完善信息
          this.$message({
            showClose: true,
            message: Vue.filter("translate")("zbPleasecompletetheinformation"),
            type: "warning",
          });
          return false;
        }
      },

      //保存提交提示弹框(如果弹框内文字为提交成功，那么关闭前就跳转到费用查询页面)
      copyVisibledialog(dialogText) {
        // if (dialogText == "提交成功") {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台页面
      },
      //费用保存
      addarr() {
        //查询页面过来的保存
        if (this.$route.query.flag == "expense") {
          var url = Vue.gvUtil.getUrl({
            apiName: "addbypolicyfee",
            contextName: "selfins",
            serachParms: {
              currentFeeType: this.currentFeeTypeNum,
              policyNo: this.$route.query.row.policyNo,
              proposalNo: this.$refs.baseInfo.baseInfo.proposalNo,
            },
          });
          //工作流页面过来的保存
        } else if (this.$route.query.pageType == "amend") {
          let c = JSON.parse(this.taskObj.param1);
          var url = Vue.gvUtil.getUrl({
            apiName: "addbypolicyfee",
            contextName: "selfins",
            serachParms: {
              currentFeeType: this.currentFeeTypeNum,
              policyNo: c.guPolicyFeeVo.policyNo,
              proposalNo: c.guPolicyFeeVo.proposalNo,
            },
          });
        }

        let targetObj = JSON.parse(
          JSON.stringify(this.$refs.paymentPlanInfo.fromData.paymentList)
        );
        this.$refs.paymentPlanInfo.ggSupplierMsg.forEach((v) => {
          targetObj.forEach((f) => {
            if (v.supplierEnglishName == f.payee) {
              f.payeeCode = v.supplierCode;
            }
          });
        });
        let obj = {
          guPolicyFeeVoList: targetObj, //费用信息
          ggDocumentList: this.$refs.uploadFile.getData(), //文档资料
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            // 保存成功后赋值
            this.dialogText = Vue.filter("translate")("gSaveSuccess"); //保存成功
            this.copyVisible = true;
          }
        });
      },
      //费用提交
      sumbit() {
        //查询页面过来的保存
        if (this.$route.query.flag == "expense") {
          var url = Vue.gvUtil.getUrl({
            apiName: "submitfee",
            contextName: "selfins",
            serachParms: {
              currentFeeType: this.currentFeeTypeNum,
              policyNo: this.$route.query.row.policyNo,
              proposalNo: this.$refs.baseInfo.baseInfo.proposalNo,
            },
          });

          //工作流页面过来的保存
        } else if (this.$route.query.pageType == "amend") {
          let c = JSON.parse(this.taskObj.param1);
          var url = Vue.gvUtil.getUrl({
            apiName: "submitfee",
            contextName: "selfins",
            serachParms: {
              currentFeeType: this.currentFeeTypeNum,
              policyNo: c.guPolicyFeeVo.policyNo,
              proposalNo: this.$refs.baseInfo.baseInfo.proposalNo,
            },
          });
        }
        let targetObj = JSON.parse(
          JSON.stringify(this.$refs.paymentPlanInfo.fromData.paymentList)
        );
        this.$refs.paymentPlanInfo.ggSupplierMsg.forEach((v) => {
          targetObj.forEach((f) => {
            if (v.supplierEnglishName == f.payee) {
              f.payeeCode = v.supplierCode;
            }
          });
        });
        let obj = {
          guPolicyFeeVoList: targetObj, //费用信息
          ggDocumentList: this.$refs.uploadFile.getData(), //文档资料
          gwWorkTask: this.taskObj,
          nextUserCode: this.checkboxGroup, //下级节点人
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            this.dialogText = Vue.filter("translate")("submitSuccess"); //提交成功
            this.copyVisible = true;
          }
        });
      },
      //查询费用页面数据保单接口
      initexpenseDetail(ss) {
        //查询保单详情
        this.$refs.baseInfo.getPolicyFeeInfo3(
          ss.row.proposalNo,
          ss.row.versionNo,
          "Look",
          ss.row.policyNo,
          ss.row.policyMainId
        );
        //查看页面时费用只读
        // this.isReadonly = true;
        this.seachView = false;
        (this.viewcheack = false), (this.view = true);
        this.handleBtn = false;
        this.$refs.paymentPlanInfo.viewcheack = false;
        this.$refs.paymentPlanInfo.view = true;
        this.$refs.paymentPlanInfo.insideview = true;
        //费用接口
        this.checkpolicyidview(ss);
      },
      //单号查看
      checkpolicyidview(ss) {
        let url = Vue.gvUtil.getUrl({
          apiName: "findpolicyfee",
          contextName: "selfins",
          serachParms: {
            proposalNo: ss.row.proposalNo,
          },
        });
        this.currentFeeTypeNum = ss.row.feeType;
        let params = {
          policyMainId: ss.row.policyMainId,
          policyFeeId: ss.row.policyFeeId,
          feeSeqNo: ss.row.feeSeqNo,
          feeType: ss.row.feeType,
          isAudit: "01",
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            this.$refs.paymentPlanInfo.fromData.paymentList =
              res.resData.guPolicyFees.guPolicyFeeVoList;
            this.docList = res.resData.guPolicyFees.ggDocumentList;
          }
        });
      },
      //关闭按钮
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
      //下级节点人关闭
      close() {
        this.checkboxGroup = [];
      },
    },
    computed: {},
    mounted: function () {
      if (this.$route.query.isExpense == 2) {
        this.isExpense = false;
      }
      this.$route.query.Premium
        ? (this.Premium = false)
        : (this.Premium = true);
      this.$route.query.NonPremium
        ? (this.NonPremium = false)
        : (this.NonPremium = true);
      this.$route.query.Cancellation
        ? (this.Cancellation = false)
        : (this.Cancellation = true);
      this.$route.query.Write ? (this.Write = false) : (this.Write = true);
      // 如果路由有expense表示费用路由; 费用录入页面
      if (this.$route.query.flag == "expense") {
        this.viewcheack = true;
        this.$refs.paymentPlanInfo.viewcheack = true;
        //查询费用信息接口
        this.checkpolicyid(this.$route.query.row.proposalNo);
        //费用类型接口
        this.$refs.paymentPlanInfo.fyselect();
        //查询保单信息接口
        this.$refs.baseInfo.getPolicyFeeInfo3(
          this.$route.query.row.proposalNo,
          this.$route.query.row.versionNo,
          "Look",
          this.$route.query.row.policyNo,
          this.$route.query.row.policyMainId
        );
        this.policyFa = this.$route.query.row.policyMainId;
        //工作流待审核页面
      } else if (
        this.$route.query.pageType == "task" ||
        this.$route.query.pageType == "back"
      ) {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let c = JSON.parse(this.taskObj.param1);
        this.view = true;
        this.$refs.paymentPlanInfo.viewcheack = false;
        this.Approve = false;
        // this.isReadonly = true;
        this.$refs.paymentPlanInfo.view = true;
        this.$refs.paymentPlanInfo.insideview = true;
        //查询保单信息接口
        this.$refs.baseInfo.getPolicyFeeInfo3(
          c.guPolicyFeeVo.proposalNo,
          c.guPolicyFeeVo.version,
          "Look",
          c.guPolicyFeeVo.policyNo,
          c.guPolicyFeeVo.policyMainId
        );
        //查询费用信息接口
        this.checkpolicyid(c.guPolicyFeeVo.proposalNo);
        // this.deadlineDate();
        //工作流进入的修改
      } else if (this.$route.query.pageType == "amend") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let c = JSON.parse(this.taskObj.param1);
        this.$refs.paymentPlanInfo.paytaskObj = c;
        this.viewcheack = true;
        this.$refs.paymentPlanInfo.viewcheack = true;
        //查询费用信息接口
        this.checkpolicyid(c.guPolicyFeeVo.proposalNo);
        //费用类型接口
        this.$refs.paymentPlanInfo.fyselect();
        //查询保单信息接口
        this.$refs.baseInfo.getPolicyFeeInfo3(
          c.guPolicyFeeVo.proposalNo,
          c.guPolicyFeeVo.version,
          "Look",
          c.guPolicyFeeVo.policyNo,
          c.guPolicyFeeVo.policyMainId
        );
        this.policyFa = c.guPolicyFeeVo.policyMainId;
      }
    },
    components: {
      BaseInfo,
      paymentPlan,
      DocList,
      paymentPlanDetail,
      audit,
    },
  });
});
