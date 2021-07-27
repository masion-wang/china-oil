/**
 * 基础表单视图管理主页面
 * @author HuangTianQi
 * @time 2017/11/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'formViewBaseApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                formViewBaseVoFilters: {
                    viewObjectForm: null,
                    formTitleKey: null,
                    validInd: null
                },
                formViewBaseList: []
            }
        },
        events: {
            // 获取基础表单视图数据列表
            onGetList: function () {
                var _this = this;
                this.searchList('formViewBaseSearch', 'auth', this.formViewBaseVoFilters, 'PubViewObjectVoList', function (data) {
                    _this.formViewBaseList = data;
                });
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = '1';
                    if (row.validInd === '1') {
                        validInd = '0';
                    }
                    var viewObject = {
                            validInd: validInd,
                            viewObjectForm: row.viewObjectForm
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'formViewBaseDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, viewObject).then(function (res) {
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
            // 新增|编辑
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'formViewBaseAppFormViewBaseEdit',
                    query: {type: type, viewObjectForm: row && row.viewObjectForm},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            formatStatus: function (row, column, cellValue) {
                // console.log(cellValue);
                return Vue.gvUtil.translationData('Validind', cellValue);
            },
            formatButton: function (row, column, cellValue) {
                // console.log(cellValue);
                return Vue.gvUtil.translationData('BtnOptions', cellValue);
            }
        }
    });
});
