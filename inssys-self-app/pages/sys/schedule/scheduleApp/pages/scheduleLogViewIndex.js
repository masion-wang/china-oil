/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./scheduleLogViewIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'scheduleAppScheduleLog',
        params: function () {
            return {

            }
        },
        datas: function () {
            return {
                voFilters: {},
                list: [

                ]
            }
        },
        events: {
            onGetList: function () {
                // if (this.voFilters.startDateStart && !this.voFilters.startDateEnd) {
                //     this.voFilters.startDateStart = Vue.filter('time')(this.voFilters.startDateStart, 'yyyy-MM-dd 23:59:59');
                // }
                // if (!this.voFilters.startDateStart && this.voFilters.startDateEnd) {
                //     this.voFilters.startDateEnd = Vue.filter('time')(this.voFilters.startDateEnd, 'yyyy-MM-dd 00:00:00');
                // }
                var params = this.getParamsMixin(this.voFilters),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysScheduleLogSearch',
                        contextName: 'schedule',
                        serachParms: {_pageSize: params._pageSize, _pageNo: params._pageNo}
                    }),
                    _this = this;
                    
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.mixinObject.searchSet.total = res.resData.list.total;
                        _this.list = res.resData.list.content;
                    } else {
                        _this.list = [];
                        _this.mixinObject.searchSet.total = 0;
                    }
                });
            },
            tableRowClassName: function (params) {
                if (params.row.status === '0') {
                    return 'warning-row';
                }
            }
        },
        methods: {
            initPage: function () {
                this.voFilters.scheduleJobGroup = this.$root.dialogProp.jobGroup;
                this.voFilters.scheduleJobName = this.$root.dialogProp.jobName;
                this.onGetList();
            },
            // 状态翻译
            formatStatus: function (row) {
                if (row.status === '0') {
                    return Vue.gvUtil.getInzTranslate('scheduleJobStatusFail');
                } else if(row.status === '2'){
                    return "OverTime";
                } else {
                    return Vue.gvUtil.getInzTranslate('scheduleJobStatusSuccess');
                }
            }
        }
    });
});
