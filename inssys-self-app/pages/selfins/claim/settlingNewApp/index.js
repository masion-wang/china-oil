/**
 * 赔案录入页面
 * @author 罗丹菱
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      getClaimData: "/claim/claim/findInfoPage", //赔案查询
      addGcClaimMainSelf: "/gcClaimMainSelf/addGcClaimMainSelf", //保存接口
      submitGcClaimMainSelf: "/gcClaimMainSelf/submitGcClaimMainSelf", //提交接口
      findpolicyselfmain: "/policySelfMain/findPolicySelf", //保批单查询
      findItemList: "/gcClaimMainSelf/findItemList", //标的查询
      findNewGcClaimMainSelfInfo: "/gcClaimMainSelf/findNewGcClaimMainSelfInfo", //查询赔案详情（仅包含审核通过的估损信息）
      findGcClaimMainSelfInfo: "/gcClaimMainSelf/findGcClaimMainSelfInfo", //自保赔案号查询
      verifyGcClaimMainSelf: "/gcClaimMainSelf/verifyGcClaimMainSelf ", //审核通过
      notVerifyGcClaimMainSelf: "/gcClaimMainSelf/notVerifyGcClaimMainSelf", //审核不通过
      confirmRepeat: "/gcClaimMainSelf/confirmRepeat", //是否重复
      pagetWorkNext: "/gcClaimMainSelf/getWorkNext", //工作流弹框
      addFileNoEntryNodefee: "/guPolicyFee/addFileNoEntryNode", //查看页面时传文档资料
      gcEstimateLossCheck: "/gcClaimMainSelf/gcEstimateLossCheck", //估损下级节点人确认接口
    },
  };
  Vue.gvUtil.setApi(config.api);
  var BaseInfo = require("./components/baseInfo");
  var Audit = require("./components/audit");
  var DocList = require("./components/docList");
  var UnDerly = require("./components/underlyingquer");
  var OriginalClaim = require("./components/originalclaim");
  var inquiry = require("./components/inquiry");
  var ReopenInfo = require("./components/reopenInfo");
  var CancelRecovery = require("./components/cancelRecovery");
  var workFlow = require("./components/workflow");

  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "settlingNewApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        endlastSumbitClear: "", //提交是否清零
        goback: false, //已处理进页面
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        claimtrueOrfalse: false, //赔案是否清空数据
        trueOrfalse: false, //是否清空所有数据
        origBaseinfochosse: "", //原单带出数据存储
        Apppassretrun: null, //审核回传的值
        //重开信息
        reopenInfo: "",
        //注销恢复信息
        cancelRecovery: "",
        checksh: false, //注销恢复信息显示否
        dialogText: "", //提交成功提示语言
        copyVisible: false, //提交保存成功弹框
        delbackunderlying: [], //存后端传回来的数据
        view: true, //查看页面
        inquiryDialog: false, //自保保单号查询页面弹框
        originalclaim: false, //原单赔案号查询页面弹框
        pass: false, //审核页面
        OriginalclaimDialog: false, //原单赔案号弹框
        isShow: false, //标的查询页面
        isReadonly: false, //文档资料增加按钮
        //折叠窗默认弹开
        activeNames: [
          "baseInfo",
          "docListInfo",
          "auditInfo",
          "cancel",
          "remarkInfo",
        ],
        arrpfDatalist: {
          arrpfData: [
            {
              checkStatus: "", //01表示审核通过的，不可删除不可修改
              adjustmentId: "",
              claimMainId: "",
              claimNo: "",
              policyNo: "",
              version: "",
              transactionNo: "",
              documentNo: "",
              paymentDate: "",
              paymentUser: "",
              payType: "",
              payeeCode: "",
              payeeName: "",
              currency: "USD",
              rate: "",
              // paymentAmount: "2.00",
              paymentAmount: 0,
              paymentAmountCn: 0,
              approvedBy: "",
              approvedDate: "",
              flag: "02",
              //赔付表格  gcAdjustmentDetailVo
              gcAdjustmentDetailVoList: [
                // {
                //   checkStatus: "", //01表示审核通过的，不可删除不可修改
                //   detailId: "",
                //   adjustmentId: "",
                //   riskCode: "",
                //   itemNo: "",
                //   feeType: "",
                //   paidAmount: 0,
                //   paidAmountCn: 0,
                //   remarks: "",
                //   sourceNo: "",
                //   sourceAccount: "",
                //   rate: "",
                //   flag: "02",
                //   feeTypeselect: [], //费用类型
                //   //   //摊赔表格
                //   gcAmortizationVoList: [],
                // },
              ],
            },
          ],
        },
        //基本数据
        baseInfo: {},
        docListInfo: {},
        //文档资料列表
        clmdocList: [],
      };
    },
    events: {
      //提交估损审核
      // Savegs() {
      //   this.$refs.baseInfo.gsClick();
      // },
      //补录文档资料
      UPfile() {
        var url = Vue.gvUtil.getUrl({
          apiName: "addFileNoEntryNodefee",
          contextName: "selfins",
        });
        let obj = {
          claimTempNo: this.$refs.baseInfo.baseInfo.claimTempNo,
          ggDocumentList: this.$refs.uploadFile.getData(), //文档资料
          fileType: "3",
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            //补录成功
            this.$message.success(
              Vue.gvUtil.getInzTranslate("zbSuccessfullyadded")
            );
          }
        });
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //审核通过接口
          //endlastSumbitClear 是否清零
          var BYClear = this.endlastSumbitClear;
          if (this.check == "01") {
            var url = Vue.gvUtil.getUrl({
              apiName: "verifyGcClaimMainSelf",
              contextName: "selfins",
            });
            // ggApproveHistoryVo为审核意见obj
            var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
            this.Apppassretrun.nextUserCode = s;
            this.Apppassretrun.ggApproveHistoryVo = {};
            this.Apppassretrun.gwWorkTask = this.taskObj; //工作流对象
            this.Apppassretrun.ggApproveHistoryVo.opinions =
              this.$refs.auditInfo.getData();
            Vue.gvUtil.http.post(url, this.Apppassretrun).then((res) => {
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
            //提交接口
          } else if (this.check == "2") {
            this.endlastSumbit(BYClear);
          } else if (this.check == "08") {
            this.Lossestimationsubmi();
          }
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.filter("translate")("zbseleoneoprat"));
        }
      },
      //估损提交按钮
      Lossestimationsubmi() {
        var url = Vue.gvUtil.getUrl({
          apiName: "gcEstimateLossCheck",
          contextName: "selfins",
        });
        let obj = this.Submitlistcopy();
        var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        obj.nextUserCode = s;
        obj.gwWorkTask = this.taskObj; //工作流对象
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
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
      //点击估损审核调工作流弹框
      gsassessmentaudit(ss) {
        this.check = "08";
        this.WorkingNext();
      },
      //提交成功工作流弹框
      WorkingNext() {
        var url = Vue.gvUtil.getUrl({
          apiName: "pagetWorkNext",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, this.taskObj).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.workflowdialog = true;
              this.gwNextNodeExecutorsList = res.resData;
            } else if (res.resData.length == 0) {
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
              // ggApproveHistoryVo为审核意见obj
              var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
              this.Apppassretrun.nextUserCode = s;
              this.Apppassretrun.ggApproveHistoryVo = {};
              this.Apppassretrun.gwWorkTask = this.taskObj; //工作流对象
              this.Apppassretrun.ggApproveHistoryVo.opinions =
                this.$refs.auditInfo.getData();
              Vue.gvUtil.http.post(url, this.Apppassretrun).then((res) => {
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
      //保存提交时各种校验
      saveSubmit(s) {
        let _this = this;
        let submit = _this.$refs.baseInfo.xiaoyan();
        let lipeisumbit = _this.$refs.baseInfo.prifuxy();
        let expandForm = _this.$refs.baseInfo.expandFormxiyan();
        // if (submit && lipeisumbit && expandForm) {
        if (submit && lipeisumbit) {
          if (expandForm == true) {
            //一条前端信息取到多个自保标的，请确认保存标的选择。
            if (_this.$refs.baseInfo.isRed == true) {
              Vue.gvUtil
                .confirm({
                  msg: Vue.gvUtil.getInzTranslate("zbOnefrontofsavingMarks"),
                })
                .then(
                  //判断是否重复
                  // “已经存在同保单同险种同出险日期的赔案确认提交吗？”
                  function () {
                    var url = Vue.gvUtil.getUrl({
                      apiName: "confirmRepeat",
                      contextName: "selfins",
                    });
                    Vue.gvUtil.http
                      .post(url, _this.Submitlistcopy())
                      .then((res) => {
                        //表示有重复的
                        if (res.resCode === "0000" && res.resData == "0019") {
                          Vue.gvUtil
                            .confirm({
                              msg: Vue.gvUtil.getInzTranslate(
                                "zbdateofoccurrenceL"
                              ),
                            })
                            .then(
                              //确认
                              function () {
                                if (s == "1") {
                                  //保存接口
                                  _this.paSave();
                                } else if (s == "2") {
                                  //提交走工作流
                                  _this.TotalamountMoney();
                                }
                              },
                              //取消
                              function () {}
                            );
                        } else if (
                          res.resCode == "0000" &&
                          res.resData == "0000"
                        ) {
                          //没有重复的直接调保存提交接口
                          if (s == "1") {
                            _this.paSave();
                          } else if (s == "2") {
                            //校验估损是否都审核通过了
                            _this.TotalamountMoney();
                          }
                        }
                      });
                  },
                  function () {}
                );
            } else {
              //无标红标的
              //在判断是否重复
              var url = Vue.gvUtil.getUrl({
                apiName: "confirmRepeat",
                contextName: "selfins",
              });
              Vue.gvUtil.http.post(url, _this.Submitlistcopy()).then((res) => {
                //表示有重复的
                if (res.resCode == "0000" && res.resData == "0019") {
                  // 已经存在同保单同险种同出险日期的赔案确认提交吗？
                  Vue.gvUtil
                    .confirm({
                      msg: Vue.gvUtil.getInzTranslate("zbdateofoccurrenceL"),
                    })
                    .then(
                      //确认
                      function () {
                        if (s == "1") {
                          _this.paSave();
                        } else if (s == "2") {
                          _this.TotalamountMoney();
                        }
                      },
                      //取消
                      function () {}
                    );
                } else if (res.resCode == "0000" && res.resData == "0000") {
                  //没有重复的直接调保存提交接口
                  if (s == "1") {
                    _this.paSave();
                  } else if (s == "2") {
                    _this.TotalamountMoney();
                  }
                }
              });
            }
          } else if (expandForm == "tips") {
            //同一标的下的费用类型不允许相同
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("znexpentypeundercannotasme")
            );
            return false;
          } else {
            //请完善信息！
            Vue.gvUtil.message(
              Vue.filter("translate")("zbPleasecompletetheinformation")
            );
            //
            return false;
          }
        } else {
          //请完善信息！
          Vue.gvUtil.message(
            Vue.filter("translate")("zbPleasecompletetheinformation")
          );
          return false;
        }
      },
      //提交时校验是否有未审核通过的估损，如有不能提交
      sumitStatusfalse() {
        let sumstauts = false;
        let alldata = this.Submitlistcopy();
        alldata.gcPolicyItemVoList.forEach((v) => {
          v.gcEstimateLossVoList.forEach((c) => {
            //状态为审核中或者初始化
            if (
              c.status == 00 ||
              c.status == 09 ||
              c.status == null ||
              c.status == undefined
            ) {
              sumstauts = false;
              return sumstauts;
            } else {
              sumstauts = true;
            }
          });
        });
        return sumstauts;
      },
      //判断赔案总金额是否=未决金额
      TotalamountMoney() {
        var _this = this;
        let sumstau = _this.sumitStatusfalse();
        var sumstauts = 0;
        let alldata = _this.Submitlistcopy();
        alldata.gcPolicyItemVoList.forEach((v) => {
          v.gcEstimateLossVoList.forEach((c) => {
            if (c.feeTypeCode == "530") {
              //费用类型为Deductible，想减
              sumstauts = sumstauts - Number(c.outLossAmount);
            } else {
              sumstauts += Number(c.outLossAmount); //估损未决金额
            }
          });
        });
        if (sumstau) {
          // 赔案总未决金额==总自留金额 或者  赔案总未决金额>总自留金额
          if (
            sumstauts == _this.$refs.baseInfo.baseInfo.retainedAmountAll ||
            sumstauts > _this.$refs.baseInfo.baseInfo.retainedAmountAll
          ) {
            _this.check = "2";
            // _this.WorkingNext();
            _this.paSumbit();
          } // 赔案总未决金额<总自留金额
          else if (
            sumstauts < _this.$refs.baseInfo.baseInfo.retainedAmountAll
          ) {
            //当前赔付金额大于未决金额，请先进行估损调整
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("zbadjustTheLookFirstL")
            );
          }
        } else {
          //有未审核通过的估损任务，请完成任务后再进行提交操作
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbsumBititAftertaskL")
          );
          return false;
        }
      },
      // 保存时调的接口
      paSave() {
        // 保存时
        let _this = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "addGcClaimMainSelf",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, _this.Submitlistcopy()).then((res) => {
          if (res.resCode === "0000") {
            // 深拷贝返回的值，
            this.$message({
              message: "保存成功",
              type: "success",
            });
            // 深拷贝返回的值，
            this.delbackunderlying = JSON.parse(JSON.stringify(res.resData));
            //文档资料
            this.clmdocList = res.resData.ggDocumentVoList;
            //基本信息
            _this.$refs.baseInfo.baseInfo = res.resData.gcClaimMainSelfVo;
            //标的
            this.$refs.baseInfo.expandForm.underlying =
              res.resData.gcPolicyItemVoList;
            //判断isRed是否为“01”，01表示是前端系统带出的多条标的信息，标红
            if (
              res.resData.gcPolicyItemVoList.length != 0 &&
              this.$refs.baseInfo.expandForm.underlying[0].isRed == "01"
            ) {
              this.$refs.baseInfo.isRed = true;
            }
            //理赔
            this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcAdjustmentVoList;
            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return { feeTypeCode: gslist.feeTypeCode };
                      });
                      a.push(c);
                      //码表费用类型循环
                      this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          } else {
            //失败
            Vue.gvUtil.message(
              Vue.gvUtil.getInzTranslate("scheduleJobStatusFail")
            );
          }
        });
      },
      // 提交时调是否自动结案？是否将未决清零？
      paSumbit() {
        // 提交时
        let _this = this;
        //请确认该笔赔案审核通过后，是否自动清零未决金额并结案？
        Vue.gvUtil
          .confirm({
            msg: Vue.gvUtil.getInzTranslate("zbzClearoutstandingitemLu"),
            confirmButtonText: Vue.gvUtil.getInzTranslate("gBtnPositive"), //"是"
            cancelButtonText: Vue.gvUtil.getInzTranslate("gBtnNegative"), //"否"
          })
          .then(
            function () {
              //确定01清零
              _this.endlastSumbitClear = "01";
              _this.WorkingNext();
            },
            function () {
              // _this.endlastSumbit("00");
              //不清零  00不清零
              _this.endlastSumbitClear = "00";
              _this.WorkingNext();
            }
          );
      },
      //提交接口  (是否清零)
      endlastSumbit(ssss) {
        var _this = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "submitGcClaimMainSelf",
          contextName: "selfins",
        });
        var s = _this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
        var obj = _this.Submitlistcopy();
        obj.gcClaimMainSelfVo.isClear = ssss; //01是   00否  是否清零
        obj.gwWorkTask = _this.taskObj; //工作流对象
        obj.nextUserCode = s;
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            // 提交成功后所有信息只读显示;
            _this.dialogText =
              "赔案暂存号:" + res.resData.gcClaimMainSelfVo.claimTempNo;
            _this.copyVisible = true; //弹框
            _this.$refs.baseInfo.Submit = true;
            _this.$refs.baseInfo.isReadonly = true;
            //只读
            _this.view = false;
            //文档资料
            _this.isReadonly = true;
            //新增/删除按钮不可见
            _this.$refs.baseInfo.unadd = false;
            _this.$refs.baseInfo.addbutton = false;
            //没有查询按钮
            _this.$refs.baseInfo.self = false;
            //基本信息
            _this.$refs.baseInfo.baseInfo = res.resData.gcClaimMainSelfVo;
            //标的信息
            _this.$refs.baseInfo.underlying = res.resData.gcPolicyItemVoList;
            //赔付信息
            _this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcAdjustmentVoList;

            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            _this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              _this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return {
                          feeTypeCode: gslist.feeTypeCode,
                        };
                      });
                      a.push(c);
                      //码表费用类型循环
                      _this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      _this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          }
        });
      },
      //审核按钮
      goAudit(check) {
        this.check = check; //全局审核通过不通过字段
        //01表示通过   06表示不通过
        var valid = this.$refs.auditInfo.getValidate(); //审核必填校验
        if (valid) {
          //点击审核通过，选择下级节点人
          if (this.check == "01") {
            this.WorkingNext();
          } else if (this.check == "06") {
            //审核不通过直接调接口
            var url = Vue.gvUtil.getUrl({
              apiName: "notVerifyGcClaimMainSelf",
              contextName: "selfins",
            });
            // // ggApproveHistoryVo为审核意见obj
            this.Apppassretrun.ggApproveHistoryVo = {};
            this.Apppassretrun.gwWorkTask = this.taskObj; //工作流对象
            this.Apppassretrun.ggApproveHistoryVo.opinions =
              this.$refs.auditInfo.getData();
            Vue.gvUtil.http.post(url, this.Apppassretrun).then((res) => {
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
        } else {
          return false;
        }
      },
      //保存提交成功后弹框操作 审核通过不通过弹框操作
      savesubmit2() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台页面
      },
      //保存时的入参
      Submitlistcopy() {
        //如果this.inputName没有储存值或者trueOrfalse== false就不进循环
        let bdcopy = JSON.parse(
          JSON.stringify(this.$refs.baseInfo.expandForm.underlying)
        ); //页面标的深拷贝
        let lpcopy = JSON.parse(
          JSON.stringify(this.$refs.baseInfo.arrpfDatalist.arrpfData)
        ); //页面赔付的深拷贝
        //循环标的如果标的主键=赔付标的序号
        //就将赔付标的序号变成标的序号
        //赔付标的主键变成标的主键
        bdcopy.forEach((bdcopyitem, index) => {
          lpcopy.forEach((v, lpindex) => {
            v.gcAdjustmentDetailVoList.forEach((f, gcadjumentindex) => {
              if (bdcopyitem.itemMainId == f.itemNo) {
                f.itemMainId = bdcopyitem.itemMainId;
                f.itemNo = bdcopyitem.itemNo;
              }
            });
          });
        });

        if (this.delbackunderlying.length != 0) {
          //标的处理
          this.delbackunderlying.gcPolicyItemVoList.forEach((v) => {
            let ret2 = bdcopy.findIndex((k) => {
              //标的序号唯一标示itemMainId
              return v.itemMainId == k.itemMainId;
            });
            if (ret2 == -1) {
              //如果B外层的每条数据在A的外层数据每中找不到，则压入这个找不到的数据并改变valid状态
              v.valid = "00";
              bdcopy.push(v);
            } else {
              //如果B外层的某条数据能在A中找到，则再对比查看该条数据的gcEstimateLossVoList里面的每条数据是否对应的A的gcEstimateLossVoList的存在情况
              v.gcEstimateLossVoList.forEach((p) => {
                let ret3 = bdcopy[ret2].gcEstimateLossVoList.findIndex((t) => {
                  //估损表格每一项的唯一标志
                  return p.estimateId == t.estimateId;
                });
                if (ret3 == -1) {
                  //如果B的内层的某条数据在对应的A中的内层数据中找不到则压入这个找不到的数据并改变valid状态
                  p.valid = "00";
                  bdcopy[ret2].gcEstimateLossVoList.push(p);
                }
              });
            }
          });
          //赔付处理

          this.delbackunderlying.gcAdjustmentVoList.forEach((v) => {
            let ret4 = lpcopy.findIndex((k) => {
              //赔付唯一标示adjustmentId
              return v.adjustmentId == k.adjustmentId;
            });

            if (ret4 == -1) {
              //如果B外层的每条数据在A的外层数据每中找不到，则压入这个找不到的数据并改变flag状态
              v.flag = "00";
              lpcopy.push(v);
            } else {
              //如果B外层的某条数据能在A中找到，则再对比查看该条数据的gcAdjustmentDetailVoList里面的每条数据是否对应的A的gcAdjustmentDetailVoList的存在情况
              v.gcAdjustmentDetailVoList.forEach((p) => {
                let ret5 = lpcopy[ret4].gcAdjustmentDetailVoList.findIndex(
                  (t) => {
                    //赔付表格每一项的唯一标志
                    return p.detailId == t.detailId;
                  }
                );

                if (ret5 == -1) {
                  //如果B的内层的某条数据在对应的A中的内层数据中找不到则压入这个找不到的数据并改变valid状态
                  p.flag = "00";
                  lpcopy[ret4].gcAdjustmentDetailVoList.push(p);
                } else {
                  p.gcAmortizationVoList.forEach((j) => {
                    let ret6 = lpcopy[ret4].gcAdjustmentDetailVoList[
                      ret5
                    ].gcAmortizationVoList.findIndex((w) => {
                      return j.amortizationId == w.amortizationId;
                    });
                    if (ret6 == -1) {
                      j.flag = "00";
                      lpcopy[ret4].gcAdjustmentDetailVoList[
                        ret5
                      ].gcAmortizationVoList.push(j);
                    }
                  });
                }
              });
            }
          });
        }
        let hh = {
          gcClaimMainSelfVo: this.$refs.baseInfo.baseInfo,
          gcPolicyItemVoList: bdcopy,
          gcAdjustmentVoList: lpcopy,
          ggDocumentVoList: this.$refs.uploadFile.getData(), //文档资料
        };
        return hh;
      },
      //审核轨迹
      auditTrail() {
        Vue.gvUtil.showTrail({
          innerRefNo: this.taskObj, //内部参考号
        });
      },
      //返回
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
    },
    methods: {
      initPage: function () {
        Vue.gvUtil.initTranslation("ExpenseStatus,Currency,EstimateLossStatus");
      },
      //标的查询页面
      parentFn(ss, biaoNum) {
        let biaoitemMainId = biaoNum.map((v) => {
          return v.itemMainId;
        });
        if (ss.riskCode && ss.policyNo && ss.version) {
          this.isShow = true;
          //弹框显示后调用其组件上的方法
          setTimeout(() => {
            this.$refs.UnDerly.closeScheme(ss, biaoitemMainId);
            //根据险种显示查询条件
            this.$refs.UnDerly.riskCode = ss.riskCode;
            //保单号
            this.$refs.UnDerly.policyNo = ss.policyNo;
            // 版本号
            this.$refs.UnDerly.versionNo = ss.version;
            // 根据险种调查询结果集合
            this.$refs.UnDerly.initTitle(ss.riskCode);
            //
            this.$refs.UnDerly.defaultout(ss.policyNo, ss.version, ss.riskCode);
          }, 200);
        } else {
          //请先选择自保保单
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbpleaseChoosepolicyf")
          );
        }
      },
      //点击标的险种选择后回险放进标的详情中
      chooseRisk(ss) {
        //添加表单table
        ss.gcEstimateLossVoList = [];
        //vaild='01'表示新增的标的数据
        ss.valid = "01";
        this.$refs.baseInfo.expandForm.underlying.push(ss);
        if (this.$refs.baseInfo.isRed == true) {
          this.$refs.baseInfo.isRed = false;
        }
        this.isShow = false;
      },
      //原单赔案号点击选择后
      originalclaimCode(ss, trueOrfalse) {
        this.claimtrueOrfalse = trueOrfalse;
        // 将后端传回的值赋给基本数据
        //清空只清空标的和理赔信息
        if (trueOrfalse == true) {
          //标的
          this.$refs.baseInfo.expandForm.underlying = [];
          //理赔
          this.$refs.baseInfo.arrpfDatalist.arrpfData =
            this.arrpfDatalist.arrpfData;
        }
        this.$refs.baseInfo.baseInfo = ss;
        this.originalclaim = false;
      },
      //自保保单查询页面点击选择按钮
      inquir(ss, trueOrfalse) {
        //如果要清空所有数据
        this.trueOrfalse = trueOrfalse;
        if (trueOrfalse == true) {
          //基本数据
          //如果修改过保单信息，留下自保赔案号
          let obj = {
            claimMainId: this.$refs.baseInfo.baseInfo.claimMainId,
            claimNo: this.$refs.baseInfo.baseInfo.claimNo,
            claimTempNo: this.$refs.baseInfo.baseInfo.claimTempNo,
            policyNo: "",
            version: "",
            sourceClaimNo: "",
            registerNo: "",
            claimDate: "",
            claimStatus: "",
            riskCode: "",
            insureCompany: "",
            locationAccident: "",
            lossCountry: "",
            lossDateTime: "",
            circumstances: "",
            accidentDescription: "",
            remark: "",
            createdBy: this.$refs.baseInfo.baseInfo.createdBy,
            createdDate: this.$refs.baseInfo.baseInfo.createdDate,
            amendedBy: "",
            amendedDate: "",
            approvedBy: "",
            approvedDate: "",
            checkStatus: "",
            endDate: "",
          };
          this.$refs.baseInfo.baseInfo = obj;
          //标的
          this.$refs.baseInfo.expandForm.underlying = [];
          //理赔
          this.$refs.baseInfo.arrpfDatalist.arrpfData =
            this.arrpfDatalist.arrpfData;
        }
        this.$refs.baseInfo.baseInfo.policyNo = ss.policyNo;
        this.$refs.baseInfo.baseInfo.version = ss.versionNo;
        this.$refs.baseInfo.baseInfo.riskCode = ss.riskCode;
        this.$refs.baseInfo.baseInfo.expiryDate = ss.expiryDate; //保单止期
        this.$refs.baseInfo.baseInfo.effectiveDate = ss.effectiveDate; //保单起期
        this.$refs.baseInfo.selfCurrency = ss.currency; //保单币别
        this.$refs.baseInfo.initHKRate(this.$refs.baseInfo.selfCurrency);
        this.inquiryDialog = false;
      },
      // 原单赔案号查询页面弹框
      OriginalClaim(ss, trueOrFlase) {
        this.origBaseinfochosse = ss;
        this.originalclaim = true;
        setTimeout(() => {
          this.$refs.originalApp.trueOrFlase(trueOrFlase, ss);
        }, 20);
      },
      // 自保保单查询页面弹框
      inquiryD(ss) {
        this.inquiryDialog = true;

        setTimeout(() => {
          this.$refs.inquiry.trueOrFlase(ss);
        }, 20);
      },
      //查询过来的自保赔案号详情页面
      initsettlingNew(ss) {
        if (ss.flag == "claimNo") {
          this.view = false;
          this.checksh = true; //重开等意见list
        }
        let url = Vue.gvUtil.getUrl({
          apiName: "findNewGcClaimMainSelfInfo",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { claimMainId: ss.row }).then((res) => {
          if (res.resCode == "0000") {
            //所有信息只读
            //审核按钮
            this.pass = true;
            //文档资料
            this.isReadonly = true;
            //新增/删除按钮不可见
            this.$refs.baseInfo.unadd = false;
            this.$refs.baseInfo.addbutton = false;
            this.$refs.baseInfo.zbgsLossassbutt = false;
            //没有查询按钮
            this.$refs.baseInfo.self = false;
            this.$refs.baseInfo.Submit = true;
            this.$refs.baseInfo.isReadonly = true;
            //基本信息
            this.$refs.baseInfo.baseInfo =
              res.resData.gcClaimAllInfoVo.gcClaimMainSelfVo;
            //标的
            this.$refs.baseInfo.expandForm.underlying =
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList;
            //判断isRed是否为“01”，01表示是前端系统带出的多条标的信息，标红
            if (
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList.length != 0 &&
              this.$refs.baseInfo.expandForm.underlying[0].isRed == "01"
            ) {
              this.$refs.baseInfo.isRed = true;
            }
            //文档资料
            this.clmdocList = res.resData.gcClaimAllInfoVo.ggDocumentVoList;
            //理赔
            this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcClaimAllInfoVo.gcAdjustmentVoList;
            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return { feeTypeCode: gslist.feeTypeCode };
                      });
                      a.push(c);
                      //码表费用类型循环
                      this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          }
        });
      },
      //工作流审核
      Worktack(ss) {
        let url = Vue.gvUtil.getUrl({
          apiName: "findGcClaimMainSelfInfo",
          contextName: "selfins",
        });
        let c = JSON.parse(ss.param1);
        let obj = { claimTempNo: c.claimNo };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            //存值，审核时回传
            this.Apppassretrun = res.resData.gcClaimAllInfoVo;
            //所有信息只读
            //审核按钮
            this.pass = true;
            //文档资料
            this.isReadonly = true;
            //新增/删除按钮不可见
            this.$refs.baseInfo.unadd = false;
            this.$refs.baseInfo.addbutton = false;
            this.$refs.baseInfo.zbgsLossassbutt = false;
            //没有查询按钮
            this.$refs.baseInfo.self = false;
            this.$refs.baseInfo.Submit = true;
            this.$refs.baseInfo.isReadonly = true;
            //基本信息
            this.$refs.baseInfo.baseInfo =
              res.resData.gcClaimAllInfoVo.gcClaimMainSelfVo;
            //文档资料
            this.clmdocList = res.resData.gcClaimAllInfoVo.ggDocumentVoList;
            //标的
            this.$refs.baseInfo.expandForm.underlying =
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList;
            //理赔
            this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcClaimAllInfoVo.gcAdjustmentVoList;
            //重开
            this.$refs.reopenInfo.reopenData =
              res.resData.gcClaimAllInfoVo.reGcClaimSelfCheckVoList;
            //注销/恢复
            this.$refs.cancelRecovery.cancelRecoveryData =
              res.resData.gcClaimAllInfoVo.logGcClaimSelfCheckVoList;
            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return { feeTypeCode: gslist.feeTypeCode };
                      });
                      a.push(c);
                      //码表费用类型循环
                      this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          }
        });
      },
      //工作流过来的 赔案详情页面可修改
      amendWork() {
        let url = Vue.gvUtil.getUrl({
          apiName: "findGcClaimMainSelfInfo",
          contextName: "selfins",
        });
        let c = JSON.parse(this.taskObj.param1);
        let obj = { claimTempNo: c.claimNo };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            // 深拷贝返回的值，
            this.delbackunderlying = JSON.parse(
              JSON.stringify(res.resData.gcClaimAllInfoVo)
            );
            //文档资料
            this.clmdocList = res.resData.gcClaimAllInfoVo.ggDocumentVoList;
            //基本信息
            this.$refs.baseInfo.baseInfo =
              res.resData.gcClaimAllInfoVo.gcClaimMainSelfVo;
            //标的
            this.$refs.baseInfo.expandForm.underlying =
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList;
            //判断isRed是否为“01”，01表示是前端系统带出的多条标的信息，标红
            if (
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList.length != 0 &&
              this.$refs.baseInfo.expandForm.underlying[0].isRed == "01"
            ) {
              this.$refs.baseInfo.isRed = true;
            }
            //理赔
            this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcClaimAllInfoVo.gcAdjustmentVoList;
            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return { feeTypeCode: gslist.feeTypeCode };
                      });
                      a.push(c);
                      //码表费用类型循环
                      this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          }
        });
      },
      //查询过来的未结案
      cc(s) {
        let url = Vue.gvUtil.getUrl({
          apiName: "findGcClaimMainSelfInfo",
          contextName: "selfins",
        });
        let obj = { claimTempNo: s };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode == "0000") {
            //新增/删除按钮不可见
            this.$refs.baseInfo.addbutton = false;
            //可填写
            // this.$refs.baseInfo.Notthecase = true;
            //没有查询按钮
            this.$refs.baseInfo.self = false;
            // this.$refs.baseInfo.Submit = true;
            // this.$refs.baseInfo.isReadonly = true;
            // 深拷贝返回的值，
            this.delbackunderlying = JSON.parse(
              JSON.stringify(res.resData.gcClaimAllInfoVo)
            );
            //文档资料
            this.clmdocList = res.resData.gcClaimAllInfoVo.ggDocumentVoList;
            //基本信息
            this.$refs.baseInfo.baseInfo =
              res.resData.gcClaimAllInfoVo.gcClaimMainSelfVo;
            //标的
            this.$refs.baseInfo.expandForm.underlying =
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList;
            //判断isRed是否为“01”，01表示是前端系统带出的多条标的信息，标红
            if (
              res.resData.gcClaimAllInfoVo.gcPolicyItemVoList.length != 0 &&
              this.$refs.baseInfo.expandForm.underlying[0].isRed == "01"
            ) {
              this.$refs.baseInfo.isRed = true;
            }
            //理赔
            this.$refs.baseInfo.arrpfDatalist.arrpfData =
              res.resData.gcClaimAllInfoVo.gcAdjustmentVoList;
            //将理赔内的标的序号与标的相同的标的序号压入理赔当前行形成费用类型
            this.$refs.baseInfo.expandForm.underlying.forEach((item) => {
              // 1.循环标的
              this.$refs.baseInfo.arrpfDatalist.arrpfData.forEach(
                (self, selfindex) => {
                  // 2.循环理赔
                  self.gcAdjustmentDetailVoList.forEach((selfChild, index) => {
                    // 3循环理赔内的表格找到表格内与标的相同的标的序号，并拿到理赔的index与理赔表格内的index
                    // new一个数组，将相同标的内估损信息的费用放进数组
                    if (selfChild.itemMainId == item.itemMainId) {
                      let a = [];
                      let c = item.gcEstimateLossVoList.map((gslist) => {
                        return { feeTypeCode: gslist.feeTypeCode };
                      });
                      a.push(c);
                      //码表费用类型循环
                      this.$refs.baseInfo.ClaimFeeTypelist.forEach(
                        (feetypeList) => {
                          a[0].forEach((newa, indexa) => {
                            if (newa.feeTypeCode == feetypeList.codeCode) {
                              newa.feeTypeName = feetypeList.codeName;
                            }
                          });
                        }
                      );
                      this.$refs.baseInfo.arrpfDatalist.arrpfData[
                        selfindex
                      ].gcAdjustmentDetailVoList[index].feeTypeselect = a[0];
                    }
                  });
                }
              );
            });
          }
        });
      },
    },
    mounted: function () {
      //工作流过来的审核
      if (this.$route.query.pageType == "task") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.Worktack(this.taskObj);
      } else if (this.$route.query.pageType == "amend") {
        //工作流过来的下发修改
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.amendWork();
        ////工作流过来的查看
      } else if (this.$route.query.pageType == "back") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        this.Worktack(this.taskObj);
      } else if (this.$route.query.pageType == "weijiean") {
        this.cc(this.$route.query.claimTempNo);
      } else if (this.$route.query.inqurow) {
        //保批单查询页面过来的
        this.$refs.baseInfo.baseInfo.policyNo =
          this.$route.query.inqurow.policyNo;
        this.$refs.baseInfo.baseInfo.version =
          this.$route.query.inqurow.versionNo;
        this.$refs.baseInfo.baseInfo.riskCode =
          this.$route.query.inqurow.riskCode;
        this.$refs.baseInfo.baseInfo.expiryDate =
          this.$route.query.inqurow.expiryDate; //保单止期
        this.$refs.baseInfo.baseInfo.effectiveDate =
          this.$route.query.inqurow.effectiveDate; //保单起期
        this.$refs.baseInfo.selfCurrency = this.$route.query.inqurow.currency; //保单币别
        this.$refs.baseInfo.initHKRate(this.$refs.baseInfo.selfCurrency);
      }
    },
    destroyed: function () {
      if (sessionStorage.getItem("taskObj")) {
        sessionStorage.removeItem("taskObj");
      }
    },
    components: {
      BaseInfo,
      Audit,
      DocList,
      UnDerly,
      OriginalClaim,
      inquiry,
      ReopenInfo,
      CancelRecovery,
      workFlow,
    },
  });
});
