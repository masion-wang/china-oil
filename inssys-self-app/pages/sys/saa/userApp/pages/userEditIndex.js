/**
 * 用户管理编辑页面
 * @author 孙恬静
 * @time 2017/11/21
 */
define(function (require) {
    var temp = require('./userEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'userAppUserEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                // 选择今天之后的时间
                pickerOptions: {
                    disabledDate: function (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                rules: {},
                isBuddyChoose: false,
                islock: false, // 是否锁定
                buddyPreQuery: {
                    companyCode: ''
                },
                roleLabel: 'roleCName',
                isDisplay: false
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                id: '',
                userCode: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                roleList: [],
                form: {
                    userCode: '',
                    id: '',
                    userName: null,
                    pwdExpireDate: '',
                    demissionDate: null,
                    newPwd: '',
                    validStatus: '',
                    companyCode: null,
                    userGroupCode: '',
                    companyName: '',
                    roleCodeList: [],
                    saaRoleVos: [],
                    saaUserPrinterVos: [],
                    buddy: '',
                    signature: '',
                    file: '',
                    islock: false,
                    startDateOnLeave: null,
                    endDateOnLeave: null,
                    isLoginLock: false,
                    email: '',
                    mobilePhone: '',
                    workbenchUrl: '',
                    address: ''
                }
            }
        },
        events: {
            onGetList: function () {
                var _this = this;
                var searchFilter = {userCode: this.query.userCode};
                this.searchList('userPrinterSearch', 'auth', searchFilter, 'userPrinters', function (data) {
                    _this.form.saaUserPrinterVos = data;
                });
            },
            changeCompanyCode: function () {
                if (this.form.companyCode) {
                    this.isBuddyChoose = true;
                    this.buddyPreQuery.companyCode = this.form.companyCode;
                } else {
                    this.isBuddyChoose = false;
                }
                this.form.buddy = '';
            },
            onDeletes: function (index, data) {
                if (data.length > 0) {
                    data.splice(index, 1);
                }
            },
            deleteDocument: function (index, data) {
                var printerId = data[index].id;
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteSubmit')
                }).then(function () {
                    var url = Vue.gvUtil.getUrl({
                        apiName: 'deleteDocumentConfig',
                        contextName: 'auth'
                    });
                    Vue.gvUtil.http.post(url, printerId).then(function(res) {
                        if (res.resCode === '0000') {
                            _this.onGetList();
                        }
                    })
                });
            },
            validateDateOnLeave: function () {
                if (this.form.endDateOnLeave && this.form.startDateOnLeave) {
                    if (this.form.endDateOnLeave < this.form.startDateOnLeave) {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('sysUserEarlierDateMsg'));
                        return false;
                    }
                }
                if (this.form.endDateOnLeave || this.form.startDateOnLeave || this.form.endTimeOnLeave || this.form.startTimeOnLeave) {
                    if (!this.form.endDateOnLeave || !this.form.startDateOnLeave || !this.form.endTimeOnLeave || !this.form.startTimeOnLeave || !this.form.buddy) {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('sysUserEnterLeaveTime'));
                        return false;
                    }
                }
                return true;
            },
            // 锁定按钮
            lock: function () {
                this.islock = true;
            },

            // 确认锁定按钮
            confirmLock: function () {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                }).then(function () {
                    var url = Vue.gvUtil.getUrl({
                        apiName: 'sysUserLock',
                        contextName: 'auth'
                    });
                    Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                        _this.successSubmit(res);
                    });
                });
            },

            requestPrinterSlots: function (id, index) {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'requestPrinterSlots',
                        contextName: 'auth',
                        urlParams: {
                            id: id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form.saaUserPrinterVos[index]['slotSelectResVos'] = res.resData;
                        // _this.printerSlots = res.resData;
                    }
                });
            },

            editDocument: function (row, type) {
                var _this = this;
                Vue.gvUtil.registerConfigExtend('userAppDocumentEdit', function () {
                    require.async('../components/userDocumentEdit.js', function (userAppDocumentEdit) {
                        Vue.gvUtil.showModal(userAppDocumentEdit, {
                            title: 'Document-Printer Edit',
                            dialogProp: {
                                    userCode: _this.form.userCode,
                                    row: row,
                                    type: type                        
                            },
                            callDialog: function (obj) {
                                _this.onGetList();
                                //修改完重新查询单证-打印机配置
                            }
                        })
                    });
                }, true);
            },
            onAdd: function () {
                var index = this.form.saaUserPrinterVos.length;
                this.$set(this.form.saaUserPrinterVos, index, {
                    documentType: '',
                    printerIp: '',
                    printerSlotId: '',
                    printerSlotCode: '',
                    slotSelectResVos: [],
                    tray: ''
                });
                this.rules['saaUserPrinterVos.' + index + '.documentType'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
                this.rules['saaUserPrinterVos.' + index + '.printerId'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
                this.rules['saaUserPrinterVos.' + index + '.printerSlotId'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
                this.rules['saaUserPrinterVos.' + index + '.tray'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
            },

            selectDocumentType: function (row, selectHandleParams, index) {
                this.form.saaUserPrinterVos[index].documentTypeCode = row.documentTypeCode;
            },
            selectPrinterSlot: function (row, selectHandleParams, index) {
                this.form.saaUserPrinterVos[index].printerSlotId = row.printerSlotId
            },
            selectTransferPrinter: function (row, selectHandleParams, index) {
                this.form.saaUserPrinterVos[index].printerSlotId = '';
                // this.printerId = row.id;
                if (row) {
                    this.requestPrinterSlots(row.id, index);
                }

            },

            cancleLock: function () {
                this.islock = false;
            },

            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this;
                this.$refs.form.validate(function (valid) {
                    if(!_this.validateDateOnLeave()) {
                        return false;
                    }
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            _this.handleRole();
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'sysUserAdd',
                                contextName: 'auth'
                            });
                            for (var index in _this.form.saaUserPrinterVos) {
                                _this.form.saaUserPrinterVos[index]['userCode'] = _this.form.userCode;
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

            // 上传成功后的回调
            imgChanged: function (event) {
                var _this = this,
                    reader = new FileReader();
                reader.readAsDataURL(event.target.files[0])
                reader.onload = function () {
                    _this.form.signature = reader.result
                }
            },
            // 清除表单
            onResetForm: function (formName) {
                var userCode = this.form.userCode;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.userCode = userCode;
                }
                this.form.isLoginLock = false;
                this.form.startDateOnLeave = null;
                this.form.startTimeOnLeave = '';
                this.form.endDateOnLeave = null;
                this.form.endTimeOnLeave = '';
                this.form.companyCode = '';
                
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 处理选中的功能菜单数据
            handleMenu: function () {
                this.form.saaRoleTaskVos = [];
                for (var i = 0, menu = {}, menus = this.$refs.tree.getCheckedKeys(); i < menus.length; i++) {
                    menu = {};
                    menu.roleCode = this.form.roleCode;
                    menu.taskCode = menus[i];
                    this.form.saaRoleTaskVos.push(menu);
                }
            },
            selectCompanyCode: function () {
                var _this = this;
                Vue.gvUtil.registerConfigExtend('companyApp', function () {
                    require.async('/pages/sys/saa/companyApp/pages/companySelectIndex', function (messageModelApp) {
                        Vue.gvUtil.showModal(messageModelApp, {
                            title: 'Company Inquiry',
                            dialogProp: {},
                            callDialog: function (obj) {
                                _this.form.companyCode = obj.getCheckedKeys()[0];
                                _this.form.companyName = obj.getCheckedNodes()[0].treeLabel;
                            }
                        })
                    });
                });
            }
        },
        watch: {
            'form.newPwd': function () {
                if (this.query.type === 'edit') {
                    if (this.form.newPwd) {
                        this.rules['newPwd'] = [{
                            trigger: 'blur',
                            pattern: new RegExp(this.ggCode.codeCode),
                            message: this.ggCode.remark
                        }];
                    } else {
                        this.rules['newPwd'] = [];
                    }
                }
                
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                var _gc = localStorage.getItem('_i18') || 'en';
                if (_gc === 'en') {
                    this.roleLabel = 'roleEName'
                }
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                } else {
                    this.requestAllUserRole();
                }
                if (this.query.type && this.query.type === 'edit') {
                    this.buddyPreQuery['userCode'] = this.query.userCode;
                    this.isDisplay = true;
                }
                this.requestPasswordValidation();
                
            },
            requestPasswordValidation: function () {
                var _this = this,
                    ggCode = {
                        codeType: 'PasswordValidation'
                    };
                this.searchList('findPdValidation', 'auth', ggCode, 'ggCodeVoList', function (data) {
                    if (data) {
                        _this.ggCode = data[0];
                    } else {
                        _this.ggCode['codeCode'] = '^(?=.*[a-z])(?=.*[A-Z]).{8,}$';
                        _this.ggCode['remark'] = 'Please enter a password that includes uppercase and lowercase and length is not less than 8';
                    }
                    if (_this.rules['newPwd']) {
                        _this.rules['newPwd'].push({
                            trigger: 'blur',
                            pattern: new RegExp(_this.ggCode.codeCode),
                            message: _this.ggCode.remark
                        });
                    }
                });
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    userName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    userCode: [{
                            trigger: 'blur',
                            required: true,
                            message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                        },
                        {
                            validator: this.validateUserCode,
                            trigger: 'blur'
                        }
                    ],
                    pwdExpireDate: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    validStatus: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    email: [{
                        trigger: 'blur',
                        type: 'email',
                        message: Vue.gvUtil.getInzTranslate('gValidateEmail')
                    }],
                    workbenchUrl: [{
                        trigger: 'blur',
                        type: 'url',
                        message: Vue.gvUtil.getInzTranslate('gValidateUrl')
                    }],
                    userGroupCode: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };

                if (this.query.type == 'add') {
                    this.rules['newPwd'] = [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }];
                }
            },

            validateUserCode: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateUserCode',
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
                        apiName: 'sysUserFindByPk',
                        contextName: 'auth',
                        urlParams: {
                            id: this.query.id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        // _this.form.saaUserPrinterVos = res.resData.saaUserPrinterVos;
                        _this.buddyPreQuery.companyCode = _this.form.companyCode;
                        _this.onGetList();
                        _this.requestAllUserRole();
                    }
                });
            },


            // 获取系统所有角色
            requestAllUserRole: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysAllUserRoleFind',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.roleList = res.resData;
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
            // 处理选中的角色数据
            handleRole: function () {
                this.form.saaRoleVos = [];
                for (var i = 0, role = {}; i < this.form.roleCodeList.length; i++) {
                    role = {};
                    role.roleCode = this.form.roleCodeList[i];
                    var date = new Date()
                    role.startDate = Date.parse(date);
                    role.endDate = Date.parse(new Date(date.getTime() + 1000 * 60 * 60 * 24 * 120));
                    this.form.saaRoleVos.push(role);
                }
            }

        }
    });
});