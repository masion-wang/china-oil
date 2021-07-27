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
    findGpBillMain: '/gpbillmain/findGpBillMain',
    // 实收实付查询分页
    findGpBillDetails: '/gpbillmain/findGpBillDetails',
    // 详情查询  参数 billNo
    findfeetypecode: '/guFeetype/findfeetypecode',
    // 单据类型
    findBybusinessNo: '/gpbillmain/findBybusinessNo' // 业务号

  }); // 组件

  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentApp",
    components: {},
    datas: function datas() {
      // 双向绑定页面显示数据
      return {
        projectNamelist: [],
        //账单接受下拉
        cedingCompany: [],
        //账单日期
        Biltime: false,
        //账单日期只读状态
        BillTypelist: [],
        // 单据类型
        businessNolist: [],
        // 业务号
        dialogFormVisible: false,
        //详情页面
        table: {
          basic: {
            api: "findGpBillMain",
            //分页列表请求api
            vo: "businessList",
            //分页列表返回的vo
            context: "selfins",
            //分页列表请求上下文
            singleElection: false,
            //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false,
            //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true,
            //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"]
            } //导出按钮控制，不需要可以删除此属性

          },
          search: {
            //查询域元数据
            correspCode: "",
            //账单接收人
            billType: "",
            //单据类型
            dueDatesStart: '',
            // 截止缴费日期 1
            dueDatesEnd: '',
            // 截止缴费日期 2
            businessNo: "",
            //业务号
            documentType: "",
            //账单类型
            balance: 0 // 这个后台要求写死的

          },
          fields: [{
            labelKey: "凭证号",
            prop: "voucherNo"
          }, {
            labelKey: "单据号",
            prop: "billNo"
          }, {
            labelKey: "结算号",
            btns: [{
              prop: "clearInd",
              flag: "view",
              type: "a" //类型按钮 icon/a/btn

            }]
          }, {
            labelKey: "账单接收人",
            prop: "correspondence"
          }, {
            labelKey: "账单金额",
            prop: "amount"
          }, {
            labelKey: "结算日期",
            prop: "validDate"
          }, {
            labelKey: "结算金额",
            prop: "invalidDate"
          }, {
            labelKey: "业务号",
            prop: "businessNo"
          }, {
            labelKey: "业务审核通过日期",
            prop: "approvedDate"
          }, {
            labelKey: "单据类型",
            prop: "billType"
          }, {
            labelKey: "账单类型",
            prop: "documentType"
          }]
        },
        // 弹窗
        isShow: false,
        // 是否显示弹窗
        baseInfo: [],
        // 基础信息1
        baseInfo2: [],
        // 基础信息2
        DueAndPay: [],
        // 应收应付明细
        isReadonly: false // 是否只读
        //折叠窗默认弹开
        // activeNames: ["baseInfo"],

      };
    },
    events: {
      initPage: function initPage() {
        this.fyselect(); //费用类型

        this.businessNoSelect(); // 业务号 
      }
    },
    methods: {
      fyselect: function fyselect() {
        var _this = this;

        var url = Vue.gvUtil.getUrl({
          apiName: "findfeetypecode",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, {
          feetypeCode: ""
        }).then(function (res) {
          if (res.resCode === "0000") {
            _this.BillTypelist = res.resData.guFeetypeVos;
          }
        });
      },
      businessNoSelect: function businessNoSelect() {
        var _this2 = this;

        var url = Vue.gvUtil.getUrl({
          apiName: "findBybusinessNo",
          contextName: "selfins"
        });
        Vue.gvUtil.http.post(url, {
          businessNo: ''
        }).then(function (res) {
          if (res.resCode === "0000") {
            console.log('业务号', res);
            _this2.businessNolist = res.resData;
          }
        });
      },
      changeschemeName2: function changeschemeName2() {},
      onListBtn: function onListBtn(row, type) {
        var that = this;
        console.log('row', 'type', row, type);

        if (type == 'view') {
          // 打开弹窗 调用详情接口
          this.isShow = true;
          var params = {
            billNo: row.billNo
          };
          var url = Vue.gvUtil.getUrl({
            apiName: "findGpBillDetails",
            contextName: "selfins"
          });
          Vue.gvUtil.http.post(url, params).then(function (res) {
            if (res.resCode == '0000') {
              console.log('详情', res.resData);
              that.baseInfo = res.resData; // that.baseInfo2 = res.resData.gpPaymentList

              that.DueAndPay = res.resData.gpToPaymentListVo;
            } else {
              that.$message({
                showClose: true,
                message: '获取详情失败',
                type: 'warning'
              });
            }
          });
        }
      },
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