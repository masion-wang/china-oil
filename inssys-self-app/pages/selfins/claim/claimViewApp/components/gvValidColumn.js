/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require('./gvValidColumn.html');
  var dateRange = require('./startEndDate');
  return Vue.gvUtil.Page({
    template: temp,
    name: 'gvValidColumnApp',
    components: {
      dateRange
    },
    props: {
      prop: { // 表头配置对象
        type: Object,
        required: true
      },
      isReadonly: {  // 整个表格只读
        type: Boolean
      },
      rules: { // 校验规则 必传
        type: Object,
        required: true
      },
      paging: { // 是否分页  true 分页 false  不分页
        type: Boolean,
        default: true
      },
      isCheckLine: {
        type: Boolean,
        default: false
      }
    },
    datas: function (vm) { // 双向绑定页面显示数据
      let endDateValid = (rule, value, callback) => {
        if (!vm.table.endDate) {
          callback(new Error('不能为空'));
        } else {
          callback();
        }
      };
      return {
        pickerOptions: [],
        options: [],
        dateRule: {
          dateRange: [{
            required: true,
            message: "必填字段",
            trigger: "change"
          }, { validator: endDateValid, trigger: 'change' }]
        },
        pickerOptionsStart: {},
        pickerOptionsEnd: {}
      }
    },
    methods: {
      // 普通输入框 blur 事件抛出
      inputBlur(name, row, e) {
        this.$emit('inputBlur', {
          name,
          val: e.target.value,
          row
        })
      },
      // num输入框 blur事件抛出
      numInputBlur(name, row, e) {
        this.$emit('numInputBlur', {
          name,
          val: e,
          row
        })
      },
      // 日期change
      changeDate(code, thenTime, val) {
        console.log(code, val)
        if (code == '0') { // 开始
          if (thenTime) {
            this.pickerOptionsStart = {
              disabledDate: (time) => {
                if (thenTime) {
                  return time.getTime() > new Date(thenTime)
                }
              }
            }
          } else {
            thenTime = null

            this.pickerOptionsEnd = {
              disabledDate: (time) => {
                if (val) {
                  return time.getTime() < new Date(val)
                }
              }
            }
          }

        } else {
          if (thenTime) {
            this.pickerOptionsEnd = {
              disabledDate: (time) => {
                if (thenTime) {
                  return time.getTime() < new Date(thenTime)
                }
              }
            }
          } else {
            thenTime = null
            this.pickerOptionsStart = {
              disabledDate: (time) => {
                if (val) {
                  return time.getTime() > new Date(val)
                }
              }
            }
          }

        }
      },
      test() {
        console.log(this.rules)
      },
      // 转码
      transCode(val) {
        var obj = this.options.find(e => e[this.prop.config.code] == val)
        return obj ? obj[this.prop.config.name] : val
      },
      // 初始化下拉
      // initSelectOptions() {
      //   Vue.gvUtil.http.post('product' + this.prop.config.url, this.prop.config.data).then(res => {
      //     this.options = res.resData.businessList ? res.resData.businessList : []
      //   })
      // },
      initPath(scope) {
        return this.paging ? scope.row.key : scope.$index
      },
      // 定制表头
      requiredField(h, { column, $index }) {
        // 这里在最外层插入一个div标签
        return h('div', { 'class': 'requireHead' }, [
          h('el-tooltip', {
            // 表示属性
            attrs: {
              effect: "dark",
              content: "必填项",
              placement: "top"
            },
          },
            [
              h("span", {
                domProps: {
                  innerHTML: '* '
                },
                'class': 'require'
              })
            ]),
          h('span', {
            // 表示内容
            domProps: {
              innerHTML: column.label
            },
            on: {
              click: () => {
                console.log(`${$index}  ${column.label}`)
              }
            }
          })

        ])
      },
    },
    filters: {
      transCode(val) {
        return val
      }
    },
    mounted() {

    },
    created() {
      // if (this.prop.config.type == "select") {
      //   this.initSelectOptions()
      // }

      // type: 'selectPo',
      //   poName: 'ehrOrg',
      // if (this.prop.config.type == "selectPo") {
      //   Vue.gvUtil.translationPoData(this.prop.config, )
      //   // var cacheKey = Vue.gvUtil.md5(JSON.stringify({ poName: this.prop.config.poName }) || ''),
      //   //     c = Vue.gvUtil.getCache();
      //   // //debugger
      //   // c.get(cacheKey)

      // }
    }
  });
});