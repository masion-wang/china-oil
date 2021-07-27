/**
 * 规则因子新增/编辑页面
 * @author HuangTianQi
 * @time 2017/11/24
 */
define(function (require) {
    var temp = require('./ruleFactorEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'ruleFactorApprRuleFactorEdit',
        query: function () {
            return {
                type: 'add',
                id: ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: null,
                type: 'add'
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    factorCode: '', // 因子代码
                    factorDesc: '', // 因子描述
                    factorTable: '', // 因子对应表
                    factorColumn: '', // 因子对应字段
                    factorInd: '', // 匹配方法
                    validInd: '',  // 状态
                    codeType: '', // 因子枚举值
                    ggRuleBaseFactorTranslateVos: [],
                    ruleBaseFactorRangeMapperList: [{
                        minValue: '', // 下限值
                        maxValue: '', // 上限值
                        value: '' // 范围-映射值
                    }],
                    ruleBaseFactorEnumMapperList: [{
                        enumValue: '', // 枚举值
                        value: '' // 枚举-映射值
                    }]
                },

                enumValues: []
            }
        },
        events: {
            // 初始枚举值下拉框
            onInitEnumValues: function () {
                var reg = /\d+(,\d+)+/,
                    flag = reg.exec(this.form.codeType),
                    result = this.form.codeType.match(reg);
                console.log(flag);
                console.log(result[0]);
                this.enumValues = this.form.codeType.split(',');
            },
            // 匹配方法改变时界面变化 1-字段原值匹配 2-范围值匹配 3-枚举值匹配
            onChangeMethod: function () {
                var method = this.form.factorInd;
                // console.log(method);
                if (method === 1) { // 字段原值匹配
                    // 将范围集合-枚举集合-枚举值置为空
                    this.form.codeType = '';
                    this.enumValues = [];
                    this.form.ruleBaseFactorRangeMapperList = [{
                        minValue: '', // 下限值
                        maxValue: '', // 上限值
                        value: '' // 范围-映射值
                    }];
                    this.form.ruleBaseFactorEnumMapperList = [{
                        enumValue: '', // 枚举值
                        value: '' // 枚举-映射值
                    }]
                } else if (method === 2) { // 范围值匹配
                    // 将枚举集合-枚举值置为空
                    this.form.codeType = '';
                    this.enumValues = [];
                    this.form.ruleBaseFactorEnumMapperList = [{
                        enumValue: '', // 枚举值
                        value: '' // 枚举-映射值
                    }]
                } else if (method === 3) { // 枚举值匹配
                    // 将范围集合置为空
                    this.form.codeType = '';
                    this.enumValues = [];
                    this.form.ruleBaseFactorRangeMapperList = [{
                        minValue: '', // 下限值
                        maxValue: '', // 上限值
                        value: '' // 范围-映射值
                    }]
                }
            },
            // 增加范围映射行
            onAddRangeList: function () {
                var index = this.form.ruleBaseFactorRangeMapperList.length - 1;
                this.form.ruleBaseFactorRangeMapperList.push({
                    minValue: '',
                    maxValue: '',
                    value: ''
                })

                // 添加校验规则
                this.rules['ruleBaseFactorRangeMapperList.' + index + '.minValue'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
                this.rules['ruleBaseFactorRangeMapperList.' + index + '.maxValue'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
                this.rules['ruleBaseFactorRangeMapperList.' + index + '.value'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
            },
            // 增加枚举映射行
            onAddEnumList: function () {
                var index = this.form.ruleBaseFactorEnumMapperList.length - 1;

                this.form.ruleBaseFactorEnumMapperList.push({
                    enumValue: '',
                    value: ''
                })
                // 添加校验规则
                this.rules['ruleBaseFactorEnumMapperList.' + index + '.enumValue'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
                this.rules['ruleBaseFactorEnumMapperList.' + index + '.value'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }]
            },
            // 删除映射行
            onDeletes: function (index, data) {
                if (data.length > 0) {
                    data.splice(index, 1);
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 保存按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                }).then(function () {
                    if (_this.form.validInd === '1') {
                        _this.form.validInd = true;
                    } else if (_this.form.validInd === '0') {
                        _this.form.validInd = false;
                    }
                    // 修改传参
                    var method = _this.form.factorInd;
                    if (method === 1) { // 字段原值匹配
                        _this.form.ggRuleBaseFactorTranslateVos = null;
                    } else if (method === 2) { // 范围值匹配
                        _this.form.ggRuleBaseFactorTranslateVos = _this.form.ruleBaseFactorRangeMapperList;
                    } else if (method === 3) { // 枚举值匹配
                        _this.form.ggRuleBaseFactorTranslateVos = _this.arrayToString(_this.form.ruleBaseFactorEnumMapperList);
                    }

                    if (_this.type === 'add') {
                        // 新增
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ruleFactorSaveOrUpdate',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                            _this.successSubmit(res);
                        });
                    } else {
                        // 更新
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ruleFactorSaveOrUpdate',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                            _this.successSubmit(res);
                        });
                    }
                });
            }
        },
        methods: {
            // 初始化页面
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 回显
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'ruleFactorFindByPk',
                        contextName: 'auth',
                        urlParams: {id: _this.query.id}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(_this.form, res.resData.ggRuleBaseFactorVo, true);
                        _this.initRuleBaseFactorTranslateData();
                        _this.formatStatus();
                    }
                });
            },
            // 初始化装配列表数据
            initRuleBaseFactorTranslateData: function () {
                var _this = this,
                    len = _this.form.ggRuleBaseFactorTranslateVos.length;
                if (_this.form.factorInd === '2' && len > 0) { // 范围值匹配
                    for (var i = 0; i < len; i++) {
                        _this.form.ruleBaseFactorRangeMapperList[i].minValue = _this.form.ggRuleBaseFactorTranslateVos[i].minValue;
                        _this.form.ruleBaseFactorRangeMapperList[i].maxValue = _this.form.ggRuleBaseFactorTranslateVos[i].maxValue;
                        _this.form.ruleBaseFactorRangeMapperList[i].value = _this.form.ggRuleBaseFactorTranslateVos[i].value;
                    }
                } else if (_this.form.factorInd === '3' && len > 0) { // 枚举值匹配
                    // 初始化枚举下拉框
                    _this.enumValues = _this.form.codeType.split(',');
                    for (i = 0; i < len; i++) {
                        _this.form.ruleBaseFactorEnumMapperList[i].enumValue = _this.form.ggRuleBaseFactorTranslateVos[i].enumValue.split(',');
                        _this.form.ruleBaseFactorEnumMapperList[i].value = _this.form.ggRuleBaseFactorTranslateVos[i].value;
                    }
                }
            },
            // 初始化校验
            initRules: function () {
                this.rules = {
                    factorCode: [{ // 因子代码
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    factorDesc: [{ // 因子名称
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    factorTable: [{ // 因子对应表
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    factorColumn: [{ // 因子对应字段
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    factorInd: [{ // 匹配方法
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    codeType: [{ // 因子枚举值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ruleBaseFactorRangeMapperList.0.minValue': [{ // 下限值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ruleBaseFactorRangeMapperList.0.maxValue': [{ // 上限值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ruleBaseFactorRangeMapperList.0.value': [{ // 范围-映射值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ruleBaseFactorEnumMapperList.0.enumValue': [{ // 枚举值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    'ruleBaseFactorEnumMapperList.0.value': [{ // 枚举-映射值
                        required: true,
                        message: this.mixinObject.gValidateRequired,
                        trigger: 'blur'
                    }],
                    validInd: [{ // 状态
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
            // 将数组转为字符串
            arrayToString: function (data) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var enumValueString = data[i].enumValue.join(',');
                    data[i].enumValue = '';
                    data[i].enumValue = enumValueString;
                }
                return data;
            },
            // 状态翻译
            formatStatus: function () {
                if (this.form.validInd) {
                    this.form.validInd = '1';
                } else if (!this.form.validInd) {
                    this.form.validInd = '0';
                }
            },
            // 正则匹配
            formatNum: function (num) {
                if (!/\d+(,\d+)/.test(num)) {
                    Vue.gvUtil.message('输入错误')
                }
            }
        }
    });
});
