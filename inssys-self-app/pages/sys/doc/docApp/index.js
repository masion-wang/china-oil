/**
 * 文件扫描管理主页面
 * @author 朱界军
 * @time 2017/12/12
 */
define(function (require) {
    var temp = require('./index.html');

    return Vue.gvUtil.Page({
        template: temp,
        name: 'docApp',
        events: {
            onHandleScan: function () {
                /* Vue.gvUtil.alert({
					msg: Vue.gvUtil.getInzTranslate('g0018')
				});*/

                // var path = 'E:/scanfiles/ScanDocumentForTest';
                var path = $('#path').val(),
                    pattern1 = /^[a-zA-Z]:[\\a-zA-Z0-9\u4e00-\u9fa5\s-_]*$/,
                    pattern2 = /^[a-zA-Z]:[/a-zA-Z0-9\u4e00-\u9fa5\s-_]*$/,
                    pattern3 = /\\/g;
                if (pattern1.test(path)) {
                    path = path.replace(pattern3, '/');
                }
                if (!pattern2.test(path)) {
                    Vue.gvUtil.message(Vue.gvUtil.getInzTranslate('gFileScanPathInputFormatError'));
                    return;
                }

                var url = Vue.gvUtil.getUrl({
                    apiName: 'sysFilesScan',
                    contextName: 'auth',
                    urlParams: {filesPath: path}
                });

                Vue.gvUtil.http.get(url).then(function (res) {
                    /* Vue.gvUtil.alert({
						msg: (typeof res.resCode)
					});*/

                    if (res.resData === '0000') {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gNoFilesInCurrentPath')
                        });
                    } else if (res.resData === '0001') {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gSelectPath')
                        });
                    } else if (res.resData === '0002') {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gFilesExisted')
                        });
                    } else if (res.resData === '0003') {
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gFilesScanCompleted')
                        });
                    } else { // 0004
                        Vue.gvUtil.alert({
                            msg: Vue.gvUtil.getInzTranslate('gDirectoryEmpty')
                        });
                    }
                });
            }
        }
    });
});
