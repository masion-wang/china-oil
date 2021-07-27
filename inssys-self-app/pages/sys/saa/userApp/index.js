/**
 * 角色管理主页面
 * @author 孙恬静
 * @time 2017/11/21
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'userApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                sysUserVoFilters: {
                    userCode: '',
                    userName: '',
                    validStatus: ''
                },
                sysUserVoList: []
            }
        },
        events: {
            // 获取用户列表
            onGetList: function () {
                var _this = this;
                this.searchList('sysUserSearch', 'auth', this.sysUserVoFilters, 'sysUserVoList', function (data) {
                    _this.sysUserVoList = data;
                });
            },

            // 删除
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validStatus === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validStatus = '1';
                    if (row.validStatus === '1') {
                        validStatus = '0';
                    } else if (row.islock) {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gIsLock')
                        });
                        return;
                    }
                    var user = {
                            validStatus: validStatus,
                            id: row.id,
                            version: row.version
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysUserDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, user).then(function (res) {
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
                    name: 'userAppUserEdit',
                    query: {type: type, id: row && row.id, userCode: row && row.userCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            // 时间格式化
            formatDate: function (row, column) {
                return Vue.filter('time')(row[column.property]);
            }
        }
    });
});
