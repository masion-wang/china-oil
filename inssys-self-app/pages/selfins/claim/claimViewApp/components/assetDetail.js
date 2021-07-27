/**
 *  缴费计划详情组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  return Vue.gvUtil.Page({
    template: require('./assetDetail.html'),
    name: 'assetDetaillApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      pageId: null,
      maxHeight: {
        type: [Number, String],
        default: '350'
      }
    },
    datas: function () {
      return {
        tableData: [
          {
            partCompany: '',
            workPartCompany: '',
            yt: '',
            assetName: '',
            assetType: '',
            bdms: ''
          }
        ]
      }
    },
    events: {

    },
    methods: {
      initPage: function() {
        console.log(this.vo)
        // this.tableData = this.vo
      }
    },
    watch: {
      vo: {
        handler(val) {
          this.tableData = val
        },
        deep: true
      }
    }
  });
});