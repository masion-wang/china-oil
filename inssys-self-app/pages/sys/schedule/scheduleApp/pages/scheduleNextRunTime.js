/**
 * 
 * @author 黄景华
 * @time 2018/01/17
 */
define(function(require) {
	var temp = require('./scheduleNextRunTime.html');
	return Vue.gvUtil.Page({
		template: temp,
		name: 'scheduleNextRunTimeApp',

		params: function() { //双向绑定状态数据
            return {
                isReadonly: false, //输入域是否可编辑
            }
        },
        datas: function() {
		    return {
                cron:'',
                rs: [],
                dialogFlag : false,
		    }
		},
		query: function() { //路由跳转传的参数，必须显式维护在此
            return {
                cron: '',
            }
        },
        props: {
            cron: '',
        },
		events: { 
			//确认按钮（表单提交）
            onSubmit: function() {

            },
		},
		methods: {
            //初始化页面，低层直接调用
            initPage: function() {
                if(this.$root.dialogProp && this.$root.dialogProp.cron){
                    this.dialogFlag = true;
                    this.cron = this.$root.dialogProp.cron;
                }else{
                    this.cron = this.$props.cron;
                }
            },
            requestData: function(){
                var _this = this;
                var url = Vue.gvUtil.getUrl({
                    apiName    : 'sysScheduleTestCron',
                    contextName: 'schedule'
                });
                Vue.gvUtil.http.post(url,_this.cron).then(function (res) {
                   _this.rs = res.resData;
                });
            },
        },
        watch: {
            'cron': function (val, old) {
                this.requestData();
            }
        }
	});
});