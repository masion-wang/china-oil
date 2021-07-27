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
    findGpBillMainPayable: '/gpbillmain/findGpBillMainPayable', // 应收应付分页查询
    findGpBillDetails: '/gpbillmain/findGpBillDetails', // 详情查询  参数 billNo
    findfeetypecode: 'guFeetype/findfeetypecode', // 单据类型
    exportBillExcelAll: '/gpbillmain/exportBillExcel', // 导入全部
    billRevertQuery: '/gpbillmain/billRevertQuery' // 根据单据号 获取 policyMainId 
  });
  // 组件
  return Vue.gvUtil.Page({
    template: temp,
    name: "paymentApp",
    components: {
      insureApp,settlingNewApp
    },
    datas: function () {
      // 双向绑定页面显示数据
      return {
        claimMainId:'',
        isShow2: false,
        isShow3:false,
        policyMainId: '',
        projectNamelist: [], //项目下拉
        // rules: {
        //   //校验
        // },
        coinsuranceType: [], //主共/从共下拉码表
        formLabelAlign: {
          //双向绑定
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
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findGpBillMainPayable", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            execl: {
              isShow: false,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
            execlAll: true
            // execlAll: { 'isShow': true, 'fileName': 'testExecl', 'exclude': ['operation'] }
          },
          search: {
            //查询域元数据
            policyNo: "", //保单号
            claimNo: "", //赔案号
            billNo: "", //单据号
            correspCode: "", //账单接收人
            isCleard: "", //已清 未清
            // cedingPolicyNo: "", //原险种
            dueDatesStart: '', // 缴费起期
            dueDatesEnd: '', // 缴费止期
            approvedDateStart: '', //收付款日期起期
            approvedDateEnd: '' // 收付款日期止期
          },
          fields: [{
              labelKey: "凭证号",
              prop: "voucherNo",
            },
            {
              labelKey: "账单日期",
              prop: "approvedDate",
            },
            {
              labelKey: "会计结算日期",
              prop: "settledDate",
            },
            {
              labelKey: "资金结算日期",
              prop: "latelySettleDate",
            },
            {
              labelKey: "保单号",
              prop: "policyNo",
            },
            {
              labelKey: "赔案号",
              prop: "claimNo",
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
              labelKey: "账单接收人",
              prop: "correspondence",
            },
            {
              labelKey: "项目名称",
              prop: "projectName",
            },
            {
              labelKey: "货币",
              prop: "currency",
              format: {
                type: "ggcode",
                codeType: "Currency",
              },
            },
            {
              labelKey: "应收金额",
              prop: "deposit",
            },
            {
              labelKey: "应付金额",
              prop: "withdrawal",
            },
            {
              labelKey: "余额",
              prop: "balance",
            },
            {
              labelKey: "结算金额(资金)",
              prop: "settledAmount",
            },
            {
              labelKey: "结算金额(会计)",
              prop: "financeSettledAmount",
            },
            {
              labelKey: "未清金额 ",
              prop: "outstanding",
            },
            {
              labelKey: "业务描述 ",
              prop: "description",
            },
          ],
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
    created() {
      Vue.gvUtil.initTranslation("Currency")
    },
    events: {
      initPage() {},
      // 导出全部
      exportAll() {
        let params = this.table.search
        console.log('this.table.search', this.table.search)
        let url = Vue.gvUtil.getUrl({
          apiName: "exportBillExcelAll",
          contextName: "selfins",
        });

        Vue.gvUtil.http.post(url, params, {
          responseType: 'blob'
        }).then((res) => {
          console.log('res', res)
          const data = res
          const url = window.URL.createObjectURL(new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
          }))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])
          link.setAttribute('download', 'download.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        });
      },
    },
    methods: {
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