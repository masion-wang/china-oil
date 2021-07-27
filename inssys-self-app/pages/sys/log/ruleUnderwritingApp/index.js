/**
 * 承保命中规则管理主页面
 * @author 孙恬静
 * @time 2019/6/19
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'ruleUnderwritingApp',
        query: function () {
            return {
                type: 'add',
                indexName: "ruleUnderwriting234",
                uwStatus: ''
            }
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                ruleVoFilters: {
                    businessNo: '',
                    result: '',
                    uwStatus: ''
                },
                ruleVoList: [],
                tableData: [],
                classifiedValues: {},
                accumulativeColumn: {},
                columnIndexObj: {},
                orderKeys: ['businessNo', 'ruleCode', 'factorName', 'factorValue', 'resultName', 'resultValue', 'hasSubValue']
            }
        },
        params: function () {
            rules: {}
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.$refs.ruleVoFilters.validate(function (valid) {
                    if (valid) {
                        _this.getList();
                    } else {
                        Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gValidateContent'));
                        return false;
                    }
                });

            },
            onHandleEdit: function (row, type) {
                Vue.gvUtil.redirectTo({
                    name: 'ruleUnderwritingApp',
                    query: {
                        type: type,
                        indexName: "ruleSubUnderwriting234",
                        ruleId: row.content.ruleId,
                        uwStatus: this.ruleVoFilters.uwStatus
                    },
                    reMethods: this.onGetList,
                    isBlank: true
                })
            }
        },
        methods: {
            // 时间格式化
            formatDate: function (row) {
                return Vue.filter('time')(row.content['uwDate'], "yyyy-MM-dd HH:mm:ss");
            },

            initPage: function () {
                Vue.gvUtil.initTranslation('YesOrNo');
                if (this.query.type == 'subValue') {
                    this.ruleVoFilters['uwStatus'] = this.query.uwStatus;
                    this.getList();
                }
            },

            getList: function () {
                var _this = this;
                this.ruleVoFilters['indexName'] = this.query.indexName;
                this.ruleVoFilters['ruleId'] = this.query.ruleId;
                this.searchList('ruleSearch', 'auth', this.ruleVoFilters, 'ruleVoList', function (data) {
                    _this.ruleVoList = data;
                    _this.tableData = data;
                    _this.classifiedValues = {};
                    _this.accumulativeColumn = {};
                    _this.columnIndexObj = {};
                    _this.classifyData();
                });
            },

            orderDataByKeys: function (rowObjOrg) {
                if (!rowObjOrg) {
                    return;
                }
                var rowObj = {};
                for (var index in this.orderKeys) {
                    var key = this.orderKeys[index];
                    rowObj[key] = rowObjOrg[key];
                }
                return rowObj;
            },

            classifyData: function () {

                if (this.tableData) {
                    for (var index in this.tableData) {
                        var valueAsKey = '';
                        var rowObjOrg = this.tableData[index].content.result;
                        var rowObj = this.orderDataByKeys(rowObjOrg);
                        var columnIndex = 0;
                        for (var key in rowObj) {
                            valueAsKey = valueAsKey + rowObj[key] + '--';
                            var valueTimes = this.classifiedValues[valueAsKey];

                            if (valueTimes) {
                                this.classifiedValues[valueAsKey] = valueTimes + 1;
                                this.columnIndexObj[columnIndex] = true;
                            } else {
                                this.classifiedValues[valueAsKey] = 1;
                            }
                            columnIndex += 1;
                        }
                    }


                }
            },

            objectSpanMethod: function ({
                row,
                column,
                rowIndex,
                columnIndex
            }) {

                // console.log(rowIndex);
                // console.log(columnIndex);

                var rowObj = this.orderDataByKeys(row.content ? row.content.result : row.result);
                if (this.columnIndexObj[columnIndex]) {
                    var values = Object.values(rowObj);
                    var concatKey = '';
                    for (var valueIndex in values) {
                        concatKey = concatKey + values[valueIndex] + "--";
                        if (valueIndex == columnIndex) {
                            break;
                        }
                    }

                    var mergeStyle = {
                        rowspan: 0,
                        colspan: 0
                    };

                    var keySum = this.classifiedValues[concatKey];
                    delete this.classifiedValues[concatKey];

                    if (!keySum) {
                        // console.log(mergeStyle);
                        return mergeStyle;
                    }
                    if (keySum == 1) {
                        mergeStyle = {
                            rowspan: 1,
                            colspan: 1
                        };
                        // console.log(mergeStyle);
                        return mergeStyle;
                    }

                    var mergeObj = {
                        rowspan: keySum,
                        colspan: 1
                    };

                    // console.log(mergeObj);
                    return mergeObj;
                }
                // 写死的实现
                // var mergeStyle = {
                //     rowspan: 0,
                //     colspan: 0
                // }
                // var rowStyle = {};
                // if (columnIndex === 0)  {
                //     if (rowIndex === 0) {
                //         rowStyle = {
                //             rowspan: 10,
                //             colspan: 1
                //         };
                //         console.log(rowStyle); 
                //         return rowStyle;
                //     }
                //     console.log(mergeStyle); 
                //     return mergeStyle;
                // }
                // if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
                //     // rowIndex 是合并多行为一行显示多行中的第一行
                //     if (rowIndex === 0) {
                //         rowStyle = {
                //             rowspan: 8,
                //             colspan: 1
                //         };
                //         console.log(rowStyle); 
                //         return rowStyle;
                //     }
                //     if (rowIndex === 8) {
                //         rowStyle = {
                //             rowspan: 2,
                //             colspan: 1
                //         };
                //         console.log(rowStyle); 
                //         return rowStyle;
                //     }
                //     console.log(mergeStyle); 
                //     return mergeStyle;
                // }
                // if (columnIndex === 4 || columnIndex === 5) {
                //     // rowIndex 是合并多行为一行显示多行中的第一行
                //     if (rowIndex < 8) {
                //         rowStyle = {
                //             rowspan: 1,
                //             colspan: 1
                //         };
                //         console.log(rowStyle); 
                //         return rowStyle;
                //     }
                //     if (rowIndex === 8) {
                //         rowStyle = {
                //             rowspan: 2,
                //             colspan: 1
                //         };
                //         console.log(rowStyle); 
                //         return rowStyle;
                //     }
                //     console.log(mergeStyle); 
                //     return mergeStyle;
                // }

            },
            // 状态翻译
            formatStatus: function (row) {
                return Vue.gvUtil.translationData('YesOrNo', row.content.result.hasSubValue);
            },
            initRules: function () {
                this.rules = {
                    businessNo: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'blur'
                    }],
                    uwStatus: [{
                        required: true,
                        message: Vue.gvUtil.getInzTranslate('gValidateRequired'),
                        trigger: 'change'
                    }]
                }
            }
        }
    });
});