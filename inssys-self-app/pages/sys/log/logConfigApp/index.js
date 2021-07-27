/**
 * 审计日志子表开关配置管理主页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'logConfigApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                logAuditConfig: {
                    apiUrl: '',
                    taskCode: '',
                    basicLogValid: '',
                    specialLogValid: ''
                },
                logAuditConfigVoList: []
            }
        },
        events: {
            selectSaaTask: function (row) {
                this.logAuditConfig.apiUrl = !row ? '' : row.url;
                console.log(row);
            },
            // 获取子表开关列表
            onGetList: function () {
                var _this = this;
                this.searchList('logConfigSearch', 'auth', this.logAuditConfig, 'logConfigList', function (data) {
                    _this.logAuditConfigVoList = data;
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
                    var logConfig = {
                            validInd: validInd,
                            apiUrl: row.apiUrl
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'logConfigDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, logConfig).then(function (res) {
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
                });
                // Vue.gvUtil.confirm({
                //   msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                // }).then(function() {
                //     Vue.gvUtil.http.get(url).then(function(res) {
                //         if (res.resCode === '0000') {
                //             Vue.gvUtil.alert({
                //               msg: Vue.gvUtil.getInzTranslate('gDeleteSuccess')
                //             }).then(function() {
                //                 _this.onGetList();
                //             });
                //         }
                //     });
                // });
            },
            // 查看|新增
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'logConfigAppLogConfigEdit',
                    query: {
                        type: type,
                        taskCode: row && row.taskCode
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
                //   Vue.gvUtil.redirectTo({name: 'logConfigAppLogConfigEdit', query: {type: type, taskCode: row && row.taskCode }})
            }
        },
        methods: {
            // 时间格式化
            formatDate: function (row, column) {
                return Vue.filter('time')(row[column.property]);
            },
            formatValidStatus: function (row, column) {
                return Vue.gvUtil.translationData('Validind', row[column.property]);
            }
        }
    });
});