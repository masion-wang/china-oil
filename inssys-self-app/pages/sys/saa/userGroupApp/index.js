/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'userGroupApp',

        datas: function () {
            return {
                ggUserGroupVoFilters: {
                },
                userGroupList: []
            }
        },
        events: {
            onGetList: function () {
                var params = this.getParamsMixin(this.ggUserGroupVoFilters),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findUserGroupList',
                        contextName: 'auth',
                        serachParms: {_pageSize: params._pageSize, _pageNo: params._pageNo}
                    }),
                    _this = this;
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.mixinObject.searchSet.total = res.resData.userGroupList.total;
                        _this.userGroupList = res.resData.userGroupList.content;
                    } else {
                        _this.userGroupList = [];
                        _this.mixinObject.searchSet.total = 0;
                    }
                });
            },

            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'userGroupAppEdit',
                    query: {type: type, userGroupCode: row && row.userGroupCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            },
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = true;
                    if (row.validInd) {
                        validInd = false;
                    }

                    var userGroup = {
                            validInd: validInd,
                            userGroupCode: row.userGroupCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ggUserGroupDeleteByPk',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, userGroup).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData) {
                                disableMessage = 'gIsActivate';
                            } else if (!res.resData) {
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
            }
        }
    });
});
