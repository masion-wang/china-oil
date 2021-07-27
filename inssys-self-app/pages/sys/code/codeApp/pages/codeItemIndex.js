/**
 * 基础数据子项管理主页面
 * @author Tianjing
 * @time 2018/04/28
 */
define(function (require) {
    var temp = require('./codeItemIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'codeAppCodeItem',
        datas: function () {
            return {
                ggCodeVoFilters: {
                    itemCode: '',
                    codeType: '',
                    validInd: ''
                },
                ggCodeVoList: []
            }
        },
        query: {
            codeType: ''
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.ggCodeVoFilters.codeType = this.query.codeType;
                this.searchList('ggCodeListPage', 'auth', this.ggCodeVoFilters, 'ggCodeVoList', function (data) {
                    _this.ggCodeVoList = data;
                });
            },
            // 返回ggtype查询页面
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
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
                            id: row.id
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'disableGgCode',
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
                })
            },
            // 编辑|新增
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'codeAppCodeItemEdit',
                    query: {
                        type: type,
                        id: row && row.id,
                        codeType: this.query.codeType
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            initPage: function () {
                this.onGetList();
            }
        }
    });
});