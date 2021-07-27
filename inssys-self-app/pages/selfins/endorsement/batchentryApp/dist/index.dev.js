"use strict";

/**
 * 项目编制页面
 * @author zcy
 * @time 2020/04/28
 */
define(function (require) {
  Vue.gvUtil.setApi({
    policyNoList: '/endorSelfMain/policyNoList',
    // 获取自保单号list
    endorsementEntering: '/endorSelfMain/endorsementEntering',
    //保单号查询
    verifyEndorsementType: '/endorSelfMain/verifyEndorsementType',
    // 详情查询
    endorSelfMain: '/endorSelfMain/endorAdd',
    // 保存  params {[],{}}
    endorSubmit: '/endorSelfMain/endorSubmit' // 提交  params {[],{}}

  });
  return Vue.gvUtil.Page({
    template: require('./index.html'),
    name: 'preparadeclaraApp',
    created: function created() {
      var that = this;
      var url = Vue.gvUtil.getUrl({
        apiName: "policyNoList",
        contextName: "selfins"
      });
      Vue.gvUtil.http.get(url).then(function (res) {
        if (res.resCode == '0000') {
          console.log("保单号list", res); // 这是个数组

          that.PolicyNoList = res.resData;
        }
      });
    },
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        Write: false,
        //冲销是否显示
        isReadonly: false,
        //显示隐藏
        PolicyNoList: [],
        // 自报单数组
        numberValidateForm: {
          //校验
          policyNo: '',
          // 保单号 policyNo
          endorsementEffectiveDate: '',
          // 批改生效日期
          policyNoByWriteOff: '',
          // 自保批单号
          versionNo: '',
          // 版本号
          PremiumRelated: '',
          // 金批
          NonPremiumRelated: '',
          // 文批
          Cancellation: '',
          // 退保
          Write: '',
          // 冲销
          risk: ''
        },
        isShow: true,
        effectiveDate: "",
        // 启期
        expiryDate: '',
        // 止期
        rules: {
          //规则
          Write: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          policyNo: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          endorsementEffectiveDate: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
        resData: {},
        // 大对象
        tableData: []
      };
    },
    mounted: function mounted() {
      var that = this; // console.log('报批单查询来的数据', this.$route.query, this.numberValidateForm)

      if (this.$route.query.frombaocha == 'yes') {
        var data = this.$route.query.policyno; // that.PolicyNoList = that.PolicyNoList.unshift(data)

        this.numberValidateForm.policyNo = data;
        console.log('报批单查询来的数据2', that.PolicyNoList, data, this.$route.query, this.numberValidateForm);
      } else if (this.$route.query.frombaochachongxiao == 'yes') {
        var _data = this.$route.query.policyno; // that.PolicyNoList = that.PolicyNoList.unshift(data)

        this.numberValidateForm.policyNo = _data;
        console.log('报批单查询来的数据2', that.PolicyNoList, _data, this.$route.query, this.numberValidateForm);
        this.isShow = false;
      }
    },
    events: {},
    methods: {
      changeschemeName2: function changeschemeName2(e) {
        console.log('e', e);
      },
      //查询跳转报批单查询
      addProjectName: function addProjectName() {
        Vue.gvUtil.redirectTo({
          path: 'inquiry_app',
          query: {
            policyNo: this.numberValidateForm.policyNo,
            islock: true
          }
        }); //跳转保批单查询页面
      },
      a1: function a1(value) {
        var that = this;
        console.log('金批', value);
        that.numberValidateForm.PremiumRelated = value;

        if (value) {
          that.numberValidateForm.Write = false;
          that.numberValidateForm.Cancellation = false;
        }

        this.Write = false;
      },
      a2: function a2(value) {
        var that = this;
        console.log('文批', value);
        that.numberValidateForm.NonPremiumRelated = value;

        if (value) {
          that.numberValidateForm.Write = false;
          that.numberValidateForm.Cancellation = false;
        }

        this.Write = false;
      },
      a3: function a3(value) {
        var that = this;
        console.log('退保', value);
        that.numberValidateForm.Cancellation = value;

        if (value) {
          that.numberValidateForm.PremiumRelated = false;
          that.numberValidateForm.NonPremiumRelated = false;
          that.numberValidateForm.Write = false;
        }

        this.Write = false;
      },
      // 选中冲销 显示数据 拼接报批单号
      a4: function a4(value) {
        var that = this;
        that.numberValidateForm.Write = value;
        console.log('冲销', value);

        if (value) {
          this.Write = true;
          that.numberValidateForm.policyNoByWriteOff = that.resData.policyNo + '-' + that.resData.versionNo;
          that.numberValidateForm.PremiumRelated = false;
          that.numberValidateForm.NonPremiumRelated = false;
          that.numberValidateForm.Cancellation = false;
        } else {
          this.Write = false;
        }
      },
      // 下一步
      submitForm: function submitForm(numberValidateForm) {
        var _this = this;

        //下一步校验加跳转
        var that = this;
        this.$refs[numberValidateForm].validate(function (valid) {
          if (valid) {
            var url = Vue.gvUtil.getUrl({
              apiName: "endorsementEntering",
              contextName: "selfins"
            });
            var params = {
              policyNo: that.numberValidateForm.policyNo
            };
            Vue.gvUtil.http.post(url, params).then(function (res) {
              console.log('保单号查询', res); // 理赔状态

              if (res.resData.code == '0002') {
                _this.$confirm(res.resData.exception, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(function () {
                  that.numberValidateForm.endorsementEffectiveDate = res.resData.policySelfMain.endorsementEffectiveDate;
                  that.numberValidateForm.versionNo = res.resData.policySelfMain.versionNo;
                  that.resData = res.resData.policySelfMain;
                  _this.isReadonly = true;
                })["catch"](function () {
                  _this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              } // 成功
              else if (res.resCode == '0000') {
                  // // debugger
                  that.numberValidateForm.endorsementEffectiveDate = res.resData.policySelfMain.endorsementEffectiveDate;
                  that.numberValidateForm.versionNo = res.resData.policySelfMain.versionNo;
                  that.resData = res.resData.policySelfMain;
                  _this.isReadonly = true;
                } // 失败(未通过校验)
                else {
                    _this.$message({
                      message: res.resData,
                      type: "warning"
                    }); // this.isReadonly = true

                  }
            });
          } else {
            return false;
          }
        });
      },
      // 跳转录入页面 根据不同状态 获取详情数据
      jumpto: function jumpto() {
        // 校验批改生效日期 批改类型 自保批单号必录 endorsementEffectiveDate
        // 校验批改生效日期必需在自保保单的起止期（含）范围内 effectiveDate <= endorsementEffectiveDate <= expiryDate
        if (this.numberValidateForm.endorsementEffectiveDate == null) {
          this.$message.success('生效日期不能为空');
          return;
        }

        var a = this.resData.effectiveDate.slice(0, 10);
        var a2 = a.split("-").reverse().join("-");
        var b = this.resData.effectiveDate.slice(11, 20);
        var c = this.resData.expiryDate.slice(0, 10);
        var c2 = c.split("-").reverse().join("-");
        var d = this.resData.expiryDate.slice(11, 20);
        var e = this.numberValidateForm.endorsementEffectiveDate.slice(0, 10);
        var e2 = e.split("-").reverse().join("-");
        var f = this.numberValidateForm.endorsementEffectiveDate.slice(11, 20);
        var start = a2.concat(' ').concat(b);
        var end = c2.concat(' ').concat(d);
        var userChoose = e2.concat(' ').concat(f);
        var start2 = new Date(start).getTime();
        var end2 = new Date(end).getTime();
        var userChoose2 = new Date(userChoose).getTime();

        if (userChoose2 >= start2 && userChoose2 <= end2) {} else {
          this.$message({
            showClose: true,
            message: '批改生效日期必需在自保保单的起止期（含）范围内',
            type: 'warning'
          });
          return;
        }

        if (this.numberValidateForm.PremiumRelated && this.numberValidateForm.NonPremiumRelated) {
          console.log('金批+文批');
          var GuPolicySelfMainVo = {};
          GuPolicySelfMainVo = this.resData;
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff;
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          GuPolicySelfMainVo.endorsementType = '05';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo5App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          });
        } else if (this.numberValidateForm.NonPremiumRelated) {
          console.log('文批');
          var _GuPolicySelfMainVo = {};
          _GuPolicySelfMainVo = this.resData;
          _GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff;
          _GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo.endorsementType = '02';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo2App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo
            }
          });
        } else if (this.numberValidateForm.Cancellation) {
          console.log('退保');
          var _GuPolicySelfMainVo2 = {};
          _GuPolicySelfMainVo2 = this.resData;
          _GuPolicySelfMainVo2.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff;
          _GuPolicySelfMainVo2.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo2.endorsementType = '03';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo3App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo2
            }
          });
        } else if (this.numberValidateForm.Write) {
          console.log('冲销');
          var _GuPolicySelfMainVo3 = {};
          _GuPolicySelfMainVo3 = this.resData;
          _GuPolicySelfMainVo3.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff;
          _GuPolicySelfMainVo3.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo3.endorsementType = '04';
          console.log('GuPolicySelfMainVo222', _GuPolicySelfMainVo3);
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo4App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo3
            }
          });
        } else if (this.numberValidateForm.PremiumRelated) {
          console.log('金批');
          var _GuPolicySelfMainVo4 = {};
          _GuPolicySelfMainVo4 = this.resData;
          _GuPolicySelfMainVo4.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff;
          _GuPolicySelfMainVo4.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo4.endorsementType = '01';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfoApp',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo4
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '请选择批改类型',
            type: 'warning'
          });
        } // Vue.gvUtil.redirectTo({
        //   name: 'batchentryinfoApp',
        //   query: {
        //     plan: 'private'
        //   }
        // })

      },
      jumpto2: function jumpto2() {
        // 校验批改生效日期 批改类型 自保批单号必录 endorsementEffectiveDate
        // 校验批改生效日期必需在自保保单的起止期（含）范围内 effectiveDate <= endorsementEffectiveDate <= expiryDate
        var a = this.resData.effectiveDate.slice(0, 10);
        var a2 = a.split("-").reverse().join("-");
        var b = this.resData.effectiveDate.slice(11, 20);
        var c = this.resData.expiryDate.slice(0, 10);
        var c2 = c.split("-").reverse().join("-");
        var d = this.resData.expiryDate.slice(11, 20);
        var e = this.numberValidateForm.endorsementEffectiveDate.slice(0, 10);
        var e2 = e.split("-").reverse().join("-");
        var f = this.numberValidateForm.endorsementEffectiveDate.slice(11, 20);
        var start = a2.concat(' ').concat(b);
        var end = c2.concat(' ').concat(d);
        var userChoose = e2.concat(' ').concat(f);
        var start2 = new Date(start).getTime();
        var end2 = new Date(end).getTime();
        var userChoose2 = new Date(userChoose).getTime();

        if (userChoose2 >= start2 && userChoose2 <= end2) {} else {
          this.$message({
            showClose: true,
            message: '批改生效日期必需在自保保单的起止期（含）范围内',
            type: 'warning'
          });
          return;
        }

        if (this.numberValidateForm.PremiumRelated && this.numberValidateForm.NonPremiumRelated) {
          console.log('金批+文批');
          var GuPolicySelfMainVo = {};
          GuPolicySelfMainVo = this.resData;
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          GuPolicySelfMainVo.endorsementType = '05';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          });
        } else if (this.numberValidateForm.NonPremiumRelated) {
          console.log('文批');
          var _GuPolicySelfMainVo5 = {};
          _GuPolicySelfMainVo5 = this.resData;
          _GuPolicySelfMainVo5.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo5.endorsementType = '02';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo5
            }
          });
        } else if (this.numberValidateForm.Cancellation) {
          console.log('退保');
          var _GuPolicySelfMainVo6 = {};
          _GuPolicySelfMainVo6 = this.resData;
          _GuPolicySelfMainVo6.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo6.endorsementType = '03';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo6
            }
          });
        } else if (this.numberValidateForm.Write) {
          console.log('冲销');
          var _GuPolicySelfMainVo7 = {};
          _GuPolicySelfMainVo7 = this.resData;
          _GuPolicySelfMainVo7.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo7.endorsementType = '04';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo7
            }
          });
        } else if (this.numberValidateForm.PremiumRelated) {
          console.log('金批');
          var _GuPolicySelfMainVo8 = {};
          _GuPolicySelfMainVo8 = this.resData;
          _GuPolicySelfMainVo8.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate;
          _GuPolicySelfMainVo8.endorsementType = '01';
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: _GuPolicySelfMainVo8
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '请选择批改类型',
            type: 'warning'
          });
        }
      },
      initPage: function initPage() {},
      getRiskList: function getRiskList() {
        var _this2 = this;

        var url = Vue.gvUtil.getUrl({
          apiName: 'getRiskList',
          contextName: 'product'
        });
        Vue.gvUtil.http.post(url, {}).then(function (res) {
          if (res.resCode == '0000') {
            _this2.bayesianRatingList = res.resData.businessList;
          }
        });
      }
    }
  });
});