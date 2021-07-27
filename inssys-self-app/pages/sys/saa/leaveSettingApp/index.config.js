/**
 * 修改密码应用配置
 * @author 罗章理
 * @time 2018/12/17
 */
(function () {
    return {
        api: {
           'setLeaveDate': '/user/set_leave',
           'findLeaveDate': '/user/find_leave_date'
        },
        router: [{
            path: '/sys/saa/reset_password_app',
            component: Vue.gvUtil.getComponents('Home'),
        }]
    };
})();
