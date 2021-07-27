/**
 * IBNR管理
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  // // 注册API
  Vue.gvUtil.setApi({
    findUpr: "/uprMain/findUpr", // 分页查询
    uprprintPDF: "/PDF/printPDF", // 打印"
  });
  var viewUpr = require("../uprManagementAddApp/index");
  return Vue.gvUtil.Page({
    template: temp,
    name: "uprSearchApp",
    components: {
      viewUpr: viewUpr,
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        settlingCeding: false, //弹框
        table: {
          basic: {
            api: "findUpr", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            acDateStart: "", //挂账起期
            acDateDateEnd: "", //挂账止期
            calculateDateStart: "", //计算截止起期
            calculateDateEnd: "", //计算截止止期
          },
          fields: [{
              labelKey: "zbBatchNo", //批量任务号
              btns: [{
                prop: "batchNo",
                flag: "batchNo",
                type: "a", //类型按钮 icon/a/btn
              }, ],
            },
            {
              labelKey: "冲销的批量任务号", //冲销的批量任务号
              prop: "reverseBatchNo",
            },
            {
              labelKey: "计算截止日期", //计算截止日期
              prop: "calculateDate",
            },
            {
              labelKey: "zbA/CDate", //挂账日期
              prop: "acDate",
            },
            {
              labelKey: "ruleStatus", //状态
              prop: "status",
              width: "80px",
              format: {
                type: "ggcode",
                codeType: "UPRStatus",
              },
            },
            {
              labelKey: "founder", //创建人
              prop: "createdBy",
            },
            {
              labelKey: "createDate", //创建日期
              prop: "createdDate",
            },
            {
              labelKey: "checker", //审核人
              prop: "approvedBy",
            },
            {
              labelKey: "checkTime", //审核日期
              prop: "approvedDate",
            },

            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [{
                btnKey: "任务列表", //任务列表
                flag: "tasklist",
                type: "btn",
              }, ],
            },
          ],
        },
      };
    },
    created() {},

    events: {
      initPage() {
        Vue.gvUtil.initTranslation("UPRStatus");
      },
    },
    methods: {
      // 新增
      gBtnCreate() {
        this.$router.push({
          name: "uprManagementAddApp",
          query: {
            // row: a,
            flag: "add",
          },
        });
      },
      // 审核
      audit() {
        let a = this.$refs.table.getSelectData();
        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].status == "09") {
            this.$router.push({
              name: "uprManagementAddApp",
              query: {
                row: a,
                flag: "Approve",
              },
            });
          } else {

            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_noAudit"), //该条数据不可审核
              type: "warning", // success
            });

          }
        } else {

          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_review"), //请选择一条需要审核的数据
            type: "warning", // success
          });
        }
      },
      // 查看
      look() {
        let a = this.$refs.table.getSelectData();
        if (a && a.length == 1) {
          //'09'表示待审核数据
          if (a[0].status == "09") {
            this.$router.push({
              name: "uprManagementAddApp",
              query: {
                row: a,
                flag: "Look",
              },
            });
          } else {
            this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_noAudit"), //该条数据不可审核
              type: "warning", // success
            });

          }
        } else {
          this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_review"), //请选择一条需要审核的数据
            type: "warning", // success
          });
        }
      },
      onListBtn(row, type) {
        if (type == "tasklist") {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
        } else if (type == "batchNo") {
          //查看
          this.settlingCeding = true;
          setTimeout(() => {
            this.$refs.viewupr.searchViewUpr(
              row.id,
              row.converCurrency,
              row.batchNo,
              row.status
            );
          }, 200);
        }
      },
    },
  });
});