/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  // // 引入API
  Vue.gvUtil.setApi({
    addUprInfo: "/uprMain/addUprInfo",
    UPrgetWorkNext: "/uprMain/getWorkNext", //工作流
  });
  var BaseInfo = require("./components/baseInfo");
  Audit = require("./components/audit"); //审核页面
  return Vue.gvUtil.Page({
    components: {
      BaseInfo,
      Audit,
    },
    template: require("./index.html"),
    name: "ibnrManagementAddApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        searchaBu: true,
        check: "", //全局审核通过不通过字段
        checkboxGroup: [], //复选框值
        gwNextNodeExecutorsList: [], //工作流
        gwExecutorList: [], //工作流
        workflowdialog: false, //工作流弹框
        taskObj: {}, //工作流储存
        dialogText: "", //提交成功提示语言
        copyVisible: false, //提交保存成功弹框
        view: true, //查看页面
        pass: false, //审核页面
        isReadonly: false, //文档资料增加按钮
        //折叠窗默认弹开
        activeNames: ["baseInfo", "docListInfo", "auditInfo"],
        //基本数据
        baseInfo: {},
        docListInfo: {},
        //文档资料列表
        docList: [],
        status: "", // 状态
        checked: false, // 离线提交
        valid: false,
      };
    },
    mounted: function () {
      Vue.gvUtil.initTranslation("RiskType", () => {
        // 增加
        if (this.$route.query.flag == "add") {
          this.$refs.baseInfo.getPolicyFeeInfo("add");
        }
        // 审核
        else if (this.$route.query.pageType == "task") {
          this.pass = true;
          this.auditInfoSee = true;
          this.$refs.baseInfo.pass = true;
          this.isReadonly = true;
          this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
          let c = JSON.parse(this.taskObj.param1);
          let id = c.id;
          let converCurrency = c.converCurrency;
          let batchNo = c.batchNo;
          this.$refs.baseInfo.getPolicyFeeInfo2(
            id,
            converCurrency,
            batchNo,
            "Approve"
          );
        } //审核不通过下发修改
        else if (this.$route.query.pageType == "amend") {
          this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
          let c = JSON.parse(this.taskObj.param1);
          let id = c.id;
          let converCurrency = c.converCurrency;
          let batchNo = c.batchNo;
          this.$refs.baseInfo.getPolicyFeeInfo2(
            id,
            converCurrency,
            batchNo,
            "check"
          );
        }
        //工作流进来的 查看
        else if (this.$route.query.pageType == "back") {
          this.pass = false;
          this.view = false;
          this.$refs.baseInfo.pass = true;
          this.isReadonly = true;
          this.taskObj = JSON.parse(sessionStorage.getItem("taskObj")); //拿到工作流的数据
          let c = JSON.parse(this.taskObj.param1);
          let id = c.id;
          let converCurrency = c.converCurrency;
          let batchNo = c.batchNo;
          this.$refs.baseInfo.getPolicyFeeInfo2(
            id,
            converCurrency,
            batchNo,
            "Look"
          );
        }
      });
    },
    events: {
      //初始化
      initPage() {
        Vue.gvUtil.initTranslation("RiskType");
      },
      // 审核按钮
      goAudit(code) {
        //  01 审核通过 06 审核不通过
        if (code == "01") {
          this.check = "01";
          this.WorkingNext();
        } else {
          this.enAudit("06");
        }
      },
      enAudit(code) {
        //  01 审核通过 06 审核不通过
        let that = this;
        let status = code; //  01 审核通过 06 审核不通过  
        let id = that.$refs.baseInfo.id;
        let remark = that.$refs.auditInfo.getData();
        var valid = this.$refs.auditInfo.getValidate(); //审核必填校验
        if (valid) {
          let url = Vue.gvUtil.getUrl({
            apiName: "verify",
            contextName: "selfins",
          });
          var nextCode = that.checkboxGroup.toString();
          let params = {
            status: status,
            id: id,
            remark: remark,
            gwWorkTask: this.taskObj, //工作流
            nextUserCode: nextCode, //下级审核人
          };
          Vue.gvUtil.http.post(url, params).then((res) => {
            if (res.resCode == "0000") {

              Vue.gvUtil
                .alert({
                  msg: "操作成功",
                })
                .then(function () {
                  //跳首页面
                  Vue.gvUtil.redirectTo({
                    name: "workbenchApp"
                  });
                });

            }
          });
        } else {
          return false;
        }
      },
      // 返回上一页
      returnPage() {
        Vue.gvUtil.redirectBack();
      },
      //审核轨迹
      auditTrail() {
        Vue.gvUtil.showTrail({
          innerRefNo: this.taskObj, //内部参考号
        });
      },
      //查询页面(查看详情)
      searchViewUpr(id, converCurrency, batchNo, status) {
        this.searchaBu = false;
        this.pass = false;
        this.view = false;
        this.$refs.baseInfo.pass = true;
        this.isReadonly = true;
        this.$refs.baseInfo.getPolicyFeeInfo2(
          id,
          converCurrency,
          batchNo,
          "Look"
        );
        //已生效与待审核可以打印
        if (status == "01" || status == "09") {
          this.$refs.baseInfo.searchaBu = true;
        } else {
          this.$refs.baseInfo.searchaBu = false;
        }
      },
    },
    methods: {
      getChild(v) {
        this.docList = v;
      },
      // 校验baseinfo子组件信息 保存
      getValid(valid) {
        // console.log("子组件给的值valid", valid);
        this.valid = valid;
        if (valid) {
          if (this.check == '00') {
            this.endSave()
          } else {
            this.saveSubmit();
          }

        }
      },
      //选择下级节点人弹框确定
      confirmExecotor() {
        if (this.checkboxGroup.length > 0) {
          //审核通过接口
          if (this.check == "01") {
            this.checkAudit("01");
            //提交接口
          } else if (this.check == "09") {
            this.endSubmit();
          }
        } else {

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_selectOne"), //至少选择一个操作人
            type: "warning", // success
          });

        }
      },
      // 提交校验
      saveSubmit() {
        // 校验baseInfo
        let that = this;

        // 如果信息没有完善 触发子组件的校验规则 ???
        if (this.valid == false) {

          this.$refs.baseInfo.validatebase();
          return;
        }
        that.check = "09";
        this.WorkingNext();
      },
      // 提交接口
      endSubmit() {
        let that = this;
        var nextCode = that.checkboxGroup.toString();
        // 提交时，提示“是否确认提交本次UPR数据并冲销上次相关数据？”
        this.$confirm("是否确认提交本次UPR数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            that.valid = false;
            // 如果选中了 执行接口 并返回查询
            if (that.checked) {
              let url = Vue.gvUtil.getUrl({
                apiName: "addUprInfo",
                contextName: "selfins",
              });
              let params = {};
              params = this.$refs.baseInfo.baseInfo;
              params.gwWorkTask = this.taskObj; //工作流
              params.nextUserCode = nextCode; //下级审核人
              params.ggDocumentList = this.$refs.uploadFile.getData(); //文档资料
              params.status = '09'

              Vue.gvUtil.http.post(url, params).then((res) => {
                if (res.resCode == "0000") {
                  that.valid = false;
                  Vue.gvUtil
                    .alert({
                      msg: "任务执行成功",
                    })
                    .then(function () {
                      //跳首页面
                      Vue.gvUtil.redirectTo({
                        name: "workbenchApp"
                      });
                    });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.resData,
                    type: "warn",
                  });
                }
              });
            }
            // 没选中 执行成功 提示成功 确定 返回查询
            else {
              let url = Vue.gvUtil.getUrl({
                apiName: "addUprInfo",
                contextName: "selfins",
              });
              let params = {};
              params = this.$refs.baseInfo.baseInfo;
              params.gwWorkTask = this.taskObj; //工作流
              params.nextUserCode = nextCode; //下级审核人
              params.ggDocumentList = this.$refs.uploadFile.getData(); //文档资料
              params.status = '09'

              Vue.gvUtil.http.post(url, params).then((res) => {
                if (res.resCode == "0000") {
                  that.valid = false;
                  Vue.gvUtil
                    .alert({
                      msg: "任务执行成功",
                    })
                    .then(function () {
                      //跳首页面
                      Vue.gvUtil.redirectTo({
                        name: "workbenchApp"
                      });
                    });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.resData,
                    type: "warn",
                  });
                }
              });
            }
          })
          .catch(() => {

            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_cancel"), //已取消
              type: "info", // success
            });

          });
      },
      // 保存校验
      save() {
        // 校验baseInfo
        let that = this;
        that.check = "00";
        // 如果信息没有完善 触发子组件的校验规则 ???
        if (this.valid == false) {
          this.$refs.baseInfo.validatebase();
          return;
        }
      },
      // 保存接口
      endSave() {
        let that = this;
        if (this.valid == false) {
          this.$refs.baseInfo.validatebase();
          return;
        }
        let url = Vue.gvUtil.getUrl({
          apiName: "addUprInfo",
          contextName: "selfins",
        });
        let params = {};
        params = this.$refs.baseInfo.baseInfo;
        params.gwWorkTask = this.taskObj; //工作流
        params.nextUserCode = ''; //下级审核人 nextCode
        params.ggDocumentList = this.$refs.uploadFile.getData(); //文档资料
        params.status = '00'
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.valid = false;
            Vue.gvUtil
              .alert({
                msg: "保存成功",
              })
              .then(function () {
                that.check = ''
              });
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
          apiName: "UPrgetWorkNext",
          contextName: "selfins",
        });
        this.valid = false
        Vue.gvUtil.http.post(url, this.taskObj).then((res) => {
          if (res.resCode === "0000") {
            if (res.resData.length != 0) {
              //工作流弹框
              this.gwNextNodeExecutorsList = res.resData;
              this.workflowdialog = true;
            } else if (res.resData.length == 0) {
              //审核通过
              this.enAudit("01");
            }
          }
        });
      },
      close(){
        this.check == ''
      }
    },
  });
});