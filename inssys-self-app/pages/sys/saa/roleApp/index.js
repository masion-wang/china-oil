/**
 * 角色管理主页面
 * @author 孙恬静
 * @time 2017/11/21
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'roleApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                saaRoleVoFilters: {
                    roleCode: '',
                    roleEName: '',
                    validInd: ''
                },
                saaRoleVoList: []
            }
        },
        events: {
            // 获取角色列表
            onGetList: function () {
                var _this = this;
                this.searchList('sysRoleSearch', 'auth', this.saaRoleVoFilters, 'saaRoleVoList', function (data) {
                    _this.saaRoleVoList = data;
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
                    var role = {
                            validInd: validInd,
                            roleCode: row.roleCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysRoleDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, role).then(function (res) {
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
                    name: 'roleAppRoleEdit',
                    query: {type: type, roleCode: row && row.roleCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        }
    });
});
