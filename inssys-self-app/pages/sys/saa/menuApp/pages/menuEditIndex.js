/**
 * 菜单管理编辑
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./menuEditIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'menuAppEdit',
        params: function () {
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                label: '',
                menuLevel: null,
                parentId: '',
                id: ''
            }
        },
        datas: function () {
            return {
                parentMenu: '',
                form: {
                    upperId: null,
                    id: '',
                    menuCname: '',
                    menuTname: '',
                    menuEname: '',
                    validInd: '1',
                    //                    taskCode: '',
                    menuLevel: null,
                    systemCode: 'platform',
                    flag: '0',
                    target: '',
                    //                    actionUrl: '',
                    displayNo: ''
                }
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url;

                _this.$refs.form.validate(function (valid) {
                    // 判断校验是否通过
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            _this.isMenuChange && _this.handleMenu();
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysMenuAdd',
                                    contextName: 'auth'
                                });
                                Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                    _this.successSubmit(res)
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysMenuUpdate',
                                    contextName: 'auth'
                                });
                                Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                    _this.successSubmit(res)
                                });
                            }
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },

            selectTaskCode: function (row) {
                this.form.taskCode = row.taskCode || '';
                this.form.actionUrl = row.url || '';
            },
            // 清除表单
            onResetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            addRules: function(value) {
                console.log("value is: " + value);
                if (value === '1') {
                    this.rules.code[0]["required"] = true;
                } else {
                    this.rules.code[0]["required"] = false;
                }
            }
        },
        // 初始化页面，低层直接调用
        methods: {
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type === 'add') {
                    // this.parentMenu = this.query.label;
                    this.form.upperId = this.query.parentId;
                    this.requestParent(this.form.upperId);
                    this.form.menuLevel = parseInt(this.query.menuLevel) + 1;

                    console.log(this.query);
                } else {
                    this.requestData();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    menuCname: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    menuTname: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    menuEname: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    systemCode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    displayNo: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        trigger: 'blur',
                        pattern: Vue.gvUtil.PATTERN_POSITIVE_INTEGER,
                        message: Vue.gvUtil.getInzTranslate('gValidatePositiveInteger')
                    }],
                    validInd: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    code: [{
                        trigger: 'blur',
                        required: false,
                        message: Vue.gvUtil.getInzTranslate('gValidatePositiveInteger')
                    }, {
                        validator: this.validateMenuCode,
                        trigger: 'blur'
                    }]
                };
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                if (data.resCode === '0000') {
                    // var _this = this;
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    });
                }
            },
            validateMenuCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.form.flag === '0') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysMenuFindById',
                        contextName: 'auth',
                        urlParams: {
                            id: this.query.id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                    }
                });
            },
            requestParent: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysMenuFindById',
                        contextName: 'auth',
                        urlParams: {
                            id: this.query.parentId
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        var _gc = localStorage.getItem('_i18') || 'en';
                        if (_gc === 'zh') {
                            _this.parentMenu = res.resData.menuCname;
                        } else {
                            _this.parentMenu = res.resData.menuEname;
                        }

                        // $.extend(true, _this.form, res.resData);
                    }
                });
            }

        }
    });
});