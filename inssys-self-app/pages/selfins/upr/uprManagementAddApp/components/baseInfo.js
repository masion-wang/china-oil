/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  // 引入API
  // let reuqireConfig = require("../index.config.js");
  // let config = reuqireConfig.config;
  // 注册API
  Vue.gvUtil.setApi({
    find_other_list: "/gg_code/find_other_list", // 机构接口
    getUprInfo: "/uprMain/getUprInfo", // 获取基本信息
    findUprRi: "/uprRi/findUprRi", // 分页
    verify: "/uprMain/verify", // 审核
    exportUprRiExcel: "/uprRi/exportUprRiExcel", // 导出清单
    uprprintPDF: "/PDF/printPDF", // 打印"
  });
  return Vue.gvUtil.Page({
    template: require("./baseInfo.html"),
    name: "baseInfoApp",
    query: function () {
      return {};
    },
    datas: function () {
      return {
        searchaBu: false, //打印按钮
        pass: false, //只读页面
        //1. 基础信息
        baseInfo: {
          batchNo: "", // 批量任务号
          branch: "CLI", // 机构
          reverseBatchNo: "", // 冲销的批次号
          acDate: "", // 挂账日期
          calculateDate: "", //   计算截止日期
          createdBy: "", // 创建人
          approvedBy: "", // 审核人
          createdDate: "", // 创建日期
          approvedDate: "", // 审核日期
          status: "", // 状态
          localCurrency: "HKD", // 本币别 usd
          converCurrency: "USD", // 换算币别 usd
          baseInfoRule: {
            // 基础信息校验
            acDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
        },
        id: "", // id
        converCurrency: "", // 换算币别
        batchNo: "", // 批量任务号
        tableData1: [], // 显示的数组
        pageSize1: 2, // 分入每页数量
        pageSize2: 2, //分出每页数量
        pageNo1: 0, //当前页数
        pageaA: 0, //总页数
        total1: 0, // 总条数
        tableData2: [], // 显示的数组
        pageNo2: 0, //当前页数
        pageaB: 0, //总页数
        total2: 0, // 总条数
        dialogFormVisible: false, //新增IBNR弹框
        //1. 基础信息
        recognizeeTableList: [],
        // 弹框
        form: {},
        currentPage2: 0,
        // 审核
        auditInfo: {
          opinions: "",
        },
        rules: {
          opinions: [
            {
              required: true,
              message: "不能为空",
              trigger: "blur",
            },
          ],
        },
        status: "", // 状态 新增 审核
      };
    },
    created() {
      this.getCurrentMonthLast();
    },
    methods: {
      initPage: function () {
        //初始化
        Vue.gvUtil.initTranslation("RiskType");
      },
      // 导出清单1
      exportOutlist1() {
        let url = Vue.gvUtil.getUrl({
          apiName: "exportUprRiExcel",
          contextName: "selfins",
        });
        let params = {
          batchNo: this.batchNo,
          inwardInd: "01",
          converCurrency: this.converCurrency,
        };
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            const data = res;
            const url = window.URL.createObjectURL(
              new Blob([data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
              })
            );
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "download.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      },
      // 导出清单2
      exportOutlist2() {
        let url = Vue.gvUtil.getUrl({
          apiName: "exportUprRiExcel",
          contextName: "selfins",
        });
        let params = {
          batchNo: this.batchNo,
          inwardInd: "02",
          converCurrency: this.converCurrency,
        };
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            const data = res;
            const url = window.URL.createObjectURL(
              new Blob([data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
              })
            );
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "download.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      },
      // 分入分页查询
      queryTable1() {
        let that = this;
        let params = {
          _pageSize: this.pageSize1,
          _pageNo: this.pageNo1 - 1,
          batchNo: this.baseInfo.batchNo,
          inwardInd: "01",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findUprRi",
          contextName: "selfins",
        });
        url =
          url +
          "?&_pageSize=" +
          this.pageSize1 +
          "&_pageNo=" +
          (this.pageNo1 - 1);
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            for (let item of res.resData.businessList.content) {
              item.effectiveDate = item.effectiveDate + "   " + item.expiryDate;
              item.maintenancePeriodStart = item.maintenancePeriodStart + "   " + item.maintenancePeriodEnd;
            }

            that.tableData1 = res.resData.businessList.content;
            that.pageaA = res.resData.businessList.totalPages;
            that.total1 = res.resData.businessList.total;
          } else {
          }
        });
      },
      // 分出分页查询
      queryTable2() {
        let that = this;
        let params = {
          _pageSize: this.pageSize2,
          _pageNo: this.pageNo2 - 1,
          batchNo: this.baseInfo.batchNo,
          inwardInd: "02",
        };
        let url = Vue.gvUtil.getUrl({
          apiName: "findUprRi",
          contextName: "selfins",
        });
        url =
          url +
          "?&_pageSize=" +
          this.pageSize2 +
          "&_pageNo=" +
          (this.pageNo2 - 1);
        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            for (let item of res.resData.businessList.content) {
              item.effectiveDate = item.effectiveDate + "   " + item.expiryDate;
              item.maintenancePeriodStart = item.maintenancePeriodStart + "   " + item.maintenancePeriodEnd;
            }

            that.tableData2 = res.resData.businessList.content;
            that.pageaB = res.resData.businessList.totalPages;
            that.total2 = res.resData.businessList.total;
          } else {
          }
        });
      },
      handleCurrentChangePages1(val) {
        this.pageaA = val;
        this.queryTable1();
      },
      handleCurrentChangePages2(val) {
        this.pageaB = val;
        this.queryTable2();
      },
      handleSizeChanges1(val) {
        this.pageSize1 = val;
        this.queryTable1();
      },
      handleSizeChanges2(val) {
        this.pageSize2 = val;
        this.queryTable2();
      },

      changeschemeName2() {},
      getData: function () {
        return this.auditInfo.opinions;
      },
      getPolicyFeeInfo(word) {
        this.status = word;
      },
      getPolicyFeeInfo2(id, converCurrency, batchNo, word) {
        this.status = word;
        this.id = id;
        this.converCurrency = converCurrency;
        this.batchNo = batchNo;
        this.getUprInfo(id);
      },
      // 获取基础信息
      getUprInfo(id) {
        let that = this;
        let url = Vue.gvUtil.getUrl({
          apiName: "getUprInfo",
          contextName: "selfins",
        });
        let params = {
          id: id,
        };

        Vue.gvUtil.http.post(url, params).then((res) => {
          if (res.resCode == "0000") {
            let baseInfoRule = {
              // 基础信息校验
              acDate: [
                {
                  required: true,
                  message: Vue.filter("translate")("cantEmpty"),
                  trigger: "blur",
                },
              ],
            };
            that.baseInfo = res.resData.getUprInfo;
            that.baseInfo.baseInfoRule = baseInfoRule;
            // 文档资料
            this.$emit("fromChild", res.resData.getUprInfo.ggDocumentList);

            that.queryTable1();
            that.queryTable2();
          } else {
          }
        });
      },
      // 所有校验是否通过 保存
      validatebase() {
        let that = this;
        let postV = true;
        let valid = false;
        that.$refs.baseInfo.validate((valid) => {
          if (valid) {
            postV = true;
            that.$emit("vaild-event", postV);
          } else {
            postV = false;
            that.$emit("vaild-event", postV);
            that.$message({
              showClose: true,
              message: "请完善信息",
              type: "warning",
            });
          }
        });
      },
      goAudit(code) {
        let that = this;
        let status = code; //  01 审核通过 06 审核不通过
        let id = that.id;
        let remark = that.auditInfo.opinions;
        that.$refs.auditInfo.validate((valid) => {
          if (valid) {
            let url = Vue.gvUtil.getUrl({
              apiName: "verify",
              contextName: "selfins",
            });
            let params = {
              status: status,
              id: id,
              remark: remark,
            };
            Vue.gvUtil.http.post(url, params).then((res) => {
              that.$message({
                showClose: true,
                message: "提交成功",
                // type: 'warning'
              });
              // resMsg
              // 跳转保批单查询页面
              // this.$router.push({
              //   name: "inquiryApp",

              // });
            });
          }
        });
      },
      getValidate: function () {
        this.$refs["auditInfo"].validate(function (valid, obj) {
          result = valid;
        });
        return result;
      },
      getCurrentMonthLast() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = new Date(year, month, 0);
        this.baseInfo.calculateDate = day.getDate() + "-" + month + "-" + year;
      },
      path() {},
    },
    computed: {},
    events: {
      //打印
      getPrintUpr(Inorout) {
        var url = Vue.gvUtil.getUrl({
          apiName: "uprprintPDF",
          contextName: "selfins",
        });

        let obj = {
          id: this.baseInfo.id,
          batchNo: this.baseInfo.batchNo,
          inwardInd: Inorout,
          templateName: "",
          isEmail: false,
        };
        //分出详情
        if (Inorout == "02") {
          obj.templateName = "CededUPR";
        } else {
          //分入详情
          obj.templateName = "GrossUPR";
        }
        Vue.gvUtil.http
          .post(url, obj, {
            responseType: "blob",
          })
          .then((res) => {
            var inoroutData = "";
            if (Inorout == "02") {
              inoroutData = "UPR分出详情.pdf";
            } else {
              inoroutData = "UPR分入详情.pdf";
            }
            Vue.gvUtil.resolveBlob(res, inoroutData);
          });
      },
    },
  });
});
