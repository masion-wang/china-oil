/**
 * 基础日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
  var temp = require("./underlyingquer.html");
  // // 引入API
  // let reuqireConfig = require("../index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  var config = {
    api: {
      findTitle: "/ggRisk/findTitle", //标的title查询页面
      getItemSearchpa: "/gcClaimMainSelf/getItemSearch", //查询默认值
    },
  };
  Vue.gvUtil.setApi(config.api);
  var { configHeadList } = require("./headConfig");
  return Vue.gvUtil.Page({
    template: temp,
    name: "clauseApp",
    datas: function () {
      // 双向绑定页面显示数据
      return {
        biaoItemNum: [], //储存标的序号
        versionNo: "", //版本号
        policyNo: "", //保单号
        riskCode: "", //险种
        risk: "",
        projectVisible: false, //自保保单号详情页面
        nowTime: "",
        //表格列表的字段
        listFields: [],
        assetHeadList: [], // 表头数据
        feetypecode: [], //费用类型下拉
        disabled: false, //只读模式
        isEdit: "新增", //编辑新增
        rules: {
          //校验
        },
        dialogFormVisible: false, //详情页面
        table: {
          basic: {
            api: "findItemList", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            showSequenceNum: false, //序号
            // execl: {
            //   isShow: true,
            //   fileName: "testExecl",
            //   exclude: ["Operation"],
            // }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            project: "", //工程名称
            versionNo: "", //版本号
            policyNo: "", //保单号
            riskCode: "", //险种代码
            cedingPolicyNo: "", //原保单号
            periodRiskCode: "", //原险种
            insured: "", //被保人
            vesselName: "", //船名
            oilField: "", //油田
            wellName: "", //井名
            wellNo: "", //井号
            area: "", //作业区
            propertyDetails: "", //财产名称
          },
          fields: [
            // {
            //   labelKey: "被保人",
            // btns: [
            //   {
            //     prop: "policyNo",
            //     flag: "policyNo",
            //     type: "a",
            //   },
            // ],
            // },
            // {
            //   labelKey: "工程名称",
            //   // prop: "feeSeqNo",
            // },
            // {
            //   labelKey: "工程地址",
            //   // prop: "feeTypeName",
            // },
            // {
            //   labelKey: "原险种代码",
            //   // prop: "riskCode",
            // },
            // {
            //   labelKey: "原险种名称",
            //   // prop: "renewalSign",
            //   // format: {
            //   //   type: "ggcode",
            //   //   codeType: "ResumeRemark",
            //   // },
            // },
            // {
            //   labelKey: "原保单号",
            //   // prop: "effectiveDate",
            // },
            // {
            //   labelKey: "保险起期",
            //   // prop: "effectiveDate",
            //   // width: "85px",
            // },
            // {
            //   labelKey: "保险止期",
            //   // prop: "expiryDate",
            //   // width: "85px",
            // },
            {
              labelKey: "项",
              prop: "section",
              // width: "85px",
            },
            {
              labelKey: "保险起期",
              prop: "periodStart",
              // width: "85px",
            },
            {
              labelKey: "保险止期",
              prop: "periodEnd",
              // width: "85px",
            },
            {
              labelKey: "保额／限额",
              prop: "insuredValue",
            },
            {
              labelKey: "海油权益%",
              prop: "interestcnooc",
            },
            {
              //配置最后列按钮
              prop: "operation",
              labelKey: "operation",
              btns: [
                {
                  btnKey: "select", //选择
                  flag: "choose",
                  type: "btn",
                },
              ],
            },
          ],
        },
      };
    },
    async created() {
      await this.initTrans(configHeadList);
    },
    computed: {},
    events: {
      //给$refs.table.rickcode赋值
      closeScheme(val, biaoItemNum) {
        this.biaoItemNum = biaoItemNum;
        var searchObj = this.$refs.table.getSearchVal();
        searchObj.riskCode = val.riskCode;
        searchObj.versionNo = val.version;
        searchObj.policyNo = val.policyNo;
        this.$refs.table.setSearchVal(searchObj);
      },
    },
    methods: {
      initPage() {},
      defaultout(p, v, ss) {
        var url = Vue.gvUtil.getUrl({
          apiName: "getItemSearchpa",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { policyNo: p, versionNo: v }).then((res) => {
          if (res.resCode === "0000") {
            var searchObj = this.$refs.table.getSearchVal();
            reredataAll = res.resData;
            if (ss == "CARD") {
              searchObj.cedingPolicyNo = reredataAll.cedingPolicyNo;
              searchObj.periodRiskCode = reredataAll.periodRiskCode;
              searchObj.project = reredataAll.project;
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
              searchObj.insured = "";
              searchObj.vesselName = "";
              searchObj.oilField = "";
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.area = "";
              searchObj.propertyDetails = "";
            } else if (ss == "CARU") {
              searchObj.project = reredataAll.project;
              searchObj.cedingPolicyNo = "";
              searchObj.periodRiskCode = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
              searchObj.insured = "";
              searchObj.vesselName = "";
              searchObj.oilField = "";
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.area = "";
              searchObj.propertyDetails = "";
            } else if (ss == "EAS") {
              searchObj.periodRiskCode = reredataAll.periodRiskCode;
              searchObj.insured = reredataAll.insured;
              searchObj.cedingPolicyNo = "";
              searchObj.project = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
              searchObj.vesselName = "";
              searchObj.oilField = "";
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.area = "";
              searchObj.propertyDetails = "";
            } else if (ss == "MAR") {
              searchObj.vesselName = reredataAll.vesselName;
              searchObj.periodRiskCode = "";
              searchObj.insured = "";
              searchObj.cedingPolicyNo = "";
              searchObj.project = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
              searchObj.oilField = "";
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.area = "";
              searchObj.propertyDetails = "";
            } else if (ss == "ODE" || ss == "OEE") {
              searchObj.oilField = reredataAll.oilField;
              searchObj.wellName = reredataAll.wellName;
              searchObj.wellNo = reredataAll.wellNo;
              searchObj.vesselName = "";
              searchObj.periodRiskCode = "";
              searchObj.insured = "";
              searchObj.cedingPolicyNo = "";
              searchObj.project = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
              searchObj.area = "";
              searchObj.propertyDetails = "";
            } else if ((ss = "OOPU")) {
              searchObj.area = reredataAll.area;
              searchObj.oilField = reredataAll.oilField;
              searchObj.propertyDetails = reredataAll.propertyDetails;
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.vesselName = "";
              searchObj.periodRiskCode = "";
              searchObj.insured = "";
              searchObj.cedingPolicyNo = "";
              searchObj.project = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
            } else if (ss == "OOPD") {
              searchObj.cedingPolicyNo = reredataAll.cedingPolicyNo;
              searchObj.periodRiskCode = reredataAll.periodRiskCode;
              searchObj.insured = reredataAll.insured;
              searchObj.area = "";
              searchObj.oilField = "";
              searchObj.propertyDetails = "";
              searchObj.wellName = "";
              searchObj.wellNo = "";
              searchObj.vesselName = "";
              searchObj.project = "";
              searchObj.versionNo = "";
              searchObj.policyNo = "";
              searchObj.riskCode = "";
            }
            this.$refs.table.setSearchVal(searchObj);
          }
        });
      },
      initTrans(headList) {
        var codeType = [],
          poList = [],
          selectList = [];
        headList.forEach((e) => {
          if (e.config.type == "ggcode") {
            codeType.push(e.config.codeType);
          }
          if (e.config.type == "selectPo") {
            poList.push(e.config.poName);
          }
          if (e.config.type == "select") {
            selectList.push({
              url: e.config.url,
              code: e.config.code,
              name: e.config.name,
              data: e.config.data,
            });
          }
        });
        return Promise.all([
          this.initTranslation(codeType.join(",")),
          this.initTranslationPoName(poList),
          this.initTranslationSelect(selectList),
        ]);
      },
      initTranslationSelect(list) {
        return new Promise((resolve, reject) => {
          Vue.gvUtil.initTranslationSelect(list, () => {
            resolve();
          });
        });
      },
      initTranslationPoName(list) {
        return new Promise((resolve, reject) => {
          Vue.gvUtil.initTranslationPoName(list, () => {
            resolve();
          });
        });
      },
      initTranslation(sting) {
        return new Promise((resolve, reject) => {
          Vue.gvUtil.initTranslation(sting, () => {
            resolve();
          });
        });
      },
      //查询结果集动态生成
      initTitle(ss) {
        this.risk = ss;
        var url = Vue.gvUtil.getUrl({
          apiName: "findTitle",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { riskCode: ss }).then((res) => {
          if (res.resCode === "0000") {
            this.assetHeadList = res.resData;
            this.$refs.table.setTableColumn(this.assetHeadList, configHeadList);
            this.$refs.table.clearTableData();
          }
        });
      },
      onListBtn(row, type) {
        if (type == "choose") {
          //选择按钮   传当前行，与是否清空所有数据信息
          if (this.biaoItemNum.length > 0) {
            this.biaoItemNum.forEach((v) => {
              if (v == row.itemMainId) {
                //不允许重复选择相同标的
                Vue.gvUtil.message(
                  Vue.gvUtil.getInzTranslate("zbisnotalltoselemarkre")
                );
              } else {
                if (this.riskCode == "MAR") {
                  row.selfName = row.vesselName;
                } else if (this.riskCode == "CARD" || this.riskCode == "CARU") {
                  row.selfName = row.project;
                } else if (this.riskCode == "EAS" || this.riskCode == "OOPD") {
                  row.selfName = row.periodRiskCode;
                } else if (this.riskCode == "ODE" || this.riskCode == "OEE") {
                  row.selfName = row.wellName;
                } else if (this.riskCode == "OOPU") {
                  row.selfName = row.propertyDetails;
                }
                this.$emit("chooseRisk", row);
              }
            });
          } else {
            this.$emit("chooseRisk", row);
          }
        }
      },
    },
  });
});
