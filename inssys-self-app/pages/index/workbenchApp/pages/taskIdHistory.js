/**
 * Party编辑页面
 * @author yansp
 * @time 2018/10/20
 */
define(function (require) {
    var temp = require('./taskIdHistory.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'workbenchAppTaskIdHistory',
        props: {
            dialogProp: {
                taskId: ''
            }
        },
        query: function () {
            return {
                businessId: '',
                processId: ''
            }
        },

        datas: function () { //双向绑定页面显示数据
            return {
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
            //查询
            onGetList: function () {
                var _this = this;
                var taskId = '';
                if (_this.dialogProp) {
                    taskId = _this.dialogProp.taskId;
                }
                var params = {taskId: taskId};
                this.searchList('workbenchTaskIdHistory', 'auth', params, 'workbenchVoList', function (data) {
                    _this.workbenchVoList = data;
                });
            },
        },

        methods: {
            initPage: function () {
                this.onGetList();
            },
            // 超期任务显示为红色
            tableRowClassName: function (row) {
                if (row.priority === '3') {
                    return 'overdue-warning-row';
                }
                return '';
            },
            // 时间格式化
            formatTime: function (row, column) {
                return Vue.filter('time')(row[column.property], 'dd-MM-yyyy HH:mm:ss');
            },
            // 优先级格式化
            formatPriority: function (row) {
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
            }

        }
    });
});