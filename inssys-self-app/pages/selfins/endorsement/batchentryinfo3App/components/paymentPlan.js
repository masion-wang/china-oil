/**
 *  保险缴费计划组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require('./paymentPlan.html'),
    name: 'paymentPlanApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      pageId: null,
      isReadonly: {
        type: Boolean,
        default: false
      },
      isJointStock: {
        type: Boolean,
        default: true
      }
    },
    datas: function () {
      return {
        Submit:false,//提交后调用
        paymentList: [
          {periodNum:'22'}
        ],
        paymentInfo: {
          period: '', //期数
        },
        rules: {
          period: [{ required: true, message: Vue.filter('translate')('paymentWayDontEmpty'), trigger: 'blur' }]
        }
      }
    },
    events: {
      must: function (obj) {
        if (obj.columnIndex == 1 || obj.columnIndex == 2 || obj.columnIndex == 4) {
          return 'must';
        }
      },
        //删除
      removePayment: function(index) {
        this.paymentList.splice(index,1);
      },
      //增加
      addPayment: function() {
        this.paymentList.push({
          proposalCode: '',//付款人代码
          proposalName: '',//付款人名称
          periodNum: this.paymentInfo.period,//总期数
          currency: '',//币别
          payment: '',//金额
          payUp: '',//当前缴清情况
        })
      },
    },
    methods: {
      Submitss() {  //提交后全部只读
        this.Submit = true
    },
      getData: function() {
        let arr = [];
        for(let j in this.paymentList) {
          arr.push(...this.paymentList[j].paymentDetailList);
        }
        for(let i = 0; i < arr.length; i ++) {
          arr[i].payType = this.paymentInfo.period;
        }
        return arr;
      },
      getValidate: function() {
        var result = false;
        let _this = this;
        this.$refs['paymentInfo'].validate(function (valid,obj) {
          if(!valid) {
            for(i in obj) {
              _this.$refs[i].focus();
            }
          }
          result = valid;
        });
        return result;
      }
    },
    watch: {
      $route: {
        handler: function(val) {
          this.paymentInfo.period = 1;
        },
        deep: true
      },
      vo: {
        handler(val) {
          this.paymentList = val || [];
          if(!this.paymentList.every(item => item.paymentDetailList && item.paymentDetailList.length > 0)) {
            this.initPeriodList();
          }
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val
        },
        deep: true
      },
      isJointStock: {
        handler(val) {
          this.isJointStock = val
        },
        deep: true
      }
    }
  });
});