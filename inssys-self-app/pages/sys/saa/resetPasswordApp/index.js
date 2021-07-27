/**
 * 修改密码主页面
 * @author 罗章理
 * @time 2018/12/17
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'resetPasswordApp',
        params: function(){
            return{
                isReadonly: true,
                rules: {}
            }
            
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                sysUserVoFilters: {
                    originalPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                },
            }
        },
        events: {
            // 提交更新
            onUpdate: function () {
                var newPassword = this.sysUserVoFilters.newPassword,
                    confirmNewPassword = this.sysUserVoFilters.confirmNewPassword,
                    regExp = '^(?=.*[a-z])(?=.*[A-Z]).{8,}$',
                    _this = this,
                    url;
                    if(newPassword.search(regExp)){
                        Vue.gvUtil.message('Please enter a password that includes uppercase and lowercase and length is not less than 8');
                        return;
                    }
                    if (newPassword.indexOf(" ")>=0 && confirmNewPassword.indexOf(" ")>=0) {
                        Vue.gvUtil.message('The new password cannot contain Spaces. Please retype it');
                        return;
                    }
                    if(newPassword === confirmNewPassword){
                       Vue.gvUtil.confirm({
                            msg:'Confirm changing password?'
                            }).then(function () {
                                url = Vue.gvUtil.getUrl({
                            apiName: 'resetPassword',
                            contextName: 'auth'
                        });
                         Vue.gvUtil.http.post(url, _this.sysUserVoFilters).then(function (res) {
                            if(res.resCode === '0000'){
                                Vue.gvUtil.alert({
                                    msg: Vue.gvUtil.getInzTranslate('gSaveSuccess')
                                }).then(function() {
                                    //跳转到登陆页面
                                 Vue.gvUtil.destroyApp(true);
                                });
                               
                            }
                           if(res.resCode === '0006'){
                                Vue.gvUtil.message('Please make sure the password is correct !');
                            }
                        });
                        
                        });
                 }else{
                    Vue.gvUtil.message('Please confirm whether the Confirm New Password is the same !');
                    return;
                 }
                    
            }
        },
        methods: {
            initRules:function(){
                this.rules = {
                    originalPassword: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    },{
                        validator:(rule,value,callback)=>{
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'checkingPassword',
                                contextName: 'auth'
                            });
                            Vue.gvUtil.http.post(url, this.sysUserVoFilters).then(function (res) {
                                if(res.resCode === '0006'){
                                    callback(new Error('Please make sure the password is correct !'))
                                }else{
                                    callback( )
                                }
                            })
                        },
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    },{
                        trigger: 'blur',
                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
                        message: 'Please enter a password that includes uppercase and lowercase and length is not less than 8',
                    },{
                        validator:(rule,value,callback)=>{
                        if(value===''){
                        callback(new Error('Please enter your password again !'))
                        }else if(value.indexOf(" ")>=0){
                        callback(new Error('The new password cannot contain Spaces. Please retype it'))
                        }else{
                        callback( )
                        }
                        },
                        trigger:'blur'
                    }],
                    confirmNewPassword: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                        },{
                        validator:(rule,value,callback)=>{
                        if(value===''){
                        callback(new Error('Please enter your password again !'))
                        }else if(value!==this.sysUserVoFilters.newPassword){
                        callback(new Error('Please confirm whether the Confirm New Password is the same !'))
                        }else{
                        callback( )
                        }
                        },
                        trigger:'blur'
                    },{
                        validator:(rule,value,callback)=>{
                        if(value===''){
                        callback(new Error('Please enter your password again !'))
                        }else if(value.indexOf(" ")>=0){
                        callback(new Error('The new password cannot contain Spaces. Please retype it'))
                        }else{
                        callback( )
                        }
                        },
                        trigger:'blur'
                    }]
                }
            }

        },
        
    });
});
