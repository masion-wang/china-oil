/**
 * 模板视图配置
 * @author 孙恬静
 * @time 2018/01/09
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'custViewConfigApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                custViewConfigVoFilter: {
                    custViewCode: '',
                    templeType: ''
                },
                custViewConfigVoList: []
            }
        },
        events: {
            // 获取模板视图数据列表
            onGetList: function () {
                var _this = this;
                this.searchList('custViewConfigSearch', 'auth', this.custViewConfigVoFilter, 'custViewConfigVoList', function (data) {
                    _this.custViewConfigVoList = data;
                });
            },
            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validind === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = '1';
                    if (row.validInd === '1') {
                        validInd = '0';
                    }
                    var custViewConfig = {
                            validInd: validInd,
                            custViewCode: row.custViewCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'custViewConfigDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, custViewConfig).then(function (res) {
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
                    name: 'custViewConfigAppEdit',
                    query: {type: type, custViewCode: row && row.custViewCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        }
    });
});
