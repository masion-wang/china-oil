/**
 * 功能管理主页面
 * @author
 * @time 2018/2/2
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name    : 'taskTransferApp',
        query   : function () {
            return {
                businessId: '',
                source    : ''
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                dialogForm: {
                    openDialog: false,
                    title     : '移交'
                },
                taskTransferRules: {}
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                taskTransferAppVoFilters: {
                    processId: '', // 流程id
                    taskCode: '',//任务节点
                    statusList: [],//状态集合
                    status: '',//状态
                    taskId: '',//任务号
                    businessId: '',//业务号
                    innerRefNo: '',//内部参考号
                    priorityList: [],//优先级集合
                    priority: '',//优先级
                    inTime: '', // 任务流入时间
                    includeSubTask: '' // 是否查看下级任务
                },
                // 授权数据
                powerForm: {
                    userCode: ''
                },
                transferTaskId    : '',
                status            : '',
                taskTransferVoList: []
            }
        },
        events: {
            onUserInquery: function (row) {
                var _this = this;
                _this.status = row.status;
                _this.transferTaskId = row.taskId;
                Vue.gvUtil.registerConfigExtend('taskTransferInqueryAPP', function () {
                    require.async('./pages/taskTransferInquery', function (taskTransferInqueryAPP) {
                        Vue.gvUtil.showModal(taskTransferInqueryAPP, {
                            title: 'UserCode Inquiry',
                            widthStyle: 'dialog-small',
                            dialogProp: {
                                    transferTaskId: row.taskId,                         
                            },
                            callDialog: function (obj) {
                                if (obj) {
                                    _this.powerForm.userCode = obj.userCode;
                                    _this.onSave();
                                }
                            }
                        })
                    });
                }, true);
            },
            onProcessIdChange: function(row) {
                this.taskTransferAppVoFilters.processId = row.processId;
                this.taskTransferAppVoFilters.taskCode = '';
            },
    
    
            onTransfer: function (row) {
                this.transferTaskId = row.taskId;
                this.status = row.status
                this.dialogForm.openDialog = !this.dialogForm.openDialog
            },
            selectUserCode: function (row) {
                this.powerForm.userCode = row.userCode || '';
            },
            onSave: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName    : 'sysTaskDelegate',
                        contextName: 'auth',
                        urlParams  : {taskId: _this.transferTaskId, targetUserId: _this.powerForm.userCode}
                    });
                // 处理中的任务移交
                if (_this.status === 'Processing') {
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000' && res.resData === '0') {
                            Vue.gvUtil.alert({msg: Vue.gvUtil.getInzTranslate('systaskdelegateTaskSuccess')});
                            _this.onGetList();
                        } else {
                            Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('systaskdelegateTaskFailure'));
                        }
                    });
                } else {
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('systaskdelegateTaskOnlyProcessing'))
                }
                this.dialogForm.openDialog = !this.dialogForm.openDialog
            },
            // 获取功能列表
            onGetList: function () {
                this.taskTransferAppVoFilters.innerRefNo = this.taskTransferAppVoFilters.innerRefNo.trim();
                // 截取状态
                if (this.taskTransferAppVoFilters.statusList) {
                    this.taskTransferAppVoFilters.status = this.taskTransferAppVoFilters.statusList.join(',');
                }
                // 状态未选，取全部状态
                if (this.taskTransferAppVoFilters.statusList.length === 0) {
                    this.taskTransferAppVoFilters.status = [0, 1].join(',');
                }
                var _this = this;
                this.searchList('taskTransferSearch', 'auth', this.taskTransferAppVoFilters, 'workbenchVoList', function (data) {
                    _this.taskTransferVoList = data;
                });
            },
            
        },
        methods: {
            initPage: function () {
                if (this.query.source) {
                    this.taskTransferAppVoFilters.businessId = this.query.businessId;
                    this.onGetList();
                }
            },
            // 时间格式化
            formatTime: function(row, column) {
                return Vue.filter('time')(row[column.property], 'dd-MM-yyyy HH:mm:ss');
            },
            // 优先级格式化
            formatPriority: function(row) {
                var priority = row.priority,
                    value = '';
                if (priority === 0) {
                    value = 'Low';
                } else if (priority === 1) {
                    value = 'Medium';
                } else if (priority === 2) {
                    value = 'High';
                } else if (priority === 3) {
                    value = 'Overdue';
                }
                return value;
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.taskTransferRules = {
                    userCode: [{required: true, message: this.mixinObject.gValidateRequired, trigger: 'blur'}]
                };
            }
        }
    });
});
