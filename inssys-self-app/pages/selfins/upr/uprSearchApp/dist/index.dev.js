"use strict";

/**
 * IBNR管理
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html"); // 引入API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  // // 注册API


  Vue.gvUtil.setApi({
    findUpr: '/uprMain/findUpr' // 分页查询

  });
  return Vue.gvUtil.Page({
    template: temp,
    name: "uprSearchApp",
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        table: {
          basic: {
            api: "findUpr",
            //分页列表请求api
            vo: "businessList",
            //分页列表返回的vo
            context: "selfins",
            //分页列表请求上下文
            singleElection: false,
            //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true,
            //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false,
            //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"]
            } //导出按钮控制，不需要可以删除此属性

          },
          search: {
            acDateStart: '',
            //挂账起期
            acDateDateEnd: '',
            //挂账止期
            calculateDateStart: '',
            //计算截止起期
            calculateDateEnd: '' //计算截止止期

          },
          fields: [{
            labelKey: "批量任务号",
            prop: "batchNo"
          }, {
            labelKey: "冲销的批量任务号",
            prop: "reverseBatchNo"
          }, {
            labelKey: "计算截止日期",
            prop: "calculateDate"
          }, {
            labelKey: "挂账日期",
            prop: "acDate"
          }, {
            labelKey: "状态",
            prop: "status",
            format: {
              type: "ggcode",
              codeType: "UPRStatus"
            }
          }, {
            labelKey: "生成人",
            prop: "createdBy"
          }, {
            labelKey: "生成日期",
            prop: "createdDate"
          }, {
            labelKey: "审核人",
            prop: "approvedBy"
          }, {
            labelKey: "审核日期",
            prop: "approvedDate"
          }, {
            //配置最后列按钮
            prop: "operation",
            labelKey: "operation",
            btns: [{
              btnKey: "打印",
              //任务列表
              flag: "print",
              type: "btn"
            }, {
              btnKey: "任务列表",
              //任务列表
              flag: "tasklist",
              type: "btn"
            }]
          }]
        }
      };
    },
    created: function created() {},
    events: {
      initPage: function initPage() {
        Vue.gvUtil.initTranslation("UPRStatus");
      }
    },
    methods: {
      // 新增
      gBtnCreate: function gBtnCreate() {
        this.$router.push({
          name: "uprManagementAddApp",
          query: {
            // row: a,
            flag: "add"
          }
        });
      },
      // 审核
      audit: function audit() {
        var a = this.$refs.table.getSelectData();
        console.log("a", a);

        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].status == "09") {
            this.$router.push({
              name: "uprManagementAddApp",
              query: {
                row: a,
                flag: "Approve"
              }
            });
          } else {
            Vue.gvUtil.message("该条数据不可审核");
          }
        } else {
          Vue.gvUtil.message("请选择一条需要审核的数据");
        }
      },
      // 查看
      look: function look() {},
      onListBtn: function onListBtn(row, type) {}
    }
  });
});