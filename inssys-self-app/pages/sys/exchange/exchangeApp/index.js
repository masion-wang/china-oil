/**
 * 通过币别查询兑换率主页面
 * @author liguolong
 * @time 2018/9/29
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'exchangeApp',
        props: {
            dialogProp: {}
        },
        params: function() {
            return {
                isPreview: false,
                fileSize: 5
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                exchangeVoFilters: {
                    currency: null,
                    currencyCode: null,
                    startValidDate: null,
                    endValidDate: null
                },
                exchangeVoList: []
                
            }
        },
        events: {
            // 获取兑换率列表
            onGetList: function () {
                var _this = this;
                this.searchList('findExchangeList', 'auth', this.exchangeVoFilters, 'ggExchangeVoList', function (data) {
                    _this.exchangeVoList = data;
                });
            },
            // 清除表单
            onResetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            //改变币别
            onChangeCurreny: function() {
                //this.exchangeVoFilters.currencyCode=this.exchangeVoFilters.currency;
                // console.log(this.exchangeVoFilters.currencyCode);
            },
            // 添加兑换率
            onAddExchange: function () {
                 Vue.gvUtil.redirectTo({
                    name: 'exchangeInquiryAppAdd', // 跳转的路由
                    query: { // 传递的参数
                        type: 'aaa'
                            },
                    isBlank: 'true',
                    reMethods: this.onGetList,
                })
            },
            // 校验时间
            validateDate: function () {
                if (this.exchangeVoFilters.startValidDate && this.exchangeVoFilters.endValidDate) {
                    var compareResult = Vue.gvUtil.comPareDate(this.exchangeVoFilters.startValidDate, this.exchangeVoFilters.endValidDate);
                    if (compareResult === 1) {
                        Vue.gvUtil.message( Vue.gvUtil.getInzTranslate('gMsgStartEndDate'));
                        this.exchangeVoFilters.startValidDate = null;
                        this.exchangeVoFilters.endValidDate = null;
                    }
                }
            },
            // 查询结果导出
            onHandleExport: function () {
                var exclude = ['No'];
                if (this.exchangeVoList.length == 0) {
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gDataEmpty'));
                    return;
                }else{
                    Vue.gvUtil.exportExcel(this.$refs.exchangeVoListRef, 'exchangeVoList', '兑换率查询结果', null, exclude);
                }
            }
        }
    });
});