/**
 * 发送邮件模态页面
 * @author 
 * @time 2018-10-17 14:43:08
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name    : 'printEmailApp',
        props   : {
            dialogProp : {},
        },
        params: function () { // 双向绑定状态数据
            return {
                rules : {},
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                vo : {
                    receiverValue :'',
                    contentValue :'',
                    titleValue :'',
                    attachment :'',
                    attachments:[{
                    	fileName: "",
                    	params : "",
                        docId:"",
                    	attachmentBytes: "",
                    }]
                },
            }
        },
        events: {
            send: function() {
                console.log(this.vo);
                var url = Vue.gvUtil.getUrl({
                    apiName: 'send_email',
                    contextName: 'auth'
                });
                url = "/system/gg_message/message_config/send_email";
                var params = {
                    receiverValue : this.vo.receiverValue,
                    contentValue : this.vo.contentValue,
                    titleValue : this.vo.titleValue,
                    attachments : this.vo.attachments,
                }
                Vue.gvUtil.http.post(url, params).then(function (res) {
                    if(res.resCode === "0000"){
                        if(res.resData === '4'){
                            Vue.gvUtil.alert({
                                msg: 'Send Success'
                            }).then(function () {});
                        }else{
                            Vue.gvUtil.alert({
                                msg: 'Send Fail'
                            }).then(function () {});
                        }
                    }
                });
            },
            searchEmail: function(){
                
            },
            returnPage: function(){
                this.$emit('callDialog', {});
            },
        },
        methods: {
            initPage: function () {
                if(this.$props.dialogProp.attachment){
                    var attachments = [];
                    var attachmentVo = {
                        fileName : this.$props.dialogProp.fileName,
                        attachmentBytes : this.$props.dialogProp.attachment,
                        docId : this.$props.dialogProp.docId,
                    };
                    attachments.push(attachmentVo);
                    this.vo.attachments = attachments;
                    console.log(attachments);
                }else{
                    //多个附件发送邮件（理赔需求）
                	this.requestAttachment();
                }
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                
            },
            requestAttachment: function(){
            	var _this = this;
            	_this.vo.attachments = _this.$props.dialogProp.attachments;
                var list = _this.vo.attachments;
                
            	for(var i = 0 ; i<list.length;i++){
            		(function (i) { 
                        console.log(list[i].params);
		                var url = "/report/tpsgi/print/pdfBASE64ForBaseResponse?"+list[i].params;
		                Vue.gvUtil.http.get(url).then(function (res) {
                            _this.$set(list[i],"attachmentBytes",res.resData);
		                });
	            	})(i);
                }

            }
        }
    });
});