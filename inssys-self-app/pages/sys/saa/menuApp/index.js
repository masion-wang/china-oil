/**
 * 功能管理主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'menuApp',
        params: function () { // 双向绑定状态数据
            return {
                defaultProps: {
                    children: 'children',
                    label: 'Clabel'
                }
            }
        },
        datas: function () {
            return {
                menus: [],
                allMenus: []
            }
        },
        events: {
            onHandleEditResource: function () {
                var datas = this.$refs.resource.getCheckedNodes();
                if (datas.length !== 1) {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('sysResourceSelectOpt')
                    });
                    return;
                }
                if (datas[0].ids === 0) {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('sysResourceChooseOther')
                    });
                    return;
                }
                var q = {};
                q.id = datas[0].ids;
                q.type = 'view';
                Vue.gvUtil.redirectTo({
                    name: 'menuAppEdit',
                    query: q,
                    reMethods: this.getMenuList,
                    isBlank: true
                })
            },
            onHandleEdit: function (type) {
                var datas = this.$refs.tree.getCheckedNodes(),
                    data = {},
                    q = {};
                if (type !== 'add') {
                    if (datas.length > 1 || datas.length === 0) {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('sysMenuSelectMenuOpt')
                        });
                        return;
                    }
                    data = datas[0];
                    q.id = data.ids;
                } else {
                    if (datas.length > 1) {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('sysMenuSelectMenuOpt')
                        });
                        return;
                    }
                    if (datas.length === 1) {
                        data = datas[0];
                        if (data.flag !== '0') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('sysMenugSelectBtnOpt')
                            });
                            return;
                        }
                        q.parentId = data.ids + '';
                        q.menuLevel = data.menuLevel;
                    } else {
                        q.parentId = '1';
                        q.menuLevel = 1;
                    }
                }
                q.type = type;
                Vue.gvUtil.redirectTo({
                    name: 'menuAppEdit',
                    query: q,
                    reMethods: this.getMenuList,
                    isBlank: true
                })
            },
            // 删除
            onHandleDel: function () {
                var _this = this,
                    // datas = this.$refs.tree.getCheckedNodes();
                    datas = this.$refs.tree.getCheckedKeys().join();

                // if (datas.length > 1 || datas.length == 0) {
                //     Vue.gvUtil.alert({
                //         msg: Vue.gvUtil.getInzTranslate('sysMenuSelectMenuOpt')
                //     });
                //     return;
                // }
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    var url = Vue.gvUtil.getUrl({
                        apiName: 'sysMenuDeletes',
                        contextName: 'auth',
                        urlParams: {
                            id: datas
                        }
                    });
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate('gDeleteSuccess')
                            });
                            _this.getMenuList();
                        }
                    });
                })
            }
        },
        methods: {
            initPage: function () {
                var _gc = localStorage.getItem('_i18') || 'en';
                if (_gc === 'en') {
                    this.defaultProps.label = 'elabel';
                }
                // this.defaultProps.label = localStorage.getItem('_i18') !== 'en' ? 'clabel' : 'elabel';
                this.getMenuList();
                this.getAllMenus();
            },
            getMenuList: function () {
                // 获取所有功能菜单
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysAllMenuSearch',
                        contextName: 'auth',
                        urlParams: {
                            systemCode: 'platform'
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.menus = res.resData.navMenusData.children || []; // JSON.parse(res.resData.navMenusData).navMenus;
                    }
                });
            },

            getAllMenus: function () {
                // 获取所有功能菜单
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysFindAllMenu',
                        contextName: 'auth',
                        urlParams: {
                            systemCode: 'platform'
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.allMenus = res.resData.children || [];
                    }
                });
            }

        }
    });
});