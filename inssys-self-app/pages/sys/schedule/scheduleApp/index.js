/**
 * 定时任务
 * @author 黄景华
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./index.html'),
        ERR_OK = '0000';
    return Vue.gvUtil.Page({
        template: temp,
        name: 'scheduleApp',
        datas: function () { // 双向绑定页面显示数据
            return {
                sstatus : '',
                scheduleJobVofilters: {
                    jobName: '',
                    jobGroup: '',
                    jobType: '',
                    url: '',
                    userCode: '',
                    queryStatus: '',
                    startCreateTime: null,
                    endCreateTime: null
                },
                scheduleJobVoList: [],

                view: {
                    activeNames: ['1', '2', '3', '4'],
                    dialogForm: { // 对话框设置
                        closeClickModal: false,
                        dialogFormVisible: false,
                        type: null,
                        title: ''
                    }
                }
            }
        },
        events: {
            // 获取功能列表
            onGetList: function () {
                var _this = this;
                _this.searchList('sysScheduleQueryAll', 'schedule', _this.scheduleJobVofilters, 'list', function (data) {
                    _this.scheduleJobVoList = data;
                });

            },
            transRunStatus: function(row) {
                return Vue.gvUtil.translationData('ScheduleRunningStatus', row.queryStatus)
            },
            onResetFormData(){
                this.onResetForm('scheduleJobVofilters');
                this.scheduleJobVofilters.startCreateTime=null;
                this.scheduleJobVofilters.endCreateTime=null;

           },
            onHandleEdit: function (row, type) {
                var _this = this;

                switch (type) {
                case 'add':
                    Vue.gvUtil.redirectTo({
                        name: 'scheduleAppScheduleEdit',
                        query: {type: type},
                        reMethods: this.onGetList,
                        isBlank: true
                    })
                    break;
                case 'RESTART':
                    _this.getPost('sysScheduleRestart', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            row.status = res.resData;
                            _this.changeStatus(row);
                        }
                    });
                    break;
                case 'DELETE':
                Vue.gvUtil.confirm({
                    msg: Vue.filter('translate')('gDeleteSubmit')
                }).then(function () {
                    _this.getPost('sysScheduleDelete', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('gDeleteSuccess')
                            }).then(function () {
                                row.status = res.resData;
                                _this.onGetList();
                            })
                            
                        }
                    });
                });
                    
                    break;
                case 'STOP':
                    _this.getPost('sysScheduleStop', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            row.status = res.resData;
                            _this.changeStatus(row);
                        }
                    });
                    break;
                case 'PAUSED':
                    _this.getPost('sysSchedulePause', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            row.status = res.resData;
                            _this.changeStatus(row);
                        }
                    });
                    break;
                case 'RESUME':
                    _this.getPost('sysScheduleResume', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            row.status = res.resData;
                            _this.changeStatus(row);
                        }
                    });
                    break;
                case 'VIEW':
                    Vue.gvUtil.redirectTo({
                        name: 'scheduleAppScheduleView', 
                        query: {'jobGroup': row.jobGroup || '', 'jobName': row.jobName || ''},
                        reMethods: this.onGetList,
                        isBlank: true
                    });
                    break;
                case 'UNLOCK':
                    _this.getPost('sysScheduleUnblocked', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            _this.changeStatus(row);
                        }
                    });
                    break;
                case 'IMMEDIATE':
                    _this.getPost('immediateExecutionTask', row).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            _this.$message({
                                message: 'Task ' + row.jobName + ' successful call',
                                type   : 'success'
                            });
                        }else{
                            Vue.gvUtil.message('Task ' + row.jobName + ' error call')
                        }
                    });
                    break;
                default:
                    break;
                }
            },
            onHandleViewLog: function (row) {
                // Vue.gvUtil.redirectTo({
                //     name: 'scheduleAppScheduleLog',
                //     query: {
                //         type : type,
                //         jobGroup : row.jobGroup,
                //         jobName : row.jobName
                //     }
                // });
                // var _this = this;
                Vue.gvUtil.registerConfigExtend('scheduleAppScheduleLog', function () {
                    require.async('/pages/sys/schedule/scheduleApp/pages/scheduleLogViewIndex', function (scheduleAppScheduleLog) {
                        Vue.gvUtil.showModal(scheduleAppScheduleLog, {
                            title: 'Schedule Log',
                            dialogProp: {jobGroup: row.jobGroup,
                                jobName: row.jobName}
                        })
                    });
                });
            },
            searchNextRunTime: function(cron){
                Vue.gvUtil.registerConfigExtend('scheduleNextRunTimeApp', function () {
                    require.async('/pages/sys/schedule/scheduleApp/pages/scheduleNextRunTime', function (scheduleNextRunTimeApp) {
                        Vue.gvUtil.showModal(scheduleNextRunTimeApp, {
                            title: 'Schedule Next Run Time',
                            dialogProp: {cron: cron},
                            widthStyle: 'dialog-middle'
                        })
                    });
                });
            }
        },
        methods: {
            getPost: function (api, addParams) {
                var params = this.getParamsMixin(addParams),
                    url = Vue.gvUtil.getUrl({
                        apiName: api,
                        contextName: 'schedule',
                        serachParms: { _pageSize: params._pageSize, _pageNo: params._pageNo }
                    });

                return Vue.gvUtil.http.post(url, params);
            },
            changeStatus: function (row) {
                // 异常时刷新
                if (row.status === 'ERROR') {
                    this.onGetList();
                } else if (row.status === 'BLOCKED') {
                    Vue.gvUtil.message('任务'+row.jobName+'被锁定，请先解锁')
                } else if (row.status === 'NONE'){

                } else{
                    var _this = this;
                    var params = {
                        jobName : row.jobName,
                        jobGroup : row.jobGroup,
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysScheduleWatchStatus',
                            contextName: 'schedule',
                        });

                    Vue.gvUtil.http.post(url, params,{shade:false}).then(function (res) {
                        if (res.resCode === ERR_OK) {
                            row.status = res.resData.status;
                            setTimeout(function(){
                                _this.changeStatus(row);
                            },500);
                        }
                    });
                }

            }
        }
        // watch: {
        //     'scheduleJobVoList.status': function (val, oldVal) {
        //     	console.log(val+","+oldVal);
        //     }
        // }
    });
});
