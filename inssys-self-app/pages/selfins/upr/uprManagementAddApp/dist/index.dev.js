"use strict";

/**
 * 保单录入页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  // // 引入API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  Vue.gvUtil.setApi({
    addUprInfo: '/uprMain/addUprInfo'
  });

  var BaseInfo = require("./components/baseInfo");

  Audit = require("./components/audit"); //审核页面
  // AddData = require("./components/adddata"); //已添加数据
  // Sterilisation = require("./components/sterilisation"); //冲销数据

  return Vue.gvUtil.Page({
    components: {
      BaseInfo: BaseInfo,
      Audit: Audit // AddData,
      // Sterilisation,

    },
    template: require("./index.html"),
    name: "ibnrManagementAddApp",
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        dialogText: "",
        //提交成功提示语言
        copyVisible: false,
        //提交保存成功弹框
        view: true,
        //查看页面
        inquiryDialog: false,
        //自保保单号查询页面弹框
        originalclaim: false,
        //原单赔案号查询页面弹框
        pass: false,
        //审核页面
        OriginalclaimDialog: false,
        //原单赔案号弹框
        isShow: false,
        //标的查询页面
        isReadonly: false,
        //文档资料增加按钮
        //折叠窗默认弹开
        activeNames: ["baseInfo", "docListInfo"],
        //基本数据
        baseInfo: {},
        docListInfo: {},
        //文档资料列表
        docList: [],
        status: '',
        // 状态
        checked: false,
        // 离线提交
        valid: false
      };
    },
    events: {},
    mounted: function mounted() {
      console.log('审核人员选中返回来的数据', this.$route.query); // 增加

      if (this.$route.query.flag == "add") {
        // let id = this.$route.query.row[0].id
        // let versionNo = this.$route.query.row[0].versionNo
        // this.status = 'Approve'
        this.$refs.baseInfo.getPolicyFeeInfo('add'); // this.$refs.baseInfo.status = 'add'
      } // 审核
      else if (this.$route.query.flag == "Approve") {
          var id = this.$route.query.row[0].id;
          var converCurrency = this.$route.query.row[0].converCurrency;
          var batchNo = this.$route.query.row[0].batchNo; // let proposalNo = this.$route.query.row[0].proposalNo
          // let versionNo = this.$route.query.row[0].versionNo
          // this.status= 'modify'

          this.$refs.baseInfo.getPolicyFeeInfo2(id, converCurrency, batchNo, "Approve"); // this.$refs.baseInfo.status = 'Approve'
        } // 查看
        else if (this.$route.query.flag == "Look") {// console.log('跳转的修改')
            // let proposalNo = this.$route.query.row.proposalNo
            // let versionNo = this.$route.query.row.versionNo
            // this.status = 'Look'
            // this.$refs.baseInfo.getPolicyFeeInfo3(proposalNo, versionNo, 'Look')
          }
    },
    methods: {
      getChild: function getChild(v) {
        this.docList = v;
      },
      // 校验baseinfo子组件信息 保存
      getValid: function getValid(valid) {
        console.log("子组件给的值valid", valid);
        this.valid = valid;

        if (valid) {
          this.saveSubmit();
        }
      },
      saveSubmit: function saveSubmit() {
        var _this = this;

        // 校验baseInfo
        var that = this; // 如果信息没有完善 触发子组件的校验规则 ???

        if (this.valid == false) {
          this.$refs.baseInfo.validatebase();
          return;
        } // 提交时，提示“是否确认提交本次UPR数据并冲销上次相关数据？”


        this.$confirm('是否确认提交本次UPR数据并冲销上次相关数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.valid = false; // 如果选中了 执行接口 并返回查询

          if (that.checked) {
            console.log('选中');
            var url = Vue.gvUtil.getUrl({
              apiName: "addUprInfo",
              contextName: "selfins"
            });
            var params = {};
            params = _this.$refs.baseInfo.baseInfo;
            params.ggDocumentList = _this.$refs.uploadFile.getData(); //文档资料

            Vue.gvUtil.http.post(url, params).then(function (res) {
              console.log("res", res);

              if (res.resCode == "0000") {
                that.valid = false;

                _this.$message({
                  showClose: true,
                  message: '任务执行成功',
                  type: 'success'
                });
              } else {
                _this.$message({
                  showClose: true,
                  message: res.resData,
                  type: 'warn'
                });
              }
            });
          } // 没选中 执行成功 提示成功 确定 返回查询
          else {
              console.log('未选中');
              console.log('选中');

              var _url = Vue.gvUtil.getUrl({
                apiName: "addUprInfo",
                contextName: "selfins"
              });

              var _params = _this.$refs.baseInfo.baseInfo;
              _params.ggDocumentList = _this.$refs.uploadFile.getData(); //文档资料

              Vue.gvUtil.http.post(_url, _params).then(function (res) {
                console.log("res", res);

                if (res.resCode == "0000") {
                  that.valid = false;

                  _this.$message({
                    showClose: true,
                    message: '任务执行成功',
                    type: 'success'
                  });
                } else {
                  _this.$message({
                    showClose: true,
                    message: res.resData,
                    type: 'warn'
                  });
                }
              });
            }
        })["catch"](function () {
          _this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  });
});