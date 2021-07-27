/**
 * 特殊审计日志管理版本对比页面
 * @author 孙恬静
 * @time 2018/3/2
 */
define(function (require) {
    var temp = require('./specialAuditLogTwoVersionsCompareIndex.html');
    return Vue.gvUtil.Page({
        template: temp,
        name: 'specialAuditLogAppTwoVersionsCompare',
        params: function () { // 双向绑定状态数据
            return {
                defaultExpandedKeys: []
            };
        },
        props: {
            uuids: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            eventHub: {}
        },
        datas: function () { // 双向绑定页面显示数据
            return {
                // 对比源数据
                source: [],
                // 对比数据
                comparasion: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                diffoutput: ''
            }
        },
        events: {
            // 关闭模态窗口
            returnPage: function () {
                Vue.gvUtil.redirectBack();
            },
            nodeExpand: function (data, node) {
                this.defaultExpandedKeys = [node.id];
                this.$refs.tree2['render-content'];
            }

        },
        methods: {
            initPage: function () {
                this.getTree();
            },
            filterNode: function (value, data) {
                if (!value) {
                    return true;
                }
                return data.id === value;
            },
            getTree: function () {
                if (this.uuids.length === 0) {
                    return;
                }
                var _this = this,
                    url = Vue.gvUtil.getUrl({
                        apiName: 'speicalAuditLogVersionCompare',
                        contextName: 'auth'
                    });
                Vue.gvUtil.http.post(url, _this.uuids).then(function (res) {
                    if (res.resCode === '0000') {
                        // _this.source = JSON.parse(res.resData.source);
                        // _this.comparasion = JSON.parse(res.resData.comparasion);
                        var base = difflib.stringAsLines(res.resData.source);
                        var newtxt = difflib.stringAsLines(res.resData.comparasion);
                        var sm = new difflib.SequenceMatcher(base, newtxt);
                        var opcodes = sm.get_opcodes();
                        var diffobj = diffview.buildView({
                            baseTextLines: base,
                            newTextLines: newtxt,
                            opcodes: opcodes,
                            baseTextName: "Base Text",
                            newTextName: "New Text",
                            contextSize: null,
                            viewType: 0
                        });
                        _this.diffoutput = diffobj.outerHTML;
                    }
                });
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
