/**
 * 特殊审计日志管理字段对比页面
 * @author 孙恬静
 * @time 2018/3/2
 */
define(function (require) {
    var temp = require('./specialAuditLogFieldCompareIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogAppFieldCompare',
        params: function () { // 双向绑定状态数据
            return {
                defaultExpandedKeys: []
            };
        },
        props: {
            businessNo: ''
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                // source: [],
                filterText: '',
                source: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                fieldList: []
            }
        },
        watch: {
            filterText: function (val) {
                this.$refs.tree.filter(val);
            }
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack();
            },
            nodeExpand: function (data, node) {
                this.defaultExpandedKeys = [node.id];
            },
            handleNodeClick: function (data) {
                // console.log(data);
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'specialAuditLogFieldCompare',
                        contextName: 'auth',
                        urlParams: {businessNo: this.businessNo}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        if (res.resData.content.length > 0) {
                            _this.getAllFields(res.resData.content, data.id);
                        }
                    }
                });
            }
        },
        methods: {
            // 时间格式化
            formatDate: function (row) {
                return Vue.filter('time')(row['createTime'], 'yyyy-MM-dd HH:mm:ss');
            },
            initPage: function () {
                this.getTree();
            },
            filterNode: function (value, data) {
                if (!value) {
                    return true;
                }
                return data.label.indexOf(value) !== -1;
            },
            getTree: function () {
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'speicalAuditLogFindById',
                        contextName: 'auth',
                        urlParams: {businessNo: this.businessNo}
                    });
                Vue.gvUtil.http.get(url).then(function (res) {
                    if (res.resCode === '0000') {
                        _this.source = JSON.parse(res.resData);
                    }
                });
            },
            getAllFields: function (resData, fieldLocation) {
                var fieldInfos = [],
                    locations = fieldLocation.split('-');
                for (var i = 0; i < resData.length; i++) {
                    var specialLog = {},
                        value = this.findField(JSON.parse(resData[i]['content']['requestData']), locations, 0),
                        field = locations[locations.length - 1],
                        creatorCode = resData[i]['content']['creatorCode'],
                        createTime = resData[i]['content']['createTime'];
                    specialLog['value'] = value;
                    specialLog['field'] = field.replace(/([A-Z])/g, ' $1').trim();
                    specialLog['creatorCode'] = creatorCode;
                    specialLog['createTime'] = createTime;
                    specialLog['version'] = resData[i]['content']['version'];
                    fieldInfos.push(specialLog);
                }
                this.fieldList = fieldInfos;
            },
            findField: function (specialAuditLog, locations, i) {
                var locationKey = locations[i];
                if (locationKey in specialAuditLog) {
                    var specialLogValue = specialAuditLog[locationKey];
                    if (Object.prototype.toString.call(specialLogValue)=== '[object Date]') {
                        return Date.parse(specialLogValue);
                    }
                    if (i + 1 === locations.length) {
                        if (locationKey.indexOf('Time') !== -1 || locationKey.indexOf('Date') !== -1) {
                            return Vue.filter('time')(specialLogValue);
                        }
                        return JSON.stringify(specialLogValue);
                    }
                    if ($.isArray(specialLogValue)) {
                        if (i + 1 < locations.length) {
                            return this.findFieldInArray(specialLogValue, locations, i + 1);
                        }
                    } else if ($.isPlainObject(specialLogValue)) {
                        if (i + 1 < locations.length) {
                            return this.findField(specialLogValue, locations, i + 1);
                        }
                    } else if ('boolean' === typeof specialLogValue) {
                        return specialLogValue.toString();
                    } else {
                        return specialLogValue;
                    }
                }
                return null;
            },
            findFieldInArray: function (specialAuditLog, locations, i) {
                var locationKey = locations[i],
                    specialLog = specialAuditLog[parseInt(locationKey)];
                if ($.isArray(specialLog)) {
                    if (i + 1 < locations.length) {
                        return this.findFieldInArray(specialLog, locations, i + 1);
                    }
                } else if ($.isPlainObject(specialLog)) {
                    if (i + 1 < locations.length) {
                        return this.findField(specialLog, locations, i + 1);
                    }
                }
                return null;
            },
            renderContent: function (h, params) {
                var str = '<span>' + '\n' +
                    '<span style="float:left;" @click="getCheckedNodes">'+ params.node.label +'</span>' + '\n' +
                '</span>';
                return str;
            }
        }
    });
});
