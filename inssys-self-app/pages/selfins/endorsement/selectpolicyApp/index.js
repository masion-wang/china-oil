/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./index.html");
  // 引入API
  let reuqireConfig = require("./index.config.js");
  let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: temp,
    name: "selectpolicyApp",
    components: {},
    query: function () { //双向绑定页面显示数据
      return {
        risk: ''
      }
    },
    datas: function () {
      return {
        // 查询条件
        table: {
          projectCode: "", // 项目
          schemeCode: "", // 方案
          supplierName: "", // 原保险人
          period: [], // 起期 终期
          policyNo: "", // 原保单号
          riskCode: "", // 原险种
          flag: "",
          isNewPolicy: "1", //版本号最高 写死
        },
        projectNamelist: [], // 项目
        cedingRiskNamelist: [], //原保险人
        cedingFindScheme: [], // 方案
        // 查询结果
        tableData: [], // 显示的数组
        tablearr: [], // 后台显示的全部数据
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
      // Vue.gvUtil.initTranslation("TemporaryMark");
    },
    mounted() {
      this.getSelectall(); // 原险种
      this.getProall(); // 项目名称
      this.getScheme() // 方案
    },
    events: {
      // 查询接口
      seachlist() {
        //查询接口
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "searchPolicy",
          contextName: "selfins",
        });
        // console.log('查询条件', this.table)
        let params = this.table
        if (this.table.period.length > 0) {
          params.startDate = this.table.period[0]
          params.endDate = this.table.period[1]
        }
        // delete params.period
        console.log('查询条件', params)
        Vue.gvUtil.http.post(url, params).then((res) => {
          let that = this
          if (res.resCode == "0000") {
            let arr = []
            console.log('res', res)
            for (let i = 0; i < res.resData.length; i++) {
              res.resData[i].guPolicy.index = i
              arr.push(res.resData[i].guPolicy)
            }
            console.log('显示数据', arr, '显示全部数据', res.resData)
            that.tableData = arr // 显示数据
            that.tablearr = res.resData // 总的数据
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
        let url = Vue.gvUtil.getUrl({
          apiName: "policySelfMainfindList",
          contextName: "selfins",
        });
        let params = {
          riskCode: this.query.risk,
        };
        this.table.riskCode = this.query.risk
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
      // 是否共享分摊
      stateFormat3(row, column) {
        if (row.isShare == '0') {
          return '否'
        } else {
          return '是'
        }
      },
      initPage() {
        console.log('传递过来的险种', this.query.risk)
      },
      //按钮
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
      // 单选-并且传递
      add(obj) {
        // [{{},[]},]
        // {[],[]}
        console.log('全部数据', this.tablearr)
        console.log('新增', obj)
        console.log('index', obj.index)
        let index = obj.index
        let objFromSelectpolicyApp = {}
        let guPolicyVoList = []
        let guPolicyItemMainVoList = []
        // 原保单
        guPolicyVoList.push(obj)
        // 标的
        guPolicyItemMainVoList = this.tablearr[index].guPolicyItemMainVoList
        // 拼凑起来

        objFromSelectpolicyApp.guPolicyVoList = guPolicyVoList
        // 标的
        objFromSelectpolicyApp.guPolicyItemMainVoList = this.tablearr[index].guPolicyItemMainList
        // 原保人
        // 基础信息
        // console.log('haha',this.tablearr[index].guPolicyItemMainList)
        console.log('objFromSelectpolicyApp', objFromSelectpolicyApp)
        // 传递给连一个组件
        Vue.gvUtil.redirectTo({
          name: 'insureApp',
          query: {
            objFromSelectpolicyApp: objFromSelectpolicyApp
          }
        })
      },
      // 新增多选
      handleSelectionChange(val) {
        console.log('全部数据', this.tablearr)
        let objFromSelectpolicyApp = {}
        let guPolicyVoList = []
        let guPolicyItemMainVoList = []
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
          console.log('item', this.tablearr[index].guPolicyItemMainList)
          let item = this.tablearr[index].guPolicyItemMainList
          for (let son of item) {
            guPolicyItemMainVoList.push(son)
          }

        }
        objFromSelectpolicyApp.guPolicyVoList = guPolicyVoList
        objFromSelectpolicyApp.guPolicyItemMainVoList = guPolicyItemMainVoList
        console.log('多选传递数据', objFromSelectpolicyApp)
        this.objFromSelectpolicyApp = objFromSelectpolicyApp
      },
      // 多选传递
      multiAdd() {
        if (this.objFromSelectpolicyApp.guPolicyVoList && this.objFromSelectpolicyApp.guPolicyVoList.length > 0) {
          console.log('多选传递', this.objFromSelectpolicyApp)
          // 传递给连一个组件
          Vue.gvUtil.redirectTo({
            name: 'insureApp',
            query: {
              objFromSelectpolicyApp: this.objFromSelectpolicyApp
            }
          })
        } else {
          alert('请选中查询结果的保单数据')
          return
        }

      },
      // 主共||从共
      choose(flag) {
        console.log('主共从共', this.table.flag)
      }
    },
  });
});