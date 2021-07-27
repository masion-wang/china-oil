/**
 * 功能管理主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function(require) {
    return Vue.gvUtil.Page({
        template: require('./index.html'),
        name: 'taskApp',
        datas: function() { // 双向绑定页面显示数据
            return {
                table: {
                    basic: {
                        api: "sysTestSearch", //分页列表请求api
                        vo: "ggTestVoList", //分页列表返回的vo
                        context: "auth", //分页列表请求上下文
                        execl: { 'isShow': true, 'fileName': 'testExecl', 'exclude': ['Operation'] } //导出按钮控制，不需要可以删除此属性
                    },
                    search: { //查询域无数据
                        testcode: '',
                        testcname: '',
                        teststatus: ''
                    },
                    fields: [{ //结果列表配置，一个对象一列
                        prop: 'testcode',//属性
                        labelKey: 'testCode',//国际化key
                        width: '200px'//列宽度
                    }, {
                        prop: 'testcname',
                        labelKey: 'gCname'
                    }, {
                        prop: 'testtname',
                        labelKey: 'gTname'
                    }, {
                        prop: 'testename',
                        labelKey: 'testEname'
                    }, {
                        prop: 'teststatus',
                        labelKey: 'testStatus',
                        
                    }, {//配置最后列按钮
                        prop: null,
                        labelKey: 'gTitleOperation',
                        width: '320px',
                        btns: [{
                            btnKey: 'gBtnEdit',//国际化key
                            flag: 'edit',
                            type: 'btn'//类型按钮
                        }, {
                            btnKey: 'gBtnView',
                            flag: 'view',
                            type: 'btn'
                        }, {
                            btnKey: 'gBtnDelete',
                            flag: 'del',
                            type: 'btn'
                        }]
                    }]
                }
            }
        },
        events: {
            onListBtn: function(row, type) {
                switch (type) {
                    case 'edit':
                    case 'view':
                        this.handleEdit(row, type);
                        break;
                    case 'del':
                        this.handleDel(row);
                        break;
                }
            },
            onHandleAdd: function() {
                this.handleEdit(null, 'add');
            }
        },
        methods: {
            //查询前做的校验，如果返回真，调后台接口。
            //如果查询前不需要校验输入域是否满足条件，则可以去了些方法，在html哪也要相应把此方法删除
            beforeValidate: function(data) {
                console.log(data);
                return true;
            },
            // 删除
            handleDel: function(row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate(row.validInd === '1' ? 'gDisableContent' : 'gActivateContent')
                }).then(function() {
                    var validind = '1';
                    if (row.validInd === '1') {
                        validind = '0';
                    }
                    
                        url = Vue.gvUtil.getUrl({
                            apiName: 'sysTestDelete',
                            contextName: 'auth',
                            urlParams: {testcode:row.testcode}

                        });

debugger
                    Vue.gvUtil.http.get(url).then(function(res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === '1') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === '0') {
                                disableMessage = 'gIsDisable';
                            } else {
                                disableMessage = 'gSaveSuccess';
                            }
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(disableMessage)
                            }).then(function() {
                                _this.searchLists();
                            });
                        }
                    });
                })
            },
            // 查看|新增
            handleEdit: function(row, type) {
                debugger

                if(type=='add'){
                    Vue.gvUtil.redirectTo({
                        name: 'testAppTaskEdit',
                        query: { type: type},
                        
                        reMethods: this.searchLists,//编辑页面关闭后会调此方法，查询最新数据
                        isBlank: true//是否打开新标签页
                    })

                }else{
                Vue.gvUtil.redirectTo({
                    name: 'testAppTaskEdit',
                    
                    query: { type: type,testcode:row.testcode},
                    
                    reMethods: this.searchLists,//编辑页面关闭后会调此方法，查询最新数据
                    isBlank: true//是否打开新标签页
                })
            }
            }
        }
    });
});