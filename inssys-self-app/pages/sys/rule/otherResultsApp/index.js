/**
 * 其他结果集管理主页面
 * @author HuangTianQi
 * @time 2017/12/17
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'otherResultsApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                otherResultsVoFilters: {
                    status: '',  // 状态
                    rule: '' // 规则
                },
                otherResultsVoList: []//
            }
        },
        events: {
            // 获取其他结果集列表
            onGetList: function () {
                this.otherResultsVoList = [{
                    'factor': 'H',
                    'ruleGroupDesc': 'H',
                    'factorTable': 'X',
                    'status': '有效'
                }];

                this.mixinObject.searchSet.total = 1;
                /* var params = this.getParamsMixin(this.ruleLibFactorVoFilters),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'otherResultsSearch',
                        contextName: 'auth',
                        serachParms: { pageSize: params._pageSize, pageNo: params._pageNo },
                    }),
                    _this = this;
                Vue.gvUtil.http.post(url, params).then(function(res) {
                    if (res.resCode == '0000') {
                        _this.mixinObject.searchSet.total = res.resData.otherResultsVoList.total;
                        _this.otherResultsVoList = res.resData.otherResultsVoList.content;
                    } else {
                        _this.otherResultsVoList = [];
                        _this.mixinObject.searchSet.total = 0;
                    }
                });*/
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    var url = Vue.gvUtil.getUrl({
                        apiName: 'otherResultsDelete',
                        contextName: 'auth',
                        urlParams: {ruleLibCode: row.ruleLibCode}
                    });
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('gDeleteSuccess')
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
                    name: 'otherResultsAppOtherResultsEdit',
                    query: {type: type, factor: row && row.factor},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            // 状态翻译
            formatStatus: function (row) {
                return Vue.gvUtil.translationData('Validind', row.validind);
            }
        }
    });
});
