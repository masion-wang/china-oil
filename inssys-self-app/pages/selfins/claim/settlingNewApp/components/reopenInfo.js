/**
 *  出险通知审核信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require("./reopenInfo.html"),
    name: "reopenInfoApp",
    params: function () {
      return {};
    },
    props: {
      vo: null,
      type: String,
      showSubBtn: {
        type: Boolean,
        default: false,
      },
      isReadonly: {
        type: Boolean,
        default: false,
      },
    },
    datas: function () {
      return {
        reopenData: [],
        reopenInfo: {
          remark: "",
        },
        rules: {
          remark: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
      };
    },
    events: {},
    methods: {
      // initPage: function() {
      //   if(this.type == 'view'){
      //     this.reopenData = this.vo
      //   } else {
      //     this.reopenInfo.remark = this.vo
      //   }
      // },
      // getValidate: function() {
      //   var result = false;
      //   let _this = this;
      //   this.$refs['reopenInfo'].validate(function (valid,obj) {
      //     if(!valid) {
      //       for(i in obj) {
      //         if(!_this.$refs[i].focus) {
      //           _this.$refs[i].$children[0].focus();
      //         } else {
      //           _this.$refs[i].focus();
      //         }
      //       }
      //     }
      //     result = valid;
      //   });
      //   return result;
      // },
      // getData: function() {
      //   return this.reopenInfo
      // },
      // showTrail: function() {
      //   this.$emit('showReopenTrail')
      // }
    },
    watch: {
      vo: {
        handler(val) {
          if (this.type == "view") {
            this.reopenData = val;
          } else {
            this.reopenInfo.remark = val;
          }
        },
        deep: true,
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val;
        },
        deep: true,
      },
    },
  });
});
