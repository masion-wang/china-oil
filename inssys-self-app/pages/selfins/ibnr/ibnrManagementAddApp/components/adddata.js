/**
 *  保单基本信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      exportIbnrExcel: "/ibnrMain/exportIbnrExcel", //导出
    },
  };
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require("./adddata.html"),
    name: "adddataApp",
    query: function () {
      return {};
    },
    datas: function () {
      return {
        btnModeifyChange: "", //全局下标
        batchNoid: "", //查询存值，导出用
        pass: false, //审核页面
        dialogFormVisible: false, //新增IBNR弹框
        dialogTitle: true, //弹框title
        //1. 基础信息
        recognizeeTableList: [],
        // 弹框
        form: {
          riInward: "",
          businessType: "",
          iaClassCode: "",
          iaClassName: "",
          yearOfAccident: "",
          acDate: "",
          currency: "HKD",
          amount: "",
          status: "",
          branch: "CIL",
          transaction: "IBNR",
          riskCode: "",
          riskName: "",
          Stream: "",
          reverseInd: "",
        },
        formrules: {
          acDate: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          branch: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          transaction: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          yearOfAccident: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          businessType: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
          currency: [
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
          riInward: [
            {
              required: true,
              message: Vue.filter("translate")("cantEmpty"),
              trigger: "change",
            },
          ],
        },
      };
    },
    created() {},
    computed: {},
    events: {
      initpage() {
        Vue.gvUtil.initTranslation("StreamType,CIRCRisk,RiskType");
      },
    },
    methods: {
      //新增按钮
      adddata() {
        if (this.recognizeeTableList.length > 0) {
          let recognizeeTableData = JSON.parse(
            JSON.stringify(
              this.recognizeeTableList[this.recognizeeTableList.length - 1]
            )
          );
          this.form.acDate = recognizeeTableData.acDate;
          this.form.yearOfAccident = recognizeeTableData.yearOfAccident;
          this.form.businessType = recognizeeTableData.businessType;
          this.form.riInward = recognizeeTableData.riInward;
          this.form.currency = "HKD";
          this.form.amount = "";
          this.form.Stream = "";
          this.form.iaClassCode = "";
          this.form.riskCode = "";
          this.form.transaction = "IBNR";
          this.form.branch = "CIL";
        }
        this.dialogFormVisible = true;
      },
      //新增保存
      baocun() {
        this.$refs.formName.validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            let copyfrom = JSON.parse(JSON.stringify(this.form));
            copyfrom.reverseInd = "0";
            this.recognizeeTableList.push(copyfrom);
            this.$nextTick(function () {
              this.$refs.formName.clearValidate();
            });
            this.dialogTitle = true;
          } else {
            return false;
          }
        });
      },
      //删除
      remove(scopeindex) {
        this.recognizeeTableList.splice(scopeindex, 1);
      },
      //修改
      btnModeify(scoperow, index) {
        this.btnModeifyChange = index;
        this.dialogTitle = false;
        let data = JSON.parse(JSON.stringify(scoperow));
        this.form = data;
        this.dialogFormVisible = true;
      },
      // 修改保存按钮
      change() {
        this.$refs.formName.validate((valid) => {
          if (valid) {
            this.dialogTitle = true;
            let saveformdata = JSON.parse(JSON.stringify(this.form));
            this.$set(
              this.recognizeeTableList,
              this.btnModeifyChange,
              saveformdata
            );
            this.$nextTick(function () {
              this.$refs.formName.clearValidate();
            });
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      },
      //关闭前回调
      handleClose() {
        this.$nextTick(function () {
          this.$refs.formName.resetFields();
        });
        this.dialogFormVisible = false;
        this.dialogTitle = true;
      },
      //导出按钮
      downLoad() {
        var url = Vue.gvUtil.getUrl({
          apiName: "exportIbnrExcel",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(
            url,
            {
              batchNo: this.batchNoid,
              reverseInd: "0",
            },
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            Vue.gvUtil.resolveBlob(res, "IBNR.xlsx");
          });
      },
    },
    watch: {
      //监听列表拿到最大值
      recognizeeTableList: function (newVal, oldVal) {
        if (newVal.length != 0) {
          let c = newVal.map((item) => {
            let itemseif = item.acDate.split("-");
            uniteem = itemseif[2] + "-" + itemseif[1] + "-" + itemseif[0];
            return new Date(uniteem).getTime();
          });
          var max = Math.max.apply(null, c);
        } else {
          var max = "";
        }

        this.$emit("maxacDate", max);
      },
    },
  });
});
