/**
 * 功能管理主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function(require) {
    var temp = require('./workbenchEditIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'workbenchAppTaskSearch',

        query: function() {
            return {
                businessId: '',
                source: ''
            }
        },
        params: function() {
            return {
                rules: {},
                module:{}
            }
        },
        datas: function() { // 双向绑定页面显示数据
            return {
                workbenchAppVoFilters: {
                    processId: '', // 流程id
                    taskCode: '', // 任务节点
                    statusList: ["0","1","2"], // 状态集合
                    status: '', // 状态
                    taskId: '', // 任务号
                    businessId: '', // 业务号
                    innerRefNo: '', // 内部参考号
                    clientCode: '', // 客户代码
                    clientName: '', // 客户名称
                    agentCode: '', // 中介人代码
                    agentName: '', // 中介人名称
                    priorityList: [], // 优先级集合
                    priority: '', // 优先级
                    sinTime: '', // 任务流入时间（开始）
                    einTime: '', // 任务流入时间（结束）
                    includeSubTask: '', // 是否查看下级任务
                    handlerCode: '', //User ID
                    taskName: '', //Task Description
                    soutTime: '', // 任务流入时间（开始）
                    eoutTime: '', // 任务流入时间（结束）
                    taskNameCode: 'taskName-Underwriting'
                },
                workbenchVoList: [],
                taskHandlerVo: {
                    taskId: '',
                    businessId: '',
                    handlerCode: '',
                    handlerRole: '',
                    status: ''
                }
            }
        },
        events: {
            onGetList: function() {
                this.workbenchAppVoFilters.innerRefNo = this.workbenchAppVoFilters.innerRefNo.trim();
                // 截取状态
                if (this.workbenchAppVoFilters.statusList) {
                    this.workbenchAppVoFilters.status = this.workbenchAppVoFilters.statusList.join(',');
                }
                // 状态未选，取全部状态
                if (this.workbenchAppVoFilters.statusList.length === 0) {
                    this.workbenchAppVoFilters.status = [0, 1, 2].join(',');
                }
                var _this = this;
                _this.onChangeName();
                this.searchList('workbenchTaskSearch', 'auth', this.workbenchAppVoFilters, 'workbenchVoList', function(data) {
                    _this.workbenchVoList = data;
                });
            },
            // name前后去空格，中间不去空格
            onChangeName: function () {
                if (this.workbenchAppVoFilters.agentName && this.workbenchAppVoFilters.agentName!=='') {
                    this.workbenchAppVoFilters.agentName = this.workbenchAppVoFilters.agentName.trim();
                }
                if (this.workbenchAppVoFilters.clientName && this.workbenchAppVoFilters.clientName!=='') {
                    this.workbenchAppVoFilters.clientName = this.workbenchAppVoFilters.clientName.trim();
                }
            },

            // 查看|处理
            onHandleEdit: function(row) {
                var status = row.status,
                    type = 'view',
                    _this = this;

                _this.taskHandlerVo.taskId = row.taskId;
                _this.taskHandlerVo.businessId = row.businessId;
                _this.taskHandlerVo.handlerCode = row.handlerCode;
                _this.taskHandlerVo.handlerRole = row.handlerRole;
                _this.taskHandlerVo.status = status;

                var url = Vue.gvUtil.getUrl({
                    apiName: 'workbenchAcceptTask',
                    contextName: 'auth'
                });
                if (status && status !== 'Processed') {
                    Vue.gvUtil.http.put(url, _this.taskHandlerVo).then(function(res) {
                        if (res.resCode === '0000') {
                            if (res.resData === '0') {
                                type = 'edit';
                            } else if (res.resData === '1') {
                                Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('gMsgTaskIsProcessed') });
                                return;
                            } else if (res.resData === '2') {
                                type = 'view';
                            } else if (res.resData === '3') {
                                Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('gMsgTaskStatusMismatch') });
                                return;
                            } else if (res.resData === '4') {
                                Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('gMsgTaskHandlerError') });
                                return;
                            } else if (res.resData === '5') {
                                Vue.gvUtil.alert({msg: Vue.gvUtil.getInzTranslate('gMsgTaskSuspended')});
                                return;
                                type = 'view';
                            }
                            _this.redirectToPage(row, type, _this);
                        }
                    });
                } else {
                    _this.redirectToPage(row, type, _this);
                }
            },

            // 查看历次流程记录
            onHandleView: function(val) {
                console.log(val)
            },

            onProcessIdChange: function(row) {
                this.workbenchAppVoFilters.processId = row.processId;
                this.workbenchAppVoFilters.taskCode = '';
            },

            onHistoryInquiry: function(processInstanceId) {
                var _this = this;
                Vue.gvUtil.registerConfigExtend('workbenchAppTaskHistory', function() {
                    require.async('./taskHistory', function(workbenchAppTaskHistory) {
                        Vue.gvUtil.showModal(workbenchAppTaskHistory, {
                            title: 'Task History Inquiry',
                            widthStyle: 'dialog-large',
                            dialogProp: {
                                processInstanceId: processInstanceId,
                            },
                            callDialog: function(obj) {
                                if (obj) {
                                    _this.onSave();
                                }
                            }
                        })
                    });
                }, true);
            },
            onTaskIdHistory: function(taskId) {
                var _this = this;
                Vue.gvUtil.registerConfigExtend('workbenchAppTaskIdHistory', function() {
                    require.async('./taskIdHistory', function(workbenchAppTaskIdHistory) {
                        Vue.gvUtil.showModal(workbenchAppTaskIdHistory, {
                            title: 'Task History Inquiry',
                            widthStyle: 'dialog-large',
                            dialogProp: {
                                taskId: taskId,
                            },
                            callDialog: function() {

                            }
                        })
                    });
                }, true);
            },
            // 清除表单
            onResetForm: function (formName) {
                this.$refs[formName].resetFields();
                this.workbenchAppVoFilters.agentName = null;
                this.workbenchAppVoFilters.clientName = null;
                this.workbenchAppVoFilters.handlerCode = null;
                this.workbenchAppVoFilters.sinTime = null;
                this.workbenchAppVoFilters.einTime = null;
                this.workbenchAppVoFilters.soutTime = null;
                this.workbenchAppVoFilters.eoutTime = null;
                this.workbenchAppVoFilters.includeSubTask = 'false';
            },
            handleSelectChange: function (row) {
                this.workbenchAppVoFilters.taskNameCode = 'taskName-'+row.codeName;
                switch (row.codeName) {
                    case 'Claims': this.module = {companyCode : 'CL'};
                    break;
                    default : this.module = {};
                }
                console.log(this.workbenchAppVoFilters.taskNameCode);
            },
            // 查询结果导出
            onHandleExport: function () {
                var exclude = ['No'];
                if (this.workbenchVoList.length == 0) {
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gDataEmpty'));
                    return;
                }else{
                    Vue.gvUtil.exportExcel(this.$refs.workbenchVoListRef, 'workbenchVoList', 'task_'+Vue.filter('time')(new Date(), 'ddMMyyyy_HHmmss'), null, exclude);
                }
            },
            exportAll: function () { // 导出查询全部列表
                Vue.gvUtil.setApi({
                    'exportAll': '/workbench/find_tasks_nopage'
                });
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        contextName: 'auth',
                        apiName    : 'exportAll'
                    });
                Vue.gvUtil.http.post(url, this.workbenchAppVoFilters).then(function (res) {
                    if (res.resCode === '0000') {
                        for (var i =0 ;i < res.resData.workbenchVoList.length ; i++){
                            var priority = res.resData.workbenchVoList[i].priority,
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
                            res.resData.workbenchVoList[i].priority = value;
                        }

                        Vue.gvUtil.toExcel({
                            fileName: 'task_'+Vue.filter('time')(new Date(), 'ddMMyyyy_HHmmss'),
                            datas   : [{
                                sheetData  : res.resData.workbenchVoList,
                                sheetName  : 'sheet',
                                sheetFilter: ['clientName', 'agentName', 'processDesc', 'taskName', 'innerRefNo', 'status', 'taskId', 'handlerCode', 'priority', 'inTime','outTime'],
                                sheetHeader: ['Client Name', 'Agent Name', 'Process Desc', 'Task Name', 'Inner Ref No.', 'Status', 'Task ID', 'Destination User', 'Priority', 'In Time', 'Out Time']
                            }]
                        });
                    }
                });
            },
        },


        methods: {
            initPage: function() {
                if (this.query.source) {
                    this.workbenchAppVoFilters.businessId = this.query.businessId;
                    this.onGetList();
                }
            },
            initRules: function() {
                this.rules = {
                    'businessId': [{ trigger: 'blur', max: 60, message: Vue.gvUtil.getInzTranslate('workbenchsearchBusinessIdCheck') }]
                };
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
            // 跳转页面
            redirectToPage: function(row, type, val) {
                Vue.gvUtil.redirectTo({
                    name: row.viewUrl,
                    register: true,
                    reMethods: val.onGetList,
                    isBlank: true,
                    query: {
                        bpmTaskVo: row,
                        businessType: row.processId,
                        taskId: row.taskId,
                        taskCode: row.taskCode,
                        businessId: row.businessId,
                        processInstanceId: row.processInstanceId,
                        approveInd: row.approveInd,
                        status: row.status,
                        innerRefNo: row.innerRefNo,
                        outerRefNo: row.outerRefNo,
                        type: type,
                        taskName: row.taskName
                    }
                });
            },


        }
    });
});