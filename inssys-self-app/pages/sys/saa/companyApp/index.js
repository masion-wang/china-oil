/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./index.html'),
        CompanyEditIndex = require('./components/companyEditIndex');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'companyApp',
        params: function () { // 双向绑定状态数据
            return {
                edit: {
                    show: false,
                    type: '',
                    companyCode: ''
                },
            }
        },
        datas: function () {
            return {
                table: {
                    basic: {
                        api: "findGgCompanyList", //分页列表请求api
                        vo: "ggCompanyList", //分页列表返回的vo
                        context: "auth", //分页列表请求上下文
                        singleElection: false,//是否支持单选  获取选中数据 this.$refs.table.getSelectData()
                        multipleElection: false,//是否支持多选  获取选中数据 this.$refs.table.getSelectData()
                        execl: { 'isShow': true, 'fileName': 'testExecl', 'exclude': ['Operation'] } //导出按钮控制，不需要可以删除此属性
                    },
                    search: { //查询域元数据
                        companyCode: null,
                        upperCompanyCode: null,
                        companyLevel: null,
                        companyName: null,
                        validInd: ''
                    },
                    fields: [{ //结果列表配置，一个对象一列
                        prop: 'companyCode',//属性
                        labelKey: 'ggCompanyVoCompanyCode',//国际化key
                        width: '200px'//列宽度
                    }, {
                        prop: 'upperCompanyCode',
                        labelKey: 'ggCompanyVoUpperCompanyCode'
                    }, {
                        prop: 'companyLevel',
                        labelKey: 'ggCompanyVoCompanyLevel'
                    }, {
                        prop: 'companyName',
                        labelKey: 'ggCompanyVoCompanyName'
                    }, {
                        prop: 'validInd',
                        labelKey: 'ggCompanyVoValidInd',
                        width: '100px',
                        btns: [{
                            flag: 'del',
                            type: 'icon'//类型按钮 icon/a/btn
                        }]
                    }, {//配置最后列按钮
                        prop: null,
                        labelKey: 'gTitleOperation',
                        width: '200px',
                        btns: [{
                            btnKey: 'gBtnEdit',//国际化key
                            flag: 'edit',
                            type: 'btn'//类型按钮
                        }, {
                            btnKey: 'gBtnView',
                            flag: 'view',
                            type: 'btn'
                        }]
                    }]
                },
                ggCompanyVoFilters: {
                    companyCode: null,
                    upperCompanyCode: null,
                    companyLevel: null,
                    companyName: null,
                    validInd: ''
                },
                ggCompanyList: []
            }
        },
        events: {
            onListBtn: function(row, type) {
                switch (type) {
                    case 'edit':
                    case 'view':
                        this.onHandleEdit(row, type);
                        break;
                    case 'del':
                        this.onHandleDel(row);
                        break;
                }
            },
            onHandleAdd: function() {
                this.onHandleEdit(null, 'add');
            },
            onHandleEdit: function (row, type) {
                this.edit.companyCode = row ? row.companyCode : '';
                this.edit.show = true;
                this.edit.type = type;
            },
            onClose: function () {
                this.edit.show = false;
            },
            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === true ? 'gDisableContent' : 'gActivateContent')
                }).then(function () {
                    var validInd = true;
                    if (row.validInd === true) {
                        validInd = false;
                    }
                    var company = {
                            validInd: validInd,
                            companyCode: row.companyCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'ggCompanyDeleteByPk',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, company).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === 'true') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === 'false') {
                                disableMessage = 'gIsDisable';
                            } else {
                                disableMessage = 'gSaveSuccess';
                            }
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(disableMessage)
                            }).then(function () {
                                _this.searchLists();
                            });
                        }
                    });
                })
            }
        },
        components: {
            CompanyEditIndex: CompanyEditIndex
        }
    });
});