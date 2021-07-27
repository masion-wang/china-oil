/**
 * 项目编制页面
 * @author zcy
 * @time 2020/04/28
 */
define(function (require) {
  Vue.gvUtil.setApi({
    policyNoList: '/endorSelfMain/policyNoList', // 获取自保单号list
    endorsementEntering: '/endorSelfMain/endorsementEntering', //保单号查询
    verifyEndorsementType: '/endorSelfMain/verifyEndorsementType', // 详情查询
    endorSelfMain: '/endorSelfMain/endorAdd', // 保存  params {[],{}}
    endorSubmit: '/endorSelfMain/endorSubmit' // 提交  params {[],{}}
  })
  return Vue.gvUtil.Page({
    template: require('./index.html'),
    name: 'preparadeclaraApp',
    created() {
      let that = this
      let url = Vue.gvUtil.getUrl({
        apiName: "policyNoList",
        contextName: "selfins",
      });

      Vue.gvUtil.http.get(url).then((res) => {
        if (res.resCode == '0000') {
          console.log("保单号list", res); // 这是个数组
          that.PolicyNoList = res.resData


        }

      });

    },
    datas: function () { // 双向绑定页面显示数据
      return {
        Write: false, //冲销是否显示
        isReadonly: false, //显示隐藏
        PolicyNoList: [], // 自报单数组
        numberValidateForm: { //校验
          policyNo: '', // 保单号 policyNo
          endorsementEffectiveDate: '', // 批改生效日期
          policyNoByWriteOff: '', // 自保批单号
          versionNo: '', // 版本号
          PremiumRelated: '', // 金批
          NonPremiumRelated: '', // 文批
          Cancellation: '', // 退保
          Write: '', // 冲销
          risk: '',
        },
        isShow: true,
        effectiveDate: "", // 启期
        expiryDate: '', // 止期
        rules: { //规则
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
          }],
        },
        resData: {}, // 大对象
        tableData: []
      }
    },
    mounted() {
      let that = this
      // console.log('报批单查询来的数据', this.$route.query, this.numberValidateForm)
      if (this.$route.query.frombaocha == 'yes') {

        let data = this.$route.query.policyno
        // that.PolicyNoList = that.PolicyNoList.unshift(data)
        this.numberValidateForm.policyNo = data
        console.log('报批单查询来的数据2', that.PolicyNoList, data, this.$route.query, this.numberValidateForm)

      } else if (this.$route.query.frombaochachongxiao == 'yes') {
        let data = this.$route.query.policyno
        // that.PolicyNoList = that.PolicyNoList.unshift(data)
        this.numberValidateForm.policyNo = data
        console.log('报批单查询来的数据2', that.PolicyNoList, data, this.$route.query, this.numberValidateForm)
        this.isShow = false
      }

    },
    events: {},
    methods: {
      changeschemeName2(e) {
        console.log('e', e)
      },
      //查询跳转报批单查询
      addProjectName() {
        Vue.gvUtil.redirectTo({
          path: 'inquiry_app',
          query: {
            policyNo: this.numberValidateForm.policyNo,
            islock: true,
          }
        }) //跳转保批单查询页面
      },
      a1(value) {
        let that = this
        console.log('金批', value)
        that.numberValidateForm.PremiumRelated = value
        if (value) {
          that.numberValidateForm.Write = false
          that.numberValidateForm.Cancellation = false
        }
        this.Write = false
      },
      a2(value) {
        let that = this
        console.log('文批', value)
        that.numberValidateForm.NonPremiumRelated = value
        if (value) {
          that.numberValidateForm.Write = false
          that.numberValidateForm.Cancellation = false
        }
        this.Write = false
      },
      a3(value) {
        let that = this
        console.log('退保', value)
        that.numberValidateForm.Cancellation = value
        if (value) {
          that.numberValidateForm.PremiumRelated = false
          that.numberValidateForm.NonPremiumRelated = false
          that.numberValidateForm.Write = false
        }
        this.Write = false
      },
      // 选中冲销 显示数据 拼接报批单号
      a4(value) {
        let that = this
        that.numberValidateForm.Write = value
        console.log('冲销', value)
        if (value) {
          this.Write = true
          that.numberValidateForm.policyNoByWriteOff = that.resData.policyNo + '-' + that.resData.versionNo

          that.numberValidateForm.PremiumRelated = false
          that.numberValidateForm.NonPremiumRelated = false
          that.numberValidateForm.Cancellation = false
        } else {
          this.Write = false
        }

      },
      // 下一步
      submitForm(numberValidateForm) { //下一步校验加跳转

        let that = this
        this.$refs[numberValidateForm].validate((valid) => {
          if (valid) {
            let url = Vue.gvUtil.getUrl({
              apiName: "endorsementEntering",
              contextName: "selfins",
            });
            let params = {
              policyNo: that.numberValidateForm.policyNo
            }
            Vue.gvUtil.http.post(url, params).then((res) => {
              console.log('保单号查询', res)


              // 理赔状态
              if (res.resData.code == '0002') {

                this.$confirm(res.resData.exception, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  that.numberValidateForm.endorsementEffectiveDate = res.resData.policySelfMain.endorsementEffectiveDate
                  that.numberValidateForm.versionNo = res.resData.policySelfMain.versionNo
                  that.resData = res.resData.policySelfMain
                  this.isReadonly = true
                }).catch(() => {
                  this.$message({
                    message: Vue.gvUtil.getInzTranslate("insureapp_cancel"), // 取消
                    type: "info", // success
                  });
                });
              }
              // 成功
              else if (res.resCode == '0000') {
                // // debugger
                that.numberValidateForm.endorsementEffectiveDate = res.resData.policySelfMain.endorsementEffectiveDate
                that.numberValidateForm.versionNo = res.resData.policySelfMain.versionNo
                that.resData = res.resData.policySelfMain
                this.isReadonly = true

              }
              // 失败(未通过校验)
              else {
                this.$message({
                  message: res.resData,
                  type: "warning",
                });

                // this.isReadonly = true
              }

            });

          } else {
            return false;
          }
        });
      },
      // 跳转录入页面 根据不同状态 获取详情数据
      jumpto() {
        // 校验批改生效日期 批改类型 自保批单号必录 endorsementEffectiveDate
        // 校验批改生效日期必需在自保保单的起止期（含）范围内 effectiveDate <= endorsementEffectiveDate <= expiryDate
        if (this.numberValidateForm.endorsementEffectiveDate == null) {

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame"), //生效日期不能为空
            type: " success", // success
          });
          return
        }
        let a = this.resData.effectiveDate.slice(0, 10)
        let a2 = a.split("-").reverse().join("-");
        let b = this.resData.effectiveDate.slice(11, 20)
        let c = this.resData.expiryDate.slice(0, 10)
        let c2 = c.split("-").reverse().join("-");
        let d = this.resData.expiryDate.slice(11, 20)
        let e = this.numberValidateForm.endorsementEffectiveDate.slice(0, 10)
        let e2 = e.split("-").reverse().join("-");
        let f = this.numberValidateForm.endorsementEffectiveDate.slice(11, 20)
        let start = a2.concat(' ').concat(b)
        let end = c2.concat(' ').concat(d)
        let userChoose = e2.concat(' ').concat(f)
        let start2 = new Date(start).getTime()
        let end2 = new Date(end).getTime()
        let userChoose2 = new Date(userChoose).getTime()

        if (userChoose2 >= start2 && userChoose2 <= end2) {

        } else {


          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_inTimeFrame"), //批改生效日期必需在自保保单的起止期（含）范围内
            type: "warning", // success
          });
          return
        }
        if (this.numberValidateForm.PremiumRelated && this.numberValidateForm.NonPremiumRelated) {
          console.log('金批+文批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '05'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo5App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })

        } else if (this.numberValidateForm.NonPremiumRelated) {
          console.log('文批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '02'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo2App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.Cancellation) {
          console.log('退保')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '03'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo3App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.Write) {
          console.log('冲销')

          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '04'
          console.log('GuPolicySelfMainVo222', GuPolicySelfMainVo)
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo4App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.PremiumRelated) {
          console.log('金批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.policyNoAndVersionNo = this.numberValidateForm.policyNoByWriteOff
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '01'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfoApp',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else {


          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_chooseType"), //请选择批改类型
            type: "warning", // success
          });
        }

        // Vue.gvUtil.redirectTo({
        //   name: 'batchentryinfoApp',
        //   query: {
        //     plan: 'private'
        //   }
        // })
      },

      jumpto2() {
        // 校验批改生效日期 批改类型 自保批单号必录 endorsementEffectiveDate
        // 校验批改生效日期必需在自保保单的起止期（含）范围内 effectiveDate <= endorsementEffectiveDate <= expiryDate
        let a = this.resData.effectiveDate.slice(0, 10)
        let a2 = a.split("-").reverse().join("-");
        let b = this.resData.effectiveDate.slice(11, 20)
        let c = this.resData.expiryDate.slice(0, 10)
        let c2 = c.split("-").reverse().join("-");
        let d = this.resData.expiryDate.slice(11, 20)
        let e = this.numberValidateForm.endorsementEffectiveDate.slice(0, 10)
        let e2 = e.split("-").reverse().join("-");
        let f = this.numberValidateForm.endorsementEffectiveDate.slice(11, 20)
        let start = a2.concat(' ').concat(b)
        let end = c2.concat(' ').concat(d)
        let userChoose = e2.concat(' ').concat(f)
        let start2 = new Date(start).getTime()
        let end2 = new Date(end).getTime()
        let userChoose2 = new Date(userChoose).getTime()

        if (userChoose2 >= start2 && userChoose2 <= end2) {

        } else {

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_inTimeFrame"), //批改生效日期必需在自保保单的起止期（含）范围内
            type: "warning", // success
          });
          return
        }
        if (this.numberValidateForm.PremiumRelated && this.numberValidateForm.NonPremiumRelated) {
          console.log('金批+文批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '05'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })

        } else if (this.numberValidateForm.NonPremiumRelated) {
          console.log('文批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '02'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.Cancellation) {
          console.log('退保')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '03'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.Write) {
          console.log('冲销')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '04'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else if (this.numberValidateForm.PremiumRelated) {
          console.log('金批')
          let GuPolicySelfMainVo = {}
          GuPolicySelfMainVo = this.resData
          GuPolicySelfMainVo.endorsementEffectiveDate = this.numberValidateForm.endorsementEffectiveDate
          GuPolicySelfMainVo.endorsementType = '01'
          Vue.gvUtil.redirectTo({
            name: 'batchentryinfo6App',
            query: {
              plan: 'private',
              row: GuPolicySelfMainVo
            }
          })
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_chooseType"), //请选择批改类型
            type: "warning", // success
          });

        }
      },
      initPage() {},
      getRiskList() {
        var url = Vue.gvUtil.getUrl({
          apiName: 'getRiskList',
          contextName: 'product'
        });
        Vue.gvUtil.http.post(url, {}).then(res => {
          if (res.resCode == '0000') {
            this.bayesianRatingList = res.resData.businessList;
          }
        })
      },
    }
  });
});