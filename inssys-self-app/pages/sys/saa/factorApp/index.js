/**
 * 数据权限管理主页面
 * @author 孙恬静
 * @time 2017/11/20
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'factorApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                saaFactorVoFilters: { // 查询条件
                    factorCode: '',
                    dataType: ''
                },
                saaFactorVoList: []
            }
        },
        events: {
            // 获取数据权限列表
            onGetList: function () {
                var _this = this;
                this.searchList('sysFactorSearch', 'auth', this.saaFactorVoFilters, 'saaFactorVoList', function (data) {
                    _this.saaFactorVoList = data;
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
                    var factor = {
                            validInd: validInd,
                            factorCode: row.factorCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysFactorDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, factor).then(function (res) {
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
                    name: 'factorAppFactorEdit',
                    query: {type: type, factorCode: row && row.factorCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        }
    });
});
