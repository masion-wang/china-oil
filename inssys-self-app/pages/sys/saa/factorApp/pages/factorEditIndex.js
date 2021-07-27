/**
 * 数据权限管理编辑页面
 * @author 孙恬静
 * @time 2017/11/20
 */
define(function (require) {
    var temp = require('./factorEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'factorAppFactorEdit',
        query: function () {
            return {
                type: 'add',
                factorCode: ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                dialogForm: {
                    closeClickModal: false,
                    dialogFormVisible: false,
                    id: '',
                    type: null,
                    title: ''
                },
                rules: {},
                treeLoading: false,
                // 授权列表验证规则
                powerRules: {},
                fieldPreData: [],
                isTree: false,
                codeType: 'NotTreeTables'
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                tableName: '',
                fieldName: '',
                fieldDesc: '',
                form: {
                    factorCode: '',
                    dataType: '',
                    factorDesc: '',
                    saaFactorFields: [{
                        fieldCode: '',
                        entityCode: '',
                        id: ''
                    }]
                },
                // 授权数据
                powerForm: {
                    userCode: '',
                    dataValue: '',
                    dataOper: '',
                    systemCode: ''
                },
                // 授权列表搜索条件
                filters: {
                    userCode: ''
                },
                // 授权列表
                powers: [],
                selectTable: [
                    {value: '0', label: '请选择'},
                    {value: '1', label: 'smc_menu'},
                    {value: '2', label: 'ggcompany'}
                ],
                // 根据选择的table选项，加载对应的树
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'elabel'
                }
            }
        },
        watch: {
            isTree: function () {
                if (this.isTree) {
                    this.codeType = 'FactorTables';
                } else {
                    this.codeType = 'NotTreeTables';
                }
            }
        },
        events: {

            // 增加
            onAdd: function () {
                var index = this.form.saaFactorFields.length;
                this.$set(this.form.saaFactorFields, index, {
                    fieldCode: '',
                    entityCode: '',
                    id: ''
                });
                this.rules['saaFactorFields.' + index + '.fieldCode'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'change'
                }];
                this.rules['saaFactorFields.' + index + '.entityCode'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'change'
                }];
            },

            onDeletes: function (index, data) {
                if (data.length > 1) {
                    data.splice(index, 1);
                } else {
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gDeleteLastData'));
                }
            },

            // 获取授权列表
            onGetList: function () {
                this.filters.factorCode = this.form.factorCode;
                var _this = this,
                    params = this.getParamsMixin(this.filters),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysUserPowerSearch',
                        contextName: 'auth',
                        serachParms: {_pageSize: params._pageSize, _pageNo: params._pageNo}
                    });

                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.mixinObject.searchSet.total = res.resData.SaaUserPowerVoList.total;
                        _this.powers = res.resData.SaaUserPowerVoList.content;
                    } else {
                        _this.mixinObject.searchSet.total = 0;
                        _this.powers = [];
                    }
                });
            },

            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        _this.computFields();
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysFactorAdd',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysFactorUpdate',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            resetForm: function (formName) {
                var factorCode = this.form.factorCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.factorCode = factorCode;
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onHandleEdit: function (row, type) {
                this.dialogForm.id = row && row.id;
                this.dialogForm.type = type;
                this.powerForm = {
                    userCode: '',
                    dataValue: '',
                    dataOper: '',
                    systemCode: ''
                };

                this.dialogForm.dialogFormVisible = true; // 打开模态窗口

                if (this.dialogForm.type === 'add') {
                    this.dialogForm.title = Vue.gvUtil.getInzTranslate('gBtnCreate');
                } else {
                    this.dialogForm.title = Vue.gvUtil.getInzTranslate('gBtnUpdate');
                    this.getPower();
                }
            },
            changeIsTree: function () {
                this.tableName = '';
            },
            handleSelectChange: function () {
                if (!this.isTree) {
                    return;
                }
                var _this = this;
                this.treeData = [];
                this.treeLoading = false;
                this.powerForm.dataValue = '';
                var param = {
                    codeType: this.codeType,
                    codeCode: this.tableName
                };
                $.extend(true, param, this.getParamsMixin());
                var url = Vue.gvUtil.getUrl({
                    apiName: 'treeSearch',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, param).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.treeData = res.resData.children;
                    } else {
                        _this.treeData = [];
                    }
                });
            },
            handleTreeChange: function () {
                this.powerForm.dataValue = this.$refs.tree.getCheckedKeys().join();
            },
            onClosePowerDialog: function () {
                this.dialogForm.dialogFormVisible = false;
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    var url = Vue.gvUtil.getUrl({
                        apiName: 'sysPowerDelete',
                        contextName: 'auth',
                        urlParams: {id: row.id}
                    })
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('gDeleteSuccess')
                            }).then(function () {
                                _this.onGetList();
                            });
                        }
                    });
                })
            },
            savePower: function () {
                var _this = this;
                this.$refs.powerForm.validate(function (valid) {
                    if (valid) {
                        _this.powerForm.factorCode = _this.form.factorCode;
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'sysPowerUpdate',
                                contextName: 'auth'
                            });
                            if (_this.dialogForm.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysPowerAdd',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.powerForm).then(function (res) {
                                _this.successPowerSubmit(res);
                            });
                        });
                    } else {
                        return false;
                    }
                });
            }
            // selectTable: function(row, selectHandleParams, index) {
            //     this.fieldPreData[index]['tableName'] =
            // }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    factorCode: [
                        {trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')},
                        {validator: this.validateFactorCode, trigger: 'blur'}
                    ],
                    dataType: [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
                    'saaFactorFields.0.fieldCode': [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
                    'saaFactorFields.0.entityCode': [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}]
                };
                this.powerRules = {
                    userCode: [{required: true, message: this.mixinObject.gValidateRequired, trigger: 'blur'}],
                    dataValue: [{required: true, message: this.mixinObject.gValidateRequired, trigger: 'blur'}],
                    dataOper: [{required: true, message: this.mixinObject.gValidateRequired, trigger: 'blur'}],
                    systemCode: [{required: true, message: this.mixinObject.gValidateRequired, trigger: 'blur'}]
                };
            },
            validateFactorCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateFactorCode',
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
            computFields: function () {
                for (var n in this.form.saaFactorFields) {
                    this.form.saaFactorFields[n].factorCode = this.form.factorCode;
                }
            },
            getPower: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysPowerFindById',
                        contextName: 'auth',
                        urlParams: {id: this.dialogForm.id}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.powerForm, res.resData);
                    }
                });
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysFactorFindByPk',
                        contextName: 'auth',
                        urlParams: {factor_code: this.query.factorCode}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        if (!_this.form.saaFactorFields) {
                            _this.form.saaFactorFields = [];
                        }
                    }
                });
            },

            // 保存授权成功后回调的方法
            successPowerSubmit: function (data) {
                var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccess')
                    }).then(function () {
                        _this.onClosePowerDialog();
                        _this.onGetList();
                    });
                }
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                // var _this = this;
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
