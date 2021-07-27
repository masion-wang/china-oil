/**
 * 打印机管理编辑页面
 * @author 孙恬静
 * @time 2018/05/23
 */
define(function (require) {
    var temp = require('./printerEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'printerAppUserEdit',
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {},
                printerPreQuery: {
                    id: ''
                },
                isDisplay: false
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此
            return {
                type: 'add',
                id: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                printerSlotList: [],
                form: {
                    printerIp: '',
                    id: null,
                    printerName: null,
                    printerSlotCodeList: [],
                    validInd: '',
                    isBroken: false,
                    printerCode: [],
                    transferPrinter: '',
                    saaUserPrinterVos: []
                }
            }
        },
        events: {
            selectTransferPrinter: function (row, selectHandleParams, index) {
                this.requestPrinterSlots(row && row.id, index);
            },
            isOpenDialog: function () {
                if (this.form.isBroken) {
                    this.isDisplay = true;
                    this.findTransferPrinters();
                } else {
                    this.isDisplay = false;
                }
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
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysAddPrinter',
                                    contextName: 'auth'
                                });
                            }
                            if (_this.query.type === 'edit') {
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'sysUpdatePrinter',
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
            onResetForm: function (formName) {
                var printerIp = this.form.printerIp;
                this.$refs[formName].resetFields();
                if (this.query.type === 'edit') {
                    this.form.printerIp = printerIp;
                }
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }
        },
        methods: {

            findTransferPrinters: function () {
                var url = Vue.gvUtil.getUrl({
                        apiName: 'findTransferDocuments',
                        contextName: 'auth',
                        urlParams: {
                            printerId: this.form.id
                        }
                    }),
                    _this = this;
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form.saaUserPrinterVos = res.resData;
                        for (var index in _this.form.saaUserPrinterVos) {
                            var saaUserPrinterVo = _this.form.saaUserPrinterVos[index];
                            saaUserPrinterVo.printerIp = '';
                            saaUserPrinterVo.printerSlotId = '';
                        }
                    }
                });
            },
            getSelectedSlots: function() {
                var _this = this,
                url = Vue.gvUtil.getUrl({
                    apiName: 'findPrinterSlots',
                    contextName: 'auth'
                });
                var ggCodeVo = {
                    codeType: 'PrinterSlot'
                };
                Vue.gvUtil.http.post(url, ggCodeVo).then(function (res) {
                    // {
                    //     printerCode: '0',
                    //     printerName: 'Slot1'
                    // }
                    if (res.resCode === '0000') {
                        var slots = res.resData.ggCodeVoList ? res.resData.ggCodeVoList['PrinterSlot'] : [];
                        for (var index in slots) {
                            var slot = {
                                printerCode: slots[index].codeCode,
                                printerName: slots[index].codeName
                            }
                            _this.printerSlotList.push(slot);
                        }
                    }
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
                    }
                });
            },
            // 初始化页面，低层直接调用
            initPage: function () {
                if (this.query.type === 'view') {
                    this.isReadonly = true;
                }
                if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
                this.getSelectedSlots();
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    printerName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    printerIp: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validatePrinterIp,
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        pattern: '^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$',
                        message: Vue.gvUtil.getInzTranslate('gValidateIp')
                    }],
                    printerSlot: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }],
                    validInd: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }]
                };
            },
            validatePrinterIp: function (rule, value, callback) {
                if (this.query.type === 'view' || this.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validatePrinterIp',
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
                        apiName: 'sysPrinterFindByPk',
                        contextName: 'auth',
                        urlParams: {
                            id: this.query.id
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData);
                        _this.form.printerSlotCodeList = res.resData.printerSlotCodeList;
                        _this.printerPreQuery.id = _this.form.id;
                    }
                });
            },
            // 获取可以移交用户的打印机
            /* requestAllPrinter:function(){
                  var _this = this,
                      url = Vue.gvUtil.getUrl({
                          apiName: 'sysFindAllPrinter',
                          contextName: 'auth'
                      });
                  Vue.gvUtil.http.get(url).then(function(res) {
                      if (res.resCode === '0000') {
                          _this.printerList = res.resData;
                      }
                  });
              },*/
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
            }
        }
    });
});