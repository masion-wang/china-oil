/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  // 引入API
  let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  //注册API
  // Vue.gvUtil.setApi(config.api);
  Vue.gvUtil.setApi({
    policySelfMainpagetWorkNext: "/policySelfMain/getWorkNext", //工作流弹框
    verifyEndorsementType: "/endorSelfMain/verifyEndorsementType", // 详情查询
    endorSelfMainendorDetail: "/endorSelfMain/endorDetail", // 详情查询 工作流
    // 回显数据
    endorSelfMainadd: "/endorSelfMain/add", // 保存接口
    endorSelfMainsubmit: "/endorSelfMain/submit", // 提交接口
    calculateItems: "/policySelfMain/calculateItems", // 标的重新计算
    calculateInstalment: "/guinstallmain/calculateInstalment", // 分期计算
    // 查询子组件
    findProject: "/policySelfMain/findProject", //项目
    findScheme: "/policySelfMain/findScheme", // 方案
    policySelfMainfindList: "/policySelfMain/findRisk", // 原险种
    searchPolicy: "/policySelfMain/findPolicyAllInfo", // 查询接口
    exportItemExcel: "/policyItemMain/exportItemExcel", // excel导出
    importItemExcel: "/policyItemMain/importItemExcel", // excel导入
    importClauseExcel: "/guPolicyClause/importClauseExcel", // 条款导入
    findDetail: "/ggRisk/findDetail", // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
    findExchange: "/ggCode/findExchangeRate", // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
    findReinsurerList: "/policySelfMain/findReinsurerList", // 再保人
    findUserList: "/policySelfMain/findUserList", // 经办人 承包人
    getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //保单详情接口
    UserInfo: "/User/UserInfo", // 获取用户信息
    verify: "/policySelfMain/verify", // 审核接口
    getList: "/document/getList", //查打印列表
    printPDF: "/PDF/printPDF", // 下载pdf
  });
  var BaseInfo = require("./components/baseInfo"),
    paymentPlan = require("./components/paymentPlan"),
    DocList = require("./components/docList"),
    paymentPlanDetail = require("./components/paymentPlanDetail");
  selectpolicyApp = require("./components/selectpolicyApp");
  const ROUTETYPELIST = {
    "01": "focus",
    "02": "authorizedSystemt",
    "03": "authorized",
    "04": "jointStock",
  };
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "batchentryinfo8App",
    components: {
      BaseInfo,
      paymentPlan,
      DocList,
      selectpolicyApp,
      // paymentPlanDetail,
    },
    shareStore: function () {
      return {
        policyInfo: null,
      };
    },
    // query: function () { //双向绑定页面显示数据
    //   return {
    //     objFromSelectpolicyApp: {}
    //   }
    // },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        Printandscheme: false, //是否可点击打印条款两个按钮
        payment: false, //费用页面展示否
        showinsureDialog: false, //保存后提示
        //页面ID policy为保单页面 endorsement为批单页面 默认为保单 由路由路径param对象的id属性获取该值
        pageId: "policy",
        //type值 init（初始化）、detail（详情）、edit（编辑/批改）、audit（审核）
        pageType: "",
        pageStyle: "",
        //折叠窗默认弹开
        activeNames: ["baseInfo", "paymentPlanInfo", "docListInfo"],
        //保单基本信息表单项
        baseInfo: [],
        // 从查询页面原保单传递过来的数据
        objFromSelectpolicyApp: {},
        //险种明细
        riskDetailInfo: [],
        //缴费计划
        paymentPlanInfo: [],
        //文档资料列表
        docList: [],
        //缴费计划详情列表数组
        paymentPlanDetailList: [],
        //勾选的出单信息数据
        policyNoticeResultPos: [],
        //是否只读
        isReadonly: false,
        //当保单类型为参股时，该值为false 险种明细、缴费计划、公报结构就可以手动录入了，控制只读的
        isJointStock: true,
        //弹窗提示语
        dialogText: "",
        // 校验成功？默认否
        valid: false,
        isShow: false, // 是否打开查询弹窗
        vailfFourBrother: {}, // 校验四兄弟
        guPolicyVoList: [], // 原保单信息
        risk: "", // 险种类型
        status2: "",
      };
    },
    created() {},

    events() {},
    methods: {
      peian(row) {
        this.status2 = "Look";
        this.$refs.baseInfo.getPolicyFeeInfo(row);
      },
      lookClaim(ss, versionNo, cc, policyNo, pilicymainid) {
        this.$refs.baseInfo.getPolicyFeeInfo3(
          "",
          versionNo,
          cc,
          policyNo,
          pilicymainid
        );
      },

      cancel() {
        console.log(
          "带着保单号 回到报批单查询",
          this.$refs.baseInfo.baseInfo.policyNo
        );
        let policyNo = this.$refs.baseInfo.baseInfo.policyNo;
        this.$router.push({
          name: "inquiryApp",
          query: {
            policyNo: policyNo,
          },
        });
      },
      getChild(v) {
        this.docList = v;
      },
      PrintandschemeFor(data) {
        if (data == "01") {
          //如果审核通过可以打印与打开条款
          this.Printandscheme = false;
        } else {
          this.Printandscheme = true;
        }
      },
      // 打印
      printTable() {
        this.$refs.baseInfo.printTableVisible2();
      },
      //条款
      schemeFor() {
        this.$refs.baseInfo.dialogTableVisible = true;
      },
      getobjFromSelectpolicyApp(objFromSelectpolicyApp) {
        // 获取查询页面原保单的值 并且渲染到baseinfo组件
        console.log("查询传递给基础信息的数据", objFromSelectpolicyApp);
        this.objFromSelectpolicyApp = objFromSelectpolicyApp;
        // 基础组件获取查询数据
        this.$refs.baseInfo.dataFromSelectpolicyApp(objFromSelectpolicyApp);
        this.isShow = false;
      },
      initPage() {
        // 获取查询页面原保单的值 并且渲染到baseinfo组件
        console.log("传递的参数", this.query.objFromSelectpolicyApp); // private
        this.objFromSelectpolicyApp = this.query.objFromSelectpolicyApp;
      },
      // append: function () {
      //   // alert("我是回车");
      //   // location.reload()
      //   this.$router.push({
      //     name: "inquiryApp",

      //   });
      // },
      // 校验baseinfo子组件信息 保存
      getValid(valid) {
        console.log("子组件给的值valid", valid);
        this.valid = valid;
        if (valid) {
          this.save();
        }
      },
      //
      getValid2(valid) {
        console.log("子组件给的值valid", valid);
        this.valid = valid;
        if (valid) {
          this.submit();
        }
      },
      // 打开查询弹窗
      getDialogShow(isShow, vailfFourBrother, riskCode, guPolicyVoList) {
        // 获取校验四兄弟和用户选择的险种
        console.log(
          "获取校验四兄弟和用户选择的险种",
          isShow,
          vailfFourBrother,
          riskCode
        );
        this.isShow = isShow;
        this.risk = riskCode;
        this.vailfFourBrother = vailfFourBrother;
        this.guPolicyVoList = guPolicyVoList;
        // 调用子组件事件
        this.$nextTick(() => {
          console.log("this.$refs", this.$refs);
          this.$refs.selectpolicyApp.getValidFourBrother();
        });
        // this.$refs.selectpolicyApp.getValidFourBrother()
      },
      // 保存自保单数据
      save() {
        let that = this;
        // 如果信息没有完善 触发子组件的校验规则 ???
        if (this.valid == false) {
          this.$refs.baseInfo.validatebase();
          return;
        }
        let params2 = {};
        // 1.获取信息
        // delete this.$refs.baseInfo.baseInfo.baseInfoRule;
        // 基础信息
        params2 = this.$refs.baseInfo.baseInfo;
        params2.insuredCode = params2.insured;

        params2.ggDocumentList = this.$refs.uploadFile.getData(); //文档资料
        // console.log('params2', params2)
        // 原保单数组
        params2.guPolicyVoList = this.$refs.baseInfo.guPolicyVoList;
        // 再保人数组
        params2.guPolicyRiVoList =
          this.$refs.baseInfo.fromData.guPolicyRiVoList;
        // 如果再保人数据为空 不行 ???
        // console.log("xxx", params2.guPolicyRiVoList);
        // if (
        //   params2.guPolicyRiVoList.length == 0 ||
        //   params2.guPolicyRiVoList == null
        // ) {
        //   this.$message({
        //     showClose: true,
        //     message: "再保人信息不能空",
        //     type: "warning",
        //   });
        //   this.valid = false;
        //   return;
        // }
        console.log("22");
        // 如果原保单数据为空 不行 ???
        if (
          params2.guPolicyVoList.length == 0 ||
          params2.guPolicyVoList == null
        ) {
          this.$message({
            showClose: true,
            message: "原保单信息不能空",
            type: "warning",
          });
          this.valid = false;
          return;
        }
        // 条款数组
        params2.guPolicyClauseVoList =
          this.$refs.baseInfo.Clause.guPolicyClauseVoList;
        // 标的数组
        params2.guPolicyItemMainVoList =
          this.$refs.baseInfo.underlying.guPolicyItemMainVoList;
        if (
          params2.guPolicyItemMainVoList.length == 0 ||
          params2.guPolicyItemMainVoList == null
        ) {
          this.$message({
            showClose: true,
            message: "原保单信息不能空",
            type: "warning",
          });
          this.valid = false;
          return;
        }
        // 分期对象
        params2.guInstallmentForPolicyVo = {};
        params2.guInstallmentForPolicyVo.guInstallmentRiVo =
          this.$refs.baseInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
        params2.guInstallmentForPolicyVo.guInstallmentRoVoList =
          this.$refs.baseInfo.fqPayee.guInstallmentRoVoList;
        console.log("params2", params2);
        // 如果有条款
        if (params2.guPolicyClauseVoList.length > 0) {
          // 遍历再保人 给再保人对象塞进去数组
          for (let item of params2.guPolicyRiVoList) {
            item.guPolicyClauseVoList =
              this.$refs.baseInfo.Clause.guPolicyClauseVoList;
          }
        }

        // 如果信息完善了 触发保存接口 this.valid == true ???
        if (this.valid == true) {
          if (
            // params2.guPolicyVoList[0].cedingRiskCode == "O-OCI" ||
            // params2.guPolicyVoList[0].cedingRiskCode == "O-OCL" ||
            // params2.guPolicyVoList[0].cedingRiskCode == "E-CIE" ||
            // params2.guPolicyVoList[0].cedingRiskCode == "E-CAR"
            params2.guPolicyItemMainVoList[0].riskCode == 'CARD' || params2.guPolicyItemMainVoList[0].riskCode == 'CARU'
          ) {
            if ((params2.maintenancePeriods && params2.maintenancePeriods.length != 2) || params2.maintenancePeriods == null) {
              this.$message({
                showClose: true,
                message: "维护期不能为空",
                type: "warn",
              });
              // return;
            }
          }
          let url = Vue.gvUtil.getUrl({
            apiName: "endorSelfMainadd",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params2).then((res) => {
            console.log("res", res);
            if (res.resCode == "0000") {
              that.valid = false;
              this.$message({
                showClose: true,
                message: "保存成功！",
                type: "success",
              });
              // 赋值6个字段
              let obj = {};
              obj.proposalNo = res.resData.proposalNo;
              obj.versionNo = res.resData.versionNo;
              obj.createdBy = res.resData.createdBy;
              obj.amendedBy = res.resData.amendedBy;
              obj.amendedDate = res.resData.amendedDate;
              obj.createdDate = res.resData.createdDate;
              obj.policyStatus = res.resData.policyStatus;
              that.givedata2(res.resData);
            } else {
              this.$message({
                showClose: true,
                message: res.resMsg,
                type: "warn",
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请完善信息",
            type: "warning",
          });
          that.valid = false;
        }
      },
      // 提交
      submit() {
        console.log("提交");
        let that = this;
        // 如果信息没有完善 触发子组件的校验规则 ???
        if (this.valid == false) {
          this.$refs.baseInfo.validatebase2();
          return;
        }
        let params2 = {};
        // 1.获取信息
        // delete this.$refs.baseInfo.baseInfo.baseInfoRule;
        // 基础信息
        params2 = this.$refs.baseInfo.baseInfo;
        params2.insuredCode = params2.insured;
        // 投保单号不能为空
        // if (this.$refs.baseInfo.baseInfo.proposalNo == null || this.$refs.baseInfo.baseInfo.proposalNo == '') {
        //   this.$message({
        //     showClose: true,
        //     message: '投保单号不能为空',
        //     type: 'warning'
        //   });
        //   return
        // }

        // console.log('params2', params2)
        // 原保单数组
        params2.guPolicyVoList = this.$refs.baseInfo.guPolicyVoList;
        // 再保人数组
        params2.guPolicyRiVoList =
          this.$refs.baseInfo.fromData.guPolicyRiVoList;
        params2.ggDocumentList = this.$refs.uploadFile.getData(); //文档资料
        // 如果再保人数据为空 不行 ???
        console.log("xxx", params2.guPolicyRiVoList);
        // if (
        //   params2.guPolicyRiVoList.length == 0 ||
        //   params2.guPolicyRiVoList == null
        // ) {
        //   this.$message({
        //     showClose: true,
        //     message: "再保人信息不能空",
        //     type: "warning",
        //   });
        //   this.valid = false;
        //   return;
        // }
        // 如果原保单数据为空 不行
        if (
          params2.guPolicyVoList.length == 0 ||
          params2.guPolicyVoList == null
        ) {
          this.$message({
            showClose: true,
            message: "原保单信息不能空",
            type: "warning",
          });
          this.valid = false;
          return;
        }
        // 条款数组 ？？？
        params2.guPolicyClauseVoList =
          this.$refs.baseInfo.Clause.guPolicyClauseVoList;
        // 标的数组
        params2.guPolicyItemMainVoList =
          this.$refs.baseInfo.underlying.guPolicyItemMainVoList;
        if (
          params2.guPolicyItemMainVoList.length == 0 ||
          params2.guPolicyItemMainVoList == null
        ) {
          this.$message({
            showClose: true,
            message: "原保单信息不能空",
            type: "warning",
          });
          this.valid = false;
          return;
        }
        // 分期对象
        params2.guInstallmentForPolicyVo = {};
        params2.guInstallmentForPolicyVo.guInstallmentRiVo =
          this.$refs.baseInfo.guInstallmentForPolicyVo.guInstallmentRiVo;
        params2.guInstallmentForPolicyVo.guInstallmentRoVoList =
          this.$refs.baseInfo.fqPayee.guInstallmentRoVoList;
        console.log("params2", params2);
        // 如果有条款
        if (params2.guPolicyClauseVoList.length > 0) {
          // 遍历再保人 给再保人对象塞进去数组
          for (let item of params2.guPolicyRiVoList) {
            item.guPolicyClauseVoList =
              this.$refs.baseInfo.Clause.guPolicyClauseVoList;
          }
        }

        // 如果信息完善了 触发保存接口 this.valid == true ???
        if (this.valid == true) {
          let url = Vue.gvUtil.getUrl({
            apiName: "endorSelfMainsubmit",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params2).then((res) => {
            console.log("res", res);
            if (res.resCode == "0000") {
              that.valid = false;
              this.$message({
                showClose: true,
                message: "提交成功！",
                type: "success",
              });
              // 赋值6个字段
              let obj = {};
              obj.proposalNo = res.resData.proposalNo;
              obj.versionNo = res.resData.versionNo;
              obj.createdBy = res.resData.createdBy;
              obj.amendedBy = res.resData.amendedBy;
              obj.amendedDate = res.resData.amendedDate;
              obj.createdDate = res.resData.createdDate;
              obj.policyStatus = res.resData.policyStatus;
              obj.Submit = true;

              that.givedata2(obj);
              // 提交完弹窗告诉用户 投保单号
              this.$alert(res.resData.proposalNo, "投保单号", {
                confirmButtonText: "确定",
                callback: (action) => {},
              });
            } else {
              this.$message({
                showClose: true,
                message: res.resMsg,
                type: "warn",
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请完善信息",
            type: "warning",
          });
          that.valid = false;
        }
      },
      givedata2(data) {
        this.$refs.baseInfo.givedata(data);
        // 录入保存时候获取创建人和修改人
        this.$refs.baseInfo.saveGetTwo();
      },
      // 弹窗关闭
      getclose() {
        this.isShow = false;
        console.log("关闭");
      },
      getclose2() {
        this.isShow = false;
        console.log("关闭");
      },
    },
    computed: {},
  });
});
