/**
 * 账单管理
 * @author 王松
 * @time 2020/10/26
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API   注册API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  Vue.gvUtil.setApi({
    findGpBillMain: '/gpbillmain/findGpBillMain', // 账单查询分页
    findGpBillDetails: '/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
    findfeetypecode: '/guFeetype/findfeetypecode', // 单据类型
    findBybusinessNo: '/gpbillmain/findBybusinessNo', // 业务号
    find_other_list: '/gg_code/find_other_list', // 供应商名称
    autoGuClaim: '/gcClaimMainSelf/autoGuClaim' // 佳豪测试
  });
  // 组件
  return Vue.gvUtil.Page({
    template: temp,
    name: "billApp",
    components: {},
    datas: function () {
      // 双向绑定页面显示数据
      return {
        isC: false,
        resData: '',
        cedingCompany: [], //账单日期
        Biltime: false, //账单日期只读状态
        BillTypelist: [], // 单据类型
        businessNolist: [], // 业务号
        projectNamelist: [],
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findGpBillMain", //分页列表请求api
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
          // 传参
          search: {
            //查询域元数据
            correspCode: "", // 账单接收人 
            billType: "", // 单据类型
            dueDatesStart: '', // 截止缴费日期 1
            dueDatesEnd: '', // 截止缴费日期 2
            businessNo: '', // 业务号
            documentType: "", // 账单类型
            projectName: '', // 项目名称
            approvedDateStart: '', // 业务审核通过日期
            approvedDateEnd: '' // 业务审核通过日期
          },
          // 返参
          fields: [{
              labelKey: "缴费截止日期",
              prop: "dueDate",
            }, {
              labelKey: "最近结算日期",
              prop: "latelySettleDate",
            },

            {
              labelKey: "单据号",
              btns: [{
                prop: "billNo",
                flag: "view",
                type: "a", //类型按钮 icon/a/btn
              }, ],
            },
            {
              labelKey: "账单接收人",
              prop: "correspondence",
            },
            {
              labelKey: "项目名称",
              prop: "projectName",
            },
            {
              labelKey: "币别",
              prop: "currency",
              format: {
                type: "ggcode",
                codeType: "Currency",
              },
            },
            {
              labelKey: "账单金额",
              prop: "amount",
            },
            {
              labelKey: "业务号",
              prop: "businessNo",
            },
            {
              labelKey: "业务审核通过日期",
              prop: "approvedDate",
            },
            {
              labelKey: "单据类型",
              prop: "billTypeName",
            },
            // {
            //   labelKey: "业务描述 ",
            //   prop: "description",
            // },
            {
              labelKey: "账单类型",
              prop: "documentType",
              format: {
                type: "ggcode",
                codeType: "BillingType",
              },
            },
            // {
            //   //配置最后列按钮
            //   prop: "operation",
            //   labelKey: "operation",
            //   btns: [{
            //     btnKey: "详情",
            //     flag: "Add",
            //     type: "btn",
            //   }, ],
            // },
          ],
        },
        // 弹窗
        isShow: false, // 是否显示弹窗
        // 1.基础信息
        baseInfo: {},
        baseInfo2: [], // 基础信息2
        DueAndPay: [], // 应收应付明细
        isReadonly: false, // 是否只读

        //折叠窗默认弹开
        // activeNames: ["baseInfo"],
      };
    },
    created() {
      Vue.gvUtil.initTranslation('BillingType');

  
    },
    events: {

      initPage() {
        this.fyselect(); //单据类型
        this.businessNoSelect() // 业务号 

        Vue.gvUtil.initTranslation("Currency");

      },
     
    },
    methods: {
      // 如果是Claim 缴费日期清空+禁用 反之亦然
      changeschemeName2(data) {
        console.log('账单类型', data)
        console.log('value', data)
        if (data.value == '01') {
          this.table.search.dueDatesStart = ''
          this.table.search.dueDatesEnd = ''
          this.isC = true
        } else {
         
          this.isC = false
        }
      },
      hahah() {
        var url = Vue.gvUtil.getUrl({
          apiName: "autoGuClaim",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {
          resData: this.resData
        }).then((res) => {
          if (res.resCode === "0000") {
            console.log('ceshi', res)

          }
        });
      },
      try () {
        var url = Vue.gvUtil.getUrl({
          apiName: "autoGuClaim",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {
          resData: this.resData
        }).then((res) => {
          if (res.resCode === "0000") {
            console.log('ceshi', res)

          }
        });
      },
      fyselect() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findfeetypecode",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {
          feetypeCode: ""
        }).then((res) => {
          if (res.resCode === "0000") {

            this.BillTypelist = res.resData.guFeetypeVos;
          }
        });
      },
      selectBlur(e) {
        console.log('e', e.target.value)

        this.table.search.businessNo = e.target.value
      },
      businessNoSelect() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findBybusinessNo",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {
          businessNo: ''
        }).then((res) => {
          if (res.resCode === "0000") {
            console.log('业务号', res)

            this.businessNolist = res.resData;
          }
        });
      },
      // 表格内根据列表的type判断触发事件
      onListBtn(row, type) {
        let that = this
        console.log('row', 'type', row, type)
        if (type == 'view') {
          // 打开弹窗 调用详情接口
          this.isShow = true
          let params = {
            billNo: row.billNo
          }
          let url = Vue.gvUtil.getUrl({
            apiName: "findGpBillDetails",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params).then((res) => {
            if (res.resCode == '0000') {
              console.log('详情', res.resData)
              that.baseInfo = res.resData
              that.baseInfo2 = res.resData.gpPaymentList
              that.DueAndPay = res.resData.gpToPaymentListVo
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
      BillTypelistchange(a) {
        if (a == "选项1" || a == "选项2") {

          this.cedingCompany = [];
          this.Biltime = true;
        } else {
          this.Biltime = false;
        }
      },
      // 打开弹窗
      showDialog() {
        this.isShow = true
        console.log('弹窗')
      },

    },
  });
});