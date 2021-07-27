/**
 * 文档管理主页面
 * @author luozhangli
 * @time 2018/11/28
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'documentApp',
        props: {
             dialogProp: {}
        },
        params:function() {
            return {
                pageParams: {
                    isShowDocument: true,
                },
            }
          
        },
        // 双向绑定页面显示数据
       datas:function() {
            return {
                documentVoFilters: {
                    documentName: null,
                },
                documentVoList: [],
            }
        },
        events:{
            //分页查询
             onGetList: function () {
               var _this = this;
                this.searchList('searchDocument', 'auth', this.documentVoFilters,'documentDefineList',  function (data) {
                    _this.documentVoList = data;
                });
            },

            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'documentEditApp',
                    query: {type: type, documentCode: row && row.documentCode},
                    reMethods: this.onGetList,
                    isBlank: true
                })
            },
        }


    });
});