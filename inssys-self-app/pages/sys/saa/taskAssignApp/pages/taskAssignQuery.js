/**
 * Party编辑页面
 * @author ripin
 * @time 2018/12/05
 */
define(function (require) {
    var temp = require('./taskAssignQuery.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'taskAssignQueryApp',
        props: {
            dialogProp: {
                type: Object,
                default: null
            }
        },
        
        query: function () { //路由跳转传的参数，必须显式维护在此
            return {
                searchType: '0',
            }
        },
        datas: function () { //双向绑定页面显示数据
            return {
                bpmTaskReqVo: {
                    taskId: ''
                },
                userList: []
            }
        },
        events: {
            //查询
            onGetList: function () {
                var _this = this;
                _this.bpmTaskReqVo.taskId = _this.dialogProp.transferTaskId;
                var url = "assignUserCodeSearch";
                //理赔案件移交
                if(_this.dialogProp.claimCaseAssignFlag){
                    url = "claimCaseAssignSearch";
                }else{}
                this.searchList(url, 'auth', _this.bpmTaskReqVo, 'userList', function (data) {
                    _this.userList = data;
                });
            },
            onSelect: function (val) {
                this.$emit('callDialog', val);
            }
        },
        methods: {
            initPage: function () {
                this.onGetList();
            }
        }
    });
});