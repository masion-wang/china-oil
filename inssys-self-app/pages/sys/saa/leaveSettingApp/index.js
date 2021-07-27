/**
 * 设置休假
 * @author 孙恬静
 * @time 2019/01/12
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'resetPasswordApp',
        params: function(){
            return {
                pickerOptions: {
                    disabledDate: function (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                isReadonly: true,
                rules: {},
                buddyPreQuery: {
                    companyCode: '',
                    userCode: ''
                },
            }
            
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    startDateOnLeave: null,
                    startTimeOnLeave: '',
                    endDateOnLeave: null,
                    endTimeOnLeave: '',
                    userCode: '',
                    companyCode: ''
                },
            }
        },
        events: {

            onResetForm: function (formName) {
                
                this.form.startDateOnLeave = null;
                this.form.startTimeOnLeave = '';
                this.form.endDateOnLeave = null;
                this.form.endTimeOnLeave = '';
                
            },
            validateDateOnLeave: function () {
                if (this.form.endDateOnLeave && this.form.startDateOnLeave) {
                    if (this.form.endDateOnLeave < this.form.startDateOnLeave) {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('sysUserEarlierDateMsg'));
                        return false;
                    }
                }
                if (this.form.endDateOnLeave || this.form.startDateOnLeave || this.form.endTimeOnLeave || this.form.startTimeOnLeave) {
                    if (!this.form.endDateOnLeave || !this.form.startDateOnLeave || !this.form.endTimeOnLeave || !this.form.startTimeOnLeave || !this.form.buddy) {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('sysUserEnterLeaveTime'));
                        return false;
                    }
                }
                return true;
            },
            // 提交更新
            onUpdate: function () {
                var _this = this;
                this.isValidator = false;
                this.$refs.form.validate(function (valid) {
                    _this.isValidator = true;
                    if(!_this.validateDateOnLeave()) {
                        return false;
                    }
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'setLeaveDate',
                                contextName: 'auth'
                            });

                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });       
            }
        },
        methods: {
            initRules:function(){
                this.rules = {
                    startDateOnLeave: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    endDateOnLeave: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                }
            },
            initPage:function(){
                var _this = this;
                var url = Vue.gvUtil.getUrl({
                    apiName: 'findLeaveDate',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.get(url).then(function(res) {
                    if (res.resCode === '0000') {
                        _this.form = res.resData;
                        _this.buddyPreQuery.userCode = res.resData.userCode;
                        _this.buddyPreQuery.companyCode = res.resData.companyCode;
                    }
                })
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccess')
                    });
                }
            }

        },
        
    });
});
