// [{原：{}，标的:[],再保人:[]},{} ]
/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./selectpolicyApp.html");
  // 引入API
  // let reuqireConfig = require("../../insureApp/index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  // Vue.gvUtil.setApi(config.api);
  Vue.gvUtil.setApi({
    // 回显数据
    add: '/policySelfMain/add', // 保存接口
    submit: '/policySelfMain/submit', // 提交接口
    calculateItems: '/policySelfMain/calculateItems', // 标的重新计算
    calculateInstalment: '/guinstallmain/calculateInstalment', // 分期计算
    // 查询子组件
    findProject: "/policySelfMain/findProject", //项目
    findScheme: "/policySelfMain/findScheme", // 方案
    policySelfMainfindList: "/policySelfMain/findRisk", // 原险种
    searchPolicy: "/policySelfMain/findPolicyAllInfo", // 查询接口
    exportItemExcel: '/policyItemMain/exportItemExcel', // excel导出
    importItemExcel: '/policyItemMain/importItemExcel', // excel导入
    importClauseExcel: '/guPolicyClause/importClauseExcel', // 条款导入
    findDetail: '/ggRisk/findDetail', // 获取默认币别(本单币别) 上下游标识  入参 : riskCode-险种代码
    findExchange: '/ggCode/findExchangeRate', // 获取兑换率 入参 : {"baseCurrency":"003",   --本单币别"exchCurrency":"001"--原单币别}
    findReinsurerList: '/policySelfMain/findReinsurerList', // 再保人
    findUserList: '/policySelfMain/findUserList', // 经办人 承包人
    getPolicyFeeInfo: "/policySelfMain/getPolicyFeeInfo", //保单详情接口
    UserInfo: '/User/UserInfo', // 获取用户信息
    verify: '/policySelfMain/verify', // 审核接口
    getList: "/document/getList", //查打印列表
    printPDF: '/PDF/printPDF', // 下载pdf 
  });
  return Vue.gvUtil.Page({
    template: temp,
    name: "selectpolicyApp",
    components: {},
    props: {
      // 校验四兄弟
      vailfFourBrother: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 保险险种
      risk: {
        type: [String],
        default: ''
      },
      // 原保单信息
      guPolicyVoList2: {
        type: Array,
        default: function () {
          return []
        }
      },
    },

    datas: function () {
      return {
        // 查询条件
        table: {
          projectCode: "", // 项目
          schemeCode: "", // 方案
          supplierName: "", // 原保险人
          startDate: '', // 起期
          endDate: '', // 止期
          policyNo: "", // 原保单号
          riskCode: "", // 原险种
          flag: "", // 主共 || 从共
          selfCode: '' // 不显示的自保险种
          // isNewPolicy: "1", //版本号最高 写死  // 后期加上 钱佳豪 !!!
        },
        projectNamelist: [], // 项目
        cedingRiskNamelist: [], //原保险人
        cedingFindScheme: [], // 方案
        // 查询结果
        tableData: [], // 显示的数组
        tablearr: [], // 后台显示的全部数据
        fourbrother: {}, // 校验四兄弟
        objFromSelectpolicyApp: {}, // 多选数据
        rules: {}, //校验
        multipleSelection: [],
        currentPage: 0,
        pageSize: 10,
        coinsuranceType: [], //主共/从共下拉码表
        dialogFormVisible: false, //详情页面
        assetTypePlaceholder: Vue.filter("translate")("Pleaseprojectfirst"), //请先选择项目
        isReadonly: true,
        currentarr: []
      };
    },
    created() {
      // // 调用接口原币
      Vue.gvUtil.initTranslation("Currency", "IsMaster");
      Vue.gvUtil.initTranslation("ShareType");
      // Vue.gvUtil.initTranslation("TemporaryMark");
    },
    mounted() {
      // this.getSelectall(); // 原险种
      this.getProall(); // 项目名称
      this.getScheme() // 方案
    },
    events: {
      // 查询
      seachlist() {
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "searchPolicy",
          contextName: "selfins",
        });
        let params = this.table
        // if (this.table.period == null) {
        //   params.startDate = ''
        //   params.endDate = ''
        // } else if (this.table.period.length > 0) {
        //   params.startDate = this.table.period[0]
        //   params.endDate = this.table.period[1]
        // }
        console.log('查询条件', params)
        // if (params.supplierName == '') {
        //   that.$message({
        //     showClose: true,
        //     message: '原保险人不能为空',
        //     type: 'warning'
        //   })
        //   return
        // }
        if (params.flag == '') {
          that.$message({
            showClose: true,
            message: '主共从共不能为空',
            type: 'warning'
          })
          return
        }
        // 查询接口
        Vue.gvUtil.http.post(url, params).then((res) => {
          let that = this
          if (res.resCode == "0000") {
            let arr = []
            console.log('res', res)
            that.tablearr = res.resData // 总的数据
            for (let i = 0; i < res.resData.length; i++) {
              res.resData[i].guPolicy.index = i
              arr.push(res.resData[i].guPolicy)
            }
            console.log('显示数据', arr, '显示全部数据', res.resData, that.tablearr)
            that.tableData = arr // 显示数据
            // that.tablearr = res.resData // 总的数据
          } else {
            that.$message({
              showClose: true,
              message: '查询失败',
              type: 'warning'
            })
          }
        });

      },
      // 项目
      getProall() {
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "findProject",
          contextName: "selfins",
        });
        let params = {
          checkInd: "01"
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            that.projectNamelist = res.resData.project.businessList.content;
          }
        });
      },
      // 获取原险种数据 默认用户选择传递过来的
      getSelectall() {
        console.log('this.risk', this.risk)
        let url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainfindList",
          contextName: "selfins",
        });
        let params = {
          riskCode: this.risk,
        };
        // this.table.riskCode = this.risk
        this.table.selfCode = this.risk
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {

            this.cedingRiskNamelist = res.resData;
          }
        });
      },
      // 方案 
      getScheme() {
        let url = Vue.gvUtil.getUrl({
          apiName: "findScheme",
          contextName: "selfins",
        });
        let params = {
          projectCode: this.table.projectCode
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log('方案res', res.resData.businessList.content)
            // console.log('方案res',res.resData.businessList.content)
            this.cedingFindScheme = res.resData.businessList.content
          }
        });
      },
      // 项目change事件 方案下拉
      changeproject(projectCode) {
        console.log('获取数据', projectCode)
        this.table.projectCode = projectCode
        this.isReadonly = false;
        this.assetTypePlaceholder = Vue.filter("translate")("gSelect");
        // 根据项目Code 选择方案
        let url = Vue.gvUtil.getUrl({
          apiName: "findScheme",
          contextName: "selfins",
        });
        let params = {
          projectCode: this.table.projectCode
        };
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            console.log('方案res', res.resData.businessList.content)
            // console.log('方案res',res.resData.businessList.content)
            this.cedingFindScheme = res.resData.businessList.content
          }
        });
      },
      // 原险种
      choosecedingRisk(data) {
        console.log('原险种', data)
        this.table.riskCode = data
      },
    },
    methods: {
      reset() {
        for (key in this.table) {
          this.table[key] = ''
        }
      },
      // 获取校验四兄弟和用户选择险种
      getValidFourBrother() {

        console.log('校验四兄弟 自选险种', this.vailfFourBrother, this.risk)
        this.fourbrother = this.vailfFourBrother
        // this.table.riskCode = this.risk
        this.table.selfCode = this.risk
        this.getSelectall(); // 原险种
      },
      // 单选-并且传递
      add(obj) {
        console.log('全部数据', this.tablearr)
        console.log('新增', obj)
        console.log('index', obj.index)
        let index = obj.index
        let objFromSelectpolicyApp = {}
        let guPolicyVoList = []
        let guPolicyItemMainVoList = []
        // 原保单
        guPolicyVoList.push(obj)
        objFromSelectpolicyApp.guPolicyVoList = guPolicyVoList
        // 标的
        objFromSelectpolicyApp.guPolicyItemMainVoList = this.tablearr[index].guPolicyItemMainList
        // 再保人 tablearr guPolicyRiVoList
        objFromSelectpolicyApp.guPolicyRiVoList = this.tablearr[index].guPolicyRiVoList
        console.log('objFromSelectpolicyApp', objFromSelectpolicyApp)
        // 校验四兄弟
        // console.log('校验', this.vailfFourBrother)
        let validF = this.vailfFourBrother

        // 判断是否重复
        console.log('基础信息传来的原保单信息', this.guPolicyVoList2)
        for (let item of guPolicyVoList) {
          for (let item2 of this.guPolicyVoList2) {
            let isEqual = this.cmp(item, item2)
            console.log('是否相等', isEqual)
            if (isEqual) {
             this.$message({
                message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame"), //请勿选择相同保单
                type: "warning", // success
              });
              return
            }
          }
        }
        // 第一次录入不控制
        // 如果校验规则为空不做校验
        console.log('校验规则', validF)
    
        if (validF.cedingCompany == '' &&
          validF.currency == '' &&
          validF.programmeCode == '' &&
          validF.projectCode == '') {} else {
          // 四个值有一个不相同就不行 cedingCompany  currency programmeCode projectCode
          if (validF.cedingCompany != obj.cedingCompany ||
            validF.currency != obj.currency ||
            validF.programmeCode != obj.programmeCode ||
            validF.projectCode != obj.projectCode) {
              this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame2"), //请选择同一项目同一方案同一原保险人相同币种的保单
              type: "warning", // success
            });

            return
          }
        }
        // 传递数据给父组件 => baseInfo子组件
        this.$emit('fromselect-event', objFromSelectpolicyApp)
        // 清空选择数据
        this.$refs.multipleTable.clearSelection()
        // 传递数据给查询页面
        // Vue.gvUtil.redirectTo({
        //   name: 'insureApp',
        //   query: {
        //     objFromSelectpolicyApp: objFromSelectpolicyApp
        //   }
        // })
      },
      // 新增多选
      handleSelectionChange(val) {
        console.log('全部数据', this.tablearr)
        let objFromSelectpolicyApp = {}
        let guPolicyVoList = []
        let guPolicyItemMainVoList = []
        let guPolicyRiVoList = []
        // 获取多选的数组
        this.multipleSelection = val;
        console.log('获取多选的数组', this.multipleSelection);
        // 遍历val数组 根据他们的index分别一一push到
        // console.log('')
        for (let i = 0; i < val.length; i++) {
          console.log('index', val[i].index)
          let index = val[i].index
          // 原保单
          guPolicyVoList.push(this.tablearr[index].guPolicy)
          // 标的
          console.log('多选标的', this.tablearr[index].guPolicyItemMainList)
        
          let item = this.tablearr[index].guPolicyItemMainList
          for (let son of item) {
            guPolicyItemMainVoList.push(son)
          }
          // 再保人
          console.log('多选再保人', this.tablearr[index].guPolicyRiVoList)
          let item2 = this.tablearr[index].guPolicyRiVoList
          for (let son2 of item2) {
            guPolicyRiVoList.push(son2)
          }

        }
        objFromSelectpolicyApp.guPolicyVoList = guPolicyVoList
        objFromSelectpolicyApp.guPolicyItemMainVoList = guPolicyItemMainVoList
        objFromSelectpolicyApp.guPolicyRiVoList = guPolicyRiVoList
        console.log('多选传递数据', objFromSelectpolicyApp)
        this.objFromSelectpolicyApp = objFromSelectpolicyApp
      },
      // 多选传递
      multiAdd() {
      
        if (this.objFromSelectpolicyApp.guPolicyVoList && this.objFromSelectpolicyApp.guPolicyVoList.length > 0) {
          console.log('校验', this.vailfFourBrother)
          let validF = this.vailfFourBrother
          // 判断是否重复
          console.log('基础信息传来的原保单信息', this.guPolicyVoList2)
          for (let item of this.objFromSelectpolicyApp.guPolicyVoList) {
            for (let item2 of this.guPolicyVoList2) {
              let isEqual = this.cmp(item, item2)
              console.log('是否相等', isEqual)
              if (isEqual) {
               this.$message({
                message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame"), //请勿选择相同保单
                type: "warning", // success
              });
                return
              }
            }
          }
          // 如果校验规则为空做自身的校验
          if (validF.cedingCompany == '' &&
            validF.currency == '' &&
            validF.programmeCode == '' &&
            validF.projectCode == '') {
            // 第一次用户多选的时候也必须满足
            for (let i = 0; i < this.objFromSelectpolicyApp.guPolicyVoList.length; i++) {
              if (this.objFromSelectpolicyApp.guPolicyVoList[0].cedingCompany != this.objFromSelectpolicyApp.guPolicyVoList[i].cedingCompany ||
                this.objFromSelectpolicyApp.guPolicyVoList[0].currency != this.objFromSelectpolicyApp.guPolicyVoList[i].currency ||
                this.objFromSelectpolicyApp.guPolicyVoList[0].programmeCode != this.objFromSelectpolicyApp.guPolicyVoList[i].programmeCode ||
                this.objFromSelectpolicyApp.guPolicyVoList[0].projectCode != this.objFromSelectpolicyApp.guPolicyVoList[i].projectCode
              ) {
                  this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame2"), //请选择同一项目同一方案同一原保险人相同币种的保单
              type: "warning", // success
            });

                return
              }
            }


          }
          // 如果规则不为空 校验双方的
          else {
            for (let item of this.objFromSelectpolicyApp.guPolicyVoList) {
              if (validF.cedingCompany != item.cedingCompany ||
                validF.currency != item.currency ||
                validF.programmeCode != item.programmeCode ||
                validF.projectCode != item.projectCode
              ) {
                  this.$message({
              message: Vue.gvUtil.getInzTranslate("insureapp_donSelectSame2"), //请选择同一项目同一方案同一原保险人相同币种的保单
              type: "warning", // success
            });

                return
              }
            }
          }

          console.log('多选传递', this.objFromSelectpolicyApp)
          this.$emit('fromselect-event', this.objFromSelectpolicyApp)
          // 请空数据
          this.objFromSelectpolicyApp = {}
          // 清空选择数据
          this.$refs.multipleTable.clearSelection()
          // 传递给连一个组件
          // Vue.gvUtil.redirectTo({
          //   name: 'insureApp',
          //   query: {
          //     objFromSelectpolicyApp: this.objFromSelectpolicyApp
          //   }
          // })
        } else {
         this.$message({
            message: Vue.gvUtil.getInzTranslate("insureapp_pleaseSelect"), //请选中查询结果的保单数据
            type: "warning", // success
          });
          // alert('请选中查询结果的保单数据')
          return
        }

      },
      // 主共||从共
      choose(flag) {
        console.log('主共从共', this.table.flag)
      },
      // 是否共享分摊
      stateFormat3(row, column) {
        if (row.isShare == '0') {
          return '否'
        } else {
          return '是'
        }
      },
      // 按钮
      onListBtn(row, type) {
        if (type == "Add") {
          //新增
          Vue.gvUtil.redirectTo({
            path: "insure_app", //跳转保单录入
            query: {
              // risk: this.risk
            },
          });
        }
      },
         // 去重判断
         cmp(x, y) {
          let xtrr = x.index
          let ytrr = y.index
          delete x.policyId
          delete x.policyMainId
          delete x.periodEnd
          delete x.supplierShortName
          x.index = 1
          delete y.policyId
          delete y.policyMainId
          delete y.periodEnd
          delete y.supplierShortName
          y.index = 1
          // delete y.index
          console.log('x y ', x, y)
          // If both x and y are null or undefined and exactly the same 
          if (x === y) {
            return true;
          }
  
          // If they are not strictly equal, they both need to be Objects 
          if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
          }
  
          //They must have the exact same prototype chain,the closest we can do is
          //test the constructor. 
          if (x.constructor !== y.constructor) {
            return false;
          }
  
          for (var p in x) {
            // 如果属性名为 policyId policyMainId 直接跳过
  
            //Inherited properties were tested using x.constructor === y.constructor
            if (x.hasOwnProperty(p)) {
              // Allows comparing x[ p ] and y[ p ] when set to undefined 
              if (!y.hasOwnProperty(p)) {
                return false;
              }
  
              // If they have the same strict value or identity then they are equal 
              if (x[p] === y[p]) {
                continue;
              }
  
              // Numbers, Strings, Functions, Booleans must be strictly equal 
              if (typeof (x[p]) !== "object") {
                return false;
              }
  
              // Objects and Arrays must be tested recursively 
              // if (!Object.equals(x[p], y[p])) {
              //   return false;
              // }
            }
          }
  
          for (p in y) {
            // allows x[ p ] to be set to undefined 
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
              return false;
            }
          }
          x.index = xtrr
          y.index = ytrr
          return true;
  
        }
    },
  });
});