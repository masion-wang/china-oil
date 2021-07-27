/**
 * 特殊审计日志管理版本对比页面
 * @author 孙恬静
 * @time 2017/11/10
 */
define(function (require) {
    var temp = require('./specialAuditLogVersionCompareIndex.html');
    // Detail = require('./specialAuditLogDetailIndex');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogAppVersionCompare',
        params: function () { // 双向绑定状态数据
            return {
                uuids: [],
                isShow: false
            }
        },
        props: {
            businessNo: String,
            eventHub: {}
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                specialAuditLogList: []
            }
        },
        events: {
            returnPage: function () {
                Vue.gvUtil.redirectBack();
            },
            // 页码变动
            onHandleCurrentChange: function (val) {
                this.currentChangeMixin(val);
            },
            // 查询行数变动
            onHandleSizeChange: function (val) {
                this.sizeChangeMixin(val);
            },
            // 历史数据列表中，将选中数据的uuid加入uuids，取消选中的从uuids删除
            handleCheckAllChange: function (row) {
                if ($.inArray(row.content.basicLogId, this.uuids) >= 0) {
                    this.uuids.pop(row.content.basicLogId);
                } else {
                    this.uuids.push(row.content.basicLogId);
                }
            },

            getData: function () {
                return this.uuids;
            },
            // 版本对比
            compareVersion: function () {
                // 只允许选中两个版本
                if (this.uuids.length !== 2) {
                    // Vue.gvUtil.alert({
                    //     msg: Vue.gvUtil.getInzTranslate('specialAuditLogVersionChoose')
                    // });
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('specialAuditLogVersionChoose'));
                } else {
                    this.$emit('uuids', this.uuids);
                    // var eventHub = new Vue();
                    // this.eventHub.$emit('uuids', this.uuids);
                    // Vue.gvUtil.redirectTo({name: 'specialAuditLogAppSpecialLogAuditVersionComparasion', query: {uuids: this.uuids}});
                }
            }
        },
        methods: {
            initPage: function () {
                this.onGetList();
            },
            onGetList: function () {
                var params = this.getParamsMixin(this.specialAuditLog),
                    _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'specialAuditLogFindByBusinessNo',
                        contextName: 'auth',
                        urlParams: {business_no: this.businessNo},
                        serachParms: {pageSize: params._pageSize, pageNo: params._pageNo}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.mixinObject.searchSet.total = res.resData.specialAuditLogVoList.total;
                        _this.specialAuditLogList = res.resData.specialAuditLogVoList.content;
                    } else {
                        _this.specialAuditLogList = [];
                        _this.mixinObject.searchSet.total = 0;
                    }
                });
            }
        }
    });
});
