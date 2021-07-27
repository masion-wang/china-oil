/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require('./startEndDate.html');
  return Vue.gvUtil.Page({
    template: temp,
    name: 'startEndDateApp',
    props: {
      startDate: null, // 起期字段
      endDate: null, // 止期字段
      required: { // 是否开启校验 （包括必填 和 止期晚于 起期）
        type: Boolean,
        default: () => false
      },
      propPath: { // el-form-item 的校验 path
        type: String,
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
        isReadonly: false,

        rules: {
          startDate: [{
            required: true,
            message: "必填字段",
            trigger: "change"
          }, { validator: endDateValid, trigger: 'change' }]
        },
        table: {
          startDate: null,
          endDate: null
        },

        pickerOptionsStart: {
        },
        pickerOptionsEnd: {
        },
      }
    },
    methods: {
      test() {
        // this.$refs.table.validate()
      },
      // 日期change
      changeDate(code, val) {
        if (code == '0') { // 开始
          if (this.table.endDate) {
            this.pickerOptionsStart = {
              disabledDate: (time) => {
                if (this.table.endDate) {
                  return time.getTime() > new Date(this.table.endDate)
                }
              }
            }
          } else {
            this.table.endDate = null

            this.pickerOptionsEnd = {
              disabledDate: (time) => {
                if (this.table.startDate) {
                  return time.getTime() < new Date(this.table.startDate)
                }
              }
            }
          }

        } else {
          if (this.table.startDate) {
            this.pickerOptionsEnd = {
              disabledDate: (time) => {
                if (this.table.startDate) {
                  return time.getTime() < new Date(this.table.startDate)
                }
              }
            }
          } else {
            this.table.startDate = null
            this.pickerOptionsStart = {
              disabledDate: (time) => {
                if (this.table.endDate) {
                  return time.getTime() > new Date(this.table.endDate)
                }
              }
            }
          }

        }
      },
    },
    watch: {
      table: {
        handler(val) {
          this.$emit('update:startDate', val.startDate)
          this.$emit('update:endDate', val.endDate)
        },
        deep: true
      },
    },
    created() {
      this.table.startDate = this.startDate
      this.table.endDate = this.endDate
      this.changeDate('0')
      this.changeDate('1')
    }
  });
});