/**
 * 角色分配主页面
 * @author hjh
 * @time 2017/11/21
 */
define(function (require) {
    var temp = require('./roleAssignIndex.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'roleApp',
        datas: function () {
            return {
                saaRoleVoFilters: {
                    roleCode: 'admin'
                },
                saaRoleVoList: [
                    {
                        userCode: 'manager2',
                        userName: '项目经理2'
                    },
                    {
                        userCode: 'ClaimUser',
                        userName: '理赔用户'
                    },
                    {
                        userCode: 'System',
                        userName: 'alin'
                    }
                ]
            }
        },
        events: {
            handleSelectionChange: function () {

            }
        },
        methods: {

        }
    });
});