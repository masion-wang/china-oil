/**
 * 浏览
 * @author 
 * @time 2018-10-17 14:43:08
 */

/**
 * 参数 params
 *      system
 *      paramArr
 */


/**
 * 单个预览例子
    var params= "docId=A33&claimNo=SNW18D200309&businessId=18N000901&printDocId=2018101505172200507&apiUrl=clm/claim/printDocument/previewWriteBack&readonly=false&openFlag=1"
    //跳转
    Vue.gvUtil.redirectTo({
        name    : 'printApp',
        isBlank : true,
        register: true,
        query   : {
            params: params
        }
    });
 */

/**
 * 多个阅览(pdf文件会组合成一个)例子
    var _this = this,
    paramArr = JSON.stringify([
        'docId=53&codeType=test&codeCode=01',//第一个报表的参数
        'docId=53&codeType=ChequePrintState&codeCode=0'//第二个
    ]);

    Vue.gvUtil.redirectTo({
        name    : 'printApp',
        isBlank : true,
        register: true,
        query   : {
            //属性名必须为paramArr
            paramArr: paramArr,
        }
    });
*/


define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name    : 'printApp',
        shareStore : function(){
            return {
                paramArr : null//共用 跳转方式传入
            }
        },
        props   : {
            isReadOnly : false,//理赔 组件方式传入
            reportQuery : null//理赔 组件方式传入
        },
        params: function () { // 双向绑定状态数据
            return {
                iframeSrc: '',//共用 跳转方式传入
                isUpload: true,
                riFlag : false,//再保标识
                finFlag : false,//收付标识
                isPrintAbled: false//打印标识
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                fileName : 'default.pdf'
            }
        },
        events: {
            showEmail: function(){
                var param = {};
                //直接获取iframe内的数据 减少请求次数
                param.attachment = this.$el.firstElementChild.contentDocument.getElementById("base64").value;
                if(param.attachment === null || param.attachment === undefined || param.attachment.trim() === ""){
                    Vue.gvUtil.alert({msg: "Attachment loading is not completed. Please wait."});
                }
                param.fileName = this.fileName;
                param.docId = this.docId;
                console.log(param);
                require.async('./email/index', function (printEmailApp) {
                    Vue.gvUtil.showModal(printEmailApp, {
                        title     : 'Send Email',
                        dialogProp: param,
                        callDialog: function (obj) {
                            if (obj) {
                                // _this.damageItemVoForm.damageItemVos[index].solicitor = obj.partyName;
                            }
                        }
                    })
                });
            },
            onPrint: function(){
                // 关闭打按钮
                this.isPrintAbled = true;
                var _this = this;
                var url = "";
                if(_this.multiFlag){//多个PDF合并标识（收付需求）
                    var param = {
                        multiFlag : true,
                        documentTypeCode : null,
                        array : _this.query.paramArr
                    };
                    if (_this.query.printCheckFlag && !Vue.gvUtil.getBtnAuth('cheque_repeat_print')) {
                        opener.reMethods('1', function (flag) {
                            if (flag) {
                                var url = "/report/tpsgi/print/publicPrintPost";
                                _this.toPrint(url, param);
                            } else {
                                Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('gMsgChequePrinted')});
                            }
                        });
                        return;
                    }
                    url = "/report/tpsgi/print/publicPrintPost";
                    _this.toPrint(url, param);
                }else{
                    var params = _this.urlDecode(_this.query.params);
                    var   PFlag  = true ;
                    params = params +"&"+"PFlag=" + PFlag ;
                    url = "/report/tpsgi/print/publicPrint?" + params;
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000') {
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(res.resData.result)
                            });
                            if (_this.query.printReMethodFlag && res.resData.callback) {//打印回调（收付需求）
                                opener.reMethods('2');
                            }
                        }
                    });
                }
            },
            toPrint: function (url, param) {
                var _this = this;
                Vue.gvUtil.http.post(url, param).then(function (res) {
                    if (res.resCode === '0000') {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate(res.resData.result)
                        });
                        if (_this.query.printReMethodFlag && res.resData.callback) {//打印回调（收付需求）
                            opener.reMethods('2');
                        }
                    }
                });
            },
            onDownload: function(){
                var _this = this;
                var params = _this.query.params;
                var url = "";
                //console.log('test');
                var paramsArr = null;
                if (!_this.query.params) {
                    paramsArr = JSON.parse(_this.urlDecode(_this.query.paramArr));
                    if (paramsArr && paramsArr.length > 1) {
                        url = "/report/tpsgi/print/downloadPublic?multiFlag=true&array=" + _this.query.paramArr;
                    } else {
                        params = _this.urlDecode(paramsArr[0]);
                        url = "/report/tpsgi/print/downloadPublic?" + params;
                    }
                    window.open(url, Vue.gvUtil.getInzTranslate('btnDownload1'));
                } else {//单个参数 显示一个PDF文件
                    params = _this.urlDecode(_this.query.params);
                    //下载
                    url = "/report/tpsgi/print/downloadPublic?" + params;
                    window.open(url, Vue.gvUtil.getInzTranslate('btnDownload1'));
                }
                //上传
                if (_this.isUpload && _this.query.system === 'UW'){
                    url ='';
                    //paramArrNoEx 处理debit tax存储过程执行两遍问题
                    if (_this.query.paramArrNoEx || _this.query.paramArr){
                        var paramsTemp = null;
                        if(!_this.query.paramArrNoEx||_this.query.paramArrNoEx.indexOf("null")>-1){
                            paramsArr = JSON.parse(_this.urlDecode(_this.query.paramArr));
                            paramsTemp = _this.query.paramArr;
                        }else{
                            paramsArr = JSON.parse(_this.urlDecode(_this.query.paramArr));
                            paramsTemp = _this.query.paramArr;
                        }
                        if (paramsArr && paramsArr.length > 1) {
                            url = "/report/tpsgi/print/publicUpload?multiFlag=true&array=" + paramsTemp;
                        } else {
                            params = _this.urlDecode(paramsArr[0]);
                            url = "/report/tpsgi/print/publicUpload?" + params;
                        }
                    }else{
                        params = _this.urlDecode(_this.query.params);
                        url = "/report/tpsgi/print/publicUpload?" + params;
                    }
                    Vue.gvUtil.http.get(url).then(function (res) {
                        if (res.resCode === '0000') {

                        }
                    });
                }
            }
        },
        methods: {
            initPage: function () {
                if(this.$props.reportQuery){//组件方式传入
                    
                    //this.query.paramArr = encodeURIComponent(this.$props.reportQuery);
                    this.query.paramArr = this.$props.reportQuery;

                    // console.log(this.query.paramArr);
                }

                if(this.query.paramArr){//多个参数情况 会把多张PDF合并（收付需求）
                    var paramArr = JSON.parse(this.urlDecode(this.query.paramArr));
                    if (paramArr.length > 1){
                        this.previewMulti();
                        this.multiFlag = true;
                    } else {
                        this.query.params = paramArr[0];
                        this.preview();
                        this.multiFlag = false;
                    }
                }else{//单个参数 显示一个PDF文件
                    this.preview();
                }
                if(this.query.system && this.query.system === 'ri'){//再保预览（再保需求）
                    this.riFlag = true;
                    this.isUpload = false;
                }
                if(this.query.system && this.query.system === 'fin'){//收付预览（收付需求）
                    this.finFlag = true;
                    this.isUpload = false;
                }
            },
            preview: function () {
                var _this = this,
                    hostPort = document.location.host,
                    params = _this.urlDecode(_this.query.params);
                _this.getFileName(params);//解析参数 如果存在documentName则替换成附件名（承保需求）
                _this.iframeSrc = 'https://' + hostPort + '/dist/pdf/web/viewer.html?' + params;
            },
            previewMulti: function(){
                var _this = this,
                    hostPort = document.location.host,
                    params = _this.query.paramArr;
                _this.iframeSrc = 'https://' + hostPort + '/dist/pdf/web/viewer.html?multiFlag=true&array=' + params;
            },
            urlDecode:function(str){
                var i = 0;
                var taskCode = str;
                //存在需要解码的% 超过10次跳出
                while( (taskCode.indexOf("%")>-1) && ((i++)<=10) ){
                    taskCode = decodeURIComponent(taskCode);
                }
                return taskCode;
            },
            getFileName:function(str){
                try {
                    this.docId = str.split("docId=")[1].split("&")[0];
                    if (str.split("&documentName=").length > 1){
                        this.fileName = str.split("&documentName=")[1].split("&")[0] + ".pdf";
                    }
                }catch(err){
                    console.log(err); // 可执行
                    this.fileName = "default.pdf";
                }
            }

        }
    });
});