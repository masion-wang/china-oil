/**
 *  公估/理算信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      'saveAdj':'/claim/claim/estmated_adjustment',
    },
  }
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require('./lossAdjustingInfo.html'),
    name: 'lossAdjustingInfoApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      isReadonly: {
        type: Boolean,
        default: false
      },
      isAudit: {
        type: String
      },
      showSubBtn: {
        type: Boolean,
        default: false
      }
    },
    datas: function () {
      return {
        lossAdInfo: {
          claimNo: '', //赔案号
          riskCode: '', //险种
          claimStatus: '', //索赔状态
          withinPolicyCoverage: '', //是否属于保单保障范围
          insuranceInterest: '', //保险利益
          submitterName: '', //提交人
          approvedName: '', //审核人
          approvedCode: '',//审核人code
          approvalDate: '', //审核日期
          submissionDate: '', //提交日期
          submitterCode: '',
          submitterName: '',
          claimCurrency: '', //索赔币别
          defaultCurrency: '', //默认币别
          exchangeRate: '', //汇率
        },
        rules: {
        },
        formData: {
          rules: {
            instalmentCount: { required: true, message: '不能为空', trigger: 'blur'},
            estimatedLossAmount: { required: true, message: '不能为空', trigger: 'blur'},
            adjustmentAmount: { required: true, message: '不能为空', trigger: 'blur'},
            receivableAmount: { required: true, message: '不能为空', trigger: 'blur'}
          },
          lossAmountList: [],
        },
        //理算其他弹窗
        otherVisible: false,
        //理算其他信息
        lossAdOtherForm: {
          adjusterAssessorName: '',
          remark: '',
          idx: ''
        },
        lossAdOtherRules: {
          adjusterAssessorName: [{ required: true, message: '不能为空', trigger: 'blur'}]
        },
        lossAdOtherTable: [],
        auditItem: []
      }
    },
    events: {
      //保存提交理算信息
      saveLossAdjustingInfo: function(type) {
        let _this = this;
        console.log(_this.lossAdInfo);
        let result = true;
        this.$refs['lossAdInfo'].validate(function (valid,obj) {
          if(!valid) {
            for(i in obj) {
              if(!_this.$refs[i].focus) {
                _this.$refs[i].$children[0].focus();
              } else {
                _this.$refs[i].focus();
              }
            }
          }
          result = valid;
        });
        let tableResult = true;
        if(this.formData.lossAmountList.length == 0) {
          Vue.gvUtil.message('请录入理算信息');
          return
        } else {
          if(this.formData.lossAmountList.some(i => i.adjusterAssessorName == "")) {
            Vue.gvUtil.message('请录入理算人/公估人');
            return
          }
        }
        this.$refs['formDom'].validate((valid,model) => {
          if (!valid) {
            for(i in model) {
              if(!_this.$refs[i].focus) {
                _this.$refs[i].$children[0].focus();
              } else {
                _this.$refs[i].focus();
              }
            }
          }
          tableResult = valid;
        });
        // if(this.formData.lossAmountList.some(item => item.adjusterAssessorName == '' || item.adjusterAssessorName == null || adjusterAssessorName == undefined)) {
        //   Vue.gvUtil.message('请填写理算其他理算人/公估人');
        //   return false;
        // }
        if(result && tableResult) {
          url = Vue.gvUtil.getUrl({
            apiName: 'saveAdj',
            contextName: 'product'
          });
          if(type == '0') {
            _this.lossAdInfo.submissionDate = Vue.filter('time')(new Date(), 'yyyy-MM-dd HH:mm:ss');;
            _this.lossAdInfo.submitterCode = _this.userInfo.userCode;
            _this.lossAdInfo.submitterName = _this.userInfo.userName;
          }
          if(sessionStorage.getItem('taskObj')) {
            var taskObj = JSON.parse(sessionStorage.getItem('taskObj'));
            _this.lossAdInfo.taskNo = taskObj.taskNo;
          }
          _this.lossAdInfo.isSave = type;
          _this.lossAdInfo.gcClaimEstimatedAdjustmentDetailList = _this.formData.lossAmountList;
          _this.lossAdInfo.totalEstimatedLossAmount = this.formData.lossAmountList.reduce((total,item) => { return total + parseFloat(item.estimatedLossAmount); },0);
          _this.lossAdInfo.totalPrepaidAmount = this.formData.lossAmountList.reduce((total,item) => { return total + parseFloat(item.prepaidAmount); },0);
          _this.lossAdInfo.totalReceivableAmount = this.formData.lossAmountList.reduce((total,item) => { return total + parseFloat(item.receivableAmount); },0);
          Vue.gvUtil.http.post(url, _this.lossAdInfo).then(function (res) {
            if (res.resCode === '0000') {
              if(type == '1') {
                _this.$emit('saveConfirm','保存成功');
                return;
              }
              var gwNextNodeExecutorsList = res.resData.gwNextNodeExecutorsList;
              gwNextNodeExecutorsList[0].exStr = res.resData.next_activity_and_executor_list;
              if(sessionStorage.getItem('taskObj')) {
                var taskObj1 = JSON.parse(sessionStorage.getItem('taskObj'));
                gwNextNodeExecutorsList[0].taskNo = taskObj1.taskNo;
              }
              Vue.gvUtil.showWorkflow({
                gwNextNodeExecutorsList: gwNextNodeExecutorsList,
                type: '0', // 0 提价 // 1 驳回
                code: gwNextNodeExecutorsList[0].innerRefNo ? gwNextNodeExecutorsList[0].innerRefNo.split('#')[0] : gwNextNodeExecutorsList[0].param3.split('#')[0],
                showCode: true,
                showCodeLabel: '赔案号'
              });
            }
          });
        }
      },
      //添加赔付金额
      addlossAmount: function() {
        let len = this.formData.lossAmountList.length;
        //当前期数
        let currentQs = (len+1).toString();
        switch(currentQs.length) {
          case 1:
            currentQs = '00'+currentQs;
            break;
          case 2:
            currentQs = '0'+currentQs;
            break;
          default:
            currentQs = currentQs;
            break;
        }
        this.formData.lossAmountList.push({
          adjusterAssessorCode: "",
          adjusterAssessorName: "",
          adjustmentAmount: 0,
          adjustmentAmountOther: 0,
          claimNo: "",
          createTime: "",
          deductible: "",
          estimatedLossAmount: 0,
          estimatedLossAmountOther: 0,
          instalmentCount: currentQs,
          isNewClaimEsAd: "1",
          prepaidAmount: 0,
          prepaidAmountOther: 0,
          receivableAmount: 0,
          receivableAmountOther: 0,
          remark: "",
          riskCode: "",
          status: "00"
        })
      },
      //保存理算其他
      saveAdjOther: function() {
        this.$refs.lossAdOtherForm.validate((valid, model) => {
          if(!valid) {
            for(i in model) {
              if(!this.$refs[i].focus) {
                this.$refs[i].$children[0].focus();
              } else {
                this.$refs[i].focus();
              }
            }
          } else {
            let idx = this.lossAdOtherForm.idx;
            this.formData.lossAmountList[idx].adjusterAssessorName = this.lossAdOtherForm.adjusterAssessorName;
            this.formData.lossAmountList[idx].remark = this.lossAdOtherForm.remark;
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$refs.lossAdOtherForm.clearValidate();
            this.otherVisible = false;
          }
        })
      },
      //删除一条
      removeLossAmount: function(idx) {
        this.formData.lossAmountList.splice(idx,1);
        this.formData.lossAmountList.forEach((item, index) => {
          let currentQs = (index+1).toString();
          switch(currentQs.length) {
            case 1:
              currentQs = '00'+currentQs;
              break;
            case 2:
              currentQs = '0'+currentQs;
              break;
            default:
              currentQs = currentQs;
              break;
          }
          item.instalmentCount = currentQs;
        })
        this.totalAdj();
      },
      //理算金额汇总
      totalAdj: function() {
        let totalAdjustmentAmount1 = this.formData.lossAmountList.reduce((total,item) => {
          return total + parseFloat(item.adjustmentAmount);
        },0);
        this.lossAdInfo.totalAdjustmentAmount = totalAdjustmentAmount1.toFixed(2);
        let totalAdjustmentAmount2 = this.formData.lossAmountList.reduce((total,item) => {
          return total + parseFloat(item.adjustmentAmountOther);
        },0);
        this.lossAdInfo.adjustmentAmount = totalAdjustmentAmount2.toFixed(2);
      },
      //输入理算金额和预付金额 计算出本次应收金额
      countReceivableAmount: function(row,type) {
        //计算理算
        if(type == 'ls') {
          row.adjustmentAmountOther = (parseFloat(row.adjustmentAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
          row.receivableAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.prepaidAmount) || 0;
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
          this.totalAdj();
        }
        //计算预付
        if(type == 'yf') {
          row.prepaidAmountOther = (parseFloat(row.prepaidAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
          row.receivableAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.prepaidAmount) || 0;
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
        }
        //计算估损
        if(type == 'gs') {
          row.estimatedLossAmountOther = (parseFloat(row.estimatedLossAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
        }
        //计算本次应收金额
        if(type == 'bcys') {
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.lossAdInfo.exchangeRate).toFixed(2);
        }
      },
      openOther: function(row,idx) {
        this.lossAdOtherForm = {
          adjusterAssessorName: '',
          remark: '',
          idx: ''
        };
        for(let i in Object.keys(this.lossAdOtherForm)) {
          this.lossAdOtherForm[Object.keys(this.lossAdOtherForm)[i]] = row[Object.keys(this.lossAdOtherForm)[i]] || '';
        }
        this.lossAdOtherTable = [];
        this.lossAdOtherTable.push(row);
        this.lossAdOtherForm.idx = idx;
        this.otherVisible = true;
      },
      //合计行逻辑
      getSummaries: function(param) {
        if(param.data.length == 0) {
          return []
        }
        const {
          columns,
          data
        } = param;
        const sums = [];
        console.log(param)
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "合计";
            return;
          }
          if (index === 3 || index === 6 || index === 7) {
            sums[index] = "";
            return;
          } else {
            const values = data.map(item => Number(item[column.property]));
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            this.$nextTick(() => {
              let a = document.querySelector('#lossAdjustingInfo').querySelector('.el-table__footer').querySelectorAll('td')[index].querySelector('.cell');
              let idName = 'amount'+index;
              let html = `<div class="el-input el-input--mini is-disabled">
              <input type="text" autocomplete="off" id="${idName}" disabled="disabled" class="el-input__inner">
              </div>`;
              a.innerHTML = html;
              document.getElementById(idName).value = Vue.filter('money')(sums[index], true, 2);
            });
          }
        });
        return sums;
      },
      selectAuditItem: function(val) {
        this.auditItem = val;
      },
      openTrail: function() {
        Vue.gvUtil.showTrail({
          innerRefNo: this.lossAdInfo.claimNo,  //内部参考号
          typeCode: 'claimManagement' //业务类型
        })
      }
    },
    methods: {
      initPage: function() {
        Vue.gvUtil.initTranslation('InsuredAdvice,AdjustmentStatus');
        if(this.isReadonly) {
          this.rules = {}
        } else {
          this.rules = {
            withinPolicyCoverage: [{ required: true, message: '不能为空', trigger: 'change' }],
            insuranceInterest: [{ required: true, message: '不能为空', trigger: 'change' }]
          }
        }
        this.lossAdInfo = this.vo.lossAdInfo;
        this.formData.lossAmountList = this.vo.lossAmountList;
        this.$emit('passInstalment',this.formData.lossAmountList);
      },
      //选择索赔币别/默认币别时 修改汇率
      async changeRate() {
        let _this = this;
        this.lossAdInfo.exchangeRate = await Vue.gvUtil.getGgExch(this.lossAdInfo.claimCurrency, this.lossAdInfo.defaultCurrency);
        this.formData.lossAmountList.forEach(item => {
          item.adjustmentAmountOther = (parseFloat(item.adjustmentAmount) * _this.lossAdInfo.exchangeRate).toFixed(2);
          item.prepaidAmountOther = (parseFloat(item.prepaidAmount) * _this.lossAdInfo.exchangeRate).toFixed(2);
          item.estimatedLossAmountOther = (parseFloat(item.estimatedLossAmount) * _this.lossAdInfo.exchangeRate).toFixed(2);
          item.receivableAmountOther = (parseFloat(item.receivableAmount) * _this.lossAdInfo.exchangeRate).toFixed(2);
        })
        _this.totalAdj();
      },
      getAuditItem: function() {
        return this.formData.lossAmountList;
      },
      getClaimNo() {
        return this.lossAdInfo.claimNo;
      }
    },
    computed: {
      currencyOptions() {  //币别
        return this.$store.state.publicClock.Currency
      },
      userInfo() {
        return this.$store.state.userInfo;
      },
      cantChange() {
        if(this.formData.lossAmountList instanceof Array) {
          if(this.formData.lossAmountList.length > 0) {
            if(this.formData.lossAmountList.every(item => item.status == '09' || item.status == '01')) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    watch: {
      vo: {
        handler(val) {
          this.lossAdInfo = val.lossAdInfo
          this.formData.lossAmountList = val.lossAmountList
          this.$eventBus.$emit('passInstalment',this.formData.lossAmountList);
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val
          if(this.isReadonly) {
            this.rules = {}
          } else {
            this.rules = {
              withinPolicyCoverage: [{ required: true, message: '不能为空', trigger: 'change' }],
              insuranceInterest: [{ required: true, message: '不能为空', trigger: 'change' }]
            }
          }
        },
        deep: true
      },
      isAudit: {
        handler(val) {
          this.isAudit = val
        },
        deep: true
      }
    }
  });
});