/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require('./geValidTable.html'),
  gvValidColumn = require('./gvValidColumn')

  return Vue.gvUtil.Page({
    template: temp,
    name: 'geValidTableApp',
    components: { 
      gvValidColumn
    },
    props: {
      table: { // 表格数据
        type: Object,
        required: true
      },
      rules: { // 校验规则
        type: Object
      },
      required: { // 是否开启默认校验
        type: Boolean,
        default: false
      },
      paging: { // 是否分页
        type: Boolean,
        default: false
      },
      isSerial: { // 是否有序号
        type: Boolean,
        default: false
      },
      isReadonly: {
        type: Boolean,
        default: false
      },
      isSelection: { // 是否可复选
        type: Boolean,
        default: false
      },
      rowKey: { // 复选的rowKey
        type: String,
      }
    },
    datas: function () { // 双向绑定页面显示数据
      return {
        list: [],
        isReadonly: false,
        multipleSelection: [], // 多选数据
      }
    },
    methods: {
      // 模版下载
      downTemp() {
        Vue.gvUtil.exportExcel(this.$refs.tTable, 'table', null, 'excel', ['operation'], (val) => {
          val.datas[0].sheetData = [{}]
        })
      },
      // 清单导出
      exportList() {
        Vue.gvUtil.exportExcel(this.$refs.tTable, 'table', null, 'excel', ['operation'])
      },
      // 获取表格数据
      getData() {
        return this.table.tableData
      },
      selectedList() {
        let a = JSON.parse(JSON.stringify(this.multipleSelection))
        this.$refs.tTable.clearSelection()
        this.multipleSelection = []
        return a
      },
      // 多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      toggleRowSelect(rows) {
        const _this = this
        if (rows.length > 0) {
          this.$nextTick(() => {
            rows.forEach(row => {
              _this.$refs.tTable.toggleRowSelection(row, true)
            })
          })
        } else {
          this.$refs.tTable.clearSelection()
        }
      },
      // 序号
      indexMethod(index) {
        index = (index + 1) + (this.table.page.currentPage - 1) * this.table.page.pageSize
        return index
      },

      // 每页多少条
      onHandleSizeChange(val) {
        this.$refs.table.clearValidate()
        this.toggleRowSelect(this.multipleSelection, true)
      },
      // 当前页
      onHandleCurrentChange(val) {
        this.$refs.table.clearValidate()
        this.toggleRowSelect(this.multipleSelection, true)
      },
      // 表格校验
      validForm() {
        var flag = false
        var flagForm = false
        var type = false
        console.log(this.$refs)
        this.$refs.table.validate((valid, model) => {
          flag = valid
        });
        var columns = this.$refs.tTable.columns,
          columnsRules = [];
        if (this.required) {
          columns.forEach(e => {
            if (e.property && e.property != 'operation') {
              columnsRules.push(e.property)
            }
          })
          //debugger
          columnsRules
          flagForm = this.table.tableData.find((e, i) => {
            for (v of columnsRules) {
              if ((e[v] !== 0) && (!e[v])) {
                //debugger
                type = true
                break
              }
            }
            return type
          }) ? false : true
          //debugger
          return flag && flagForm
        } else {
          return flag
        }
      }
    },
    watch: {
      // table: {
      //   handler(val) {
      //     this.list[0].data = val.tableData.slice((val.page.currentPage - 1) * val.page.pageSize, val.page.currentPage * val.page.pageSize)
      //   },
      //   deep: true
      // }
    },
    created() {
      // this.list = [
      //   {
      //     name: "table",
      //     data: this.table.tableData.slice((this.table.page.currentPage - 1) * this.table.page.pageSize, this.table.page.currentPage * this.table.page.pageSize),
      //     show: true
      //   },
      //   {
      //     name: "tableValid",
      //     data: this.table.tableData,
      //     show: false
      //   }
      // ]

    }
  });
});