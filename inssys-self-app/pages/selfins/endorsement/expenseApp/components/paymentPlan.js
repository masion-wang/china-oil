/**
 *  保险缴费计划组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      findSupplierfindList: "/ggCode/findSupplier", //收付款人码表
      findfeetypecode: "/guFeetype/findfeetypecode", //费用类型下拉
      findpolicyfee: "/guPolicyFee/findpolicyfee	", //查询费用详情信息（post）
      getInstallfee: "/guPolicyFee/getPolicyInstall", //点击分期带出保单信息
      ffindSupliuerByType: "/guPolicyFee/findSupliuerByType", //点击费用类型带出收付款人
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./paymentPlan.html"),
    name: "paymentPlanApp",
    params: function () {
      return {};
    },
    props: {
      vo: null,
      pageId: null,
      isReadonly: {
        type: Boolean,
        default: false,
      },
      isJointStock: {
        type: Boolean,
        default: true,
      },
      policyFa: String,
    },
    datas: function () {
      return {
        rufee: [], //分入供应商代码
        chufee: [], //分出供应商代码
        yuancedingCompany: "", //原保险人
        paytaskObj: {}, //工作流储存
        scoperowDetail: null, //点击分期时存储当前行数据，分期保存时传给后台
        chooseadd: 0, //判断是否有增加过费用
        policyFeeMaxNo: 1, //页面费用序号，新增时+1
        feeType: "", //进页面时保存第一条费用的费用状态
        fenqiview: true, //分期审核通过没
        viewcheack: false, //只读显示
        insideview: false, //分期审核通过没
        view: false, //保单查看页面
        amountmon: "", //费用金额
        addfeeType: "",
        ggSupplierMsg: [], //收付款人码表存储
        feetypecode: [], //费用类型下拉
        addarrlist: [], //新增传给后台的值
        deletearr: [], //大保存时删除存的值
        feiqdele: [], //分期页面时删除存的值
        fenqiadda: [], //分期页面新增存的值
        fenqisaverow: [], //分期保存存数据
        changebiglist: [], //改变值的时候的值
        Endorsement: false, //批单录入控制字段只读
        dorsement: true, //批单录入控制字段显示隐藏
        Opinionsdata: [{}], //审核意见字段
        Approve: true, //判断是否为费用审核页面是否可读
        InstallmentTableVisible: false, //分期弹框
        tableData: [{}],
        paymentInfo: {
          period: "", //期数
        },
        fromData: {
          //费用校验
          paymentListRules: {
            feeType: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            payee: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            amount: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            payeeRef: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
          paymentList: [
            {
              feeSeqNo: "",
              feeType: "",
              feeTypeName: "",
              payeeCode: "",
              payee: "",
              payeeRef: "",
              currency: "",
              amount: "",
              remark: "",
              status: "",
              createdBy: "",
              createdOn: "",
              amendedBy: "",
              amendedOn: "",
              approvedBy: "",
              approvedOn: "",
            },
          ],
        },
        feiData: {
          feiDataRules: {
            dueDate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "change",
              },
            ],
            installmentRate: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
            premium: [
              {
                required: true,
                message: Vue.filter("translate")("cantEmpty"),
                trigger: "blur",
              },
            ],
          },
          feelistdata: [{ dueDate: "", installmentRate: "", premium: "" }], //费用分期绑值
        },
        rules: {
          period: [
            {
              required: true,
              message: Vue.filter("translate")("paymentWayDontEmpty"),
              trigger: "blur",
            },
          ],
        },
      };
    },
    events: {
      //改变费用类型调不同接口
      chengefeeTypestatus(scopeRow) {
        let obj = scopeRow.feeType.split("-");
        // 分出01
        if (obj[1] == "I") {
          this.fenruchucodefee("0", "0", "1", scopeRow);
        } else if (obj[1] == "O") {
          // 分入02
          this.fenruchucodefee("0", "1", "1", scopeRow);
        }
        //
        var url = Vue.gvUtil.getUrl({
          apiName: "ffindSupliuerByType",
          contextName: "selfins",
        });
        var feepolicyMainId;
        if (this.$route.query.flag == "expense") {
          //查询页面进来的
          feepolicyMainId = this.$route.query.row.policyMainId;
        } else if (this.$route.query.pageType == "amend") {
          //工作流进来的
          feepolicyMainId = this.paytaskObj.guPolicyFeeVo.policyMainId;
        }
        Vue.gvUtil.http
          .post(url, {
            feeType: scopeRow.feeType,
            policyMainId: feepolicyMainId,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              scopeRow.payee = res.resData;
            }
          });
      },
      //分入分出不同码表的接口
      fenruchucodefee(catalog, cedInd, valid, scopeRow) {
        var url = Vue.gvUtil.getUrl({
          apiName: "findSupplierfindList",
          contextName: "selfins",
        });
        let obj = {
          catalog: catalog,
          cedInd: cedInd,
          valid: valid,
        };
        Vue.gvUtil.http.post(url, obj).then((res) => {
          if (res.resCode === "0000") {
            this.chufee = res.resData;
          }
        });
      },
      initPage() {
        Vue.gvUtil.initTranslation("Currency,ExpenseStatus");
      },
      must: function (obj) {
        if (
          obj.columnIndex == 1 ||
          obj.columnIndex == 2 ||
          obj.columnIndex == 4
        ) {
          return "must";
        }
      },
      must1: function (obj) {
        if (
          obj.columnIndex == 1 ||
          obj.columnIndex == 2 ||
          obj.columnIndex == 3
        ) {
          return "must";
        }
      },
      //删除
      removePayment(row, index, self) {
        let obj = {};
        if (self == "paymentList" && row.privodarr == undefined) {
          //删除的后端返回的数据
          // 1.先储存在this.deletearr,后前端删除。
          // 2.在保存的时候将删除的id传于后端
          (obj.policyFeeId = row.policyFeeId), this.deletearr.push(obj);
          this.fromData.paymentList.splice(index, 1);
          let totel = 0;
          this.fromData.paymentList.forEach((f) => {
            if (f == this.fromData.paymentList[0]) {
              f.feeSeqNo = this.policyFeeMaxNo;
            } else {
              totel++;
              f.feeSeqNo = this.fromData.paymentList[0].feeSeqNo + totel;
            }
          });
        } else if (self == "paymentList" && row.privodarr != undefined) {
          //删除前端自增的数据
          //前端直接删除
          this.fromData.paymentList.splice(index, 1);
          let paymentListtotel = 0;
          this.fromData.paymentList.forEach((f) => {
            if (f == this.fromData.paymentList[0]) {
              f.feeSeqNo = this.policyFeeMaxNo;
            } else {
              paymentListtotel++;
              f.feeSeqNo =
                this.fromData.paymentList[0].feeSeqNo + paymentListtotel;
            }
          });
        } else if (self == "activeNames") {
          (obj.installmentMainId = row.installmentMainId),
            (obj.detailId = row.detailId),
            this.feiqdele.push(obj);
          this.feiData.feelistdata.splice(index, 1);
          //如果页面上只有一条数据，那么金额为当前数据金额，比例为100
          if (this.feiData.feelistdata.length == 1) {
            this.feiData.feelistdata[0].installmentRate = 100;
            this.feiData.feelistdata[0].premium = this.fromData.paymentList[
              this.scoperowDetail
            ].amount;
          }
        }
      },
      //增加2
      addPayment: function (val) {
        //获取时间下个月20号
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 2;
        let day = 20;
        if (month >= 1 && month <= 9) month = "0" + month; //补零
        let endTime = `${day}-${month}-${year}`;
        var _this = this;
        if (val == "paymentList") {
          var addfeelist = this.policyFeeMaxNo;
          this.fenruchucodefee("0", "1", "1");
          if (_this.$route.query.flag == "expense") {
            _this.fromData.paymentList.push({
              chufee: this.chufee,
              feeSeqNo: addfeelist + _this.fromData.paymentList.length,
              cedInd: "03",
              feeType: "",
              payee: this.yuancedingCompany,
              payeeCode: "",
              payeeRef: "",
              currency: _this.$route.query.row.currency,
              amount: "",
              remark: "",
              status: "",
              createdBy: "",
              createdOn: "",
              amendedBy: "",
              amendedOn: "",
              approvedBy: "",
              policyMainId: _this.$route.query.row.policyMainId,
              policyNo: _this.$route.query.row.policyNo,
              approvedOn: "", //审核日期
              guInstallmentDetailVoList: [], //分期list
            });
          } else if (_this.$route.query.pageType == "amend") {
            _this.fromData.paymentList.push({
              chufee: this.chufee,
              cedInd: "03",
              feeSeqNo: addfeelist + _this.fromData.paymentList.length,
              feeType: "",
              payee: this.yuancedingCompany,
              payeeCode: "",
              payeeRef: "",
              currency: _this.paytaskObj.guPolicyFeeVo.currency,
              amount: "",
              remark: "",
              status: "",
              createdBy: "",
              createdOn: "",
              amendedBy: "",
              amendedOn: "",
              approvedBy: "",
              policyMainId: _this.paytaskObj.guPolicyFeeVo.policyMainId,
              policyNo: _this.paytaskObj.guPolicyFeeVo.policyNo,
              approvedOn: "", //审核日期
              guInstallmentDetailVoList: [], //分期list
            });
          }
        } else if (val == "activeNames") {
          //从费用查询页面过来
          if (_this.$route.query.flag == "expense") {
            _this.feiData.feelistdata.push({
              dueDate: endTime,
              installmentRate: "",
              currency: this.$route.query.row.currency,
              premium: "",
              addprivo: "", //判断其是否为新增
              feeType: _this.addfeeType, //row的新增
              detailId: null,
            });
            //从工作流页面过来
          } else if (this.$route.query.pageType == "amend") {
            _this.feiData.feelistdata.push({
              dueDate: endTime,
              installmentRate: "",
              currency: _this.paytaskObj.guPolicyFeeVo.currency,
              premium: "",
              addprivo: "", //判断其是否为新增
              feeType: _this.addfeeType, //row的新增
              detailId: null,
            });
          }
        }
      },
    },
    created() {
      this.ggcodefee();
    },
    methods: {
      //收付款人码表
      ggcodefee() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findSupplierfindList",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, {}).then((res) => {
          if (res.resCode === "0000") {
            this.ggSupplierMsg = res.resData;
          }
        });
      },
      // 费用类型下拉
      fyselect() {
        var url = Vue.gvUtil.getUrl({
          apiName: "findfeetypecode",
          contextName: "selfins",
        });
        Vue.gvUtil.http.post(url, { feetypeCode: "" }).then((res) => {
          if (res.resCode === "0000") {
            this.feetypecode = res.resData.guFeetypeVos;
          }
        });
      },
      //费用校验
      xiaoyan() {
        var flag = false;
        this.$refs.from.validate((valid) => {
          if (valid) {
            if (this.fromData.paymentList.length == 0) {
              flag = false;
              return flag;
            } else {
              this.fromData.paymentList.forEach((v) => {
                if (v.guInstallmentDetailVoList.length == 0) {
                  flag = false;
                  return flag;
                } else {
                  flag = true;
                }
              });
            }
          } else {
            flag = false;
          }
        });
        return flag;
      },
      //提交校验
      ViewStatus() {
        //如果提交的数据全是审核通过或审核中的那么提示无可提交数据
        var flag = false;
        this.fromData.paymentList.forEach((v) => {
          if (v.status != "01" || v.status != "09") {
            flag = true;
            return flag;
          } else {
            flag = false;
          }
        });
        return flag;
      },
      //收付款人校验
      ishavepayee() {
        var flag = false;
        let payeeNull = this.fromData.paymentList;
        var pattern = new RegExp("[\u4E00-\u9FA5]+");
        payeeNull.forEach((v) => {
          if (pattern.test(v.payee)) {
            flag = false;
            return flag;
          } else {
            flag = true;
          }
        });
        return flag;
      },
      // 清空校验
      qkfeiData() {
        this.$nextTick(function () {
          this.$refs.feifrom.clearValidate();
          this.InstallmentTableVisible = false;
        });
      },
      //大保存change事件
      changething(thing) {
        if (thing.isupdate != null || thing.isupdate != undefined) {
          thing.isupdate = true;
        }
      },
      //改变金额
      changemoney(scope) {
        scope.guInstallmentDetailVoList.forEach((v) => {
          v.premium = (scope.amount * v.installmentRate) / 100;
        });
      },
      // 分期change事件
      aa(thing) {
        if (thing.isperiod != null || thing.isperiod != undefined) {
          thing.isperiod = true;
        }
      },
      //分期保存校验
      fqsave(sss) {
        let that = this;
        this.$refs[sss].validate((valid) => {
          if (valid) {
            //如果分期为空保存直接调保存接口
            if (this.feiData.feelistdata.length == 0) {
              that.InstallmentTableVisible = false;
            } else {
              //分期内有保存数据校验
              // 总金额
              let total = 0;
              // 总比例
              let proportion = 0;
              // 时期是否范围内
              let isRange = false;
              // 比例和费用是否对上
              let isRightPercentAndFee = false;

              this.feiData.feelistdata.forEach((ff) => {
                total += Number(ff.premium); //计算总费用
                proportion += Number(ff.installmentRate); //计算总比例
              });
              // 判断当前分期信息与费用信息金额不一致或分期比例非100
              if (this.amountmon != total && proportion != 100) {
                Vue.gvUtil
                  .alert({
                    msg: Vue.filter("translate")(
                      "zbaqhshujisnotonehundredpercent"
                    ),
                  })
                  .then(function () {
                    console.log("点击关闭");
                  });
                isRightPercentAndFee = false;
                return;
              } else {
                isRightPercentAndFee = true;
              }
              // 判断是否调用保存接口
              // 遍历费用分期数组 判断截止日期是否在范围内
              this.feiData.feelistdata.forEach((val) => {
                // 香港日期 日月年 转化成 年月日
                // 1 变成数组
                //如果是查询页面进来的
                if (this.$route.query.flag == "expense") {
                  //传过来为日月年时分秒截取成日月年
                  var effectivenewDate = /\d{1,2}-\d{1,2}-\d{4}/g.exec(
                    this.$route.query.row.effectiveDate
                  );
                  var expiryDatenewDate = /\d{1,2}-\d{1,2}-\d{4}/g.exec(
                    this.$route.query.row.expiryDate
                  );
                  var chinseDateEffectiveDateArr = effectivenewDate[0].split(
                    "-"
                  );
                  var chinseDateExpiryDateArr = expiryDatenewDate[0].split("-");
                  //工作流进来的修改
                } else if (this.$route.query.pageType == "amend") {
                  var chinseDateEffectiveDateArr = this.paytaskObj.guPolicyFeeVo.effectiveDate.split(
                    "-"
                  );
                  var chinseDateExpiryDateArr = this.paytaskObj.guPolicyFeeVo.expiryDate.split(
                    "-"
                  );
                }

                let chinseValDueDateArr = val.dueDate.split("-");
                // 2 变成大陆格式
                // 开始
                let chinseDateEffectiveDate =
                  chinseDateEffectiveDateArr[2] +
                  "-" +
                  chinseDateEffectiveDateArr[1] +
                  "-" +
                  chinseDateEffectiveDateArr[0];
                //结束
                let dateExpiryDate =
                  chinseDateExpiryDateArr[2] +
                  "-" +
                  chinseDateExpiryDateArr[1] +
                  "-" +
                  chinseDateExpiryDateArr[0];
                //截止
                let valDueDate =
                  chinseValDueDateArr[2] +
                  "-" +
                  chinseValDueDateArr[1] +
                  "-" +
                  chinseValDueDateArr[0];

                var chinseDateEffectiveDate1 = new Date(
                  chinseDateEffectiveDate
                );
                var dateExpiryDate1 = new Date(dateExpiryDate);
                var valDueDate1 = new Date(valDueDate);
                // 有三种方式获取
                var time1 = chinseDateEffectiveDate1.getTime();
                var time2 = dateExpiryDate1.getTime();
                var time3 = valDueDate1.getTime();
                if (time1 <= time3 && time3 <= time2) {
                  isRange = true;
                } else {
                  if (this.$route.query.flag == "expense") {
                    Vue.gvUtil
                      .confirm({
                        msg:
                          "缴费截止日期不在保险期限" +
                          this.$route.query.row.effectiveDate +
                          "范围内，是否要继续提交?",
                      })
                      .then(
                        function () {
                          isRange = true;
                          that.fromData.paymentList[
                            that.scoperowDetail
                          ].guInstallmentDetailVoList =
                            that.feiData.feelistdata;
                          that.InstallmentTableVisible = false;
                        },
                        function () {
                          isRange = false;
                          return;
                        }
                      );
                  } else if (this.$route.query.pageType == "amend") {
                    Vue.gvUtil
                      .confirm({
                        msg:
                          "缴费截止日期不在保险期限" +
                          this.paytaskObj.guPolicyFeeVo.effectiveDate +
                          "范围内，是否要继续提交?",
                      })
                      .then(
                        function () {
                          isRange = true;
                          that.fromData.paymentList[
                            that.scoperowDetail
                          ].guInstallmentDetailVoList =
                            that.feiData.feelistdata;
                          that.InstallmentTableVisible = false;
                        },
                        function () {
                          isRange = false;
                          return;
                        }
                      );
                  }
                }
              });
              if (isRange && isRightPercentAndFee) {
                that.fromData.paymentList[
                  that.scoperowDetail
                ].guInstallmentDetailVoList = that.feiData.feelistdata;
                that.InstallmentTableVisible = false;
              }
            }
          } else {
            return false;
          }
        });
      },
      //分期按钮
      goDetail(row, index) {
        if (row.amount && row) {
          if (row.guInstallmentDetailVoList.length > 0) {
            this.feiData.feelistdata = row.guInstallmentDetailVoList;
          } else {
            var url = Vue.gvUtil.getUrl({
              apiName: "getInstallfee",
              contextName: "selfins",
            });
            // ZBPLCARU2021010010  this.policyFa
            Vue.gvUtil.http
              .post(url, {
                policyMainId: this.policyFa,
                amount: row.amount,
                feeType: row.feeType,
              })
              .then((res) => {
                if (res.resCode === "0000") {
                  this.feiData.feelistdata = res.resData;
                }
              });
          }
          this.scoperowDetail = index;
          //如果当前行数据为审核通过或者待审核不可修改
          if (row.status == "01" || row.status == "09") {
            this.fenqiview = false;
            this.insideview = true;
          } else {
            this.fenqiview = true;
            this.insideview = false;
          }
          this.InstallmentTableVisible = true;
        } else {
          //请完善当前行信息
          Vue.gvUtil.message(
            Vue.filter("translate")("zbPleasecompletethecurrentlineinformation")
          );
        }
      },
      getData: function () {
        let arr = [];
        for (let j in this.fromData.paymentList) {
          arr.push(...this.fromData.paymentList[j].paymentDetailList);
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].payType = this.paymentInfo.period;
        }
        return arr;
      },
      getValidate: function () {
        var result = false;
        let _this = this;
        this.$refs["paymentInfo"].validate(function (valid, obj) {
          if (!valid) {
            for (i in obj) {
              _this.$refs[i].focus();
            }
          }
          result = valid;
        });
        return result;
      },
    },
    computed: {
      userInfo() {
        //user登录用户
        return this.$store.state.userInfo;
      },
    },
    watch: {
      $route: {
        handler: function (val) {
          this.paymentInfo.period = 1;
        },
        deep: true,
      },
      vo: {
        handler(val) {
          this.fromData.paymentList = val || [];
          if (
            !this.fromData.paymentList.every(
              (item) =>
                item.paymentDetailList && item.paymentDetailList.length > 0
            )
          ) {
            this.initPeriodList();
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
      isJointStock: {
        handler(val) {
          this.isJointStock = val;
        },
        deep: true,
      },
    },
  });
});
