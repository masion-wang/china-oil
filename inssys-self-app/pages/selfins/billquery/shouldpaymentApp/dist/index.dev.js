"use strict";

/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html"); // 引入API   注册API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;


  Vue.gvUtil.setApi({
    policySelfMainfindList: "/policySelfMain/findList",
    //下拉值
    findGpBillMainPayable: '/gpbillmain/findGpBillMainPayable',
    // 应收应付分页查询
    findGpBillDetails: '/gpbillmain/findGpBillDetails',
    // 详情查询  参数 billNo
    findfeetypecode: 'guFeetype/findfeetypecode',
    // 单据类型
    exportBillExcelAll: '/gpbillmain/exportBillExcel' // 导入全部

  }); // 组件

  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentApp",
    components: {},
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        projectNamelist: [],
        //项目下拉
        // rules: {
        //   //校验
        // },
        coinsuranceType: [],
        //主共/从共下拉码表
        formLabelAlign: {//双向绑定
          // base: "",
          // baseCurrency: "01",
          // exchDate: "",
          // exchCurrency: "",
          // exchRate: "",
          // validDate: "",
          // invalidDate: "",
          // validInd: "",
          // remark: "",
        },
        dialogFormVisible: false,
        //详情页面
        table: {
          basic: {
            api: "findGpBillMainPayable",
            //分页列表请求api
            vo: "businessList",
            //分页列表返回的vo
            context: "selfins",
            //分页列表请求上下文
            singleElection: false,
            //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false,
            //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false,
            //序号
            execl: {
              isShow: false,
              fileName: "testExecl",
              exclude: ["Operation"]
            },
            //导出按钮控制，不需要可以删除此属性
            execlAll: true // execlAll: { 'isShow': true, 'fileName': 'testExecl', 'exclude': ['operation'] }

          },
          search: {
            //查询域元数据
            policyNo: "",
            //保单号
            claimNo: "",
            //赔案号
            billNo: "",
            //单据号
            correspCode: "",
            //账单接收人
            isCleard: "",
            //已清 未清
            // cedingPolicyNo: "", //原险种
            dueDatesStart: '',
            // 缴费起期
            dueDatesEnd: '',
            // 缴费止期
            approvedDateStart: '',
            //收付款日期起期
            approvedDateEnd: '' // 收付款日期止期

          },
          fields: [{
            labelKey: "凭证号",
            prop: "voucherNo"
          }, {
            labelKey: "账单日期",
            prop: "approvedDate"
          }, {
            labelKey: "保单号",
            prop: "policyNo"
          }, {
            labelKey: "赔案号",
            prop: "claimNo"
          }, {
            labelKey: "单据号",
            prop: "billNo"
          }, {
            labelKey: "账单接收人",
            prop: "correspondence"
          }, {
            labelKey: "业务描述",
            prop: "description"
          }, {
            labelKey: "货币",
            prop: "currency",
            format: {
              type: "ggcode",
              codeType: "Currency"
            }
          }, {
            labelKey: "应收金额",
            prop: "deposit"
          }, {
            labelKey: "应付金额",
            prop: "withdrawal"
          }, {
            labelKey: "余额",
            prop: "balance"
          }, {
            labelKey: "已结算金额",
            prop: "settledAmount"
          }, {
            labelKey: "未清金额 ",
            prop: "outstanding"
          }]
        },
        icCleardArr: [{
          name: '已清',
          value: '01'
        }, {
          name: '未清',
          value: '02'
        }]
      };
    },
    created: function created() {
      Vue.gvUtil.initTranslation("Currency");
    },
    events: {
      initPage: function initPage() {},
      // 导出全部
      exportAll: function exportAll() {
        var params = this.table.search;
        console.log('this.table.search', this.table.search);
        var url = Vue.gvUtil.getUrl({
          apiName: "exportBillExcelAll",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, params, {
          responseType: 'blob'
        }).then(function (res) {
          console.log('res', res);
          var data = res;
          var url = window.URL.createObjectURL(new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
          }));
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = url; // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])

          link.setAttribute('download', 'download.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    },
    methods: {
      onListBtn: function onListBtn(row, type) {},
      BillTypelistchange: function BillTypelistchange(a) {
        if (a == "选项1" || a == "选项2") {
          this.cedingCompany = [];
          this.Biltime = true;
        } else {
          this.Biltime = false;
        }
      },
      // 打开弹窗
      showDialog: function showDialog() {
        this.isShow = true;
        console.log('弹窗');
      }
    }
  });
});