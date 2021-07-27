/**
 * 详细表单视图管理主页面
 * @author HuangTianQi
 * @time 2017/11/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'formViewDetailApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                formViewDetailVoFilters: {
                    form: '',
                    elementCode: '',
                    validInd: ''
                },
                formViewDetailList: []
            }
        },
        events: {
            // 获取详细表单数据列表
            onGetList: function () {
                var _this = this;
                this.searchList('formViewDetailSearch', 'auth', this.formViewDetailVoFilters, 'PubViewObjectEleVoList', function (data) {
                    _this.formViewDetailList = data;
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
                    var viewObjectDetail = {
                            validInd: validInd,
                            id: row.id
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'formViewDetailDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, viewObjectDetail).then(function (res) {
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
            // 新增|编辑
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'formViewDetailAppFormViewDetailEdit',
                    query: {
                        type: type,
                        id: row && row.id
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            // 状态翻译
            formatStatus: function (row) {
                return Vue.gvUtil.translationData('Validind', row.validInd);
            }
        }
    });
});