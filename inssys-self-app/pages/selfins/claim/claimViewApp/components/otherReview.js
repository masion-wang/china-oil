/**
 *  除了出险通知审核的审核信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require('./otherReview.html'),
    name: 'otherReviewApp',
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
        reviewInfo: {
          remark: ''
        },
        rules: {
          remark: [{ required: true, message: '不能为空', trigger: 'blur' }]
        }
      }
    },
    events: {

    },
    methods: {
      initPage: function() {
      },
      getData: function() {
        return this.reviewInfo.remark
      },
      getValidate: function() {
        var result = false;
        let _this = this;
        this.$refs['reviewInfo'].validate(function (valid,obj) {
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
      }
    },
    watch: {
      vo: {
        handler(val) {
          this.reviewInfo = val
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val;
        }
      }
    }
  });
});