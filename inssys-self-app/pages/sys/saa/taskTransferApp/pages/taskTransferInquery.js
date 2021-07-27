/**
 * Party编辑页面
 * @author 赖建东
 * @time 2017/11/09
 */
define(function (require) {
    var temp = require('./taskTransferInquery.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'taskTransferInqueryAPP',
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
                this.searchList('transferUserCodeSearch', 'auth', _this.bpmTaskReqVo, 'userList', function (data) {
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