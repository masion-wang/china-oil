/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      addIbnrInfo: "/ibnrMain/addIbnrInfo", //保存接口
      verifyibnr: "/ibnrMain/verify	", //审核按钮
      getIbnrList: "/ibnrMain/getIbnrList	", //查看
    },
  };
  Vue.gvUtil.setApi(config.api);
  var BaseInfo = require("./components/baseInfo");
  Audit = require("./components/audit"); //审核页面
  AddData = require("./components/adddata"); //已添加数据
  Sterilisation = require("./components/sterilisation"); //冲销数据
  return Vue.gvUtil.Page({
    components: {
      BaseInfo,
      Audit,
      AddData,
      Sterilisation,
    },
    template: require("./index.html"),
    name: "ibnrManagementAddApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        dialogText: "", //提交成功提示语言
        copyVisible: false, //提交保存成功弹框
        view: true, //查看页面
        inquiryDialog: false, //自保保单号查询页面弹框
        originalclaim: false, //原单赔案号查询页面弹框
        pass: false, //审核页面
        isReadonly: false, //文档资料增加按钮
        //折叠窗默认弹开
        activeNames: ["baseInfo", "docListInfo", "auditInfo"],
        //基本数据
        baseInfo: {},
        docListInfo: {},
        //文档资料列表
        docList: [],
      };
    },
    events: {
      initpage() {
        Vue.gvUtil.initTranslation("InAndOut,Currency,StreamType,CIRCRisk");
      },
      //保存提交校验
      saveSubmit(ss) {
        //“0”保存  ‘09’提交
        let base = this.$refs.baseInfo.submitForm();
        if (base && this.$refs.adddata.recognizeeTableList.length > 0) {
          var url = Vue.gvUtil.getUrl({
            apiName: "addIbnrInfo",
            contextName: "selfins",
          });
          this.$refs.adddata.recognizeeTableList.forEach((item) => {
            item.status = ss;
          });
          let obj = {
            batchNo: "", //批量任务号
            goIbnrList: this.$refs.adddata.recognizeeTableList, //IBNR信息
            ggDocumentList: this.docList, //文档资料
          };
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode === "0000") {
              //保存跳查询页面
              //操作成功
              this.$message.success(
                Vue.filter("translate")("gOperationSuccessful")
              );
              this.$router.push({
                name: "ibnrManagementApp",
              });
            }
          });
        } else {
          //必填数据不能为空
          this.$message.error(Vue.filter("translate")("requireDataMessage"));
          return false;
        }
      },
      //提交
      endSubmit(ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "addIbnrInfo",
          contextName: "selfins",
        });
        this.$refs.adddata.recognizeeTableList.forEach((item) => {
          item.status = ss;
        });
        let obj = {
          batchNo: "", //批量任务号
          goIbnrList: this.$refs.adddata.recognizeeTableList, //IBNR信息
          ggDocumentList: this.docList, //文档资料
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            //提交成功调工作台
            //操作成功
            this.$message.success(
              Vue.filter("translate")("gOperationSuccessful")
            );
            this.$router.push({
              name: "workbenchApp",
            });
          }
        });
      },
      //审核页面
      goAudit(ss) {
        //06不通过   01通过
        var valid = this.$refs.auditInfo.getValidate(); //审核必填校验
        if (valid) {
          var url = Vue.gvUtil.getUrl({
            apiName: "verifyibnr",
            contextName: "selfins",
          });
          Vue.gvUtil.http
            .post(url, {
              batchNo: this.$refs.baseInfo.baseInfo.batchNo, //任务号
              status: ss, //IBNR状态
              remark: this.$refs.auditInfo.getData(), //审核意见
            })
            .then((res) => {
              if (res.resCode === "0000") {
                if (ss == "06") {
                  //审核不通过跳转到工作台
                  //操作成功
                  this.$message.success(
                    Vue.filter("translate")("gOperationSuccessful")
                  );
                  this.$router.push({
                    name: "workbenchApp",
                  });
                } else if (ss == "01") {
                  //审核通过调下级节点人，未做
                  //操作成功
                  this.$message.success(
                    Vue.filter("translate")("gOperationSuccessful")
                  );
                  this.$router.push({
                    name: "workbenchApp",
                  });
                }
              }
            });
        } else {
          return false;
        }
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //审核通过接口
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
            this.Apppassretrun.ggApproveHistoryVo.opinions = this.$refs.auditInfo.getData();
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
          } else if ((this.check = "09")) {
            this.paSumbit();
          }
        } else {
          //至少选择一个操作人
          this.$message.error(Vue.filter("translate")("zbseleoneoprat"));
        }
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
              //审核通过
              var url = Vue.gvUtil.getUrl({
                apiName: "verifyGcClaimMainSelf",
                contextName: "selfins",
              });
              // ggApproveHistoryVo为审核意见obj
              var s = this.checkboxGroup.toString(); //将选中的值Tostring赋给param2
              this.Apppassretrun.nextUserCode = s;
              this.Apppassretrun.ggApproveHistoryVo = {};
              this.Apppassretrun.gwWorkTask = this.taskObj; //工作流对象
              this.Apppassretrun.ggApproveHistoryVo.opinions = this.$refs.auditInfo.getData();
              Vue.gvUtil.http.post(url, this.Apppassretrun).then((res) => {
                // if (res.resCode == "0000") {
                //   this.$message.success("操作成功");
                //   this.$router.push({
                //     name: "workbenchApp",
                //   }); //跳转到工作台
                // }
              });
            }
          }
        });
      },
    },
    methods: {
      //最大值事件
      maxacDate(max) {
        var a = this.timestampToTime(max);
        if (max != "") {
          this.$refs.baseInfo.baseInfo.lossDateTimeEnd = a;
        } else {
          this.$refs.baseInfo.baseInfo.lossDateTimeEnd = max;
        }
      },
      //时间戳转日月年
      timestampToTime(timestamp) {
        var date = new Date(timestamp);
        Y = date.getFullYear();
        M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        D = date.getDate() + "-";
        return D + M + Y;
      },
      //查询页面过来的
      initsettlingNew(ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "getIbnrList",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            batchNo: ss,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              this.$refs.adddata.batchNoid = ss;
              this.view = false; //保存审核按钮不显示
              this.isReadonly = true; //文档资料不显示
              this.$refs.adddata.pass = true; //不显示新增
              this.$refs.baseInfo.pass = true; //只读
              this.$refs.baseInfo.baseInfo =
                res.resData.getIbnrList.goIbnrList[0]; //基本数据取第一条
              var add = []; //已添加数据
              var chongxiao = []; //冲销数据
              res.resData.getIbnrList.goIbnrList.forEach((item) => {
                if (item.reverseInd == 0) {
                  //已添加数据
                  add.push(item);
                } else {
                  //冲销数据
                  chongxiao.push(item);
                }
              });

              this.$refs.adddata.recognizeeTableList = add; //已添加数据
              this.$refs.sterilisation.recognizeeTableList = chongxiao; //冲销数据
              this.docList = res.resData.getIbnrList.ggDocumentList; //文档资料
            }
          });
      },
      //工作流进来的修改
      Worktask(ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "getIbnrList",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, {
            batchNo: ss,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              this.$refs.adddata.batchNoid = ss;
              this.$refs.baseInfo.baseInfo =
                res.resData.getIbnrList.goIbnrList[0]; //基本数据取第一条
              var add = []; //已添加数据
              var chongxiao = []; //冲销数据
              res.resData.getIbnrList.goIbnrList.forEach((item) => {
                if (item.reverseInd == 0) {
                  //已添加数据
                  add.push(item);
                } else {
                  //冲销数据
                  chongxiao.push(item);
                }
              });

              this.$refs.adddata.recognizeeTableList = add; //已添加数据
              this.$refs.sterilisation = chongxiao; //冲销数据
              this.docList = res.resData.getIbnrList.ggDocumentList; //文档资料
            }
          });
      },
      //返回
      returnPage() {
        this.$router.push({
          name: "workbenchApp",
        }); //跳转到工作台
      },
    },
    mounted: function () {
      //审核页面
      if (this.$route.query.pageType == "task") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let c = JSON.parse(this.taskObj.param1);
        this.pass = true;
        this.isReadonly = true;
        this.$refs.adddata.pass = true; //不显示新增
        //工作流进入的修改
      } else if (this.$route.query.pageType == "amend") {
        this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
        let c = JSON.parse(this.taskObj.param1);
        this.Worktask(c);
        //工作流进来的已处理查看
      } else if (this.$route.query.pageType == "back") {
      }
    },
  });
});
