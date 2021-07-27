/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'mqApp',

        datas: function () {
            return {
                mq: {},
                mqMessageList: []
            }
        },
        events: {
            onGetList: function () {
                console.log(this.mq);
                var params = this.getParamsMixin(this.mq),
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findMQMessageList',
                        contextName: 'auth',
                        serachParms: {_pageSize: params._pageSize, _pageNo: params._pageNo}
                    }),
                    _this = this;
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if (res.resCode === '0000') {
                        // _this.mixinObject.searchSet.total = res.resData.list.total;
                        _this.mqMessageList = res.resData.list;
                    } else {
                        _this.mqMessageList = [];
                        _this.mixinObject.searchSet.total = 0;
                    }
                });


                // this.mixinObject.searchSet.total = 4;

                // this.mqMessageList.push({
                //     messageId : "0AFFC14000002A9F00000000000066CE",
                //     tag : "System",
                //     id : "id",
                //     storeTime : "2018-01-19 11:06:16",
                // });
                // this.mqMessageList.push({
                //     messageId : "0AFFC14000002A9F0000000000006609",
                //     tag : "System",
                //     id : "id",
                //     storeTime : "2018-01-19 11:04:36",
                // });
                // this.mqMessageList.push({
                //     messageId : "0AFFC14000002A9F0000000000006540",
                //     tag : "System",
                //     id : "id",
                //     storeTime : "2018-01-19 10:31:22",
                // });
                // this.mqMessageList.push({
                //     messageId : "0AFFC14000002A9F0000000000006477",
                //     tag : "System",
                //     id : "id",
                //     storeTime : "2018-01-19 10:25:34",
                // });
            },
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'mqAppEdit',
                    query: {type: type, messageId: row.offsetMsgId},
                    reMethods: this.onGetList,
                    isBlank: true
                })
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
            // 时间格式化
            formatDate: function (row, column) {
                return Vue.filter('time')(row[column.property], 'yyyy-MM-dd HH:mm:ss');
            }
        }
    });
});
