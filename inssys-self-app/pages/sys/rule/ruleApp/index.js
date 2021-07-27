/**
 * 规则维护主页面
 * @author HuangTianQi
 * @time 2017/12/11
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'ruleApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                ruleFilters: {
                    code: '',
                    codeDesc: '',
                    validInd: ''
                },
                ruleList: []
            }
        },
        events: {
            // 获取规则库因子列表
            onGetList: function () {
                var _this = this;
                this.searchList('ruleSearch', 'auth', this.ruleFilters, 'ggRuleVoList', function (data) {
                    _this.ruleList = data;
                });
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === true ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = true;
                    if (row.validInd === true) {
                        validInd = false;
                    }
                    var rule = {
                            validInd: validInd,
                            id: row.id
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ruleDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, rule).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === 'true') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === 'false') {
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
                    name: 'ruleAppRuleEdit',
                    query: {type: type, id: row && row.id},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
            // 状态翻译
            // formatStatus: function(row) {
            //     // console.log(row.validInd);
            //     if (row.validInd == true){
            //         var flag  = 1;
            //         return Vue.gvUtil.translationData('Validind', flag);
            //     }else if(row.validInd == false){
            //         var flag1 = 0;
            //         return Vue.gvUtil.translationData('Validind', flag1);
            //     }
            // }
        }
    });
});
