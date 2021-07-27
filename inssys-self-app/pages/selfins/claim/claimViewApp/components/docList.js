/**
 *  文档资料列表组件
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
      isReadonly: {
        type: Boolean,
        default: false
      }
    },
    datas: function () {
      return {
        tableData: []
      }
    },
    events: {

    },
    methods: {
      initPage: function() {
        this.tableData = this.vo
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