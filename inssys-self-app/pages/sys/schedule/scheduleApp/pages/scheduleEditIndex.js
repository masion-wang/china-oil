/**
 * 功能管理主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./scheduleEditIndex.html'),
        ERR_OK = '0000',
        ScheduleNextRunTime = require('./scheduleNextRunTime.js');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'scheduleAppScheduleEdit',
        query: {
            jobGroup: '',
            jobName: ''
        },
        params: function () { // 双向绑定状态数据
            return {
                isReadonly: false,
                return_btn: true,
                second: {},
                minute: {},
                hour: {},
                day: {},
                month: {},
                // 用于el-tab-pane 循环
                timeArray: [],
                // 默认选中的tab
                cron_tabs: 'Second',
                cron_result: ['', '', '', '', '', '?'],

                // 选择方法的下拉联动
                hostName_select: [],
                function_select: []
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {
                    jobName: '',
                    jobGroup: 'PLAT',
                    properties: '5',
                    triggerCron: '* * * * * ?',
                    hostName: '',
                    function: '',
                    triggerCronShow: '',
                    url: '',
                    param: '',
                    paramFromDB: '',
                    runClass: '',
                    runMethod: '',
                    sql: '',
                    funcType: '1'
                },


                rules: {},
                scheduleConfigList: [],
                paramForm: { // 动态表单参数
                    paramField: [],
                    paramValue: []
                },
                show: true
            }
        },
        events: {
            // 提交
            onSubmit: function () {
                this.form.param = this.paramJson();
                var _this = this;
                _this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.filter('translate')('gSaveSubmit')
                        }).then(function () {
                            _this.getPost('sysScheduleInsert', _this.form).then(function (res) {
                                _this.successSubmit(res);
                            });
                        });
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });
            },
            // 构造post请求参数
            paramJson: function () {
                 
                var rsTemp = {};
                for (var i = 0; i < this.paramForm.paramField.length; i++) {
                    var paramValue = (this.paramForm.paramValue[i]) ? this.paramForm.paramValue[i] : "";
                    rsTemp[this.paramForm.paramField[i]] = paramValue;
                }
                console.log(JSON.stringify(rsTemp));
                return JSON.stringify(rsTemp);
            },
            // 保存成功后回调的方法
            successSubmit: function (data) {
                // var _this = this;
                if (data.resCode === ERR_OK) {
                    Vue.gvUtil.alert({
                        msg: Vue.gvUtil.getInzTranslate('gSaveSuccessReturn')
                    }).then(function () {
                        Vue.gvUtil.redirectBack(true, true);
                    })
                }
            },

            handleTabClick: function () {},

            handleSelectChange: function () {
                var temp = this.getObject();
                // 如果选择指定时间 全部select为指定时间
                //            this.form.triggerCron = "* * * * * ? ";
                // 指定时间选项
                this.form.triggerCronShow = '';
                // 周期选项
                temp.checked = [];
                this.cron_result[temp.resultNum] = '';
                // 3、4选项
                temp.temp1 = '';
                temp.temp2 = '';
                this.changetriggerCron(temp);
            },
            // 周期选项内 的checked组变更时间
            handleCheckedChange: function () {
                // 根据tabs标题确定目前操作的时间类型，并返回集合次类型的对象
                var temp = this.getObject();
                this.changetriggerCron(temp);
            },
            handleDataChange: function () {
                if (typeof (this.form.triggerCronShow) === 'undefined' ||
                    this.form.triggerCronShow === '') {
                    return;
                }
                this.form.triggerCron = this.formatTime(this.form.triggerCronShow);
            },
            handleInputChange: function () {
                var temp = this.getObject();
                if (temp.temp1 === '' || temp.temp2 === '') {
                    return;
                }
                var middle = '';
                if (temp.selected === 3) {
                    middle = '-';
                } else if (temp.selected === 4) {
                    middle = '/';
                }
                this.cron_result[temp.resultNum] = temp.temp1 + middle + temp.temp2;
                this.changetriggerCron(temp);
            },
            // 清除表单
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            },
            // 系统名改变时触发
            hostNameChange: function (item) {
                this.resetValue();
                this.function_select = [];
                this.form.function = '';
                var list = this.scheduleConfigList;
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    if (item === obj['hostName']) {
                        this.function_select.push({
                            function: obj['function'],
                            id: obj['scheduleConfigId']
                        });
                    }
                }
            },
            // 方法改变时触发
            functionChange: function (item) {
                this.resetValue();
                var list = this.scheduleConfigList;
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];

                    if (item === obj['scheduleConfigId']) {
                        this.form.funcType = obj['funcType'];
                        if ('3' === obj['funcType']) {
                            this.form.runClass = obj['runClass'];
                            this.form.runMethod = obj['runMethod'];
                        } else {
                            this.form.url = obj['url'];
                            this.form.paramFromDB = obj['param'];
                            this.paramForm.paramField = obj['param'].split(',');
                        }
                    }
                }
            }
        },
        methods: {
            initPage: function () {
                this.initData();
                this.requestConfig();
                // this.requestData();
            },
            // 初始化校验，低层直接调用
            initRules: function () {
                this.rules = {
                    jobName: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }, {
                        validator: this.validateJobName,
                        trigger: 'blur'
                    }],
                    jobGroup: [{
                        trigger: 'blur',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    properties: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    hostName: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }],
                    function: [{
                        trigger: 'change',
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired')
                    }]
                };
            },
            validateJobName: function (rule, value, callback) {

                if (!value) {
                    return callback(new Error(this.mixinObject.gValidateRequired));
                }
                var url = Vue.gvUtil.getUrl({
                    apiName: 'validateJobName',
                    contextName: 'schedule'
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
            requestConfig: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysScheduleConfig',
                        contextName: 'schedule',
                        urlParams: {}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.scheduleConfigList = res.resData.list;
                        // 构造下拉联动数据
                        var list = res.resData.list;
                        for (var i = 0; i < list.length; i++) {
                            var obj = list[i];
                            if (_this.hostName_select.indexOf(obj['hostName']) === -1) {
                                _this.hostName_select.push(obj['hostName']);
                            }
                        }
                    }
                });
            },
            // 清空一些与方法由关的数据
            resetValue: function () {
                this.form.runClass = '';
                this.form.runMethod = '';
                this.form.url = '';
                this.form.paramFromDB = '';
                this.paramForm.paramField = [];
            },
            // 初始化时间选择器的数据
            initData: function () {
                this.second = this.TimeBase(0, 'Second');
                this.minute = this.TimeBase(1, 'Minute');
                this.hour = this.TimeBase(2, 'Hour');
                this.day = this.TimeBase(3, 'Day');
                this.month = this.TimeBase(4, 'Month');
                // 给调度时间一个默认值
                this.form.triggerCronShow = new Date();
                this.form.triggerCron = this.formatTime(this.form.triggerCronShow);
                this.timeArray.push(this.second);
                this.timeArray.push(this.minute);
                this.timeArray.push(this.hour);
                this.timeArray.push(this.day);
                this.timeArray.push(this.month);
                if (this.type === 'view') {
                    this.isReadonly = true;
                }
                for (var i = 0; i < 60; i++) {
                    var value;
                    if (i < 10) {
                        value = '0' + i;
                    } else {
                        value = i;
                    }
                    // 秒、分
                    this.second.allElement.push(value);
                    // 时
                    if (i < 24) {
                        this.hour.allElement.push(i + 1);
                    }
                    // 天
                    if (i < 31) {
                        this.day.allElement.push(i + 1);
                    }
                    // 月
                    if (i < 12) {
                        this.month.allElement.push(i + 1);
                    }
                }
                this.minute.allElement = this.second.allElement;
            },
            // 时间基类
            TimeBase: function (resultNum, name) {
                var rs = {
                    name: name,
                    resultNum: resultNum,
                    allElement: [],
                    checked: [],
                    select: [{
                        value: '0',
                        label: 'Executed ' + 'every ' + name
                    },
                    {
                        value: '1',
                        label: 'Execute once at the specified time'
                    },
                    {
                        value: '2',
                        label: 'Cycle'
                    }
                ],
                    selected: '1',
                    temp1: '',
                    temp2: ''
                };
                return rs;
            },
            changetriggerCron: function (temp) {
                // 周期选项处理
                if (temp.selected === '2') {
                    // 深拷贝选中值 后面有去0操作
                    this.cron_result[temp.resultNum] = JSON.parse(JSON.stringify(temp.checked));
                }
                this.form.triggerCron = '';
                for (var i = 0; i < this.cron_result.length; i++) {
                    if (this.cron_result[i] === '') {
                        this.form.triggerCron += '* ';
                    } else {
                        this.form.triggerCron += this.removeZero(this.cron_result[i]) + ' ';
                    }
                }
            },
            formatTime: function (time) {
                var rs = time.getSeconds() + ' ' +
                    time.getMinutes() + ' ' +
                    time.getHours() + ' ' +
                    time.getDate() + ' ' +
                    (time.getMonth() + 1) + ' ? ' +
                    time.getFullYear();
                return rs;
            },
            getObject: function () {
                switch (this.cron_tabs) {
                    case 'Second':
                        return this.second;
                    case 'Minute':
                        return this.minute;
                    case 'Hour':
                        return this.hour;
                    case 'Day':
                        return this.day;
                    case 'Month':
                        return this.month;
                    default:
                        return null;
                }
            },
            removeZero: function (str) {
                if (str.__proto__.constructor === Array) {
                    for (var i = 0; i < str.length; i++) {
                        str[i] = parseInt(str[i])
                    }
                }
                return str;
            },
            getPost: function (api, addParams) {
                console.log(addParams);
                var params = this.getParamsMixin(addParams);

                console.log(params);
                var url = Vue.gvUtil.getUrl({
                    apiName: api,
                    contextName: 'schedule'
                });
                return Vue.gvUtil.http.post(url, params);
            }

        },
        components: {
            ScheduleNextRunTime: ScheduleNextRunTime
        }
    });
});