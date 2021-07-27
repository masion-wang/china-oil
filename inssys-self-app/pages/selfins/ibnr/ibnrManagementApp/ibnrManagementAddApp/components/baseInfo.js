/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {},
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    query: function () {
      return {};
    },
    datas: function () {
      return {
        pass: false, //审核页面
        //1. 基础信息
        onacDate: "01-01-2000",
        baseInfo: {
          acDate: "",
        },
        baseInforules: {
          reverseDate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
        },
      };
    },
    created() {},
    computed: {},
    events: {
      submitForm() {
        let flag = false;
        this.$refs.baseInfos.validate((valid) => {
          if (valid) {
            flag = true;
          } else {
            flag = false;
          }
        });
        return flag;
      },
    },
    methods: {},
  });
});
