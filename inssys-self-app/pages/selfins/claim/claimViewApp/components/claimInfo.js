/**
 *  赔付信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      'savePayment':'/claim/claim/payment',
    },
  }
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require('./claimInfo.html'),
    name: 'claimInfoApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      isReadonly: {
        type: Boolean,
        default: false
      }
    },
    datas: function () {
      return {
        claimInfo: {
          claimCurrency: '', //索赔币别
          defaultCurrency: '', //默认币别
          exchangeRate: '', //汇率
          claimNo: '',
          claimNotificationNo: '',
          createTime: '',
          createCode: '',
          isSave: '',
          submissionDate: '',
          submitterCode: '',
          submitterName: '',
          claimStatus: '',
          cancelStatus: '',
          reopenStatus: '',
          totalAdjustmentAmount: '', //理算汇总金额
          totalDeductible: '', //免赔额汇总金额
          totalEstimatedLossAmount: '', //估损金额汇总
          totalPrepaidAmount: '', //预付金额汇总
          totalReceivableAmountClaim: '', //本次应收金额汇总_索赔币别
          totalReceivableAmountDefault: '', //本次应收金额汇总
          totalReceivedAmount: '', //本次应收金额汇总
          totalReceivedAmountClaim: '', //实收汇总金额_索赔币别
          totalReceivedAmountDefault: '', //实收汇总金额_默认币别
          updateTime: '',
          updateCode: '',
          gcClaimPaymentDetailList: []
        },
        formData: {
          rules: {
            paymentReceiver: { required: true, message: Vue.filter('translate')('cantEmpty'), trigger: 'change'},
            adjustmentAmount: { required: true, message: Vue.filter('translate')('cantEmpty'), trigger: 'blur'},
            deductible: { required: true, message: Vue.filter('translate')('cantEmpty'), trigger: 'blur'},
            receivableAmount: { required: true, message: Vue.filter('translate')('cantEmpty'), trigger: 'blur'},
            receivedAmount: { required: true, message: Vue.filter('translate')('cantEmpty'), trigger: 'blur'}
          },
          claimAmountList: [],
        },
        otherVisible: false,
        otherList: [],
        instalmentList: [],
        adjInfo: []
      }
    },
    events: {
      //提交赔付信息
      submitClaimInfo: function() {
        console.log('提交')
      },
      //添加赔付金额
      addclaimAmount: function() {
        let lenth = this.formData.claimAmountList.length
        this.formData.claimAmountList.push({
          mark: lenth + 1,
          adjustmentAmount: 0, //理算金额
          adjustmentAmountOther: 0, //理算金额其他
          claimNotificationNo: "",
          createTime: "",
          deductible: 0, //免赔额
          deductibleOther: 0, //免赔额其他
          estimatedLossAmount: 0, //估损金额
          estimatedLossAmountOther: 0, //估损金额其他
          instalmentCount: "", //期数
          isNewClaimPayment: "1",
          paymentReceiver: "00", //赔款接收方
          prepaidAmount: 0, //预付金额
          prepaidAmountOther: 0, //预付金额其他
          receivableAmount: 0, //本次应收金额
          receivableAmountOther: 0, //本次应收金额其他
          receivedAmount: 0, //已收金额
          receivedAmountOther: 0, //已收金额其他
          updateTime: ""
        })
      },
      removeClaimAmount: function(idx) {
        this.formData.claimAmountList.splice(idx,1);
        this.totalYshzje();
        this.totalSshzje();
      },
      //输入金额后失焦进行计算
      countReceivableAmount: function(row, type) {
        //计算估损金额其他
        if(type == 'gs') {
          row.estimatedLossAmountOther = (parseFloat(row.estimatedLossAmount) * this.claimInfo.exchangeRate).toFixed(2);
        }
        //修改理算金额 会修改理算金额其他、已收金额、已收金额其他、本次应收金额、本次应收金额其他
        if(type == 'ls') {
          row.adjustmentAmountOther = (parseFloat(row.adjustmentAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivableAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivedAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivedAmountOther = (parseFloat(row.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
          this.totalYshzje();
          this.totalSshzje();
        }
        if(type == 'mpe') {
          row.deductibleOther = (parseFloat(row.deductible) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivableAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivedAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivedAmountOther = (parseFloat(row.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
          this.totalYshzje();
          this.totalSshzje();
        }
        if(type == 'yf') {
          row.prepaidAmountOther = (parseFloat(row.prepaidAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivableAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivedAmount = parseFloat(row.adjustmentAmount) - parseFloat(row.deductible) - parseFloat(row.prepaidAmount);
          row.receivedAmountOther = (parseFloat(row.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
          this.totalSshzje();
        }
        if(type == 'bcys') {
          row.receivableAmountOther = (parseFloat(row.receivableAmount) * this.claimInfo.exchangeRate).toFixed(2);
          row.receivedAmount = parseFloat(row.receivableAmount)
          row.receivedAmountOther = (parseFloat(row.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
          this.totalSshzje();
        }
        if(type == 'ys') {
          row.receivedAmountOther = (parseFloat(row.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
          this.totalSshzje();
        }
      },
      //计算应收汇总金额
      totalYshzje: function() {
        let totalReceivableAmountClaim1 = this.formData.claimAmountList.reduce((total,item) => {
          return total + (parseFloat(item.adjustmentAmount) - parseFloat(item.deductible));
        },0);
        this.claimInfo.totalReceivableAmountClaim = totalReceivableAmountClaim1.toFixed(2);
        let totalReceivableAmountClaim2 = this.formData.claimAmountList.reduce((total,item) => {
          return total + (parseFloat(item.adjustmentAmountOther) - parseFloat(item.deductibleOther));
        },0);
        this.claimInfo.totalReceivableAmountDefault = totalReceivableAmountClaim2.toFixed(2);
      },
      //计算实收汇总金额
      totalSshzje: function() {
        let totalReceivedAmount1 = this.formData.claimAmountList.reduce((total,item) => {
          return total + (parseFloat(item.prepaidAmount) + parseFloat(item.receivedAmount));
        },0);
        this.claimInfo.totalReceivedAmountClaim = totalReceivedAmount1.toFixed(2);
        let totalReceivedAmount2 = this.formData.claimAmountList.reduce((total,item) => {
          return total + (parseFloat(item.prepaidAmountOther) + parseFloat(item.receivedAmountOther));
        },0);
        this.claimInfo.totalReceivedAmountDefault = totalReceivedAmount2.toFixed(2);
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
            sums[index] = Vue.filter('translate')('sum');
            return;
          }
          if (index === 1 || index === 8) {
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
              let a = document.querySelector('#claimInfo').querySelector('.el-table__footer').querySelectorAll('td')[index].querySelector('.cell');
              let idName = 'claimAmount'+index;
              let html = `<div class='el-input el-input--mini is-disabled'>
              <input type='text' autocomplete='off' id='${idName}' disabled='disabled' class='el-input__inner'>
              </div>`;
              a.innerHTML = html;
              document.getElementById(idName).value = Vue.filter('money')(sums[index], true, 2);
            });
          }
        });
        return sums;
      },
      openOther: function(row) {
        this.otherList = [];
        this.otherList.push(row);
        this.otherVisible = true;
      },
      saveClaimInfo: function(type) {
        let _this = this;
        let result = true;
        this.$refs['formDom'].validate(function (valid,obj) {
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
        if(result) {
          url = Vue.gvUtil.getUrl({
            apiName: 'savePayment',
            contextName: 'product'
          });
          if(type == '0') {
            if(this.instalmentList.length == 0) {
              Vue.gvUtil.confirm({
                msg: '是否确认提交赔付信息并结案？'
              }).then(function() {
                _this.saveApi(type);
              });
            } else {
              let checkOut = this.instalmentList.some(item => item.status == '09' || item.status == '00');
              if(checkOut) {
                Vue.gvUtil.message('尚有未审核通过的理算/公估信息，只能保存不能提交。');
                return;
              } else {
                Vue.gvUtil.confirm({
                  msg: '是否确认提交赔付信息并结案？'
                }).then(function() {
                  _this.saveApi(type);
                });
              }
            }
          } else {
            _this.saveApi(type);
          }
        }
      },
      //选择索赔币别/默认币别时 修改汇率
      async changeRate() {
        let _this = this;
        this.claimInfo.exchangeRate = await Vue.gvUtil.getGgExch(this.claimInfo.claimCurrency, this.claimInfo.defaultCurrency);
        this.formData.claimAmountList.forEach(item => {
          item.adjustmentAmountOther = (parseFloat(item.adjustmentAmount) * _this.claimInfo.exchangeRate).toFixed(2);
          item.deductibleOther = (parseFloat(item.deductible) * _this.claimInfo.exchangeRate).toFixed(2);
          item.estimatedLossAmountOther = (parseFloat(item.estimatedLossAmount) * _this.claimInfo.exchangeRate).toFixed(2);
          item.prepaidAmountOther = (parseFloat(item.prepaidAmount) * _this.claimInfo.exchangeRate).toFixed(2);
          item.receivableAmountOther = (parseFloat(item.receivableAmount) * _this.claimInfo.exchangeRate).toFixed(2);
          item.receivedAmountOther = (parseFloat(item.receivedAmount) * _this.claimInfo.exchangeRate).toFixed(2);
        })
        _this.totalYshzje();
        _this.totalSshzje();
      },
      //选择期数
      selectInstalment: function(val, row) {
        console.log(val, row);
        this.instalmentList.forEach(item => {
          if(item.belong == row.mark && item.isSelected) {
            delete item.isSelected
            delete item.belong
          }
        })
        for(let x = 0; x < this.instalmentList.length; x ++) {
          for(let y = 0; y < val.length; y ++) {
            if(this.instalmentList[x].instalmentCount == val[y]) {
              this.instalmentList[x].isSelected = true;
              this.instalmentList[x].belong = row.mark;
            }
          }
        }
        let total = {
          estimatedLossAmount: 0,
          estimatedLossAmountOther: 0,
          adjustmentAmount: 0,
          adjustmentAmountOther: 0,
          prepaidAmount: 0,
          prepaidAmountOther: 0,
          receivableAmount: 0,
          receivableAmountOther: 0
        }
        for(let i of val) {
          let obj = this.instalmentList.find(item => item.instalmentCount == i);
          total.estimatedLossAmount += parseFloat(obj.estimatedLossAmount);
          total.adjustmentAmount += parseFloat(obj.adjustmentAmount);
          total.prepaidAmount += parseFloat(obj.prepaidAmount);
          total.receivableAmount += parseFloat(obj.receivableAmount);
        }
        for(let k in total) {
          row[k] = total[k];
        }
        this.formData.claimAmountList.forEach(item => {
          item.adjustmentAmountOther = (parseFloat(item.adjustmentAmount) * this.claimInfo.exchangeRate).toFixed(2);
          item.deductibleOther = (parseFloat(item.deductible) * this.claimInfo.exchangeRate).toFixed(2);
          item.estimatedLossAmountOther = (parseFloat(item.estimatedLossAmount) * this.claimInfo.exchangeRate).toFixed(2);
          item.prepaidAmountOther = (parseFloat(item.prepaidAmount) * this.claimInfo.exchangeRate).toFixed(2);
          item.receivableAmountOther = (parseFloat(item.receivableAmount) * this.claimInfo.exchangeRate).toFixed(2);
          item.receivedAmountOther = (parseFloat(item.receivedAmount) * this.claimInfo.exchangeRate).toFixed(2);
        });
        this.totalYshzje();
        this.totalSshzje();
      },
      removeTag: function(val) {
        console.log(val)
      }
    },
    methods: {
      initPage: function() {
        Vue.gvUtil.initTranslation('CancelStatus,ReopenStatus');
        this.claimInfo = this.vo.claimInfo;
        this.formData.claimAmountList = this.vo.claimAmountList;
      },
      translateTableHead: function(str,code) {
        return Vue.filter('translate')(str)+'('+Vue.gvUtil.translationData('Currency', code)+')';
      },
      //设置禁用期数
      disabledOptions: function(qs, row) {
        let idx = this.instalmentList.findIndex(item => item.instalmentCount == qs);
        if(this.instalmentList[idx].isSelected) {
          if(this.instalmentList[idx].belong != row.mark) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      saveApi: function(type) {
        let _this = this;
        if(type == '0') {
          _this.claimInfo.submissionDate = Vue.filter('time')(new Date(), 'yyyy-MM-dd HH:mm:ss');;
          _this.claimInfo.submitterCode = _this.userInfo.userCode;
          _this.claimInfo.submitterName = _this.userInfo.userName;
        }
        if(_this.$route.query.pageType && _this.$route.query.pageType == 'task' && sessionStorage.getItem('taskObj')) {
          var taskObj = JSON.parse(sessionStorage.getItem('taskObj'));
          _this.claimInfo.taskNo = taskObj.taskNo;
        }
        _this.claimInfo.isSave = type;
        _this.claimInfo.gcClaimPaymentDetailList = JSON.parse(JSON.stringify(_this.formData.claimAmountList));
        _this.claimInfo.gcClaimPaymentDetailList.forEach(item => {
          item.instalmentCount = item.instalmentCount.join();
          item.claimNotificationNo = _this.claimInfo.claimNotificationNo;
        });
        _this.claimInfo.totalReceivableAmountClaim = parseFloat(_this.claimInfo.totalReceivableAmountClaim);
        _this.claimInfo.totalReceivableAmountDefault = parseFloat(_this.claimInfo.totalReceivableAmountDefault);
        _this.claimInfo.totalReceivedAmountClaim = parseFloat(_this.claimInfo.totalReceivedAmountClaim);
        _this.claimInfo.totalReceivedAmountDefault = parseFloat(_this.claimInfo.totalReceivedAmountDefault);
        _this.claimInfo.totalEstimatedLossAmount = _this.formData.claimAmountList.reduce((total,item) => { return total + parseFloat(item.estimatedLossAmount); },0);
        _this.claimInfo.totalAdjustmentAmount = _this.formData.claimAmountList.reduce((total,item) => { return total + parseFloat(item.adjustmentAmount); },0);
        _this.claimInfo.totalDeductible = _this.formData.claimAmountList.reduce((total,item) => { return total + parseFloat(item.deductible); },0);
        _this.claimInfo.totalPrepaidAmount = _this.formData.claimAmountList.reduce((total,item) => { return total + parseFloat(item.prepaidAmount); },0);
        _this.claimInfo.totalReceivedAmount = _this.formData.claimAmountList.reduce((total,item) => { return total + parseFloat(item.receivableAmount); },0);
        Vue.gvUtil.http.post(url, _this.claimInfo).then(function (res) {
          if (res.resCode === '0000') {
            // if(type == '1') {
            //   _this.$emit('saveConfirm',Vue.filter('translate')('gSaveSuccess'));
            //   return;
            // }
            // _this.$emit('saveConfirm');
            if(type == '1') {
              _this.$emit('saveConfirm',Vue.filter('translate')('gSaveSuccess'));
              return;
            }
            _this.$emit('saveConfirm');
            // var gwNextNodeExecutorsList = res.resData.gwNextNodeExecutorsList
            // gwNextNodeExecutorsList[0].exStr = res.resData.next_activity_and_executor_list
            // Vue.gvUtil.showWorkflow({
            //   gwNextNodeExecutorsList: gwNextNodeExecutorsList,
            //   type: '0' // 0 提价 // 1 驳回
            // });
          }
        });
      }
    },
    mounted() {
      let _this = this;
      this.$eventBus.$on('passInstalment', (data) => {
        _this.instalmentList = data;
      });
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    watch: {
      vo: {
        handler(val) {
          this.claimInfo = val.claimInfo
          this.formData.claimAmountList = val.claimAmountList
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val
        },
        deep: true
      }
    }
  });
});