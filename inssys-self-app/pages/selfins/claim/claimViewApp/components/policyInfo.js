/**
 *  保单信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var AssetDetail = require("./assetDetail"),
    gvValidTable = require("./gvValidTable"),
    gvValidColumn = require("./gvValidColumn");
  var { configHeadList } = require("./headConfig.js");
  var config = {
    api: {
      quotationAsset: "/purchase/quotation/asset/search",
      comAssetTypeOption: "/common/ggcode/asset_type", // 资产细类下拉
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./policyInfo.html"),
    name: "policyInfoApp",
    params: function () {
      return {};
    },
    props: {
      vo: Array,
      isReadonly: {
        type: Boolean,
        default: false,
      },
    },
    datas: function () {
      return {
        tableData: [],
        assetDetailDialog: false,
        dataList: [
          {
            id: 1,
            tabLabel: "资产",
            search: {
              assetCategory: "02",
              assetType: "",
            },
            rules: {},
            headList: [],
            formData: {
              page: {
                currentPage: 1,
                pageSize: 10,
              },
              tableData: [],
            },
          },
        ],
        assetTypeOptions: [], // 资产细类下拉
        assetTypeCache: [], // 资产细类下拉
        assetTypeObj: [],
        configHeadList: configHeadList,
        activeName: 1,
        showTable: false,
      };
    },
    computed: {
      tabIndex() {
        return Number(this.activeName) - 1;
      },
    },
    events: {
      // 资产细类change
      changeAssetType(e) {
        var findData = this.assetTypeOptions[Number(this.activeName) - 1].find(
          (item) => e == item.codecode
        );
        this.dataList[Number(this.activeName) - 1].tabLabel = findData.codename
          ? findData.codename
          : this.dataList[Number(this.activeName) - 1].tabLabel;
      },
      deletePolicy: function (idx1, idx2) {
        console.log(idx1, idx2, this.tableData);
        Vue.gvUtil
          .confirm({
            msg: "是否确认删除该数据？",
          })
          .then(() => {
            this.tableData[idx1].gcClaimPolicyList.splice(idx2, 1);
            if (this.tableData[idx1].gcClaimPolicyList.length == 0) {
              this.tableData.splice(idx1, 1);
            }
          });
      },
      openAssetDialog: function (row) {
        // this.$emit('openAssetDialog', row)
        // this.assetDetailDialog = true;
        this.showTable = false;
        url = Vue.gvUtil.getUrl({
          apiName: "quotationAsset",
          contextName: "product",
        });
        Vue.gvUtil.http
          .post(url, {
            proposalCode: row.proposalCode,
            riskCode: row.riskCode,
            schemeCode: row.schemeCode,
          })
          .then((res) => {
            if (res.resCode == "0000") {
              this.dataList = [];
              var dataList = res.resData.businessList;
              if (dataList) {
                dataList.forEach((e, i) => {
                  this.$set(
                    this.assetTypeOptions,
                    i,
                    this.assetTypeCache.filter(
                      (v) => v.assetCategory == e.assetCategory
                    )
                  );
                  this.$set(this.assetTypeObj, i, {
                    assetCategory: e.assetCategory,
                    assetType: e.assetType,
                  });
                  var obj = this.assetTypeCache.find(
                    (v) => v.codecode == e.assetType
                  );
                  let defaultVal = {
                    id: i + 1,
                    tabLabel: obj ? obj.codename : "资产",
                    search: {
                      assetCategory: e.assetCategory,
                      assetType: e.assetType,
                    },
                    rules: {},
                    headList: [],
                    formData: {
                      page: {
                        currentPage: 1,
                        pageSize: 10,
                      },
                      tableData: [],
                    },
                  };
                  this.dataList.push(defaultVal);
                  // let businessList = val.assetList ? val.assetList : []
                  this.initTable(e.headList, e.guPurchaseAssetList, i);
                });
              } else {
                this.$message.error("请求失败！");
              }
              // this.initTable(res.resData.businessList[0].headList, businessList);
            }
          });
      },
      async initTable(head, data, index) {
        // this.headList = [];
        this.dataList[index].headList = [];
        let list = head ? head : [];
        this.rulesLine = {};
        let businessList = data ? data : [];
        var headList = [];
        list.forEach((e) => {
          this.configHeadList.forEach((item) => {
            if (e.dataEname == item.dataEname) {
              let trans = JSON.parse(JSON.stringify(item));
              trans.infoCode = e.infoCode;
              trans.readonly = e.readOnly;
              if (e.request == "1") {
                this.rulesLine[e.dataEname] = {
                  required: true,
                  message: "必填字段",
                  trigger: "change",
                };
              }
              headList.push(trans);
            }
          });
        });
        data.forEach((e, i) => {
          e.key = i;
        });
        await this.initTrans(headList);
        // this.headList = headList;
        this.dataList[index ? index : 0].headList = headList;
        this.dataList[index ? index : 0].rules = JSON.parse(
          JSON.stringify(this.rulesLine)
        );
        // this.formData.tableData = JSON.parse(JSON.stringify(data));
        this.dataList[index ? index : 0].formData.tableData = JSON.parse(
          JSON.stringify(businessList)
        );
        this.showTable = true;
        this.assetDetailDialog = true;
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
      // tab页删除
      tabRemove(name) {
        this.dataList.splice(name - 1, 1);
        this.dataList.forEach((e, i) => {
          e.id = i + 1;
        });
      },
      // tab页切换
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // tab页添加
      tabAdd() {
        console.log("tab页新增");
        var len = this.dataList.length + 1;
        const newData = {
          id: len,
          tabLabel: "资产细类" + len,
          search: {
            assetCategory: "02",
            assetType: "",
          },
          rules: {},
          headList: [],
          formData: {
            page: {
              currentPage: 1,
              pageSize: 10,
            },
            tableData: [
              {
                riskCode: 11,
              },
            ],
          },
        };
        this.dataList.push(newData);
      },
    },
    methods: {
      async initPage() {
        this.assetTypeCache = await this.initAssetType();
        this.activeName = 1;
        Vue.gvUtil.initTranslation("ClaimStatus,AssetCategory", () => {
          let str = JSON.stringify(this.vo);
          var arr1 = JSON.parse(str);
          if (arr1.length > 0) {
            let arr = [];
            arr1.forEach((item) => {
              let idx = arr.findIndex((k) => k.assetCode == item.assetCode);
              if (idx > -1) {
                arr[idx].gcClaimPolicyList.push(item);
              } else {
                arr.push({
                  assetCategory: item.assetCategory,
                  assetCode: item.assetCode,
                  assetName: item.assetName,
                  assetOwnerShip: item.assetOwnerShip,
                  riskCode: item.riskCode || "",
                  schemeCode: item.schemeCode || "",
                  proposalCode: item.proposalCode || "",
                  gcClaimPolicyList: [item],
                });
              }
            });
            this.tableData = arr;
          } else {
            this.tableData = [];
          }
        });
      },
      // 定制表头
      requiredField(h, { column, $index }) {
        // 这里在最外层插入一个div标签
        return h("div", [
          h(
            "el-tooltip",
            {
              // 表示属性
              attrs: {
                effect: "dark",
                content: "必填项",
                placement: "top",
              },
            },
            [
              h("span", {
                domProps: {
                  innerHTML: "* ",
                },
                class: "require",
              }),
            ]
          ),
          h("span", {
            // 表示内容
            domProps: {
              innerHTML: column.label,
            },
            on: {
              click: () => {
                console.log(`${$index}  ${column.label}`);
              },
            },
          }),
        ]);
      },
      // 初始化细类下拉
      initAssetType() {
        return new Promise(async (resolve, reject) => {
          var url = Vue.gvUtil.getUrl({
            apiName: "comAssetTypeOption",
            contextName: "product",
          });
          try {
            let res = await Vue.gvUtil.http.get(url);
            resolve(res.resData.businessList);
          } catch (err) {
            this.$message.error(err);
          }
        });
      },
      getData: function () {
        if (this.tableData.length == 0) {
          return this.tableData;
        } else {
          let arr = [];
          for (let i = 0; i < this.tableData.length; i++) {
            arr = arr.concat(this.tableData[i].gcClaimPolicyList);
          }
          console.log(this.tableData);
          console.log("处理后的数据", arr);
          return arr;
        }
      },
      formatStatus: function (val) {
        return Vue.gvUtil.translationData("ClaimStatus", val);
      },
    },
    watch: {
      vo: {
        handler(val) {
          // this.tableData = val
          var arr1 = JSON.parse(JSON.stringify(val));
          if (arr1.length > 0) {
            let arr = [];
            arr1.forEach((item) => {
              let idx = arr.findIndex(
                (k) =>
                  k.assetCode == item.assetCode &&
                  k.assetName == item.assetName &&
                  k.assetCategory == item.assetCategory
              );
              if (idx > -1) {
                arr[idx].gcClaimPolicyList.push(item);
              } else {
                arr.push({
                  assetCategory: item.assetCategory,
                  assetCode: item.assetCode,
                  assetName: item.assetName,
                  assetOwnerShip: item.assetOwnerShip,
                  riskCode: item.riskCode || "",
                  schemeCode: item.schemeCode || "",
                  proposalCode: item.proposalCode || "",
                  gcClaimPolicyList: [item],
                });
              }
            });
            this.tableData = arr;
          } else {
            this.tableData = [];
          }
        },
        deep: true,
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val;
        },
        deep: true,
      },
    },
    components: {
      AssetDetail,
      gvValidTable,
      gvValidColumn,
    },
  });
});
