/**
 * 通过币别兑换率添加页面
 * @author liguolong
 * @time 2018/9/29
 */
define(function (require) {
    var temp = require('./addExchangeIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'exchangeInquiryAppAdd',
        params: function() {
            return {
                isPreview: false,
                fileSize: 5,
                rules:{},
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                exchangeVoFilters: {
                    currencyCode: null,
                    exrate: null,
                    validDate:null
                },
                exchangeVoList: [],
            }
        },
        events: {
            // 添加币别汇率
            onExchangeAdd: function () {
                var _this=this;
                //检验兑换率数据
                this.$refs.exchangeVoFilters.validate(function(valid) {
                    if(valid){
                        var params = _this.exchangeVoFilters,
                        url = Vue.gvUtil.getUrl({
                            apiName: 'addExchange',
                            contextName: 'auth'
                        });
                        Vue.gvUtil.http.post(url, params).then(function (res) {
                            if (res.resCode === '0000') {
                                _this.isPreview=true;
                                // _this.onResetForm('exchangeVoFilters');
                                Vue.gvUtil.alert({
                                    msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                                }).then(function() {
                                    Vue.gvUtil.redirectBack(true, true);
                                });
                            } else {
                                Vue.gvUtil.alert({
                                    msg: res.resData
                                });
                            }
                        });
                    }
                });
            },
            // 金钱格式化
            formatMoney: function (row, column) {
                return Vue.filter('money')(row[column.property], true, 2)
            },
            // 关闭子页面返回主页面
            onHandleReturn: function () {
                 Vue.gvUtil.redirectBack(true, true);
            }
        },
        methods: {
            //初始化校验
            initRules: function() {
                this.rules = {
                    exrate: {trigger: 'change', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')},
                    validDate:   {trigger: 'change', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')},
                    currencyCode:   {trigger: 'change', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}
                }
            }
        }
    });
});