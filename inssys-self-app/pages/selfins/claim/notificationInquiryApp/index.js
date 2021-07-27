/**
 * 赔案查询
 * @author 罗丹菱
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var config = {
    api: {
      //查询项目信息
      findGcClaimMainSelf: "/gcClaimMainSelf/findGcClaimMainSelf", //查询
      reopen: "/gcClaimMainSelf/reopen", //重开
      logOutAndRecovery: "/gcClaimMainSelf/logOutAndRecovery", //注销/恢复
      close: "/gcClaimMainSelf/close", //结案
      queryNotification: "/claim/notification/findByPK", //原单赔案
      ClaimMainautoGuClaim: "/gcClaimMainSelf/autoGuClaim", //测试
      pagetWorkNext: "/gcClaimMainSelf/getWorkNext", //工作流弹框
      peiAnprintPDF: "/PDF/printPDF", // 打印"
      addFileNoEntryNodefee: "/guPolicyFee/addFileNoEntryNode", //查看页面时传文档资料
      getReopenWorkNext: "/gcClaimMainSelf/getReopenWorkNext", //重开工作流
    },
  };
  Vue.gvUtil.setApi(config.api);
  var settlingNew = require("../settlingNewApp/index");
  settlingCeding = require("../claimViewApp/index");
  return Vue.gvUtil.Page({
    template: temp,
    name: "notificationInquiryApp",
    components: {
      settlingNew: settlingNew,
      settlingCeding: settlingCeding,
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        linshiclaimTempNo: "", //暂存号
        printClaimNoButton: false, //是否可见赔案打印按钮
        PrintclaimNo: "", //打印入参数
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        input: "", //测试
        retruenbutton: false, //注销/恢复弹框按钮
        data: [], //数据
        auditOpinion: "", //xx意见
        opinionType: "", //意见类型
        auditInfo: {
          approvedRemark: "",
        }, //意见绑值
        Auditopiniontitle: "", //意见title
        Auditopinion: false, //审核意见
        cedingCompany: [], //账单日期
        projectNamelist: [],
        settlingCeding: false, //原单赔案号详情
        settlingNew: false, //自保赔案号详情弹框
        dialogFormVisible: false, //详情页面
        rules: {
          approvedRemark: [
            { required: true, message: "不能为空", trigger: "blur" },
          ],
        },
        table: {
          basic: {
            api: "findGcClaimMainSelf", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            //查询域元数据
            claimTempNo: "", //赔案暂存号
            claimNo: "", //自保赔案号
            policyNo: "", //原单赔案号
            sourceClaimNo: "", //原赔案号
            claimStatus: "",
            policyRiskCode: "",
            riskCode: "", //自保险种
            insureCompany: "",
            lossDateTimeStart: "",
            lossDateTimeEnd: "",
            circumstances: "",
            createdBy: "",
            createdDateStart: "",
            createdDateEnd: "",
            approvedBy: "",
            approvedDateStart: "",
            approvedDateEnd: "",
          },
          fields: [
            {
              labelKey: "zbTmeporaClaim", //赔案暂存号
              showTip: true,
              btns: [
                {
                  prop: "claimTempNo",
                  flag: "claimNo",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              // 自保赔案号
              labelKey: "ClaimNo.",
              showTip: true,
              btns: [
                {
                  prop: "claimNo",
                  flag: "claimNo",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              // 原单赔案号
              labelKey: "OriginalClaimNo",
              showTip: true,
              btns: [
                {
                  prop: "sourceClaimNo",
                  flag: "policyNo",
                  type: "a", //类型按钮 icon/a/btn
                },
              ],
            },
            {
              // 自保险种
              labelKey: "selfInsurance",
              prop: "riskCode",
              showTip: true,
              format: {
                type: "ggcode",
                codeType: "RiskType",
              },
            },
            {
              // 创建人
              labelKey: "founder",
              prop: "createdBy",
            },
            {
              // 创建日期
              labelKey: "createDate",
              prop: "createdDate",
              showTip: true,
            },
            {
              // 审核人
              labelKey: "checker",
              prop: "approvedBy",
            },
            {
              // 审核日期
              labelKey: "checkTime",
              prop: "approvedDate",
              showTip: true,
            },
            {
              // 自保索赔状态
              labelKey: "zbClaimStatus",
              prop: "claimStatus",
              format: {
                type: "ggcode",
                codeType: "ClaimStatus",
              },
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  // 任务列表
                  btnKey: "taskList",
                  flag: "Add",
                  type: "btn",
                },
              ],
            },
          ],
        },
      };
    },
    created() {
      Vue.gvUtil.initTranslation("ClaimStatus");
    },
    events: {
      // 查询前校验
      beforeValidate(data) {
        if (data.createdDateStart && data.createdDateEnd) {
          if (
            this.changeTime(data.createdDateEnd) >=
            this.changeTime(data.createdDateStart)
          ) {
            return true;
          } else {
            //止期不能早于起期
            this.$message({
              message: Vue.gvUtil.getInzTranslate(
                "zbenddatacannotearlierstartdate"
              ),
              type: "warning",
            });
            return false;
          }
        } else {
          return true;
        }
      },
      //日月年转化年月日
      changeTime(ss) {
        var form_date_value = ss.split("-");
        jie = form_date_value[2].trim().split(" ");
        var targetDate =
          jie[0] + "-" + form_date_value[1] + "-" + form_date_value[0];
        return targetDate;
      },
      //打印
      getPrint() {
        var url = Vue.gvUtil.getUrl({
          apiName: "peiAnprintPDF",
          contextName: "selfins",
        });
        let obj = {
          templateName: "DebitCredNote-Claim",
          claimNo: this.PrintclaimNo,
          isEmail: false,
        };
        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "赔案.pdf");
          });
      },
      //弹框关闭前清空数据
      handleClose() {
        this.Auditopinion = false;
        this.retruenbutton = false; ////注销/恢复弹框按钮
        this.auditInfo.approvedRemark = ""; //清空值
      },
      //校验
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
      //重开意见提交按钮
      Auditsumbit() {
        let xiaoyan = this.getValidate();
        if (xiaoyan) {
          //重开接口
          //1.给标志表示点的重开
          //2.调工作流接口
          this.check = Vue.filter("translate")("gBtnReopen"); //重开
          this.WorkingNext("reopen");
        } else {
          return false;
        }
      },
      //重开按钮
      reopenCancelResume() {
        let data = this.$refs.table.getSelectData();
        this.data = data;
        if (data && data.length == 1) {
          //未结案‘00’状态不允许重开 ,'02'状态为重开，重开数据不允许重开
          if (data[0].claimStatus == 00 || data[0].claimStatus == 02) {
            //该数据不允许重开
            Vue.gvUtil.message(Vue.gvUtil.getInzTranslate("zbnotreopened"));
          } else {
            //重开理由
            this.auditOpinion = Vue.gvUtil.getInzTranslate("reason");
            this.opinionType = "02";
            this.retruenbutton = true;
            this.Auditopinion = true;
          }
        } else {
          //请选择一条赔案
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbPleasechooseaclaim")
          );
        }
      },
      // 注销恢复和结案
      cancelOrRecovery(status) {
        var _this = this;
        let data = _this.$refs.table.getSelectData();
        _this.data = data;
        _this.data[0].isClear = "01"; //01是   00否  是否清零
        //有数据且只有一条数据
        if (data && data.length == 1) {
          if (status == "00") {
            //结案时
            //状态不是已结案的都可进行结案（'01'已结案）
            if (data[0].claimStatus != "01") {
              // 请确认该笔赔案是否要清零未决金额并结案？
              Vue.gvUtil
                .confirm({
                  msg: Vue.gvUtil.getInzTranslate("zbAutoCloseL"),
                })
                .then(
                  function () {
                    //结案直接调接口没有意见
                    var url = Vue.gvUtil.getUrl({
                      apiName: "close",
                      contextName: "selfins",
                    });

                    Vue.gvUtil.http.post(url, _this.data).then((res) => {
                      if (res.resCode === "0000" && res.resData == "0000") {
                        _this.$message({
                          //结案成功，操作成功
                          message: Vue.filter("translate")(
                            "gOperationSuccessful"
                          ),
                          type: "success",
                        });
                        _this.$refs.table.onGetList();
                      } else if (
                        res.resCode === "0000" &&
                        res.resData == "0017"
                      ) {
                        //赔案未决金额为0才可结案，当前赔案未决金额不为0，请检查当前赔案未决金额。
                        Vue.gvUtil.message(
                          Vue.gvUtil.getInzTranslate("zbnotclosednotoL")
                        );
                      } else if (
                        res.resCode === "0000" &&
                        res.resData == "0018"
                      ) {
                        //有正在审核的估损任务，请完成任务后再进行结案操作  zblossrastmationtaskL
                        Vue.gvUtil.message(
                          Vue.gvUtil.getInzTranslate("zblossrastmationtaskL")
                        );
                      } else if (
                        res.resCode === "0000" &&
                        res.resData == "0019"
                      ) {
                        //赔案已结案，不允许发起已结案流程
                        Vue.gvUtil.message(
                          Vue.gvUtil.getInzTranslate("zbClaimclosedL")
                        );
                      }
                    });
                  },
                  function () {}
                );
            } else {
              //该数据不允许结案
              Vue.gvUtil.message(Vue.gvUtil.getInzTranslate("zbdatallclosu"));
            }
          } else if (status == "01") {
            //注销/恢复理由 claimStatus: 00注销 01恢复
            _this.auditOpinion = Vue.gvUtil.getInzTranslate(
              "cancelRecoveryReason"
            );
            _this.retruenbutton = false;
            _this.Auditopinion = true;
          }
        } else {
          //请选择一条赔案
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbPleasechooseaclaim")
          );
          return;
        }
      },
      //注销恢复按钮
      retruen(type) {
        let xiaoyan = this.getValidate();
        if (xiaoyan) {
          //拿到注销还是恢复   ‘00’注销  ‘01’恢复
          this.check = type;
          this.WorkingNext();
        }
      },
      //工作流弹框
      WorkingNext(s) {
        this.checkboxGroup = [];
        if (s == "reopen") {
          var url = Vue.gvUtil.getUrl({
            apiName: "getReopenWorkNext",
            contextName: "selfins",
          });
        } else {
          var url = Vue.gvUtil.getUrl({
            apiName: "pagetWorkNext",
            contextName: "selfins",
          });
        }
        Vue.gvUtil.http.post(url, this.taskObj).then((res) => {
          if (res.resCode === "0000") {
            //工作流弹框
            this.workflowdialog = true;
            this.gwNextNodeExecutorsList = res.resData;
          }
        });
      },
      //工作流确定按钮
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //重开提交
          if (this.check == Vue.filter("translate")("gBtnReopen")) {
            let url = Vue.gvUtil.getUrl({
              apiName: "reopen",
              contextName: "selfins",
            });
            let s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
            (this.data[0].opinionType = this.opinionType), //意见类型
              (this.data[0].opinion = this.auditInfo.approvedRemark); //意见内容
            this.data[0].nextUserCode = s;
            Vue.gvUtil.http.post(url, this.data).then((res) => {
              if (res.resCode === "0000" && res.resData == "0000") {
                //操作成功
                this.$message.success(
                  Vue.filter("translate")("gOperationSuccessful")
                );
              } else if (res.resCode === "0000" && res.resData == "0017") {
                //该赔案有任务进行中
                Vue.gvUtil.message(Vue.gvUtil.getInzTranslate("zbcurrmisspro"));
              } else if (res.resCode === "0000" && res.resData == "0019") {
                //该赔案不符合重开规则,不允许重开
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbclaimnoerulesnoetreop")
                );
              }
              this.auditInfo.approvedRemark = ""; //意见清空值
              this.Auditopinion = false;
              this.workflowdialog = false;
              this.$refs.table.onGetList();
            });
            //注销恢复接口
          } else if (this.check == "00" || this.check == "01") {
            var url = Vue.gvUtil.getUrl({
              apiName: "logOutAndRecovery",
              contextName: "selfins",
            });
            let nextCode = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
            this.data[0].opinionType = this.check;
            //恢复还是注销
            this.data[0].opinion = this.auditInfo.approvedRemark;
            //意见内容
            this.data[0].nextUserCode = nextCode;
            Vue.gvUtil.http.post(url, this.data).then((res) => {
              //0017 赔案已注销，不能再次发起注销流程
              if (res.resCode == "0000" && res.resData == "0017") {
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbcancelladnnotag")
                );
              } else if (res.resCode == "0000" && res.resData == "0019") {
                // 0019   赔案未注销,不允许发起恢复流程
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbrecovenotcancelled")
                );
              } else if (res.resCode == "0000" && res.resData == "0014") {
                // 0014 赔案已存在审核通过的赔付信息，不允许注销
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbbeenappriovefnotcancell")
                );
              } else if (res.resCode == "0000" && res.resData == "0000") {
                //操作成功
                this.$message.success(
                  Vue.filter("translate")("gOperationSuccessful")
                );
              } else if (res.resCode == "0000" && res.resData == "0018") {
                //  当前赔案任务进行中
                Vue.gvUtil.message(Vue.gvUtil.getInzTranslate("zbcurrmisspro"));
              } else if (res.resCode == "0000" && res.resData == "0013") {
                //当前赔案已结案，不允许注销
                this.$message.success(
                  Vue.gvUtil.getInzTranslate("zbcurrnortocan")
                );
              }
              this.auditInfo.approvedRemark = ""; //意见清空值
              this.Auditopinion = false; //意见弹框关闭
              this.workflowdialog = false; //工作流弹框关闭
              this.$refs.table.onGetList(); //刷新页面
            });
          }
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.gvUtil.getInzTranslate("zbseleoneoprat"));
        }
      },
      close() {
        this.checkboxGroup = [];
      },
    },
    methods: {
      //补录文档资料
      UPfile() {
        var url = Vue.gvUtil.getUrl({
          apiName: "addFileNoEntryNodefee",
          contextName: "selfins",
        });
        let obj = {
          claimTempNo: this.linshiclaimTempNo, //暂存号
          ggDocumentList: this.$refs.settlingNew.clmdocList, //文档资料
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
      onListBtn(row, type) {
        //自保赔案号详情
        if (type == "claimNo") {
          if (row.checkStatus == "01") {
            this.printClaimNoButton = true;
          }
          this.settlingNew = true;
          this.PrintclaimNo = row.claimNo; //存打印入参数
          this.linshiclaimTempNo = row.claimTempNo; //文档上传
          let claimNo = {
            flag: "claimNo",
            row: row.claimMainId,
          };
          setTimeout(() => {
            this.$refs.settlingNew.initsettlingNew(claimNo);
          }, 0);
        } else if (type == "policyNo") {
          //原单详情
          this.claimDetailTimeStamp = new Date().getTime();
          this.settlingCeding = true;
          setTimeout(() => {
            this.$refs.settlingCeding.initClaimDetail(row.sourceClaimNo);
          }, 0);
          //任务列表
        } else if (type == "Add") {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
        }
      },
      //修改按钮
      chengeModeify() {
        let data = this.$refs.table.getSelectData();
        this.data = data;
        //有数据且只有一条数据且为未结案状态
        if (
          data &&
          data.length == 1 &&
          data[0].claimStatus == "00" &&
          data[0].checkStatus == "01"
        ) {
          Vue.gvUtil.redirectTo({
            name: "settlingNewApp",
            query: { pageType: "weijiean", claimTempNo: data[0].claimTempNo },
          });
        } else {
          //请选择未决未清零并且未结案的赔案
          Vue.gvUtil.message(
            Vue.gvUtil.getInzTranslate("zbseletheoutandclaimsL")
          );
          return;
        }
      },
    },
  });
});
