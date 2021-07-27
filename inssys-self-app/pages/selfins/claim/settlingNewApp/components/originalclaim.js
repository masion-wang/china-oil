/**
 * 赔案查询主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var config = {
    api: {
      findGcClaim: "/gcClaimMainSelf/findGcClaim", //原单赔案号查询
      autoOldGuClaim: "/gcClaimMainSelf/autoOldGuClaim", //原单信息带出
    },
  };

  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./originalclaim.html"),
    name: "originalclaimApp",
    props: {
      origBaseinfochosse: {},
    },

    datas: function () {
      // 双向绑定页面显示数据
      return {
        trueorfal: false, //是否清空全部数据
        table: {
          //页面配置
          basic: {
            api: "findGcClaim", //分页列表请求api
            vo: "businessList", //分页列表返回的vo
            context: "selfins", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: false, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            // execl: {
            //   isShow: true,
            //   fileName: "testExecl",
            //   exclude: ["Operation"],
            // }, //导出按钮控制，不需要可以删除此属性
          },
          search: {
            claimNotificationNo: "", // 出险通知号
            claimNo: "", // 赔案号
            startTime: "", //出险开始查询时间
            endTime: "", //出险结束查询时间
            submitterCode: "", /// submitterName 提交人
            riskCode: "", /// riskName 险种
            claimStatus: "", //索赔状态
          },
          fields: [
            //结果列表配置，一个对象一列
            {
              labelKey: "claimNo", //国际化key
              prop: "claimNo", //属性
              showTip: true,
            },
            {
              prop: "riskCode",
              labelKey: "riskType",
              showTip: true,
              format: {
                type: "selectPo",
                poName: "ggRisk",
                code: "riskCode",
                name: "riskCname",
              },
            },
            {
              prop: "submitterName",
              showTip: true,
              labelKey: "submitname",
            },
            {
              prop: "preliminarLossAmount",
              labelKey: "preliminarLossAmount",
              showTip: true,
              format: {
                type: "num",
              },
            },
            {
              prop: "submissionDate",
              labelKey: "submitTime",
            },
            {
              prop: "claimStatus",
              labelKey: "claimStatus",
              format: {
                type: "ggcode",
                codeType: "ClaimStatus",
              },
            },
            {
              prop: "cancelStatus",
              labelKey: "cancelStatus",
              format: {
                type: "ggcode",
                codeType: "CancelStatus",
              },
            },
            {
              prop: "reopenStatus",
              labelKey: "reopenStatus",
              format: {
                type: "ggcode",
                codeType: "ReopenStatus",
              },
            },
            {
              //配置最后列按钮
              prop: "Operation",
              labelKey: "gTitleOperation",
              btns: [
                {
                  btnKey: "gBtnSelect",
                  flag: "choose",
                  type: "btn",
                },
              ],
            },
          ],
        },
        workFlow: {},
      };
    },
    events: {
      //储存是否清空数据
      trueOrFlase(ss, baseInfodata) {
        this.trueorfal = ss;
        var searchObj = this.$refs.table.getSearchVal();
        searchObj.versionNo = baseInfodata.version;
        searchObj.policySelfNo = baseInfodata.policyNo;
        this.$refs.table.setSearchVal(searchObj);
      },
      onListBtn: function (row, type, trueOrFlase) {
        //点击选择的时候将基本数据全部传给后端，后端在反值
        if (type == "choose") {
          let url = Vue.gvUtil.getUrl({
            apiName: "autoOldGuClaim",
            contextName: "selfins",
          });
          let obj = this.origBaseinfochosse;
          obj.sourceClaimNo = row.claimNo;
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode == "0000") {
              this.$emit("originalclaimCode", res.resData, this.trueorfal);
            }
          });
        }
      },
    },
    methods: {
      initPage() {
        Vue.gvUtil.initTranslationPoName(["ggRisk"]);
        Vue.gvUtil.initTranslation("ReopenStatus,CancelStatus");
      },
    },
  });
});
