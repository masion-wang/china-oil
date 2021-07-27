/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      addGoCircFee: "/goCircFee/addGoCircFee", //提交
      findGoCircFeeInfo: "/goCircFee/findGoCircFeeInfo", //查询详情
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./index.html"),
    name: "uprAddMemberApp",
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
        pass: false, //审核页面
        isReadonly: false, //文档资料增加按钮
        //折叠窗默认弹开
        activeNames: ["baseInfo", "docListInfo", "auditInfo"],
        //基本数据
        baseInfo: {
          feeType: "管理费",
        },
        docListInfo: {},
        feeList: [{
            sourceNo: "第一季度",
            q1th: "",
            itemNo: "",
          },
          {
            sourceNo: "第二季度",
            q2nd: "",
            itemNo: "",
          },
          {
            sourceNo: "第三季度",
            q3rd: "",
            itemNo: "",
          },
          {
            sourceNo: "第四季度",
            q4th: "",
            itemNo: "",
          },
        ],

        baseInforules: {
          currency: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change",
          }, ],
          year: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "change",
          }, ],
          feeType: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur",
          }, ],
          status: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur",
          }, ],
          amount: [{
            required: true,
            message: Vue.filter("translate")("cantEmpty"),
            trigger: "blur",
          }, ],
        },
      };
    },
    events: {
      initpage() {
        Vue.gvUtil.initTranslation("Currency");
      },
      //提交校验
      saveSubmit(ss) {
        //  ‘09’提交
        var _this = this;
        let base = _this.submitFormRulse();
        if (base) {
          //获取时间
          _this.feeList.forEach((v) => {
            if (v.sourceNo == "第一季度") {
              v.q1th = v.itemNo;
            } else if (v.sourceNo == "第二季度") {
              v.q2nd = v.itemNo;
            } else if (v.sourceNo == "第三季度") {
              v.q3rd = v.itemNo;
            } else if (v.sourceNo == "第四季度") {
              v.q4th = v.itemNo;
            }
          });
          _this.baseInfo.q1th = _this.feeList[0].q1th;
          _this.baseInfo.q2nd = _this.feeList[1].q2nd;
          _this.baseInfo.q3rd = _this.feeList[2].q3rd;
          _this.baseInfo.q4th = _this.feeList[3].q4th;
          let nowDate = new Date();
          let year = nowDate.getFullYear();
          let month = nowDate.getMonth() + 1;
          //如果填写的会费年份==现在的年份判断季度是否有填
          if (_this.baseInfo.year == year) {
            if (month < 3 && _this.baseInfo.q1th == "") {
              Vue.gvUtil
                .confirm({
                  msg: "第一季度为已过去季度，确认不填写管理费吗？",
                })
                .then(
                  function () {
                    _this.Sumbit();
                  },
                  function () {}
                );
              //  第二季度
            } else if (month < 6 && month > 3) {
              if (_this.baseInfo.q2nd == "" || _this.baseInfo.q1th == "") {
                Vue.gvUtil
                  .confirm({
                    msg: "第一、二季度为已过去季度，确认不填写管理费吗？",
                  })
                  .then(
                    function () {
                      _this.Sumbit();
                    },
                    function () {}
                  );
              } else {
                _this.Sumbit();
              }
            } //第三季度
            else if (month < 9 && month > 6) {
              if (
                _this.baseInfo.q2nd == "" ||
                _this.baseInfo.q1th == "" ||
                _this.baseInfo.q3rd == ""
              ) {
                Vue.gvUtil
                  .confirm({
                    msg: "第一、二、三季度为已过去季度，确认不填写管理费吗？",
                  })
                  .then(
                    function () {
                      _this.Sumbit();
                    },
                    function () {}
                  );
              } else {
                _this.Sumbit();
              }
              //第四季度
            } else if (month < 12 && month > 9) {
              if (
                _this.baseInfo.q2nd == "" ||
                _this.baseInfo.q1th == "" ||
                _this.baseInfo.q3rd == "" ||
                _this.baseInfo.q4th == ""
              ) {
                Vue.gvUtil
                  .confirm({
                    msg: "第一、二、三、四季度为已过去季度，确认不填写管理费吗？",
                  })
                  .then(
                    function () {
                      _this.Sumbit();
                    },
                    function () {}
                  );
              } else {
                _this.Sumbit();
              }
            } else {
              _this.Sumbit();
            }
            //如果填写的会费年份已经过去了判断4个季度是否有填
          } else if (_this.baseInfo.year < year) {
            if (
              _this.baseInfo.q2nd == "" ||
              _this.baseInfo.q1th == "" ||
              _this.baseInfo.q3rd == "" ||
              _this.baseInfo.q4th == ""
            ) {
              Vue.gvUtil
                .confirm({
                  msg: "第一、二、三、四季度为已过去季度，确认不填写管理费吗？",
                })
                .then(
                  function () {
                    _this.Sumbit();
                  },
                  function () {}
                );
            } else {
              _this.Sumbit();
            }
          } else {
            _this.Sumbit();
          }
        } else {
     
          this.$message({
            message: Vue.gvUtil.getInzTranslate("upr_cannotBeEmpty"), // 数据不能为空
            type: "warning", // success
          });
          return false;
        }
      },
      //提交按钮
      Sumbit() {
        var url = Vue.gvUtil.getUrl({
          apiName: "addGoCircFee",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, this.baseInfo).then((res) => {
          if (res.resCode === "0000" && res.resData == "0019") {
            //  年份或费用类型已存在
            this.$message({
              message: Vue.gvUtil.getInzTranslate("upr_alreadyExist"), // 会费信息已存在,不能新增！
              type: "warning", // success
            });
          } else if (res.resCode === "0000") {
            // 保存跳查询页面;

            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_success"), //操作成功
              type: "success", // success
            });
            this.baseInfo = res.resData;
            this.feeList[0].q1th = res.resData.q1th;
            this.feeList[1].q2nd = res.resData.q2nd;
            this.feeList[2].q3rd = res.resData.q3rd;
            this.feeList[3].q4th = res.resData.q4th;
            this.returnPage();
          }
        });
      },
      // 返回上一页
      returnPage: function () {
        Vue.gvUtil.redirectBack();
      },
    },
    methods: {
      //提交校验
      submitFormRulse() {
        let flag = false;
        this.$refs.baseInfos.validate((valid) => {
          if (valid) {
            flag = true;
          } else {
            flag = false;
          }
        });
        return flag;
      },
      //查询
      modeiftDate() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findGoCircFeeInfo",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, this.$route.query.scoperow).then((res) => {
          if (res.resCode === "0000") {
            this.baseInfo = res.resData;
            this.feeList[0].itemNo = res.resData.q1th;
            this.feeList[1].itemNo = res.resData.q2nd;
            this.feeList[2].itemNo = res.resData.q3rd;
            this.feeList[3].itemNo = res.resData.q4th;
          }
        });
      },
    },
    mounted: function () {
      //查询进入的修改
      if (this.$route.query.type == "modeify") {
        this.modeiftDate();
      }
    },
  });
});