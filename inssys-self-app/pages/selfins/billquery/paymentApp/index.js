/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  var insureApp = require("../../endorsement/insureApp/index.js")
  var settlingNewApp = require("../../claim/settlingNewApp/index.js")
  // 引入API   注册API
  // let reuqireConfig = require("./index.config.js");
  // let config = reuqireConfig.config;
  Vue.gvUtil.setApi({
    policySelfMainfindList: "/policySelfMain/findList", //下拉值
    findGpBillMain: '/gpbillmain/findGpBillMain', // 实收实付查询分页
    findGpBillDetails: '/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
    findfeetypecode: '/guFeetype/findfeetypecode', // 单据类型
    findBybusinessNo: '/gpbillmain/findBybusinessNo', // 业务号
    billRevertQuery: '/gpbillmain/billRevertQuery' // 根据单据号 获取 policyMainId 
  });
  // 组件
  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentApp",
    components: {
      insureApp,
      settlingNewApp
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        claimMainId:'',
        policyMainId: '',
        isC: false,
        projectNamelist: [], //账单接受下拉
        cedingCompany: [], //账单日期
        Biltime: false, //账单日期只读状态
        BillTypelist: [], // 单据类型
        businessNolist: [], // 业务号
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findGpBillMain", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: true, //序号
            execl: {
              isShow: true,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            //查询域元数据
            correspCode: "", //账单接收人
            billType: "", //单据类型
            dueDatesStart: '', // 截止缴费日期 1
            dueDatesEnd: '', // 截止缴费日期 2
            businessNo: "", //业务号
            documentType: "", //账单类型
            balance: 0 // 这个后台要求写死的
          },
          fields: [{
              labelKey: "凭证号",
              prop: "voucherNo",
            },
            {
              labelKey: "单据号",
              btns: [{
                prop: "billNo",
                flag: "view2",
                type: "a", //类型按钮 icon/a/btn
              }, ],
            },
            {
              labelKey: "结算号",
              btns: [{
                prop: "clearInd",
                flag: "view",
                type: "a", //类型按钮 icon/a/btn
              }, ],
            },
            {
              labelKey: "账单接收人",
              prop: "correspondence",
            },
            {
              labelKey: "账单金额",
              prop: "amount",
            },
            {
              labelKey: "结算日期",
              prop: "validDate",
            },
            {
              labelKey: "结算金额",
              prop: "invalidDate",
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
            {
              labelKey: "账单类型",
              prop: "documentTypeName",
            },
            {
              labelKey: "业务描述",
              prop: "description",
            },
            {
              labelKey: "项目名称",
              prop: "projectName",
            }
          ],
        },
        // 弹窗
        isShow: false, // 是否显示弹窗
        isShow2: false,
        isShow3:false,
        baseInfo: [], // 基础信息1
        baseInfo2: [], // 基础信息2
        DueAndPay: [], // 应收应付明细
        isReadonly: false, // 是否只读
        //折叠窗默认弹开
        // activeNames: ["baseInfo"],
      };
    },
    events: {
      initPage() {
        this.fyselect(); //费用类型
        this.businessNoSelect() // 业务号 
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
              // that.baseInfo2 = res.resData.gpPaymentList
              that.DueAndPay = res.resData.gpToPaymentListVo
            } else {
              that.$message({
                showClose: true,
                message: '获取详情失败',
                type: 'warning'
              });
            }

          });
        } else if (type == 'view2') {

          let params = {
            billNo: row.billNo
          }
          let url = Vue.gvUtil.getUrl({
            apiName: "billRevertQuery",
            contextName: "selfins",
          });
          Vue.gvUtil.http.post(url, params).then((res) => {
            if (res.resCode == '0000') {
              console.log('详情', res.resData)

              // 保单 || 理赔
              if (res.resData.businessType == 'POLICY') {
                that.isShow2 = true
                that.policyMainId = res.resData.id
                that.getcheck()
              } else if (res.resData.businessType == 'CLAIM') {
                that.isShow3 = true
                that.claimMainId  = res.resData.id
                that.getcheck2()
              }

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
      getcheck() {
        console.log('policyMainId', this.policyMainId)
        // this.$nextTick(() => {
        //   this.$refs.insureapp.clear(this.policyMainId)
        // })
        setTimeout(() => {
          this.$refs.insureapp.clear2(this.policyMainId)
        }, 0)
      },
      getcheck2(){
        console.log('claimMainId', this.claimMainId)
        // this.$nextTick(() => {
        //   this.$refs.insureapp.clear(this.policyMainId)
        // })
        let claimNo = {
          flag: "claimNo",
          row: this.claimMainId,
        };
        setTimeout(() => {
        
          this.$refs.settlingnewapp.initsettlingNew(claimNo)
        }, 0)
      }
    },
  });
});