/**
 * 控制台添加菜单页面
 * @author 孙恬静
 * @time 2018/03/07
 */
define(function (require) {
    var temp = require('./menuAddIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'selfDefineChoose',
        props: {
            dialogProp: {
            }
        },
        params: function () { // 双向绑定状态数据
            return {
                ggCodeVo: {
                    codeType: 'selfDefineChoose',
                    flag: '1'
                },
                isMenuChange: false,
                rules: {},
                menuIds: [],
                isChoosedDisplay: true,
                isChooseItemDisplay: true
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    chooseImgSrc: '',
                    pageName: '',
                    pathName: '',
                    menuCname: '',
                    menuEname: '',
                    menuId: 0
                },
                menus: [],
                defaultProps: {
                    children: 'children',
                    label: 'clabel',
                    id: 'id'
                },
                menuDefaultCheckedKeys: [],
                availableImgs: [{
                    row: [{
                        src: './dist/img/dispatch.png'
                    }, {
                        src: './dist/img/check.png'
                    }, {
                        src: './dist/img/handle.png'
                    }]
                }, {
                    row: [{
                        src: './dist/img/handle-time.png'
                    }, {
                        src: './dist/img/past-handle.png'
                    }, {
                        src: './dist/img/report.png'
                    }, {
                        src: './dist/img/handle-efficiency.png'
                    }]
                }],
                taskMenus: [],
                choosedMenus: []
            }
        },
        events: {

            onDeletes: function (menuId, index) {
                this.choosedMenus.splice(index, 1);
                this.menuIds.push(menuId);
            },
            choose: function (row) {
                this.form.menuCname = row.menuCname;
                this.form.menuEname = row.menuEname;
                this.form.menuId = row.menuId;
            },
            onMenuChange: function () {
                this.isMenuChange = true;
            },
            onSubmit: function () {
                // var datas = this.$refs.tree.getCheckedNodes();
                // var chooseMenus = this.findChildMenu(datas);
                // if (chooseMenus.length > 1) {
                //     Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('selfDefineChooseOneMenu'));
                //     return;
                // }
                // var menu = chooseMenus[0];
                // var ggCode = {};
                // ggCode['codeCode'] = menu.url;
                // ggCode['codeName'] = this.form.pageName + "," + this.form.chooseImgSrc;
                // ggCode['flag'] = '0';
                var _this = this;
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'addSelfDefineInfo',
                                contextName: 'auth'
                            });
                            Vue.gvUtil.http.post(url, _this.form.menuId).then(function (res) {
                                if (res.resCode === '0000') {
                                    url = Vue.gvUtil.getUrl({
                                        apiName: 'deleteSelfDefineMenus',
                                        contextName: 'auth'
                                    });
                                    var menuIdStr = _this.menuIds.length === 0 ? '0' : _this.menuIds.toString();
                                    Vue.gvUtil.http.post(url, menuIdStr).then(function (res) {
                                        if (res.resCode === '0000') {
                                            Vue.gvUtil.alert({
                                                msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                                            }).then(function () {
                                                _this.onCloseDialog();
                                                _this.$emit('callDialog');
                                            });
                                        }
                                    })
                                }
                            });
                        });
                    }
                });
            },
            // 关闭模态窗口
            onCloseDialog: function () {
                this.$emit('closeDialog');
            },
            chooseImg: function (index, colIndex) {
                this.form.chooseImgSrc = this.availableImgs[index].row[colIndex].src;
            }
        },
        methods: {
            // 页面初始化
            initPage: function () {
                // this.onGetList();
                this.requestMenu();
                this.requestEntryMenus();
            },

            requestEntryMenus: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findSelfDefineMenuForUser',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.choosedMenus = res.resData;
                        if (_this.choosedMenus.length === 0) {
                            _this.isChoosedDisplay = false;
                        }
                    }
                });
            },
            // 初始化校验，低层直接调用
            // initRules: function() {
            //     this.rules = {
            //         menuCname: [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
            //         menuEname: [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}]
            //     };
            // },
            requestMenu: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findSelfDefineInfo',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.taskMenus = res.resData;
                        if (_this.taskMenus.length === 0) {
                            _this.isChooseItemDisplay = false;
                        }
                    }
                });
            },
            findChildMenu: function (datas) {
                var chooseMenus = [];
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].children.length === 0) {
                        chooseMenus.push(datas[i]);
                    }
                }
                return chooseMenus;
            },
            onGetList: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findSelfDefineInfo',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.post(url, this.ggCodeVo).then(function (res) {
                    if (res.resCode === '0000') {
                        var ggCodeList = res.resData;
                        for (var i in ggCodeList) {
                            var menu = {};
                            menu['pathName'] = ggCodeList[i].codeCode;
                            menu['pageName'] = ggCodeList[i].codeName;
                            _this.taskMenus.push(menu);
                        }
                    }
                });
            }
        }
    });
});
