/**
 * 详细表单视图编辑页面
 * @author HuangTianQi
 * @time 2017/11/24
 */
define(function (require) {
    var temp = require('./formViewDetailEditIndex.html'),
        // 支持的输入类型
        TextTypeOptions = [{
            labelZh: '单行文本框',
            labelEn: 'Text',
            value: 'text'
        }, {
            labelZh: '下拉列表',
            labelEn: 'Select',
            value: 'select'
        }, {
            labelZh: '多行文本框',
            labelEn: 'Textarea',
            value: 'textarea'
        }, {
            labelZh: '单选框',
            labelEn: 'Radio',
            value: 'radio'
        }, {
            labelZh: '日历',
            labelEn: 'Calendar',
            value: 'date'
        }, {
            labelZh: '双击域',
            labelEn: 'DbClick',
            value: 'dbclick'
        }, {
            labelZh: '搜索框',
            labelEn: 'Search',
            value: 'search'
        }, {
            labelZh: '搜索下拉',
            labelEn: 'tpAutoComplete',
            value: 'tpautocomplete'
        }, {
            labelZh: '底部按钮',
            labelEn: 'BottomButton',
            value: 'bottomBtn'
        }, {
            labelZh: '留空单元格',
            labelEn: 'Blank',
            value: 'blank'
        }],
        // 输入类型及属性配对表
        OptionMap = {
            text: [{
                labelZh: '输入框占位文本',
                labelEn: 'PlaceHolder',
                value: 'placeholder',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }, {
                labelZh: 'change事件',
                labelEn: 'change',
                value: 'change',
                type: 'event'
            }],
            select: [{
                labelZh: '业务编码',
                labelEn: 'CodeType',
                value: 'code-type',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }, {
                labelZh: 'change事件',
                labelEn: 'change',
                value: 'change',
                type: 'event'
            }, {
                labelZh: '选中后触发的事件',
                labelEn: 'RowSelect',
                value: 'row-select',
                type: 'event'
            }],
            textarea: [{
                labelZh: '输入框行数',
                labelEn: 'Rows',
                value: 'rows',
                type: 'attr',
                async: true
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg.textarea',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct.textarea',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }],
            radio: [{
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }, {
                labelZh: 'change事件',
                labelEn: 'change',
                value: 'change',
                type: 'event'
            }],
            date: [{
                labelZh: '显示在输入框中的格式',
                labelEn: 'Format',
                value: 'format',
                type: 'attr',
                async: false
            }, {
                labelZh: '转回后台的的格式',
                labelEn: 'value-format',
                value: 'value-format',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }],
            dbclick: [{
                labelZh: '业务编码',
                labelEn: 'CodeType',
                value: 'code-type',
                type: 'attr',
                async: false
            }, {
                labelZh: '查询代码',
                labelEn: 'Code',
                value: 'code',
                type: 'attr',
                async: false
            }, {
                labelZh: '选中后触发的事件',
                labelEn: 'RowSelect',
                value: 'row-select',
                type: 'event'
            }, {
                labelZh: '选中第二个域后触发的事件',
                labelEn: 'RowSelectLable',
                value: 'row-select-lable',
                type: 'event'
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }, {
                labelZh: '序号',
                labelEn: 'index',
                value: 'index',
                type: 'attr',
                async: true
            }],
            search: [{
                labelZh: '点击',
                labelEn: 'Click',
                value: 'click',
                type: 'event'
            }, {
                labelZh: '批改触发指令',
                labelEn: 'v-correct-flg',
                value: 'v-correct-flg',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改原值',
                labelEn: 'v-correct',
                value: 'v-correct',
                type: 'attr',
                async: false
            }, {
                labelZh: '批改标示',
                labelEn: 'correct-type',
                value: 'data-correct-type',
                type: 'attr',
                async: true
            }],
            tpautocomplete: [{
                labelZh: '选中后触发的事件',
                labelEn: 'RowSelect',
                value: 'row-select',
                type: 'event'
            },{
                labelZh: '前置查询条件',
                labelEn: 'pre-query-data',
                value: 'pre-query-data',
                type: 'attr',
                async: true
            }],
            bottomBtn: [{
                labelZh: '类型',
                labelEn: 'Type',
                value: 'type',
                type: 'attr',
                async: false
            }, {
                labelZh: '点击',
                labelEn: 'Click',
                value: 'click',
                type: 'event'
            }],
            list: [{
                labelZh: '显示序号',
                labelEn: 'Display serial number column',
                value: 'showSN',
                type: 'attr',
                async: true
            }, {
                labelZh: '显示操作',
                labelEn: 'Display operation column',
                value: 'showOP',
                type: 'attr',
                async: true
            }, {
                labelZh: '只读标志',
                labelEn: 'The read-only flag',
                value: 'readonly',
                type: 'attr',
                async: false
            }]
        },
        // 输入类型与必填属性配对表
        requiredAttr = {
            select: [{
                prop: 'code-type', // 属性
                readonly: true,
                value: '' // 值
            }],
            bottomBtn: [{
                prop: 'click',
                readonly: true,
                value: '' // 值
            }]
        },
        // 校验规则
        Patterns = [{
            labelZh: '网址',
            labelEn: 'URL',
            value: 'url'
        }, {
            labelZh: '邮箱',
            labelEn: 'Email',
            value: 'email'
        }],
        // 提示语
        Messages = [{
            label: Vue.gvUtil.getInzTranslate('gValidateRequired'),
            value: 'gValidateRequired'
        }, {
            label: Vue.gvUtil.getInzTranslate('gValidateUrl'),
            value: 'gValidateUrl'
        }, {
            label: Vue.gvUtil.getInzTranslate('gValidateEmail'),
            value: 'gValidateEmail'
        }],
        // 必填规则
        RequireTrigger = {
            text: 'blur',
            select: 'change',
            textarea: 'blur',
            date: 'blur',
            dbclick: 'change',
            search: 'blur'
        }

    return Vue.gvUtil.Page({
        template: temp,
        name: 'formViewDetailAppFormViewDetailEdit',
        query: function () {
            return {
                type: 'add'
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () { // 双向绑定页面显示数据
            // 配置选项国际化
            var lang = localStorage.getItem('_i18') || 'en',
                name = lang === 'en' ? 'labelEn' : 'labelZh'
            TextTypeOptions.forEach(function (item) {
                item.label = item[name]
            })
            for (var key in OptionMap) {
                OptionMap[key].forEach(function (item) {
                    item.label = item[name]
                })
            }
            Patterns.forEach(function (item) {
                item.label = item[name]
            })
            return {
                form: {
                    form: '',
                    elementCode: '',
                    dataType: 'string',
                    textType: '',
                    validInd: '1',
                    nameKey: '',
                    colSize: '1',
                    sorting: '',
                    objectForm: '',
                    // 属性
                    attrs: [],
                    // 规则
                    rules: []
                },
                // 支持的表单类型
                textTypeOptions: TextTypeOptions,
                // 支持的校验
                patterns: Patterns,
                // 校验提示语
                messages: Messages,
                // 本页面校验规则
                rules: {}
            }
        },
        computed: {
            options: function () {
                var textType = this.form.textType,
                    dataType = this.form.dataType
                if (dataType === 'list') {
                    return OptionMap.list
                }
                return OptionMap[textType]
            },
            // 展示规则
            showRule: function () {
                var textType = this.form.textType,
                    dataType = this.form.dataType
                return (dataType === 'string' || dataType === 'int') && textType !== 'blank' && textType !== 'bottomBtn'
            },
            showAttr: function () {
                var textType = this.form.textType,
                    dataType = this.form.dataType
                return dataType !== 'object' && textType !== 'blank'
            }
        },
        watch: {
            // 表单类型
            'form.textType': function (val) {
                if (this.hadInit) {
                    this.form.attrs = requiredAttr[val] || []
                    var trigger = RequireTrigger[val]
                    if (trigger) {
                        this.form.rules = [{
                            trigger: trigger,
                            pattern: 'required',
                            message: 'gValidateRequired',
                            readonly: true
                        }]
                    }
                }
            },
            'form.elementCode': function(v, v1) {
                console.log(v)
                console.log(v1)
            },
            // 数据类型
            'form.dataType': function (val) {
                console.log(val)
            },
            'form.attrs': {
                handler: function (val) {
                    var options = this.options
                    for (var i = 0, len = val.length; i < len; i++) {
                        // 新增当前页面校验规则
                        // this.$set(this.rules, 'attrs.' + i +'.value', [{
                        //     trigger: 'blur',
                        //     required: true,
                        //     message: this.mixinObject.gValidateRequired
                        // }])
                        // this.$set(this.rules, 'attrs.' + i +'.label', [{
                        //     trigger: 'change',
                        //     required: true,
                        //     message: this.mixinObject.gValidateRequired
                        // }])
                        this.rules['attrs.' + i +'.value'] =[{
                            trigger: 'blur',
                            required: true,
                            message: this.mixinObject.gValidateRequired
                        }];
                        this.rules['attrs.' + i +'.label'] = [{
                            trigger: 'change',
                            required: true,
                            message: this.mixinObject.gValidateRequired
                        }];
                        // 补全属性信息
                        var prop = options.filter(function (item) {
                            return item.value === val[i].prop
                        })[0] || {}
                        this.form.attrs[i].type = prop.type || 'attr'
                        this.form.attrs[i].async = prop.async || false
                    }
                },
                deep: true
            }
        },
        events: {
            // 新增属性
            onAddAttrs: function () {
                this.form.attrs.push({
                    prop: '',
                    readonly: false,
                    value: ''
                })
            },
            // 新增规则
            onAddRules: function () {
                this.form.rules.push({
                    trigger: '',
                    pattern: '',
                    message: '',
                    readonly: false
                })
            },
            // 删除属性
            onDeletes: function (prop, index) {
                this.form[prop].splice(index, 1)
            },
            // 规则变化
            handleRuleChg: function (index) {
                var pattern = this.form.rules[index].pattern,
                    message = 'gValidate' + pattern.replace(/[a-z]/, function ($1) {
                        return $1.toLocaleUpperCase()
                    }),
                    len = Messages.filter(function (item) {
                        return item.value === message
                    }).length
                len && (this.form.rules[index].message = message) || (this.form.rules[index].message = '')
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'formViewDetailAdd',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'formViewDetailUpdate',
                                    contextName: 'auth'
                                });
                            }
                            _this.form.attribute = JSON.stringify(_this.form.attrs)
                            _this.form.validationConfig = JSON.stringify(_this.form.rules)
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
            // 双击选中的数据
            selectsViewObject: function (row) {
                this.form.viewObjectCode = row.viewObjectCode || '';
                this.form.mainId = row.id || '';
            }
        },
        methods: {
            // 初始化页面
            initPage: function () {
                this.hadInit = true
                if (this.query.type === 'view') {
                    // 查看
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    // 修改
                    this.hadInit = false
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    form: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    elementCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    dataType: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    nameKey: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    sorting: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    colSize: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            // 回显
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'formViewDetailFindByPK',
                        contextName: 'auth',
                        urlParams: {
                            id: this.query.id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        var obj = res.resData,
                            attribute = obj.attribute || '[]',
                            validationConfig = obj.validationConfig || '[]'
                        $.extend(true, _this.form, obj)
                        _this.form.attrs = JSON.parse(attribute)
                        _this.form.rules = JSON.parse(validationConfig)
                        _this.$nextTick(function () {
                            _this.hadInit = true
                        })
                    }
                });
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
            // 双击选中的数据
            selectsViewObject: function (row) {
                this.form.viewObjectCode = row.viewObjectCode || '';
                this.form.mainId = row.id || '';
            }
        }
    });
});