/**
 * 打印机管理主页面
 * @author 孙恬静
 * @time 2018/05/23
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'printerApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                sysPrinterVoFilters: {
                    printerIp: '',
                    printerName: '',
                    validInd: ''
                },
                sysPrinterVoList: []
            }
        },
        events: {
            // 获取打印机列表
            onGetList: function () {
                var _this = this;
                this.searchList('sysSearchPrinter', 'auth', this.sysPrinterVoFilters, 'sysPrinterVoList', function (data) {
                    _this.sysPrinterVoList = data;
                });
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === true ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = true;
                    if (row.validInd) {
                        validInd = false;
                    }
                    var printer = {
                            validInd: validInd,
                            id: row.id
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysDeletePrinter',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, printer).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === '1') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === '0') {
                                disableMessage = 'gIsDisable';
                            } else {
                                disableMessage = 'gSaveSuccess';
                            }
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(disableMessage)
                            }).then(function () {
                                _this.onGetList();
                            });
                        }
                    });
                })
            },

            // 查看|新增
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'printerAppPrinterEdit',
                    query: {type: type, id: row && row.id},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        }
    });
});
