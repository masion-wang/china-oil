/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./messageSendEmail.html');
    var SelectTopic = require('../../../../product/ins_arrange/scheme/proposalSearchApp/index');
    var config = {
        api: {
            'findGgMessageModelList': '/gg_message/find_ggmessagemodel_list',
            'findModelByModelCode': '/gg_message/find_model_by_modelcode/{modelCode}',
            'updateMessageModel': '/gg_message/update_messagemodel',
            'saveMessageModel': '/gg_message/save_ggmessagemodel',
            'messageModelDelete': '/gg_message/message_model/delete',
            'sendEmail': '/gg_message/sendEmail',
            'uploadEmail': '/upload/uploadEmail',
        },

    };
    Vue.gvUtil.setApi(config.api);
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageSendEmail',

        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false, // 输入域是否可编辑
                rules: {}
            }
        },
        datas: function () {
            return {
                insertkeys: [],
                content: '',
                value: '',
                form: {
                    modelCode: '',
                    dataSetType: '02',
                    modelType: '01',
                    modelName: '',
                    dataSet: ''
                },
                ggMessageModelParamList: [],
                isDialog: false, // 是否对话框
                options: [{ userName: '王五', email: '1121034507@qq.com' }, { userName: '李四', email: '2103623596@qq.com' }],
                emails:['王五','李四'],
                emailsCopy:[],
                editEmails:[],
                editEmailDialog:false,
                value: "各位编制岗同事：<br/> &nbsp&nbsp&nbsp&nbsp" + "XXX项目已经生成，请各位编制岗同时及时编制计划" + "<br/> <br/>" +"谢谢！祝身体健康，工作顺利<br/>中海油项目编制处",
                topic:'项目编制完成通知',
                emailAddress:[],
                sendEmailVo:{},
                fileList: [],
                currentTimeDir:'',
                filePath:[],
                fileNum:0,
                selectEmailDialog:false
            }
        },
    
        props: {
            dialogProp: {
                    type:'',
                    name: '',
                    code: '',
                    emailList:[],
                    usercode:''
            }



        },
        events: {
            // 确认按钮（表单提交）
            // submitUpload() {
            //     debugger
            //     this.fileList
            //     this.handlePreview()
            //     this.$refs.upload.submit();
            // },
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            // handlePreview(file) {
            //     console.log(file);
            // },
            uploadEmail(file) {

                debugger
                var url = Vue.gvUtil.getUrl({
                    apiName: 'uploadEmail',
                    contextName: 'auth',
                   
                   
                });
                    formData = new FormData();
                formData.append('file', file.file)
                formData.append('filename', file.file.name)
                formData.append('currentTimeDir', this.currentTimeDir)

                Vue.gvUtil.http.post(url, formData).then(res => {
                    if (res.resCode == '0000') {
                        this.filePath.push(res.resData.storagePath)
                        this.fileNum--
                        if (this.fileNum==0){
                            this.sendEmail()
                        }
                       
                    }else{
                        this.$message.error('上传失败！文件不得大于100M')
                        return
                    }
                   
                })
            },
            
            submitUpload() {
                this.$refs.upload.submit();
            },
            
            handleChange(file, fileList) {
                debugger
                this.fileNum = fileList.length
                this.fileList = fileList.slice(-3);
                
            },
            handleRemove(file, fileList) {
                this.fileNum = fileList.length
                //console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            editEmail(){
                this.editEmails = []
                this.emails.forEach(element => {
                    this.options.forEach(item=>{
                        if(element==item.userName){
                            this.editEmails.push(item)

                        }
                    })                 
                });
                this.editEmailDialog = true
            },
            sendEmail(){
                debugger
                if (this.emails.length==0){
                    this.$message("发送人不能为空")
                    return
                }
                if(this.fileNum==0){
                    this.sendEmailNoFile()
                }else{
                    this.submitUpload()
                }

            },
            sendEmailNoFile(){
                debugger
                this.emailAddress = []
                this.emails.forEach(element => {
                    this.options.forEach(item => {
                        if (element == item.userName) {
                            this.emailAddress.push(item.email)

                        }
                    })
                });

                this.sendEmailVo.emailAddress = this.emailAddress
                this.sendEmailVo.topic = this.topic
                this.sendEmailVo.content = this.value
                this.sendEmailVo.attachments = this.filePath

                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sendEmail',
                        contextName: 'auth',
                        // urlParams: {
                        //     modelCode: this.form.modelCode
                        // }
                    });
                Vue.gvUtil.http.post(url, this.sendEmailVo).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.$message.success("操作成功")
                    }else{
                        _this.$message("操作失败")
                    }
                    _this.filePath = []
                    _this.$emit('closeDialog', this.form);
                });


            },
            closeEmail(){},
            reset(){

            },
            must: function (obj) {
                // console.log(obj.columnIndex);
                if (obj.columnIndex == 0 || obj.columnIndex == 1) {
                    return 'must';
                }
            },
            handleCloseEditEmail(){

            },
            deleteEmail(index){
                debugger
                this.editEmails.splice(index,1)

            },
            confirmEmail(){
                debugger
                for(var i=0;i<this.editEmails.length;i++){
                    for(var j=0;j<this.options.length;j++){
                        if (this.editEmails[i].userName ==this.options[j].userName){
                            this.options[j].email = this.editEmails[i].email
                        }
                    }

                    
                }

                for (var m = 0; m < this.emails.length; m++) {
                    var flag = 0;
                    for (var n = 0; n < this.editEmails.length;n++){
                        if (this.emails[m] == this.editEmails[n].userName){
                            flag = 1
                            break;
                        }
                    }
                    if(flag==0){
                        this.emails.splice(m,1)
                        m--;
                    }
                    
                    }

                this.editEmailDialog = false




            },
            onSubmit: function () {
                for (var i = 0; i < this.ggMessageModelParamList.length; i++) {
                    var obj = this.ggMessageModelParamList[i];
                    obj.paramNo = i + 1;
                }
                this.form.ggMessageModelParamList = this.ggMessageModelParamList;
                var _this = this,
                    url;
                this.dataSetTypeChange();
                this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.gvUtil.getInzTranslate('gSaveSubmit')
                        }).then(function () {
                            if (_this.dialogProp.query.type === 'add') {
                                // 新增
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'saveMessageModel',
                                    contextName: 'auth'
                                });
                            } else {
                                // 更新
                                url = Vue.gvUtil.getUrl({
                                    apiName: 'updateMessageModel',
                                    contextName: 'auth'
                                });
                            }
                            Vue.gvUtil.http.post(url, _this.form).then(function (res) {
                                if (_this.isDialog) {
                                    _this.dialogSuccessSubmit();
                                } else {
                                    _this.successSubmit(res)
                                }
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            validateModelCode: function (rule, value, callback) {
                if (this.dialogProp.query.type === 'view' || this.dialogProp.query.type === 'edit') {
                    callback();
                    return;
                }
                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateModelCode',
                    contextName: 'auth'
                });
                Vue.gvUtil.http.post(url, value).then(function (res) {
                    if (res.resCode === '0000' && res.resData.existFlag === '1') {
                        callback();
                    } else {
                        callback(new Error(Vue.gvUtil.getInzTranslate('gValidateCode')));
                        // Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateCode'));
                    }
                });
            },
            // 清除表单
            resetForm: function (formName) {
                var modelCode = this.form.modelCode;
                this.$refs[formName].resetFields();
                if (this.dialogProp.query.type === 'edit') {
                    this.form.modelCode = modelCode;
                }
            },
            // 返回上一页
            returnPage: function () {
                this.$emit('closeDialog', this.form);
            },
            onEditorChange: function (val) {
                this.form.modelContent = val.text;
            },
            // 增加
            onAdd: function () {
                // 以后改成 异步查重检验
                if (this.form.modelCode === '') {
                    Vue.gvUtil.message('请先填写modelCode');
                    return;
                }
                var index = this.ggMessageModelParamList.length;
                this.$set(this.ggMessageModelParamList, index, {
                    modelCode: this.form.modelCode,
                    paramName: '',
                    paramNo: ''
                });
                // console.log(this.ggMessageModelParamList);
                //                this.ggMessageModelParamList[index].paramNo = index;
                /*                this.rules['saaFactorFields.' + index + '.fieldCode'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }];
                this.rules['saaFactorFields.' + index + '.entityCode'] = [{
                    required: true,
                    message: this.mixinObject.gValidateRequired,
                    trigger: 'blur'
                }];*/
            },

            onDeletes: function (index, data) {
                data.splice(index, 1);
            },
            dataSetTypeChange: function () {
                if (this.form.dataSetType === '2') {
                    this.rules['dataSet'] = [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }];
                } else {
                    if (this.rules['dataSet']) {
                        this.rules['dataSet'].splice(0, 1);
                    }
                }
            },
            addInsertkeys: function () {
                this.insertkeys = [];
                var str = this.form.dataSet,

                    // var test = "select t.data as 数据 ,s.content as 内容" +
                    //             "from reporttestdata t," +
                    //             "reporttestdatasub s" +
                    //             "where t.mainid = ?" +
                    //             "and s.mainid = ?";

                    // var test1 = "t.data as 数据 ,s.content as 内容";
                    s = str.split('from')[0].replace(new RegExp('select', 'gm'), ''),
                    // console.log(s);
                    // List<String> result = new ArrayList<String>();
                    result = [],

                    sarr = s.split(' as ');
                for (var i = 0; i < sarr.length; i++) {
                    var strInFor = sarr[i].split(',');

                    for (var j = 0; j < strInFor.length; j++) {
                        result.push(strInFor[j]);
                    }
                }

                for (i = 0; i < result.length; i++) {
                    var string = result[i],
                        splitPoint = string.trim().split('.'),
                        rs = (splitPoint.length > 1) ? splitPoint[1] : splitPoint[0];

                    if (i % 2 === 0) {
                        if (this.insertkeys[i / 2] === undefined) {
                            this.insertkeys.push({});
                        }
                        this.insertkeys[i / 2].code = '${' + rs + '}';
                    } else {
                        this.insertkeys[(i - 1) / 2].name = rs;
                    }
                }
            }
        },
        methods: {
            // 初始化页面，低层直接调用
            initPage: function () {
                debugger
                
            //    // console.log(this.dialogProp.query.modelCode)
            //     if (this.dialogProp.query&&this.dialogProp.query.type !== 'add') {
            //         this.form.modelCode = this.dialogProp.query.modelCode;
            //         // this.value = this.dialogProp.query.row.
            //         // this.content = this.dialogProp.query.modelContent;
            //         this.requestParamData();
            //     }
            //     if (this.dialogProp.query&&this.dialogProp.query.type === 'view') {
            //         this.isReadonly = true;
            //     }
            //     if (this.$root.dialogProp) {
            //         this.isDialog = true;
            //         this.form.modelType = this.$root.dialogProp.modelType;
            //         if (this.$root.dialogProp.row) {
            //             this.form = this.$root.dialogProp.row;

            //             this.isReadonly = true;
            //         }
            //     }
                this.dialogProp.name = "中海油天津分部"
                this.dialogProp.code = "CX1554645468552"
                if (this.dialogProp.type=="001"){
                    this.value = "各位计划编制岗同事：<br/> &nbsp&nbsp&nbsp&nbsp" + this.dialogProp.name + "项目已经生成，代码为：" + this.dialogProp.code + ",请各供应商同事及时出单" + "<br/> <br/>" + "谢谢！祝身体健康，工作顺利<br/>中海油项目编制处",
                    this.topic = "项目编制完成通知"
                } else if (this.dialogProp.type == "002"){
                    this.value = "各位供应商同事：<br/> &nbsp&nbsp&nbsp&nbsp" + this.dialogProp.name + "出单通知已经发出，代码为：" + this.dialogProp.code+",请各供应商同事及时出单" + "<br/> <br/>" + "谢谢！祝身体健康，工作顺利<br/>中海油项目编制处",
                    this.topic = "出单通知"
                }else{
                    this.value = "各位供应商同事：<br/> &nbsp&nbsp&nbsp&nbsp" + this.dialogProp.name + "出险通知已经发出，代码为：" + this.dialogProp.code + ",请各供应商同事知悉" + "<br/> <br/>" + "谢谢！祝身体健康，工作顺利<br/>中海油项目编制处",
                    this.topic = "出险通知"
                }
                this.currentTimeDir = this.dialogProp.userCode + (new Date()).valueOf()

            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    'modelCode': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateModelCode, 
                        trigger: 'blur'
                    }],
                    'modelName': [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                    // 'dataSet'  : [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}]
                    // 'modelContent': [{trigger: 'blur', required: true, message: Vue.gvUtil.getInzTranslate('gValidateRequired')}],
                };
            },
            requestParamData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'findModelByModelCode',
                        contextName: 'auth',
                        urlParams: {
                            modelCode: this.form.modelCode
                        }
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.ggMessageModelParamList = res.resData.messageModelParamVos;
                        $.extend(true, _this.form, res.resData);
                        _this.content = res.resData.modelContent;
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
                    })
                }
            },
            dialogSuccessSubmit: function () {
                this.$emit('callDialog', this.form);
            },
            checkTopic: function (type) {
                //debugger
                this.selectEmailDialog = true


                // Vue.gvUtil.redirectTo({
                //     name: 'messageConfigAppEdit',
                //     query: {type: type, messageCode: row && row.messageCode},
                //     reMethods: this.onGetList,
                //     isBlank: true
                // })
            },
            
        },
        components: {
            SelectTopic: SelectTopic,
        }
      
    });
});