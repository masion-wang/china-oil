/**
 * 审核信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require("./audit.html"),
    name: "auditApp",
    datas: function () {
      return {
        auditInfo: {
          opinions: "同意",
        },
        rules: {
          opinions: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
      };
    },
    events: {},
    methods: {
      initPage: function () {},
      getData: function () {
        return this.auditInfo.opinions;
      },
      getValidate: function () {
        this.$refs["auditInfo"].validate(function (valid, obj) {
          result = valid;
        });
        return result;
      },
    },
    watch: {},
  });
});
