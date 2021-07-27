/**
 *  基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      getCountry: "/common/gg_country/findAll",
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    params: function () {
      return {};
    },
    props: {
      vo: null,
      isReadonly: {
        type: Boolean,
        default: false,
      },
      policyLen: null,
      showSubBtn: {
        type: Boolean,
        default: false,
      },
    },
    datas: function () {
      let ChecklossDate = function (rule, value, callback) {
        if (new Date(value).getTime() > new Date().getTime()) {
          return callback(new Error("出险时间不能晚于当前时间"));
        } else {
          callback();
        }
      };
      return {
        baseInfo: {
          updateTime: "", //更新时间
          claimNotificationNo: "", //出险通知单号
          insuredCompanyName: "", //投保单位名称
          insuredCompanyCode: "", //投保单位代码
          lossDate: "", //出险时间
          reasonOfLoss: "", //出现原因
          country: "", //国家
          province: "", //省
          city: "", //市
          district: "", //区
          contactPersonCode: "", //联系人
          contactPersonName: "", //联系人
          contactNumber: "", //联系方式
          postalCode: "", //邮编
          catastropheCode: "", //巨灾代码
          submitterName: "", //提交人名称
          submitterCode: "", //提交人代码
          modifiedByName: "", //修改人
          submissionDate: "", //提交时间
          createTime: "", //创建时间
          modificationDate: "", //修改日期
          claimNotificationStatus: "01", //出险通知状态
          approvedName: "", //审核人名称
          approvedCode: "", //审核人代码
          approvedDate: "", //审核日期
          lossLocation: "", //出险地点
          lossDescription: "", //出险描述
          remark: "", //备注
          claimType: "", //索赔信息-索赔方式 （审核时使用）
          claimRemark: "", //索赔信息-备注 （审核时使用）
        },
        expireTimeOption: {
          disabledDate(date) {
            return date.getTime() > Date.now();
          },
        },
        rules: {
          insuredCompanyCode: [
            { required: true, message: "投保单位不能为空", trigger: "change" },
          ],
          lossDate: [
            { required: true, message: "出险时间不能为空", trigger: "blur" },
            { validator: ChecklossDate, trigger: "blur" },
          ],
          reasonOfLoss: [
            { required: true, message: "出险原因不能为空", trigger: "change" },
          ],
          country: [
            { required: true, message: "国家不能为空", trigger: "blur" },
          ], //国家
          contactPersonCode: [
            { required: true, message: "联系人不能为空", trigger: "blur" },
          ], //联系人
          contactNumber: [
            { required: true, message: "联系方式不能为空", trigger: "blur" },
          ], //联系方式
          lossLocation: [
            { required: true, message: "出险地点不能为空", trigger: "blur" },
          ],
        },
        pageType: "",
        InsuredAdviceOptions: [],
        policyLength: 0,
        oldLossDate: "",
        oldCompany: "",
        countryOptions: [], //国家下拉框
        provinceOptions: [], //省 下拉框
        cityOptions: [], //市 下拉框
        districtOptions: [], //区 下拉框
      };
    },
    events: {
      //记录
      recordOldCompany: function () {
        this.oldCompany = this.baseInfo.insuredCompanyCode;
      },
      //记录当前出险日期
      recordOldLossDate: function () {
        this.oldLossDate = this.baseInfo.lossDate;
      },
    },
    methods: {
      initPage: function () {
        this.policyLength = this.policyLen;
        this.InsuredAdviceOptions = this.getInsuredAdviceOptions();
        this.baseInfo = this.vo;
        if (this.query.type) {
          this.pageType = this.query.type;
        }
        this.getAllArea();
        this.getAreaOptions("1", "");
      },
      getData: function () {
        return this.baseInfo;
      },
      getAllArea: function () {
        if (!!this.baseInfo.province && !!this.baseInfo.country) {
          this.getAreaOptions("2", this.baseInfo.country);
        }
        if (!!this.baseInfo.city && !!this.baseInfo.province) {
          this.getAreaOptions("3", this.baseInfo.province);
        }
        if (!!this.baseInfo.district && !!this.baseInfo.city) {
          this.getAreaOptions("4", this.baseInfo.city);
        }
      },
      getValidate: function () {
        var result = false;
        let _this = this;
        this.$refs["baseInfo"].validate(function (valid, obj) {
          if (!valid) {
            for (i in obj) {
              if (!_this.$refs[i].focus) {
                _this.$refs[i].$children[0].focus();
              } else {
                _this.$refs[i].focus();
              }
            }
          }
          result = valid;
        });
        return result;
      },
      //出险通知状态翻译
      formatStatus: function (code) {
        if (this.InsuredAdviceOptions && this.InsuredAdviceOptions.length > 0) {
          let index = this.InsuredAdviceOptions.findIndex(
            (item) => item.codecode == code
          );
          if (index > -1) {
            return this.InsuredAdviceOptions[index].codename;
          }
          return "";
        }
      },
      //获取出险通知状态
      getInsuredAdviceOptions() {
        //
        return this.$store.state.publicClock.InsuredAdvice;
      },
      //获取地区下拉框 areaLevel 1为国家 2为省 3为市 4为区 upperAreaCode传上一级的code 查国家不用传
      getAreaOptions(areaLevel, upperAreaCode) {
        url = Vue.gvUtil.getUrl({
          apiName: "getCountry",
          contextName: "product",
        });
        let obj = {
          areaLevel,
          upperAreaCode,
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            let data = res.resData;
            if (areaLevel == "1") {
              let chinaObj = "";
              for (var i = 0; i < data.businessList.length; i++) {
                if (data.businessList[i].countryCode == "CN") {
                  chinaObj = data.businessList[i];
                  data.businessList.splice(i, 1);
                  break;
                }
              }
              if (chinaObj instanceof Object) {
                data.businessList.unshift(chinaObj);
              }
              this.countryOptions = data.businessList;
            } else if (areaLevel == "2") {
              this.provinceOptions = data.businessList;
            } else if (areaLevel == "3") {
              this.cityOptions = data.businessList;
            } else if (areaLevel == "4") {
              this.districtOptions = data.businessList;
            }
          }
        });
      },
    },
    watch: {
      vo: {
        handler(val) {
          this.baseInfo = JSON.parse(JSON.stringify(val));
          this.getAllArea();
        },
        deep: true,
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val;
        },
        deep: true,
      },
      policyLen: {
        handler(val) {
          this.policyLength = val;
          console.log("baseInfo", val);
        },
        deep: true,
      },
      $route: {
        handler(val) {
          this.$refs.baseInfo.clearValidate();
        },
        deep: true,
      },
    },
  });
});
