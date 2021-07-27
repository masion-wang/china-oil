/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      lissstcircRiskList: "/ibnrMain/circRiskList", //保监险种
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./sterilisation.html"),
    name: "sterilisationApp",
    datas: function () {
      return {
        pass: false, //审核页面
        //1. 基础信息
        iaClasslist: [], //保监险种list
        recognizeeTableList: [],
      };
    },
    created() {
      this.rickCodeDate();
    },
    computed: {},
    events: {
      rickCodeDate() {
        var url = Vue.gvUtil.getUrl({
          apiName: "lissstcircRiskList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { riskCode: "" }).then((res) => {
          if (res.resCode == "0000") {
            this.iaClasslist = res.resData;
          }
        });
      },
    },
    methods: {},
  });
});
