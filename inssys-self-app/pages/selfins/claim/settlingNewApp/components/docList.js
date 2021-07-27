/**
 *  保单文档资料列表组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require('./docList.html'),
    name: 'docListApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      pageId: null,
      isExpense: {   //true:费用录入 false:批单录入
        type: Boolean,
        default: true
      },
      Premium: {   //金批只读状态
        type: Boolean,
        default: true
      },
      NonPremium: {   //文批只读状态
        type: Boolean,
        default: true
      },
      Cancellation: {   //退保只读状态
        type: Boolean,
        default: true
      },
      Write: {   //冲销只读状态
        type: Boolean,
        default: true
      },
    },
    datas: function () {
      return {
        tableData: [{ proposalName: '22' }]
      }
    },
    events: {

    },
    methods: {
      // initPage: function() {
      //   this.tableData = this.vo
      //   // console.log(this.$route.query.)
      // }
    },
    watch: {
      // vo: {
      //   handler(val) {
      //     this.tableData = val
      //   },
      //   deep: true
      // }
    }
  });
});