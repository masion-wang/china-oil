/**
 * 定时任务管理查看页面
 * @author 黄景华
 * @time 2017/11/01
 */
define(function (require) {
    var temp = require('./scheduleViewIndex.html'),
        ERR_OK = '0000';
    return Vue.gvUtil.Page({
        template: temp,
        name: 'scheduleAppScheduleView',
        params: function () { // 双向绑定状态数据
            return {
                isEdit: false,
                second: {},
                minute: {},
                hour: {},
                day: {},
                month: {},
                timeArray: [],
                // 默认选中的tab
                cron_tabs: 'Second',
                cron_result: ['', '', '', '', '', '?'],
                isDisplay: false
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                form: {},
                rules: {},
                paramForm: { // 动态表单参数
                    paramField: [],
                    paramValue: []
                },
                isSendEmail: false,
                emailModelCode: ''
            }
        },
        events: {
            changeIsEdit: function () {
                this.isEdit = !(this.isEdit);
            },
            updateSchedule: function () {
                this.form.param = this.paramJson();
                var _this = this;
                _this.$refs.form.validate(function (valid) {
                    if (valid) {
                        Vue.gvUtil.confirm({
                            msg: Vue.filter('translate')('gSaveSubmit')
                        }).then(function () {
                            var url = Vue.gvUtil.getUrl({
                                apiName: 'sysScheduleUpdate',
                                contextName: 'schedule'
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
            },
            handleDataChange: function () {
                if (typeof (this.form.triggerCronShow) === 'undefined' ||
                    this.form.triggerCronShow === '') {
                    return;
                }
                this.form.triggerCron = this.formatTime(this.form.triggerCronShow);
            },
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
            // 返回上一页
            returnPage: function () {
                Vue.gvUtil.redirectBack(true);
            }, 
            getIsSendEmail: function () {
                if(this.form.isSendEmail) {
                    this.isDisplay = true;
                } else {
                    this.isDisplay = false;
                    this.form.emailModelCode = '';
                }
            }
        },
        methods: {
            initPage: function () {

                this.initTrigger();
                this.requestData();
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
            initTrigger: function () {
                this.second = this.TimeBase(0, 'Second');
                this.minute = this.TimeBase(1, 'Minute');
                this.hour = this.TimeBase(2, 'Hour');
                this.day = this.TimeBase(3, 'Day');
                this.month = this.TimeBase(4, 'Month');
                // 给调度时间一个默认值
                // this.form.triggerCronShow = new Date();
                // this.form.triggerCron = this.formatTime(this.form.triggerCronShow);
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
            removeZero: function (str) {
                if (str.__proto__.constructor === Array) {
                    for (var i = 0; i < str.length; i++) {
                        str[i] = parseInt(str[i])
                    }
                }
                return str;
            },
            requestData: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'sysScheduleView',
                        contextName: 'schedule'
                    }),
                    param = {
                        jobGroup: this.query.jobGroup,
                        jobName: this.query.jobName
                    };
                Vue.gvUtil.http.post(url, param).then(function (res) {
                    _this.form = res.resData;
                    if (res.resData.param) {
                        if (_this.form.emailModelCode) {
                            _this.form.isSendEmail = true;
                            _this.isDisplay = true;
                        } else {
                            _this.form.isSendEmail = false;
                        }
                        _this.setParamFromDB(res.resData.param);
                    }
                });
            },
            setParamFromDB: function (str) {
                try {
                    var obj = JSON.parse(str),
                        paramFromDB = '';
                    for (var i in obj) {
                        paramFromDB += (i + ',');
                        this.paramForm.paramField.push(i);
                        this.paramForm.paramValue.push(obj[i]);
                    }
                    paramFromDB = paramFromDB.substring(0, paramFromDB.length - 1);
                    this.form.paramFromDB = paramFromDB;
                } catch (err) {
                    console.log(console.log(err))
                }


            }

        }
    });
});