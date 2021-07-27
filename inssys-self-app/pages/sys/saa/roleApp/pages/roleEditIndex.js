/**
 * 角色管理编辑页面
 * @author 孙恬静
 * @time 2017/11/21
 */
define(function (require) {
    var temp = require('./roleEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'roleAppRoleEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                isMenuChange: false, // 功能菜单和roleCode是否有更新
                rules: {},
                isShowBox: true,
                taskLable: 'taskCName',
                dialogForm: {
                    closeClickModal: false,
                    dialogFormVisible: false,
                    id: '',
                    type: null,
                    title: ''
                },
                menuId: 0,
                isIndeterminate: true
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                roleCode: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                saaRoleVoFilters: {},
                form: {
                    roleCode: '',
                    id: '',
                    roleCName: '',
                    roleTName: '',
                    roleEName: '',
                    validInd: '1',
                    comcode: '',
                    saaRoleTaskVos: [], // 1、存在的权限 2、插入的数据
                    saaRoleMenuVos: [], // 1、存在的权限 2、插入的数据
                    checkedButtons: []
                },
                buttonMenus: [],
                menus: [], // 所有菜单数据
                defaultProps: {
                    children: 'children',
                    label: 'clabel'
                },
                menuDefaultCheckedKeys: [], // 菜单选中的数据
                tasks: [], // 所有Task数据
                tasksValue: [], // Task选中的数据
                menuButtonForm: {},
                checkedButtons: [],
                havingButtons: []
            }
        },
        watch: { // 监听数据变化
            'form.roleCode': function () { // 监听 data里面的wa,val是最新的值，old是旧的数据
                this.isMenuChange = true;
            },
            'checkedButtons': function () {
                this.form.checkedButtons = this.checkedButtons || [];
            }
        },
        events: {
            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysRoleUpdate',
                        contextName: 'auth'
                    });
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            _this.isMenuChange && _this.handleMenu();
                            _this.handleTaskChange();
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysRoleAdd',
                                    contextName: 'auth'
                                });
                            }
                            _this.form.comCode = '1';
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res)
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 清除表单
            onResetForm: function (formName) {
                var roleCode = this.form.roleCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.roleCode = roleCode;
                }
            },
            saveMenus: function () {
                var _this = this;
                var url = Vue.gvUtil.getUrl({
                    apiName: 'saveButtonMenus',
                    contextName: 'auth',
                    urlParams: {
                        roleCode: this.query.roleCode
                    }
                });
                var buttonObject = {
                    havingButtons: this.checkedButtons,
                    havingButtonMenus: this.havingButtonMenus
                }
                Vue.gvUtil.http.post(url, buttonObject).then(function (res) {
                    _this.successSubmitButtons(res);
                });
            },
            onClosePowerDialog: function () {
                this.dialogForm.dialogFormVisible = false;
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            onMenuChange: function () {
                this.isMenuChange = true;
            },
            handleNodeClick: function (data) {
                if (data['children'].length == 0) {
                    // this.dialogForm.dialogFormVisible = true;
                    this.menuId = data['ids'];
                    console.log(data);
                    console.log("menuId: " + this.menuId);
                    this.loadButtonMenus();
                }
            },
            // 处理选中的菜单数据
            handleMenu: function () {
                this.form.saaRoleMenuVos = [];
                for (var i = 0, menu = {}, menus = this.$refs.tree.getCheckedKeys(); i < menus.length; i++) {
                    menu = {};
                    menu.roleCode = this.form.roleCode;
                    menu.menuId = menus[i];
                    this.form.saaRoleMenuVos.push(menu);
                }
            },
            // 处理选中的功能数据
            handleTaskChange: function () {
                this.form.saaRoleTaskVos = [];
                var rows = this.tasksValue;
                for (var i = 0; i < rows.length; i++) {
                    var po = {};
                    po.roleCode = this.form.roleCode;
                    po.taskCode = rows[i];
                    this.form.saaRoleTaskVos.push(po);
                }
            },

            filterMethod: function (query, item) {
                return item.name.indexOf(query) > -1;
            },
            // handleCheckAllChange: function (val) {
            //     this.checkedButtons = val ? this.buttonMenus : [];
            //     this.isIndeterminate = false;
            // },
            handleCheckedButtonsChange: function() {
                console.log(this.checkedButtons);
            }

        },
        methods: {
            loadButtonMenus: function () {
                var _this = this;
                var url = Vue.gvUtil.getUrl({
                    apiName: 'findButtonsByMenuId',
                    contextName: 'auth',
                    urlParams: {
                        menuId: this.menuId,
                        roleCode: this.query.roleCode
                    }
                });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.buttonMenus = res.resData['buttonMenus'] || [];
                        _this.checkedButtons = res.resData['havingButtonMenus'] || [];
                        _this.havingButtonMenus = res.resData['havingButtonMenus'] || [];
                        if (_this.buttonMenus !== null && _this.buttonMenus.length > 0) {
                            _this.dialogForm.dialogFormVisible = true;
                        }

                    }
                });
            },
            // 初始化页面，低层直接调用
            initPage: function () {
                this.requestMenu();
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                this.isShowBox = false;
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
                // this.defaultProps.label = Vue.i18n.locale() !== 'en' ? 'clabel' : 'elabel';
                var _gc = localStorage.getItem('_i18') || 'en';
                if (_gc === 'en') {
                    this.defaultProps.label = 'elabel';
                    this.taskLable = 'taskEName'
                }
            },
            findButtonsByRole: function () {
                var url = Vue.gvUtil.getUrl({
                    apiName: 'findButtonsByRole',
                    contextName: 'auth',
                    urlParams: {
                        roleCode: this.query.roleCode
                    }
                });
                var _this = this;
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form.checkedButtons = res.resData || [];
                    }
                });
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    roleCode: [{
                            trigger: 'blur',
                            required: true,
                            message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                        },
                        {
                            validator: this.validateRoleCode,
                            trigger: 'blur'
                        }
                    ],
                    roleCName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    roleTName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    roleEName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    comcode: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    validInd: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            validateRoleCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateRoleCode',
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
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysRoleFindByPk',
                        contextName: 'auth',
                        urlParams: {
                            roleCode: this.query.roleCode
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        for (var i = 0; i < res.resData.saaRoleTaskVos.length; i++) {
                            _this.tasksValue.push(res.resData.saaRoleTaskVos[i].taskCode);
                        }
                        for (i = 0; i < _this.form.saaRoleMenuVos.length; i++) {
                            _this.menuDefaultCheckedKeys.push(_this.form.saaRoleMenuVos[i].menuId);
                        }
                        _this.$refs.tree.setCheckedKeys(_this.menuDefaultCheckedKeys);
                        _this.findButtonsByRole();
                    }
                });
            },
            // 获取所有功能菜单
            requestMenu: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysAllMenusAndTask',
                        contextName: 'auth',
                        urlParams: {
                            platform: 'platform'
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.menus = res.resData.allMenus.navMenusData.children || [];
                        _this.tasks = _this.constTransferData(res.resData.allTasks);
                    }
                });
            },
            constTransferData: function (list) {
                var rs = [];
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i],
                        o = {
                            label: obj[this.taskLable] + '-' + obj.taskCode,
                            // key: i,
                            name: obj[this.taskLable],
                            code: obj.taskCode
                        };
                    rs.push(o);
                }
                return rs;
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
            // 按钮菜单权限保存成功后回调的方法
            successSubmitButtons: function(data) {
                var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function() {
                        _this.dialogForm.dialogFormVisible = false;
                        _this.findButtonsByRole();
                    })
                }
            }
        }
    });
});