/**
 * Party编辑页面
 * @author yansp
 * @time 2018/10/20
 */
define(function(require) {
    var temp = require('./taskHistory.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'workbenchAppTaskHistory',
        props: {
            dialogProp: {
                processInstanceId: ''
            }
        },
        query: function() {
            return {
                businessId: '',
                processId: ''
            }
        },

        datas: function() { //双向绑定页面显示数据
            return {
                // nodeData: {},
                nodeData: {},
                processInstanceId: '',
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
            // 点击任务id超链接,进入相应的操作页面
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
                                Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('gMsgTaskSuspended') });
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

            //查询
            onGetList: function() {
                var _this = this;
                var processInstanceId = '';
                if (_this.dialogProp) {
                    processInstanceId = _this.dialogProp.processInstanceId;
                }
                var params = { processInstanceId: processInstanceId, processId: _this.query.processId, businessId: _this.query.businessId };
                this.searchList('workbenchTaskHistory', 'auth', params, 'workbenchVoList', function(data) {
                    _this.workbenchVoList = data;
                });
            },
        },

        methods: {
            initPage: function() {
                // this.getData();
                this.getData2();
                //this.onGetList();
            },
            getData2: function() {
                var _this = this;
                let taskObj = this.dialogProp.processInstanceId;
                var obj = {
                    innerRefNo: taskObj.innerRefNo || '',
                    billTypeCode: taskObj.billTypeCode || ''//修改 自保修改
                }
                url = Vue.gvUtil.getUrl({
                    apiName: 'getWorkflow',
                    contextName:'selfins'//修改 自保修改
                });
                Vue.gvUtil.http.post(url, obj).then(function(res) {
                    _this.handleData2(res);
                });
            },
            getData: function() {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'workbenchSearchTaskHis',
                        contextName: 'auth'
                    }),
                    params = {
                        processInstanceId: this.dialogProp ? this.dialogProp.processInstanceId : '',
                        processId: this.query.processId,
                        businessId: this.query.businessId
                    };

                Vue.gvUtil.http.post(url, params).then(function(res) {
                    _this.handleData(res);
                });
            },
            handleData2: function(data) {
                if (data.resCode === '0000') {
                    this.workbenchVoList = data.resData.objectHistory;
                    this.nodeData = this.workbenchVoList.workFlowDefForProcessChar;
                }

            },
            handleData: function(data) {
                if (data.resCode === '0000') {
                    this.workbenchVoList = data.resData.bpmTaskResVoList;
                    this.nodeData = {
                        nodeDataArray: data.resData.bpmTaskResVoList,
                        relation: data.resData.bpmTransferFactoryList
                    };
                }

            },
            // 超期任务显示为红色
            tableRowClassName: function(row) {
                if (row.priority === '3') {
                    return 'overdue-warning-row';
                }
                return '';
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