/**
 * 模板配置
 * @author 孙恬静
 * @time 2018/01/12
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'custConfigApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                custConfigVoFilter: {
                    custCode: null,
                    productCode: null
                },
                custConfigVoList: []
            }
        },
        events: {
            // 获取模板视图数据列表
            onGetList: function () {
                var _this = this;
                this.searchList('custConfigSearch', 'auth', this.custConfigVoFilter, 'custConfigVoList', function (data) {
                    _this.custConfigVoList = data;
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
                    var custConfig = {
                            validInd: validInd,
                            id: row.id
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'custConfigDelete',
                            contextName: 'auth'
                        });

                    Vue.gvUtil.http.post(url, custConfig).then(function (res) {
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
                    name: 'custConfigAppEdit',
                    query: {type: type, id: row && row.id},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        }
    });
});
