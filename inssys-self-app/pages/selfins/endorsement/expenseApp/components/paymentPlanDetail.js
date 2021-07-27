/**
 *  缴费计划详情组件2
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require("./paymentPlanDetail.html"),
    name: "paymentPlanDetailApp",
    params: function () {
      return {};
    },
    props: {
      vo: null,
      isReadonly: {
        type: Boolean,
        default: false,
      },
      maxHeight: {
        type: [Number, String],
        default: "350",
      },
    },
    datas: function () {
      return {
        tableData: [],
        total: 0,
      };
    },
    events: {
      selectDate: function (val, row, index) {
        //获取当前行之前的所有数据
        let lastPayment = this.tableData.slice(0, index);
        if (
          lastPayment.some((item) => {
            if (item.payEndTime != "") {
              return (
                new Date(item.payEndTime).getTime() > new Date(val).getTime()
              );
            }
          })
        ) {
          this.$message({
            message: "不能早于往期缴费截止日期",
            type: "warning",
          });
          row.payEndTime = "";
          return;
        }
        let nexyPayment = this.tableData.slice(index + 1);
        if (
          nexyPayment.some((item) => {
            if (item.payEndTime != "") {
              return (
                new Date(item.payEndTime).getTime() < new Date(val).getTime()
              );
            }
          })
        ) {
          this.$message({
            message: "不能晚于后期缴费截止日期",
            type: "warning",
          });
          row.payEndTime = "";
          return;
        }
      },
    },
    methods: {
      initPage: function () {
        this.tableData = [];
        this.total = 0;
        let str = JSON.stringify(this.vo);
        this.tableData = JSON.parse(str);
        this.total = this.vo.reduce((totl, item) => {
          return totl + parseFloat(item.payment);
        }, 0);
      },
      getTotal: function () {
        let paymentTotal = this.tableData.reduce((total, item) => {
          return total + parseFloat(item.payment);
        }, 0);
        console.log("操作后的总数", paymentTotal);
        return this.total == paymentTotal ? true : false;
      },
      getData: function () {
        return this.tableData;
      },
    },
    watch: {
      vo: {
        handler(val) {
          this.tableData = [];
          this.total = 0;
          let str = JSON.stringify(val);
          this.tableData = JSON.parse(str);
          this.total = val.reduce((totl, item) => {
            return totl + parseFloat(item.payment);
          }, 0);
          // if(val.length > 0) {
          //   for(let i = 0; i < val.length; i++) {
          //     this.tableData.push(val[i]);
          //     this.total = parseFloat(this.total + parseFloat(val[i].payment));
          //   }
          // } else {
          //   this.tableData = [];
          // }
          console.log("总数", this.total);
        },
        deep: true,
      },
    },
  });
});
