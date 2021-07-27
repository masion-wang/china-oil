/**
 *
 * @author 黄景华
 * @time 2018/01/17
 */
define(function (require) {
    var temp = require('./index.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'messageModelApp',

        datas: function () {
            return {
                ggMessageModelVoFilters: {},
                ggMessageModelList: [],
                isDialog: false
            }
        },
        events: {
            onGetList: function () {
                var _this = this;
                this.searchList('findGgMessageModelList', 'auth', this.ggMessageModelVoFilters, 'ggMessageModelList', function (data) {
                    _this.ggMessageModelList = data;
                });
            },

            onHandleDel: function (row) {
                var _this = this;
                Vue.gvUtil.confirm({
                    msg: Vue.gvUtil.getInzTranslate('gDeleteContent')
                }).then(function () {
                    var validInd = '1';
                    if (row.validInd === '1') {
                        validInd = '0';
                    }
                    var messageModel = {
                            validInd: validInd,
                            modelCode: row.modelCode
                        },
                        url = Vue.gvUtil.getUrl({
                            apiName: 'messageModelDelete',
                            contextName: 'auth'
                        });
                    Vue.gvUtil.http.post(url, messageModel).then(function (res) {
                        if (res.resCode === '0000') {
                            var disableMessage = 'gIsActivate';
                            if (res.resData === '1') {
                                disableMessage = 'gIsActivate';
                            } else if (res.resData === '0') {
                                disableMessage = 'gIsDisable';
                            } else {
                                disableMessage = 'gSaveSuccess';
                            }
                            Vue.gvUtil.alert({
                                msg: Vue.gvUtil.getInzTranslate(disableMessage)
                            }).then(function () {
                                _this.onGetList();
                            });
                        }
                    });
                })
            },

            onHandleEdit: function (row, type) {
                console.log(row);
                Vue.gvUtil.redirectTo({
                    name: 'messageModelAppEdit',
                    query: {type: type, modelCode: row && row.modelCode},
                    reMethods: this.onGetList,
                    isBlank: true

                })
            },
            onSelect: function (row) {
                this.$emit('callDialog', row);
            }
        },
        methods: {
            initPage: function () {
                // console.log(this.$emit('dialogProp'));
                if (this.$root.dialogProp) {
                    this.isDialog = true;
                    // console.log(this.$root.dialogProp.modelType);
                    this.ggMessageModelVoFilters.modelType = this.$root.dialogProp.modelType;
                }
            },
            formatter: function (row, column) {
                return Vue.gvUtil.translationData('ModelType', row[column.property]);
            }
        }
    });
});
