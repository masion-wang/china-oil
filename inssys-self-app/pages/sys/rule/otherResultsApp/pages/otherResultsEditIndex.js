/**
 * 其他结果集管理编辑页面
 * @author HuangTianQi
 * @time 2017/11/24
 */
define(function (require) {
    var temp = require('./otherResultsEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'otherResultsAppOtherResultsEdit',
        query: function () {
            return {
                type: 'add'
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                type: 'add'
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                otherResultsForm: {
                    rule: '', // 规则
                    status: ''// 状态
                },
                otherResultsFactorVo: { // 条件因子显示数据
                    riskCode: '', // 基础产品
                    benefitCode: '', // 计算项目
                    coverType: '' // 保障类型
                },
                otherResultsFactorTableVo: { // 结果集显示数据
                    baseAP: '',
                    baseSI: '',
                    apincBase: '',
                    siinc: '',
                    apinc: '',
                    minAP: '',
                    maxAP: ''
                }
            }
        },
        events: {

            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 确认按钮（表单提交）
            onSubmit: function () {
                // 获取表单引擎-数据
                // this.$refs.otherResultsFactor.getFormData()
                // this.$refs.otherResultsFactorTable.getFormData()
                var _this = this,
                    url;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                }).then(function () {
                    if (_this.query.type === 'add') {
                        // 新增
                        url = Vue.gvUtil.getUrl({
                            apiName: 'otherResultsAdd',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, _this.otherResultsForm).then(function (res) {
                            _this.successSubmit(res);
                        });
                    } else {
                        // 更新
                        url = Vue.gvUtil.getUrl({
                            apiName: 'otherResultsUpdate',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, _this.otherResultsForm).then(function (res) {
                            _this.successSubmit(res);
                        });
                    }
                });
            }

        },
        methods: {
            // 初始化页面
            initPage: function () {
                console.log(this.query.type);
                this.type = this.query.type;
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 回显
            requestData: function () {
                // var _this = this,
                //     url = Vue.gvUtil.getUrl({
                //         apiName: 'otherResultsFindByPK',
                //         urlParams: { rule_Lib_factor_name: this.$route.query.ruleLibFactorName }
                //     });
                // Vue.gvUtil.http.get(url).then(function(res) {
                //     if (res.resCode === '0000') {
                //         $.extend(true, _this.form, res.resData)
                //     }
                // });
            },
            // 初始化校验
            initRules: function () {
                // this.$refs.otherResultsFactor.getForm().validate(function(valid){

                // });
                // this.$refs.otherResultsFactorTable.getForm().validate(function(valid){

                // });
                this.rules = {
                    rule: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    riskCode: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    breakDownCode: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    status: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }]
                };
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    });
                }
            }
        }
    });
});
