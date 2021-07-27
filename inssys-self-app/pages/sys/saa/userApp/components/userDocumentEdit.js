/**
 * 单证打印机信息保存页面
 * @author 孙恬静
 * @time 2019/1/9
 */
define(function (require) {
    var temp = require('./userDocumentEdit.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'userAppDocumentEdit',
        params: function () { // 双向绑定状态数据
            return {
                isDisplay: false
            }
        },
        props: {
            dialogProp: {
                userCode: '',
                row: null
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {

                form: {
                    userCode: '',
                    documentTypeCode: '',
                    printerIp: '',
                    slotSelectResVos: [],
                    printerSlotId: '',
                    tray: ''
                }
            }
        },
        events: {
            requestPrinterSlots: function (id) {
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
                        _this.form.slotSelectResVos = res.resData;
                    }
                });
            },
            validateUniqueDocument: function (rule, value, callback) {
                if (this.dialogProp.type === 'view' || this.dialogProp.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var validateObject = {
                    userCode: this.form.userCode,
                    documentTypeCode: this.form.documentTypeCode
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateUniqueDocument',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, validateObject).then(function (res) {
                    if (res.resCode === '0000' && res.resData.existFlag === '1') {
                        callback();
                    } else {
                        callback(new Error(Vue.gvUtil.getInzTranslate('gValidateUserAndDocument')));
                        // Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateUserAndDocument'));
                    }
                });

            },

            selectDocumentType: function (row) {
                this.form.documentTypeCode = row && row.documentTypeCode;
            },
            selectTransferPrinter: function (row) {
                this.form.printerSlotId = '';
                if (row) {
                    this.requestPrinterSlots(row.id);
                }
            },

            cancleLock: function () {
                this.islock = false;
            },

            // 确认按钮（表单提交）
            onSubmit: function () {
                var _this = this;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'modifyDocumentConfig',
                                contextName: 'auth'
                            });

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
                this.form.documentTypeCode = '';
                this.form.printerIp = '';
                this.form.printerSlotId = '';
                this.form.tray = '';

            },
            // 返回上一页
            returnPage: function () {
                var closeDia = {
                    showDialog: false
                }
                this.$emit('callDialog', );
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
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                if (this.dialogProp.row) {
                    $.extend(true, this.form, this.dialogProp.row)
                } else {
                    this.form = {
                        userCode: '',
                        documentTypeCode: '',
                        printerIp: '',
                        slotSelectResVos: [],
                        printerSlotId: '',
                        tray: ''
                    };
                }

                this.form.userCode = this.dialogProp.userCode;
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    documentTypeCode: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateUniqueDocument,
                        trigger: 'change'
                    }],
                    printerIp: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    printerSlotId: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    passwordExpireDate: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    tray: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }]
                };
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysUserFindByPk',
                        contextName: 'auth',
                        urlParams: {
                            id: this.form.id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        _this.form.saaUserPrinterVos = res.resData.saaUserPrinterVos;
                        _this.buddyPreQuery.companyCode = _this.form.companyCode;
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
                var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        _this.$emit('callDialog', data);
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