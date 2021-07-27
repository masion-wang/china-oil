/**
 * 启动器
 * @author 陈柱良 
 * @time 2017/10/18
 */
define(function(require) {
    var store = {
        info: null
    };

    return {
        setInfo: function(obj) {
            store.info = obj;
        },
        getInfo: function(flag) {
            return store.info
        },
        clearInfo: function() {
            store.info = null;
        }
    }
});