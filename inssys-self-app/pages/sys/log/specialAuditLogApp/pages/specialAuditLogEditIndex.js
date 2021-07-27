/**
 * 特殊审计日志管理查看页面
 * @author 孙恬静
 * @time 2017/11/08
 */
define(function (require) {
    var temp = require('./specialAuditLogEditIndex.html'),
        VersionCompare = require('../components/specialAuditLogVersionCompareIndex'),
        TwoVersionsCompare = require('../components/specialAuditLogTwoVersionsCompareIndex'),
        FieldCompare = require('../components/specialAuditLogFieldCompareIndex'),
        Detail = require('../components/specialAuditLogDetailIndex');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogAppSpecialAuditLogEdit',
        params: function () { // 双向绑定状态数据
            return {
                uuids: [],
                versionCompareEnable: true,
                twoVersionCompareEnable: false,
                detailEnable: false,
                tabs: {// Tabs页控制参数
                    activeName: 'versionCompare'// 默认打开的tabs页
                },
                eventHub: {},
                uuid: ''
            }
        },
        query: function () {
            return {
                businessNo: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                specialAuditLogList: [],
                form: {
                    businessNo: ''
                }
            }
        },
        props: {
            dialogProp: null
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            returnDetailListPage: function () {
                this.versionCompareEnable = true;
                this.twoVersionCompareEnable = false;
                this.detailEnable = false;
            },
            compareVersion: function () {
                this.uuids = this.$refs.specialAuditLogVersionCompareForm.getData();
                if (this.uuids.length !== 2) {
                    // Vue.gvUtil.alert({
                    //     msg: Vue.gvUtil.getInzTranslate('specialAuditLogVersionChoose')
                    // });
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('specialAuditLogVersions'));
                } else {
                    this.versionCompareEnable = false;
                    this.detailEnable = false;
                    this.twoVersionCompareEnable = true;
                }
            },
            onHandleEdit: function () {
                this.uuids = this.$refs.specialAuditLogVersionCompareForm.getData();
                if (this.uuids.length !== 1) {
                    // Vue.gvUtil.alert({
                    //     msg: Vue.gvUtil.getInzTranslate('specialAuditLogVersionChoose')
                    // });
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('specialAuditLogVersionChoose'))
                } else {
                    this.uuid = this.uuids[0];
                    this.versionCompareEnable = false;
                    this.detailEnable = true;
                    this.twoVersionCompareEnable = false;
                }
            },

            // 页码变动
            onHandleCurrentChange: function (val) {
                this.currentChangeMixin(val);
            },
            // 查询行数变动
            onHandleSizeChange: function (val) {
                this.sizeChangeMixin(val);
            }
        },
        methods: {
            initPage: function () {
                this.eventHub = new Vue();
                if(this.dialogProp){//模态框打开-理赔调用
                    this.query.businessNo = this.dialogProp.businessNo;
                }
                this.form.businessNo = this.query.businessNo;
                this.onGetList();
            },
            getDetailShow: function (detailShow) {
                this.detailEnable = detailShow;
            },
            onGetList: function () {
                var params = this.getParamsMixin(this.specialAuditLog),
                    _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'specialAuditLogFindByBusinessNo',
                        contextName: 'auth',
                        urlParams: {business_no: this.query.businessNo},
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
        },
        components: {
            VersionCompare: VersionCompare,
            TwoVersionsCompare: TwoVersionsCompare,
            FieldCompare: FieldCompare,
            Detail: Detail
        }
    });
});
