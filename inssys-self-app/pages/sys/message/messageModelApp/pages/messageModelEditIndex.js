/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./messageModelEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageConfigAppEdit',

        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () {
            return {
                insertkeys: [],
                content: '',
                value: '',
                form: {
                    modelCode: '',
                    dataSetType: '2',
                    modelType: '1',
                    modelName: '',
                    dataSet: ''
                },
                ggMessageModelParamList: [],
                isDialog: false // 是否对话框
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                modelCode: ''
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function () {
                for (var i = 0; i < this.ggMessageModelParamList.length; i++) {
                    var obj = this.ggMessageModelParamList[i];
                    obj.paramNo = i + 1;
                }
                this.form.ggMessageModelParamList = this.ggMessageModelParamList;
                var _this = this,
                    url;
                this.dataSetTypeChange();
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'saveMessageModel',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateMessageModel',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                if (_this.isDialog) {
                                    _this.dialogSuccessSubmit();
                                } else {
                                    _this.successSubmit(res)
                                }
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            validateModelCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateModelCode',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, value).then(function (res) {
                    if (res.resCode === '0000' && res.resData.existFlag === '1') {
                        callback();
                    } else {
                        callback(new Error(Vue.gvUtil.getInzTranslate('gValidateCode')));
                        // Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                    }
                });
            },
            // 清除表单
            resetForm: function (formName) {
                var modelCode = this.form.modelCode;
                this.$refs[formName].resetFields();
                if (type === 'edit') {
                    this.form.modelCode = modelCode;
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            },
            // 增加
            onAdd: function () {
                // 以后改成 异步查重检验
                if (this.form.modelCode === '') {
                    Vue.gvUtil.message('请先填写modelCode');
                    return;
                }
                var index = this.ggMessageModelParamList.length;
                this.$set(this.ggMessageModelParamList, index, {
                    modelCode: this.form.modelCode,
                    paramName: '',
                    paramNo: ''
                });
                // console.log(this.ggMessageModelParamList);
                //                this.ggMessageModelParamList[index].paramNo = index;
                /*                this.rules['saaFactorFields.' + index + '.fieldCode'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }];
                this.rules['saaFactorFields.' + index + '.entityCode'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }];*/
            },

            onDeletes: function (index, data) {
                data.splice(index, 1);
            },
            dataSetTypeChange: function () {
                if (this.form.dataSetType === '2') {
                    this.rules['dataSet'] = [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }];
                } else {
                    if (this.rules['dataSet']) {
                        this.rules['dataSet'].splice(0, 1);
                    }
                }
            },
            addInsertkeys: function () {
                this.insertkeys = [];
                var str = this.form.dataSet,

                    // var test = "select t.data as 数据 ,s.content as 内容" +
                    //             "from reporttestdata t," +
                    //             "reporttestdatasub s" +
                    //             "where t.mainid = ?" +
                    //             "and s.mainid = ?";

                    // var test1 = "t.data as 数据 ,s.content as 内容";
                    s = str.split('from')[0].replace(new RegExp('select', 'gm'), ''),
                    // console.log(s);
                    // List<String> result = new ArrayList<String>();
                    result = [],

                    sarr = s.split(' as ');
                for (var i = 0; i < sarr.length; i++) {
                    var strInFor = sarr[i].split(',');

                    for (var j = 0; j < strInFor.length; j++) {
                        result.push(strInFor[j]);
                    }
                }

                for (i = 0; i < result.length; i++) {
                    var string = result[i],
                        splitPoint = string.trim().split('.'),
                        rs = (splitPoint.length > 1) ? splitPoint[1] : splitPoint[0];

                    if (i % 2 === 0) {
                        if (this.insertkeys[i / 2] === undefined) {
                            this.insertkeys.push({});
                        }
                        this.insertkeys[i / 2].code = '${' + rs + '}';
                    } else {
                        this.insertkeys[(i - 1) / 2].name = rs;
                    }
                }
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                console.log(this.query.modelCode)
                if (this.query.type !== 'add') {
                    this.form.modelCode = this.query.modelCode;
                    // this.value = this.query.row.
                    // this.content = this.query.modelContent;
                    this.requestParamData();
                }
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.$root.dialogProp) {
                    this.isDialog = true;
                    this.form.modelType = this.$root.dialogProp.modelType;
                    if (this.$root.dialogProp.row) {
                        this.form = this.$root.dialogProp.row;

                        this.isReadonly = true;
                    }
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    'modelCode': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateModelCode, 
                        trigger: 'blur'
                    }],
                    'modelName': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                    // 'dataSet'  : [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}]
                    // 'modelContent': [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
                };
            },
            requestParamData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findModelByModelCode',
                        contextName: 'auth',
                        urlParams: {
                            modelCode: this.form.modelCode
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.ggMessageModelParamList = res.resData.messageModelParamVos;
                        $.extend(true, _this.form, res.resData);
                        _this.content = res.resData.modelContent;
                    }
                });
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                // var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    })
                }
            },
            dialogSuccessSubmit: function () {
                this.$emit('callDialog', this.form);
            }
        }
    });
});