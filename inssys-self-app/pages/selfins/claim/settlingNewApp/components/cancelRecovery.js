/**
 *  注销/恢复信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require('./cancelRecovery.html'),
    name: 'cancelRecoveryApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      title: {
        type: String,
        default: '注销/恢复信息'
      },
      showSubBtn: {
        type: Boolean,
        default: false
      },
      isReadonly: {
        type: Boolean,
        default: false
      }
    },
    datas: function () {
      return {
        panelTitle: '',
        cancelRecovery: {
          remark: ''
        },
        cancelRecoveryData: [],
        rules: {
          remark: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    events: {
      showTrail: function() {
        this.$emit('showCancelTrail')
      }
    },
    methods: {
      initPage: function() {
        if(this.title == 'cancelRecovery') {
          this.panelTitle = Vue.filter('translate')('cancelRecovery');
          this.cancelRecoveryData = this.vo
        } else {
          if(this.title == 'cancel') {
            this.panelTitle = Vue.filter('translate')('cancel');
          } else if(this.title == 'recovery'){
            this.panelTitle = Vue.filter('translate')('recovery');
          }
          this.cancelRecovery.remark = this.vo
        }
      },
      translateFlag: function(flag) {
        return flag == '1' ? '注销' : '恢复'
      },
      getData: function() {
        return this.cancelRecovery;
      },
      getValidate: function() {
        var result = false;
        let _this = this;
        this.$refs['cancelRecovery'].validate(function (valid,obj) {
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
        return result;
      },
    },
    watch: {
      vo: {
        handler(val) {
          if(this.title == 'cancelRecovery') {
            this.cancelRecoveryData = val
          } else {
            this.cancelRecovery.remark = val
          }
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val;
        },
        deep: true
      }
    }
  });
});