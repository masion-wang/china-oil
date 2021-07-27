/**
 * 文档编辑
 * @author luozhangli
 * @time 2018/11/28
 */
 define(function (require) {
    var temp = require('./documentEditIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'documentEditApp',

    query: function () {
            return {
                type: 'add'
            }
        },
    params: function () { // 双向绑定状态数据
        return {
            isReadonly: false, // 输入域是否可编辑
            rules: {}
        }
    },
    datas: function () {
        return {
            form: {
                documentCode: '',
                documentName: '',
                businessType: '',
                validInd: '1',
                remark: '',
                formDefineVoList: []
            },
            formDefineVoList: {
                innerproduct: null,
                formCode:null,
            },
        }
    },
    events:{
         // 新增一行
            onAddAttrs: function () {
                let index = this.form.formDefineVoList.length;
                this.$set(this.form.formDefineVoList, index, {
                    formCode: '',
                    formName: '',
                    documentCode: '',
                    documentName: '',
                    inputInd: '',
                    inputFormUrl: '',
                    processInd: '',
                    processId: '',
                    processName: '',
                    businessApi: '',
                    approvalApi: '',
                    endTaskApi: '',
                    validInd: 1,
                    readonly: false
                });            
                this.rules['formDefineVoList.' + index + '.formCode'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];
                this.rules['formDefineVoList.' + index + '.documentCode'] = [{
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                    trigger: 'blur'
                }];

            },
         // 删除一行
            onDeletes: function (prop, index) {
                this.form[prop].splice(index, 1)
            },
            //clear按钮
            resetForm: function(formName){
                this.$refs[formName].resetFields();
            },
            selectForm:function(row,obj){
                var _formCode = row.formCode;
                var urlForm = Vue.gvUtil.getUrl({
                    apiName: 'findByDocCode',
                    contextName: 'auth',
                    urlParams: {
                        _formCode: this.query.formCode
                    }
                });
                Vue.gvUtil.http.get(urlForm).then(function (res) {
                    if (res.resCode === '0000') {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gRepeatedFormCode'));
                    }
                });
            }

    },

    methods: {
        // 初始化校验，低层直接调用
        initRules: function () {
            this.rules = {
                documentCode: [{
                    trigger: 'blur',
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                }],
                documentName: [{
                    trigger: 'blur',
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                }],
                businessType: [{
                    trigger: 'blur',
                    required: true,
                    message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                }],
            };
        },
         // 初始化页面
        initPage: function () {
            if (this.query.type === 'view') {
                this.isReadonly = true;
            }
           if (this.query.type && this.query.type !== 'add') {
                    this.requestData();
                }
        },

         // 回显
            requestData: function () {
                var _this = this,
                url = Vue.gvUtil.getUrl({
                    apiName: 'findByDocumentCode',
                    contextName: 'auth',
                    urlParams: {
                        documentCode: this.query.documentCode
                    }
                });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        $.extend(true, _this.form, res.resData.ggDocumentByCode)
                    }
                });

                var urlForm = Vue.gvUtil.getUrl({
                    apiName: 'findByDocCode',
                    contextName: 'auth',
                    urlParams: {
                        documentCode: this.query.documentCode
                    }
                });
                Vue.gvUtil.http.get(urlForm).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.form.formDefineVoList = res.resData.ggFormDefineVoList
                    }
                });
            },
             // 返回上一页
            returnPage: function (){
                Vue.gvUtil.redirectBack(true);
            },

            //确定按钮（表单提交）
            onSubmit: function(){
                var _this = this,
                    url;
                this.$refs.form.validate(function(valid){
                    if(valid){
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'saveDocDefine',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateDocDefine',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }        
                    
                });
               
            },
             // 保存成功后回调的方法
            successSubmit: function (data) {
                // var _this = this;
                if (data.resCode === '0000') {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    });
                }
            },
    },    
    });
});
