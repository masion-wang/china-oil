/**
 * 规则维护编辑页面
 * @author HuangTianQi
 * @time 2017/12/11
 */
define(function (require) {
    var temp = require('./ruleEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'ruleAppRuleEdit',
        query: function () {
            return {
                type: 'add',
                id: ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false // 输入域是否可编辑
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    code: '',
                    validDateColumn: '', // 生效日期
                    codeDesc: '',
                    formEngineFactorCode: '',
                    formEngineResultCode: '',
                    validInd: '',
                    ggRuleFactorVos: [{
                        baseFactorId: '',
                        factorDesc: '',
                        factorOrder: ''
                    }],
                    ggRuleAssembleVos: [{
                        ruleAssembleId: '',
                        codeDesc: '',
                        ruleOrder: ''
                    }]
                },
                ruleList: [],  // 规则列表
                ruleBaseFactorList: [], // 规则因子列表
                formEngine: false // 结果集是否维护在表单引擎中
            }
        },
        events: {
            // 增加规则因子行
            onAddRangeList: function () {
                var index = this.form.ggRuleFactorVos.length - 1;
                this.form.ggRuleFactorVos.push({
                    baseFactorId: '',
                    factorDesc: '',
                    factorOrder: ''
                })

                // 添加校验
                this.rules['ggRuleFactorVos.'+ index +'.baseFactorId'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
                this.rules['ggRuleFactorVos.'+ index +'.factorOrder'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
            },
            // 增加规则装配行
            onAddEnumList: function () {
                var index = this.form.ggRuleAssembleVos.length - 1;
                this.form.ggRuleAssembleVos.push({
                    ruleAssembleId: '',
                    codeDesc: '',
                    ruleOrder: ''
                })

                // 添加校验
                this.rules['ggRuleAssembleVos.'+ index +'.ruleAssembleId'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
                this.rules['ggRuleAssembleVos.'+ index +'.ruleOrder'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
            },
            // 删除行
            onDeletes: function (index, data) {
                if (data.length > 0) {
                    data.splice(index, 1);
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 确认按钮（表单提交）
            onSubmit: function () {
                if (this.form.validInd === '1') {
                    this.form.validInd = true;
                } else if (this.form.validInd === '0') {
                    this.form.validInd = false;
                }
                var _this = this,
                    url;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                }).then(function () {
                    var params = _this.form;
                    if (_this.query.type === 'add') {
                        // 新增
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ruleAddOrUpdate',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, params).then(function (res) {
                            _this.successSubmit(res);
                        });
                    } else {
                        // 更新
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ruleAddOrUpdate',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, params).then(function (res) {
                            _this.successSubmit(res);
                        });
                    }
                });
            },
            // 当规则代码变化时 显示其对应描述
            codeChange: function (index) {
                var id = this.form.ggRuleAssembleVos[index].ruleAssembleId;
                for (var i = 0, len = this.ruleList.length; i < len; i++) {
                    if (this.ruleList[i].id === id) {
                        this.form.ggRuleAssembleVos[index].codeDesc = this.ruleList[i].codeDesc;
                    }
                }
            },
            // 当因子代码值变化时 显示其对应描述
            factorCodeChange: function (index) {
                var id = this.form.ggRuleFactorVos[index].baseFactorId;
                for (var i = 0, len = this.ruleBaseFactorList.length; i < len; i++) {
                    if (this.ruleBaseFactorList[i].id === id) {
                        this.form.ggRuleFactorVos[index].factorDesc = this.ruleBaseFactorList[i].factorDesc;
                    }
                }
            }
        },
        methods: {
            // 初始化页面
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                } else if (this.query.type === 'add' || this.query.type === 'edit') {
                    this.requestRuleData();
                    this.requestRuleFactorData();
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 回显
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ruleFactorAssemble',
                        contextName: 'auth',
                        urlParams: {id: this.query.id}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form = res.resData.ggRuleVo;
                        _this.formatStatus();
                    }
                });
            },
            // 获取规则列表
            requestRuleData: function () {
                var params = {validInd: true},
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ruleFindList',
                        contextName: 'auth'
                    }),
                    _this = this;
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.ruleList = res.resData.ruleList;
                    }
                });
            },
            // 获取规则因子列表
            requestRuleFactorData: function () {
                var params = {validInd: true},
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ruleBaseFactorFindList',
                        contextName: 'auth'
                    }),
                    _this = this;
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.ruleBaseFactorList = res.resData.ruleBaseFactorList;
                    }
                });
            },
            // 初始化校验
            initRules: function () {
                this.rules = {
                    code: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    codeDesc: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    formEngineFactorCode: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    formEngineResultCode: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    validInd: [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ggRuleFactorVos.0.baseFactorId': [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ggRuleAssembleVos.0.ruleAssembleId': [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ggRuleFactorVos.0.factorOrder': [{
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ggRuleAssembleVos.0.ruleOrder': [{
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
            },
            // 状态翻译
            formatStatus: function () {
                if (this.form.validInd) {
                    this.form.validInd = '1';
                } else {
                    this.form.validInd = '0';
                }
            }
        }
    });
});
