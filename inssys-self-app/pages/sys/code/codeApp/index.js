/**
 * 基础数据管理主页面
 * @author huangjinghua
 * @time 2017/11/08
 */
define(function (require) {
    var temp = require('./index.html');
    require('./index.config');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'codeApp',
        datas: function () {
            return {
                ggTypeVoFilters: {
                    codeType: '',
                    codeName: '',
                    validInd: ''
                },
                ggTypeVoList: []
            };
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.searchList('ggTypeListPage', 'auth', this.ggTypeVoFilters, 'ggTypeVoList', function (data) {
                    _this.ggTypeVoList = data;
                });
            },
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = '1';
                    if (row.validInd === '1') {
                        validInd = '0';
                    }
                    var code = {
                            validInd: validInd,
                            codeType: row.codeType
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'disableGgType',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, code).then(function (res) {
                        if (res.resCode === '0000') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('gSaveSuccess')
                            }).then(function () {
                                _this.onGetList();
                            });
                        }
                    });
                });
            },
            // 编辑|新增
            onHandleEdit: function (row, type) {
                // Vue.gvUtil.redirectTo({ path: '/sys/code/code_app/code_edit/index', query: { type: type, codeCode: row && row.codeCode, codeType :row && row.codeType } });
                Vue.gvUtil.redirectTo({
                    name: 'codeAppCodeEdit',
                    query: {
                        type: type,
                        codeType: row && row.codeType
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                });
            },
            // 子项页面
            redirectItemPage: function (row) {
                Vue.gvUtil.redirectTo({
                    name: 'codeAppCodeItem',
                    query: {
                        codeType: row && row.codeType
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                });
            }
        }
    });
});