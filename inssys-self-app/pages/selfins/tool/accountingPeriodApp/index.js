// [{原：{}，标的:[],再保人:[]},{} ]
/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  // let reuqireConfig = require("../../insureApp/index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  // Vue.gvUtil.setApi(config.api);
  Vue.gvUtil.setApi({
    queryAccountPeriod: "/gfMainApi/queryAccountPeriod", //  查询结果集  post 不需要参数
    queryCurrentAccountPeriod: "/gfMainApi/queryCurrentAccountPeriod", //  查询当前账期【页面进入绑定】 post 不需要参数
    adjustMaintenance: "/gfMainApi/adjustMaintenance", //  调整维护期 post
    closeAccountPeriod: "/gfMainApi/closeAccountPeriod", //  关闭维护期 post
  });
  return Vue.gvUtil.Page({
    template: temp,
    name: "accountingPeriodApp",
    components: {},
    props: {},

    datas: function () {
      return {
        //只能选择当前月日期
        pickerOptions: {
          disabledDate: (time) => {
            var now = new Date(); //当前日期
            var nowMonth = now.getMonth(); //当前月
            var nowYear = now.getFullYear(); //当前年
            var date = now.getDate(); //得到日期
            //本月的结束时间
            var monthEndDate = new Date(nowYear, nowMonth + 1, 0);
            var nowdate = new Date(nowYear, nowMonth, 25);
            if (date > 25) {
              //如果当前时间超过25号，只能选择25号
              return time.getTime() > nowdate || time.getTime() < nowdate;
            } else {
              //没超过25号，能选当前月的所有日期
              return (
                time.getTime() > monthEndDate ||
                time.getTime() < Date.now() - 8.64e7
              );
            }
          },
        }, //
        tableData: [],
        currentPage: 0,
        pageSize: 10,
        // 查询条件
        table: {},
      };
    },
    created() {
      let that = this;
      let params = {};
      let url = Vue.gvUtil.getUrl({
        apiName: "queryAccountPeriod",
        contextName: "selfins",
      });
      Vue.gvUtil.http.post(url, params).then((res) => {
        if (res.resCode == "0000") {
          that.tableData = res.resData.businessList;
        } else {
          this.$message({
            showClose: true,
            message: res.resMsg,
            type: "warn",
          });
        }
      });
      let url2 = Vue.gvUtil.getUrl({
        apiName: "queryCurrentAccountPeriod",
        contextName: "selfins",
      });
      Vue.gvUtil.http.post(url2, params).then((res) => {
        if (res.resCode == "0000") {
          that.table = res.resData;
        } else {
          this.$message({
            showClose: true,
            message: res.resMsg,
            type: "warn",
          });
        }
      });
    },
    mounted() {},
    events: {},
    methods: {
      // 调整日期
      adjust() {
        let that = this;
        let params = that.table;
        let url = Vue.gvUtil.getUrl({
          apiName: "adjustMaintenance",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            this.$message.success(Vue.gvUtil.getInzTranslate("success"));
          } else {
            this.$message({
              showClose: true,
              message: res.resMsg,
              type: "warn",
            });
          }
        });
      },
      // 关闭日期
      close() {
        let that = this;
        let params = that.table;
        let url = Vue.gvUtil.getUrl({
          apiName: "closeAccountPeriod",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            this.$message.success(Vue.gvUtil.getInzTranslate("success"));
          } else {
            this.$message({
              showClose: true,
              message: res.resMsg,
              type: "warn",
            });
          }
        });
      },
    },
  });
});
