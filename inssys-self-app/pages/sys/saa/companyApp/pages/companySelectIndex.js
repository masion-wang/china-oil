/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./companySelectIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'companySelect',

        params: function () { // 双向绑定状态数据
        },
        datas: function () {
            return {
                treeData: [],
                treeLoading: false,
                tableName: 'ggcompany',
                defaultProps: {
                    children: 'children',
                    label: 'treeLabel'
                }
            }
        },
        query: function () { // 路由跳转传的参数，必须显式维护在此

        },
        events: {
            handleTreeChange: function () {
                this.$emit('callDialog', this.$refs.tree);
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                var _this = this;
                this.treeData = [];

                this.treeLoading = false;
                var param = {
                    tableName: this.tableName,
                    parentSql: ' companyCode = \'1\' ',
                    allSql: ''
                };
                $.extend(true, param, this.getParamsMixin());
                var url = Vue.gvUtil.getUrl({
                    apiName: 'treeSearch',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, param).then(function (res) {
                    if (res.resCode === '0000' && res.resData.result) {
                        _this.treeData.push(JSON.parse(res.resData.result));
                    } else {
                        _this.treeData = [];
                    }
                });
            }

        }
    });
});