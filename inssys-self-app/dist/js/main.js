"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ?
  function (obj) {
    return typeof obj;
  } :
  function (obj) {
    return obj &&
      typeof Symbol === "function" &&
      obj.constructor === Symbol &&
      obj !== Symbol.prototype ?
      "symbol" :
      typeof obj;
  };

/**
 * 注册中心
 * @author 陈柱良
 * @time 2017/11/01homeType
 */
define("./dist/js/main.js", [
  "src/utils/index.js",
  "src/directives/index.js",
  "src/components/index.js",
  "src/filter/index.js",
  "src/layout/router.js",
  "src/vuex/store.js",
], function (require, exports, module) {
  require("src/utils/index.js");
  require("src/directives/index.js");
  require("src/components/index.js");
  require("src/filter/index.js");
  Vue.gvUtil.addRoutes(require("src/layout/router.js"), true);
  Vue.gvUtil.setStore({
    store: require("src/vuex/store.js"),
  });
});

/**
 * index
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/utils/index.js", ["src/utils/util.js"], function (
  require,
  exports,
  module
) {
  require("src/utils/util.js");
});
/**
 * 指令
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/directives/index.js", ["src/utils/cache.js"], function (
  require,
  exports,
  module
) {
  var btns = null,
    b = false,
    cache = require("src/utils/cache.js");

  function test() {
    var c = cache.getMenusCache();
    btns = c.get("BtnsData");
  }
  Vue.directive("focus", {
    inserted: function inserted(el) {
      el.querySelector("input").select();
    },
    // componentUpdated: function(el, binding, vnode, oldVnode){
    //     if (vnode.data.props.value.toString() !='') {
    //         var value = Number(vnode.data.props.value.toString()) || 0;
    //         el.querySelector('input').value = value.toFixed(2);
    //     }
    //     //console.log(el.children[0].value)
    // }
  });
  Vue.directive("focus1", {
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.data.props.value.toString() !== "") {
        var value = Number(vnode.data.props.value.toString()) || 0;
        el.querySelector("input").value = value.toFixed(2);
      }
      // console.log(el.children[0].value)
    },
  });
  Vue.directive("auth-btn", {
    bind: function bind(el, binding) {
      if (!b) {
        test();
        if (btns) {
          b = true;
        }
      }
      if (!btns || !btns["_" + binding.value]) {
        el.style.display = "none";
      }
    },
  });
  Vue.directive("correct", {
    bind: function bind(el, b, c) {
      var name = !b.modifiers.textarea ? "input" : "textarea",
        title = "";
      var _input = el.querySelector(name);
      if (_input) {
        title = !b.value && b.value != 0 && b.value + "" != "false" ? "" : b.value;
        _input.setAttribute("data-correct-old", title);
        _input.setAttribute("title", title);
      }
    },
    update: function update(el, b, c) {
      if (b.value != b.oldValue) {
        var name = !b.modifiers.textarea ? "input" : "textarea";
        var _input = el.querySelector(name);
        if (_input) {
          var title = !b.value && b.value != 0 && b.value + "" != "false" ? "" : b.value;
          _input.setAttribute("data-correct-old", title);
          _input.setAttribute("title", title);
        }
      } else {
        var name = !b.modifiers.textarea ? "input" : "textarea";
        var _input = el.querySelector(name);
        if (_input) {
          var flag = _input.getAttribute("data-correct");
          if (flag != null && flag != "0") {
            // && !_input.getAttribute('disabled')
            correct(c, _input.getAttribute("data-correct-old") || "", _input);
          }
        }
      }
    },
  });
  Vue.directive("correct-flg", {
    bind: function bind(el, b, c) {
      var name = !b.modifiers.textarea ? "input" : "textarea";
      var _input = el.querySelector(name);
      if (_input) {
        //_input.setAttribute('data-correct-type', '1');
        _input.setAttribute("data-correct", b.value || "0");
      }
    },
    update: function update(el, b, c) {
      if (b.value != 0 && b.value != b.oldValue) {
        var name = !b.modifiers.textarea ? "input" : "textarea";
        var _input = el.querySelector(name);
        if (_input) {
          _input.setAttribute("data-correct", b.value);
          _input.setAttribute("data-correct-flag", "1");
          var oldValue = _input.getAttribute("data-correct-old") || "";
          correct(c, oldValue, _input);
        }
      }
    },
  });

  function correct(c, old, inputDom) {
    var nowValue = c.data.model.value,
      //inputDom.value,
      color = inputDom.getAttribute("data-correct-type"),
      re = inputDom.getAttribute("readonly"),
      di = inputDom.getAttribute("disabled"),
      is = inputDom.getAttribute("is-select");
    nowValue = !nowValue && nowValue != 0 && nowValue + "" != "false" ?
      "" :
      nowValue + "";

    if (color == "I") {
      // if (re && di && is) {
      //     inputDom.style.backgroundColor = '#ffffff';
      // } else {
      //新增  蓝色
      inputDom.style.backgroundColor = "#A0E88C";
      // }
      return;
    }
    if (color == "D" || color == "B") {
      // if (re && !di && is) {
      //     inputDom.style.backgroundColor = '#ffffff';
      // } else {
      // 删 灰色
      inputDom.style.backgroundColor = "#808080";
      // }
      return;
    }
    var isNumber = inputDom.getAttribute("is-number");
    if (isNumber) {
      if (old || old == "0") {
        old = parseFloat(old) || "";
      }
      if (nowValue || nowValue == "0" || nowValue == 0) {
        nowValue = parseFloat(nowValue) || "";
      }
    }
    if (old == nowValue) {
      // 未改
      if (!color || color == "1" || color == "U") {
        inputDom.setAttribute("data-correct-type", "1");
        if ((re && di && is) || (re && !is) || (di && !is)) {
          inputDom.style.backgroundColor = "#ffffff";
        } else {
          inputDom.style.backgroundColor = "#d0e6f5";
        }
      }
    } else if (old != nowValue) {
      // 改 黄色
      if (color != "U" && color !== "D" && color !== "B" && color !== "I") {
        inputDom.setAttribute("data-correct-type", "U");
        inputDom.style.backgroundColor = "#ffff00";
      }
    }
  }
  Vue.directive("to-fixed", {
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.data.props.value.toString() !== "") {
        var value = Number(vnode.data.props.value.toString()) || 0;
        el.querySelector("input").value = value.toFixed(2);
      }
      // console.log(el.children[0].value)
    },
    update: function update(el, binding, vnode) {
      if (vnode.data.props.value.toString() !== "") {
        var value = Number(vnode.data.props.value.toString()) || 0;
        el.querySelector("input").value = value.toFixed(2);
      }
      // if (binding.value.toString().indexOf(".") > -1) {
      //     let reg = /\.\d{2}/
      //     if (reg.test(binding.value)) {
      //         console.log(el.querySelector('input'))
      //         el.querySelector('input').value = Number(binding.value.toString().match(/^(\-|\d)+(?:\.\d{0,2})?/)[0])
      //     }
      // }
      // console.log(el.children[0].value)
    },
  });
});
/**
 * 组件注册中心
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/index.js", [
  "src/components/input-num/input-num.js",
  "src/components/loading/loading.js",
  "src/components/search/search.js",
  "src/components/select/select.js",
  "src/components/select2/select2.js",
  "src/components/form-input/form-input.js",
  "src/components/form-label/form-label.js",
  "src/components/form-engine/form-engine.js",
  "src/components/float-menu/float-menu.js",
  "src/components/db-click/db-click.js",
  "src/components/show-modal/show-modal.js",
  "src/components/upload/upload.js",
  "src/components/quill-editor/quill-editor.js",
  "src/components/button/button.js",
  "src/components/column-filter/column-filter.js",
  "src/components/collapse-item/collapse-item.js",
  "src/components/auto-complete/auto-complete.js",
  "src/components/import-execl/import-execl.js",
  "src/components/input/input.js",
  "src/components/radio-group/radio-group.js",
  "src/components/checkbox/checkbox.js",
  "src/components/textarea/textarea.js",
  "src/components/flow/flow.js",
  "src/components/form/form.js",
  "src/components/form/form-item.js",
  "src/components/panel/panel.js",
  "src/components/data-table/data-table.js",
  "src/components/data-table/data-filter-table.js",
  "src/components/data-table/upload-file.js",
  "src/components/input/money-input.js",
  "src/components/span/span-tooltip.js",
  "src/components/audit-info/audit-info.js",
], function (require, exports, module) {
  var Loading = require("src/components/loading/loading.js"),
    Search = require("src/components/search/search.js"),
    Select = require("src/components/select/select.js"),
    Select2 = require("src/components/select2/select2.js"),
    FormInput = require("src/components/form-input/form-input.js"),
    FormLabel = require("src/components/form-label/form-label.js"),
    FormEngine = require("src/components/form-engine/form-engine.js"),
    FloatMenu = require("src/components/float-menu/float-menu.js"),
    DbClick = require("src/components/db-click/db-click.js"),
    ShowModal = require("src/components/show-modal/show-modal.js"),
    Upload = require("src/components/upload/upload.js"),
    QuillEditor = require("src/components/quill-editor/quill-editor.js"),
    Button = require("src/components/button/button.js"),
    ColumnFilter = require("src/components/column-filter/column-filter.js"),
    CollapseItem = require("src/components/collapse-item/collapse-item.js"),
    AutoComplete = require("src/components/auto-complete/auto-complete.js"),
    ImportExecl = require("src/components/import-execl/import-execl.js"),
    Input = require("src/components/input/input.js"),
    InputNum = require("src/components/input-num/input-num.js"),
    RadioGroup = require("src/components/radio-group/radio-group.js"),
    Checkbox = require("src/components/checkbox/checkbox.js"),
    Textarea = require("src/components/textarea/textarea.js"),
    Flow = require("src/components/flow/flow.js"),
    Form = require("src/components/form/form.js"),
    FormItem = require("src/components/form/form-item.js"),
    Panel = require("src/components/panel/panel.js"),
    DataTable = require("src/components/data-table/data-table.js"),
    filterDataTable = require("src/components/data-table/data-filter-table.js"),
    MoneyInput = require("src/components/input/money-input.js"),
    spanTooltip = require("src/components/span/span-tooltip.js"),
    uploadFile = require("src/components/data-table/upload-file.js"),
    auditInfo = require("src/components/audit-info/audit-info.js"),
    //tpCascader = require('./tpCascader/tpCascader'),
    cm = {
      install: function install(Vue) {
        Vue.prototype.$TpShowModal = ShowModal;
      },
    };

  Vue.component("gv-dbclick", DbClick);
  Vue.component("gv-search", Search);
  Vue.component("gv-select", Select);
  Vue.component("gv-select2", Select2);
  Vue.component("gv-form-input", FormInput);
  Vue.component("gv-form-label", FormLabel);
  Vue.component("gv-float-menu", FloatMenu);
  Vue.component("gv-form-engine", FormEngine);
  Vue.component("gv-upload", Upload);
  Vue.component("gv-quill-editor", QuillEditor);
  Vue.component("gv-button", Button);
  Vue.component("gv-column-filter", ColumnFilter);
  Vue.component("gv-collapse-item", CollapseItem);
  Vue.component("gv-auto-complete", AutoComplete);
  Vue.component("gv-import-execl", ImportExecl);
  Vue.component("gv-input", Input);
  Vue.component("gv-input-num", InputNum);
  Vue.component("gv-radio-group", RadioGroup);
  Vue.component("gv-checkbox", Checkbox);
  Vue.component("gv-textarea", Textarea);
  Vue.component("gv-flow", Flow);
  Vue.component("gv-panel", Panel);
  Vue.component("gv-loading", Loading);
  Vue.component("gv-form", Form);
  Vue.component("gv-form-item", FormItem);
  Vue.component("gv-data-table", DataTable);
  Vue.component("gv-filter-table", filterDataTable);
  Vue.component("gv-money-input", MoneyInput);
  Vue.component("upload-file", uploadFile);
  Vue.component("audit-info", auditInfo);
  Vue.component("span-tooltip", spanTooltip);
  //Vue.component('gv-cascader', tpCascader)
  Vue.use(cm);
});
/**
 * 过滤器
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/filter/index.js", [], function (require, exports, module) {
  /**
   * @Function transform 加空格
   * @Param splitNum 每隔几位数加个空格
   */
  Vue.filter("formatUpOrLow", function (value, formatStr) {
    if (!value) {
      return "";
    }!formatStr || formatStr === "up" ?
      (value = value.toUpperCase()) :
      value.toLowerCase();
    return value;
  });
  /**
   * @Function format 加空格
   * @Param splitNum 每隔几位数加个空格
   */
  Vue.filter("format", function (value, splitNum) {
    if (!value) {
      return "";
    }
    var str = value.replace(/\s+/g, ""),
      result = "",
      tmp,
      num = splitNum || 4,
      regexp = new RegExp("\\w{" + num + "}");
    /* eslint no-cond-assign: "off" */
    while ((tmp = regexp.exec(str))) {
      str = str.replace(regexp, "");
      result += tmp[0] + " ";
    }
    result += str;
    return result;
  });
  /**
   * @Function format 格式化日期
   * @Param formatStr String 格式 [yyyy,MM,dd,HH,mm,ss]
   */
  Vue.filter("time", function (value, formatStr) {

    if (!value || value === "") {
      return "";
    }
    if (typeof value === "string" && window.browserType !== "g") {
      value = value.replace(/-/g, "/");
    }
    formatStr = formatStr || "yyyy-MM-dd";
    // 日月年
    let RegExpddMMyyyy = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})$/
    // 日月年 时分秒
    let RegExpddMMyyyyHHmmss = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})\s(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/
    // 把日月年 || 日月年 时分秒转化成 YYYY-MM-dd (HH MM SS)?
    if (RegExpddMMyyyy.test(value)) {
      let timearr = value.match(RegExpddMMyyyy)
      value = timearr[3] + '-' + timearr[2] + '-' + timearr[1]
    } else if (RegExpddMMyyyyHHmmss.test(value)) {
      let timearr = value.match(RegExpddMMyyyyHHmmss)

      let timeStr = timearr[0].slice(11)
      value = timearr[3] + '-' + timearr[2] + '-' + timearr[1] + ' ' + timeStr
    }
    var date = new Date(value),
      yyyy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      HH = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds(),

      result = formatStr;

    MM < 10 && (MM = "0" + MM);
    dd < 10 && (dd = "0" + dd);
    HH < 10 && (HH = "0" + HH);
    mm < 10 && (mm = "0" + mm);
    ss < 10 && (ss = "0" + ss);
    result = result
      .replace("yyyy", yyyy)
      .replace("MM", MM)
      .replace("dd", dd)
      .replace("HH", HH)
      .replace("mm", mm)
      .replace("ss", ss);
    return result;
  });

  /**
   * 后缀， 如：XX元
   * @Param label
   */
  // Vue.filter('money', function(value, label, isDecimal) {

  //     if (value == 'undefined' || value === "") {
  //         return ""
  //     }
  //     if (!label) {
  //         label = '';
  //     }
  //     var numberTmp = Math.round(value * 100) / 100;

  //     if (isNaN(numberTmp)) {
  //         return value;
  //     }
  //     if (isDecimal) {
  //         numberTmp = parseInt(numberTmp.toFixed(0)) || 0;
  //     }

  //     var numberStr = numberTmp.toString(),
  //         divide = numberStr.split("."),
  //         integer = divide[0],
  //         len = integer.length,
  //         decimal = '',
  //         result = "",
  //         i = 0;

  //     if (!isDecimal) {
  //         decimal = divide[1] || '00'
  //     }
  //     while (len) {
  //         result += integer[--len];
  //         i++;
  //         if (!(i % 3) && len) {
  //             result += ",";
  //             i = 0;
  //         }
  //     }
  //     result = result.split("").reverse().join("");

  //     if (decimal.length == 1) {
  //         decimal += '0';
  //     }
  //     // if (decimal.length > 2) {
  //     //     decimal = decimal.subString(0, 2);
  //     // }
  //     if (!isDecimal) {
  //         result += "." + decimal;
  //     }

  //     return label + result
  // })
  /**
   * 后缀， 如：XX元
   * @Param label
   */
  Vue.filter("money", function (value, thou, len, flag) {
    if (value === "undefined" || value === "" || value == null) {
      return "";
    }
    if (flag && parseFloat(value) === 0) {
      return "";
    }
    if (value < 0) {
      return "-" + Vue.gvUtil.showNumber(thou, len, -value);
    }
    return Vue.gvUtil.showNumber(thou, len, value);
  });
  Vue.filter("delmat", function (n) {
    if (n) {
      return Number((n = n.toString().replace(/,/g, "")));
    } else {
      return n;
    }
  });
  /**
   * @Description 身份证号遮挡
   * @Param start Number 开始位置
   * @Param len Number 长度
   */
  Vue.filter("idCard", function (value, start, len) {
    if (!value) {
      return "";
    }

    var val = value.replace(/\s+/g, ""),
      result = "",
      maxLen = 18 - start;
    if (!/^\d{17}[\dX]$/.test(val)) {
      return "";
    }
    if (start > 18) {
      return value;
    }

    result = val.substring(0, start);
    maxLen = maxLen < len ? maxLen : len;
    while (maxLen--) {
      result += "*";
    }

    result += val.substring(start + len, 18);

    return result;
  });

  /**
   * @Description 手机号遮挡
   * @Param start Number 开始位置
   * @Param end Number 结束位置
   */
  Vue.filter("phoneNum", function (value, start, end) {
    if (!value) {
      return "";
    }

    var val = value.replace(/\s+/g, ""),
      result = "",
      valLen = val.length,
      startLen = valLen - start - end;
    if (!/^(\+\d{1,4})?1[3|4|5|7|8|9]\d{9}$/.test(val)) {
      return "";
    }
    if (startLen < 0) {
      return value;
    }

    result = val.substring(0, start);
    while (startLen--) {
      result += "*";
    }

    result += val.substring(valLen - end, valLen);

    return result;
  });
  /**
   * @Description 手机号遮挡
   * @Param start Number 开始位置
   * @Param end Number 结束位置
   */
  Vue.filter("keepNum", function (value, len) {
    if (!value) {
      return "";
    }
    value = Number(value);
    return value.toFixed(len || 2);
  });
});
/**
 * router
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/router.js", [
  "src/layout/homeApp/index.js",
  "src/layout/loginApp/index.js",
  "src/layout/homeApp/note.js",
  "src/layout/500App/index.js",
], function (require, exports, module) {
  Vue.gvUtil.setComponents({
    Home: require("src/layout/homeApp/index.js"),
  });
  var Home = Vue.gvUtil.getComponents("Home");
  return [{
      path: "/login",
      component: require("src/layout/loginApp/index.js"),
    },
    {
      path: "/home",
      component: Home,
      children: [{
        // 非比例合约层信息
        path: "note",
        name: "homeAppNote",
        component: require("src/layout/homeApp/note.js"),
      }, ],
    },
    {
      path: "/",
      component: Home,
    },
    {
      path: "/error",
      component: require("src/layout/500App/index.js"),
    },
    {
      path: "*",
      component: require("src/layout/500App/index.js"),
    },
  ];
});
/**
 * vuex
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/vuex/store.js", [], function (require, exports, module) {
  Vue.use(Vuex);
  var state = {
      config: {},
      isSingle: false,
      taskObj: {}, // 任务对象
      remarkNumber: 100, //询价  /  单一来源 'False' == sessionStorage.getItem('single') ? 'FA-XM-2018-008-0046' :'FA-XM-2020-119-0045',
      paramSchemaNoD: sessionStorage.getItem("ps"),
      paramProposalNo: window.localStorage.getItem("pc"),
      topmenus: [],
      formRouter: "",
      redirectTopMenus: [{
          name: "报价信息",
          id: 1,
          appName: "purchaseQuoteEntryApp",
        },
        {
          name: "技术评分",
          id: 2,
          appName: "purchaseTechScoreApp",
        },
        {
          name: "开报价信息",
          id: 2,
          appName: "purchaseOpenQuotationRecordApp",
        },
        {
          name: "投保单位确认",
          id: 2,
          appName: "purchaseProposalConfirmApp",
        },
        {
          name: "自保信息",
          id: 3,
          appName: "purchaseSelfInsurcnceApp",
        },
        {
          name: "再保经纪人录入",
          id: 0,
          appName: "purchaseReInsurcnceApp",
        },
        {
          name: "国内自留",
          id: 3,
          appName: "purchaseDomesticretentionApp",
        },
        {
          name: "再保信息",
          id: 0,
          appName: "purchaseReinsuranceInfoApp",
        },
        {
          name: "评标结果报告",
          id: 4,
          appName: "purchaseResultsReportApp",
        },
        {
          name: "评标结果报告审核",
          id: 4,
          appName: "purchaseResultsReportAuditApp",
        },
      ],
      isCachePurchase: false,
      count: 10,
      homeTitleName: "",
      homeType: "",
      pageLoading: false,
      menuShow: !opener ? true : false,
      dialog: {
        msg: "",
        showLoading: false,
      },
      loading: {
        showLoading: false,
        showLoadMsg: "",
      },
      dialogLogin: {
        showLoading: false,
        isReload: false,
      },
      breadcrumbs: [],
      quotationBasicInfo: {},
      cache: {},
      publicClock: {},
      userInfo: {},
      exchCny: [],
      workflow: {},
      trailInfo: {},
    },
    // 定义所需的 mutations
    mutations = {
      INCREMENT: function INCREMENT(state) {
        state.count++;
      },
      DECREMENT: function DECREMENT(state) {
        state.count--;
      },
      PAGE_LOADING: function PAGE_LOADING(state, isShow) {
        state.pageLoading = isShow;
      },
      LOADING: function LOADING(state, isShow, msg) {
        state.loading.showLoading = isShow;
        state.loading.showLoadMsg =
          msg && msg !== "" ? msg : "Requests for data...";
      },
      UPDATE_HONE_TITLE: function UPDATE_HONE_TITLE(state, homeTitleName) {
        state.homeTitleName = homeTitleName;
      },
      CHANGE_HOME: function CHANGE_HOME(state, opt) {
        state.homeType = opt.type;
      },
      COMMIT_DIALOG: function COMMIT_DIALOG(state, opt) {
        state.dialog.msg = opt.msg;
        state.dialog.statusText = opt.statusText;
        state.dialog.status = opt.status + "";
        state.dialog.showLoading = opt.showLoading;
      },
      COMMIT_DIALOG_LOGIN: function COMMIT_DIALOG_LOGIN(state, opt) {
        state.dialogLogin.showLoading = opt.showLoading;
        state.dialogLogin.isReload = opt.isReload ? true : false;
      },
      UPDATE_QUOBAINFO: function UPDATE_QUOBAINFO(state, obj) {
        state.quotationBasicInfo = obj;
      },
      UPDATE_CACHE: function UPDATE_CACHE(state, obj) {
        $.extend(true, state.cache, obj || {});
      },
      DESTROYED_CACHE: function DESTROYED_CACHE(state, key) {
        if (key && state.cache[key]) {
          state.cache[key] = null;
          delete state.cache[key];
        }
      },
      BREADCRUMBS: function BREADCRUMBS(state, breadcrumbs) {
        if (breadcrumbs) {
          state.breadcrumbs = breadcrumbs;
        }
      },
      BREADCRUMBS_TO: function BREADCRUMBS_TO(state, breadcrumbs) {
        if (breadcrumbs && state.breadcrumbs) {
          state.breadcrumbs.push(breadcrumbs);
        }
      },
      MENU_SHOW: function MENU_SHOW(state, flag) {
        state.menuShow = flag || false;
      },
      PUBLIC_CLOCK(state, publicClock) {
        if (publicClock) {
          state.publicClock = publicClock.code;
        }
      },
      USER_INFO(state, userInfo) {
        // ////debugger;
        state.userInfo = userInfo || {};
        // console.log('用户信息', state.userInfo)
      },
      EXCH_CNY(state, exchCny) {
        state.exchCny = exchCny || [];
      },
      SET_WORKFLOW(state, workflow) {
        state.workflow = workflow;
      },
      SET_CONFIG(state, config) {
        state.config = config;
      },
      SET_TRAILINFO(state, trailInfo) {
        state.trailInfo = trailInfo;
      },
      SET_TASKOBJ(state, taskObj) {
        state.taskObj = taskObj;
      },
      SET_TopMenus(state, topmenus) {
        state.topmenus = topmenus;
      },
      //   REQUIRED_FIELD:function REQUIRED_FIELD(h, {column, $index}) {
      //     // 这里在最外层插入一个div标签
      //     return h('div',[

      //         h('el-tooltip',{
      //             // 表示属性
      //             attrs: {
      //                 effect: "dark",
      //                 content: "必填项",
      //                 placement: "top"
      //             },
      //         },[
      //             h("span", {
      //                 domProps:{
      //                     innerHTML:'* '
      //                 },
      //                 'class': 'require'
      //             })
      //         ]),
      //         h('span', {
      //             // 表示内容
      //             domProps:{
      //                 innerHTML:column.label
      //             },
      //             on: {
      //                 click: () => {
      //                     console.log(`${$index}  ${column.label}`)
      //                 }
      //             }
      //         })

      //     ])
      // },
    },
    // 创建 store 实例
    store = new Vuex.Store({
      state: state,
      mutations: mutations,
      modules: {
        i18n: vuexI18n.store,
      },
    });

  Vue.use(vuexI18n.plugin, store);

  return store;
});
/**
 * 工具类
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/utils/util.js", [
  "src/utils/apiConfig.js",
  "src/utils/axiosConfig.js",
  "src/utils/cache.js",
  "src/mixins/tpMixins.js",
  "src/layout/layoutService.js",
  "src/vuex/store.js",
], function (require, exports, module) {
  var apiService = require("src/utils/apiConfig.js"),
    axiosConfig = require("src/utils/axiosConfig.js"),
    cache = require("src/utils/cache.js"),
    tpMixins = require("src/mixins/tpMixins.js"),
    stores = require("src/vuex/store.js"),
    translations = {},
    // 国际化数据保存
    router = [],
    // app.router.js 应用的路由，注册后销毁
    _routerKeys = {},
    // routerName->routerPath
    _routerConfig = {},
    // routerPath->routerConfig 除了可以请求的
    _allowRouterConfig = {},
    // routerPath->routerConfig 可以请求的
    routerObj = null,
    // 路由对象
    store = {},
    components = {},
    layoutService = require("src/layout/layoutService.js"),
    config = {
      version: "1.0.0.0",
      islanguage: false,
      maxlength: 30,
    },
    _token = "";
  if (!window.console) {
    window.console = {
      log: function log() {},
    };
  }
  var gvUtil = {
    http: axiosConfig.axios,
    PATTERN_AMOUNT: /^(-)?(([1-9][0-9]{0,2}(,\d{3})*)|0)(\.\d{2})?$/, // 金额
    PATTERN_WEIGHT: /^(-)?(([1-9][0-9]{0,2}(,\d{3})*)|0)(\.\d{3})?$/, // 重量
    PATTERN_POSITIVE_INTEGER: /^[1-9]\d*$/, // 正整数
    PATTERN_INTEGER: /^-?\d+$/, // 整数
    PATTERN_DECIMAL: /^-?\d+\.\d{2}$/, // 2位小数
    PATTERN_HUNDRED: /^100$|^(\d|[1-9]\d)(\.\d+)*$/, // 大于等于0小于等于100
    PATTERN_ZERO_INTEGER: /^\d+(\.\d+)?$/, // 大于或者等于0
    PATTERN_ORDERNO: /^[A-Za-z0-9]+$/, // 只能是数字或字母
    AllNumber: /^[0-9]+$/, //Must be number
    Hundred: /^100$|^(\d|[1-9]\d)(\.\d+)*$/, // 大于等于0小于等于100
    Zero: /^\d+(\.\d+)?$/, // 大于或者等于0
    MoreZero: /^[1-9]\d*(\.\d+)?$|^0\.\d*[1-9]\d*$/, // 大于0的小数或整数
    telNumber: /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)||(^0{0,1}13[0-9]{9}$)/, //电话号码
    getDateOption() {
      var pickerOptions = {
        shortcuts: [{
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      };
      return pickerOptions;
    },
    goWorkFlow() {
      Vue.gvUtil.redirectTo({
        name: "workbenchApp",
      });
    },
    confirmExecotor(gwNextNodeExecutorsList) {
      var url = Vue.gvUtil.getUrl({
        apiName: "confirmExecotorInner",
        contextName: "product",
      });
      Vue.gvUtil.http.post(url, gwNextNodeExecutorsList).then((res) => {
        if (res.resCode === "0000") {
          Vue.gvUtil.redirectTo({
            name: "workbenchApp",
          });
        }
      });
    },
    // 文件流下载
    resolveBlob(res, filename) {
      var eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([res]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    // 工作流弹窗
    showWorkflow(obj) {
      stores.commit("SET_WORKFLOW", {
        show: true,
        ...obj,
      });
    },
    // 轨迹图弹窗
    showTrail(obj) {
      stores.commit("SET_TRAILINFO", {
        show: true,
        ...obj,
      });
    },
    // 获取兑换率
    getAllExchCny: async function () {
      var url = Vue.gvUtil.getUrl({
        apiName: "comExchCny",
        contextName: "product",
      });
      let res = await Vue.gvUtil.http.post(url);
      return res.resData.businessList;
    },
    getGgExch: async function (baseCurrency, exchCurrency) {
      var url = Vue.gvUtil.getUrl({
        apiName: "getGgExch",
        contextName: "product",
      });
      let res = await Vue.gvUtil.http.post(url, {
        baseCurrency,
        exchCurrency,
      });
      return res.resData.exchangeRate;
    },
    getBrowserType: function getBrowserType() {
      var userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Chrome") === -1
      ) {
        // 判断是否Safari浏览器
        return "s";
      }
      if (
        (userAgent.indexOf("compatible") > -1 &&
          userAgent.indexOf("MSIE") > -1) ||
        userAgent.indexOf("Trident") > -1
      ) {
        // 判断是否IE浏览器
        return "i";
      }
      return "g";
    },
    replaceToUpperCase: function replaceToUpperCase(str) {
      // 首字母置为大写
      var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
      return str.replace(reg, function (m) {
        return m.toUpperCase();
      });
    },
    getQueryString: function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = decodeURI(window.location.search.substr(1)).match(reg);
      // console.log(window.location.search);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    },
    compare: function compare(property, flag) {
      var f = flag ? flag : true;
      return function (a, b) {
        var value1 = parseInt(a[property]) || 0,
          value2 = parseInt(b[property]) || 0;
        return f ? value1 - value2 : value2 - value1;
      };
    },
    openPdf: function openPdf(obj, flag) {
      var p = "",
        objs = {
          system: "", // 表所属系统
          reportName: "", // 报表名
          readonly: "", // 是否只读
        };
      $.extend(objs, obj || {});
      for (var o in objs) {
        p = p + "&" + o + "=" + objs[o];
      }
      p = p.substring(1);
      if (flag) {
        return "dist/pdf/web/viewer.html?" + p;
      } else {
        // var _wopen = window.open();
        // setTimeout(function() {
        //     _wopen.location = ;
        // }, 200);
        window.open("dist/pdf/web/viewer.html?" + p);
      }
    },
    // 导出
    toExcel: function toExcel(obj) {
      if (!obj) {
        return;
      }
      if (typeof ExportJsonExcel === "function") {
        new ExportJsonExcel(obj).saveExcel();
      } else {
        require.async("exportJsonExcel", function () {
          new ExportJsonExcel(obj).saveExcel();
        });
      }
    },
    // 导出excel，新增exclude字段（数组类型，有prop用prop，无则使用展示名称）以控制无需导出字段
    exportExcel: function exportExcel(
      ref,
      id,
      fileName,
      sheet,
      exclude,
      callFn
    ) {
      if (!ref || !id) {
        Vue.gvUtil.message(
          "The ref and ID values of the data table are not allowed to be empty"
        );
        return;
      }
      var d = this.getExeclData(ref, id),
        rm = [],
        sheetFilter = d.sheetFilter.filter(function (item, index) {
          var flag = !~(exclude || []).indexOf(item);
          if (!flag) {
            rm.push(index);
          }
          return flag;
        }),
        sheetHeader = d.sheetHeader.filter(function (item, index) {
          return !~rm.indexOf(index);
        });
      //////debugger
      var config = {
        fileName: fileName || "execl",
        datas: [{
          sheetData: d.sheetData.length ? d.sheetData : [{}],
          sheetName: sheet || "sheet",
          sheetFilter: sheetFilter,
          sheetHeader: sheetHeader,
        }, ],
      };
      typeof callFn == "function" && callFn(config);
      this.toExcel(config);
    },
    getExeclData: function getExeclData(ref, id) {
      if (!$("#" + id)) {
        Vue.gvUtil.message(
          "The ID reference of the data table is null, please check the settings"
        );
        return;
      }
      var sheetHeader = [],
        sheetFilter = [],
        sheetData = [],
        rmcol = [],
        columns = ref.columns,
        trs = $("#" + id)
        .find(".el-table__body-wrapper")
        .find("tbody")
        .find("tr"),
        da = {},
        cs;
      //
      // console.log(ref,columns)
      columns.forEach(function (item, index) {
        if (item.label) {
          sheetHeader.push(item.label);
          sheetFilter.push(item.property || item.label);
        } else {
          rmcol.push(index);
        }
      });
      trs.each(function () {
        var tr = $(this).children();
        da = {};
        cs = tr.filter(function (index) {
          return !~rmcol.indexOf(index);
        });
        cs.each(function (i) {
          var prop = sheetFilter[i],
            val = "",
            _input = $(this).find("input");
          if (_input && _input.length > 0) {
            val = _input.val();
          } else {
            val = $.trim($(this).text());
          }
          da[prop] = val;
        });
        sheetData.push(da);
      });

      /* for (var c in columns) {
                sheetHeader.push(columns[c].label);
                sheetFilter.push(columns[c].property);
            }
            for (var i = 0, len = trs.length; i < len; i++) {
                da = {};
                cs = $(trs[i]).find('div.cell');
                for (var j = 0, lenj = cs.length; j < lenj; j++) {
                    console.log($.trim($(cs[j]).text()));
                    da[sheetFilter[j]] = $.trim($(cs[j]).text());
                }
                sheetData.push(da);
            } */
      return {
        sheetHeader: sheetHeader,
        sheetFilter: sheetFilter,
        sheetData: sheetData,
      };
    },
    getSearchString: function getSearchString(obj) {
      if (!obj || obj === "") {
        return "";
      }
      if (obj.indexOf("?") > 0) {
        obj = obj.substring(obj.indexOf("?") + 1);
        return obj;
      } else {
        return "";
      }
    },
    getSearchJson: function getSearchJson(obj) {
      if (!obj || obj === "") {
        return null;
      }
      var objs = obj.split("&"),
        s = [],
        t = {};
      for (var o in objs) {
        s = objs[o].split("=");
        if (s && s.length > 1) {
          t[s[0]] = s[1];
        }
      }
      return t;
    },
    translationData: function translationData(code, key) {
      //
      var c = cache.getCodeTypeCache(),
        v = c.get(Vue.gvUtil.md5(code));
      key = key + "";
      if (v) {
        for (var name in v) {
          if (v[name]["codeCode"] === key) {
            return v[name]["codeName"];
          }
        }
      }
      return "";
    },
    translationPoData: function translationPoData(poObj, key) {
      let {
        poName,
        code,
        name
      } = poObj;
      var cacheKey = Vue.gvUtil.md5(
          JSON.stringify({
            poName,
          }) || ""
        ),
        c = Vue.gvUtil.getCache(),
        v = c.get(cacheKey);

      if (v) {
        var obj = v.find((e) => e[code] == key);
        return obj ? obj[name] : "";
      }
      return "";
    },
    translationSelectData: function translationSelectData(poObj, key) {
      let {
        url,
        code,
        name,
        data
      } = poObj;
      var cacheKey = Vue.gvUtil.md5(url + JSON.stringify(data) || ""),
        c = Vue.gvUtil.getCache(),
        v = c.get(cacheKey);

      if (v) {
        var obj = v.find((e) => e[code] == key);
        return obj ? obj[name] : "";
      }
      return "";
    },

    getMixins: function getMixins() {
      return tpMixins;
    },

    getCache: function getCache(type) {
      var c = null;
      if (!type) {
        type = "code";
      }
      switch (type) {
        case "code":
          c = cache.getCodeTypeCache();
          break;
        case "menu":
          c = cache.getMenusCache();
          break;
        case "select":
          c = cache.getSelectCache();
          break;
      }
      return c;
    },
    /**
     * 获取url
     * @method get
     * @param {Object} obj
     */
    getUrl: function getUrl(obj) {
      // console.log(obj)
      return apiService.get(
        obj.apiName,
        obj.serachParms || null,
        obj.urlParams || null,
        obj.contextName || ""
      );
    },

    setApi: function setApi(obj) {
      apiService.registerApi(obj);
    },

    setContext: function setContext(obj) {
      apiService.registerContext(obj);
    },

    setComponents: function setComponents(obj) {
      components = $.extend(true, components, obj || {});
    },

    getComponents: function getComponents(name) {
      return components[name] || null;
    },

    setStore: function setStore(obj) {
      store = $.extend(true, store, obj || {});
    },

    getStore: function getStore(flag) {
      if (!flag) {
        setTimeout(function () {
          store = null;
          store = {};
        }, 1000);
      }
      return store.store;
    },

    getRouter: function getRouter(flag) {
      if (!flag) {
        setTimeout(function () {
          router = null;
          router = [];
        }, 1000);
      }
      return router;
    },

    setTranslations: function setTranslations(url) {
      translations = $.extend(
        true,
        translations,
        JSON.parse(
          $.ajax({
            url: url,
            async: false,
            dataType: "json",
          }).responseText
        ) || {} || {}
      );
    },

    getTranslations: function getTranslations(flag) {
      if (!flag) {
        setTimeout(function () {
          translations = null;
          translations = {};
        }, 1000);
      }
      return translations;
    },

    setRouterObject: function setRouterObject(obj) {
      routerObj = obj;
    },

    getRouterObject: function getRouterObject() {
      return routerObj;
    },

    setConfig: function setConfig(obj) {
      obj.timeout && axiosConfig.axiosObject.setTimeouts(obj.timeout);
      obj.authValue && axiosConfig.axiosObject.setAuthValue(obj.authValue);
      obj.path && axiosConfig.axiosObject.setPath(obj.path);
      obj.authName && axiosConfig.axiosObject.setAuthName(obj.authName);
      stores.commit("SET_CONFIG", obj);
      $.extend(true, config, obj || {});
    },

    getVersion: function getVersion() {
      return config.version;
    },
    getConfig: function getConfig() {
      return config;
    },
    getMenuFlag: function getMenuFlag() {
      return layoutService.getMenuFlag();
    },

    destroyApp: function destroyApp(flag) {
      sessionStorage.removeItem("user");
      // layoutService.cancellation();
      if (flag) {
        layoutService.setMenuFlag(false);
        require("src/vuex/store.js").commit("CHANGE_HOME", {
          type: "",
        });
        window.gtyh = false;
        routerObj.push("/login");
        window.location.reload();
      }
    },
    getInzTranslate: function getInzTranslate(key) {
      return key && key !== "" ? Vue.filter("translate")(key) : "";
    },
    setVuexCache: function setVuexCache(key, value) {
      if (!key) {
        return;
      }
      var d = {};
      d[key] = value;
      require("src/vuex/store.js").commit("UPDATE_CACHE", d);
    },
    getVuexCache: function getVuexCache(key) {
      return key ? require("src/vuex/store.js").state.cache[key] : null;
    },
    handleRouter: function handleRouter(objs, path, flag) {
      var name = "",
        p = "";
      if (!path) {
        path = "";
      }
      for (var o in objs) {
        p =
          path !== "" && objs[o].path.indexOf("/") !== 0 ?
          path + "/" + objs[o].path :
          objs[o].path;
        name = objs[o].name;
        if (name) {
          _routerKeys[name] = p;
        }
        if (flag && objs[o].config) {
          _routerConfig["_" + p] = objs[o].config;
        }
        if (objs[o].children && objs[o].children.length > 0) {
          this.handleRouter(objs[o].children, p, flag);
        }
      }
    },
    addRoutes: function addRoutes(r, flag) {
      if (!r) {
        return;
      }
      if (!flag) {
        if (r.length > 0) {
          this.handleRouter(r);
        }
      } else {
        this.handleRouter(r, null, true);
        router = router.concat(r || []);
      }
      // if (!r || !flag)
      //     return;
      // this.handleRouter(r, null, true);
      // router = router.concat(r || []);
    },
    getMenusForKey: function getMenusForKey(path) {
      return layoutService.getMenusForKey(path);
    },
    registerRoutesForMenus: function registerRoutesForMenus(paths) {
      if (!paths || paths.length === 0) {
        return;
      }
      for (var name in paths) {
        _allowRouterConfig[paths[name]] = _routerConfig[paths[name]];
        delete _routerConfig[paths[name]];
      }
      paths = null;
    },
    getAjaxConfig: function getAjaxConfig(url, call) {
      if (url && url !== "") {
        var _this = this;
        // ////debugger
        $.ajax({
            url: url + ".js",
            dataType: "script",
          })
          .done(function (data) {
            var t = eval(data);
            if (t.router) {
              _this.addRoutes(t.router);
              routerObj.addRoutes(t.router);
              // _this.registerRoutes(paths[name]);
            }
            t.api && _this.setApi(t.api);
            call();
          })
          .fail(function (data) {
            // console.log(data);
            if (data.status == 0) {
              require("src/vuex/store.js").commit("COMMIT_DIALOG_LOGIN", {
                showLoading: true,
                isReload: true,
              });
            }
            // Vue.gvUtil.alert({
            //     msg: '无此资源权限'
            // });
          });
      }
    },
    // registerRoutes: function(path) {
    //     if (!path || !_router[path]) {
    //         return false;
    //     }
    //     path = path;
    //     routerObj.addRoutes(_router[path]);
    //     _router[path] = null;
    //     delete _router[path];
    // },
    registerConfig: function registerConfig(searchPath, b, call, flag) {
      if (!searchPath || searchPath === "") {
        return;
      }
      if (b) {
        var s = searchPath.match(/(\S*)_app/);
        if (s && s.length > 1) {
          searchPath = searchPath.match(/(\S*)_app/)[1] + "_app";
        }
      }
      if (flag) {
        searchPath = "_" + searchPath;
      }
      if (_allowRouterConfig[searchPath]) {
        this.getAjaxConfig(_allowRouterConfig[searchPath], function () {
          delete _allowRouterConfig[searchPath];
          call && call();
        });
      } else {
        call && call();
      }
    },
    registerConfigExtend: function registerConfigExtend(name, call) {
      if (name && _routerKeys[name]) {
        name = _routerKeys[name];
      }
      if (!name) {
        return;
      }
      this.registerConfig(name, false, call, true);
    },
    getRouterNameForPath: function getRouterNameForPath(path) {
      return _routerKeys[path] || "";
    },
    getCookie: function getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      // ////debugger
      /* eslint no-cond-assign: "off" */
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    setTpToken: function setTpToken(token) {
      if (token) {
        _token = token;
      }
    },
    getTpToken: function getTpToken() {
      return _token;
    },
    redirectTo: function redirectTo(obj, flag) {
      var searchPath = "",
        _this = this;
      if (obj.register) {
        var p, s;
        if (!obj.name && obj.path) {
          s = obj.path.match(/(\S*)_app/); // 提取app
          if (s && s.length > 1) {
            s = obj.path.match(/(\S*)_app/)[1] + "_app";
          }
          p = s;
        } else {
          s = obj.name.match(/(\S*)App/);
          if (s && s.length > 1) {
            s = obj.name.match(/(\S*)App/)[1] + "App";
          }
          p = _routerKeys[s];
        }
        if (!p) {
          // console.log("!p");
          return;
        }
        layoutService.addMenu(p, obj.titleName || "");
        // this.registerRoutes('_' + p);
        if (!_allowRouterConfig["_" + p] && _routerConfig["_" + p]) {
          _allowRouterConfig["_" + p] = _routerConfig["_" + p];
          delete _routerConfig["_" + p];
        }
        searchPath = "_" + p;
      } else {
        if (obj.name && _routerKeys[obj.name]) {
          obj.path = _routerKeys[obj.name];
          // delete obj.name;
        }
        if (!obj.path) {
          // console.log("!obj.path1");
          return;
        }
      }

      searchPath = searchPath !== "" ? searchPath : "_" + obj.path;
      this.registerConfig(searchPath, true, function () {
        if (obj.name && _routerKeys[obj.name]) {
          obj.path = _routerKeys[obj.name];
          // delete obj.name;
        }
        if (!obj.path) {
          // console.log("!obj.path2");
          return;
        }
        if (obj.isTitle) {
          var title = Vue.gvUtil.getInzTranslate(obj.name + "Title"),
            s = require("src/vuex/store.js");
          // console.log(title);
          s.commit("BREADCRUMBS_TO", title);
        }
        if (obj.validationVoName) {
          var url = Vue.gvUtil.getUrl({
            apiName: "layoutValidationConfig",
            urlParams: {
              voName: obj.validationVoName,
            },
            contextName: "auth",
          });
          _this.http.get(url).then(function (res) {
            if (res.resCode === "0000") {
              if (!obj.shareStore) {
                obj.shareStore = {};
              }
              obj.shareStore.rules = res.resData[obj.validationVoName];
              _this.setVuexCache(obj.name, obj.shareStore);
              delete obj.name;
              delete obj.validationVoName;
              !flag && _this.handleQuery(obj);
              if (!obj.isBlank) {
                window.reMethods = null;
                routerObj.push(obj);
              } else {
                typeof obj.reMethods === "function" &&
                  (window.reMethods = obj.reMethods);
                obj.query.openFlag = "1";
                var re = routerObj.resolve(obj);
                window.open(re.href, "_blank");
              }
            }
          });
        } else {
          if (obj.shareStore) {
            _this.setVuexCache(obj.name, obj.shareStore);
          }
          delete obj.name;
          !flag && _this.handleQuery(obj);
          if (!obj.isBlank) {
            window.reMethods = null;
            routerObj.push(obj);
          } else {
            typeof obj.reMethods === "function" &&
              (window.reMethods = obj.reMethods);
            // console.log(window.reMethods)
            obj.query.openFlag = "1";
            var re = routerObj.resolve(obj);
            window.open(re.href, "_blank");
          }
        }
      });
    },
    handleQuery: function handleQuery(obj) {
      if (!obj.query) {
        return;
      }
      for (var name in obj.query) {
        obj.query[name] = this.compile(obj.query[name]);
      }
    },
    handleUnCompileQuery: function handleUnCompileQuery(obj) {
      if (!obj) {
        return {};
      }
      var o = {};
      for (var name in obj) {
        o[name] = this.unCompile(obj[name]);
      }
      // console.log(o)
      return o;
    },
    compile: function compile(code) {
      if (!code) {
        return "";
      }
      // code += this.getTpToken();
      // var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      // for (var i = 1, len = code.length; i < len; i++) {
      //     c += String.fromCharCode(code.charCodeAt(i) + len)
      // }
      // return escape(code);
      return code;
    },
    unCompile: function unCompile(code) {
      if (!code) {
        return "";
      }
      // code = unescape(code);
      // code = code.replace(this.getTpToken(), '');

      // var c = String.fromCharCode(code.charCodeAt(0) - code.length);
      // for (var i = 1, len = code.length; i < len; i++) {
      //     c += String.fromCharCode(code.charCodeAt(i) - len)
      // }
      return code;
    },
    redirectBack: function redirectBack(flag, type) {
      if (!flag) {
        routerObj.go(-1);
      } else {
        type &&
          opener &&
          typeof opener.reMethods === "function" &&
          (opener.reMethods(), (opener.reMethods = null));
        window.close();
      }
    },
    message: function message(msg, duration, type) {
      // return Vue.prototype.$message.error(msg || '');
      Vue.prototype.$message({
        message: msg || "",
        duration: duration !== 0 ? duration || 6000 : duration,
        type: type || "error",
        showClose: true,
      });
    },
    notify: function notify(msg, duration, type, title) {
      // return Vue.prototype.$message.error(msg || '');
      Vue.prototype.$notify({
        title: title || "Tips",
        message: msg || "",
        duration: duration !== 0 ? duration || 10000 : duration,
        type: type || "warning",
        dangerouslyUseHTMLString: true,
        showClose: true,
      });
    },
    alert: function alert(obj) {
      var o = {
          title: this.getInzTranslate("gTitlePrompt"),
          msg: "",
          confirmButtonText: null,
        },
        d = {};
      $.extend(true, o, obj);
      if (o.confirmButtonText) {
        d.confirmButtonText = o.confirmButtonText;
      }
      if (o.dangerouslyUseHTMLString) {
        d.dangerouslyUseHTMLString = o.dangerouslyUseHTMLString;
      }
      d.showClose = false;
      d.closeOnClickModal = false;
      return Vue.prototype.$alert(o.msg, o.title, d);
    },
    confirm: function confirm(obj) {
      var o = {
          title: this.getInzTranslate("gTitlePrompt"),
          msg: "",
          confirmButtonText: null,
          cancelButtonText: null,
        },
        d = {};
      $.extend(true, o, obj);
      if (o.confirmButtonText) {
        d.confirmButtonText = o.confirmButtonText;
      }
      if (o.cancelButtonText) {
        d.cancelButtonText = o.cancelButtonText;
      }
      if (o.dangerouslyUseHTMLString) {
        d.dangerouslyUseHTMLString = o.dangerouslyUseHTMLString;
      }
      d.showClose = false;
      d.closeOnClickModal = false;
      return Vue.prototype.$confirm(o.msg, o.title, d);
    },
    showModal: function showModal(com, obj) {
      return com && obj && Vue.prototype.$TpShowModal(com, obj);
    },
    // showDbClick: function(obj) {
    //     obj && Vue.prototype.$DbClick(obj);
    // },

    Page: function Page(obj) {
      if (obj.events) {
        if (!obj.methods) {
          obj.methods = {};
        }
        $.extend(true, obj.methods, obj.events);
      }

      obj.data = function (vm) {
        var d = {
          query: {},
          shareStore: {},
        };
        if (obj.query && typeof obj.query === "function") {
          $.extend(true, d.query, obj.query());
          // delete obj.query;
        }
        if (!obj.name || obj.name === "") {
          alert("请设置组件的name(组件的name必须和路由一至)，否则无法正常运行");
          return {};
        }
        if (
          obj.name &&
          obj.shareStore &&
          typeof obj.shareStore === "function"
        ) {
          var s = require("src/vuex/store.js");
          $.extend(true, d.shareStore, s.state.cache[obj.name] || {});
          // for (var name in n) {
          //     d.shareStore[name] = {};
          //     $.extend(true, d.shareStore[name], s.state.cache[name] || {});
          // }
          // delete obj.shareStore;
        }
        // if (obj.storeData) {
        //     d.storeData = {};
        //     $.extend(true, d.storeData, obj.storeData);
        // }
        // if (typeof obj.test === 'function') {
        //     obj.test();
        // }
        return $.extend(
          true,
          d,
          typeof obj.datas === "function" && obj.datas(vm),
          typeof obj.params === "function" && obj.params(vm)
        );
      };
      obj.mixins = [Vue.gvUtil.getMixins()];
      // typeof obj.datas === 'function' && delete obj.datas();
      // typeof obj.params === 'function' && delete obj.params();
      // delete obj.events;

      return obj;
    },

    compareObject: function compareObject(origin, target) {
      if (
        target &&
        (typeof target === "undefined" ? "undefined" : _typeof(target)) ===
        "object"
      ) {
        if (
          (typeof origin === "undefined" ? "undefined" : _typeof(origin)) !==
          "object"
        ) {
          return false;
        } else {
          if (JSON.stringify(origin) === JSON.stringify(target)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return origin === target;
      }
    },
    cloneObj: function cloneObj(obj, flag) {
      var str,
        newobj =
        (typeof obj === "undefined" ? "undefined" : _typeof(obj)) ===
        "object" && isNaN(obj.length) ? [] : {};
      if (
        (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object"
      ) {
        return;
      } else if (window.JSON) {
        (str = JSON.stringify(obj)), // 系列化对象
        (newobj = JSON.parse(str)); // 还原
        if (flag) {
          for (var name in newobj) {
            newobj[name] = "";
          }
        }
      } else {
        for (var i in obj) {
          newobj[i] =
            _typeof(obj[i]) === "object" ? this.cloneObj(obj[i]) : null;
        }
      }
      return newobj;
    },

    arrayToObject: function arrayToObject(key, value, data) {
      if (!key || !data) {
        return {};
      }
      var d = {};
      for (var name in data) {
        d[data[name][key]] = data[name][value];
      }
      return d;
    },

    md5: (function (_md) {
      function md5(_x) {
        return _md.apply(this, arguments);
      }

      md5.toString = function () {
        return _md.toString();
      };

      return md5;
    })(function (str) {
      return str ? md5(str) : "";
    }),
    getMd5: function getMd5(str) {
      return str ? md5(str) : "";
    },
    showNumber: function showNumber(thou, len, value) {
      var code = "";
      if (!len) {
        len = 2;
      } else {
        len = parseInt(len) || 2;
      }
      if (!value || parseFloat(value) === "0") {
        code = Number("0").toFixed(len);
        return code;
      }
      if (value && parseFloat(value) !== "0") {
        if (!isNaN(parseFloat(Vue.gvUtil.delcommafy(value)))) {
          var itemValue = parseFloat(Vue.gvUtil.delcommafy(value));
          // if (itemValue >= minValue && itemValue <= maxValue) {
          if (thou) {
            code = Vue.gvUtil.comdify(Number(itemValue).toFixed(len));
          } else {
            code = Number(value).toFixed(len);
          }
        } else {
          code = "";
        }
      }
      return code;
    },
    delcommafy: function delcommafy(num) {
      // 去除千分位中的‘，’
      num = num.toString();
      num = num.replace(/,/gi, "");
      return num;
    },
    comdify: function comdify(n) {
      var re = /\d{1,3}(?=(\d{3})+$)/g,
        n1 = n.replace(/^(-?\d+)((\.\d+)?)$/, function (s, s1, s2) {
          return s1.replace(re, "$&,") + s2;
        });
      return n1;
    },
    initTranslation: function initTranslation(codeType, callFn) {
      return new Promise(async (resolve, reject) => {
        var url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeList", //自保修改
            contextName: "selfins",
          }),
          _cache = Vue.gvUtil.getCache(),
          path = codeType,
          param = {
            codeType: codeType,
            validind: "1",
          },
          vo = "ggCodeVoList",
          cacheKey = Vue.gvUtil.md5(path),
          list = _cache.get(cacheKey);
        // param,
        // list;
        if (!list) {
          let res = await Vue.gvUtil.http.post(url, param, {
            shade: true,
            rt: true,
          });
          if (res.resCode === "0000") {
            var data = res.resData[vo];
            for (var t in data) {
              _cache.set(Vue.gvUtil.md5(t), data[t]);
            }
            typeof callFn === "function" && callFn.call(this);
          }
          resolve();
        } else {
          typeof callFn === "function" && callFn.call(this);
        }
      });
    },
    initTranslationSelect: async function initTranslationSelect(list, call) {
      if (list) {
        var obj = null,
          params = {},
          cacheKey = "",
          b = false,
          c = Vue.gvUtil.getCache();
        for (var key in list) {
          obj = list[key];
          let {
            url,
            data
          } = obj;
          cacheKey = Vue.gvUtil.md5(url + JSON.stringify(data) || "");
          if (!c.get(cacheKey)) {
            try {
              let res = await Vue.gvUtil.http.post(
                "product" + obj.url,
                obj.data
              );
              c.set(cacheKey, res.resData.businessList);
            } catch (err) {
              console.log(err);
            }
          }
        }
        call && call();
        // Promise.all()
      } else {
        call && call();
      }
    },
    /** 字符转日期
     *@param dateStr 日期格式的字符串
     */
    stringToDate: function stringToDate(dateStr) {
      if (typeof dateStr === "undefined") {
        return new Date();
      }
      if (
        (typeof dateStr === "undefined" ? "undefined" : _typeof(dateStr)) ===
        "object"
      ) {
        return dateStr;
      }
      var converted = Date.parse(dateStr),
        myDate = new Date(converted);
      if (isNaN(myDate)) {
        dateStr = dateStr.replace(/:/g, "-"); // 支持 2013:10:17
        dateStr = dateStr.replace(" ", "-"); // 支持 2013 10 17
        dateStr = dateStr.replace(".", "-"); // 支持 2013.10.17
        var arys = dateStr.split("-"); // 支持2013-10-17
        switch (arys.length) {
          case 7:
            // 2013-10-17-13-56-33-22 格式
            myDate = new Date(
              arys[0],
              parseInt(arys[1], 10) - 1,
              arys[2],
              arys[3],
              arys[4],
              arys[5],
              arys[6]
            );
            break;

          case 6:
            // 2013-10-17-13-56-33 格式
            myDate = new Date(
              arys[0],
              parseInt(arys[1], 10) - 1,
              arys[2],
              arys[3],
              arys[4],
              arys[5]
            );
            break;

          default:
            // 2013-10-17 格式
            myDate = new Date(arys[1] + "/" + arys[2] + "/" + arys[0]);
            break;
        }
      }
      return myDate;
    },
    /**
     * 比较两日期大小
     * @param time1
     * @param time2
     * @returns 0:time1小于time2；
     *          1：time1大于time2；
     *          2：time1等于time2
     */
    comPareDate: function comPareDate(time1, time2) {
      var a = this.stringToDate(time1).getTime(),
        b = this.stringToDate(time2).getTime(),
        c = 0;
      if (a > b) {
        c = 1;
      } else if (a === b) {
        c = 2;
      }
      return c;
    },
    /**
     * 相差月数
     * @param s_time 开始时间
     * @param e_time 结束时间
     * @param type String 月数加减 1：加；2：减
     * @param num int 月数
     */
    getMonthsApart: function getMonthsApart(s_time, e_time, type, num) {
      var _this = this,
        s = _this.stringToDate(s_time),
        e = _this.stringToDate(e_time),
        s_year = s.getFullYear(),
        s_month = s.getMonth(),
        s_day = s.getDate(),
        s_hour = s.getHours(),
        e_year = e.getFullYear(),
        e_month = e.getMonth(),
        e_day = e.getDate(),
        e_hour = e.getHours(),
        sum = (e_year - s_year) * 12 + (e_month - s_month);
      if (e_day - s_day < 0 || (e_day === s_day && e_hour > s_hour)) {
        sum -= 1;
      }
      if (type && typeof num === "number") {
        if (type === "1") {
          sum += num;
        } else {
          sum -= num;
        }
      }
      return sum;
    },
    /**
     * 时间加减
     * @param obj yearType 年份：'0' 加;1: 减
     *            year 加减多少年
     *            monthType 月份：'0' 加;1: 减
     *            month 加减多少月
     *            dayType 日：'0' 加;1: 减
     *            day 加减多少日
     */
    getHandleDate: function getHandleDate(time, obj) {
      var date = this.stringToDate(time);
      if (!date) {
        return;
      }
      var opt = $.extend({
            yearType: "0",
            monthType: "0",
            dayType: "0",
            year: null,
            month: null,
            day: null,
          },
          obj || {}
        ),
        s;
      if (opt.year) {
        s = date.getFullYear();
        if (opt.yearType === "0") {
          s += opt.year;
        } else {
          s -= opt.year;
        }
        date.setFullYear(s);
      }

      if (opt.month) {
        s = date.getMonth();
        if (opt.monthType === "0") {
          s += opt.month;
        } else {
          s -= opt.month;
        }
        date.setMonth(s);
      }

      if (opt.day) {
        s = date.getDate();
        if (opt.dayType === "0") {
          s += opt.day;
        } else {
          s -= opt.day;
        }
        date.setDate(s);
      }
      return date;
    },
    /**
     * 获取时区信息
     * @param Date date
     */
    getTimeZone: function getTimeZone(date) {
      //            var current = new Date();
      var tz;
      var zone = -date.getTimezoneOffset() / 60;

      if (zone > 9 || zone < -9) {
        tz = zone > 0 ? "GMT +" + zone + "00" : "GMT " + zone + "00";
      } else if (zone != 0) {
        tz = zone > 0 ? "GMT +0" + zone + "00" : "GMT -0" + -zone + "00";
      } else {
        tz = "GMT +0000";
      }
      //            console.log('Current TimeZone:' + tz);

      return tz;
    },
    getBtnAuth: function getBtnAuth(key) {
      var c = cache.getMenusCache();
      return c.get("BtnsData")["_" + key];
    },
    //四舍五入
    iTofixed: function iTofixed(num, fractionDigits) {
      return (
          Math.round(num * Math.pow(10, fractionDigits)) /
          Math.pow(10, fractionDigits) +
          Math.pow(10, -(fractionDigits + 1))
        )
        .toString()
        .slice(0, -1);
    },
    initTranslationPoName: async function initTranslationPoName(list, call) {
      // //////debugger
      if (list) {
        var obj = null,
          params = {},
          cacheKey = "",
          b = false,
          c = Vue.gvUtil.getCache(),
          promiseList = [],
          cacheKeyList = [];
        for (var key in list) {
          obj = list[key];
          cacheKey = Vue.gvUtil.md5(
            JSON.stringify({
              poName: obj,
            }) || ""
          );
          if (!c.get(cacheKey)) {
            // params[cacheKey] = obj;
            // b = true;
            params = {
              isFuzzy: "0",
              poName: obj,
            };
            var url = Vue.gvUtil.getUrl({
              apiName: "layoutSelectGGCodeOtherList",
              contextName: "auth",
            });
            try {
              let res = await Vue.gvUtil.http.post(url, params);

              c.set(cacheKey, res.resData.businessList);
            } catch (err) {
              console.log(err);
            }
          }
        }
        call && call();
        // Promise.all()
      } else {
        call && call();
      }
    },
    //auth:wk 判断一个或者多个字符串是不是空串，undefined,null,如果是则返回true,不是返回false.
    judgStrIsEmpty() {
      //
      var flag = "0";
      var l = arguments.length;
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == null || arguments[i] == undefined) {
          return true;
        }
        var str = arguments[i] + "".replace(/\s*/g, "");
        if (str == "") {
          flag = "1";
          break;
        }
      }
      if (flag == "1") {
        return true;
      } else {
        return false;
      }
    },
    setPurchaseMenu(name, isRead, row) {
      stores.state.formRouter = name;
      //   ////debugger;
      if (name == "purchaseQuoteEntryApp") {
        stores.state.topmenus = [{
            name: "方案信息",
            id: 0,
            appName: "schemeApp1",
            isReadonly: true,
            taskObj: row,
          },
          {
            name: "报价信息",
            id: 1,
            appName: "purchaseQuoteEntryApp",
            isReadonly: isRead ? true : false,
            taskObj: row,
          },
        ];
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseTechScoreApp") {
        stores.state.topmenus = [{
            name: "方案信息",
            id: 0,
            appName: "schemeApp1",
            isReadonly: true,
          },
          {
            name: "报价信息",
            id: 1,
            appName: "purchaseQuoteEntryApp",
            isReadonly: true,
          },
          {
            name: "技术评分",
            id: 2,
            appName: "purchaseTechScoreApp",
            isReadonly: isRead ? true : false,
          },
        ];
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseOpenQuotationRecordApp") {
        stores.state.topmenus = [{
            name: "方案信息",
            id: 0,
            appName: "schemeApp1",
            isReadonly: true,
          },
          {
            name: "报价信息",
            id: 1,
            appName: "purchaseQuoteEntryApp",
            isReadonly: true,
          },
          {
            name: "开报价记录",
            id: 3,
            appName: "purchaseOpenQuotationRecordApp",
            isReadonly: isRead ? true : false,
          },
        ];
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseProposalConfirmApp") {
        if (stores.state.isSingle) {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "投保单位确认",
              id: 4,
              appName: "purchaseProposalConfirmApp",
              isReadonly: isRead ? true : false,
            },
          ];
        } else {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "投保单位确认",
              id: 4,
              appName: "purchaseProposalConfirmApp",
              isReadonly: isRead ? true : false,
            },
          ];
        }
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseSelfInsurcnceApp") {
        if (stores.state.isSingle) {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "自保信息",
              id: 5,
              appName: "purchaseSelfInsurcnceApp",
              isReadonly: isRead ? true : false,
            },
          ];
        } else {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "开报价记录",
              id: 3,
              appName: "purchaseOpenQuotationRecordApp",
              isReadonly: true,
            },
            {
              name: "自保信息",
              id: 5,
              appName: "purchaseSelfInsurcnceApp",
              isReadonly: isRead ? true : false,
            },
          ];
        }
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseReInsurcnceApp") {
        stores.state.topmenus = [{
          name: "再保经纪人录入",
          id: 6,
          appName: "purchaseReInsurcnceApp",
          isReadonly: false,
        }, ];
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseDomesticretentionApp") {
        if (stores.state.isSingle) {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "国内自留",
              id: 7,
              appName: "purchaseDomesticretentionApp",
              isReadonly: isRead ? true : false,
            },
          ];
        } else {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "开报价记录",
              id: 3,
              appName: "purchaseOpenQuotationRecordApp",
              isReadonly: true,
            },
            {
              name: "国内自留",
              id: 7,
              appName: "purchaseDomesticretentionApp",
              isReadonly: isRead ? true : false,
            },
          ];
        }
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseResultsReportApp") {
        if (stores.state.isSingle) {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "再保信息",
              id: 8,
              appName: "purchaseReinsuranceInfoApp",
              isReadonly: true,
              isAudit: isRead,
            },
            {
              name: "评标结果报告",
              id: 9,
              appName: "purchaseResultsReportApp",
              isReadonly: isRead ? true : false,
            },
          ];
        } else {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "开报价记录",
              id: 3,
              appName: "purchaseOpenQuotationRecordApp",
              isReadonly: true,
            },
            {
              name: "再保信息",
              id: 8,
              appName: "purchaseReinsuranceInfoApp",
              isReadonly: true,
              isAudit: isRead,
            },
            {
              name: "评标结果报告",
              id: 9,
              appName: "purchaseResultsReportApp",
              isReadonly: isRead ? true : false,
            },
          ];
        }

        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseReinsuranceInfoApp") {
        stores.state.topmenus = [{
          name: "再保信息",
          id: 0,
          appName: "purchaseReinsuranceInfoApp",
          isReadonly: true,
        }, ];
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      } else if (name == "purchaseResultsReportAuditApp") {
        if (stores.state.isSingle) {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "再保信息",
              id: 8,
              appName: "purchaseReinsuranceInfoApp",
              isReadonly: true,
              isAudit: true,
            },
            {
              name: "评标结果报告",
              id: 9,
              appName: "purchaseResultsReportAuditApp",
              isReadonly: isRead ? true : false,
            },
          ];
        } else {
          stores.state.topmenus = [{
              name: "方案信息",
              id: 0,
              appName: "schemeApp1",
              isReadonly: true,
            },
            {
              name: "报价信息",
              id: 1,
              appName: "purchaseQuoteEntryApp",
              isReadonly: true,
            },
            {
              name: "开报价记录",
              id: 3,
              appName: "purchaseOpenQuotationRecordApp",
              isReadonly: true,
            },
            {
              name: "再保信息",
              id: 8,
              appName: "purchaseReinsuranceInfoApp",
              isReadonly: true,
              isAudit: true,
            },
            {
              name: "评标结果报告",
              id: 9,
              appName: "purchaseResultsReportAuditApp",
              isReadonly: isRead ? true : false,
            },
          ];
        }
        sessionStorage.setItem(
          "topmenus",
          JSON.stringify(stores.state.topmenus)
        );
      }

      //
      stores.state.paramSchemaNoD = sessionStorage.getItem("ps");
      stores.state.paramProposalNo = window.localStorage.getItem("pc");

      // stores.state.paramProposalNo =''
    },
    topMenuBlueBoder() {
      //
      setTimeout(() => {
        if (stores.state.remarkNumber < 100) {
          $(".ia_im_blueBorder").eq(0).removeClass("ia_im_blueBorder");
          $(".ia-im-topMenuItem")
            .eq(stores.state.remarkNumber)
            .addClass("ia_im_blueBorder");
        }
      }, 300);
    },
    getMenuList() {
      return layoutService.getMenusData();
    },
  };

  function plugin(Vue) {
    Vue.gvUtil = gvUtil;
  }
  window.browserType = gvUtil.getBrowserType();
  Vue.use(plugin);
});
/**
 * 缓存
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/utils/cache.js", [], function (require, exports, module) {
  var SimpleCache = function SimpleCache(maxSize) {
    // 保存数据的map
    this.map = {};

    // 缓存的最大容量，默认缓存20个对象
    this.maxSize = 20;

    if (maxSize && maxSize !== "") {
      this.maxSize = maxSize;
    }

    // 当前缓存的容量
    this.size = 0;
  };

  SimpleCache.init = function (maxSize) {
    return new SimpleCache(maxSize);
  };

  SimpleCache.prototype = {
    /**
     * 根据key从缓存中取数据
     */
    get: function get(key) {
      if (this.map.hasOwnProperty(key)) {
        var obj = this.map[key];

        obj.freq = obj.freq + 1;

        return obj.value;
      }

      return null;
    },
    /**
     * 保存数据到缓存,缓存容量到达上限后删除使用频率最低的
     */
    set: function set(key, value) {
      this.map[key] = {
        value: value,
        freq: 0,
      };

      this.size++;

      // 缓存容量到达上限后删除使用频率最低的
      if (this.size > this.maxSize) {
        var minKey = null,
          minFreq = -1,
          count = 0;
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            count++;
            if (count === 1) {
              minFreq = this.map[name].freq;
              minKey = name;
            }

            if (this.map[name].freq < minFreq) {
              minFreq = this.map[name].freq;
              minKey = name;
            }
          }
        }

        delete this.map[minKey];
        this.size--;
      }
    },

    /**
     * 清空缓存
     */
    clear: function clear() {
      this.map = {};
      this.size = 0;
    },
  };

  /**
   * 缓存管理
   */
  return {
    /**
     * 获取下拉框缓存
     */
    getSelectCache: function getSelectCache() {
      return !window.selectCache ?
        (window.selectCache = SimpleCache.init(100)) :
        window.selectCache;
    },

    /**
     * 获取数据字典缓存
     */
    getCodeTypeCache: function getCodeTypeCache() {
      return !window.codeTypeCache ?
        (window.codeTypeCache = SimpleCache.init(200)) :
        window.codeTypeCache;
    },
    /**
     * 获取菜单缓存
     */
    getMenusCache: function getMenusCache() {
      return !window.menusNameCache ?
        (window.menusNameCache = SimpleCache.init(5)) :
        window.menusNameCache;
    },
  };
});
/**
 * 加载
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/loading/loading.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<transition name="fade">\
        <div class="loading">\
            <div class="loading-body">\
                <img width="40" height="40" src="./dist/img/loading.gif">\
                <p class="desc">{{title}}</p>\
            </div>\
        </div>\
    </transition>',
    props: {
      title: {
        type: String,
        default: "载入中",
      },
    },
  };
});
/**
 * 搜索框 Todo
 * @author 陈柱良
 * @time 2017/10/18
 */
define("src/components/search/search.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
            <div>\
                <el-input class="gv-btn-primary" size="mini" v-model="code" style="width:35%;" @blur="onSearch(true)"></el-input>\
                <el-input class="gv-btn-primary" size="mini" v-if="sndFieldShow" v-model="code2" style="width:45%;" :readonly="sndFieldReadonly"></el-input>\
                <el-button class="gv-btn-primary pd-f0" size="mini" type="primary" icon="el-icon-search" style="width:16%;" @click="onSearch(false)"></el-button>\
            </div>\
            ',
    props: {
      // 双向绑定
      value: "",
      // 弹出框配置
      dialogConfig: {
        type: Object,
        default: function _default() {
          return {};
        },
      },
      // 展示第二个输入域
      sndFieldShow: {
        type: Boolean,
        default: false,
      },
      // 第一个输入域的编码
      fieldCode: "",
      // 第二个输入域的编码
      sndFieldCode: "",
      // 第二个输入域只读
      sndFieldReadonly: {
        type: Boolean,
        default: true,
      },
    },
    data: function data() {
      return {
        code: "",
        code2: "",
      };
    },
    watch: {
      code: function code(val) {
        this.$emit("input", val);
      },
    },
    mounted: function mounted() {
      this.code = this.value;
    },
    methods: {
      // 搜索
      onSearch: function onSearch(isBlur) {
        var dialogConfig = this.dialogConfig,
          app = dialogConfig.app,
          register =
          dialogConfig.register !== undefined ? dialogConfig.register : true,
          path = dialogConfig.path,
          self = this;
        // 无路径，返回
        if (!path) {
          return;
        }
        if (app) {
          Vue.gvUtil.registerConfigExtend(
            "accountInquiryApp",
            function () {
              self.configDialog(isBlur);
            },
            register
          );
        } else {
          this.configDialog(isBlur);
        }
      },
      // 配置弹出框
      configDialog: function configDialog() {
        var self = this,
          dialogConfig = this.dialogConfig,
          path = dialogConfig.path,
          title = dialogConfig.title || "title",
          widthStyle = dialogConfig.widthStyle || "dialog-large",
          dialogProp = dialogConfig.dialogProp || {};
        // 无路径，返回
        if (!path) {
          return;
        }
        // 配置弹出框
        require.async(path, function (app) {
          var dialog = Vue.gvUtil.showModal(app, {
              title: title,
              widthStyle: widthStyle,
              isHide: true,
              dialogProp: dialogProp,
              callDialog: function callDialog(obj) {
                if (
                  (typeof obj === "undefined" ? "undefined" : _typeof(obj)) ===
                  "object" &&
                  obj.resList &&
                  obj.resList.length === 1
                ) {
                  obj = obj.resList[0];
                  self.fieldCode && (self.code = obj[self.fieldCode]);
                  self.sndFieldCode && (self.code2 = obj[self.sndFieldCode]);
                  var timer = setTimeout(function () {
                    dialog.close();
                    clearTimeout(timer);
                  }, 0);
                  // 自关闭
                  self.$emit("callDialog", obj);
                } else if (
                  (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !==
                  "object" ||
                  !obj.resList
                ) {
                  self.fieldCode && (self.code = obj[self.fieldCode]);
                  self.sndFieldCode && (self.code2 = obj[self.sndFieldCode]);
                  self.$emit("callDialog", obj);
                }
              },
            }),
            // 自查询
            timer1 = setTimeout(function () {
              dialog.$children[0].$children[0].onGetList();
              clearTimeout(timer1);
            }, 300);
        });
      },
    },
  };
});
/**
 * 下拉
 * @author 陈柱良
 * @time 2017/10/18
 */
define("src/components/select/select.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
            <transition name="fade">\
                <el-select ref="tpSelect" v-bind="$attrs" :name="name" :id="id" :filterable="true"   @change="onChange" ref="selectExtend" v-model="code" @input="updateValue()" @visible-change="visibleChange" @focus="focusSelect" :disabled="disableds">\
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">\
                    </el-option>\
                </el-select>\
            </transition>',
    props: {
      url: {
        type: String,
        default: "",
      },
      "context-name": {
        type: String,
        default: "",
      },
      value: [String, Number],
      codeType: String,
      optionsSet: {
        type: String,
        default: "0",
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      dataCorrectType: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      disabledOption: null,
      poName: {
        type: String,
        default: "",
      },
      select: {
        type: Object,
      },
      searchObject: {
        type: String,
        default: null,
      },
      codeName: {
        type: String,
        default: "",
      },
      labelName: {
        type: String,
        default: "",
      },
      labelNameEx: {
        type: String,
        default: "",
      },
      defaultParams: {
        type: String,
        default: "",
      },
      defaultEmit: {
        type: Boolean,
        default: false,
      },
      defaultValue: {
        type: String,
        default: "",
      },
      isCache: {
        type: Boolean,
        default: true,
      },
      defaultType: {
        type: Boolean,
        default: false,
      },
      orderByField: {
        // 要排序的字段
        type: String,
        default: "",
      },
      direction: {
        // 顺序还是倒序 desc，asc
        type: String,
        default: "",
      },
      isFuzzy: {
        //后台isFuzzy 0：模糊，1：不模糊 前端is-fuzzy false：模糊 true:不模糊
        type: Boolean,
        default: false,
      },
      index: String,
    },
    data: function data() {
      return {
        code: "",
        options: [],
        path: "",
        c: "",
        l: "",
        le: "",
        vo: "",
        cacheKey: "",
        disableds: false,
        // Todo 废弃
        // searchCacheList: {}
      };
    },
    watch: {
      value: function value(val, old) {
        //
        if (val !== old || (val == "" && old == "")) {
          this.onChange(val, true);
          this.code = val;
        }
      },
      searchObject: function searchObject(val, old) {
        if (val && val !== old) {
          this.initData();
        }
      },
      disabledOption: function disabledOption(val, old) {
        if (val && val !== old) {
          this.handleDisabledOption();
        }
      },
      codeType: function codeType(val) {
        if (val) {
          this.initData();
        }
      },
      poName: function poName(val) {
        if (val) {
          this.initData();
        }
      },
      disabled: function disabled(val) {
        this.disableds = val;
      },
      dataCorrectType: function dataCorrectType(val) {
        this.setParams("data-correct-type", val);
      },
      code: function code(val, old) {},
    },
    created: function created() {
      this.code = this.value;
      this.initData();
      this.disableds = this.disabled;
    },
    mounted: function mounted() {
      if (this.dataCorrectType)
        this.setParams("data-correct-type", this.dataCorrectType);
      this.setParams("is-select", "y");
    },
    methods: {
      updateValue: function updateValue() {
        //
        this.$emit("input", this.code);
        this.$emit("change", this.code);
      },
      focusSelect: function focusSelect() {
        this.$emit("focus");
      },
      visibleChange: function visibleChange(val) {
        this.$emit("visibleChange", val);
      },
      onChange: function onChange(obj, flag) {
        //
        var self = this,
          row;

        if (flag) {
          if (obj !== this.code && this.options.filter) {
            row = this.options.filter(function (item) {
              return item.value === obj;
            })[0];
            // this.$emit('row-select', this.searchCacheList[obj + ''], this.index);
            this.$emit("row-select", row, this.index);
          }
        } else if (this.options.filter) {
          row = this.options.filter(function (item) {
            return item.value === self.code;
          })[0];
          // this.$emit('row-select', this.searchCacheList[this.code + ''], this.index);
          this.$emit("row-select", row, this.index);
        }
      },
      initData: function initData() {
        var c = Vue.gvUtil.getCache(),
          _this = this,
          url = "",
          param = {},
          cacheKey = "",
          cacheKeyParam = null,
          list = null;
        if ((!this.poName || this.poName === "") && this.url === "") {
          // codeType
          url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeList", //自保修改
            contextName: "selfins",
          });
          this.path = this.codeType;
          this.c = this.codeName || "codeCode";
          this.l = this.labelName || "codeName";
          this.le = this.labelNameEx;
          param = {
            codeType: this.codeType,
            validind: "1",
          };
          this.vo = "ggCodeVoList";
          cacheKey = Vue.gvUtil.md5(this.path);
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
            cacheKeyParam = Vue.gvUtil.md5(
              this.path + JSON.stringify(param) || ""
            );
          }
        } else if (this.url !== "") {
          // url

          url = this.contextName + this.url;
          this.path = this.codeType;
          param = {};
          this.c = this.codeName || "codeCode";
          this.l = this.labelName || "codeName";
          this.le = this.labelNameEx;
          this.vo = "businessList";
          if (this.searchObject && _typeof(this.searchObject) === "object") {
            Object.assign(param, this.searchObject);
          }
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
          }
          cacheKey = Vue.gvUtil.md5(this.url + JSON.stringify(param) || "");
        } else {
          // poName
          url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeOtherList",
            contextName: "auth",
          });
          this.path = this.poName;
          param = {
            poName: this.poName,
          };
          this.c = this.codeName;
          this.l = this.labelName;
          this.le = this.labelNameEx;
          this.vo = "businessList";
          if (this.searchObject && _typeof(this.searchObject) === "object") {
            Object.assign(param, this.searchObject);
          }
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
          }
          cacheKey = Vue.gvUtil.md5(JSON.stringify(param) || "");
        }

        if (this.isCache) {
          if (cacheKeyParam) {
            list = c.get(cacheKeyParam);
          } else {
            list = c.get(cacheKey);
          }
        }
        if (this.orderByField && this.direction) {
          param.orderByField = this.orderByField;
          param.direction = this.direction;
        }
        param.isFuzzy = this.isFuzzy ? "1" : "0";
        if (!list) {
          this.requestData(url, param).then(function (res) {
            if (res.resCode === "0000") {
              var data = res.resData[_this.vo];
              if (_this.c === "codeCode") {
                data = data[_this.codeType];
              }
              _this.handleReturnData(data, c, cacheKey, cacheKeyParam);
            }
          });
        } else {
          this.handleReturnData(list);
        }
      },
      setParams: function setParams(name, value) {
        this.$refs.selectExtend.$el
          .querySelector("input")
          .setAttribute(name, value);
      },
      handleReturnData: function handleReturnData(
        data,
        c,
        cacheKey,
        cacheKeyParam
      ) {
        var self = this,
          result = [],
          item = null,
          optionsSet = this.optionsSet,
          cacheList = data;

        // 第一项
        if (optionsSet === "1") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("gAll");
        } else if (optionsSet === "2") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("gSelect");
        }
        item && result.push(item);
        if (data && data.length > 0) {
          // 选项
          data.forEach(function (tmp) {
            var value = tmp[self.c] + "",
              label = tmp[self.l],
              disabled;
            if (value === "false") {
              value = false;
            } else if (value === "true") {
              value = true;
            }
            if (self.le) {
              label = tmp[self.le] + " - " + label;
            }
            disabled =
              self.disabledOption && self.disabledOption.indexOf(value) > -1;
            tmp.value = value;
            tmp.label = label;
            tmp.disabled = disabled;
            result.push(tmp);
          });
        }
        if (optionsSet === "3") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("other");
          result.push(item);
        }

        this.options = result;

        if (this.defaultParams) {
          if (!this.defaultType && (this.value === "" || this.value === null)) {
            this.handleDefaultParams(cacheList);
          }
          if (this.defaultType) {
            this.handleDefaultParams(cacheList);
          }
        }

        if (c && this.isCache && cacheList) {
          if (cacheKeyParam) {
            c.set(cacheKeyParam, cacheList);
            var cacheListEx = c.get(cacheKey);
            if (cacheListEx) {
              cacheList = cacheList.concat(cacheListEx);
            }
            c.set(cacheKey, cacheList);
          } else {
            c.set(cacheKey, cacheList);
          }
        }
      },
      requestData: function requestData(url, param) {
        return Vue.gvUtil.http.post(url, param, {
          shade: false,
          rt: true,
        });
      },
      handleDisabledOption: function handleDisabledOption() {
        var obj = $.extend({}, this.options);
        for (var o in obj) {
          obj[o].disabled =
            this.disabledOption &&
            this.disabledOption.indexOf(obj[o].value) > -1;
        }
        this.options = obj;
      },
      handleDefaultParams: function handleDefaultParams(obj) {
        for (var o in obj) {
          if (obj[o][this.defaultParams] === "false") {
            obj[o][this.defaultParams] = false;
          } else if (obj[o][this.defaultParams] === "true") {
            obj[o][this.defaultParams] = true;
          }
          if (this.defaultValue === "false") {
            this.defaultValue = false;
          } else if (this.defaultValue === "true") {
            this.defaultValue = true;
          }
          if (obj[o][this.defaultParams] === this.defaultValue) {
            this.code = obj[o][this.c] + "";
            this.updateValue();
            if (this.defaultEmit) {
              this.onChange(obj[o][this.defaultParams]);
            }
          }
        }
      },
    },
  };
});
/**
 * 下拉
 * @author 王松
 * @time 2017/10/18
 */
define("src/components/select2/select2.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
            <transition name="fade">\
                <el-select ref="tpSelect" v-bind="$attrs" :name="name" :id="id" :filterable="true"    @change="onChange" ref="selectExtend" v-model="code" @input="updateValue()" @visible-change="visibleChange" @focus="focusSelect" :disabled="disableds">\
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">\
                    </el-option>\
                </el-select>\
            </transition>',
    props: {
      url: {
        type: String,
        default: "",
      },
      "context-name": {
        type: String,
        default: "",
      },
      value: [String, Number],
      codeType: String,
      optionsSet: {
        type: String,
        default: "0",
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      dataCorrectType: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        default: "",
      },
      //入参
      catalog: {
        type: String,
        default: "",
      },
      cedInd: {
        type: String,
        default: "",
      },
      valid: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      disabledOption: null,
      poName: {
        type: String,
        default: "",
      },
      select: {
        type: Object,
      },
      searchObject: {
        type: String,
        default: null,
      },
      codeName: {
        type: String,
        default: "",
      },
      labelName: {
        type: String,
        default: "",
      },
      labelNameEx: {
        type: String,
        default: "",
      },
      defaultParams: {
        type: String,
        default: "",
      },
      defaultEmit: {
        type: Boolean,
        default: false,
      },
      defaultValue: {
        type: String,
        default: "",
      },
      isCache: {
        type: Boolean,
        default: true,
      },
      defaultType: {
        type: Boolean,
        default: false,
      },
      orderByField: {
        // 要排序的字段
        type: String,
        default: "",
      },
      direction: {
        // 顺序还是倒序 desc，asc
        type: String,
        default: "",
      },
      isFuzzy: {
        //后台isFuzzy 0：模糊，1：不模糊 前端is-fuzzy false：模糊 true:不模糊
        type: Boolean,
        default: false,
      },
      index: String,
    },
    data: function data() {
      return {
        code: "",
        options: [],
        path: "",
        c: "",
        l: "",
        le: "",
        vo: "",
        cacheKey: "",
        disableds: false,

        // Todo 废弃
        // searchCacheList: {}
      };
    },
    watch: {
      value: function value(val, old) {
        //
        if (val !== old || (val == "" && old == "")) {
          this.onChange(val, true);
          this.code = val;
        }
      },
      searchObject: function searchObject(val, old) {
        if (val && val !== old) {
          this.initData();
        }
      },
      disabledOption: function disabledOption(val, old) {
        if (val && val !== old) {
          this.handleDisabledOption();
        }
      },
      codeType: function codeType(val) {
        if (val) {
          this.initData();
        }
      },
      poName: function poName(val) {
        if (val) {
          this.initData();
        }
      },
      disabled: function disabled(val) {
        this.disableds = val;
      },
      dataCorrectType: function dataCorrectType(val) {
        this.setParams("data-correct-type", val);
      },
      code: function code(val, old) {},
    },
    created: function created() {
      this.code = this.value;
      this.initData();
      this.disableds = this.disabled;
    },
    mounted: function mounted() {
      if (this.dataCorrectType)
        this.setParams("data-correct-type", this.dataCorrectType);
      this.setParams("is-select", "y");
    },
    methods: {
      updateValue: function updateValue() {
        //
        this.$emit("input", this.code);
        this.$emit("change", this.code);
      },
      focusSelect: function focusSelect() {
        this.$emit("focus");
      },
      visibleChange: function visibleChange(val) {
        this.$emit("visibleChange", val);
      },
      onChange: function onChange(obj, flag) {
        //
        var self = this,
          row;

        if (flag) {
          if (obj !== this.code && this.options.filter) {
            row = this.options.filter(function (item) {
              return item.value === obj;
            })[0];
            // this.$emit('row-select', this.searchCacheList[obj + ''], this.index);
            this.$emit("row-select", row, this.index);
          }
        } else if (this.options.filter) {
          row = this.options.filter(function (item) {
            return item.value === self.code;
          })[0];
          // this.$emit('row-select', this.searchCacheList[this.code + ''], this.index);
          this.$emit("row-select", row, this.index);
        }
      },
      initData: function initData() {
        var c = Vue.gvUtil.getCache(),
          _this = this,
          url = "",
          param = {},
          cacheKey = "",
          cacheKeyParam = null,
          list = null;
        if ((!this.poName || this.poName === "") && this.url === "") {
          // codeType
          url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeOtherList2", //自保修改
            contextName: "selfins",
          });
          this.path = this.codeType;
          this.c = this.codeName || "codeCode";
          this.l = this.labelName || "codeName";
          this.le = this.labelNameEx;
          param = {
            catalog: this.catalog,
            cedInd: this.cedInd,
            valid: this.valid,
            // codeType: this.codeType,
            // validind: "1",
          };
          // this.vo = "resData";
          cacheKey = Vue.gvUtil.md5(this.path);
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
            cacheKeyParam = Vue.gvUtil.md5(
              this.path + JSON.stringify(param) || ""
            );
          }
        } else if (this.url !== "") {
          // url

          url = this.contextName + this.url;
          this.path = this.codeType;
          param = {};
          this.c = this.codeName || "codeCode";
          this.l = this.labelName || "codeName";
          this.le = this.labelNameEx;
          // this.vo = "resData";
          if (this.searchObject && _typeof(this.searchObject) === "object") {
            Object.assign(param, this.searchObject);
          }
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
          }
          cacheKey = Vue.gvUtil.md5(this.url + JSON.stringify(param) || "");
        } else {
          // poName
          url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeOtherList2",
            contextName: "selfins",
          });
          this.path = this.poName;
          param = {
            catalog: this.catalog,
            cedInd: this.cedInd,
            valid: this.valid,
            // poName: this.poName,
          };
          this.c = this.codeName;
          this.l = this.labelName;
          this.le = this.labelNameEx;
          // this.vo = "resData";
          if (this.searchObject && _typeof(this.searchObject) === "object") {
            Object.assign(param, this.searchObject);
          }
          if (this.searchObject && typeof this.searchObject === "string") {
            Object.assign(param, JSON.parse(this.searchObject));
          }
          cacheKey = Vue.gvUtil.md5(JSON.stringify(param) || "");
        }

        if (this.isCache) {
          if (cacheKeyParam) {
            list = c.get(cacheKeyParam);
          } else {
            list = c.get(cacheKey);
          }
        }
        if (this.orderByField && this.direction) {
          param.orderByField = this.orderByField;
          param.direction = this.direction;
        }
        // param.isFuzzy = this.isFuzzy ? "1" : "0";
        if (!list) {
          this.requestData(url, param).then(function (res) {
            if (res.resCode === "0000") {
              var data = res.resData;
              if (_this.c === "codeCode") {
                data = data[_this.codeType];
              }
              _this.handleReturnData(data, c, cacheKey, cacheKeyParam);
            }
          });
        } else {
          this.handleReturnData(list);
        }
      },
      setParams: function setParams(name, value) {
        this.$refs.selectExtend.$el
          .querySelector("input")
          .setAttribute(name, value);
      },
      handleReturnData: function handleReturnData(
        data,
        c,
        cacheKey,
        cacheKeyParam
      ) {
        var self = this,
          result = [],
          item = null,
          optionsSet = this.optionsSet,
          cacheList = data;

        // 第一项
        if (optionsSet === "1") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("gAll");
        } else if (optionsSet === "2") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("gSelect");
        }
        item && result.push(item);
        if (data && data.length > 0) {
          // 选项
          data.forEach(function (tmp) {
            var value = tmp[self.c] + "",
              label = tmp[self.l],
              disabled;
            if (value === "false") {
              value = false;
            } else if (value === "true") {
              value = true;
            }
            if (self.le) {
              label = tmp[self.le] + " - " + label;
            }
            disabled =
              self.disabledOption && self.disabledOption.indexOf(value) > -1;
            tmp.value = value;
            tmp.label = label;
            tmp.disabled = disabled;
            result.push(tmp);
          });
        }
        if (optionsSet === "3") {
          item = {};
          item.value = "";
          item.label = Vue.filter("translate")("other");
          result.push(item);
        }

        this.options = result;

        if (this.defaultParams) {
          if (!this.defaultType && (this.value === "" || this.value === null)) {
            this.handleDefaultParams(cacheList);
          }
          if (this.defaultType) {
            this.handleDefaultParams(cacheList);
          }
        }

        if (c && this.isCache && cacheList) {
          if (cacheKeyParam) {
            c.set(cacheKeyParam, cacheList);
            var cacheListEx = c.get(cacheKey);
            if (cacheListEx) {
              cacheList = cacheList.concat(cacheListEx);
            }
            c.set(cacheKey, cacheList);
          } else {
            c.set(cacheKey, cacheList);
          }
        }
      },
      requestData: function requestData(url, param) {
        return Vue.gvUtil.http.post(url, param, {
          shade: false,
          rt: true,
        });
      },
      handleDisabledOption: function handleDisabledOption() {
        var obj = $.extend({}, this.options);
        for (var o in obj) {
          obj[o].disabled =
            this.disabledOption &&
            this.disabledOption.indexOf(obj[o].value) > -1;
        }
        this.options = obj;
      },
      handleDefaultParams: function handleDefaultParams(obj) {
        for (var o in obj) {
          if (obj[o][this.defaultParams] === "false") {
            obj[o][this.defaultParams] = false;
          } else if (obj[o][this.defaultParams] === "true") {
            obj[o][this.defaultParams] = true;
          }
          if (this.defaultValue === "false") {
            this.defaultValue = false;
          } else if (this.defaultValue === "true") {
            this.defaultValue = true;
          }
          if (obj[o][this.defaultParams] === this.defaultValue) {
            this.code = obj[o][this.c] + "";
            this.updateValue();
            if (this.defaultEmit) {
              this.onChange(obj[o][this.defaultParams]);
            }
          }
        }
      },
    },
  };
});
/**
 * 表格
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/form-input/form-input.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<td :width="widths" :colspan="colspan">\
                        <el-form-item :prop="prop" :rules="rules">\
                            <slot></slot>\
                        </el-form-item>\
                    </td>',
    props: {
      width: {
        type: Number,
        default: 2,
      },
      prop: {
        type: String,
        default: "",
      },
      colspan: {
        type: String,
        default: "1",
      },
      rules: {
        type: Array,
        default: null,
      },
    },
    data: function data() {
      return {
        widths: ((this.width / 24) * 100).toFixed(2) + "%",
      };
    },
  };
});
/**
 * 表格
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/form-label/form-label.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<td :width="widths" :align="align" :colspan="colspan">\
            <span class="lable">\
                <em class="require" v-if="requires">*</em>\
                <slot></slot>\
                {{name}}\
            </span>\
        </td>',
    props: {
      keyName: {
        type: String,
        default: "",
      },
      requires: {
        type: Boolean,
        default: false,
      },
      width: {
        type: Number,
        default: 2,
      },
      colspan: {
        type: String,
        default: "1",
      },
      align: {
        type: String,
        default: "right",
      },
    },
    data: function data() {
      return {
        widths: ((this.width / 24) * 100).toFixed(2) + "%",
        name: this.keyName ? Vue.filter("translate")(this.keyName) + ":" : "",
      };
    },
    watch: {
      // 监听数据变化
      keyName: function keyName(val) {
        // 监听 data里面的wa,val是最新的值，old是旧的数据
        this.name = Vue.filter("translate")(val);
      },
    },
  };
});
/**
 * 表单引擎组件
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/form-engine/form-engine.js", [
  "src/components/form-engine/util.js",
], function (require, exports, module) {
  var util = require("src/components/form-engine/util.js");
  return {
    template: '\
            <el-form ref="form" :model="form" :inline="true" label-width="109px" class="table-line">\
                <template v-for="item in items">\
                    <!-- Object -->\
                    <table cellpadding="0" cellspacing="0" v-if="item.type === \'object\'" class="tp-table">\
                        <tr v-for="tr in item.trs">\
                            <template v-for="v in tr">\
                                <gv-form-label :keyName="v.nameKey" :requires="v.required" :width="item.labelWidth"></gv-form-label>\
                                <gv-form-input :prop="v.elementCode" :rules="v.rule" :width="item.inputWidth" :colspan="v.colSize" >\
                                    <component :is="v.comp" v-model="item.name ? form[item.name][v.elementCode] : form[v.elementCode]" @dispatch="dispatch" :engine="engine" ></component>\
                                </gv-form-input>\
                            </template>\
                        </tr>\
                    </table>\
                    <!-- List -->\
                    <el-table :data="item.name ? form[item.name] : form" v-if="item.type === \'list\'" border>\
                        <!-- 序号 -->\
                        <el-table-column v-if="item.showSN" label-class-name="require-star" :label="\'gNumber\' | translate(\'SN\')" width="70" align="center">\
                            <template scope="scope">\
                                <span>{{scope.$index + 1}}</span>\
                            </template>\
                        </el-table-column>\
                        <!-- 值 -->\
                        <el-table-column v-for="v in item.elems" :label-class-name="v.required ? \'require-star\' : \'\'" :label="v.nameKey | translate">\
                            <template slot-scope="scope">\
                                <gv-form-input :prop="(item.name ? item.name : \'\') + \'.\' + scope.$index + \'.\' + v.elementCode" :rules="v.rule">\
                                    <component :is="v.comp" :index="scope.$index" :flag="scope.row.flag && scope.row.flag !=\'U\' ? scope.row.flag : \'\'" v-model="scope.row[v.elementCode]" @dispatch="dispatch" :engine="engine" ></component>\
                                </gv-form-input>\
                            </template>\
                        </el-table-column>\
                        <!-- 操作 -->\
                        <el-table-column v-if="item.showOP" :label="\'gTitleOperation\' | translate(\'Operation\')" width="120">\
                            <template slot-scope="scope">\
                                <el-button class="gv-btn-warning" v-if="!(scope.row[item.readonly] || engine.isCorrectBtn)" size="mini" type="primary" icon="el-icon-minus" @click="onDeletes(scope.$index, item.name)"></el-button>\
                            </template>\
                        </el-table-column>\
                    </el-table>\
                    <div v-if="!(item.type !== \'list\' || engine.isCorrectBtn)" class="toolbar-btn toolbar-pagination" style="margin-bottom: 0;">\
                        <el-button class="gv-btn-primary" size="mini" type="primary" icon="el-icon-plus" @click="onAdd(item.name)"></el-button>\
                    </div>\
                </template>\
                <!-- BottomButton -->\
                <div :span="24" class="toolbar-btn toolbar-pagination" style="text-align: center;">\
                    <component v-for="btn in bottomBtns" :is="btn.comp" @dispatch="dispatch" :engine="form" ></component>\
                </div>\
            </el-form>',
    props: {
      // v-model
      value: {
        type: Array,
        default: function _default() {
          return [];
        },
      },
      // 页面对象, 用于配置API
      formCode: {
        type: String,
        default: "",
      },
      // 产品编码, 用于配置API
      productCode: {
        type: String,
        default: "",
      },
      // 标的编码，用于配置API
      subjectType: {
        type: String,
        default: "",
      },
      // 方案编码, 用于配置API
      planCode: {
        type: String,
        default: "",
      },
      // 传给引擎的外部数据
      data: {
        type: Object,
        default: function _default() {
          return {
            code: "findProduct",
          };
        },
      },
      // 表单为 List 时是否展示序号
      showSN: {
        type: Boolean,
        default: true,
      },
      // 只供查看，Todo
      readonly: {
        type: Boolean,
        default: false,
      },
      correct: {
        type: Number,
        default: 0,
      },
      handleType: {
        type: String,
        default: "0",
      },
    },
    data: function data() {
      return {
        // 只供查看
        isReadonly: false,
        // 页面元素
        items: [],
        // 底部按钮
        bottomBtns: [],
        // 表单数据
        form: {},
        // 校验规则
        ref: {},
      };
    },
    created: function created() {
      ((this.productCode && this.subjectType && this.planCode) ||
        this.formCode) &&
      this.initPage();
    },
    mounted: function mounted() {
      this.form = this.value;
    },
    computed: {
      engine: function engine() {
        return Object.assign({}, this.data, this.form);
      },
    },
    watch: {
      form: {
        handler: function handler(val) {
          this.$emit("input", val);
        },
        deep: true,
      },
      formCode: function formCode(val) {
        val && this.initPage();
      },
    },
    methods: {
      // 新增
      onAdd: function onAdd(name) {
        if (this.correct > 0 || this.handleType == "1") {
          this.$emit("onAdd", this.form, this.engine, this.$set, this.correct);
        } else {
          if (name) {
            if (this.form[name]) {
              this.form[name].push({});
            } else {
              this.$set(this.form, name, [{}]);
            }
          } else {
            this.form.push({});
          }
        }
      },
      // 删减
      onDeletes: function onDeletes(index, name) {
        if (this.correct > 0 || this.handleType == "1") {
          this.$emit("onDeletes", this.form, this.engine, index, this.correct);
        } else {
          if (name) {
            this.form[name].splice(index, 1);
          } else {
            this.form.splice(index, 1);
          }
        }
      },
      // 接收组件传来的事件，然后分发
      dispatch: function dispatch(item) {
        var event = item.event,
          value = item.value;
        this.$emit(event, value.val, value.val1, value.val2, value.val3);
      },
      // 初始化
      initPage: function initPage() {
        this.getViewObject();
        this.isReadonly = this.readonly;
      },
      // 获取页面对象
      getViewObject: function getViewObject() {
        var _this = this,
          key = this.productCode + this.planCode + this.subjectType;
        this.getViewObjectApi({
          formCode: this.formCode,
          productCode: this.productCode,
          planCode: this.planCode,
          subjectType: this.subjectType,
        }).then(function (res) {
          if (res.resCode === "0000") {
            var result = util.transformData(res.resData.object, key),
              rows = result.rows,
              bottomBtns = result.bottomBtns;
            _this.items = rows;
            _this.bottomBtns = bottomBtns;
          }
        });
      },
      // 获取页面对象
      getViewObjectApi: function getViewObjectApi(params) {
        var url = Vue.gvUtil.getUrl({
          apiName: params.formCode ?
            "layoutFormEngineForm" : "layoutFormEngine",
          urlParams: params,
          contextName: "auth",
        });
        return Vue.gvUtil.http.get(url);
      },
      // 表单校验
      validate: function validate(cb) {
        this.$refs.form.validate(cb);
      },
    },
  };
});
// 查找元素，针对弹出框
function closest(el, selector) {
  var matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

/**
 * 导航定位组件
 * @author 熊己娴 胡丽君
 * @time 2017/11/01
 */
//增加平滑滑动和自动撑开功能，修改样式
define("src/components/float-menu/float-menu.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
          <div class="float-nemu-wrapper">\
              <span class="el-icon-arrow-left" v-if="!show" @mouseover="more" style="position:fixed;right:0;width:25px;height:30px;line-height:30px;background:#006CB7;border-top-left-radius:15px;border-bottom-left-radius:15px;color:#fff;vertical-align:top"></span>\
              <ul  style="border: none" @click.stop v-if="show" @mouseleave="less" @mouseover="more">\
                  <li class="float-menu-item" class="float-nemu-li" v-for="item in list" :key="item.id" :class="{\'active\':index === item.id}" @click="select(item)">\
                      {{item.name}}\
                  </li>\
              </ul>\
          <div/>',
    props: {
      // 导航配置数据
      data: {
        type: Array,
        default: function _default() {
          return [];
        },
      },
      // 容器
      container: {
        type: String,
        default: "content-container",
      },
      // 子元素索引
      el: {
        type: Object,
        default: function _default() {
          return {};
        },
      },
      // 是否在弹出框中使用
      isDialog: {
        type: Boolean,
        default: false,
      },
    },
    data: function data() {
      return {
        // 子集列表
        list: [],
        // 被选中元素
        index: "",
        // 容器
        content: null,
        // Todo 废弃
        id: "",
        // 是否展示所有选项
        show: false,
      };
    },
    created: function created() {
      //
      var _this = this,
        index;
      this.list = this.data;
      if (this.list.length > 0) {
        index = this.index = this.list[0].id;
        this.$nextTick(function () {
          _this.content = !_this.isDialog ?
            document.querySelector("#" + _this.container) :
            closest(_this.el[index].$el, ".el-dialog__wrapper");
          //console.log(_this.content)
        });
      }
    },
    methods: {
      /**
       * 选中
       */
      select: function select(obj) {
        //
        var index = obj.id,
          item = this.el[index],
          offsetTop = item.$el.offsetTop;

        this.index = index;
        var d = this.content.scrollTop - offsetTop;
        // $("html,body").animate({this.content.scrollTop: offsetTop }, 500);
        document.getElementById(index).scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
        // console.log(item.$parent.$parent.activeNames);
        if (item.$parent.$parent.activeNames.indexOf(index) == -1) {
          item.$parent.$parent.activeNames.push(index);
        }

        //this.content.scrollTop = offsetTop;
      },
      more: function more() {
        this.show = true;
      },
      less: function less() {
        this.show = false;
      },
    },
  };
});
/**
 * 双击域模块
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/db-click/db-click.js", [], function (
  require,
  exports,
  module
) {
  var tpl =
    '<div style="min-height: 2em;"><div :class="{ \'inputColumn\': isColumn}" @dblclick="onDbClick(\'1\')" class="dblclick" >\
    <el-input  size="mini" :autofocus="autofocus" :data-correct-type="dataCorrectType" :maxlength="maxlength" @blur="onDbClick(\'2\')" :readonly="isReadonly" :placeholder="\'gDblclick\' | translate(\'Double click\')"  v-model="codeColumn" ></el-input><transition name="fade">\
    <el-dialog append-to-body top="5%" :title="title" :close-on-click-modal="false" custom-class="dialogForm dialog-middle" v-if="show" :visible.sync="show" :before-close="beforeClose">\
        <el-collapse v-model="activeNames">\
            <el-collapse-item :title="\'gTitleSearchData\' | translate(\'Search Data\')" name="1">\
                <el-form :inline="true" ref="filters" :model="filters" style="padding-bottom: 0px;padding-top: 0px;">\
                    <el-form-item v-if="searchParams.one.open" :label="searchParams.one.title" prop="searchOneParam">\
                        <el-input size="mini" v-model="filters.searchOneParam"></el-input>\
                    </el-form-item>\
                    <el-form-item v-if="searchParams.two.open" :label="searchParams.two.title" prop="searchTwoParam">\
                        <el-input size="mini" v-model="filters.searchTwoParam"></el-input>\
                    </el-form-item>\
                    <el-form-item>\
                        <el-button class="gv-btn-primary" size="mini" type="primary" @click="onGetList(\'1\')">{{"gBtnSearch" | translate("Search") }}</el-button>\
                        <el-button class="gv-btn-warning" size="mini" @click="onResetForm()">{{ "gBtnClear" | translate("Clear") }}</el-button>\
                        <el-button class="gv-btn-primary" v-if="isMoreSelect" size="mini" type="primary" @click="save()">{{"gBtnConfirm" | translate("Confirm") }}</el-button>\
                    </el-form-item>\
                </el-form>\
            </el-collapse-item>\
        </el-collapse>\
        <template>\
        <div v-if="isMoreSelect && tags.length > 0" class="block table-toolbar">\
        <el-tag class="tp-tag" v-for="tag in tags" :key="tag.name" closable :type="tag.type" size="mini" @close="handleClose(tag)">{{tag.name}}</el-tag></div>\
            <el-table ref="multipleTable" :data="datas" highlight-current-row border stripe style="width: 100%;" @select="handleSelectionChange1" @select-all="handleSelectionChange">\
                <el-table-column v-if="isMoreSelect" type="selection" width="55"></el-table-column>\
                <el-table-column prop="showOne" :label="tableProps.oneTitle">\
                </el-table-column>\
                <el-table-column prop="showTwo" :label="tableProps.twoTitle">\
                </el-table-column>\
                <el-table-column :label="\'gTitleOperation\' | translate(\'Operation\')" width="100">\
                    <template slot-scope="scope">\
                    <el-button class="gv-btn-primary" size="mini" type="primary" @click="onHandleSelect(scope.row)">{{ "gBtnSelect" | translate }}</el-button>\
                </template>\
                </el-table-column>\
            </el-table>\
        </template>\
        <div :span="24" class="toolbar-btn toolbar-pagination" style="padding-bottom: 10px;margin-bottom: 15px;overflow:hidden;">\
        <el-pagination style="float: right;" small @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :page-sizes="[10, 20]" :page-size="pageSize"\
         layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page.sync="currentPage">\
        </el-pagination>\
        </div>\
    </el-dialog>\
</transition></div><div v-if="isColumn" class="lableColumn"><el-input size="mini" v-model="lableColumn" @blur="onClickLableColumn()" :readonly="lableReadonly || isReadonly"></el-input></div></div>';
  return {
    template: tpl,
    data: function data() {
      return {
        isClickMultipleTable: true,
        tags: [],
        isInit: false,
        activeNames: ["1"],
        show: false,
        title: Vue.gvUtil.getInzTranslate("gDblclick"),
        filters: {
          searchOneParam: "",
          searchTwoParam: "",
        },
        tableProps: {
          oneShowParams: "codeCode",
          twoShowParams: "value",
          oneTitle: Vue.filter("translate")("gCode"),
          twoTitle: Vue.filter("translate")("gValue"),
        },
        config: {
          isOneOpenDialog: false, // 查询结果只有一条记录时是否打开双击域，true：打开；false：不打开
          codeType: "",
          poName: "",
          caseInsensitive: false,
        },
        searchParams: {
          // 双击域查询条件设置
          one: {
            name: "codeCode",
            value: "",
            title: Vue.filter("translate")("gCode"),
            open: true,
          },
          two: {
            name: "",
            value: "",
            title: "",
            open: false,
          },
        },
        ckey: false,
        path: "",
        autofocus: false,
        frontSearchParams: {},
        datas: [],
        total: 0,
        pageNo: 0,
        pageSize: 10,
        currentPage: 1,
        callBack: null,
        codeColumn: "", // 显示code的属性
        codeId: "", // code的Id
        lableColumn: "", // 显示详情的属性
        isColumn: false, // 是否显示详情
        selectHandleParamsData: null,
        selectHandleParamsExtend: {},
        lableParamsData: null,
        dbclickObjectData: null,
        tagCache: [],
        selectTags: [],
        //isMoreSelect: true
      };
    },
    props: {
      maxlength: {
        type: Number,
        default: 50,
      },
      lableReadonly: true,
      dataCorrectType: "",
      ids: "",
      value: [String, Number],
      "table-one-params": String,
      "table-one-title": String,
      "table-two-params": String,
      "table-two-title": String,
      // 'search-one-value': String,
      "search-one-params": String,
      "is-more-select": false,
      "case-insensitive": false,
      "search-one-title": String,
      "search-two-params": String,
      "search-two-title": String,
      "search-two-value": String,
      "pre-query-data": Object,
      "code-type": String,
      "select-handle-params": String,
      "view-object-code": String,
      index: String,
      "lable-params": String,
      "lable-value": String,
      code: {
        type: String,
        default: "",
      },
      "po-name": {
        type: String,
        default: "",
      },
      "context-name": {
        type: String,
        default: "system",
      },
      "is-one-show": {
        type: Boolean,
        default: false,
      },
      "is-readonly": {
        type: Boolean,
        default: false,
      },
      "dbclick-object": {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: "",
      },
      orderByField: {
        // 要排序的字段
        type: String,
        default: "",
      },
      direction: {
        // 顺序还是倒序 desc，asc
        type: String,
        default: "",
      },
    },
    methods: {
      onDbClick: function onDbClick(flag) {
        if (flag === "1") {
          this.ckey = true;
        } else if (flag !== "1") {
          if (this.codeColumn === "") {
            return;
          }
          if (this.ckey || this.show) {
            return;
          }
        }
        if (this.isReadonly) {
          return;
        }
        // if (!this.isInit) {
        this.isInit = true;
        this.initProps();
        this.initData();
        // }
        if (this.config.isOneOpenDialog) {
          this.show = true;
        }
        this.filters.searchOneParam = this.codeColumn;
        this.onGetList("2");
      },
      handleClose: function handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        for (var v in this.datas) {
          if (tag.id === this.datas[v][this.ids]) {
            this.$refs.multipleTable.toggleRowSelection(this.datas[v], false);
            break;
          }
        }
        this.selectTags[tag.id] = null;
        delete this.selectTags[tag.id];
      },
      // 翻页选中
      handleSelectPage: function handleSelectPage(tags, list) {
        this.isClickMultipleTable = false;
        if (
          this.$refs.multipleTable &&
          this.$refs.multipleTable.toggleRowSelection
        ) {
          for (var t in tags) {
            for (var l in list) {
              if (tags[t].id === list[l][this.ids]) {
                this.$refs.multipleTable.toggleRowSelection(list[l], true);
                break;
              }
            }
          }
        }
        this.isClickMultipleTable = true;
      },
      handleSelectionChange1: function handleSelectionChange1(val, row) {
        if (!this.isClickMultipleTable) return;
        var d = {},
          b = true;
        for (var t in this.tags) {
          if (this.tags[t].id === row[this.ids]) {
            b = false;
            this.selectTags[this.tags[t].id] = null;
            delete this.selectTags[this.tags[t].id];
            this.tags.splice(this.tags.indexOf(this.tags[t]), 1);
            break;
          }
        }
        if (b) {
          d = {};
          d.name = row[this.searchParams.one.name];
          d.id = row[this.ids];
          this.selectTags[d.id] = row;
          this.tags.push(d);
        }
      },
      handleSelectionChange: function handleSelectionChange(val) {
        var tag = [],
          d = {},
          b = true;
        if (val.length > 0) {
          for (var v in val) {
            for (var t in this.tags) {
              if (this.tags[t].id === val[v][this.ids]) {
                b = false;
                break;
              }
            }
            if (b) {
              d = {};
              d.name = val[v][this.searchParams.one.name];
              d.id = val[v][this.ids];
              this.selectTags[d.id] = val[v];
              this.tags.push(d);
            } else {
              b = true;
            }
          }
        } else {
          for (var da in this.datas) {
            this.selectTags[this.datas[da][this.ids]] = null;
            delete this.selectTags[this.datas[da][this.ids]];
            d = {};
            d.name = this.datas[da][this.searchParams.one.name];
            d.id = this.datas[da][this.ids];
            tag.push(d);
          }
          var ids = this.tags.map(function (item) {
            return item.id;
          });
          for (var ts in tag) {
            this.tags.splice(ids.indexOf(tag[ts].id), 1);
            ids.splice(ids.indexOf(tag[ts].id), 1);
          }
        }
      },
      initProps: function initProps() {
        var _t = !this.dbclickObjectData ? this : this.dbclickObjectData;

        this.config.poName = _t.poName;
        this.config.isOneOpenDialog = _t.isOneShow;
        this.config.codeType = _t.codeType;
        this.searchParams.one.value = _t.codeColumn;
        this.config.caseInsensitive = _t.caseInsensitive;
        if (this.preQueryData && _typeof(_t.preQueryData) === "object") {
          this.frontSearchParams = Object.assign({}, _t.preQueryData);
        }

        var tableProps = {
          oneShowParams: _t.tableOneParams,
          twoShowParams: _t.tableTwoParams,
          oneTitle: _t.tableOneTitle,
          twoTitle: _t.tableTwoTitle,
        };
        if (_t.tableOneParams && _t.tableOneParams !== "") {
          Object.assign(this.tableProps, tableProps);
        }
        if (_t.searchOneParams && _t.searchOneParams !== "") {
          Object.assign(this.searchParams.one, {
            name: _t.searchOneParams,
            title: _t.searchOneTitle,
            // value: this.searchOneValue,
            open: true,
          });
        }
        if (_t.searchTwoParams && _t.searchTwoParams !== "") {
          Object.assign(this.searchParams.two, {
            name: _t.searchTwoParams,
            title: _t.searchTwoTitle,
            value: _t.searchTwoValue,
            open: true,
          });
        }
        // if(!this.searchOneValue)
        this.selectHandleParamsData = _t.selectHandleParams;
        this.lableParamsData = _t.lableParams;
        if (this.selectHandleParamsData) {
          this.selectHandleParamsExtend = JSON.parse(
            this.selectHandleParamsData
          );
        }
      },
      initData: function initData() {
        this.filters.searchOneParam = this.searchParams.one.value;
        this.filters.searchTwoParam = this.searchParams.two.value;

        if (!this.config.poName && !this.code && !this.url) {
          this.searchParams.one.name = "codeCode";

          this.searchParams.one.title = Vue.filter("translate")("gCode");
          this.tableProps.oneShowParams = "codeCode";
          this.tableProps.twoShowParams = "codeName";
          this.tableProps.oneTitle = Vue.filter("translate")("gCode");
          this.tableProps.twoTitle = Vue.filter("translate")("gValue");
          this.frontSearchParams.codeType = this.config.codeType;
          this.frontSearchParams.validind = "1";
          this.config.receiveObject = "ggCodeVoList";
        } else {
          this.frontSearchParams.poName = this.config.poName;
          this.config.receiveObject = "businessList";
        }
      },
      beforeClose: function beforeClose() {
        this.show = false;
        var _this = this;
        setTimeout(function () {
          _this.codeColumn = "";
          _this.codeId = "";
        }, 300);
      },
      // 页码变动
      onHandleCurrentChange: function onHandleCurrentChange(val) {
        this.pageNo = val - 1;
        this.onGetList("3");
      },
      // 查询行数变动
      onHandleSizeChange: function onHandleSizeChange(val) {
        this.pageSize = val;
        this.onGetList("3");
      },
      // 获取用户列表
      onGetList: function onGetList(flag) {
        var para = {},
          _this = this;
        if (flag === "1") {
          this.pageNo = 0;
          this.currentPage = 1;
          this.tags = [];
          this.tagCache = [];
          this.selectTags = [];
        }
        if (
          (!this.config.poName || this.config.poName === "") &&
          this.code === "" &&
          this.url === ""
        ) {
          this.path = Vue.gvUtil.getUrl({
            apiName: "layoutDbclickGGCodeList",
            contextName: "auth",
            serachParms: {
              _pageSize: this.pageSize,
              _pageNo: this.pageNo,
            },
          });
        } else if (this.code !== "") {
          this.path = Vue.gvUtil.getUrl({
            apiName: "layoutDbclickGGCodeOtherListByCode",
            contextName: "auth",
            serachParms: {
              _pageSize: this.pageSize,
              _pageNo: this.pageNo,
            },
          });
        } else if (this.url !== "") {
          this.path =
            this.contextName +
            this.url +
            "?_pageSize=" +
            this.pageSize +
            "&_pageNo=" +
            this.pageNo;
        } else {
          this.path = Vue.gvUtil.getUrl({
            apiName: "layoutDbclickGGCodeOtherList",
            contextName: "auth",
            serachParms: {
              _pageSize: this.pageSize,
              _pageNo: this.pageNo,
            },
          });
        }
        this.searchParams.one.open &&
          this.filters.searchOneParam &&
          this.filters.searchOneParam !== "" &&
          (para[this.searchParams.one.name] = this.filters.searchOneParam);
        this.searchParams.two.open &&
          this.searchParams.two.name &&
          this.searchParams.two.name !== "" &&
          (para[this.searchParams.two.name] = this.filters.searchTwoParam);
        // 增加一个判断，如果是自定义url，那么url的参数中加一个value
        if (this.url !== "") {
          para.value = para[this.searchParams.one.name];
          //console.log(para)
        }
        Object.assign(para, this.frontSearchParams);
        if (this.code !== "") {
          if (_typeof(this.preQueryData) === "object") {
            para = this.preQueryData;
          } else {
            para = {};
          }
          if (!this.filters.searchOneParam) {
            this.filters.searchOneParam = "";
          }
          para.value = !this.config.caseInsensitive ?
            this.filters.searchOneParam :
            this.filters.searchOneParam.toUpperCase();
          para = Object.assign(para, {
            code: this.code,
          });
        }
        if (this.orderByField && this.direction) {
          para.orderByField = this.orderByField;
          para.direction = this.direction;
        }
        Vue.gvUtil.http.post(this.path, para).then(function (res) {
          if (res.resCode === "0000") {
            var datas = res.resData[_this.config.receiveObject],
              data = datas.content;
            _this.total = datas.total;
            if (!_this.config.isOneOpenDialog && !_this.show) {
              if (_this.total !== 1) {
                _this.show = true;
              } else {
                _this.onHandleSelect(data[0]);
              }
            }
            var twoShowParamsArr = _this.tableProps.twoShowParams.split(",");
            for (var d in data) {
              var twoShowValue = data[d][twoShowParamsArr[0]];
              for (var i = 1; i < twoShowParamsArr.length; i++) {
                twoShowValue += " -- " + data[d][twoShowParamsArr[i]];
              }
              data[d].showOne = data[d][_this.tableProps.oneShowParams];
              data[d].showTwo = twoShowValue;
            }
            _this.datas = data;
            if (_this.isMoreSelect) {
              if (flag === "2") {
                _this.tags = _this.handleTags(
                  _this.codeId || _this.filters.searchOneParam,
                  data,
                  _this.codeId
                );
              } else {
                _this.tagCache.length > 0 &&
                  _this.handleTagsExtend(_this.tagCache, data);
              }
              _this.$nextTick(function () {
                _this.handleSelectPage(_this.tags, _this.datas);
              });
            }
          } else {
            _this.total = 0;
            _this.datas = [];
          }
          _this.ckey = false;
        });
      },
      // Todo 尚未对id情况处理， 貌似该方法未用
      handleTagsExtend: function handleTagsExtend(tag, data) {
        var tags = [],
          t = {},
          b = false;
        for (var s in tag) {
          for (var d in data) {
            if (data[d][this.searchParams.one.name] === tag[s]) {
              b = true;
              this.selectTags[data[d][this.ids]] = data[d];
              break;
            }
          }
          if (!b) {
            t = {};
            t.name = tag[s];
            t.id = tag[s];
            tags.push(t);
          } else {
            b = false;
          }
        }
        tag = tags;
      },
      handleTags: function handleTags(str, data, isId) {
        if (!str || str === "") {
          return [];
        }
        var strs = str.split(","),
          tags = [],
          t = {},
          b = false,
          flag;
        for (var s in strs) {
          for (var d in data) {
            flag = isId ?
              data[d][this.ids] === strs[s] :
              data[d][this.searchParams.one.name] === strs[s];
            if (flag) {
              t = {};
              t.name = data[d][this.searchParams.one.name];
              t.id = data[d][this.ids];
              tags.push(t);
              b = true;
              this.selectTags[t.id] = data[d];
              break;
            }
          }
          if (!b) {
            for (var nt in this.selectTags) {
              flag = isId ?
                this.selectTags[nt][this.ids] === strs[s] :
                this.selectTags[nt][this.searchParams.one.name] === strs[s];
              if (flag) {
                t = {};
                t.name = this.selectTags[nt][this.searchParams.one.name];
                t.id = this.selectTags[nt][this.ids];
                tags.push(t);
                break;
              }
            }
            // this.tagCache.push(strs[s]);
          } else {
            b = false;
          }
        }
        return tags;
      },
      // 选择
      onHandleSelect: function onHandleSelect(row) {
        this.codeColumn = row[this.searchParams.one.name] || "";
        this.codeId = row[this.ids] || "";
        this.updateValue(this.codeColumn);
        if (this.lableParamsData) {
          this.lableColumn = row[this.lableParamsData] || "";
        }
        row.lableColumnEx = this.lableColumn;
        this.$emit(
          "row-select",
          row,
          this.selectHandleParamsExtend,
          this.index,
          this.viewObjectCode
        );

        this.show = false;
        this.filters.searchOneParam = this.codeColumn;
        this.filters.searchTwoParam = this.searchTwoValue;
        this.init();
      },
      onClickLableColumn: function onClickLableColumn() {
        if (!this.lableReadonly)
          this.$emit(
            "row-select-lable",
            this.lableColumn,
            this.selectHandleParamsExtend,
            this.index,
            this.viewObjectCode
          );
      },
      // 确认
      save: function save() {
        var s = "",
          id = "";
        for (var t in this.selectTags) {
          s += this.selectTags[t][this.searchParams.one.name] + ",";
          id += this.selectTags[t][this.ids] + ",";
        }
        this.codeColumn = s.slice(0, -1);
        this.codeId = id.slice(0, -1);
        this.updateValue(this.codeColumn);
        if (this.lableParamsData) {
          // var s = '';
          s = "";
          for (var t1 in this.selectTags) {
            s += this.selectTags[t1][this.lableParamsData] + ",";
          }
          this.lableColumn = s.length > 0 ? s.substring(0, s.length - 1) : "";
        }
        this.$emit(
          "row-select",
          this.selectTags,
          this.selectHandleParamsExtend,
          this.index,
          this.viewObjectCode
        );
        this.show = false;
        this.init();
      },
      updateValue: function updateValue(val) {
        this.$emit("input", val);
        this.$emit("change");
      },
      init: function init() {
        this.total = 0;
        this.pageNo = 0;
        this.currentPage = 1;
        this.tags = [];
      },
      // 清除表单
      onResetForm: function onResetForm() {
        // 暂时保留，此方法为重置，并非清除
        // this.$refs.filters.resetFields();
        // 以下为清除方法并搜索
        this.filters.searchOneParam = "";
        this.filters.searchTwoParam = "";
        this.onGetList("1");
      },
    },
    watch: {
      value: function value(val, old) {
        if (val !== old) {
          if (val !== this.codeColumn) {
            this.codeColumn = val;
            if ((val === "" || val === null) && old !== "") {
              this.lableColumn = "";
              this.$emit(
                "row-select",
                null,
                this.selectHandleParamsExtend,
                this.index,
                this.viewObjectCode,
                true
              );
            }
          }
        }
      },
      codeColumn: function codeColumn(val, old) {
        if (val === "" && old !== "") {
          this.lableColumn = "";
          this.updateValue("");
          this.$emit(
            "row-select",
            null,
            this.selectHandleParamsExtend,
            this.index,
            this.viewObjectCode,
            true
          );
        } else {
          this.updateValue(val);
        }
      },
      lableValue: function lableValue(val) {
        this.lableColumn = val;
      },
      searchTwoValue: function searchTwoValue(val) {
        this.filters.searchTwoParam = val;
      },
      preQueryData: {
        // 深度监听，可监听到对象、数组的变化
        handler: function handler(val, oldVal) {
          if (val && !Vue.gvUtil.compareObject(val, oldVal)) {
            if (
              (typeof val === "undefined" ? "undefined" : _typeof(val)) ===
              "object"
            ) {
              this.frontSearchParams = val;
            }
          }
        },
        deep: true,
      },
    },
    created: function created() {
      if (this.dbclickObject) {
        this.dbclickObjectData = JSON.parse(this.dbclickObject);
        this.isColumn =
          this.dbclickObjectData.lableParams !== "" &&
          this.dbclickObjectData.lableParams !== undefined ?
          true :
          false;
      } else {
        this.isColumn =
          this.lableParams !== "" && this.lableParams !== undefined ?
          true :
          false;
      }
      if (this.lableValue) {
        this.lableColumn = this.lableValue;
      }
      if (this.value) {
        this.codeColumn = this.value;
      }
    },
  };
});
/**
 * 显示模态弹窗入口
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/show-modal/show-modal.js", [], function (
  require,
  exports,
  module
) {
  var instance,
    tpl =
    '\
            <transition name="fade">\
                <el-dialog top="5%" :title="title" :close-on-click-modal="false" :width="width" custom-class="dialogForm" v-if="show" :visible.sync="show" :before-close="beforeClose"><!-- style="z-index: -1 !important" -->\
                    <component v-bind:is="currentView" @callDialog="callData" :dialogProp="dialogProp" v-if="show" @closeDialog="close"></component>\
                </el-dialog>\
            </transition>',
    initInstance = function initInstance(dcom, name, propsData) {
      var TpShowModal = {
        template: tpl,
        props: {
          widthStyle: {
            type: String,
            default: "dialog-large",
          },
        },
        data: function data() {
          return {
            currentView: "",
            show: false,
            width: "85%",
            title: Vue.filter("translate")("gTitleBasics"),
            callDialog: null,
            closeDialog: null,
            initData: null,
            dialogProp: {},
          };
        },
        methods: {
          initPage: function initPage() {
            typeof this.initData === "function" && this.initData();
          },
          close: function close() {
            if (typeof this.closeDialog === "function") {
              this.show = !this.closeDialog();
            } else {
              this.show = false;
            }
          },
          beforeClose: function beforeClose() {
            this.show = false;
          },

          callData: function callData(obj) {
            typeof this.callDialog === "function" && this.callDialog(obj);
            this.show =
              (typeof obj === "undefined" ? "undefined" : _typeof(obj)) ===
              "object" ?
              obj.showDialog :
              false;
          },
        },
        mounted: function mounted() {
          var _this = this;
          if (this.widthStyle === "dialog-middle") {
            this.width = "55%";
          } else if (this.widthStyle === "dialog-small") {
            this.width = "45%";
          }
          this.$nextTick(function () {
            _this.show = true;
            _this.initPage();
          });
        },
      };
      TpShowModal.components = {};
      TpShowModal.components[name] = dcom;
      var d = Vue.extend(TpShowModal);
      instance = new d({
        el: document.createElement("div"),
        propsData: propsData,
      });
      document.body.appendChild(instance.$el);
      return instance;
    },
    tpShowModal = function tpShowModal(dcom, options) {
      options.currentView = "dcom";
      var instance = initInstance(dcom, options.currentView, {
        widthStyle: options.widthStyle,
      });
      Object.assign(instance.$data, options || {});
      // return new Promise(function () {});
      return instance;
    };
  return tpShowModal;
});
/**
 * 启动器
 * @author 胡丽君
 * @time 2017/11/24
 */

define("src/components/upload/upload.js", [
  "src/components/upload/ViewImg.js",
], function (require, exports, module) {
  var ViewImg = require("src/components/upload/ViewImg.js");
  // var uploadJaxa = require('./uploadJaxa');
  return {
    template: '<div class="img-file-row">\
            <div style="flex:1;">\
                <div v-if="isSearchByBizNo" class="img-file-search">\
                    <el-input placeholder="请输入业务号" v-model="d_bizNo">\
                    <el-button class="gv-btn-primary" slot="append" icon="el-icon-search" @click.native="onSearchBizNo()"></el-button></div>\
                <div><div class="img-handel">\
                    <el-button class="gv-btn-warning" type="primary" @click="onRemove()" v-show="isEditing">删除</el-button>\
                    <el-button class="gv-btn-primary" type="primary" @click="onEditingToggle()" v-html="isEditing ? \'完成编辑\' : \'编辑\'"></el-button>\
                    <el-button class="gv-btn-primary" type="primary" @click="open = true" v-show="isShowUpload">批量上传</el-button></div>\
                    <el-checkbox-group class="img-wrapper" v-model="imgsChecked" :class="{\'edit-state\':isEditing}">\
                        <el-checkbox class="img-item" :label="file.docId" v-for="(file,index) in fileList" :key="file.docId">\
                            <img :src="file.thumbnailUrl" @click="onViewImg(index)">\
                            <p class="img-name" @click="onDownloadFile(file.downloadUrl)">\
                                {{file.fileName}}\
                            </p>\
                        </el-checkbox>\
                    </el-checkbox-group>\
                    <el-dialog top="10%" :title="title" custom-class="dialogForm" :visible.sync="open" @close="onCloseSelect">\
                        <div class="select-wrapper">\
                            <el-upload ref="upload" list-type="text" multiple :auto-upload="false">\
                                <el-button class="gv-btn-primary" slot="trigger" size="small" type="primary">点击选择照片</el-button>\
                                <el-button class="gv-btn-submit" style="margin-left: 10px;" size="small" type="primary" @click="upload()">提交照片</el-button>\
                                <el-button class="gv-btn-primary" style="margin-left: 10px;" size="small" type="primary" @click="reload()" v-show="uploadError.length">重新上传</el-button>\
                                \
                            </el-upload>\
                        </div>\
                    </el-dialog>\
                    </div>\
                    <el-dialog top="5%" :title="title" class="dialog-large" custom-class="dialogForm" :visible.sync="bigImage" @close="onBigImage">\
                        <view-img :fileSrc="viewImgSrc" :index="viewIndex" :lastIndex ="fileList.length" @changeIndex="onHandleChangeIndex"></view-img>\
                    </el-dialog>\
                    <div class="toolbar-btn toolbar-pagination" style="padding-bottom:10px;">\
                        <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :page-size="paginationOpt.pageSize" :total="paginationOpt.total" :current-page="paginationOpt.currentPage" :page-sizes="[8, 16, 32, 40]" layout="total, sizes, prev, pager, next, jumper">\
                        </el-pagination>\
                    </div>\
                </div>\
            </div>\
        </div>',
    data: function data() {
      return {
        d_bizNo: "",
        d_bizCode: "",
        bigImage: false,
        viewImgSrc: "",
        viewIndex: "",
        isEditing: false,
        title: "上传照片",
        open: false,
        dialogImageUrl: "",
        dialogVisible: false,
        imgsChecked: [],
        uploadError: [],
        menus: [],
        d_searchParms: {},
        fileList: [],
        paginationOpt: {
          pageSize: 8,
          currentPage: 1,
          total: 8,
        },
      };
    },
    computed: {
      isShowUpload: function isShowUpload() {
        return (
          this.uploadParam &&
          this.uploadParam.bizNo &&
          this.uploadParam.bizCode &&
          this.uploadParam.docType
        );
      },
    },
    props: {
      isShowMenu: {
        type: Boolean,
        default: true,
      },
      pageSize: Number,
      currentPage: Number,
      menuParentCode: String,
      menuSize: {
        type: Number,
        default: 100,
      },
      docType: String,
      bizCode: String,
      fileName: String,
      bizNo: String,
      uploadParam: Object,
      isLoadWhenOpening: false,
      isSearchByBizNo: false,
    },
    created: function created() {
      this.initProp();
    },
    methods: {
      initProp: function initProp() {
        if (this.pageSize) {
          this.paginationOpt = this.pageSize;
        }
        if (this.currentPage) {
          this.currentPage = this.currentPage;
        }
        if (!this.isShowMenu) {
          var parms = {};
          if (this.uploadParam.docType) {
            parms["docType"] = this.uploadParam.docType;
          }
          if (this.uploadParam.bizCode) {
            parms["bizCode"] = this.uploadParam.bizCode;
          }
          if (this.uploadParam.fileName) {
            parms["fileName"] = this.uploadParam.fileName;
          }
          if (this.uploadParam.bizNo) {
            parms["bizNo"] = this.uploadParam.bizNo;
          }
          this.d_searchParms = parms;
        } else {
          // this.initMenulist()
        }
        this.onGetImgList();
      },
      initMenulist: function initMenulist() {
        var _this = this,
          url,
          parms = {
            size: this.menuSize,
            parentCode: "",

            // if(this.uploadParam.bizCode) {
            //     parms.bizCode = this.uploadParam.bizCode
            // }
            // url = Vue.gvUtil.getUrl({
            //     apiName: 'uploadGetFileMenus',
            //     contextName: 'fs',
            //     urlParams: parms
            // })
          };
        if (this.menuParentCode) {
          parms.parentCode = this.menuParentCode;
        }
        url = Vue.gvUtil.getUrl({
          apiName: "uploadGetFileMenus",
          contextName: "fs",
          serachParms: parms,
        });
        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            _this.menus = res.resData.content;
          }
        });
      },
      onGetImgList: function onGetImgList() {
        var url,
          _this = this,
          _parms = {
            page: this.paginationOpt.currentPage - 1,
            size: this.paginationOpt.pageSize,
            order: "ASC",
            // _parms = Object.assign(_parms, this.d_searchParms)
          };
        if (this.uploadParam.bizNo) {
          _parms["bizNo"] = this.uploadParam.bizNo;
        }
        url = Vue.gvUtil.getUrl({
          apiName: "uploadGetFileList",
          contextName: "fs",
          serachParms: _parms,
        });

        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            _this.paginationOpt.total = res.resData.totalElements;
            _this.fileList = _this.onImgListHandle(res.resData.content);
          }
        });
      },
      onImgListHandle: function onImgListHandle(list) {
        list.forEach(function (elem) {
          if (!elem.thumbnailUrl) {
            elem.thumbnailUrl = "static/img/notImage.jpg";
          }
        });
        return list;
      },
      upload: function upload() {
        // 手动上传
        var uploadFiles = this.$refs.upload.uploadFiles,
          len = uploadFiles.length,
          flag = 0;
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            if (i === len - 1) {
              flag = 1;
            }
            uploadFiles[i].data = this.addFileName(uploadFiles[i].name);
            this.ajaxUpload(uploadFiles[i], flag);
          }
        } else {
          Vue.gvUtil.alert({
            msg: "请传入要上传的文件",
          });
        }
      },
      addFileName: function addFileName(name) {
        var obj = this.uploadParam;
        obj.fileName = name;
        return obj;
      },
      ajaxUpload: function ajaxUpload(file, flag) {
        var _this = this;
        if (typeof XMLHttpRequest === "undefined") {
          return;
        }
        var xhr = new XMLHttpRequest(),
          action = Vue.gvUtil.getUrl({
            apiName: "uploadAddFile",
            contextName: "fs",
          }),
          formData = new FormData();
        // 遍历传参对象
        if (file.data) {
          Object.keys(file.data).forEach(function (key) {
            formData.append(key, file.data[key]);
          });
        }
        formData.append("file", file.raw);
        if (xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = (e.loaded / e.total) * 100;
            }
            _this.$refs.upload.handleProgress(e, file.raw);
          };
        }
        xhr.onerror = function error(e) {
          // console.log(e);
          // option.onError(e);
        };
        xhr.onload = function onload() {
          var res = _this.getBody(xhr);
          if (xhr.status !== 200) {
            _this.uploadError.push(file);
            // return _this.$refs.upload.handleError(_this.getError(action, file, xhr),file.raw);
          }
          if (res.resCode === "0000") {
            _this.$refs.upload.handleSuccess(res, file.raw);
          }
          if (flag) {
            _this.paginationOpt.currentPage = 1;
            _this.onGetImgList();
            var errorLen = _this.uploadError.length;
            if (errorLen !== 0) {
              _this.onUploadDone("上传完成,有" + errorLen + "个文件上传失败");
            } else {
              _this.onUploadDone("上传完成,且全部成功,点击确定关闭");
            }
          }
          return false;
        };

        xhr.open("post", "http://10.0.102.12:8805/" + action, true);
        xhr.send(formData);
      },
      getBody: function getBody(xhr) {
        var text = xhr.responseText || xhr.response;
        if (!text) {
          return text;
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      },
      getError: function getError(action, option, xhr) {
        var msg;
        if (xhr.response) {
          msg = xhr.status + xhr.response.error || xhr.response;
        } else if (xhr.responseText) {
          msg = xhr.status + xhr.responseText;
        } else {
          msg = "fail to post" + action + xhr.status;
        }

        var err = new Error(msg);
        err.status = xhr.status;
        err.method = "post";
        err.url = action;
        return err;
      },
      onSearchBizNo: function onSearchBizNo() {
        this.d_bizCode = "";
        if (this.d_bizNo) {
          this.d_searchParms = {};
          this.d_searchParms.bizNo = this.d_bizNo;
          this.onGetImgList();
        }
      },
      onHandleselect: function onHandleselect(code) {
        this.d_bizNo = "";
        this.d_bizCode = code;
        this.d_searchParms = {};
        this.paginationOpt.currentPage = 1;
        this.d_searchParms.bizCode = code;
        this.onGetImgList();
      },
      onHandleSizeChange: function onHandleSizeChange(size) {
        this.paginationOpt.size = size;
        this.onGetImgList();
      },
      onHandleCurrentChange: function onHandleCurrentChange(currentPage) {
        this.paginationOpt.currentPage = currentPage;
        this.onGetImgList();
      },
      onViewImg: function onViewImg(index) {
        var url = this.fileList[index].downloadUrl;
        this.viewIndex = index;
        this.bigImage = true;
        if (/\.png|jpg|jpeg|pdf$/g.test(url)) {
          this.viewImgSrc = url;
        } else {
          this.viewImgSrc = "static/img/doc.jpg";
        }
      },
      onBigImage: function onBigImage() {
        this.onbigImage = true;
      },
      onHandleChangeIndex: function onHandleChangeIndex(changeIndex) {
        var url = this.fileList[changeIndex].downloadUrl;
        this.viewIndex = changeIndex;
        // this.viewImgSrc = url;
        if (/\.png|jpg|jpeg|pdf$/g.test(url)) {
          this.viewImgSrc = url;
        } else {
          this.viewImgSrc = "static/img/doc.jpg";
        }
      },
      onCloseSelect: function onCloseSelect() {
        this.open = false;
        this.uploadError = [];
        this.$refs.upload.clearFiles();
      },
      cancel: function cancel() {
        // 取消上传待完善
        this.$refs.upload.abort();
      },
      onUploadDone: function onUploadDone(mag) {
        this.$alert(mag);
      },
      reload: function reload() {
        var _this = this,
          flag = 0,
          errorList = this.uploadError,
          len = errorList.length;
        this.uploadError = [];
        errorList.forEach(function (elem, index) {
          if (index === len - 1) {
            flag = 1;
          }
          _this.ajaxUpload(elem, flag);
        });
      },
      onDownloadFile: function onDownloadFile(url) {
        window.open(url, "下载");
      },
      onEditingToggle: function onEditingToggle() {
        // 已编辑状态
        this.isEditing = !this.isEditing;
        this.imgsChecked = [];
      },
      onRemove: function onRemove() {
        var _this = this,
          idArray = [],
          url;
        // 删除已有照片
        if (this.imgsChecked.length > 0) {
          for (var k in this.imgsChecked) {
            this.fileList = this.fileList.filter(function (elem) {
              return elem.docId !== _this.imgsChecked[k];
            });
            idArray.push(parseInt(this.imgsChecked[k]));
          }
          this.imgsChecked = [];

          url = Vue.gvUtil.getUrl({
            apiName: "uploadRemoveFile",
            contextName: "fs",
            serachParms: {
              docIds: idArray,
            },
          });
          Vue.gvUtil
            .confirm({
              msg: "确认删除吗，确定后不可撤销",
            })
            .then(function () {
              Vue.gvUtil.http.delete(url).then(function (res) {
                if (res.resCode === "0000") {
                  _this.$emit("removeFile", idArray);
                }
              });
            });
        } else {
          this.$alert("请先选择照片");
        }
      },
    },
    components: {
      ViewImg: ViewImg,
    },
  };
});
/**
 * 富文本
 * @author 胡丽君
 * @time 2017/11/18
 */
define("src/components/quill-editor/quill-editor.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<el-row :span="24" class="quill-editor-warp">\
              <el-col  v-if="showMessage" :span="span1">\
                  <ul  v-if="!isEmail" class="quick-info-list">\
                      <li  class="cate-info-header">插入信息代码</li>\
                      <li>\
                          <ul class="cate-info-body">\
                              <li @click="addQuickly(item.code)" v-for="item in insertkeys">{{item.name}}</li>\
                          </ul>\
                      </li>\
                  </ul>\
              </el-col>\
              <el-col v-if="!isEmail" :span="span2" class="warp-main">\
                  <el-form>\
                      <el-form-item>\
                          <div class="edit_container editer">\
                              <div class="quill-editor">\
                                  <slot name="toolbar"></slot>\
                                  <div ref="editor"></div>\
                              </div>\
                          </div>\
                      </el-form-item>\
                  </el-form>\
              </el-col>\
               <el-col v-if="isEmail" :span="span2" :offset="2" class="warp-main">\
                  <el-form>\
                      <el-form-item>\
                          <div class="edit_container editer" style="position:relative;left:-7%;">\
                              <div class="quill-editor" style="padding-right: 8px;padding-left: 8px;position:relative;left:5px;">\
                              <slot name="toolbar"></slot>\
                              <div ref="editor"></div>\
                              </div>\
                          </div>\
                      </el-form-item>\
                  </el-form>\
              </el-col>\
          </el-row>',
    props: {
      content: String,
      value: String,
      disabled: Boolean,
      showMessage: Boolean,
      options: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        },
      },
      insertkeys: Array,
      isEmail: {
        type: Boolean,
        default: false,
      },
    },
    data: function data() {
      return {
        defaultModules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{
                header: 1,
              },
              {
                header: 2,
              },
            ],
            [{
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
            [{
                script: "sub",
              },
              {
                script: "super",
              },
            ],
            [{
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [{
              direction: "rtl",
            }, ],
            [{
              size: ["small", false, "large", "huge"],
            }, ],
            [{
              header: [1, 2, 3, 4, 5, 6, false],
            }, ],
            [{
                color: [],
              },
              {
                background: [],
              },
            ],
            [{
              font: [],
            }, ],
            [{
              align: [],
            }, ],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
        _content: "",
        insertIndex: "",
        span1: "4",
        span2: "20",
      };
    },
    created: function created() {
      // console.log(this.showMessage);
      if (!this.showMessage) {
        this.span2 = "24";
      }
    },
    computed: {
      editor: function editor() {
        return this.quill;
      },
    },
    mounted: function mounted() {
      this.initialize();
    },
    beforeDestroy: function beforeDestroy() {
      this.quill = null;
    },
    methods: {
      initialize: function initialize() {
        if (this.$el) {
          // options and instance
          var self = this;
          self.options.theme = self.options.theme || "snow";
          self.options.boundary = self.options.boundary || document.body;
          self.options.modules = self.options.modules || self.defaultModules;
          self.options.modules.toolbar =
            self.options.modules.toolbar !== undefined ?
            self.options.modules.toolbar :
            self.defaultModules.toolbar;
          self.options.placeholder =
            self.options.placeholder || "Insert text here ...";
          self.options.readOnly =
            self.options.readOnly !== undefined ? self.options.readOnly : false;
          self.quill = new Quill(self.$refs.editor, self.options);

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content);
          }

          // mark model as touched if editor lost focus
          self.quill.on("selection-change", function (range) {
            if (!range) {
              self.$emit("blur", self.quill);
            } else {
              self.onFocus(self.quill);
              self.$emit("focus", self.quill);
            }
          });

          // update model if text changes
          self.quill.on("text-change", function () {
            var html = self.$refs.editor.children[0].innerHTML,
              text = self.quill.getText().replace(/\n$/, "");
            if (html === "<p><br></p>") {
              html = "";
            }
            self._content = html;
            self.$emit("input", self._content);
            self.onChange(self.quill);
            self.$emit("change", {
              editor: self.quill,
              html: html,
              text: text,
            });
          });

          // disabled
          if (this.disabled) {
            this.quill.enable(false);
          }

          // emit ready
          self.$emit("ready", self.quill);
        }
      },
      onSubmit: function onSubmit() {
        this.$emit("quillEditor", this._content);
      },
      onChange: function onChange(value) {
        console.log(value);
        this.insertIndex = this.quill.getLength() - 1;
        // console.log(this.quill.getLength() - 1)
      },
      onFocus: function onFocus(value) {
        if (value.selection.lastRange) {
          this.insertIndex = value.selection.lastRange.index;
        }
      },
      addQuickly: function addQuickly(value) {
        // console.log(typeof this.insertIndex)
        if (this.insertIndex || this.insertIndex === 0) {
          // console.log( this.insertIndex)
          this.quill.insertText(this.insertIndex, value);
        } else {
          // console.log( this.quill.getLength() - 1)
          this.quill.insertText(this.quill.getLength() - 1, value);
        }
      },
    },
    watch: {
      content: function content(newVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal;
            this.quill.setText(newVal);
          } else if (!newVal) {
            this.quill.setText("");
          }
        }
      },
      value: function value(newVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal;
            this.quill.setText(newVal);
          } else if (!newVal) {
            this.quill.setText("");
          }
        }
      },
      disabled: function disabled(newVal) {
        if (this.quill) {
          this.quill.enable(!newVal);
        }
      },
    },
  };
});

/**
 * 按钮
 * @component TpButton
 * @author 陈柱良
 * @since 2017/11/01
 */
define("src/components/button/button.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<el-button class="gv-btn-primary" size="small" @click="onShow()" :style="{ \'text-align\': position}" :class="{\'el-icon-arrow-down\': !more, \'el-icon-caret-top\': more}" style="width: 100%;border: 0px;height: 29px;">{{msg}}</el-button>',
    props: {
      show: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: String,
        default: null,
      },
      notShowTitle: {
        type: String,
        default: null,
      },
      position: {
        type: String,
        default: "center",
      },
    },
    data: function data() {
      return {
        more: null,
        msg: "",
      };
    },
    created: function created() {
      this.initPage();
    },
    methods: {
      initPage: function initPage() {
        if (!this.showTitle) {
          this.showTitle = Vue.filter("translate")("gBtnMore");
        }
        if (!this.notShowTitle) {
          this.notShowTitle = Vue.filter("translate")("gBtnHide");
        }
        this.more = this.show ? this.show : false;
      },
      onShow: function onShow() {
        if (this.more) {
          this.more = false;
        } else {
          this.more = true;
        }
        this.$emit("click");
      },
    },
    watch: {
      // 监听数据变化
      show: function show(val) {
        this.more = val;
      },
      more: function more(val) {
        this.more = val;
        if (this.more) {
          this.msg = this.showTitle;
        } else {
          this.msg = this.notShowTitle;
        }
      },
    },
  };
});
/**
 * 表格列过滤
 * @author 胡丽君
 * @time 2017/12/12
 */
define("src/components/column-filter/column-filter.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<div><i class="el-icon-tickets key-select-icon" @click="keySelect = !keySelect"></i>\
        <div class="key-select-list" v-show="keySelect">\
            <el-checkbox :indeterminate="isIndeterminate" v-model="isDefalutAll" @change="handleCheckAllChange">{{ \'gAll\' | translate(\'ALL\')}}</el-checkbox>\
            <el-checkbox-group v-model="checkedOptions" @change="handleCheckedCitiesChange" class="key-list">\
                <el-checkbox v-for="option in columnOptions" :label="option" :key="option">{{option | translate()}}</el-checkbox>\
            </el-checkbox-group>\
        </div></div>',
    data: function data() {
      return {
        keySelect: false,
        isIndeterminate: false,
        checkedOptions: this.isDefalutAll ?
          this.columnOptions : this.defalueCheckedOptions,
      };
    },
    props: {
      isDefalutAll: {
        type: Boolean,
        default: true,
      },
      defalueCheckedOptions: Array,
      columnOptions: Array,
    },
    methods: {
      handleCheckAllChange: function handleCheckAllChange(val) {
        this.checkedOptions = val ? this.columnOptions : [];
        this.isIndeterminate = false;
        val
          ?
          this.$emit("changeCheckedOptions", this.columnOptions) :
          this.$emit("changeCheckedOptions", []);
      },
      handleCheckedCitiesChange: function handleCheckedCitiesChange(value) {
        var checkedCount = value.length;
        this.isDefalutAll = checkedCount === this.columnOptions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.columnOptions.length;
        this.$emit("changeCheckedOptions", value);
      },
    },
  };
});
/**
 * 折叠组件
 * @author 胡丽君
 * @time 2017/12/13
 */
define("src/components/collapse-item/collapse-item.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<div class="tp-collapse-item">\
            <div class="collapse-item__header" style="background:#f7f7f7">\
                <span :class="{\'tp-collapse-line\': showLine}" class="tp-collapse-header ellipsis" :style="{ width: titleWidth}" @click.stop="open" @keyup.space.enter.stop="open">\
                    <i class="collapse-item__arrow el-icon-arrow-right" :class="{\'active\': close}"></i>{{title}}\
                </span>\
                <div class="tp-collapse-header-body" :style="{ float: contentAlgin}" ><slot name="headerBody"></slot></div>\
            </div>\
            <div class="el-collapse-item__content" style="background:#FFF" v-show="close" v-if="ifClose"><slot></slot></div>\
          </div>',
    props: {
      isExpand: {
        type: Boolean,
        default: false,
      },
      showLine: {
        type: Boolean,
        default: false,
      },
      title: String,
      titleWidth: {
        type: String,
        default: "300px",
      },
      index: {
        type: Number,
        default: null,
      },
      contentAlgin: {
        type: String,
        default: "none",
      },
    },
    data: function data() {
      return {
        close: false,
        ifClose: false,
      };
    },
    created: function created() {
      this.close = this.isExpand;
      this.ifClose = this.isExpand;
    },
    methods: {
      open: function open() {
        this.close = !this.close;
        if (!this.ifClose) this.ifClose = this.close;
        this.$emit("change", this.close, this.index);
      },
    },
    watch: {
      isExpand: function isExpand(val) {
        this.close = val ? true : false;
        if (!this.ifClose) this.ifClose = this.close;
        this.$emit("change", this.close, this.index);
      },
    },
  };
});
/**
 * 搜索下拉框
 * @component TpAutoComplete
 * @author 孙恬静<el-alert v-show="isAlert" class="tp-alert" show-icon title="No Data" type="warning"></el-alert>\
 * @since 2018/1/2
 */
define("src/components/auto-complete/auto-complete.js", [], function (
  require,
  exports,
  module
) {
  var ids = 1;
  return {
    template: '\
            <div>\
                <div :class="{ \'inputColumn\': isColumn}">\
                    <transition name="fade">\
                        <el-autocomplete :id="jqIdt" :data-correct-type="dataCorrectType" :disabled="isReadonly" @blur="onBlur" :maxlength="maxlength" :debounce="700" popper-class="tpSearchDropDown" @change="updateValue()" ref="loadmore" v-model="selector" :fetch-suggestions="querySearchAsync" :placeholder="\'gInput\' | translate(\'Please enter the search condition\')" @select="handleSelect">\
                        </el-autocomplete>\
                    </transition>\
                </div>\
                <div v-if="isColumn" class="lableColumn">\
                    <el-input size="mini" v-model="lableColumn" readonly></el-input>\
                </div>\
            </div>',
    props: {
      codeType: String,
      poName: {
        type: String,
        default: "",
      },
      maxlength: {
        type: Number,
        default: 50,
      },
      codeName: {
        type: String,
        default: "codeCode",
      },
      labelName: {
        type: String,
        default: "",
      },
      dataCorrectType: "",
      selectHandleParams: Object,
      lableParams: "",
      "case-insensitive": false,
      lableValue: "",
      contextName: {
        type: String,
        default: "system",
      },
      url: {
        type: String,
        default: "",
      },
      code: {
        type: String,
        default: "",
      },
      isReadonly: {
        type: Boolean,
        default: false,
      },
      index: String,
      value: [String, Number],
      preQueryData: {
        type: Object,
        default: {},
      },
      // 模糊查询，针对code
      isFuzzy: true,
      orderByField: {
        // 要排序的字段
        type: String,
        default: "",
      },
      direction: {
        // 顺序还是倒序 desc，asc
        type: String,
        default: "",
      },
    },
    data: function data() {
      return {
        jqIdt: "_tpAutoCompletet" + ids,
        isSearch: true,
        dropDownList: [],
        selector: "",
        timeout: null,
        pageNo: 0,
        pageSize: 10,
        loading: false,
        loadResult: [],
        oldNo: 0,
        isColumn: false,
        lableColumn: "",
        lableNameArr: null,
        selectorCache: null,
        preQueryDataCache: null,
        blurFlag: false,
        selectorCacheex: null, //选中的缓存
        searchCacheex: null, //查询的缓存
        blurCache: {},
        isAlert: false,
      };
    },
    mounted: function mounted() {
      this.initProp();
      this.initJq();
    },
    created: function created() {
      if (this.lableParams) {
        this.isColumn = true;
      }
      if (this.lableValue) {
        this.lableColumn = this.lableValue;
      }
      if (this.value) {
        this.selector = this.value;
        this.selectorCacheex = this.selector;
      }
      ids++;
    },
    watch: {
      value: function value(val, old) {
        if (val == null) val = "";
        if (old == null) old = "";
        if (val !== old) {
          if (val !== this.selector) {
            this.selector = val;
            this.selectorCacheex = val;
            if ((val === "" || val === null) && old !== "") {
              this.lableColumn = "";
              this.$emit(
                "row-select",
                null,
                this.selectHandleParams,
                this.index,
                this.viewObjectCode,
                true
              );
            }
          }
        }
        // this.selector = val;
        // if (val != old && !val) {
        //     this.lableColumn = '';
        //     this.$emit('row-select', null, this.selectHandleParams, this.index);
        // }
      },
      lableValue: function lableValue(val) {
        this.lableColumn = val;
        // this.isAlert = false;
      },
      selector: function selector(val, old) {
        if (val === "" && old !== "" && this.value != val) {
          this.lableColumn = "";
          this.updateValue("");
          this.$emit(
            "row-select",
            null,
            this.selectHandleParams,
            this.index,
            this.viewObjectCode,
            true
          );
        } else {}
        // this.updateValue(val);

        // if (val != old)
        //     this.updateValue();
        // console.log(val)
      },
      preQueryData: {
        // 深度监听，可监听到对象、数组的变化
        handler: function handler(val, oldVal) {
          if (val && !Vue.gvUtil.compareObject(val, oldVal)) {
            if (
              (typeof val === "undefined" ? "undefined" : _typeof(val)) ===
              "object"
            ) {
              this.preQueryDataCache = $.extend(true, {}, val);
              this.searchCacheex = null;
            }
          }
        },
        deep: true,
      },
    },
    methods: {
      initProp: function initProp() {
        this.lableNameArr = this.labelName.split(",");
        this.preQueryDataCache = $.extend(true, {}, this.preQueryData);
      },
      initJq: function initJq() {
        var _this = this,
          jq = document.getElementById(this.jqIdt),
          activedescendant = jq
          .getAttribute("aria-activedescendant")
          .replace("-item--1", ""),
          d = $("#" + activedescendant)
          .parent()
          .get(0);
        d.setAttribute("style", "overflow-y: scroll; with: 100%");
        $(d).scroll(function () {
          var div = $(this).get(0);
          if (
            div.scrollHeight - div.clientHeight - div.scrollTop < 1 &&
            _this.isSearch
          ) {
            _this.isSearch = false;
            _this.initData(true);
          }
        });
      },
      querySearchAsync: function querySearchAsync(queryString, cb) {
        this.pageNo = 0;
        if (this.searchCacheex !== this.selector) {
          this.searchCacheex = this.selector;
          this.initData(false, cb);
        } else {
          if (
            this.preQueryDataCache !== this.preQueryData &&
            !Vue.gvUtil.compareObject(this.preQueryDataCache, this.preQueryData)
          ) {
            this.preQueryDataCache = $.extend(true, {}, this.preQueryData);
            this.initData(false, cb);
          } else {
            // this.isAlert = false;
            this.computAlert(this.loadResult);
            cb(this.loadResult);
          }
        }
      },

      initData: function initData(flag, cb) {
        var _this = this,
          codeName = _this.codeName;
        flag && this.pageNo++;
        this.requestData().then(
          function (res) {
            _this.isSearch = true;
            if (res.resCode === "0000") {
              var data = res.resData[_this.vo].content,
                length = data.length;
              if (length === 0 && flag) {
                _this.isAlert = true;
                _this.pageNo--;
                return;
              }

              for (var j = 0, len = length; j < len; j++) {
                // if (!data[j][_this.codeName]) {
                //    data.splice(j, 1);
                // } else {
                var lableValue = data[j][_this.lableNameArr[0]];
                for (var i = 1; i < _this.lableNameArr.length; i++) {
                  if (data[j][_this.lableNameArr[i]])
                    lableValue += " -- " + data[j][_this.lableNameArr[i]];
                }
                data[j]["value"] = lableValue;
                // }
              }
            }
            // 过滤空元素
            data = data.filter(function (item) {
              var code = item[codeName],
                value = item.value;
              return value;
              // return code && value
            });
            if (_this.pageNo > 0) {
              //
              if (_this.pageNo !== _this.oldNo) {
                for (var k = 0, len1 = data.length; k < len1; k++) {
                  Vue.set(
                    _this.dropDownList,
                    _this.dropDownList.length,
                    data[k]
                  );
                }
                if (length < 10 && flag) {
                  _this.pageNo--;
                  _this.isSearch = false;
                }
              }
            } else {
              _this.dropDownList = data;
              _this.computAlert(_this.dropDownList);
              cb && cb(_this.dropDownList);
            }
            // if(_this.dropDownList.length > 0) {
            //     _this.isAlert = false;
            // } else {
            //     _this.isAlert = true;
            // }
            _this.oldNo = _this.pageNo;
            _this.loadResult = _this.dropDownList;
            _this.blurCache = _this.computBlurCache(_this.loadResult);
          },
          function () {
            if (flag) {
              _this.isSearch = true;
            }
          }
        );
      },
      updateValue: function updateValue(val) {
        this.$emit("input", val);
        this.$emit("change");
      },
      onBlur: function onBlur() {
        var _this = this;
        setTimeout(function () {
          if (!_this.blurFlag) {
            if (_this.selectorCacheex !== _this.selector) {
              if (
                _this.selector !== "" &&
                !_this.matchingItem(_this.selector)
              ) {
                _this.selector = "";
                _this.selectorCacheex = "";
              }
            }
            // _this.updateValue('');
          } else {
            _this.blurFlag = false;
          }
        }, 700);
      },
      handleSelect: function handleSelect(item, flag) {
        this.selector = item[this.codeName];
        // if(this.selector == this.selectorCacheex)
        //     return;
        this.selectorCacheex = item[this.codeName];
        this.updateValue(this.selector);
        if (this.lableParams) {
          this.lableColumn = item[this.lableParams];
        }
        this.$emit("row-select", item, this.selectHandleParams, this.index);
        if (!flag) this.blurFlag = true;
      },
      //模糊匹配缓存
      matchingItem: function matchingItem(obj) {
        var reg = new RegExp("^" + obj, "m");
        for (var key in this.blurCache) {
          if (reg.test(key)) {
            // this.isAlert = false;
            this.handleSelect(this.blurCache[key], true);
            return true;
          }
        }
        return false;
      },
      //组装缓存数据，供失去焦点时使用
      computBlurCache: function computBlurCache(data) {
        var d = {};
        for (var key in data) {
          d[data[key][this.codeName]] = data[key];
        }
        return d;
      },
      computAlert: function computAlert(data) {
        if (data.length == 0) {
          Vue.gvUtil.message("Result list is empty.");
        }
        // if(data.length == 0 && this.isAlert == false) {
        //     this.isAlert = true;
        //     var _this = this;
        //     setTimeout(function() {
        //         _this.isAlert = false;
        //     }, 5000);
        // }
      },
      requestData: function requestData() {
        var url = "",
          param = {};
        if (this.poName === "" && this.code === "" && this.url === "") {
          url = Vue.gvUtil.getUrl({
            apiName: "layoutAutoCompleteGGCodeList",
            contextName: "auth",
            serachParms: {
              _pageSize: this.pageSize,
              _pageNo: this.pageNo,
            },
          });

          this.vo = "ggCodeVoList";
          this.labelName = "codeName";
          this.codeName = "codeCode";
          param = {
            codeType: this.codeType,
            validind: "1",
            codeCode: this.selector ? this.selector : "",
          };
        } else if (this.code !== "") {
          url = Vue.gvUtil.getUrl({
            apiName: "layoutDbclickGGCodeOtherListByCode",
            contextName: "auth",
            serachParms: {
              _pageSize: this.pageSize,
              _pageNo: this.pageNo,
            },
          });
          // console.log(this.isFuzzy);
          param = {
            code: this.code,
            value: this.selector ? this.selector : "",
            isFuzzy: this.isFuzzy,
          };
          this.vo = "businessList";
        } else {
          if (this.url !== "") {
            url =
              this.contextName +
              this.url +
              "?_pageSize=" +
              this.pageSize +
              "&_pageNo=" +
              this.pageNo;
          } else {
            url = Vue.gvUtil.getUrl({
              apiName: "layoutDbclickGGCodeOtherList",
              contextName: "auth",
              serachParms: {
                _pageSize: this.pageSize,
                _pageNo: this.pageNo,
              },
            });
            param = {
              poName: this.poName,
            };
          }
          var paramArr = this.codeName.split(","),
            orCondition = "",
            length = paramArr.length;
          for (var i = 0; i < length; i++) {
            if (i === 0) {
              orCondition += paramArr[i] + "=" + this.selector + " ";
            } else {
              orCondition += "or " + paramArr[i] + "=" + this.selector + " ";
            }
          }
          this.vo = "businessList";
          if (this.selector && paramArr.length === 1) {
            param[this.codeName] = this.selector;
          } else if (this.selector && paramArr.length > 1) {
            param["orCondition"] = orCondition;
          }
        }
        param.value = !this.caseInsensitive ?
          param.value :
          param.value.toUpperCase();
        if (this.orderByField && this.direction) {
          param.orderByField = this.orderByField;
          param.direction = this.direction;
        }
        $.extend(true, param, this.preQueryData);
        this.selectorCache = this.selector;
        return Vue.gvUtil.http.post(url, param, {
          shade: false,
        });
      },
    },
  };
});
/**
 * 导入execl
 * @author 陈柱良
 * @time 2018/02/06
 */
define("src/components/import-execl/import-execl.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<div><div><el-button class="gv-btn-primary" :disabled="isReadonly" size="mini" type="primary" @click="onImport()">{{ _btnName }}</el-button>\
        <el-button class="gv-btn-primary" :disabled="isReadonly" v-show="preview&&isPreview" size="mini" type="primary" @click="onPreview()">{{ \'gBtnPreview\' | translate(\'Preview\') }}</el-button>\
        <input type="file" :id="id" :accept="accept" @change="onChangeImport()" style="display:none;" ref="inputer"/>\
        <span>{{msg}}<span></div>\
        <el-dialog append-to-body top="5%" title="Preview" :close-on-click-modal="false" custom-class="dialogForm" width="85%" v-if="show" :visible.sync="show" :before-close="beforeClose">\
        <el-table :data="table.tableData" class="table-scroll" highlight-current-row border stripe style="width: 100%;">\
            <el-table-column v-for="v in table.tableHeader" :prop="v.replace(/\\./g, \'\')" :label="v">\
            </el-table-column>\
        </el-table>\
        </el-dialog></div>',
    data: function data() {
      return {
        wb: null, // 读取完成的数据
        rABS: false,
        id: "_" + new Date().getUTCMilliseconds(),
        table: {
          tableData: [],
          tableHeader: [],
        },
        _btnName: "",
        msg: "",
        isPreview: false,
        show: false,
        accept: ".xlsx,.xls,.csv,.xml",
      };
    },
    props: {
      size: {
        type: String,
        default: "2",
      },
      btnName: {
        type: String,
        default: null,
      },
      preview: {
        type: Boolean,
        default: false,
      },
      isReadonly: {
        type: Boolean,
        default: false,
      },
      formatObj: null,
    },
    created: function created() {
      if (this.btnName) {
        this._btnName = this.btnName;
      } else {
        this._btnName = Vue.filter("translate")("gBtnImportExecl");
      }
    },
    methods: {
      onImport: function onImport() {
        this.clearAllData();
        document.getElementById(this.id).click();
      },
      onPreview: function onPreview() {
        if (this.preview) {
          this.show = true;
        }
      },
      onChangeImport: function onChangeImport() {
        var inputDOM = this.$refs.inputer,
          _this = this;
        if (!inputDOM) {
          return;
        }

        var f = inputDOM.files[0];
        if (!this.beforeAvatarUpload(f)) {
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          if (reader.result) {
            reader.content = reader.result;
          }
          var data = reader.content;
          if (f.type == "text/xml") {
            var x2 = new X2JS();
            _this.msg = f.name;
            _this.$emit("select", x2.xml_str2json(data), f.type);
            return;
          }
          if (_this.rABS) {
            _this.wb = XLSX.read(btoa(fixdata(data)), {
              // 手动转化
              type: "base64",
            });
          } else {
            _this.wb = XLSX.read(data, {
              type: "binary",
            });
          }
          var j = _this.sheet_to_json(_this.wb.Sheets[_this.wb.SheetNames[0]]);
          if (j) {
            // console.log(_this.xlsxArrToTableArr(j));
            if (_this.preview) {
              _this.show = true;
            }
            _this.msg = f.name;
            _this.table = _this.xlsxArrToTableArr(j);
            _this.isPreview = true;
            _this.$emit("select", _this.table, f.type, _this.msg);
          }
          // var str = JSON.stringify()
          // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          // wb.Sheets[Sheet名]获取第一个Sheet的数据
        };
        if (_this.rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      xlsxArrToTableArr: function xlsxArrToTableArr(xlsxArr) {
        var tableArr = [],
          length = 0,
          maxLength = 0,
          maxLengthIndex = 0,
          _this = this;
        xlsxArr.forEach(function (item, index) {
          length = Object.keys(item).length;
          if (maxLength < length) {
            maxLength = length;
            maxLengthIndex = index;
          }
        });
        var tableHeader = Object.keys(xlsxArr[maxLengthIndex]),
          rowItem = {};
        xlsxArr.forEach(function (item) {
          rowItem = {};
          for (var i = 0; i < maxLength; i++) {
            if (_this.formatObj && _this.formatObj[tableHeader[i]]) {
              if (_this.formatObj[tableHeader[i]].type == "date") {
                rowItem[tableHeader[i]] = Vue.filter("time")(
                  item[tableHeader[i]],
                  _this.formatObj[tableHeader[i]].format
                );
              }
            } else {
              rowItem[tableHeader[i]] = item[tableHeader[i]] || "";
            }
          }
          tableArr.push(rowItem);
        });
        // 去除点.
        tableArr.forEach(function (item) {
          for (var key in item) {
            var rename = key.replace(/\./g, "");
            item[rename] = item[key];
          }
        });
        return {
          tableHeader: tableHeader,
          tableData: tableArr,
        };
      },
      clearAllData: function clearAllData() {
        document.getElementById(this.id).value = null;
        this.table = {
          tableData: [],
          tableHeader: [],
        };
        this.isPreview = false;
        this.msg = "";
        this.wb = null;
      },
      fixdata: function fixdata(data) {
        // 文件流转BinaryString
        var o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
          );
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      },
      beforeClose: function beforeClose() {
        this.show = false;
        // this.clearAllData();
      },
      beforeAvatarUpload: function beforeAvatarUpload(file) {
        var isLt = file.size / 1024 / 1024 < parseInt(this.size);
        if (!isLt) {
          this.$message.error(
            "Uploading files cannot exceed " + this.size + "MB!"
          );
        }
        return isLt;
      },
      sheet_to_json: function sheet_to_json(sheet, opts) {
        var val,
          row,
          range,
          header = 0,
          offset = 1,
          r,
          hdr = [],
          isempty,
          R,
          C,
          v;
        var o = opts != null ? opts : {};
        var raw = o.raw;
        if (sheet == null || sheet["!ref"] == null) return [];
        range = o.range !== undefined ? o.range : sheet["!ref"];
        if (o.header === 1) header = 1;
        else if (o.header === "A") header = 2;
        else if (Array.isArray(o.header)) header = 3;
        switch (typeof range === "undefined" ? "undefined" : _typeof(range)) {
          case "string":
            r = this.safe_decode_range(range);
            break;
          case "number":
            r = this.safe_decode_range(sheet["!ref"]);
            r.s.r = range;
            break;
          default:
            r = range;
        }
        if (header > 0) offset = 0;
        var rr = this.encode_row(r.s.r);
        var cols = new Array(r.e.c - r.s.c + 1);
        var out = new Array(r.e.r - r.s.r - offset + 1);
        var outi = 0;
        for (C = r.s.c; C <= r.e.c; ++C) {
          cols[C] = this.encode_col(C);
          val = sheet[cols[C] + rr];
          switch (header) {
            case 1:
              hdr[C] = C;
              break;
            case 2:
              hdr[C] = cols[C];
              break;
            case 3:
              hdr[C] = o.header[C - r.s.c];
              break;
            default:
              if (val === undefined) continue;
              hdr[C] = this.format_cell(val);
          }
        }
        for (R = r.s.r + offset; R <= r.e.r; ++R) {
          rr = this.encode_row(R);
          isempty = true;
          if (header === 1) row = [];
          else {
            row = {};
            if (Object.defineProperty)
              Object.defineProperty(row, "__rowNum__", {
                value: R,
                enumerable: false,
              });
            else row.__rowNum__ = R;
          }
          for (C = r.s.c; C <= r.e.c; ++C) {
            val = sheet[cols[C] + rr];
            if (val === undefined || val.t === undefined) {
              val = {
                t: "s",
                v: null,
                w: "",
              };
            }
            v = val.v;
            switch (val.t) {
              case "e":
                continue;
              case "s":
                break;
              case "b":
              case "n":
                break;
              default:
                throw "unrecognized type " + val.t;
            }
            if (v !== undefined) {
              row[hdr[C]] = raw ? v : this.format_cell(val, v);
              isempty = false;
            }
          }
          if (isempty === false || header === 1) out[outi++] = row;
        }
        out.length = outi;
        return out;
      },
      safe_decode_range: function safe_decode_range(
        range /*:string*/
      ) /*:Range*/ {
        var o = {
          s: {
            c: 0,
            r: 0,
          },
          e: {
            c: 0,
            r: 0,
          },
        };
        var idx = 0,
          i = 0,
          cc = 0;
        var len = range.length;
        for (idx = 0; i < len; ++i) {
          if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
          idx = 26 * idx + cc;
        }
        o.s.c = --idx;

        for (idx = 0; i < len; ++i) {
          if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
          idx = 10 * idx + cc;
        }
        o.s.r = --idx;

        if (i === len || range.charCodeAt(++i) === 58) {
          o.e.c = o.s.c;
          o.e.r = o.s.r;
          return o;
        }

        for (idx = 0; i != len; ++i) {
          if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
          idx = 26 * idx + cc;
        }
        o.e.c = --idx;

        for (idx = 0; i != len; ++i) {
          if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
          idx = 10 * idx + cc;
        }
        o.e.r = --idx;
        return o;
      },
      decode_row: function decode_row(rowstr /*:string*/ ) /*:number*/ {
        return parseInt(unfix_row(rowstr), 10) - 1;
      },
      encode_row: function encode_row(row /*:number*/ ) /*:string*/ {
        return "" + (row + 1);
      },
      decode_col: function decode_col(colstr /*:string*/ ) /*:number*/ {
        var c = unfix_col(colstr),
          d = 0,
          i = 0;
        for (; i !== c.length; ++i) {
          d = 26 * d + c.charCodeAt(i) - 64;
        }
        return d - 1;
      },
      encode_col: function encode_col(col /*:number*/ ) /*:string*/ {
        var s = "";
        for (++col; col; col = Math.floor((col - 1) / 26)) {
          s = String.fromCharCode(((col - 1) % 26) + 65) + s;
        }
        return s;
      },
      format_cell: function format_cell(
        cell /*:Cell*/ ,
        v /*:any*/ ,
        o /*:any*/
      ) {
        if (cell == null || cell.t == null || cell.t == "z") return "";
        if (cell.w !== undefined) return cell.w;
        if (cell.t == "d" && !cell.z && o && o.dateNF) cell.z = o.dateNF;
        if (v == undefined) return safe_format_cell(cell, cell.v);
        return safe_format_cell(cell, v);
      },
    },
  };
});
/**
 * 数字输入域
 * @component TpInput
 * @author 陈柱良
 * @since 2017/10/18
 */
define("src/components/input/input.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
            <transition name="fade">\
                <el-input v-bind="$attrs" :id="id" :name="name" is-number="y" :data-correct-type="dataCorrectType" size="mini" :maxlength="maxlength" :readonly="readonly" @focus="onKeyup($event, \'1\')" @keyup.native="onKeyup" v-model="code" @blur="onBlur">\
                <i slot="suffix" class="c-black" v-if="suffix">{{suffix}}</i></el-input>\
            </transition>',
    /**
     * @property {Number|String} v-model 双向绑定属性
     * @property {String} [size=mini] 大小
     * @property {Boolean} [readonly=false] 只读
     * @property {String} [id=''] id
     * @property {String} suffix 后缀
     * @property {String} numLen 数值长度
     * @property {Number} [maxlength=50] 可输入长度
     * @property {String} patternKey 正则，校验提示语（键值）
     * @property {Boolean} custom 自定义校验
     * @property {Number} max 最大值
     * @property {Number} min 最小值
     * @property {Boolean} isSelect 获取焦点后是否全选
     */
    props: {
      value: [String, Number],
      readonly: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        default: "",
      },
      dataCorrectType: "",
      /* disabled: {
                type   : Boolean,
                default: false
            }, */
      suffix: {
        type: String,
        default: null,
      },
      thou: {
        type: String,
        default: null,
      },
      numLen: {
        type: String,
        default: null,
      },
      maxlength: {
        type: Number,
        default: 50,
      },
      patternKey: {
        type: String,
        default: null,
      },
      custom: {
        type: Boolean,
        default: true,
      },
      max: {
        type: Number,
        default: 9007199254740992,
      },
      min: {
        type: Number,
        default: null,
      },
      name: "",
      isSelect: {
        type: Boolean,
        default: false,
      },
    },
    data: function data() {
      return {
        code: "",
        isKey: false,
        repeat: false, // 防重复
        codeCache: "",
      };
    },
    watch: {
      value: function value(val, old) {
        if (val !== "") {
          // 暂时屏蔽，它阻碍了数据的双向绑定
          /* eslint no-constant-condition: "off" */
          // if(!this.isKey) {
          if (true) {
            // if (val + '' !== old) {
            var codeVal = +Vue.gvUtil.delcommafy(this.code + "");
            if (codeVal !== val || (old === "" && val === 0)) {
              this.initData(val);
            }
            this.codeCache =
              this.code == null || this.code == undefined || this.code == "" ?
              this.code :
              Vue.gvUtil.delcommafy(this.code);
          } else {
            this.isKey = false;
          }
        } else {
          if (this.code !== "") {
            this.code = "";
          }
        }
      },
      code: function code(val, old) {
        if (val === "" && old !== "" && this.value !== val) {
          this.updateValue();
        }
      },
    },
    created: function created() {
      this.initData(this.value);
    },
    methods: {
      updateValue: function updateValue() {
        var val = "";
        if (this.code == "") {
          this.$emit("blur", val);
        } else {
          if (this.code || this.code == 0) {
            val = Vue.gvUtil.delcommafy(this.code) || +this.code;
            if (this.codeCache === val) return;
          }
        }

        this.$emit("input", val);
        this.codeCache = Vue.gvUtil.delcommafy(this.code);
        /**
         * 数值发生变化.
         * @event component:TpInput#change
         * @property {Number} val 数值.
         */
        this.$emit("change", val);
      },
      onBlur: function onBlur() {
        var val = "";
        if (this.code == "") {
          this.$emit("blur", val);
          return;
        }
        if (this.code || this.code == 0) {
          val = Vue.gvUtil.delcommafy(this.code) || +this.code;
        }
        //var val = this.code ? Vue.gvUtil.delcommafy(this.code) || +this.code : ''
        // if (this.code && parseFloat(Vue.gvUtil.delcommafy(this.code + '')) !== parseFloat(this.codeCache)) {
        if (
          !(!this.code && this.code != 0) &&
          +parseFloat(Vue.gvUtil.delcommafy(this.code + "")) !== this.value
        ) {
          this.initData(this.code);
        }
        /**
         * 焦点离开.
         * @event component:TpInput#blur
         * @property {Number} val 数值.
         */
        this.$emit("blur", val);
      },
      onKeyup: function onKeyup(event, flag) {
        if (!this.isKey) {
          this.isKey = true;
        }
        if (flag && flag == "1") {
          if (this.isSelect) {
            event.currentTarget.select();
          }
        }
      },
      initData: function initData(value) {
        if (value !== "" && value !== null && value !== undefined) {
          if (this.thou || this.numLen) {
            this.showNumber(this.thou, this.numLen, value);
          } else {
            //this.code = value;
            //this.updateValue();
            this.showNumber(false, 0, value);
          }
        } else {
          this.code = value;
        }
      },
      showNumber: function showNumber(thou, len, value) {
        if (!len && len != 0) {
          len = 2;
        } else {
          len = parseInt(len) !== undefined ? parseInt(len) : 2;
        }
        if (!value || parseFloat(value) === "0") {
          this.code = Number("0").toFixed(len);
          this.updateValue();
          return;
        }
        if (value && parseFloat(value) !== "0") {
          if (!isNaN(parseFloat(Vue.gvUtil.delcommafy(value)))) {
            var itemValue = parseFloat(Vue.gvUtil.delcommafy(value));
            if (
              this.patternKey &&
              !Vue.gvUtil[this.patternKey].test(itemValue)
            ) {
              Vue.prototype.$message.error(
                Vue.filter("translate")("gValidate" + this.patternKey)
              );
              this.code = "";
            } else {
              var _b = true;
              //自定义校验大小
              if (this.custom) {
                if (this.max != undefined && itemValue >= this.max) {
                  _b = false;
                  Vue.prototype.$message.error("超过了最大值！");
                  this.code = "";
                }
                if (_b && this.min != undefined && itemValue <= this.min) {
                  _b = false;
                  Vue.prototype.$message.error(
                    "Must be greater than " + this.min
                  );
                  this.code = "";
                }
              }

              if (_b) {
                if (thou) {
                  this.code = Vue.gvUtil.comdify(
                    Number(itemValue).toFixed(len)
                  );
                } else {
                  this.code = Number(value).toFixed(len);
                }
              }
            }
            // if (itemValue >= minValue && itemValue <= maxValue) {
          } else {
            Vue.prototype.$message.error(
              Vue.gvUtil.getInzTranslate("gValidateNumber")
            );
            this.code = "";
          }
          var leng = this.code.length || 0;
          if (leng > this.maxlength) {
            this.code = this.code.substring(leng - this.maxlength, leng);
          }
          this.repeat = false;
          this.updateValue();
        }
      },
    },
  };
});
/**
 * 数字输入域
 * @component GvInputNum
 * @author 陈柱良
 * @since 2021/2/1
 */
define("src/components/input-num/input-num.js", [], function (
  require,
  exports,
  module
) {
  var ids = 0;
  return {
    template: '<transition name="fade">\
              <div class="el-input el-input--small" :class="disabled?\'is-disabled\' : \'\'">\
                  <input :maxlength="maxlength" @focus="onFocus" :readonly="readonly" :disabled="disabled"  class="el-input__inner" :value="formatValue" @input="updateInput($event.target.value)" @blur="onBlur" :disabled="disabled" />\
              </div>\
          </transition>',
    /**
     * @property {Number|String} v-model 双向绑定属性
     * @property {Boolean} [readonly=false] 只读
     * @property {Boolean} [disabled=false] 禁止
     * @property {String} [id=''] id
     * @property {String} suffix 后缀
     * @property {Number} decimal 小数位
     * @property {Number} [maxlength=50] 可输入长度
     */
    props: {
      thou: {
        type: Boolean,
        default: true,
        desc: "千分位",
      },
      decimal: {
        type: Number,
        default: 2,
        desc: "小数位",
      },
      value: {
        type: [String, Number],
        default: 0,
        desc: "数值",
      },
      suffix: {
        type: String,
        default: "",
        desc: "后缀",
      },
      maxlength: {
        type: Number,
        default: 50,
      },
      readonly: {
        type: Boolean,
        default: false,
        desc: "是否可读",
      },
      disabled: {
        type: Boolean,
        default: false,
        desc: "是否禁止",
      },
    },
    data: function data() {
      return {
        focused: false,
        cacheValue: null,
      };
    },
    computed: {
      formatValue: function formatValue() {
        if (this.focused) {
          return this.value ? Vue.gvUtil.delcommafy(this.value) : "";
        } else {
          var formatvalue = !!this.value ?
            Vue.gvUtil.delcommafy(this.value) :
            "";
          this.cacheValue = formatvalue;
          if (this.value === 0) {
            return this.showNumber(this.value);
          } else if (
            this.value === "" ||
            this.value === null ||
            this.value === undefined
          ) {
            return "";
          } else {
            return this.showNumber(this.value);
          }
        }
      },
    },
    methods: {
      onFocus: function onFocus() {
        this.focused = true;
      },
      updateInput: function updateInput(value) {
        this.value = value;
      },
      updatevalue: function updatevalue(value) {
        var formatvalue = !!value ? Vue.gvUtil.delcommafy(value) : "";
        if (this.cacheValue != formatvalue) {
          this.cacheValue = formatvalue;
          this.$emit("input", formatvalue);
        }
      },
      onBlur: function onBlur() {
        this.focused = false;
        if (this.decimal > 0 && this.value !== "") {
          var val = Number(this.value).toFixed(this.decimal);
          this.value = val;
        }
        this.updatevalue(this.value);
        this.$emit("blur", this.value);
        this.dispatch("ElFormItem", "el.form.blur", [this.value]);
        this.dispatch("ElFormItem", "el.form.change", [this.value]);
      },
      showNumber: function showNumber(val) {
        if (this.decimal > 0 && this.value !== "") {
          val = Number(val).toFixed(this.decimal);
          this.value = val;
        }
        if (this.thou) {
          val = Vue.gvUtil.comdify(val);
        }
        return val;
      },
      selectAll: function selectAll(event) {
        this.focused = true;
        setTimeout(function () {
          event.target.select();
        }, 0);
      },
      dispatch: function dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
    },
  };
});
/**
 * 金额输入域
 * @component MoneyInput
 * @author 计昕奇
 * @since 2017/10/18
 */
define("src/components/input/money-input.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<el-input v-bind="$attrs" v-on="$listeners" :value="code"  @input="input" @blur="blur"></el-input>',
    /**
     * @property {Number|String} v-model 双向绑定属性
     */
    props: {
      value: [String, Number],
    },
    data: function data() {
      return {
        code: null,
        flag: true,
      };
    },
    computed: {},
    watch: {},
    mounted: function mounted() {
      setTimeout(() => {
        this.blur();
      }, 500);
    },
    methods: {
      input(e) {
        this.code = e.replace(/[^\d]/g, "");
        // console.log("22233", e.replace(/[^\d]/g, ""));
        this.$emit("input", e.replace(/[^\d]/g, ""));
      },
      blur() {
        // console.log("blur", this.value);
        if (this.value) {
          this.code = Vue.filter("money")(
            this.value.replace(/[^\d]/g, ""),
            true,
            2
          );
        }
        // this.code = Vue.filter('money')(this.value.replace(/[^\d]/g,''), true, 2)
      },
      // onkeyup() {

      // }
    },
  };
});
/**
 * Radio单选框
 * @author 孙恬静
 * @time 2018/05/05
 */
define("src/components/radio-group/radio-group.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
                <transition name="fade">\
                    <el-radio-group :disabled="disabled" size="mini" @change="updateValue()" v-model="code">\
                        <el-radio v-for="item in options" :label="item.value">{{item.label}}</el-radio>\
                    </el-radio-group>\
                </transition>',
    props: {
      value: [String, Number],
      codeType: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      defaultValue: {
        type: String,
        default: "",
      },
      isCache: {
        type: Boolean,
        default: true,
      },
    },
    data: function data() {
      return {
        code: "false",
        options: [],
      };
    },
    watch: {
      value: function value(val) {
        this.code = val;
      },
      codeType: function codeType(val) {
        if (val) {
          this.initData();
        }
      },
    },
    created: function created() {
      this.initData();
    },
    methods: {
      updateValue: function updateValue() {
        this.$emit("input", this.code);
        // this.$emit('change');
      },
      initData: function initData() {
        var _this = this,
          cache = Vue.gvUtil.getCache(),
          list = null,
          cacheKey = Vue.gvUtil.md5(this.codeType),
          url = Vue.gvUtil.getUrl({
            apiName: "layoutSelectGGCodeList", //自保修改
            contextName: "selfins",
          }),
          param = {
            codeType: this.codeType,
            validind: "1",
          };
        if (this.isCache) {
          list = cache.get(cacheKey);
        }
        if (!list) {
          var validindList = {};
          this.requestData(url, param).then(function (res) {
            var data = null;
            if (res.resCode === "0000") {
              data = res.resData["ggCodeVoList"][_this.codeType];
              validindList = _this.formatData(data);
            }
            if (_this.isCache && data) {
              cache.set(cacheKey, data);
            }
            _this.options = _this.handleData(validindList);
            // 选项刚更新，重新赋值
            _this.code = _this.value;
          });
        } else {
          this.options = this.handleData(this.formatData(list));
        }
      },
      formatData: function formatData(data) {
        var validindList = {};
        for (var t in data) {
          validindList[data[t]["codeCode"] + ""] = data[t]["codeName"];
          if (data[t]["codeCode"] === (this.value || this.defaultValue)) {
            this.code = data[t]["codeCode"];
            this.updateValue();
          }
        }
        return validindList;
      },
      requestData: function requestData(url, param) {
        return Vue.gvUtil.http.post(url, param, {
          shade: false,
          rt: true,
        });
      },
      handleData: function handleData(obj) {
        if (!obj) {
          return [];
        }
        var radioOptions = [];
        for (var key in obj) {
          var convertObject = {};
          convertObject.value = key;
          convertObject.label = obj[key];
          radioOptions.push(convertObject);
        }

        return radioOptions;
      },
    },
  };
});
/**
 * 一组备选项中进行多选
 * @component TpCheckbox
 * @author 陈柱良
 * @since 2018/10/11
 */
define("src/components/checkbox/checkbox.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
            <transition name="fade">\
                <el-checkbox-group v-model="checkList" :disabled="isReadonly">\
                    <el-checkbox v-for="item in checkItem" :key="item.value" :label="item.value" @change="onChange(item.value)">{{item.label}}</el-checkbox>\
                </el-checkbox-group>\
            </transition>',
    /**
     * @property {Number|String} value v-model 双向绑定属性
     * @property {Boolean} isReadonly Readonly
     * @property {Boolean} isMore 不否多选
     * @property {Array} listCheck 选项
     */
    props: {
      value: [String, Number],
      isReadonly: {
        type: Boolean,
        default: false,
      },
      isMore: {
        type: Boolean,
        default: true,
      },
      listCheck: null,
      codeType: {
        type: String,
        default: "",
      },
      searchObject: {
        type: Object,
        default: null,
      },
      orderByField: null,
      direction: null,
    },
    data: function data() {
      return {
        checkList: [], //组件内选中的值
        checkListEx: [], //传输给调用者的值
        checkItem: [], //选项
        flag: "0", //是否外部触发
        path: "",
        c: "",
        l: "",
      };
    },
    watch: {
      checkList: function checkList(o) {
        if (this.isMore && this.flag == "0") {
          this.checkListEx = o;
        }
      },
      checkListEx: function checkListEx(o) {
        if (this.flag == "0") {
          this.updateValue(o);
        } else {
          var _this = this;
          setTimeout(function () {
            _this.flag = "0";
          }, 1000);
        }
      },
      value: function value(o) {
        if (o) {
          if (!Vue.gvUtil.compareObject(o, this.checkListEx)) {
            this.flag = "1";
            this.checkList = o;
            this.checkListEx = o;
          }
        }
      },
    },
    created: function created() {
      if (this.listCheck) {
        this.checkItem = this.listCheck;
      } else {
        this.ajaxData();
      }
      this.initData(this.value);
    },
    methods: {
      initData: function initData(val) {
        if (val && val.length > 0) {
          this.checkList = this.value;
        }
      },
      onChange: function onChange(obj, obj1, obj2) {
        if (!this.isMore && this.checkList.indexOf(obj) > -1) {
          if (this.checkList.length != 1) this.checkList = [obj];
          this.checkListEx = this.checkList;
        }
      },
      ajaxData: function ajaxData() {
        var c = Vue.gvUtil.getCache(),
          _this = this,
          url = "",
          param = {},
          cacheKey = "",
          cacheKeyParam = null,
          list = null;

        url = Vue.gvUtil.getUrl({
          apiName: "layoutSelectGGCodeList", //自保修改
          contextName: "selfins",
        });
        this.path = this.codeType;
        this.c = "codeCode";
        this.l = this.labelName || "codeName";
        param = {
          codeType: this.codeType,
          validind: "1",
        };
        cacheKey = Vue.gvUtil.md5(this.path);
        if (this.searchObject && typeof this.searchObject === "string") {
          Object.assign(param, JSON.parse(this.searchObject));
          cacheKeyParam = Vue.gvUtil.md5(
            this.path + JSON.stringify(param) || ""
          );
        }
        if (cacheKeyParam) {
          list = c.get(cacheKeyParam);
        } else {
          list = c.get(cacheKey);
        }
        if (this.orderByField && this.direction) {
          param.orderByField = this.orderByField;
          param.direction = this.direction;
        }
        if (!list) {
          this.requestData(url, param).then(function (res) {
            if (res.resCode === "0000") {
              var data = res.resData.ggCodeVoList[_this.codeType];
              _this.handleReturnData(data, c, cacheKey, cacheKeyParam);
            }
          });
        } else {
          this.handleReturnData(list);
        }
      },
      handleReturnData: function handleReturnData(
        data,
        c,
        cacheKey,
        cacheKeyParam
      ) {
        var cacheList = data,
          result = [],
          _this = this;
        data.forEach(function (tmp) {
          var value = tmp[_this.c] + "",
            label = tmp[_this.l];
          if (value === "false") {
            value = false;
          } else if (value === "true") {
            value = true;
          }
          tmp.value = value;
          tmp.label = label;
          result.push(tmp);
        });
        if (result.length > 0) {
          this.checkItem = result;
          if (c && cacheList) {
            if (cacheKeyParam) {
              c.set(cacheKeyParam, cacheList);
              var cacheListEx = c.get(cacheKey);
              if (cacheListEx) {
                cacheList = cacheList.concat(cacheListEx);
              }
              c.set(cacheKey, cacheList);
            } else {
              c.set(cacheKey, cacheList);
            }
          }
        }
      },
      requestData: function requestData(url, param) {
        return Vue.gvUtil.http.post(url, param, {
          shade: false,
          rt: true,
        });
      },
      updateValue: function updateValue(obj) {
        this.$emit("input", obj);
        this.$emit("change", obj);
      },
    },
  };
});
/**
 * textarea多行文本
 * @author 陈柱良
 * @time 2018/05/05
 */
define("src/components/textarea/textarea.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '\
                <transition name="fade">\
                    <el-input :rows="rows" :readonly="readonly" type="textarea" @input="updateValue()" @keyup.native="onCopy" v-model="content" v-on:keydown.tab.native="onKeyUp">\
                </transition>',
    props: {
      value: [String, Number],
      pla: {
        //占位符 每个占位符占多少个空格，不够则补
        type: Number,
        default: 0,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      rows: {
        type: Number,
        default: 3,
      },
    },
    data: function data() {
      return {
        content: "",
      };
    },
    watch: {
      value: function value(val) {
        this.content = val;
      },
    },
    created: function created() {
      this.initData();
    },
    methods: {
      updateValue: function updateValue() {
        // var content = this.content;
        // if (content) {
        //     // 将tab键替换成空格
        //     // this.content = content.replace(new RegExp('\t','gm'),this.computNBSP(8));
        //     var arr = content.split("\t");
        //     var temp = arr[0];
        //     if (arr.length > 1) {
        //         for (var i = 1, size = arr.length; i < size; i++) {
        //             var endStr = arr[i];
        //             var startPos = temp.length + 1;
        //             var pos = temp.lastIndexOf("\n") + 1;
        //             if (pos < 0) pos = 0;
        //             var num = 5 - (startPos - pos) % 5;
        //             temp += this.computNBSP(num) + endStr;
        //         }
        //     }
        //     this.content = temp;
        // }
        this.$emit("input", this.content);
      },
      onCopy: function onCopy(event) {
        if (event.ctrlKey && event.keyCode == 86 && this.content) {
          var content = this.content;
          // 将tab键替换成空格
          // this.content = content.replace(new RegExp('\t','gm'),this.computNBSP(8));
          var arr = content.split("\t");
          var temp = arr[0];
          if (arr.length > 1) {
            for (var i = 1, size = arr.length; i < size; i++) {
              var endStr = arr[i];
              var startPos = temp.length + 1;
              var pos = temp.lastIndexOf("\n") + 1;
              if (pos < 0) pos = 0;
              var num = 5 - ((startPos - pos) % 5);
              temp += this.computNBSP(num) + endStr;
            }
          }
          this.content = temp;
        }
        this.updateValue();
      },
      initData: function initData() {
        this.content = this.value;
      },
      onKeyUp: function onKeyUp(event) {
        if (this.pla <= 0) {
          return;
        }
        var tmpStr = this.content;
        if (!tmpStr) {
          tmpStr = "";
        }
        var startPos = event.target.selectionStart,
          starStr = tmpStr.substring(0, startPos);
        var pos = starStr.lastIndexOf("\n") + 1;
        if (pos < 0) pos = 0;
        var num = 5 - ((startPos - pos) % 5);
        tmpStr =
          starStr +
          this.computNBSP(num) +
          tmpStr.substring(startPos, tmpStr.length);
        this.content = tmpStr;
        startPos += num;
        event.preventDefault();
        this.updateValue();
        this.$nextTick(function () {
          event.target.selectionStart = startPos;
          event.target.selectionEnd = startPos;
        });
      },
      computNBSP: function computNBSP(num) {
        var str = "";
        for (var i = 0; i < num; i++) {
          str += " ";
        }
        return str;
      },
    },
  };
});
/**
 * 流程
 * @author 陈柱良
 * @time 2017/10/18
 */
define("src/components/flow/flow.js", [], function (require, exports, module) {
  var ids = 1;
  return {
    template: '<transition name="fade">\
        <el-card style="margin:5px 0;" ref="flow">\
        <div slot="header" class="clearfix">\
                            <span>{{\'gFlowTitle\' | translate}}</span>\
                        </div>\
            <div :id="id" style="width:100%; height:400px; background-color: #fff;"></div>\
        </el-card></transition>',
    props: {
      nodeData: null,
    },
    data: function data() {
      return {
        id: "goChart" + ids,
        nodeDatas: {
          relation: [],
          nodeDataArray: [],
        },
        show: false,
        goMake: null,
      };
    },
    created: function created() {
      this.goMake = go.GraphObject.make;
      ids++;
      var _this = this;
      this.$nextTick(function () {
        //_this.init(_this.getData(_this.nodeData));
        // _this.creFlow(_this.getData(_this.nodeData));
        _this.nodeDatas.nodeDataArray = [{
            col1: "开始",
            col2: "开始",
            col3: "",
            col4: "",
            color: "#5cb85c",
            key: "start",
            loc: "200 0",
          },
          {
            col1: "结束",
            col2: "结束",
            col3: "",
            col4: "",
            color: "#a5dafa",
            key: "end",
            loc: "",
          },
        ];
        _this.nodeDatas.relation = [];
        _this.creFlow(_this.getData2(_this.nodeData));
      });
    },
    watch: {
      nodeData: {
        // 深度监听，可监听到对象、数组的变化
        handler: function handler(val, old) {
          if (val && val != old) {
            this.nodeDatas.nodeDataArray = [{
                col1: "开始",
                col2: "开始",
                col3: "",
                col4: "",
                color: "#5cb85c",
                key: "start",
                loc: "200 0",
              },
              {
                col1: "结束",
                col2: "结束",
                col3: "",
                col4: "",
                color: "#a5dafa",
                key: "end",
                loc: "",
              },
            ];
            this.nodeDatas.relation = [];
            this.creFlow(this.getData2(val));
            // this.creFlow(this.getData(val));
          }
        },
        deep: true,
      },
    },
    methods: {
      getData: function getData(obj) {
        var list1 = obj.nodeDataArray,
          list = obj.relation;
        var data = {
          relation: [],
          nodeDataArray: [],
        };
        list = [{
            nodeCode: "Start",
            nextNodeCode: "DocArchive",
            factorValue: "00",
            flag: "1",
          },
          {
            nodeCode: "DocArchive",
            nextNodeCode: "DocArchiveInput",
            factorValue: "10",
            flag: "1",
          },
          {
            nodeCode: "DocArchiveInput",
            nextNodeCode: "End",
            factorValue: "10",
            flag: "0",
          },
          {
            nodeCode: "DocArchive",
            nextNodeCode: "End",
            factorValue: "11",
            flag: "1",
          },
        ];
        list1 = [{
          taskCode: "DocArchive",
          handlerCode: "Hancy",
          inTime: "2019-11-29 17:49:50",
          outTime: "2019-11-29 17:49:50",
          taskId: "2",
          color: "white",
          cursor: "red",
          loc: "300 300",
        }, ];
        // var list = [{
        //         nodeCode: 'DocArchive',
        //         nextNodeCode: 'DocArchiveInput',
        //         factorValue: '10',
        //         flag: '1'
        //     }, {
        //         nodeCode: 'DocArchiveInput',
        //         nextNodeCode: 'End',
        //         factorValue: '10',
        //         flag: '0'
        //     }, {
        //         nodeCode: 'DocArchive',
        //         nextNodeCode: 'End',
        //         factorValue: '11',
        //         flag: '1'
        //     }, {
        //         nodeCode: 'Start',
        //         nextNodeCode: 'DocArchive',
        //         factorValue: '00',
        //         flag: '1'
        //     }],
        //     list1 = [{
        //         taskCode: 'DocArchiveInput',
        //         handlerCode: 'Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy',
        //         inTime: '2019-11-29 17:49:50',
        //         outTime: '2019-11-29 17:49:50',
        //         taskId: '1',
        //         isHighlighted: true,
        //         color: "#006cb7",
        //         cursor: "white"
        //     }, {
        //         taskCode: 'DocArchive',
        //         handlerCode: 'Hancy',
        //         inTime: '2019-11-29 17:49:50',
        //         outTime: '2019-11-29 17:49:50',
        //         taskId: '2',
        //         color: "white",
        //         cursor: "red"
        //     }];
        // list1 = [{
        //     taskCode: 'DocArchiveInput',
        //     handlerCode: 'Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy',
        //     inTime: '2019-11-29 17:49:50',
        //     outTime: '2019-11-29 17:49:50',
        //     taskId: '1',
        //     isHighlighted: true,
        //     color: "#006cb7",
        //     cursor: "white"
        // }, {
        //     taskCode: 'DocArchive',
        //     handlerCode: 'Hancy',
        //     inTime: '2019-11-29 17:49:50',
        //     outTime: null,
        //     taskId: '2',
        //     color: "white",
        //     cursor: "red"
        // }];
        if (!list || list.length == 0) {
          return null;
        }
        var ends = [], //多个结束节点
          nodes = {}, //将节点对象化
          nodeDataArray = []; //最后输出的节点数组
        //格式化节点数组
        list.forEach(function (l) {
          nodes[l.nodeCode] = l;
          if (l.nextNodeCode == "End") {
            ends.push(l.nodeCode);
          }
        });
        var list2 = {},
          end = null,
          b = true;
        list1.forEach(function (l) {
          list2[l.taskCode] = l;
          if (ends.indexOf(l.taskCode) > -1 && l.outTime && b) {
            end = $.extend({}, l || {});
          }
          if (!l.outTime) {
            end = null;
            b = false;
          }
        });

        var pre = [];
        list.forEach(function (l) {
          var d = {};
          d.from = l.nodeCode;
          d.to = l.nextNodeCode;
          d.fromNodeType = "component";
          d.toNodeType = "event";
          d.factorValue = l.factorValue;
          d.relationship = "generalization";
          data.relation.push(d);

          if (pre.indexOf(l.nodeCode) == -1) {
            var t = {};
            if (list2[l.nodeCode]) {
              t.key = list2[l.nodeCode].taskCode;
              t.col1 = list2[l.nodeCode].taskCode;
              t.col2 = list2[l.nodeCode].handlerCode;
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "InTime  :" + list2[l.nodeCode].inTime;
              t.col4 = list2[l.nodeCode].outTime ?
                "OutTime:" + list2[l.nodeCode].outTime :
                "";
              t.color = "#006cb7";
              t.cursor = "";
              //t.flag = l.flag;
            } else {
              t.key = l.nodeCode;
              t.col1 = l.nodeCode;
              t.col2 = "";
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "";
              t.col4 = "";
              t.color = "#eeeeee";
              t.cursor = "";
              //t.flag = l.flag;
            }
            if (l.nodeCode == "Start") {
              t.color = "#006cb7";
              t.col2 = l.nodeCode;
            }
            nodeDataArray.push(t);
            pre.push(l.nodeCode);
          }

          if (pre.indexOf(l.nextNodeCode) == -1) {
            var t = {};
            if (list2[l.nextNodeCode]) {
              t.key = list2[l.nextNodeCode].taskCode;
              t.col1 = list2[l.nextNodeCode].taskCode;
              t.col2 = list2[l.nextNodeCode].handlerCode;
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "InTime  :" + list2[l.nextNodeCode].inTime;
              t.col4 = list2[l.nextNodeCode].outTime ?
                "OutTime:" + list2[l.nextNodeCode].outTime :
                "";
              t.color = "#006cb7";
              t.cursor = "";
              //t.flag = l.flag;
            } else {
              t.key = l.nextNodeCode;
              t.col1 = l.nextNodeCode;
              t.col2 = "";
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "";
              t.col4 = "";
              t.color = "#eeeeee";
              t.cursor = "";
              //t.flag = l.flag;
            }
            if (l.nextNodeCode == "End" && end) {
              t.color = "#006cb7";
              t.col2 = "End";
            }
            nodeDataArray.push(t);
            pre.push(l.nextNodeCode);
          }
        });
        nodeDataArray.forEach(function (l) {
          if (
            !(nodes[l.key] && nodes[l.key].flag == "0" && l.color != "#006cb7")
          ) {
            data.nodeDataArray.push(l);
          }
        });
        this.show = true;
        data.nodeDataArray = this.handleLayer(data.nodeDataArray);
        return data;
      },
      ergodicChildNodes: function ergodicChildNodes(arr, idx) {
        if (idx != 4) {
          for (let i in arr) {
            if (
              arr[i]["process_level_" + (idx + 1) + "_list"] instanceof Array &&
              arr[i]["process_level_" + (idx + 1) + "_list"].length > 0
            ) {
              this.ergodicChildNodes(
                arr[i]["process_level_" + (idx + 1) + "_list"],
                idx + 1
              );
            }
          }
        } else {
          arr.forEach((item) => {
            if (
              item.activity_list instanceof Array &&
              item.activity_list.length > 0
            ) {
              for (let j in item.activity_list) {
                let t = {};
                t.col1 = item.activity_list[j].name;
                t.col2 = item.activity_list[j].executor_instance_list ?
                  item.activity_list[j].executor_instance_list[0]
                  .executor_person_name :
                  "";
                t.col3 = item.activity_list[j].executor_instance_list ?
                  item.activity_list[j].executor_instance_list[0]
                  .executor_corp_name :
                  "";
                t.col4 = item.activity_list[j].executor_instance_list ?
                  item.activity_list[j].executor_instance_list[0]
                  .executor_post_name :
                  "";
                t.color = this.panelBgcolor(
                  item.activity_list[j].approve_status
                );
                t.key = "";
                t.loc = "";
                this.nodeDatas.nodeDataArray.push(t);
              }
            }
          });
        }
      },
      panelBgcolor: function (val) {
        switch (val) {
          case "approving":
            return "#03a9f4";
            break;
          case "not-arriving":
            return "#a5dafa";
            break;
          case "finished":
            return "#5cb85c";
            break;
        }
      },
      getData2: function getData2(obj) {
        if (!obj) return;
        this.ergodicChildNodes(obj.process_level_1_list, 1);
        // console.log(this.nodeDatas);
      },
      handleLayer: function handleLayer(data) {
        var width = this.$refs.flow.$el.clientWidth;
        var num = parseInt(width / 200);
        var nodeDataArray = [];
        data.forEach(function (l, i) {
          var t = i + 1;
          var lx = i % num;
          var ly = parseInt(t / num) - 1;
          var yu = t % num;
          if (yu > 0) {
            ly += 1;
          }
          if (ly % 2 != 0) {
            lx = num - 1 - lx;
          }
          var loc = lx * 200 + " " + ly * 200;
          l.loc = loc;
          nodeDataArray.push(l);
        });
        return nodeDataArray;
      },
      creFlow: function creFlow(params) {
        this.creDiagram();
        this.setParams();
        this.creTemplate(params);
      },
      handleFlowData: function handleFlowData(list, relation) {
        list = [{
            taskCode: "QuotationManualUnderwriting",
            handlerCode: "Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "1",
            isHighlighted: true,
            color: "#006cb7",
            cursor: "white",
          },
          {
            taskCode: "QuotationManualUnderwriting1",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "2",
            color: "white",
            cursor: "red",
          },
          {
            taskCode: "QuotationManualUnderwriting2",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "3",
            color: "pink",
            cursor: "grab",
          },
          {
            taskCode: "QuotationManualUnderwriting3",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "4",
            color: "pink",
            cursor: "grab",
          },
          {
            taskCode: "QuotationManualUnderwriting4",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "5",
            color: "pink",
            cursor: "grab",
          },
          {
            taskCode: "QuotationManualUnderwriting5",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "6",
            color: "pink",
            cursor: "grab",
          },
          {
            taskCode: "QuotationManualUnderwriting6",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "7",
          },
          {
            taskCode: "QuotationManualUnderwriting7",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "7",
          },
        ];
        relation = [{
            nodeCode: "QuotationManualUnderwriting",
            nextNodeCode: "QuotationManualUnderwriting1",
            name: "QuotationManualUnderwriting",
          },
          {
            nodeCode: "QuotationManualUnderwriting1",
            nextNodeCode: "QuotationManualUnderwriting2",
            name: "QuotationManualUnderwriting1",
          },
          {
            nodeCode: "QuotationManualUnderwriting2",
            nextNodeCode: "QuotationManualUnderwriting3",
            name: "QuotationManualUnderwriting2",
          },
          {
            nodeCode: "QuotationManualUnderwriting3",
            nextNodeCode: "QuotationManualUnderwriting4",
            name: "QuotationManualUnderwriting3",
          },
          {
            nodeCode: "QuotationManualUnderwriting4",
            nextNodeCode: "QuotationManualUnderwriting5",
            name: "QuotationManualUnderwriting4",
          },
          {
            nodeCode: "QuotationManualUnderwriting5",
            nextNodeCode: "QuotationManualUnderwriting6",
            name: "QuotationManualUnderwriting5",
          },
          {
            nodeCode: "QuotationManualUnderwriting6",
            nextNodeCode: "QuotationManualUnderwriting7",
            name: "QuotationManualUnderwriting6",
          },
          {
            nodeCode: "QuotationManualUnderwriting7",
            nextNodeCode: "QuotationManualUnderwriting8",
            name: "QuotationManualUnderwriting7",
          },
        ];
        if (!list || list.length == 0) {
          return null;
        }
        var data = {
          relation: [],
          nodeDataArray: [],
        };
        var re = [],
          oneData = {
            key: "Start",
            col1: "Start",
            col2: "Start",
          };
        list = list.sort(Vue.gvUtil.compare("taskId"));
        var pre = oneData;
        list.forEach(function (l) {
          var d = {};
          d.from = pre.key;
          d.to = l.taskCode;
          d.fromNodeType = "component";
          d.toNodeType = "event";
          d.fill = "2";
          d.isHighlighted = true;
          data.relation.push(d);

          var t = {};
          t.key = l.taskCode;
          t.col1 = l.taskCode;
          t.col2 = l.handlerCode;
          t.isHighlighted = true;
          t.figure = "Circle";
          t.col3 = "InTime  :" + l.inTime;
          t.col4 = l.outTime ? "OutTime:" + l.outTime : "";
          t.color = l.color;
          t.cursor = l.cursor;
          if (!oneData.col4) {
            oneData.col4 = "OutTime  :" + l.inTime;
            oneData.color = l.color;
            oneData.cursor = l.cursor;
            data.nodeDataArray.push(oneData);
          }
          data.nodeDataArray.push(t);
          pre = t;
        });
        return data;
      },
      getData1: function getData1(obj) {
        var list1 = obj.nodeDataArray,
          list = obj.relation;
        var data = {
          relation: [],
          nodeDataArray: [],
        };
        list = [{
            nodeCode: "DocArchive",
            nextNodeCode: "DocArchiveInput",
            factorValue: "10",
          },
          {
            nodeCode: "DocArchiveInput",
            nextNodeCode: "End",
            factorValue: "10",
          },
          {
            nodeCode: "DocArchiveInput",
            nextNodeCode: "DocArchive",
            factorValue: "20",
          },
          {
            nodeCode: "DocArchive",
            nextNodeCode: "End",
            factorValue: "11",
          },
          {
            nodeCode: "Start",
            nextNodeCode: "DocArchive",
            factorValue: "00",
          },
        ];
        list1 = [{
            taskCode: "DocArchiveInput",
            handlerCode: "Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "1",
            isHighlighted: true,
            color: "#006cb7",
            cursor: "white",
          },
          {
            taskCode: "DocArchive",
            handlerCode: "Hancy",
            inTime: "2019-11-29 17:49:50",
            outTime: "2019-11-29 17:49:50",
            taskId: "2",
            color: "white",
            cursor: "red",
          },
        ];
        // list2 = {
        //     DocArchiveInput: {
        //         taskCode: 'DocArchiveInput',
        //         handlerCode: 'Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy,Hancy',
        //         inTime: '2019-11-29 17:49:50',
        //         outTime: '2019-11-29 17:49:50',
        //         taskId: '1',
        //         isHighlighted: true,
        //         color: "#006cb7",
        //         cursor: "white"
        //     },
        //     DocArchive: {
        //         taskCode: 'DocArchive',
        //         handlerCode: 'Hancy',
        //         inTime: '2019-11-29 17:49:50',
        //         outTime: '2019-11-29 17:49:50',
        //         taskId: '2',
        //         color: "white",
        //         cursor: "red"
        //     }
        // };
        // var list = [{
        //     nodeCode: 'Start',
        //     nextNodeCode: 'DocArchive',
        //     factorValue: '00'
        // }, {
        //     nodeCode: 'DocArchive',
        //     nextNodeCode: 'DocArchiveInput',
        //     factorValue: '10',
        // }, {
        //     nodeCode: 'DocArchiveInput',
        //     nextNodeCode: 'End',
        //     factorValue: '10'
        // }, {
        //     nodeCode: 'DocArchive',
        //     nextNodeCode: 'End',
        //     factorValue: '11'
        // }];
        if (!list || list.length == 0) {
          return null;
        }
        var ends = [];
        list.forEach(function (l) {
          if (l.nextNodeCode == "End") {
            ends.push(l.nodeCode);
          }
        });
        var list2 = {},
          end = null,
          b = true;
        list1.forEach(function (l) {
          list2[l.taskCode] = l;
          if (ends.indexOf(l.taskCode) > -1 && l.outTime && b) {
            end = $.extend({}, l || {});
          }
          if (!l.outTime) {
            end = null;
            b = false;
          }
        });

        var pre = [];

        list.forEach(function (l) {
          var d = {};
          d.from = l.nodeCode;
          d.to = l.nextNodeCode;
          d.fromNodeType = "component";
          d.toNodeType = "event";
          d.factorValue = l.factorValue;
          d.relationship = "generalization";
          data.relation.push(d);

          if (pre.indexOf(l.nodeCode) == -1) {
            var t = {};
            if (list2[l.nodeCode]) {
              t.key = list2[l.nodeCode].taskCode;
              t.col1 = list2[l.nodeCode].taskCode;
              t.col2 = list2[l.nodeCode].handlerCode;
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "InTime  :" + list2[l.nodeCode].inTime;
              t.col4 = list2[l.nodeCode].outTime ?
                "OutTime:" + list2[l.nodeCode].outTime :
                "";
              t.color = "#006cb7";
              t.cursor = "";
            } else {
              t.key = l.nodeCode;
              t.col1 = l.nodeCode;
              t.col2 = "";
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "";
              t.col4 = "";
              t.color = "#eeeeee";
              t.cursor = "";
            }
            if (l.nodeCode == "Start") {
              t.color = "#006cb7";
              t.col2 = l.nodeCode;
            }
            data.nodeDataArray.push(t);
            pre.push(l.nodeCode);
          }

          if (pre.indexOf(l.nextNodeCode) == -1) {
            var t = {};
            if (list2[l.nextNodeCode]) {
              t.key = list2[l.nextNodeCode].taskCode;
              t.col1 = list2[l.nextNodeCode].taskCode;
              t.col2 = list2[l.nextNodeCode].handlerCode;
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "InTime  :" + list2[l.nextNodeCode].inTime;
              t.col4 = list2[l.nextNodeCode].outTime ?
                "OutTime:" + list2[l.nextNodeCode].outTime :
                "";
              t.color = "#006cb7";
              t.cursor = "";
            } else {
              t.key = l.nextNodeCode;
              t.col1 = l.nextNodeCode;
              t.col2 = "";
              t.isHighlighted = true;
              t.figure = "Circle";
              t.col3 = "";
              t.col4 = "";
              t.color = "#eeeeee";
              t.cursor = "";
            }
            if (l.nextNodeCode == "End" && end) {
              t.color = "#006cb7";
              t.col2 = "End";
            }
            data.nodeDataArray.push(t);
            pre.push(l.nextNodeCode);
          }
        });
        this.show = true;
        return data;
        //return this.handleFlowData(obj.nodeDataArray, obj.relation);
      },
      creDiagram: function creDiagram() {
        if (!this.diagram) {
          this.diagram = new go.Diagram(this.id); //this.goMake(go.Diagram, this.id);
        }
      },
      setParams: function setParams() {
        // 将图表在画布中居左显示
        this.diagram.initialContentAlignment = go.Spot.Left;
        // 操作支持ctrl+z、ctrl+Y 实现undo和redo
        this.diagram.undoManager.isEnabled = false;
        //允许删除
        this.diagram.allowDelete = false;
        //允许复制
        this.diagram.allowCopy = false;
        //画布是否可以缩放
        this.diagram.allowZoom = false;
        //禁止拖动
        this.diagram.allowMove = false;
        //去除水平滚动条
        this.diagram.hasHorizontalScrollbar = false;
        //去除竖直滚动条
        this.diagram.hasVerticalScrollbar = false;

        this.diagram.canStart = true;
        // this.diagram.layout = this.goMake(go.TreeLayout, // 1个特殊的树形排列 Diagram.layout布局
        //     { angle: 0, nodeSpacing: 50, layerSpacing: 30 });
        // this.diagram.layout = this.goMake(go.ForceDirectedLayout, {
        //     defaultSpringLength: 0,
        //     defaultElectricalCharge: 360
        // });
        //this.diagram.layout = this.goMake(go.LayeredDigraphLayout);
      },
      creTemplate: function creTemplate(params) {
        // if (!params) return;
        this.diagram.nodeTemplate = this.goMake(
          go.Node,
          "Vertical", //'Auto'：与css设置width:auto同样效果
          {
            // 添加点击事件
            click: function click(e, obj) {},
          },
          // 将节点数据nodeDataArray .loc与图表位置建立联系
          new go.Binding("position", "loc", go.Point.parse),
          this.goMake(
            go.Panel,
            "Auto", {
              name: "BODY",
            },
            this.goMake(
              go.Shape,
              "Rectangle", {
                fill: "",
                stroke: "#dfe6ec",
                strokeWidth: 2,
                name: "highlight",
              }, //将节点数据nodeDataArray .color与节点背景色建立联系
              new go.Binding("fill", "color")
            ),
            this.goMake(
              go.Panel,
              "Vertical",
              this.goMake(
                go.TextBlock, {
                  //表头
                  stretch: go.GraphObject.Horizontal,
                  verticalAlignment: go.Spot.Center, //垂直对齐
                  font: "bold 12px Verdana, sans-serif",
                  textAlign: "center", //居中对齐
                  background: "#006cb7",
                  stroke: "#fff",
                  name: "maxwidth",
                  height: 30,
                  width: 145,
                  //isMultiline: false,
                  //wrap:"none",//省略号
                  maxLines: 1, //省略号
                  overflow: go.TextBlock.OverflowEllipsis,
                  /* width:250,
                            wrap:"none",//省略号
                            maxLines:1,//省略号
                            overflow: go.TextBlock.OverflowEllipsis,//省略号 */
                },
                new go.Binding("text", "col1"),
                new go.Binding("background", "color")
              ),
              this.goMake(
                go.Panel,
                "Vertical", {
                  //#303133
                  stretch: go.GraphObject.Horizontal,
                  background: "#FFF",
                },
                this.goMake(
                  go.Panel,
                  "Table", {
                    //第二行
                    stretch: go.GraphObject.Fill,
                    background: "white",
                    defaultRowSeparatorStroke: "#dfe6ec",
                    //stroke: '#e3e3e3'
                  },
                  this.goMake(
                    go.Panel,
                    "TableRow", {
                      row: 0,
                    },
                    this.goMake(
                      go.TextBlock, {
                        font: "8px Verdana, sans-serif",
                        stroke: "#303133",
                        height: 50,
                        column: 1,
                        name: "width",
                        width: 115,
                        textAlign: "center",
                        maxLines: 1, //省略号
                        overflow: go.TextBlock.OverflowEllipsis,
                        margin: new go.Margin(12, 5, 0, 5),
                        alignment: go.Spot.Center,
                        verticalAlignment: go.Spot.Center, //垂直对齐
                      },
                      new go.Binding("text", "col2"),
                      new go.Binding("display", "display")
                    )
                  ),
                  this.goMake(
                    go.Panel,
                    "TableRow", {
                      row: 1,
                    },
                    this.goMake(
                      go.TextBlock, {
                        font: "8px Verdana, sans-serif",
                        stroke: "#303133",
                        height: 20,
                        column: 1,
                        name: "width",
                        margin: new go.Margin(12, 5, 0, 5),
                        alignment: go.Spot.Center,
                        verticalAlignment: go.Spot.Center, //垂直对齐
                      },
                      new go.Binding("text", "col3")
                    )
                  )
                ),
                this.goMake(
                  go.Panel,
                  "Table", {
                    //第三行
                    stretch: go.GraphObject.Fill,
                    background: "white",
                  },
                  this.goMake(
                    go.TextBlock, {
                      font: "8px Verdana, sans-serif",
                      height: 20,
                      stroke: "#303133",
                      name: "width",
                      margin: new go.Margin(0, 5, 0, 5),
                      alignment: go.Spot.Center,
                      verticalAlignment: go.Spot.Center, //垂直对齐
                    },
                    new go.Binding("text", "col4")
                  )
                )
              )
            )
          )
        );
        this.diagram.linkTemplate = this.goMake(
          go.Link, {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            //mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            //mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
            selectionAdorned: false,
          },
          new go.Binding(
            "isLayoutPositioned",
            "relationship",
            this.convertIsTreeLink
          ),
          this.goMake(go.Shape, {
            strokeWidth: 1,
            stroke: "#33A7EB",
            margin: 10,
          }), // 线的宽度和笔画的颜色
          this.goMake(
            go.Shape,
            new go.Binding("fromArrow", "relationship", this.convertFromArrow)
          ),
          this.goMake(go.Shape, {
            toArrow: "standard",
            stroke: "#33A7EB",
            fill: "#33A7EB",
          })
        );

        // this.diagram.linkTemplate = this.goMake(go.Link, {
        //         routing: go.Link.AvoidsNodes,
        //         curve: go.Link.JumpOver,
        //         corner: 5,
        //         toShortLength: 4,
        //         relinkableFrom: true,
        //         relinkableTo: true,
        //         reshapable: true,
        //         resegmentable: true,
        //         // mouse-overs subtly highlight links:
        //         mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
        //         mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
        //         selectionAdorned: false

        //     },
        //     this.goMake(go.Shape, // 此形状仅在突出显示时才显示
        //         { isPanelMain: true, stroke: "red", strokeWidth: 2 },
        //         new go.Binding("stroke", "isHighlighted", function(h) {
        //             console.log(h);
        //             return h ? "red" : '#303133';
        //         }).ofObject()),
        //     // this.goMake(go.Shape, // the link shape
        //     //     { strokeWidth: 2, stroke: '' }, new go.Binding('stroke', 'color')),
        //     this.goMake(go.Shape, // the arrowhead
        //         {
        //             toArrow: 'OpenTriangle',
        //             fill: null,
        //             stroke: ''
        //         }, new go.Binding('stroke', 'cursor'))
        // );
        this.diagram.model = new go.GraphLinksModel(
          this.nodeDatas.nodeDataArray,
          this.nodeDatas.relation
        );
        // this.diagram.model = new go.GraphLinksModel(params.nodeDataArray, params.relation);
      },
      convertIsTreeLink: function convertIsTreeLink(r) {
        return r === "generalization";
      },
      convertFromArrow: function convertFromArrow(r) {
        switch (r) {
          case "generalization":
            return "";
          default:
            return "";
        }
      },
      convertToArrow: function convertToArrow(r) {
        switch (r) {
          case "generalization":
            return "Triangle";
          case "aggregation":
            return "StretchedDiamond";
          default:
            return "";
        }
      },
      init: function init(params) {
        if (!this.show || !params) return;
        this.creDiagram();
        if (!this.diagram) {
          this.diagram = this.goMake(go.Diagram, this.id, {
            initialContentAlignment: go.Spot.Left, //加载位置
            initialPosition: new go.Point(-50, -10),
            allowDelete: false, //完全禁用删除
            //initialAutoScale:go.Diagram.Uniform,//全屏显示树结构
            //scrollMode: go.Diagram.InfiniteScroll, //启动无限滚动，不受边界控制
            //"animationManager.isEnabled":false,
            //"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //启动滚轮缩放
            allowMove: false, //禁止拖动
            allowZoom: false,
            /*"allowSelect":false,//禁止选择 */
            hasHorizontalScrollbar: false, //去除水平滚动条
            //"hasVerticalScrollbar": false, //去除竖直滚动条
            canStart: true,
            //autoScale:go.Diagram.UniformToFill,
            /* "TreeLayout.lerangement":go.TreeLayout.ArrangementVertical, */
            // grid: this.goMake(go.Panel, "Grid", //网格
            //     this.goMake(go.Shape, "LineH", {
            //         stroke: "lightgray",
            //         strokeWidth: 0.5
            //     }),
            //     this.goMake(go.Shape, "LineH", {
            //         stroke: "gray",
            //         strokeWidth: 0.5,
            //         interval: 10
            //     }),
            //     this.goMake(go.Shape, "LineV", {
            //         stroke: "lightgray",
            //         strokeWidth: 0.5
            //     }),
            //     this.goMake(go.Shape, "LineV", {
            //         stroke: "gray",
            //         strokeWidth: 0.5,
            //         interval: 10
            //     })
            // ),
            //{ angle: 0, layerSpacing: 65 });
            layout: this.goMake(go.TreeLayout, {
              angle: 0,
              arrangement: go.TreeLayout.ArrangementVertical,
            }),
          });
        }
        this.diagram.nodeTemplate = this.goMake(
          go.Node,
          "Vertical", {
            isTreeExpanded: true, //折叠全部子节点
            selectionObjectName: "BODY",
            /*"selectionAdorned":false,禁止出现矩形框*/
            selectionAdorned: false,
            /*layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,展开不恢复到默认布局*/
          },
          new go.Binding("position", "loc", go.Point.parse),
          this.goMake(
            go.Panel,
            "Auto", {
              name: "BODY",
            },
            this.goMake(
              go.Shape,
              "Rectangle", {
                fill: "",
                stroke: "#dfe6ec",
                strokeWidth: 2,
                name: "highlight",
              }, //将节点数据nodeDataArray .color与节点背景色建立联系
              new go.Binding("fill", "color")
            ), //边框
            this.goMake(
              go.Panel,
              "Vertical",
              this.goMake(
                go.TextBlock, {
                  //表头
                  stretch: go.GraphObject.Horizontal,
                  verticalAlignment: go.Spot.Center, //垂直对齐
                  font: "bold 12px Verdana, sans-serif",
                  textAlign: "center", //居中对齐
                  background: "#006cb7",
                  stroke: "#fff",
                  name: "maxwidth",
                  height: 30,
                  width: 145,
                  //isMultiline: false,
                  //wrap:"none",//省略号
                  maxLines: 1, //省略号
                  overflow: go.TextBlock.OverflowEllipsis,
                  /* width:250,
                        wrap:"none",//省略号
                        maxLines:1,//省略号
                        overflow: go.TextBlock.OverflowEllipsis,//省略号 */
                },
                new go.Binding("text", "col1")
              ),
              this.goMake(
                go.Panel,
                "Vertical", {
                  //#303133
                  stretch: go.GraphObject.Horizontal,
                  background: "#FFF",
                  /* ,click:function(a,c){//绑定PanelExpanderButton点击事件
                                                    var diagram = c.diagram;
                                                    if (diagram === null) return;
                                                    if (diagram.isReadOnly) return;
                                                    var elt = c.findTemplateBinder();
                                                    if (elt === null) elt = c.part;
                                                    if (elt !== null) {
                                                      var pan = elt.findObject("COLLAPSIBLE");
                                                      if (pan !== null) {
                                                        diagram.startTransaction('Collapse/Expand Panel');
                                                        pan.visible = !pan.visible;
                                                        diagram.commitTransaction('Collapse/Expand Panel');
                                                      }
                                                    }
                                                }, */
                },
                this.goMake(
                  go.Panel,
                  "Table", {
                    //第二行
                    stretch: go.GraphObject.Fill,
                    background: "white",
                    defaultRowSeparatorStroke: "#dfe6ec",
                    //stroke: '#e3e3e3'
                  },
                  this.goMake(
                    go.Panel,
                    "TableRow", {
                      row: 0,
                    },
                    this.goMake(
                      go.TextBlock, {
                        font: "8px Verdana, sans-serif",
                        stroke: "#303133",
                        height: 50,
                        column: 1,
                        name: "width",
                        maxLines: 1, //省略号
                        overflow: go.TextBlock.OverflowEllipsis,
                        margin: new go.Margin(12, 5, 0, 5),
                        alignment: go.Spot.Center,
                        verticalAlignment: go.Spot.Center, //垂直对齐
                      },
                      new go.Binding("text", "col2")
                    )
                  ),
                  this.goMake(
                    go.Panel,
                    "TableRow", {
                      row: 1,
                    },
                    this.goMake(
                      go.TextBlock, {
                        font: "8px Verdana, sans-serif",
                        stroke: "#303133",
                        height: 20,
                        column: 1,
                        name: "width",
                        margin: new go.Margin(12, 5, 0, 5),
                        alignment: go.Spot.Center,
                        verticalAlignment: go.Spot.Center, //垂直对齐
                      },
                      new go.Binding("text", "col3")
                    )
                  )
                  // this.goMake(go.Panel, "TableRow", { row: 2 },
                  // this.goMake(go.TextBlock, {
                  //     font: "12px Verdana, sans-serif",
                  //     stroke: "#303133",
                  //     height: 25,
                  //     column: 1,
                  //     name: "width",
                  //     margin: new go.Margin(12, 5, 0, 5),
                  //     alignment: go.Spot.Center,
                  //     verticalAlignment: go.Spot.Center //垂直对齐
                  // }, new go.Binding("text", "col4"))),
                ),
                // this.goMake(go.Panel, "Table", { //第三行
                //         stretch: go.GraphObject.Fill,
                //         background: "white"
                //     },
                //     this.goMake(go.TextBlock, {
                //         font: "12px Verdana, sans-serif",
                //         height: 25,
                //         // stroke: "#303133",
                //         name: "width",
                //         margin: new go.Margin(0, 5, 0, 5),
                //         alignment: go.Spot.Center,
                //         verticalAlignment: go.Spot.Center //垂直对齐
                //     }, new go.Binding("text", "col3")),
                // ),
                this.goMake(
                  go.Panel,
                  "Table", {
                    //第三行
                    stretch: go.GraphObject.Fill,
                    background: "white",
                  },
                  this.goMake(
                    go.TextBlock, {
                      font: "8px Verdana, sans-serif",
                      height: 20,
                      stroke: "#303133",
                      name: "width",
                      margin: new go.Margin(0, 5, 0, 5),
                      alignment: go.Spot.Center,
                      verticalAlignment: go.Spot.Center, //垂直对齐
                    },
                    new go.Binding("text", "col4")
                  )
                )
                // this.goMake(go.Panel, "Table", new go.Binding("itemArray", "actions"), {
                //     defaultAlignment: go.Spot.Left,
                //     name: "COLLAPSIBLE",
                //     background: "white",
                //     margin: new go.Margin(2, 0, 0, 0),
                //     stretch: go.GraphObject.Horizontal,
                //     //visible:false,//默认折叠
                //     itemTemplate: this.goMake(go.Panel, "TableRow",
                //         this.goMake(go.TextBlock, new go.Binding("text", "name1"), { column: 1, alignment: go.Spot.Center, stroke: "#6A5ACD", font: "bold 10pt Verdana, sans-serif" }),
                //     )
                // })
              )
            )
          )
        );
        this.creTemplate(params);
        // this.diagram.linkTemplate =
        //     this.goMake(go.Link, go.Link.Orthogonal, { deletable: false, corner: 10 },
        //         this.goMake(go.Shape, { strokeWidth: 2, stroke: "#006cb7" }), this.goMake(go.Shape, // the arrowhead
        //             {
        //                 toArrow: 'OpenTriangle',
        //                 fill: null,
        //                 stroke: '#006cb7'
        //             })
        //     );
        // this.diagram.model = new go.GraphLinksModel(params.nodeDataArray, params.relation); //nodeDataArray:graph, linkDataArray: relation
      },
    },
  };
});
/**
 * 表单
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/form/form.js", [], function (require, exports, module) {
  return {
    template: '<el-form ref="form" size="small" :model="model" :inline="inline" :rules="rules" hide-required-asterisk :status-icon="statusIcon" :disabled="disabled" @submit.native.prevent>\
            <div class="gv-form">\
                <slot></slot>\
            </div>\
        </el-form>',
    name: "GvForm",
    componentName: "GvForm",
    provide: function provide() {
      return {
        gvForm: this,
      };
    },

    props: {
      inline: {
        type: Boolean,
        default: true,
      },
      statusIcon: {
        type: Boolean,
        default: true,
      },
      model: Object,
      rules: Object,
      disabled: Boolean,
      column: {
        type: Number,
        default: 6,
      },
    },
    data: function data() {
      return {};
    },
    watch: {},
    created: function created() {},
    mounted: function mounted() {},

    methods: {
      validate: function validate(callBack) {
        this.$refs.form.validate(function (valid, obj) {
          callBack(valid, obj);
        });
      },
      validateField: function validateField(prop, callBack) {
        this.$refs.form.validateField(prop, function (valid) {
          callBack(valid);
        });
      },
      resetFields: function resetFields() {
        this.$refs.form.resetFields();
      },
      clearValidate: function clearValidate() {
        var props =
          arguments.length > 0 && arguments[0] !== undefined ?
          arguments[0] : [];

        this.$refs.form.clearValidate(props);
      },
    },
  };
});
/**
 * 表单格
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/components/form/form-item.js", [], function (
  require,
  exports,
  module
) {
  //原比例三列 var lw = 12.5,
  //rw = 20.60;
  var lw = 8.2,
    rw = 16.0;
  return {
    template: '<div>\
        <div class="gv-cell " :style="left"><span class="gv-span">\
                <em class="require" v-if="requires">*</em>\
                {{name}}\
                </span></div>\
            <div class="gv-cell" :style="right">\
                <el-form-item :prop="prop" :rules="rules">\
                    <slot></slot>\
                </el-form-item>\
            </div>\
        </div>',
    name: "GvFormItem",
    componentName: "GvFormItem",
    inject: ["gvForm"],
    props: {
      keyName: {
        type: String,
        default: "",
      },
      requires: {
        type: Boolean,
        default: false,
      },
      prop: {
        type: String,
        default: "",
      },
      rules: {
        type: Array,
        default: null,
      },
      colspan: {
        type: Number,
        default: 1,
      },
      numbers: {
        type: Number,
        default: 0,
      },
      isThree: {
        type: String,
        default: null,
      },
      isFour: {
        type: Boolean,
        default: null,
      },
      isFive: {
        // 王松add
        type: Boolean,
        default: null,
      },
      isSix: {
        // 王松add
        type: Boolean,
        default: null,
      },
      isThree2: {
        // 王松add
        type: Boolean,
        default: null,
      },
    },
    data: function data() {
      return {
        name: this.keyName ? Vue.filter("translate")(this.keyName) + ":" : "",
        left: "text-align:right;width:" + lw + "%;",
        right: "width:" + rw + "%;",
        fields: {},
      };
    },
    watch: {
      keyName: function keyName(val) {
        // 监听 data里面的wa,val是最新的值，old是旧的数据
        this.name = Vue.filter("translate")(val);
      },
    },
    created: function created() {
      //
      //isisThree为true则展示三列效果
      if (this.isThree == "true") {
        lw = 12;
        rw = 19.5;
        this.left = "text-align:right;width:" + lw + "%;";
        this.right = "width:" + rw + "%;";
      } else if (this.isThree == "false") {
        lw = 12;
        rw = 82.5;
        this.left = "text-align:right;width:" + lw + "%;";
        this.right = "width:" + rw + "%;";
      }
      if (this.isThree2 == "true") {
        lw = 3.5;
        rw = 19.5;
        this.left = "text-align:left;width:" + lw + "%;";
        this.right = "width:" + rw + "%;";
      }
      if (this.isFour) {
        this.left = "text-align:right;width: 8.2%;";
        this.right = "width: 16.0%;";
      }
      if (this.isFive == "true") {
        // 王松add
        lw = 40;
        rw = 25;
        this.left = "text-align:right;width:" + lw + "%;";
        this.right = "width:" + rw + "%;";
      }
      if (this.isSix == "true") {
        // 王松add
        lw = 5;
        rw = 7;
        this.left = "text-align:left";
        // this.right = "width:" + rw + "%;";
      }
      this.initColspan();
    },

    methods: {
      initColspan: function initColspan() {
        if (this.colspan && this.colspan > 1) {
          var w =
            parseInt(this.colspan / 2) * (lw + rw) + (this.colspan % 2) * rw;
          this.right = "width:" + w + "%";
        }
        if (this.numbers != 0) {
          this.left =
            "text-align:right;width:" + (100 / this.numbers) * 0.375 + "%;";
          this.right = "width:" + (100 / this.numbers) * 0.625 + "%;";
        }
      },
      initField: function initField() {
        var num = 0;
        for (var key in this.$slots) {
          num++;
          this.fields[key] = this.handleField(this.$slots[key][0], key);
          num += this.fields[key].colspan;
        }
        this.complement = this.gvForm.column - num;
        if (this.complement > 0) {
          this.complementWidth =
            (
              (this.getColumnNum(this.complement) / (this.gvForm.column * 4)) *
              100
            ).toFixed(2) + "%";
        }
      },
      handleField: function handleField(obj, key) {
        return {
          prop: key,
          label: obj.data.attrs.flabel ?
            Vue.filter("translate")(obj.data.attrs.flabel) + ":" : "",
          requires: obj.data.attrs.frequires,
          colspan: obj.data.attrs.fcolspan || 1,
          widthsLeft: (
            (this.getColumnNum(1, "left") / (this.gvForm.column * 4)) *
            100
          ).toFixed(2) + "%",
          widthsRight: (
            (this.getColumnNum(obj.data.attrs.fcolspan || 1) /
              (this.gvForm.column * 4)) *
            100
          ).toFixed(2) + "%",
        };
      },
      getColumnNum: function getColumnNum(colspan, type) {
        return (
          parseInt(colspan / 2) * 8 +
          (colspan % 2) * (type && type == "left" ? 3 : 5)
        );
      },
    },
  };
});
/**
 * 面板
 * @author 陈柱良
 * @time 2020/02/20
 */
define("src/components/panel/panel.js", [], function (
  require,
  exports,
  module
) {
  return {
    template: '<div class="topicinfo">\
            <h1 class="gv-panel-title" v-if="isTitle"><i class="icon" :class="icon"></i>{{title | translate}}<span v-if="isSubhead" class="infotips"><i class="icon icon-tipsinfo"></i>{{subTitle | translate}}</span><slot name="subBtn"></slot></h1>\
            <div class="gv-panel-box" :class="funBarTitle?\'gv-subject\': \'\'">\
                <div class="gv-subject-title" v-if="funBarTitle">\
                    <div class="gv-subject-number">{{funBarTitle | translate}}</div>\
                    <slot name="funBarBtnLeft"></slot>\
                    <div class="pull-right">\
                        <slot name="funBarBtnRight"></slot>\
                        <el-button class="mr20 gv-btn-primary" :class="isCtShow?\'icon-up\': \'icon-down\'" type="text" @click="onFold(\'0\')">{{textBtn}}</el-button>\
                    </div>\
                </div>\
                <div class="gv-content" v-show="isCtShow" :class="funBarTitle?\'gv-border-top\': \'\'">\
                    <slot></slot>\
                </div>\
            </div>\
        </div>',
    props: {
      funBarTitle: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      icon: {
        type: String,
        default: "icon-saleinfo",
      },
      subTitle: {
        type: String,
        default: "",
      },
      isShow: {
        type: Boolean,
        default: true,
      },
    },
    data: function data() {
      return {
        isSubhead: false,
        isTitle: this.title ? true : false,
        isCtShow: true,
        textBtn: "",
      };
    },
    created: function created() {
      this.initData();
    },

    methods: {
      initData: function initData() {
        this.isSubhead = this.subTitle ? true : false;
        this.isCtShow = this.isShow;
        this.textBtn = this.isCtShow ? "展开" : "收起";
      },
      onFold: function onFold(type, obj) {
        if (type === "0") {
          this.isCtShow = !this.isCtShow;
        } else {
          this.isCtShow = obj;
        }
        this.textBtn = this.isCtShow ? "展开" : "收起";
      },
    },
    watch: {
      isShow: function isShow(val) {
        this.onFold("1", val);
      },
    },
  };
});
/**
 * 表格
 * @author 陈柱良
 * @time 2020/1/01
 */
//  <div class="gv-query-table" :class="homeType==\'top\'?\'\':\'gv-query-table-left\'">\ 搜索页面边距自适应切换菜单top,left
define("src/components/data-table/data-table.js", [
  "src/mixins/tableMixins.js",
], function (require, exports, module) {
  var tableMixins = require("src/mixins/tableMixins.js");
  var id = 1;
  return {
    template: '<div>\
              <gv-form :inline="true" ref="fromFilters" :model="fromFilters">\
                  <div class="gv-query-table" :class="homeType==\'top\'?\'\':\'gv-query-table-left\'">\
                      <h1 class="query-title">{{\'gTitleSearchData\' | translate}}</h1>\
                      <div class="query-head">\
                          <div class="gv-content">\
                              <slot name="search" v-bind:search="fromFilters"></slot>\
                          </div>\
                      </div>\
                      <div class="query-more" v-show="isMore">\
                          <div class="gv-content">\
                              <slot name="searchMore" v-bind:search="fromFilters"></slot>\
                          </div>\
                      </div>\
                      <div class="query-bottom">\
                          <div class="pull-left">\
                              <el-button class="gv-btn gv-btn-white" @click="dialogFormVisible = true">{{ \'gBtnSaveFi\' | translate }}</el-button>\
                              <el-button class="gv-btn gv-btn-white" @click="dialogTableVisible = true">{{ \'gBtnMaFi\' | translate }}</el-button>\
                              <el-select @change="getFilterEx" size="small" :placeholder="\'gSelectFi\' | translate" class="gv-filter-select" filterable v-model="filterEx">\
                                  <el-option v-for="item in optionsFieldsEx" :key="item.value" :label="item.label" :value="item.value">\
                                  </el-option>\
                              </el-select>\
                          </div>\
                          <div class="pull-right">\
                              <el-button class="gv-btn gv-btn-primary" type="primary" @click="onGetList()">{{ \'gBtnSearch\' | translate(\'Search\') }}</el-button>\
                              <el-button class="gv-btn gv-btn-warning" @click="onResetForm(\'fromFilters\')">{{ \'gBtnClear\' | translate(\'Clear\') }}</el-button>\
                              <el-button v-if="isMoreBtn" class="gv-btn gv-btn-white ml10 morecontrol" @click="onMore">更多查询条件<i :class="isMore ? \'icon-up\':\'icon-down\'"></i></button>\
                          </div>\
                          <div class="clearfix"></div>\
                        </div>\
                  </div>\
              </gv-form>\
              <div class="gv-query-table" style="margin-top:15px;">\
                  <div class="query-control">\
                    <slot name="toolbar" v-bind:data="{search: fromFilters, list: list }"></slot>\
                      <div class="pull-right">\
                          <el-button class="gv-btn-primary gv-btn-xs" icon="el-icon-download" v-if="execl.isShow" :disabled="disabledExcel" @click="onExportExcel">{{ \'gBtnToExecl\' | translate(\'ToExecl\') }}</el-button>\
                          <el-button class="gv-btn-primary gv-btn-xs" icon="el-icon-download" v-if="execlAll" @click="onExportAllExcel">{{ \'ToAllExecl\' | translate(\'导出全部\') }}</el-button>\
                          <el-button class="gv-btn-primary gv-btn-xs" icon="el-icon-tickets" @click="keySelect = !keySelect"></el-button>\
                          <!--  <i class="el-icon-tickets key-select-icon" @click="keySelect = !keySelect"></i> -->\
                          <div class="key-select-list" v-show="keySelect">\
                              <el-checkbox :indeterminate="isIndeterminate" v-model="isDefalutAll" @change="onHandleCheckAll">{{ \'gAll\' | translate(\'ALL\')}}</el-checkbox>\
                              <el-checkbox-group v-model="checkedOptions" @change="onHandleChecked" class="key-list">\
                                  <el-checkbox v-for="option in listFields" :label="option.filterProp" :key="option.prop">{{option.label}}</el-checkbox>\
                              </el-checkbox-group>\
                          </div>\
                      </div>\
                  </div>\
                  <div class="query-content">\
                      <el-table :data="list" ref="list" :id="ids" class="table-scroll" :highlight-current-row="singleElection" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" stripe>\
                          <el-table-column v-if="showSequenceNum" :label="\'gNumber\' | translate" width="80">\
                              <template v-slot="scope">\
                                  <span>{{(mixinObject.searchSet.currentPage -1) * mixinObject.searchSet.pageSize + scope.$index + 1}}</span>\
                              </template>\
                          </el-table-column>\
                          <el-table-column v-if="multipleElection" type="selection" width="50"></el-table-column>\
                              <el-table-column v-if="item.show" v-for="(item, index) in listFields" sortable :prop="item.prop" :label="item.label" :title="item.label" :width="item.width" :formatter="formatStatus">\
                                  <template v-slot="scope" v-if="item.btns">\
                                      <el-button class="gv-btn-primary" type="primary" v-for="(btn, index) in item.btns" v-if="btn.type==\'btn\'"\
                                      @click="onHandle(scope.row, btn.flag, index)">{{ btn.btnKey | translate() }}</el-button>\
                                      <a v-for="(btn, index) in item.btns" v-if="btn.type==\'a\'" href="javascript:;" @click="onHandle(scope.row, btn.flag, index)"> {{scope.row[btn.prop]}} </a>\
                                      <el-button v-for="(btn, index) in item.btns" v-if="btn.type==\'icon\'"\
                                      :icon="item.prop==\'1\'?\'el-icon-check\':\'el-icon-close\'" :class="item.prop==\'1\'?\'gv-btn-primary\':\'gv-btn-warning\'" @click="onHandle(scope.row, btn.flag, index)"></el-button>\
                                  </template>\
                              </el-table-column>\
                          </el-table>\
                      <div v-if="hasPage" :span="24" class="gv-pagination">\
                          <el-pagination  hide-on-single-page style="float: right;" @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :page-sizes="pageSizes" :page-size="mixinObject.searchSet.pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="mixinObject.searchSet.total" :current-page.sync="mixinObject.searchSet.currentPage">\
                          </el-pagination>\
                      </div>\
                  </div>\
              </div>\
              <el-dialog :title="\'gTitlePrompt\' | translate" custom-class="gv-dialog" :visible.sync="dialogFormVisible">\
                  <gv-form :model="fromFiltersEx" ref="fromFiltersEx" :inline="false">\
                      <el-form-item :label="\'gName\' | translate" label-width="120px">\
                          <el-input v-model="fromFiltersEx.name" autocomplete="off"></el-input>\
                      </el-form-item>\
                      <el-form-item :label="\'gRemarks\' | translate" label-width="120px">\
                          <el-input v-model="fromFiltersEx.remarks" autocomplete="off"></el-input>\
                      </el-form-item>\
                  </gv-form>\
                  <div slot="footer" class="dialog-footer">\
                      <el-button class="gv-btn gv-btn-warning" @click="dialogFormVisible = false">{{ \'gBtnCancel\' | translate }}</el-button>\
                      <el-button class="gv-btn gv-btn-submit" type="primary" @click="onSubmit">{{ \'gSubmit\' | translate }}</el-button>\
                  </div>\
              </el-dialog>\
              <el-dialog custom-class="gv-dialog" :title="\'gBtnMaFi\' | translate" :visible.sync="dialogTableVisible">\
              <div class="gv-query-table" style="margin-top:15px;">\
                  <div class="query-content">\
                      <el-table :data="optionsFieldsEx">\
                          <el-table-column prop="label" :label="\'gName\' | translate" width="150"></el-table-column>\
                          <el-table-column prop="remarks" :label="\'gRemarks\' | translate" width="200"></el-table-column>\
                          <el-table-column prop="time" :label="\'gData\' | translate" show-overflow-tooltip>\
                            <template #default="{row}">{{row.time | time(\'yyyy-MM-dd HH:mm:ss\')}}</template>\
                          </el-table-column>\
                          <el-table-column :label="\'gTitleOperation\' | translate">\
                          <template v-slot="scope">\
                              <el-button @click="onHandleDel(scope.row)" class="gv-btn-warning gv-btn-xs" type="primary">{{ \'gBtnDelete\' | translate }}</el-button>\
                          </template>\
                          </el-table-column>\
                      </el-table>\
                  </el-dialog>\
                  </div>\
              </div>\
          </div>',
    name: "GvTable",
    mixins: [tableMixins],
    props: {
      table: Object,
      beforeValidate: Function,
      hasPage: {
        type: Boolean,
        default: true,
      },
    },
    data: function data() {
      return {
        fromFilters: {},
        active: ["1"],
        list: [],
        listFields: [],
        ids: id,
        cacheFields: {},
        cacheFieldsEx: {},
        optionsFieldsEx: [],
        currentRow: null,
        multipleSelection: null,
        execl: {
          isShow: true,
          fileName: "tableExecl",
          exclude: null,
        },
        execlAll: false,
        api: "",
        vo: "",
        context: "",
        autoSearch: false,
        pageSizes: [10, 30, 50, 100],
        keySelect: false,
        disabledExcel: true,
        isIndeterminate: false,
        isDefalutAll: true,
        checkedOptions: [],
        filterEx: "",
        fromFiltersEx: {
          name: "",
          remarks: "",
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        isMore: false,
        isMoreBtn: false,
        singleElection: false,
        multipleElection: false,
        showSequenceNum: false,
        menutype: this.$store.state.homeType,
        mf: "top",
      };
    },
    watch: {
      list: function list(n, o) {
        if (n && n.length > 0) {
          this.disabledExcel = false;
        } else {
          this.disabledExcel = true;
        }
      },
      checkedOptions: function checkedOptions(n, o) {
        this.handleFiledShow();
      },
    },
    created: function created() {
      this.handleFields(this.table.fields);
      this.handleBasic(this.table.basic);
      this.fromFilters = this.table.search; // Object.assign({}, this.table.search);
      this.autoSearch && this.onGetList();
      id++;
      this.initFilterEx();
    },
    mounted: function mounted() {},
    computed: {
      homeType: function homeType() {
        return this.$store.state.homeType;
      },
    },

    methods: {
      clearSelection() {
        this.$refs.list.clearSelection();
      },
      toggleAllSelection() {
        this.$refs.list.toggleAllSelection();
      },
      toggleRowSelection: function (row, selected) {
        this.$refs.list.toggleRowSelection(row, selected);
      },
      onGetList: function onGetList() {
        var _this2 = this;
        if (
          !this.beforeValidate ||
          (this.beforeValidate && this.beforeValidate(this.fromFilters))
        ) {
          this.searchList(
            this.api,
            this.context,
            this.fromFilters,
            this.vo,
            function (data) {
              _this2.list = data;
              _this2.currentRow = null;
              _this2.multipleSelection = null;
            }
          );
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSelectionChange: function handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onExportExcel: function onExportExcel() {
        if (this.execl.validate && this.list.length == 0) {
          Vue.gvUtil.message("List data is not allowed to be empty");
          return;
        }
        Vue.gvUtil.exportExcel(
          this.$refs.list,
          this.ids,
          this.execl.fileName,
          null,
          this.execl.exclude
        );
      },
      //导入全部 by王松
      onExportAllExcel: function onExportAllExcel() {
        // Vue.gvUtil.message('open');
        let params = this.table.search;
        // console.log('this.table.search', this.table.search)
        let url = Vue.gvUtil.getUrl({
          apiName: "exportBillExcelAll",
          contextName: "selfins",
        });
        Vue.gvUtil.http
          .post(url, params, {
            responseType: "blob",
          })
          .then((res) => {
            // console.log('res', res)
            const data = res;
            const url = window.URL.createObjectURL(
              new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
              })
            );
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            // link.download = decodeURIComponent(res.headers['Content-disposition'].split(';')[1].split('filename=')[1])
            link.setAttribute("download", "download.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      },
      onHandleCheckAll: function onHandleCheckAll() {
        if (this.isDefalutAll) {
          this.checkedOptions = this.cacheAllChecked;
        } else {
          this.checkedOptions = [];
        }
        //this.handleFiledShow();
      },
      onHandleChecked: function onHandleChecked() {
        // console.log(this.checkedOptions, this.cacheAllChecked)
        if (this.checkedOptions.length != this.cacheAllChecked.length) {
          this.isDefalutAll = false;
        } else {
          this.isDefalutAll = true;
        }
        // this.handleFiledShow();
      },
      handleFiledShow: function handleFiledShow() {
        for (var key in this.cacheFields) {
          this.cacheFields[key].show = this.checkedOptions.indexOf(key) > -1;
        }
      },
      handleFields: function handleFields(list) {
        var d = {};
        Object.assign(this.listFields, list);
        for (var key in this.listFields) {
          this.listFields[key].label = Vue.filter("translate")(
            this.listFields[key].labelKey
          );
          this.listFields[key].show = true;
          if (this.listFields[key].prop) {
            this.listFields[key].filterProp = this.listFields[key].prop;
          } else {
            this.listFields[key].filterProp = "filterProp" + key;
          }
          this.checkedOptions.push(this.listFields[key].filterProp);
          d[this.listFields[key].filterProp] = this.listFields[key];
        }
        this.cacheAllChecked = this.checkedOptions;
        this.cacheFields = d;
      },
      handleBasic: function handleBasic(obj) {
        if (obj.execl) {
          Object.assign(this.execl, obj.execl);
        }
        if (obj.execlAll) {
          this.execlAll = obj.execlAll;
        }
        this.isMoreBtn = obj.isShowMore || false;
        this.api = obj.api;
        this.vo = obj.vo;
        this.context = obj.context;
        this.autoSearch = obj.autoSearch;
        this.pageSizes = obj.pageSizes;

        this.singleElection = obj.singleElection || false;
        this.multipleElection = obj.multipleElection || false;
        this.showSequenceNum = obj.showSequenceNum || false;
      },

      // 状态翻译
      formatStatus: function formatStatus(row, column, cellValue, index) {
        var str = "";
        if (
          this.cacheFields[column.property] &&
          this.cacheFields[column.property].format
        ) {
          switch (this.cacheFields[column.property].format.type) {
            case "num":
              str = Vue.filter("money")(cellValue, true, 2);
              break;
            case "date":
              str = Vue.filter("time")(
                cellValue,
                this.cacheFields[column.property].format.format
              );
              break;
            case "ggcode":
              str = Vue.gvUtil.translationData(
                this.cacheFields[column.property].format.codeType,
                cellValue
              );
              break;
          }
        } else {
          str = cellValue;
        }
        return str;
      },
      onHandle: function onHandle(row, flag, index) {
        this.$emit("on-list-btn", row, flag, index);
      },
      onMore: function onMore() {
        this.isMore = !this.isMore;
      },
      onSubmit: function onSubmit() {
        if (this.fromFiltersEx.name == "") {
          this.$message({
            type: "success",
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          });
          return;
        }
        this.dialogFormVisible = false;
        var d = {},
          d1 = {},
          time = new Date().getTime(),
          key = "filter_" + time;
        Object.assign(d1, this.fromFilters);
        d1._filterName = this.fromFiltersEx.name;
        d1._time = time;
        d1._filterRemarks = this.fromFiltersEx.remarks;
        this.cacheFieldsEx[key] = d1;
        this.updateOptionsFieldsEx(this.cacheFieldsEx, true);
        this.$message({
          type: "success",
          message: Vue.gvUtil.getInzTranslate("gSaveSuccess"),
        });
        this.fromFiltersEx.name = "";
        this.fromFiltersEx.remarks = "";
      },
      initFilterEx: function initFilterEx() {
        var f = sessionStorage.getItem(Vue.gvUtil.getMd5(this.api));
        if (!f) return;
        this.cacheFieldsEx = JSON.parse(f);
        this.updateOptionsFieldsEx(this.cacheFieldsEx, false);
      },
      onHandleDel: function onHandleDel(row) {
        var _this = this;
        Vue.gvUtil
          .confirm({
            msg: Vue.gvUtil.getInzTranslate("gDeleteContent"),
          })
          .then(function () {
            if (row && _this.cacheFieldsEx[row.value]) {
              delete _this.cacheFieldsEx[row.value];
              if (_this.filterEx == row.value) {
                _this.filterEx = "";
              }
              _this.updateOptionsFieldsEx(_this.cacheFieldsEx, true);
              _this.$message({
                type: "success",
                message: Vue.gvUtil.getInzTranslate("gDeleteSuccess"),
              });
            }
          });
      },
      updateOptionsFieldsEx: function updateOptionsFieldsEx(obj, type) {
        this.optionsFieldsEx = [];
        // console.log(this.optionsFieldsEx);
        if (obj) {
          for (var key in obj) {
            var d = {
              value: key,
              label: obj[key]._filterName,
              remarks: obj[key]._filterRemarks,
              time: obj[key]._time,
              datas: JSON.stringify(obj[key]),
            };
            this.optionsFieldsEx.push(d);
          }
          this.optionsFieldsEx.sort(Vue.gvUtil.compare("time", false));
          type &&
            sessionStorage.setItem(
              Vue.gvUtil.getMd5(this.api),
              JSON.stringify(obj)
            );
        }
      },
      getFilterEx: function getFilterEx() {
        if (this.cacheFieldsEx && this.cacheFieldsEx[this.filterEx]) {
          Object.assign(this.fromFilters, this.cacheFieldsEx[this.filterEx]);
        }
      },
      getSingleSelectData: function getSingleSelectData() {
        return this.currentRow;
      },
      getSelectData: function getSelectData() {
        return this.multipleSelection;
      },
    },
  };
});
/**
 * 动态展示列表格
 * @author 计昕奇
 * @time 2020/1/01
 */
//  <div class="gv-query-table" :class="homeType==\'top\'?\'\':\'gv-query-table-left\'">\ 搜索页面边距自适应切换菜单top,left
define("src/components/data-table/data-filter-table.js", [
  "src/mixins/tableMixins.js",
], function (require, exports, module) {
  var tableMixins = require("src/mixins/tableMixins.js");
  var id = 1;
  return {
    template: '<div>\
              <gv-form :inline="true" ref="fromFilters" :model="fromFilters">\
                  <div class="gv-query-table" :class="homeType==\'top\'?\'\':\'gv-query-table-left\'">\
                      <h1 class="query-title">{{\'gTitleSearchData\' | translate}}</h1>\
                      <div class="query-head">\
                          <div class="gv-content">\
                              <slot name="search" v-bind:search="fromFilters"></slot>\
                          </div>\
                      </div>\
                      <div class="query-more" v-show="isMore">\
                          <div class="gv-content">\
                              <slot name="searchMore" v-bind:search="fromFilters"></slot>\
                          </div>\
                      </div>\
                      <div class="query-bottom">\
                          <div class="pull-left">\
                              <el-button class="gv-btn gv-btn-white" @click="dialogFormVisible = true">{{ \'gBtnSaveFi\' | translate }}</el-button>\
                              <el-button class="gv-btn gv-btn-white" @click="dialogTableVisible = true">{{ \'gBtnMaFi\' | translate }}</el-button>\
                              <el-select @change="getFilterEx" size="small" :placeholder="\'gSelectFi\' | translate" class="gv-filter-select" filterable v-model="filterEx">\
                                  <el-option v-for="item in optionsFieldsEx" :key="item.value" :label="item.label" :value="item.value">\
                                  </el-option>\
                              </el-select>\
                          </div>\
                          <div class="pull-right">\
                              <el-button class="gv-btn gv-btn-primary" type="primary" @click="onGetList()">{{ \'gBtnSearch\' | translate(\'Search\') }}</el-button>\
                              <el-button class="gv-btn gv-btn-warning" @click="onResetForm(\'fromFilters\')">{{ \'gBtnClear\' | translate(\'Clear\') }}</el-button>\
                              <el-button v-if="isMoreBtn" class="gv-btn gv-btn-primary ml10 morecontrol" @click="onMore">更多查询条件<i :class="isMore ? \'icon-up\':\'icon-down\'"></i></button>\
                          </div>\
                          <div class="clearfix"></div>\
                        </div>\
                  </div>\
              </gv-form>\
              <div class="gv-query-table" style="margin-top:15px;">\
                  <div class="query-control">\
                    <slot name="toolbar" v-bind:data="{search: fromFilters, list: list }"></slot>\
                      <div class="pull-right">\
                          <el-button class="gv-btn-primary gv-btn-xs" icon="el-icon-download" v-if="execl.isShow" :disabled="disabledExcel" @click="onExportExcel">{{ \'gBtnToExecl\' | translate(\'ToExecl\') }}</el-button>\
                            <el-button slot="reference" class="gv-btn-primary gv-btn-xs" icon="el-icon-download" v-if="execlAll" :disabled="disabledExcel" @click="onExportAllExcel">{{ \'gBtnToExecl\' | translate(\'gBtnToAllExecl\') }}</el-button>\
                          <el-button class="gv-btn-primary gv-btn-xs" icon="el-icon-tickets" @click="keySelect = !keySelect"></el-button>\
                          <!--  <i class="el-icon-tickets key-select-icon" @click="keySelect = !keySelect"></i> -->\
                          <div class="key-select-list" v-show="keySelect">\
                              <el-checkbox :indeterminate="isIndeterminate" v-model="isDefalutAll" @change="onHandleCheckAll">{{ \'gAll\' | translate(\'ALL\')}}</el-checkbox>\
                              <el-checkbox-group v-model="checkedOptions" @change="onHandleChecked" class="key-list">\
                                  <el-checkbox v-for="option in listFields" :label="option.filterProp" :key="option.prop">{{option.label}}</el-checkbox>\
                              </el-checkbox-group>\
                          </div>\
                      </div>\
                  </div>\
                  <div style="width: 100%;overflow-x:auto;">\
                  <div class="query-content">\
                      <el-table :data="list" ref="list" :id="ids" class="table-scroll" :highlight-current-row="singleElection" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" @row-dblclick="rowDblclick" stripe>\
                      <el-table-column v-if="multipleElection" type="selection" width="50"></el-table-column>\
                      <el-table-column v-if="showSequenceNum" :label="\'gNumber\' | translate" width="80">\
                            <template v-slot="scope">\
                                <span>{{(mixinObject.searchSet.currentPage -1) * mixinObject.searchSet.pageSize + scope.$index + 1}}</span>\
                            </template>\
                        </el-table-column>\
                          <el-table-column v-if="item.show" v-for="(item, index) in listFields" sortable :prop="item.prop" :label="item.label" :title="item.label" :width="item.width" :formatter="formatStatus" :show-overflow-tooltip="item.showTip">\
                              <template v-slot="scope" v-if="item.btns">\
                                  <el-button type="primary" v-for="(btn, index) in item.btns" v-if="btn.type==\'filterBtn\'&&scope.row[btn.queryKey]==btn.queryValue"\
                                   @click="onHandle(scope.row, btn.flag, index)" :class="btn.flag==\'gBtnDelete\'?\'gv-btn-warning gv-btn-xs\':\'gv-btn-primary gv-btn-xs\'">{{ btn.btnKey | translate() }}</el-button>\
                                  <el-button type="primary" v-for="(btn, index) in item.btns" v-if="btn.type==\'btn\'"\
                                   @click="onHandle(scope.row, btn.flag, index)" :class="btn.flag==\'gBtnDelete\'?\'gv-btn-warning gv-btn-xs\':\'gv-btn-primary gv-btn-xs\'">{{ btn.btnKey | translate() }}</el-button>\
                                  <a v-for="(btn, index) in item.btns" v-if="btn.type==\'a\'" href="javascript:;" @click="onHandle(scope.row, btn.flag, index)"> {{scope.row[btn.prop]}} </a>\
                                  <el-button v-for="(btn, index) in item.btns" v-if="btn.type==\'icon\'"\
                                  :icon="item.prop==\'1\'?\'el-icon-check\':\'el-icon-close\'" :class="item.prop==\'1\'?\'gv-btn-primary gv-btn-xs\':\'gv-btn-warning gv-btn-xs\'" @click="onHandle(scope.row, btn.flag, index)" :class="item.prop==\'1\'?\'gv-btn-primary gv-btn-xs\':\'gv-btn-warning gv-btn-xs\'"></el-button>\
                              </template>\
                          </el-table-column>\
                      </el-table>\
                  </div></div>\
                   <div :span="24" class="gv-pagination zbpaginationBYLDL">\
                  <el-pagination style="float: right;" @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" :page-sizes="pageSizes" :page-size="mixinObject.searchSet.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="mixinObject.searchSet.total" :current-page.sync="mixinObject.searchSet.currentPage">\
                  </el-pagination>\
              </div>\
              </div>\
              <el-dialog :title="\'gTitlePrompt\' | translate" custom-class="gv-dialog" :visible.sync="dialogFormVisible">\
                  <gv-form :model="fromFiltersEx" ref="fromFiltersEx" :inline="false">\
                      <el-form-item :label="\'gName\' | translate" label-width="120px">\
                          <el-input v-model="fromFiltersEx.name" autocomplete="off"></el-input>\
                      </el-form-item>\
                      <el-form-item :label="\'gRemarks\' | translate" label-width="120px">\
                          <el-input v-model="fromFiltersEx.remarks" autocomplete="off"></el-input>\
                      </el-form-item>\
                  </gv-form>\
                  <div slot="footer" class="dialog-footer">\
                      <el-button class="gv-btn gv-btn-warning" @click="dialogFormVisible = false">{{ \'gBtnCancel\' | translate }}</el-button>\
                      <el-button class="gv-btn gv-btn-submit" type="primary" @click="onSubmit">{{ \'gSubmit\' | translate }}</el-button>\
                  </div>\
              </el-dialog>\
              <el-dialog custom-class="gv-dialog" :title="\'gBtnMaFi\' | translate" :visible.sync="dialogTableVisible">\
              <div class="gv-query-table" style="margin-top:15px;">\
                  <div class="query-content">\
                      <el-table :data="optionsFieldsEx">\
                          <el-table-column prop="label" :label="\'gName\' | translate" width="150"></el-table-column>\
                          <el-table-column prop="remarks" :label="\'gRemarks\' | translate" width="200"></el-table-column>\
                          <el-table-column prop="time" :label="\'gData\' | translate" show-overflow-tooltip>\
                            <template #default="{row}">{{row.time | time(\'md-MM-dd HH:mm:ss\')}}</template>\
                          </el-table-column>\
                          <el-table-column :label="\'gTitleOperation\' | translate">\
                          <template v-slot="scope">\
                              <el-button @click="onHandleDel(scope.row)" class="gv-btn-warning gv-btn-xs" type="primary">{{ \'gBtnDelete\' | translate }}</el-button>\
                          </template>\
                          </el-table-column>\
                      </el-table>\
                  </el-dialog>\
                  </div>\
              </div>\
          </div>',
    name: "GvTable",
    mixins: [tableMixins],
    props: {
      table: Object,
      beforeValidate: Function,
    },
    data: function data() {
      return {
        visible: false,
        headList: [],
        fromFilters: {},
        active: ["1"],
        list: [],
        listFields: [],
        ids: id,
        cacheFields: {},
        cacheFieldsEx: {},
        optionsFieldsEx: [],
        currentRow: null,
        multipleSelection: null,
        execl: {
          isShow: false,
          fileName: "tableExecl",
          exclude: null,
        },
        execlAll: false,
        api: "",
        vo: "",
        context: "",
        autoSearch: false,
        pageSizes: [10, 30, 50, 100],
        keySelect: false,
        disabledExcel: true,
        isIndeterminate: false,
        isDefalutAll: true,
        checkedOptions: [],
        filterEx: "",
        fromFiltersEx: {
          name: "",
          remarks: "",
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        isMore: false,
        isMoreBtn: false,
        singleElection: false,
        multipleElection: false,
        showSequenceNum: false,
        menutype: this.$store.state.homeType,
        mf: "top",
      };
    },
    watch: {
      list: function list(n, o) {
        if (n && n.length > 0) {
          this.disabledExcel = false;
        } else {
          this.disabledExcel = true;
        }
      },
      checkedOptions: function checkedOptions(n, o) {
        this.handleFiledShow();
      },
    },
    created: function created() {
      this.handleFields(this.table.fields);
      this.handleBasic(this.table.basic);
      this.fromFilters = Object.assign({}, this.table.search);
      this.autoSearch && this.onGetList();
      id++;
      this.initFilterEx();
    },
    mounted: function mounted() {},
    computed: {
      homeType: function homeType() {
        return this.$store.state.homeType;
      },
    },

    methods: {

      clearSelection() {
        this.$refs.list.clearSelection();
      },
      toggleAllSelection() {
        this.$refs.list.toggleAllSelection();
      },
      toggleRowSelection: function (row, selected) {
        this.$refs.list.toggleRowSelection(row, selected);
      },
      getColumnData() {
        return {
          listFields: this.listFields,
          cacheFields: this.cacheFields,
        };
      },
      getSearchVal(obj) {
        return this.fromFilters;
      },
      setSearchVal(obj) {
        this.fromFilters = Object.assign(this.fromFilters, obj);
      },
      setTableColumn(headList, constHeads) {
        this.handleFields(this.table.fields, headList, constHeads);
      },
      clearTableData() {
        this.list = [];
        this.mixinObject.searchSet.currentPage = 1;
        this.mixinObject.searchSet.total = 0;
        this.mixinObject.searchSet.pageSize = 10;
      },
      rowDblclick(row, column, event) {
        this.$emit("rowDblclick", {
          row,
          column,
          event,
        });
      },
      onGetList: function onGetList() {
        var _this2 = this;

        if (
          !this.beforeValidate ||
          (this.beforeValidate && this.beforeValidate(this.fromFilters))
        ) {
          this.searchList(
            this.api,
            this.context,
            this.fromFilters,
            this.vo,
            function (data, headList) {
              _this2.list = data;
              _this2.currentRow = null;
              _this2.multipleSelection = null;
            }
          );
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSelectionChange: function handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onExportExcel: function onExportExcel() {
        if (this.execl.validate && this.list.length == 0) {
          Vue.gvUtil.message("List data is not allowed to be empty");
          return;
        }
        Vue.gvUtil.exportExcel(
          this.$refs.list,
          this.ids,
          this.execl.fileName,
          null,
          this.execl.exclude
        );
      },
      onExportAllExcel: function onExportAllExcel(type) {
        // Vue.gvUtil.message('open');
        this.$emit("onExportAllExcel");
      },
      onHandleCheckAll: function onHandleCheckAll() {
        if (this.isDefalutAll) {
          this.checkedOptions = this.cacheAllChecked;
        } else {
          this.checkedOptions = [];
        }
        //this.handleFiledShow();
      },
      onHandleChecked: function onHandleChecked() {
        // console.log(this.checkedOptions, this.cacheAllChecked);
        if (this.checkedOptions.length != this.cacheAllChecked.length) {
          this.isDefalutAll = false;
        } else {
          this.isDefalutAll = true;
        }
        // this.handleFiledShow();
      },
      handleFiledShow: function handleFiledShow() {
        for (var key in this.cacheFields) {
          this.cacheFields[key].show = this.checkedOptions.indexOf(key) > -1;
        }
      },
      handleFields: function handleFields(list, headlist, constHeads) {
        var d = {};
        this.listFields = [];
        if (headlist) {
          for (var item of headlist) {
            let obj = constHeads.find((e) => e.dataEname == item.dataEname);
            let newObj = {
              prop: item.infoCode,
              labelKey: item.dataEname,
            };

            if (obj) {
              if (
                obj.config.type == "selectPo" ||
                obj.config.type == "ggcode" ||
                obj.config.type == "select"
              ) {
                newObj.format = obj.config;
              }
            }
            this.listFields.push(newObj);
          }
          list.forEach((e) => {
            if (
              e.prop == "operation" ||
              e.prop == "dataSources" ||
              e.prop == "versionNo" ||
              e.prop == "assetProposalStatus" ||
              e.prop == "dateList"
            ) {
              this.listFields.push(e);
            }
          });
        } else {
          Object.assign(this.listFields, list);
        }
        // console.log(this.listFields, list);
        //////debugger
        for (var key in this.listFields) {
          this.listFields[key].label = Vue.filter("translate")(
            this.listFields[key].labelKey
          );
          this.listFields[key].show = true;
          if (this.listFields[key].prop) {
            this.listFields[key].filterProp = this.listFields[key].prop;
          } else {
            this.listFields[key].filterProp = "filterProp" + key;
          }
          this.checkedOptions.push(this.listFields[key].filterProp);
          d[this.listFields[key].filterProp] = this.listFields[key];
        }
        this.cacheAllChecked = this.checkedOptions;
        //////debugger
        this.cacheFields = d;
      },
      handleBasic: function handleBasic(obj) {
        if (obj.execl) {
          Object.assign(this.execl, obj.execl);
        }
        if (obj.execlAll) {
          this.execlAll = obj.execlAll;
        }
        this.isMoreBtn = obj.isShowMore || false;
        this.api = obj.api;
        this.vo = obj.vo;
        this.context = obj.context;
        this.autoSearch = obj.autoSearch;
        this.pageSizes = obj.pageSizes;
        this.singleElection = obj.singleElection || false;
        this.multipleElection = obj.multipleElection || false;
        this.showSequenceNum = obj.showSequenceNum || false;
      },

      // 状态翻译
      formatStatus: function formatStatus(row, column, cellValue, index) {
        var str = "";
        if (
          this.cacheFields[column.property] &&
          this.cacheFields[column.property].format
        ) {
          switch (this.cacheFields[column.property].format.type) {
            case "num":
              str = Vue.filter("money")(cellValue, true, 2);
              break;
            case "date":
              str = Vue.filter("time")(
                cellValue,
                this.cacheFields[column.property].format.format
              );
              break;
            case "dateRange":
              if (cellValue && cellValue[0] && cellValue[1]) {
                str =
                  Vue.filter("time")(
                    cellValue[0],
                    this.cacheFields[column.property].format.format
                  ) +
                  " - " +
                  Vue.filter("time")(
                    cellValue[1],
                    this.cacheFields[column.property].format.format
                  );
              } else {
                str = "";
              }
              break;
            case "ggcode":
              str = Vue.gvUtil.translationData(
                this.cacheFields[column.property].format.codeType,
                cellValue
              );
              break;
            case "selectPo":
              str = Vue.gvUtil.translationPoData(
                this.cacheFields[column.property].format,
                cellValue
              );
              break;
            case "select":
              str = Vue.gvUtil.translationSelectData(
                this.cacheFields[column.property].format,
                cellValue
              );
              break;
            default:
              str = cellValue;
              break;
          }
        } else {
          str = cellValue;
        }
        return str;
      },
      onHandle: function onHandle(row, flag, index) {
        this.$emit("on-list-btn", row, flag, index);
      },
      onMore: function onMore() {
        this.isMore = !this.isMore;
      },
      onSubmit: function onSubmit() {
        if (this.fromFiltersEx.name == "") {
          this.$message({
            type: "success",
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          });
          return;
        }
        this.dialogFormVisible = false;
        var d = {},
          d1 = {},
          time = new Date().getTime(),
          key = "filter_" + time;
        Object.assign(d1, this.fromFilters);
        d1._filterName = this.fromFiltersEx.name;
        d1._time = time;
        d1._filterRemarks = this.fromFiltersEx.remarks;
        this.cacheFieldsEx[key] = d1;
        this.updateOptionsFieldsEx(this.cacheFieldsEx, true);
        this.$message({
          type: "success",
          message: Vue.gvUtil.getInzTranslate("gSaveSuccess"),
        });
        this.fromFiltersEx.name = "";
        this.fromFiltersEx.remarks = "";
      },
      initFilterEx: function initFilterEx() {
        var f = sessionStorage.getItem(Vue.gvUtil.getMd5(this.api));
        if (!f) return;
        this.cacheFieldsEx = JSON.parse(f);
        this.updateOptionsFieldsEx(this.cacheFieldsEx, false);
      },
      onHandleDel: function onHandleDel(row) {
        var _this = this;
        Vue.gvUtil
          .confirm({
            msg: Vue.gvUtil.getInzTranslate("gDeleteContent"),
          })
          .then(function () {
            if (row && _this.cacheFieldsEx[row.value]) {
              delete _this.cacheFieldsEx[row.value];
              if (_this.filterEx == row.value) {
                _this.filterEx = "";
              }
              _this.updateOptionsFieldsEx(_this.cacheFieldsEx, true);
              _this.$message({
                type: "success",
                message: Vue.gvUtil.getInzTranslate("gDeleteSuccess"),
              });
            }
          });
      },
      updateOptionsFieldsEx: function updateOptionsFieldsEx(obj, type) {
        this.optionsFieldsEx = [];
        // console.log(this.optionsFieldsEx);
        if (obj) {
          for (var key in obj) {
            var d = {
              value: key,
              label: obj[key]._filterName,
              remarks: obj[key]._filterRemarks,
              time: obj[key]._time,
              datas: JSON.stringify(obj[key]),
            };
            this.optionsFieldsEx.push(d);
          }
          // console.log(this.optionsFieldsEx);
          this.optionsFieldsEx.sort(Vue.gvUtil.compare("time", false));
          type &&
            sessionStorage.setItem(
              Vue.gvUtil.getMd5(this.api),
              JSON.stringify(obj)
            );
        }
      },
      getFilterEx: function getFilterEx() {
        if (this.cacheFieldsEx && this.cacheFieldsEx[this.filterEx]) {
          Object.assign(this.fromFilters, this.cacheFieldsEx[this.filterEx]);
        }
      },
      getSingleSelectData: function getSingleSelectData() {
        return this.currentRow;
      },
      getSelectData: function getSelectData() {
        return this.multipleSelection;
      },
    },
  };
});
/**
 * 文件资料列表组件
 * @author 计昕奇
 * @time 2020/7/01
 */
define(
  "src/components/data-table/upload-file.js",
  function (require, exports, module) {
    var id = 1;
    return {
      template: `<gv-panel class="filetable">
      <div class="card_header file_header">
      </div>
      <template>
        <div style="max-height:220px;padding: 0 20px;background-color: #fff;overflow: auto;padding-bottom: 10px">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" class="gvfiletable"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" class="fileselect" width="65">
            </el-table-column>
            <el-table-column type="index" width='65' :label="'gNo' | translate">
            </el-table-column>
            <el-table-column prop="category" :label="'classifies' | translate('Document classification')">     
            </el-table-column>
            <el-table-column prop="documentName" :label="'dataname' | translate" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="documentType" :label="'filetype' | translate" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="uploadTime" :label="'submittime' | translate" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitterName" :label="'submitname' | translate"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" :label="'fileremark' | translate">
              <template #default='{row}'>
                <el-input v-if="!readonly" class="gv-input"  v-model="row.remark"  placeholder="请输入内容" ></el-input>
                <span v-else>{{row.remark}}</span>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column :label="'gTitleOperation' | translate('Operation')" width="120px">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center">
                    <el-button class="gv-btn-primary" @click="dialogFormVisible = true" type="primary" size="mini" @click='downFile(scope.row)'
                      icon='el-icon-download'>
                    </el-button>
                    <el-button class="gv-btn-warning" v-if='!readonly' size="mini" style="margin-left: 10px;" icon='el-icon-minus' @click='deleteFile("0",scope.row)'>
                    </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <div v-if='!readonly' style="display:flex;">
              <el-upload class="upload-demo uploadFile" style="margin-right: 10px;"
                action="#"
                :show-file-list='false'
                :http-request='upFile'>
                <el-button class="ia_im_filebutton gv-btn-primary" size="mini" type="primary" icon="el-icon-plus">
                </el-button>
              </el-upload>
              <el-button class="gv-btn-warning" size="mini" style="margin-top: 10px;margin-bottom: 10px;" icon='el-icon-minus' @click='deleteFile("1")'>
              </el-button>
            </div>
          </el-row>
    
        </div>
    
      </template>
    </gv-panel>`,
      name: "upFileApp",
      data: function () {
        // 双向绑定状态数据
        return {
          multipleSelection: [], //已选中的行
          tableData: [], // 列表主数据
        };
      },
      props: {
        vo: {
          // 主数据
          type: Array,
          default: () => [],
        },
        type: {
          // 文件分类
          type: String,
          required: true,
        },
        readonly: {
          // 是否只读
          type: Boolean,
          default: false,
        },
        schemeNo: {
          type: String,
        },
      },

      methods: {
        // 获取主数据
        getData() {
          return this.tableData;
        },
        // 全选
        handleSelectionChange(val) {
          this.multipleSelection = val;
          // console.log(this.multipleSelection);
        },
        // 上传文件
        async upFile(file) {
          // console.log(file, encodeURIComponent(file.file.name));
          var formData = new FormData();
          formData.append("serverId", "2"); //自保修改 2 代表自保系统  1 代表前端系统
          formData.append("userCode", this.$store.state.userInfo.userCode);
          formData.append(
            "file",
            file.file,
            encodeURIComponent(file.file.name)
          );
          var url = Vue.gvUtil.getUrl({
            apiName: "fileUpload",
            contextName: "file",
          });
          var docUrl = Vue.gvUtil.getUrl({
            apiName: "docSave",
            contextName: "selfins", //自保修改 selfins
          });
          try {
            let res = await Vue.gvUtil.http.post(url, formData);

            let data = res.resData;
            // data.category = this.type; //注释掉 自保修改
            data.uploadDate = Vue.filter("time")(
              data.uploadDate,
              "yyyy-MM-dd HH:mm:ss"
            );
            if (this.schemeNo) {
              data.businessNo = this.schemeNo;
            }
            let response = await Vue.gvUtil.http.post(docUrl, data);
            this.tableData.push(response.resData.document);
            //   ////debugger;
            this.$emit("uploadFinish", this.tableData);
          } catch (err) {
            console.log(err);
            this.$message.error("上传失败！");
          }

          // {
          //   id: 20,
          //   fileName: "test2.xlsx",
          //   fileType: "xlsx",
          //   fileSize: 1041456,
          //   uploadDate: Vue.filter('time')("2020-08-03T09:05:16.524+0000", "yyyy-MM-dd HH:mm:ss"),
          //   uploadCode: "admin",
          //   hash: "5f27d34cb678215554170f63",
          //   organization: null,
          //   labelName: null,
          //   serverId: 1,
          //   labelIds: null,
          //   category: this.type
          // }
        },
        // 删除文件
        async deleteFile(type, row) {
          var list = [];
          if (type == "0") {
            list.push(row.fileId);
          } else {
            this.multipleSelection.map((e) => {
              list.push(e.fileId);
            });
          }
          var url = Vue.gvUtil.getUrl({
            apiName: "fileDelete",
            contextName: "file",
          });
          var docUrl = Vue.gvUtil.getUrl({
            apiName: "docRemove",
            contextName: "selfins", //自保修改  selfins
          });

          let res = await Vue.gvUtil.http.post(url, list);
          let response = await Vue.gvUtil.http.post(docUrl, list);
          if (res.resCode == "0000" && response.resCode == "0000") {
            this.$message.success("删除成功！");
            list.forEach((item) => {
              this.tableData = this.tableData.filter((e) => {
                // console.log(e.fileId);
                return e.fileId != item;
              });
            });
          } else {
            this.$message.success("删除失败！");
          }
        },
        // 下载文件
        downFile(row) {
          var url = Vue.gvUtil.getUrl({
            apiName: "fileDown",
            contextName: "file",
            urlParams: {
              fileId: row.fileId,
            },
          });
          var eleLink = document.createElement("a");
          // eleLink.download = encodeURIComponent(row.documentName);
          eleLink.download = row.documentName;
          eleLink.style.display = "none";
          // 字符内容转变成blob地址
          // var blob = new Blob([res]);
          eleLink.href =
            (this.$store.state.config.path ?
              this.$store.state.config.path :
              "") + url;
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);

          // var url = Vue.gvUtil.getUrl({
          //   apiName: 'fileDown',
          //   contextName: 'file',
          //   urlParams: {
          //     fileId: '7'
          //   }
          // })
          // Vue.gvUtil.http.get(url).then(res => {
          //   console.log(res)
          //   var eleLink = document.createElement("a");
          //   eleLink.download = 'test';
          //   eleLink.style.display = "none";
          //   // 字符内容转变成blob地址
          //   var blob = new Blob([res.resData]);
          //   eleLink.href = URL.createObjectURL(blob);
          //   // 触发点击
          //   document.body.appendChild(eleLink);
          //   eleLink.click();
          //   // 然后移除
          //   document.body.removeChild(eleLink);
          // })
        },
      },
      created() {
        Vue.gvUtil.initTranslation("DocumentClassification");
        this.tableData = this.vo;
      },
      computed: {},
      watch: {
        vo: {
          handler(val) {
            this.tableData = val;
          },
          deep: true,
        },
        tableData: {
          handler(val) {
            this.$emit("update:vo", val);
          },
          deep: true,
        },
      },
    };
  }
);
/**
 * 审核情况组件
 * @author 计昕奇
 * @time 2020/7/01
 */
define(
  "src/components/audit-info/audit-info.js",
  function (require, exports, module) {
    var id = 1;
    return {
      template: `<section>
      <div style='padding: 20px;'>
        <div class='flexCenter'>
          <label style="margin-left: 20px;"><span v-if='required' style="color: #ff4949">*</span> {{label}}：</label>
          <slot></slot>
        </div>
        <el-row>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item prop="audit" class="auditFormItem" style="width: 100%;">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.audit" class="textareaSummary"
                maxlength="200" show-word-limit>
              </el-input>
            </el-form-item>
          </el-form>
    
        </el-row>
      </div>
    </section>`,
      name: "auditInfoApp",
      props: {
        vo: {
          type: String,
        },
        label: {
          type: String,
          default: "审核情况",
        },
        required: {
          type: Boolean,
          default: false,
        },
      },
      data: function () {
        // 双向绑定页面显示数据
        return {
          ruleForm: {
            audit: "",
          },
          rules: {
            audit: [{
              required: true,
              message: "必填字段",
              trigger: "blur",
            }, ],
          },
        };
      },

      methods: {
        validForm() {
          var flag = false;
          this.$refs.ruleForm.validate((isOk) => {
            flag = isOk;
          });
          return flag;
        },
      },
      computed: {},
      created() {},
      watch: {
        vo: {
          handler(val) {
            this.ruleForm.audit = val;
          },
          deep: true,
        },
        "ruleForm.audit"(val) {
          this.$emit("update:vo", val);
        },
      },
    };
  }
);
/**
 * home
 * @author 陈柱良
 * @time 2017/11/01
 */
define(
  "src/components/span/span-tooltip.js",
  function (require, exports, module) {
    var id = 1;
    return {
      render: function (createElement) {
        return createElement(
          "el-tooltip", // 标签名称
          {
            props: {
              effect: "dark",
              content: this.content,
              placement: "top",
            },
          },
          [
            createElement(
              "span", // 标签名称
              {
                class: "textHidden",
              },
              this.content
            ),
          ]
        );
      },
      name: "spanTooltipApp",
      data: function () {
        // 双向绑定状态数据
        return {};
      },
      props: {
        content: "",
      },
      methods: {},
      created() {},
      computed: {},
      watch: {},
    };
  }
);
/**
 * home
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/homeApp/index.js", [
  "src/layout/homeApp/components/homeLeft/index.js",
  "src/layout/homeApp/components/homeTop2/index.js",
  "src/layout/layoutService.js",
], function (require, exports, module) {
  // 引用html文件
  var HomeLeft = require("src/layout/homeApp/components/homeLeft/index.js"),
    HomeTop = require("src/layout/homeApp/components/homeTop2/index.js"),
    layoutService = require("src/layout/layoutService.js"),
    temp =
    '<div>\
                    <home-top v-if="homeType == \'top\'" :menus="menus"></home-top>\
                    <home-left v-if="homeType == \'left\'"  :menus="menus"></home-left>\
                    <transition name="fade">\
                        <el-dialog custom-class="gv-dialog" class="gv-dialog-smll" :title="dialogLoading.status" :close-on-click-modal="false" :showClose="false" :visible.sync="dialogLoading.showLoading">\
                            <h4 style="margin-top: 5px; margin-bottom: 5px;">{{dialogLoading.statusText}}<a href="javascript:;" style="margin-left: 10px;" @click=onClickMore>More</a></h4>\
                            <span v-if="msgVisable" class="dialog-msg">{{dialogLoading.msg}}</span>\
                            <span slot="footer" class="dialog-footer">\
                                    <el-button class="gv-btn gv-btn-primary" type="primary" @click="handleSure">{{"gBtnConfirm"| translate("Confirm")}}</el-button>\
                                </span>\
                        </el-dialog>\
                    </transition>\
                    <transition name="fade">\
                        <el-dialog :title="\'g401\' | translate(\'Token expired, please log in\')" class="gv-dialog-smll" :visible.sync="dialogLogin.showLoading" custom-class="gv-dialog" :close-on-click-modal="false" :showClose="false" :before-close="onCloseDialog">\
                           <gv-form ref="form" :model="form" :rules="rules" :inline="false">\
                            <el-form-item prop="account">\
                                <el-input  :placeholder="\'gAccounts\' | translate(\'Accounts\')" v-model="form.account"></el-input>\
                            </el-form-item>\
                            <el-form-item prop="checkPass">\
                                <el-input type="password" :placeholder="\'gPassword\' | translate(\'Password\')" v-model="form.checkPass"></el-input>\
                            </el-form-item>\
                            <el-form-item align="center">\
                                <el-button class="gv-btn gv-btn-primary" type="primary" @click="handleSubmit">{{ \'gBtnLogin\' | translate(\'Sign in\')}}</el-button>\
                                <el-button class="gv-btn gv-btn-warning" @click="onCloseDialog(0)">{{ \'gBtnClose\' | translate(\'Close\')}}</el-button>\
                            </el-form-item>\
                            </gv-form>\
                        </el-dialog>\
                    </transition>\
                </div>';
  return {
    template: temp,
    data: function data() {
      return {
        menus: [],
        collapsed: false,
        sysUserName: "",
        form: {
          account: "",
          checkPass: "",
        },
        rules: {
          account: [{
            required: true,
            message: "请输入账号",
            trigger: "change",
          }, ],
          checkPass: [{
            required: true,
            message: "请输入密码",
            trigger: "change",
          }, ],
        },
        msgVisable: false,
      };
    },
    created: async function created() {
      this.initMenu();
      this.initPage();
      await this.initUser();
      this.initPublicCock();
      this.initExch();
    },
    computed: {
      homeType: function homeType() {
        return this.$store.state.homeType;
      },
      dialogLoading: function dialogLoading() {
        return this.$store.state.dialog;
      },
      dialogLogin: function dialogLogin() {
        return this.$store.state.dialogLogin;
      },
    },
    methods: {
      initPage: function initPage() {},
      initMenu: function initMenu() {
        // if (window.gtyh)
        //     return;
        // window.gtyh = true;
        // var navMenus = [''],
        var navMenus = [],
          c = localStorage.getItem("_i18") || "en",
          _this = this,
          paths = [];

        if (layoutService.getMenuFlag()) {
          this.menus = layoutService.getMenusData();
          _this.jump();
        } else {
          layoutService
            .getAllSystemMenuApi({
              selfins: "Inssys-self", //自保系统  自保修改
              platform: "platform", //前端系统
            })
            .then(
              function (res) {
                if (res.resCode === "0000") {
                  var m = res.resData.navMenusData; // JSON.parse(res.resData.navMenusData).navMenus;
                  // console.log(m)
                  if (m && m.children && m.children.length > 0) {
                    navMenus = navMenus.concat(m.children);
                  }
                  // layoutService.setMenusData(navMenus);
                  layoutService.setMenuFlag(true);
                  var authMenus = {};
                  layoutService.fooMenus(navMenus, authMenus, c, paths);
                  paths.push("_/claim/scanned_doc/scanned_doc_app");
                  paths.push("_/claim/registration/registration_app");
                  paths.push("_/claim/print_documents/rprint_documents_app");
                  paths.push("_/claim/notes_list/notes_list_app");
                  paths.push("_/underwriting/print/policy_selection_app");
                  paths.push("_/underwriting/upload/view_documentation_app");
                  paths.push("_/product/proxy_app");
                  // Todo 有的角色有菜单有的角色没有，先屏蔽
                  if (
                    paths.indexOf(
                      "_/underwriting/quotation/quotation_new_app"
                    ) <= -1
                  ) {
                    paths.push("_/underwriting/quotation/quotation_new_app");
                  }
                  ///sales/party/party_new_app 新增干系人
                  ///sales/party/party_inquiry_app 干系人查询
                  ///sales/account/account_inquiry_app 协议查询
                  ///sales/account/account_new_app 新增协议
                  if (paths.indexOf("_/sales/party/party_new_app") <= -1) {
                    paths.push("_/sales/party/party_new_app");
                  }
                  if (paths.indexOf("_/sales/party/party_inquiry_app") <= -1) {
                    paths.push("_/sales/party/party_inquiry_app");
                  }
                  if (
                    paths.indexOf("_/sales/account/account_inquiry_app") <= -1
                  ) {
                    paths.push("_/sales/account/account_inquiry_app");
                  }
                  if (paths.indexOf("_/sales/account/account_new_app") <= -1) {
                    paths.push("_/sales/account/account_new_app");
                  }
                  ///underwriting/subject/vessel/vessel_new_app 新增船卡
                  ///underwriting/subject/vessel/vessel_inquiry_app 查询船卡
                  ///underwriting/subject/voyage/voyage_inquiry_app 查詢航程
                  ///underwriting/subject/voyage/voyage_new_app 新增航程
                  if (
                    paths.indexOf(
                      "_/underwriting/subject/vessel/vessel_new_app"
                    ) <= -1
                  ) {
                    paths.push("_/underwriting/subject/vessel/vessel_new_app");
                  }
                  if (
                    paths.indexOf(
                      "_/underwriting/subject/vessel/vessel_inquiry_app"
                    ) <= -1
                  ) {
                    paths.push(
                      "_/underwriting/subject/vessel/vessel_inquiry_app"
                    );
                  }
                  if (
                    paths.indexOf(
                      "_/underwriting/subject/voyage/voyage_inquiry_app"
                    ) <= -1
                  ) {
                    paths.push(
                      "_/underwriting/subject/voyage/voyage_inquiry_app"
                    );
                  }
                  if (
                    paths.indexOf(
                      "_/underwriting/subject/voyage/voyage_new_app"
                    ) <= -1
                  ) {
                    paths.push("_/underwriting/subject/voyage/voyage_new_app");
                  }
                  Vue.gvUtil.registerRoutesForMenus(paths);
                  layoutService.setMenusData(navMenus);
                  layoutService.updateBtnAuthCache();
                  _this.menus = navMenus;
                  layoutService.setMenus(
                    Object.assign(layoutService.getMenus(), authMenus)
                  );
                  _this.jump();
                }
              },
              function (err) {
                console.log("err", err);
                layoutService.setMenuFlag(false);
                var time = setTimeout(function () {
                  _this.$store.commit("COMMIT_DIALOG", {
                    showLoading: false,
                  });
                  _this.onCloseDialog(0);
                  clearTimeout(time);
                }, 5000);
                Vue.gvUtil
                  .alert({
                    msg: "The menu request failed, after 5 seconds to jump on the login page, please log in again",
                    confirmButtonText: "Jump Logon",
                  })
                  .then(
                    function () {
                      _this.$store.commit("COMMIT_DIALOG", {
                        showLoading: false,
                      });
                      _this.onCloseDialog(0);
                      clearTimeout(time);
                      // time = null;
                    },
                    function () {
                      _this.$store.commit("COMMIT_DIALOG", {
                        showLoading: false,
                      });
                      _this.onCloseDialog(0);
                      clearTimeout(time);
                      // time = null;
                    }
                  );
              }
            );
        }
      },
      initPublicCock() {
        layoutService.getpublicClock().then((res) => {
          // console.log("基础码表", res);
          this.$store.commit("PUBLIC_CLOCK", res.resData);
        });
      },
      async initUser() {
        let res = await layoutService.getUserInfo();
        if (res.resCode == "0000") {
          this.$store.commit("USER_INFO", res.resData.userInfo);
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify(res.resData.userInfo)
          );
        } else {
          this.$message.error("获取用户信息失败！");
        }
      },
      // 获取兑换率
      async initExch() {
        this.exchList = await Vue.gvUtil.getAllExchCny();
        this.$store.commit("EXCH_CNY", this.exchList);
      },
      jump: function jump() {
        this.$store.commit("CHANGE_HOME", {
          type: localStorage.getItem("_layoutType") || "top",
        });
        var menuValue = sessionStorage.getItem("menuValue"),
          token = Vue.gvUtil.getCookie("TPTOKEN");
        if (token) {
          Vue.gvUtil.setTpToken(token.substring(7));
        }
        if (
          layoutService.getLogingFlag() &&
          Vue.gvUtil.getMenusForKey("/index/workbench_app")
        ) {
          layoutService.setLogingFlag(false);
          // setTimeout(function() {
          // Vue.gvUtil.registerConfig('_/index/workbench_app', true, function() {
          sessionStorage.setItem(
            "headerTitleTop",
            layoutService.getMenusNameForKey("/index/workbench_app")
          );
          Vue.gvUtil.redirectTo({
            name: "workbenchApp",
          });
          // });
          // Vue.gvUtil.redirectTo({ path: '/index/workbench_app' })
          // }, 500);
        } else if (menuValue && menuValue !== "") {
          var menuValueSearch = Vue.gvUtil.getSearchJson(
              sessionStorage.getItem("menuValueSearch")
            ),
            r = {
              path: menuValue,
            };

          if (menuValueSearch) {
            r["query"] = menuValueSearch;
          }
          sessionStorage.removeItem("menuValue");
          sessionStorage.removeItem("menuValueSearch");
          // Vue.gvUtil.registerConfig('_' + menuValue, true, function() {
          Vue.gvUtil.redirectTo(r, true);
          // });
        }
      },
      handleSure: function handleSure() {
        this.$store.commit("COMMIT_DIALOG", {
          msg: "",
          status: "",
          statusText: "",
          showLoading: false,
        });
        this.msgVisable = false;
      },
      handleSubmit: function handleSubmit() {
        var _this = this;
        this.$refs.form.validate(function (valid) {
          if (valid) {
            var loginParams = {
                userCode: _this.form.account,
                password: _this.form.checkPass,
              },
              msg = "";
            layoutService.requestLogin(loginParams).then(
              function (d) {
                if (d.resCode === "0000") {
                  var user = JSON.stringify(d.resData);
                  sessionStorage.setItem("user", user);
                  layoutService.setLogingFlag(true);
                  _this.onCloseDialog(1);
                  if (
                    sessionStorage.getItem("name") !== d.resData.userCode ||
                    !layoutService.getMenuFlag()
                  ) {
                    sessionStorage.setItem("name", d.resData.userCode);
                    window.location.reload();
                    return;
                  }
                  sessionStorage.setItem("name", d.resData.userCode);
                  // if (!layoutService.getMenuFlag()) {
                  //     _this.initMenu();
                  // }
                  //资源超时，需要刷新
                  if (_this.$store.state.dialogLogin.isReload) {
                    window.location.reload();
                    return;
                  }
                  _this.form.checkPass = "";
                } else if (d.resCode === "0006") {
                  if (d.resMsg === "locked") {
                    msg =
                      "This account is locked, please contact the administrator";
                  } else if (d.resMsg === "wrong account/password") {
                    msg =
                      "The account or password is incorrect, and if enter wrong password more than " +
                      d.resData.failedTimes +
                      " times, this account will be locked";
                  } else if (d.resMsg === "expired password") {
                    msg =
                      "The password is expired, please contact the administrator!";
                  }
                  d.traceID && (msg += "；TraceID = " + d.traceID);
                  Vue.gvUtil.message(msg);
                }
              },
              function (e) {
                msg =
                  "Please try again later.[" + e.response.data.resCode + "]";
                e.response.data.traceID &&
                  (msg += "；TraceID = " + e.response.data.traceID);
                Vue.gvUtil.message(msg);
              }
            );
          }
        });
      },
      onCloseDialog: function onCloseDialog(flag) {
        this.$store.commit("COMMIT_DIALOG_LOGIN", {
          showLoading: false,
        });
        if (flag !== 1) {
          Vue.gvUtil.destroyApp(true);
        }
      },
      onClickMore: function onClickMore() {
        this.msgVisable = !this.msgVisable;
      },
    },
    components: {
      HomeLeft: HomeLeft,
      HomeTop: HomeTop,
    },
  };
});
/**
 * login
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/loginApp/index.js", [
  "src/layout/layoutService.js",
], function (require, exports, module) {
  // <el-form-item v-if="islanguage" prop="language" label="" label-position="top">\
  //           <el-select v-model="form.language" @change="setI18n" class="login-select">\
  //               <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>\
  //           </el-select>\
  //       </el-form-item>\
  // 标题
  // <p class="titleTip" v-else style="color:transparent;">{{ "gELogin" | translate()}}</p>
  var layoutService = require("src/layout/layoutService.js"),
    temp = `<div class="login-form-wrapper">
        <el-image style="width: 200px; height: 62.61px;position: fixed; top: 26px;left: 39px" src="./dist/img/loginLogo.png" fit="fit"></el-image>
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm login-container" :class="islanguage?'login-container-ex':''">
       <h3 class="title title_sys" :class="this.language?'enTitle':''">{{ "gLogin" | translate()}}</h3>
       <p class="titleTip" v-if="!this.isLanguage">{{ "gELogin" | translate()}}</p>
       <p class="titleTip" v-else style="color:transparent;">{{ "gELogin" | translate()}}</p>
        <el-form-item class="loginAccount" prop="account" label="" label-position="left">
            <el-input type="text" :autofocus="true" id="account" v-model="form.account" auto-complete="off" @keyup.enter.native="next('checkPass')" :placeholder="'gUser' | translate('Your Account')"></el-input>
        </el-form-item>
        <span style="color: red;" v-if="isLock">{{errorMessage}}</span>
        <el-form-item class="loginPwd" prop="checkPass" label="" label-position="left">
            <el-input type="password" v-model="form.checkPass" id="checkPass" auto-complete="off" @keyup.enter.native="next('code')" :placeholder="'gPassWord' | translate('Password')"></el-input>
        </el-form-item>
        <span style="color: red;" v-if="isWrong">{{errorMessage}}</span>

        <el-form-item prop="code" label="" label-position="left">
          <el-row>
            <el-col :span="13" style="margin-right: 15px">
            <el-input
            id="code"
            class="loginInputwidth"
            v-model="form.code"
            auto-complete="off"
            :placeholder="'gGetCode' | translate('code')"
            @keyup.enter.native="next('submitLogin')"
          >
          </el-input>
            </el-col>
            <el-col :span="8">
              <el-button class="gv-btn-primary PhoneCode" v-if="!isLoginCode" style="width: 100px!important" type="primary" @click=GetPhoneCode>{{'ggetPhoneCode' | translate}}</el-button>
              <el-button class="gv-btn-primary PhoneCode" v-if="isLoginCode" :disabled="true" style="width: 100px!important;background-color:#C0C0C0!important" type="info">{{secondCount}}{{"sencondC"| translate("seconds")}}</el-button>
            </el-col>
            
          </el-row>
           
        </el-form-item>

        <el-form-item v-if="islanguage" prop="language" label="" label-position="top" style="margin-top: -25px">
          <el-row  style="float:right;margin-right: 40px">
          <span :class="language? 'font200':'font700'" style="cursor: pointer;" @click="setI18n('zh')">{{options[1].label}}</span>
          <el-divider direction="vertical"></el-divider>
          <span :class="language? 'font700':'font200'" style="cursor: pointer;" @click="setI18n('en')">{{options[0].label}}</span>
        </el-row>
        </el-form-item>
        <el-form-item style="margin-top: -25px">
            <el-button class="gv-btn-primary" type="primary" :loading="repeatLock" style="width:45%;" id="submitLogin" @submit.native="handleSubmit" @click.native.prevent="submit">{{ 'gBtnLogin' | translate('Sign in')}}</el-button>        </el-form-item>
        <transition name="fade">
            <el-dialog :title="dialogLoading.status" :showClose="false" :closeOnClickModal="false" :visible.sync="dialogLoading.showLoading" class="dialog-small">
                <h4 style="margin-top: 5px; margin-bottom: 5px;">{{dialogLoading.statusText}}</h4>
                <span>{{dialogLoading.msg}}</span>
                <span slot="footer" class="dialog-footer">
                        <el-button class="gv-btn-primary" type="primary" @click="handleSure">{{"gBtnConfirm"| translate("Confirm")}}</el-button>
                    </span>
            </el-dialog>
        </transition>
    </el-form>
</div>`;
  return {
    template: temp,
    data: function data() {
      return {
        maxlength: 30,
        version: "",
        secondCount: 0,
        logining: false,
        repeatLock: false,
        isLoginCode: false,
        form: {
          language: "",
          account: "",
          checkPass: "",
          code: "",
        },
        rules: {
          account: [{
            required: true,
            message: Vue.gvUtil.getInzTranslate("c0004"),
            trigger: "change",
          }, ],
          checkPass: [{
            required: true,
            message: Vue.gvUtil.getInzTranslate("c0005"),
            trigger: "blur",
          }, ],
        },
        options: [{
            value: "en",
            label: Vue.gvUtil.getInzTranslate("gTitleEn"),
          },
          {
            value: "zh",
            label: Vue.gvUtil.getInzTranslate("gTitleZh"),
          },
        ],
        isWrong: false,
        isLock: false,
        errorMessage: "",
        msgVisable: false,
        islanguage: false,
        language: false,
      };
    },
    computed: {
      dialogLoading: function dialogLoading() {
        return this.$store.state.dialog;
      },
      isLanguage: function language() {
        return (this.language = _gc == "en" ? true : false);
      },
    },
    created: function created() {
      if (opener) {
        opener = null;
      }
      this.$store.commit("MENU_SHOW", true);
      if (!localStorage.getItem("_i18") && _gc);
      localStorage.setItem("_i18", _gc);
      this.form.language = _gc;
      this.language = _gc == "en" ? true : false;
      var config = Vue.gvUtil.getConfig();
      this.islanguage = config.islanguage;
      this.maxlength = config.maxlength;
      this.version = config.version;
    },
    methods: {
      secondsCount() {
        this.secondCount = 300;
        var s = setInterval(() => {
          this.secondCount--;
          if (this.secondCount == 0) {
            this.isLoginCode = false;
            clearInteval(s);
          }
        }, 1000);
      },
      GetPhoneCode() {
        // var _this = this,
        //   url = Vue.gvUtil.getUrl({
        //     apiName: "getLoginCode",
        //     contextName: "auth",
        //   });
        // Vue.gvUtil.http
        //   .post(url, {
        //     userCode: this.form.account,
        //   })
        //   .then(function (res) {
        //     // ////debugger;
        //     if (res.resCode === "0000") {
        //       if (res.resData.code && res.resData.code == "00") {
        //         _this.$message.success(res.resData.msg);
        //         _this.isLoginCode = true;
        //         _this.secondsCount();
        //       } else {
        //         _this.$message.info(res.resData.msg);
        //       }
        //     } else {
        //       _this.$message.error("内部错误，请稍后再试");
        //     }
        //   });
        this.$message.error("该功能暂未开通，输入账号密码可直接登陆");
      },
      handleSubmit: function handleSubmit(ev) {
        if (ev.keyCode === 13) {
          this.submit();
        }
      },
      setI18n: function setI18n(val) {
        this.form.language = val;
        this.language = val == "en" ? true : false;
        var c = localStorage.getItem("_i18") == "en" ? "en" : "zh";
        if (this.form.language !== c) {
          localStorage.setItem("_i18", this.form.language);
          window.location.reload();
        }
      },
      next: function next(ids) {
        document.querySelector("#" + ids).focus();
        if (ids == "submitLogin") {
          this.submit();
        }
      },
      login() {
        var _this = this;
        var loginParams = {
            userCode: _this.form.account,
            password: _this.form.checkPass,
            code: _this.form.code,
            _source: "1",
          },
          msg = "";
        layoutService.requestLogin(loginParams).then(
          function (d) {
            if (d.resCode === "0000") {
              sessionStorage.setItem("name", d.resData.userCode);
              var user = JSON.stringify(d.resData);
              sessionStorage.setItem("user", user);
              layoutService.setLogingFlag(true);

              // layoutService.refresh();
              // 登录成功默认不展示左侧菜单
              localStorage.setItem("_layoutType", "top");
              Vue.gvUtil.redirectTo({
                path: "/home",
              });
              layoutService.getUserInfo().then((res) => {
                _this.$store.commit("USER_INFO", res.resData.userInfo);
                sessionStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.resData.userInfo)
                );
              });
              // var token = Vue.gvUtil.getCookie('TPTOKEN');
              // if(token) {
              //     Vue.gvUtil.setTpToken(token.substring(7));
              // }
              // _this.$router.push({
              //     path: '/home'
              // });
            } else if (d.resCode === "0006") {
              if (d.resMsg === "locked") {
                _this.isLock = true;
                _this.isWrong = false;
                // msg = 'This account is locked, please contact the administrator';
                msg = Vue.gvUtil.getInzTranslate("c0000");
              } else if (d.resMsg === "wrong account/password") {
                _this.isLock = true;
                _this.isWrong = false;
                msg =
                  Vue.gvUtil.getInzTranslate("c0002") +
                  d.resData.failedTimes +
                  Vue.gvUtil.getInzTranslate("c0003");
              } else if (d.resMsg === "expired password") {
                _this.isLock = true;
                _this.isWrong = false;
                msg = Vue.gvUtil.getInzTranslate("c0001");
                // msg = 'The password is expired, please contact the administrator!';
              }
              d.traceID && (msg += "；TraceID = " + d.traceID);
              _this.errorMessage = msg;
              _this.unlockRepeatLock();
            }
          },
          function (e) {
            //console.log(e.response.data.resData);
            _this.isLock = false;
            _this.isWrong = true;
            msg = "Please try again later.[" + e.response.data.resCode + "]";
            e.response.data.traceID &&
              (msg += "；TraceID = " + e.response.data.traceID);
            _this.errorMessage = msg;
            _this.unlockRepeatLock();
          }
        );
        _this.unlockRepeatLock(2000);
      },
      submit: function submit() {
        var _this = this;
        if (this.repeatLock) return;
        this.repeatLock = true;
        if (this.form.code != "") {
          this.login();
        } else {
          this.$refs.form.validate(function (valid) {
            if (valid) {
              var loginParams = {
                  userCode: _this.form.account,
                  password: _this.form.checkPass,
                  _source: "1",
                },
                msg = "";
              layoutService.requestLogin(loginParams).then(
                function (d) {
                  if (d.resCode === "0000") {
                    sessionStorage.setItem("name", d.resData.userCode);
                    var user = JSON.stringify(d.resData);
                    sessionStorage.setItem("user", user);
                    layoutService.setLogingFlag(true);

                    // layoutService.refresh();
                    // 登录成功默认不展示左侧菜单
                    localStorage.setItem("_layoutType", "top");
                    Vue.gvUtil.redirectTo({
                      path: "/home",
                    });
                    layoutService.getUserInfo().then((res) => {
                      _this.$store.commit("USER_INFO", res.resData.userInfo);
                      sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.resData.userInfo)
                      );
                    });
                    // var token = Vue.gvUtil.getCookie('TPTOKEN');
                    // if(token) {
                    //     Vue.gvUtil.setTpToken(token.substring(7));
                    // }
                    // _this.$router.push({
                    //     path: '/home'
                    // });
                  } else if (d.resCode === "0006") {
                    if (d.resMsg === "locked") {
                      _this.isLock = true;
                      _this.isWrong = false;
                      // msg = 'This account is locked, please contact the administrator';
                      msg = Vue.gvUtil.getInzTranslate("c0000");
                    } else if (d.resMsg === "wrong account/password") {
                      _this.isLock = true;
                      _this.isWrong = false;
                      // msg = 'The account or password is incorrect, and if enter wrong password more than ' + d.resData.failedTimes + ' times, this account will be locked';
                      msg =
                        Vue.gvUtil.getInzTranslate("c0002") +
                        d.resData.failedTimes +
                        Vue.gvUtil.getInzTranslate("c0003");
                    } else if (d.resMsg === "expired password") {
                      _this.isLock = true;
                      _this.isWrong = false;
                      // msg = 'The password is expired, please contact the administrator!';
                      msg = Vue.gvUtil.getInzTranslate("c0001");
                    }
                    d.traceID && (msg += "；TraceID = " + d.traceID);
                    _this.errorMessage = msg;
                    _this.unlockRepeatLock();
                  }
                },
                function (e) {
                  //console.log(e.response.data.resData);
                  _this.isLock = false;
                  _this.isWrong = true;
                  msg =
                    "Please try again later.[" + e.response.data.resCode + "]";
                  e.response.data.traceID &&
                    (msg += "；TraceID = " + e.response.data.traceID);
                  _this.errorMessage = msg;
                  _this.unlockRepeatLock();
                }
              );
              _this.unlockRepeatLock(2000);
            } else {
              return false;
            }
          });
        }
      },
      unlockRepeatLock: function unlockRepeatLock(time) {
        var _this = this;
        if (this.repeatLock) {
          setTimeout(function () {
            _this.repeatLock = false;
          }, time || 1000);
        }
      },
      handleSure: function handleSure() {
        this.$store.commit("COMMIT_DIALOG", {
          msg: "",
          status: "",
          statusText: "",
          showLoading: false,
        });
        this.msgVisable = false;
      },
      onClickMore: function onClickMore() {
        this.msgVisable = !this.msgVisable;
      },
    },
  };
});
/**
 * note
 * @author 陈柱良
 * @time 2018/04/19
 */
define("src/layout/homeApp/note.js", [], function (require, exports, module) {
  var temp =
    '<div class="note">\
                    <div class="note-msg__icon-area"><img src="./dist/img/success-tip.png"></img></div>\
                    <div class="note-msg__text-area">\
                        <h2 class="note-msg__title">{{title}}</h2>\
                        <p class="note-msg__desc">{{desc}}</p>\
                        <div style="margin-top:10px">\
                        <el-button class="gv-btn-primary" size="mini" v-show="isBtn" type="primary" @click="go()">{{btnName}}</el-button>\
                        </div>\
                    </div>\
                </div>';
  return Vue.gvUtil.Page({
    template: temp,
    name: "homeAppNote",
    shareStore: function shareStore() {
      return {
        test: null,
      };
    },
    datas: function datas() {
      return {
        title: "Successful Operation",
        desc: "",
        isBtn: false,
        btnName: "",
      };
    },
    created: function created() {
      this.initPage();
    },
    methods: {
      initPage: function initPage() {
        if (this.shareStore) {
          this.desc = this.shareStore.desc;
          this.title = (this.shareStore && this.shareStore.title) || this.title;
          if (this.shareStore.redToBtnName && this.shareStore.redToAppName) {
            this.isBtn = true;
            this.btnName = this.shareStore.redToBtnName;
          }
        }
      },
      go: function go() {
        Vue.gvUtil.redirectTo({
          name: this.shareStore.redToAppName,
          isBlank: this.shareStore.redToIsBlank || false,
          query: this.shareStore.redToQuery || {},
        });
      },
    },
  });
});
/**
 * 500
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/500App/index.js", [], function (require, exports, module) {
  return {
    template: '<p class="page-container">您没有权限或者路由不存在，请联系管理员!</p>',
    created: function created() {},
  };
});
/**
 * api配置
 * @module apiService
 * @author 陈柱良
 * @since 2017/11/01
 */
define("src/utils/apiConfig.js", [], function (require, exports, module) {
  var apiService = {},
    api = {},
    Domain = {};

  /**
   * @function get
   * @static
   * @param {string} apiName api配置名
   * @param {object} [params] 参数
   * @param {object} [urlParams] url上的参数
   * @param {string} [domain] 域名
   * @returns {string} url路径
   */
  apiService.get = function (apiName, params, urlParams, domain) {
    var configUrl = api[apiName],
      url = new Array(0),
      d = Domain[domain] ? Domain[domain] : ""; // '/' +

    url[0] = d + configUrl;

    if (!url) {
      console.log("请求的cgi：" + apiName + " 不存在");
      return "";
    }
    if (
      urlParams &&
      (typeof urlParams === "undefined" ? "undefined" : _typeof(urlParams)) ===
      "object"
    ) {
      var re;
      for (var name in urlParams) {
        re = new RegExp("{" + name + "}", "g");
        url[0] = url[0].replace(re, urlParams[name]);
      }
    }
    if (params && url[0].indexOf("?") === -1) {
      url.push("?");
    }
    if (typeof params === "string") {
      url.push(params);
    } else if (
      (typeof params === "undefined" ? "undefined" : _typeof(params)) ===
      "object"
    ) {
      for (var key in params) {
        url.push("&" + key + "=" + params[key]);
      }
    }
    var realUrl = url.join("");

    return realUrl;
  };

  apiService.registerApi = function (obj) {
    api = $.extend(api, obj || {});
  };

  apiService.registerContext = function (obj) {
    Domain = $.extend(Domain, obj || {});
  };

  return apiService;
});
/**
 * axios配置
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/utils/axiosConfig.js", ["src/vuex/store.js"], function (
  require,
  exports,
  module
) {
  var store = require("src/vuex/store.js"),
    // 遮罩数量，防止遮罩误关
    params = {
      timeout: 300000,
      path: "",
      authValue: "Arch6WithCloud",
      authName: "Authorization",
    },
    shadeNum = 0,
    commit = store.commit || store.dispatch,
    axiosObject = {
      setTimeouts: function setTimeouts(obj) {
        params.timeout = obj || params.timeout;
      },
      setPath: function setPath(obj) {
        params.path = obj || params.path;
      },
      setAuthValue: function setAuthValue(obj) {
        params.authValue = obj || params.authValue;
      },
      setAuthName: function setAuthName(obj) {
        params.authName = obj || params.authName;
      },
    },
    repeat = {};
  var language = !localStorage.getItem("_i18") ?
    "zh" :
    localStorage.getItem("_i18"),
    tpSessionId = getTpSessionId();

  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Arch6-Language"] = language;
  tpSessionId && (axios.defaults.headers.common["tpSessionId"] = tpSessionId);

  var source = axios.CancelToken.source();
  /**
   * axios 公共配置
   * [1] 拦截请求
   * [2] 拦截返回
   */
  axios.interceptors.request.use(
    function (config) {
      // if(!tpSessionId) {
      //     tpSessionId = getTpSessionId();
      // }

      // if(tpSessionId && !axios.defaults.headers.common.tpSessionId) {
      //     axios.defaults.headers.common['tpSessionId'] = tpSessionId;
      // }
      // 超时设置
      config.timeout = config.timeout || params.timeout;
      config.url = params.path + config.url;
      //防重复
      var rts = true;

      // if (!config.rt) {
      //     var rt = encodeURIComponent(config.url) + config.data ? encodeURIComponent(config.data) : '';
      //     config.rtUrl = rt;
      //     if (repeat[rt]) {
      //         config.data.cancelToken = source.token;
      //         rts = false;
      //     } else {
      //         repeat[rt] = true;
      //     }
      // }
      // if (config.url.indexOf('?') > -1) {
      //    config.url += '&_t=' + new Date().getTime();
      // } else {
      //    config.url += '?_t=' + new Date().getTime();
      // }
      // 遮罩
      var shade = config.shade === undefined ? true : config.shade;
      if (!!shade && typeof commit === "function") {
        commit("LOADING", true, config.shadeMsg);
        shadeNum++;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      //防重复
      if (!response.config.rt) {
        repeat[response.config.rtUrl] && delete repeat[response.config.rtUrl];
      }
      // 关闭遮罩
      var shade = response.config.shade;
      shade = shade === undefined ? true : shade;
      if (shade && typeof commit === "function") {
        if (shadeNum > 0) {
          --shadeNum;
        }
        if (shadeNum === 0) {
          commit("LOADING", false);
        }
      }
      if (response.config.responseType != "blob") {
        if (
          response.data &&
          response.data.resCode !== "0000" &&
          response.data.resCode !== "0006" &&
          response.data.resCode !== "0017"
        ) {
          var _d = response.config.data ? JSON.parse(response.config.data) : {};
          if (
            response.data.resCode === "401" ||
            response.data.resCode === "0006"
          ) {
            if (!response.config.clearToken) {
              alertInfo(true);
            } else if (!_d._source || _d._source !== "1") {
              alertInfo(false, response, true);
            }
          } else if (!_d._source || _d._source !== "1") {
            alertInfo(false, response, true);
          }
        }
        if (!tpSessionId) {
          tpSessionId =
            response.data.resData && response.data.resData.tpSessionId;
          if (tpSessionId && !axios.defaults.headers.common.tpSessionId) {
            axios.defaults.headers.common["tpSessionId"] = tpSessionId;
          }
        }
      }

      return response.data;
    },
    function (error) {
      //防重复
      // if(error.config && !error.config.rt) {
      //     repeat[error.config.rtUrl] && delete repeat[error.config.rtUrl];
      // }
      // 关闭遮罩
      var shade = error.config && error.config.shade;
      shade = shade === undefined ? true : shade;
      if (shade && typeof commit === "function") {
        if (shadeNum > 0) {
          --shadeNum;
        }
        if (shadeNum === 0) {
          commit("LOADING", false);
        }
      }
      if (
        error.response &&
        error.response.data &&
        (error.response.data.resCode === "0006" ||
          error.response.data.resCode !== "0000")
      ) {
        var _d = error.response.config.data ?
          JSON.parse(error.response.config.data) : {};
        if (
          error.response.data.resCode === "401" ||
          error.response.data.resCode === "0006"
        ) {
          if (!error.response.config.clearToken) {
            alertInfo(true);
          } else if (!_d._source || _d._source !== "1") {
            alertInfo(false, error);
          }
        } else if (!_d._source || _d._source !== "1") {
          alertInfo(false, error);
        }
      } else {
        alertInfo(false, error);
      }
      return Promise.reject(error);
    }
  );

  function getTpSessionId() {
    var _tpSessionId = "",
      user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      _tpSessionId = user.tpSessionId || "";
    }
    return _tpSessionId;
  }

  function alertInfo(flag, data, b) {
    if (flag) {
      Vue.gvUtil.destroyApp();
      commit("COMMIT_DIALOG_LOGIN", {
        showLoading: true,
      });
    } else {
      var statusText = "",
        msg = "",
        resCode = "";
      if (!b && data.response && data.response.data) {
        resCode = data.response.data.resCode ?
          data.response.data.resCode :
          data.response.data.status;
        statusText =
          Vue.gvUtil.getInzTranslate("g" + resCode) + "【" + resCode + "】";
        if (data.response.data.traceID) {
          statusText += "；TraceID = " + data.response.data.traceID;
          msg =
            "TraceID = " +
            data.response.data.traceID +
            "；SpanID=" +
            data.response.data.spanID +
            "。";
        }
        if (data.response.data) {
          msg +=
            data.response.data.resData ||
            data.response.data.resMsg ||
            data.response.data.message;
        } else {
          msg += "error";
        }
        //commit('COMMIT_DIALOG', { 'statusText': statusText, 'status': 'Tips', 'msg': msg, 'showLoading': true })
      } else if (data.data) {
        resCode = data.data.resCode ? data.data.resCode : data.data.status;
        statusText =
          Vue.gvUtil.getInzTranslate("g" + resCode) + "【" + resCode + "】";
        if (data.data.traceID) {
          statusText += "；TraceID = " + data.data.traceID;
          msg =
            "TraceID = " +
            data.data.traceID +
            "；SpanID=" +
            data.data.spanID +
            "。";
        }
        msg += data.data.resData || data.data.resMsg || data.data.message;
      }
    }
    commit("COMMIT_DIALOG", {
      statusText: statusText,
      status: "Tips",
      msg: msg,
      showLoading: true,
    });
  }

  return {
    axiosObject: axiosObject,
    axios: axios,
  };
});
/**
 * 混合对象
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/mixins/tpMixins.js", [], function (require, exports, module) {
  return {
    props: {
      type: {
        type: String,
        default: "add",
      },
    },
    data: function data() {
      return {
        mixinObject: {
          activeNames: ["1", "2", "3", "4"],
          gValidateRequired: Vue.filter("translate")("gValidateRequired"),
          gValidateNumber: Vue.filter("translate")("gValidateNumber"),
          searchSet: {
            // 查询设置，因定写法
            total: 0,
            pageNo: 0,
            pageSize: 10,
            currentPage: 1,
          },
          isInit: false,
        },
        cacheFilters: {},
      };
    },
    destroyed: function destroyed() {
      if (this.$options.name && this.$store) {
        this.$store.commit("DESTROYED_CACHE", this.$options.name);
      }
      if (this.storeData) {
        this.storeData.clear(this.$options.name);
        // console.log(this.storeData)
      }
    },
    created: function created() {
      if (this.$route && this.$route.query) {
        var qu = Vue.gvUtil.handleUnCompileQuery(this.$route.query);

        $.extend(true, this.query, qu);
        if (qu.openFlag && qu.openFlag === "1") {
          this.$store.commit("MENU_SHOW", false);
        }
      }
      if (this.$options.name && this.$store) {
        var key = this.$options.name.match(/(\S*)App/)[1] + "App";
        for (var name in this.$store.state.cache) {
          if (name.indexOf(key) === -1) {
            this.$store.state.cache[name] = null;
            delete this.$store.state.cache[name];
          }
        }
      }
      this.initPage();
      this.initRules();
    },
    methods: {
      searchLists: function searchLists(key) {
        this.$refs[key || "table"].onGetList();
      },
      showNumber: function showNumber(params, fm, thou, len) {
        Vue.gvUtil.showNumber(params, fm, thou, len);
      },
      /**
       * 获取请求参数 默认只传递_pageNo(页码) _pageSize(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
       * @param params
       * @returns {*}
       */
      getParamsMixin: function getParamsMixin(params) {
        this.cacheFilters = Object.assign({
            _pageSize: this.mixinObject.searchSet.pageSize,
            _pageNo: this.mixinObject.searchSet.pageNo,
          },
          params
        );
        return this.cacheFilters;
      },

      /**
       * 页码变动
       * @param val 码数
       */
      onHandleCurrentChange: function onHandleCurrentChange(val) {
        if (typeof val === "undefined") {
          return;
        }
        this.mixinObject.searchSet.pageNo = val - 1;
        this.mixinObject.isInit = true;
        this.onGetList();
      },

      /**
       * 查询行数变动
       * @param 行数
       */
      onHandleSizeChange: function onHandleSizeChange(val) {
        this.mixinObject.searchSet.pageSize = val;
        this.mixinObject.isInit = true;
        this.onGetList();
      },

      /**
       * 获取查询数据
       */
      onGetList: function onGetList() {},
      searchList: function searchList(
        apiName,
        contextName,
        filters,
        voName,
        call
      ) {
        if (!this.beforeSearchValidate()) {
          return;
        }
        if (!this.mixinObject.isInit) {
          this.mixinObject.searchSet.pageNo = 0;
          this.mixinObject.searchSet.currentPage = 1;
        } else {
          this.mixinObject.isInit = false;
        }
        var params = this.getParamsMixin(filters),
          url = Vue.gvUtil.getUrl({
            apiName: apiName,
            contextName: contextName,
            serachParms: {
              _pageSize: params._pageSize,
              _pageNo: params._pageNo,
            },
          }),
          _this = this,
          list = [];

        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode === "0000") {
            // ////debugger;
            _this.mixinObject.searchSet.total = res.resData[voName]["total"] ?
              res.resData[voName].total :
              res.resData[voName].totalElements;
            // list = res.resData[voName].content;  //自保修改 原本
            list = res.resData; //自保修改改
          } else {
            list = [];
            _this.mixinObject.searchSet.total = 0;
          }
          call && call(list);
        });
      },
      beforeSearchValidate: function beforeSearchValidate() {
        return true;
      },
      initPage: function initPage() {},
      initRules: function initRules() {},
      onResetForm: function onResetForm(formName) {
        this.$refs[formName].resetFields();
      },
      currentChangeMixin: function currentChangeMixin() {
        alert(
          "此方法已废除，把js里onHandleCurrentChange方法删除即可，html的onHandleCurrentChange保留"
        );
      },
      sizeChangeMixin: function sizeChangeMixin() {
        alert(
          "此方法已废除，把js里onHandleSizeChange方法删除即可，html的onHandleSizeChange保留"
        );
      },
    },
  };
});
/**
 * layoutService
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/layoutService.js", [], function (require, exports, module) {
  var layoutService = {
    params: {
      // refreshTime: null,
      menuFlag: false, // 菜单是否加载
      btns: {
        _PLAT_SAA_FACTOR_BTN: true,
      },
      loginFlag: false,
      menus: {
        "_/404": {
          flag: true,
          name: "404",
        },
        "_/login": {
          flag: true,
          name: "login",
        },
        "_/home": {
          flag: true,
          name: "home",
        },
        "_/home/note": {
          flag: true,
          name: "note",
        },
        "_/error": {
          flag: true,
          name: "500",
        },
        "_/claim/scanned_doc/scanned_doc_app": {
          flag: true,
          name: "scannedDoc",
        },
        "_/claim/registration/registration_app": {
          flag: true,
          name: "registration",
        },
        "_/claim/print_documents/rprint_documents_app": {
          flag: true,
          name: "documents",
        },
        "_/claim/notes_list/notes_list_app": {
          flag: true,
          name: "documents",
        },
      },
      menuData: [],
    },
  };

  layoutService.addBtnAuth = function (key, flag) {
    !layoutService.params.btns["_" + key] &&
      (layoutService.params.btns["_" + key] = true);
    !!flag && layoutService.updateBtnAuthCache();
  };
  layoutService.addMenu = function (key, title) {
    if (!layoutService.params.menus["_" + key]) {
      layoutService.params.menus["_" + key] = {
        flag: true,
        name: title,
      };
    }
  };
  layoutService.setLogingFlag = function (flag) {
    layoutService.params.loginFlag = flag;
  };
  layoutService.getLogingFlag = function () {
    return layoutService.params.loginFlag;
  };
  layoutService.updateBtnAuthCache = function () {
    var c = Vue.gvUtil.getCache("menu");
    c.set("BtnsData", layoutService.params.btns);
  };

  layoutService.setMenuFlag = function (obj) {
    layoutService.params.menuFlag = obj;
  };

  layoutService.getMenuFlag = function () {
    return layoutService.params.menuFlag;
  };

  layoutService.setMenus = function (obj) {
    layoutService.params.menu = obj;
  };

  // layoutService.addMenu = function(obj) {
  //     layoutService.params.menu = obj;
  // };

  layoutService.getMenus = function () {
    return layoutService.params.menus;
  };

  layoutService.setMenusData = function (obj) {
    var c = Vue.gvUtil.getCache("menu"),
      menusData = c.get("MenusData");
    if (!menusData) {
      c.set("MenusData", obj);
    }
    // layoutService.params.menuData = obj;
  };

  layoutService.getMenusData = function () {
    return Vue.gvUtil.getCache("menu").get("MenusData");
  };

  layoutService.getMenusForKey = function (key) {
    var obj = {
      v: false,
      agreement: false,
    };
    key = "_" + key;
    if (key === "_/") {
      obj.v = true;
      // obj.agreement = true;
      return obj;
    }
    for (var name in layoutService.params.menus) {
      if (key.indexOf(name) > -1) {
        obj.v = true;
        // if(name == key) {
        //     obj.agreement = true;
        // } else {
        //     obj.path = name;
        // }
        return obj;
      }
    }
    return obj;
    // return layoutService.params.menus['_' + key] && layoutService.params.menus['_' + key].flag ? true : false;
  };

  layoutService.getBtnsForKey = function (key) {
    return layoutService.params.btns["_" + key] ? true : false;
  };

  layoutService.getMenusNameForKey = function (key) {
    return (
      (layoutService.params.menus["_" + key] &&
        layoutService.params.menus["_" + key].name) ||
      ""
    );
  };

  // layoutService.getMenu = function() {
  //     return Vue.gvUtil.http.get(Vue.gvUtil.getUrl('layoutMenu'));
  // };

  layoutService.requestLogin = function (params) {
    var url = Vue.gvUtil.getUrl({
      apiName: "layoutAuth",
      contextName: "auth",
    });
    return Vue.gvUtil.http.post(url, params, {
      clearToken: true,
    });
  };

  layoutService.getpublicClock = function () {
    var url = Vue.gvUtil.getUrl({
      apiName: "getCommonCode",
      contextName: "product",
    });
    return Vue.gvUtil.http.get(url);
  };

  layoutService.getRiskProposal = function () {
    var url = Vue.gvUtil.getUrl({
      apiName: "getProRisk",
      contextName: "product",
    });
    return Vue.gvUtil.http.post(url);
  };
  layoutService.getUserInfo = function () {
    var url = Vue.gvUtil.getUrl({
      apiName: "getUserInfo",
      contextName: "product",
    });
    return Vue.gvUtil.http.get(url);
  };

  layoutService.getGgExch = function (baseCurrency, exchCurrency) {
    var url = Vue.gvUtil.getUrl({
      apiName: "getGgExch",
      contextName: "product",
    });
    return Vue.gvUtil.http.post(url, {
      baseCurrency,
      exchCurrency,
    });
  };
  // layoutService.refresh = function() {
  //     layoutService.cancellation();
  //     var user = sessionStorage.getItem('user');
  //     if (user) {
  //         layoutService.params.refreshTime = window.setInterval(function(){
  //             var url = Vue.gvUtil.getUrl({
  //                 apiName: 'layoutRefresh',
  //                 contextName: 'auth'
  //             });
  //             Vue.gvUtil.http.post(url, {}, { shade: false, clearToken: true }).then(function(res) {
  //                 var user = sessionStorage.getItem('user');
  //                 if (user) {
  //                     user = JSON.parse(user);
  //                     user.token = res.resData.token;
  //                     sessionStorage.setItem('user', JSON.stringify(user));
  //                 }
  //             });
  //         }, Vue.gvUtil.getRefreshTime());
  //     }
  // };

  // layoutService.cancellation = function() {
  //     if (layoutService.params.refreshTime) {
  //         window.clearInterval(layoutService.params.refreshTime);
  //         layoutService.params.refreshTime = null;
  //     }
  // };

  // layoutService.fooMenus = function(data, pathArr) {
  //     for (var name in data) {
  //         if (!data[name].children) {
  //             pathArr['_' + data[name].path] = true;
  //         } else {
  //             layoutService.fooMenus(data[name].children, pathArr);
  //         }
  //     }
  // };

  layoutService.fooMenus = function (data, pathArr, i18, paths) {
    var label = "clabel";
    if (i18 === "en") {
      label = "elabel";
    } else if (i18 === "zh") {
      label = "clabel";
    }
    if (data && data.length > 0) {
      data = data.sort(Vue.gvUtil.compare("displayNo"));
      for (var name in data) {
        if (data[name].flag === "0") {
          data[name].label = data[name][label];
          //if (data[name].children && data[name].children.length > 0) {
          if (data[name].isParent) {
            pathArr["_" + data[name].id] = {
              name: data[name][label],
            };
            layoutService.fooMenus(data[name].children, pathArr, i18, paths);
          } else {
            if (data[name].url) {
              paths.push("_" + data[name].url);
              pathArr["_" + data[name].url] = {
                flag: true,
                name: data[name][label],
              };
              if (data[name].img && data[name].img == "1") {
                data[name].proxyUrl = data[name].url;
                data[name].url = "/product/proxy_app?_t=" + data[name].ids;
              }
            } else {
              pathArr["_" + data[name].id] = {
                name: data[name][label],
              };
            }
            if (data[name].children && data[name].children.length > 0) {
              layoutService.fooMenus(data[name].children, pathArr, i18, paths);
            }
          }
        } else {
          layoutService.addBtnAuth(data[name].code || data[name].id);
        }
      }
    }
  };
  /**
   * 获取功能菜单所有数据
   */
  layoutService.getAllSystemMenuApi = function (params) {
    var url = Vue.gvUtil.getUrl({
      apiName: "layoutAllMenu",
      // urlParams: { platform: params.platform }, //前端
      urlParams: {
        platform: params.selfins,
      }, //自保 自保修改
      contextName: "auth",
    });
    // ////debugger;
    return Vue.gvUtil.http.get(url);
  };

  /**
   *
   */
  layoutService.getViewObjectApi = function (params) {
    var url = Vue.gvUtil.getUrl({
      apiName: "layoutGetViewObject",
      urlParams: {
        taskCode: params.taskCode,
      },
      contextName: "auth",
    });
    return Vue.gvUtil.http.get(url);
  };

  return layoutService;
});
/**
 * 启动器
 * @author 陈柱良
 * @time 2017/10/18
 */
define("src/components/form-engine/util.js", [], function (
  require,
  exports,
  module
) {
  // 引擎支持组件
  var typeMaps = {
      text: "el-input",
      select: "tp-select",
      textarea: "el-input",
      date: "el-date-picker",
      dbclick: "tp-dbclick",
      tpautocomplete: "tp-auto-complete",
    },
    // 默认属性列表
    defAttrs = {
      text: [{
        prop: "size",
        value: "mini",
        async: false,
      }, ],
      select: [{
        prop: "size",
        value: "mini",
        async: false,
      }, ],
      textarea: [{
        prop: "type",
        value: "textarea",
        async: false,
      }, ],
      date: [{
          prop: "size",
          value: "mini",
          async: false,
        },
        {
          prop: "value-format",
          value: "yyyy-MM-dd HH:mm:ss",
          async: false,
        },
      ],
    },
    // 转国际化属性
    internationAttrLists = "placeholder";

  // 模板工厂
  function templateFactory(type, attrs, events, name) {
    var comp = typeMaps[type],
      defAttr = defAttrs[type] || [],
      template;
    attrs = attrs || [];
    events = events || [];
    checkData(attrs, defAttr);
    attrs = attrs.concat(defAttr);
    // 动态属性校验
    attrs.forEach(function (item) {
      if (/^async\./.test(item.value)) {
        item.value = item.value.replace("async.", "");
        item.async = true;
      }
      if (/^engine\./.test(item.value)) {
        item.async = true;
      }
      if (/^v-+/.test(item.prop)) {
        item.async = false;
      }
    });
    // 生成模板
    if (comp) {
      template = "<" + comp + ' v-model="compValue"';
      attrs.forEach(function (item) {
        item = internationAttr(item);
        template += item.async ? " :" : " ";
        template += item.prop;
        template += '="' + item.value + '"';
      });
      //template += ' v-correct="engine.originList[index].name" v-correct-flg="engine.originVo.correct" :data-correct-type="flag" '
      events.forEach(function (item) {
        template += " @" + item.prop;
        template += '="' + item.prop.replace(/-/g, "") + '"';
      });
      template += "></" + comp + ">";
      //console.log(template);
    } else if (type === "search") {
      // 搜索框
      template =
        '<div><el-input size="mini" v-model="compValue" style="width:88%;"></el-input><el-button size="mini" type="primary" class="gv-btn-primary pd-f0" icon="el-icon-search" style="width:10%; margin-left: 4px;"';
      events.forEach(function (item) {
        template += " @" + item.prop;
        template += '="' + item.prop.replace(/-/g, "") + '"';
      });
      template += "></el-button></div>";
    } else if (type === "radio") {
      // 单选框
      var tempYes =
        '<el-radio size="mini" v-model="compValue" class="radio" :label="true"',
        tempNo =
        '<el-radio size="mini" v-model="compValue" class="radio" :label="false"';
      attrs.forEach(function (item) {
        item = internationAttr(item);
        tempYes += item.async ? " :" : " ";
        tempYes += item.prop;
        tempYes += '="' + item.value + '"';
        tempNo += item.async ? " :" : " ";
        tempNo += item.prop;
        tempNo += '="' + item.value + '"';
      });
      events.forEach(function (item) {
        tempNo += " @" + item.prop;
        tempNo += '="' + item.prop.replace(/-/g, "") + '"';
      });
      events.forEach(function (item) {
        tempYes += " @" + item.prop;
        tempYes += '="' + item.prop.replace(/-/g, "") + '"';
      });
      tempYes += ">Yes</el-radio>";
      tempNo += ">No</el-radio>";
      template = "<div>" + tempYes + tempNo + "</div>";
    } else if (type === "bottomBtn") {
      // 底部按钮
      template = '<el-button size="mini"';
      attrs.forEach(function (item) {
        item = internationAttr(item);
        template += item.async ? " :" : " ";
        template += item.prop;
        template += '="' + item.value + '"';
      });
      events.forEach(function (item) {
        template += " @" + item.prop;
        template += '="' + item.prop.replace(/-/g, "") + '"';
      });
      template += '>{{"' + name + '" | translate("' + name + '")}}</el-button>';
    }
    return template;
  }

  //Date时校验默认属性与配置属性是否重复，重复则以配置为主
  function checkData(attrs, defAttr) {
    attrs.forEach(function (item) {
      for (var i = 0, len = defAttr.length; i < len; i++) {
        var items = defAttr[i];
        if (item.prop === items.prop) {
          defAttr.splice(i, 1);
        }
      }
    });
  }

  // 国际化属性
  function internationAttr(attr) {
    var prop = attr.prop,
      value = attr.value,
      async = attr.async;
    if (!async &&~internationAttrLists.indexOf(prop)) {
      return {
        prop: prop,
        value: "'" + value + "' | translate",
        async: true,
      };
    } else {
      return attr;
    }
  }

  // 组件工厂
  // name-组件名称（后期自动生成）type-组件类型 props-传给组件的属性（即新组件中的data）methodsT-方法(貌似没用) attrs-组件属性配置 events-组件事件配置
  function componentFactory(name, type, props, methodsT, attrs, events) {
    if (!name) {
      return;
    }
    var template = templateFactory(type, attrs, events, name),
      methods = {};
    events = events || [];
    events.forEach(function (item) {
      var prop = item.prop.replace(/-/g, ""),
        value = item.value;
      methods[prop] = function (val, val1, val2, val3) {
        this.$emit("dispatch", {
          event: value,
          value: {
            val: val,
            val1: val1,
            val2: val2,
            val3: val3,
          },
        });
      };
    });
    Vue.component(name, {
      template: template,
      props: {
        index: null,
        flag: null,
        value: null,
        engine: null,
      },
      data: function data() {
        var res = {
          compValue: "",
        };
        return Object.assign(res, props);
      },
      watch: {
        value: function value(val) {
          this.compValue = val;
        },
        compValue: function compValue(val) {
          this.$emit("input", val);
        },
      },
      mounted: function mounted() {
        // 初始化
        this.compValue = this.value;
      },
      methods: methods,
    });
  }

  return {
    // 转换数据
    transformData: function transformData(obj, keys) {
      // 整理元素属性
      function calcAttrs(item) {
        var attribute = item.attribute || "[]",
          rule = item.validationConfig || "[]",
          required = false,
          attrs,
          events;
        attribute = JSON.parse(attribute);
        attrs = attribute.filter(function (tmp) {
          return tmp.type === "attr";
        });
        events = attribute.filter(function (tmp) {
          return tmp.type === "event";
        });
        // 处理元素校验规则
        /* eslint no-cond-assign: "off" */
        rule = JSON.parse(rule);
        if (rule.length && item.textType !== "bottomBtn") {
          rule = rule.map(function (tmp) {
            var message = tmp.message,
              pattern = tmp.pattern || "",
              trigger = tmp.trigger,
              reg;
            message = message ? Vue.gvUtil.getInzTranslate(message) : undefined;
            if (pattern === "required") {
              required = true;
              return {
                trigger: trigger,
                required: true,
                message: message,
              };
            } else if (pattern === "notrequired") {
              required = false;
              return {
                trigger: trigger,
                required: false,
                message: message,
              };
            } else if ((reg = pattern.match(/(\/)(.*)(\/)([a-z]+)?/))) {
              pattern = new RegExp(reg[2], reg[4]);
              return {
                trigger: trigger,
                pattern: pattern,
                message: message,
              };
            } else if (~["url", "email"].indexOf(pattern)) {
              // url email
              return {
                trigger: trigger,
                type: pattern,
                message: message,
              };
            }
            return {
              trigger: trigger,
              type: pattern,
              message: message,
            };
          });
        } else {
          rule = [{
            trigger: "blur",
            required: true,
            message: "message",
          }, ];
        }

        return {
          attrs: attrs,
          events: events,
          textType: item.textType,
          elementCode: item.elementCode,
          nameKey: item.nameKey,
          required: required,
          colSize: item.colSize || "1",
          sorting: item.sorting,
          rule: rule,
        };
      }

      // 排版
      function composing() {
        var trs = [],
          tr = [];
        for (var i = 0, len = elems.length; i < len; i++) {
          var el = elems[i],
            colSize = +el.colSize,
            less = column - curCols,
            hadPush = false;
          // 当前行元素 tr
          if (less - colSize >= 1) {
            // 可添加到当行
            tr.push(el);
            curCols += colSize + 1;
            hadPush = true;
          } else if (less) {
            while (less) {
              less -= 2;
              curCols += 2;
              tr.push({});
            }
          }
          // 判断当前是否已满
          less = column - curCols;
          if (!less) {
            curCols = 0;
            trs.push(tr);
            tr = [];
          }
          // 当前元素未被添加
          if (!hadPush) {
            tr.push(el);
            curCols += colSize + 1;
            hadPush = true;
          }
          // 最后元素
          if (i + 1 === len) {
            less = column - curCols;
            while (less && curCols) {
              less -= 2;
              curCols += 2;
              tr.push({});
            }
            curCols = 0;
            trs.push(tr);
            tr = [];
          }
        }
        return trs;
      }

      // 处理单元
      function unit(type, elementCode) {
        elems = elems
          .filter(function (em) {
            return em.textType !== "bottomBtn" && !em.pubViewObjectVo;
          })
          .sort(function (a, b) {
            return a.sorting - b.sorting;
          });
        var row = {};
        if (elems.length) {
          row.name = elementCode;
          row.type = type;
          (row.labelWidth = column === 4 ? 2 : 3),
          (row.inputWidth = column === 4 ? 4 : 5);
          elems = elems.map(function (item) {
            item = calcAttrs(item);
            // 创建组件
            componentFactory(
              item.nameKey + keys,
              item.textType, {},
              null,
              item.attrs,
              item.events
            );
            item.comp = item.nameKey + keys;
            return item;
          });
          if (type === "object") {
            row.trs = composing();
          } else {
            // list 属性
            var attribute = currentItem.attribute || "[]";
            attribute = JSON.parse(attribute);
            attribute.forEach(function (item) {
              var prop = item.prop,
                value = item.value;
              row[prop] = value;
            });
            row.showSN = row.showSN === undefined ? true : row.showSN;
            row.showOP = row.showOP === undefined ? true : row.showOP;
            row.readonly = row.readonly || "readonly";
            row.elems = elems;
            /* row.elems = elems.filter(function (ell) {
                            return ell.textType === 'text'
                        }) */
          }
          rows.push(row);
        }
      }

      var rows = [],
        // 列表当前处理对象
        currentItem = {},
        // 公共
        elems = obj.pubViewObjectEleVos,
        arrangement = ~~obj.arrangement || 6,
        column = ~~(arrangement / 2) * 2,
        curCols = 0,
        // 分离出底部按钮
        bottomBtns = elems.filter(function (em) {
          return em.textType === "bottomBtn";
        }),
        // 分离出对象、列表
        lists = elems.filter(function (em) {
          return em.pubViewObjectVo;
        });

      // [1] 处理零散件
      unit("object");
      // [2] 处理嵌套元素（对象或列表）
      if (lists.length) {
        for (var i = 0, len = lists.length; i < len; i++) {
          var dataType = lists[i].dataType,
            elementCode = lists[i].elementCode;
          currentItem = lists[i];
          obj = currentItem.pubViewObjectVo;
          elems = obj.pubViewObjectEleVos;
          arrangement = ~~obj.arrangement || 6;
          column = ~~(arrangement / 2) * 2;
          curCols = 0;
          unit(dataType, elementCode);
        }
      }
      // [3] 处理底部按钮
      bottomBtns.sort(function (a, b) {
        return a.sorting - b.sorting;
      });
      bottomBtns = bottomBtns.map(function (item) {
        item = calcAttrs(item);
        componentFactory(
          item.nameKey,
          item.textType, {},
          null,
          item.attrs,
          item.events
        );
        item.comp = item.nameKey;
        return item;
      });
      // 只有一个元素
      if (rows.length === 1) {
        delete rows[0].name;
      }
      // console.log(rows)
      return {
        rows: rows,
        bottomBtns: bottomBtns,
      };
    },
  };
});
/**
 * 图片预览
 * @胡丽君
 * @2017/11
 * <div id="container" v-show="!showHander"><div id="pop" class="pop"><canvas id="the-canvas"></canvas></div></div>
 */
define("src/components/upload/ViewImg.js", [], function (
  require,
  exports,
  module
) {
  //  var dpf = require('./pdf.js');
  return {
    template: '<div class="img-view-wrapper" ref="imgWrapper" style="min-height:300px;">\
            <i class="el-icon-arrow-left imgIcon pre" :class="{ \'disable\': index === 0 }" @click="goPrev()"></i>\
            <i class="el-icon-arrow-right imgIcon next" :class="{ \'disable\': index === lastIndex -1 }" @click="goNext()"></i>\
            <img :src="fileSrc" alt="" ref="img" v-show="isImg" /><span v-show="!isImg" @click="onView" class="pdf-txt">点击在线查看PDF文档</span>\
            <div class="scale" v-show="showHander">\
                <i class="el-icon-zoom-in" @click="scaleBigger()"></i>\
                <i class="el-icon-zoom-out" @click="scaleSmaller()"></i>\
                <i class="el-icon-refresh" @click="rotate()"></i>\
            </div>\
        </div>',
    data: function data() {
      return {
        rotateDeg: 0,
        height: "",
        isImg: true,
        showHander: true,
      };
    },
    props: {
      fileSrc: String,
      lastIndex: Number,
      index: Number,
    },
    watch: {
      fileSrc: function fileSrc() {
        this.initFileSrc();
      },
    },
    mounted: function mounted() {
      // this.width = this.$el.offsetWidth;
      // this.height = this.$el.offsetHeight;
      this.initFileSrc();
    },
    methods: {
      initFileSrc: function initFileSrc() {
        if (/\.pdf$/g.test(this.fileSrc)) {
          this.isImg = false;
          // this.handlePdf(this.fileSrc);
        } else {
          this.showHander = true;
        }
      },
      scaleBigger: function scaleBigger() {
        this.$refs.img.style.transform = "scale(2)";
      },
      scaleSmaller: function scaleSmaller() {
        this.$refs.img.style.transform = "scale(1)";
      },
      goPrev: function goPrev() {
        if (this.index === 0) {
          return;
        } else {
          this.$emit("changeIndex", --this.index);
        }
      },
      goNext: function goNext() {
        if (this.index === this.lastIndex - 1) {
          return;
        } else {
          this.$emit("changeIndex", ++this.index);
        }
      },
      onView: function onView() {
        Vue.gvUtil.openPdf({
          system: "Report",
          reportName: "AcknowledgementLetter",
          readonly: "false",
        });
      },
      rotate: function rotate() {
        this.rotateDeg += 90;
        /* if (this.rotateDeg/90%2 === 0) {
                    this.$refs.img.style.width = this.width;
                    this.$refs.img.style.height = this.height
                } else {
                    this.$refs.img.style.width = this.height;
                    this.$refs.img.style.height = this.width
                 } */
        this.$refs.img.style.transform = "rotate(" + this.rotateDeg + "deg)";
      },
      /* ,handlePdf: function(src) {
                this.showHander = false;
                PDFJS.workerSrc = 'src/components/tpUpload/pdf.worker.js';
                PDFJS.getDocument(src).then(function getPdfHelloWorld(pdf) {
                    pdf.getPage(1).then(function getPageHelloWorld(page) {
                        var scale = 1.5;
                        var viewport = page.getViewport(scale);
                        var canvas = document.getElementById('the-canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                    });
                });
            }*/
    },
    destroyed: function destroyed() {
      this.rotateDeg = 0;
    },
  };
});
/**
 * 表格混合对象
 * @author 陈柱良
 * @time 2019/04/18
 */
define("src/mixins/tableMixins.js", [], function (require, exports, module) {
  return {
    data: function data() {
      return {
        mixinObject: {
          searchSet: {
            // 查询设置，因定写法
            total: 0,
            pageNo: 0,
            pageSize: 10,
            currentPage: 1,
          },
          isInit: false,
        },
        cacheFilters: {},
      };
    },
    methods: {
      /**
       * 获取请求参数 默认只传递_pageNo(页码) _pageSize(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
       * @param params
       * @returns {*}
       */
      getParamsMixin: function getParamsMixin(params) {
        this.cacheFilters = Object.assign({
            _pageSize: this.mixinObject.searchSet.pageSize,
            _pageNo: this.mixinObject.searchSet.pageNo,
          },
          params
        );
        return this.cacheFilters;
      },

      /**
       * 页码变动
       * @param val 码数
       */
      onHandleCurrentChange: function onHandleCurrentChange(val) {
        if (typeof val === "undefined") {
          return;
        }
        this.mixinObject.searchSet.pageNo = val - 1;
        this.mixinObject.isInit = true;
        this.onGetList();
      },

      /**
       * 查询行数变动
       * @param 行数
       */
      onHandleSizeChange: function onHandleSizeChange(val) {
        this.mixinObject.searchSet.pageSize = val;
        this.mixinObject.isInit = true;
        this.onGetList();
      },

      /**
       * 获取查询数据
       */
      onGetList: function onGetList() {},
      searchList: function searchList(
        apiName,
        contextName,
        filters,
        voName,
        call
      ) {
        if (!this.mixinObject.isInit) {
          this.mixinObject.searchSet.pageNo = 0;
          this.mixinObject.searchSet.currentPage = 1;
        } else {
          this.mixinObject.isInit = false;
        }
        var params = this.getParamsMixin(filters),
          url = Vue.gvUtil.getUrl({
            apiName: apiName,
            contextName: contextName,
            serachParms: {
              _pageSize: params._pageSize,
              _pageNo: params._pageNo,
            },
          }),
          _this = this,
          list = [],
          headList = [];
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode === "0000") {
            _this.mixinObject.searchSet.total = res.resData[voName]["total"] ?
              res.resData[voName].total :
              res.resData[voName].totalCount ||
              res.resData[voName].totalElements;
            list = res.resData[voName].content;
          } else {
            list = [];
            _this.mixinObject.searchSet.total = 0;
          }
          call && call(list);
        });
      },
      onResetForm: function onResetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
});
/**
 * 新版top
 * @author 徐博学
 * @time 2020/11/01
 */
define("src/layout/homeApp/components/homeTop2/index.js", ["src/layout/layoutService.js"], function (require, exports, module) {
  //./dist/img/main_logo.png
  // <p class="time">\
  //     <a  href="javascript:;" @click="changeHome">{{\'gTitleSwitch\' | translate(\'Switch\')}}</a>\
  //     Version {{version}}\
  // </p>\
  var workflowDialog = require("src/workflow/workflow-dialog.js"),
    trailDialog = require("src/workflow/trail-dialog.js"),
    temp = '<div class="container">\
                  <div class="main-header2">\
                      <el-image class="header-logo" src="./dist/img/loginLogo.png" fit="cover" @click="handleToHome"></el-image>\
                      <div :class="islanguage?\'system-name\':\'en-system-name\'">{{ "gLogin" | translate()}}</div>\
                      <div>\
                      <div class="path-txt" v-if="isShowTopMenu">\
                          <el-menu active-text-color="#fff" :default-active="$route.path" :class="menuClass" class="el-menu-demo-top" mode="horizontal" menu-trigger="hover" @select="onHandleSelect" @open="onHandleOpen" unique-opened router ref="topMenu">\
                              <el-scrollbar class="topMenuScrollbar" style="height:100%" v-if="isShowTopMenu">\
                                  <template v-for="(item,index) in menus" index="0">\
                                      <el-submenu :index="item.id" v-if="item.children && item.children.length > 0 && item.flag == \'0\'">\
                                          <template slot="title">{{item.label}}</template>\
                                          <template v-for="child in item.children">\
                                              <el-menu-item :proxyUrl="child.proxyUrl" :index="child.url" :key="child.url" v-if="child.flag == \'0\' && child.url != \'\'">\
                                                  {{child.label}}\
                                              </el-menu-item>\
                                              <el-submenu :index="child.id" v-if="child.flag == \'0\' && child.url == \'\'">\
                                                  <template slot="title">{{child.label}}</template>\
                                                  <div v-if="child.url == \'\'">\
                                                      <template v-for="child1 in child.children">\
                                                      <el-menu-item :proxyUrl="child1.proxyUrl" :index="child1.url" :key="child1.url" v-if="child1.flag == \'0\' && child1.url != \'\'"> {{child1.label}}\
                                                      </el-menu-item>\
                                                      <el-submenu :index="child1.id" v-if="child1.flag == \'0\' && child1.url == \'\'">\
                                                          <template slot="title"><span slot="title">{{child1.label}}</span></template>\
                                                          <div tt="wwww" v-if="child1.url == \'\'">\
                                                              <el-menu-item :proxyUrl="child2.proxyUrl" v-for="child2 in child1.children" :index="child2.url" :key="child2.url" v-if="child2.flag == \'0\' && child2.url != \'\'"> {{child2.label}}\
                                                              </el-menu-item>\
                                                          </div>\
                                                      </el-submenu>\
                                                  </template>\
                                                  </div>\
                                              </el-submenu>\
                                          </template>\
                                      </el-submenu>\
                                      <el-menu-item :proxyUrl="item.proxyUrl" v-if="!item.children || item.children.length == 0" :index="item.url" :key="item.url">{{item.label}}</el-menu-item>\
                                  </template>\
                              </el-scrollbar>\
                          </el-menu>\
                      </div>\
                      </div>\
                      <el-popover popper-class="userInfoPopover" placement="bottom" trigger="click" width="200">\
                          <p class="big-name">{{userInfo.userName}}</p>\
                          <p class="user-info-item">{{\'gpost\' | translate()}}: {{userInfo.companyName}}</p>\
                          <p class="user-info-item">{{\'gcompany\' | translate()}}: {{sysUserCompany}}</p>\
                          <div class="logout cursor" @click="logout">\
                              {{\'gTitleLogoutLogin\' | translate(\'Logout Login\')}}\
                          </div>\
                          <p class="time">\
                              Version {{version}}\
                          </p>\
                          <p class="time">\
                              {{new Date() | time}}\
                          </p>\
                          <div slot="reference" class="userinfo-pop">\
                              <div class="userinfo cursor">\
                                  {{userInfo.userName}}\
                                  <i style="font-size: 16px;" class="icon el-icon-caret-bottom"></i>\
                              </div>\
                              <div class="avatar-box2">\
                                  <img src="./dist/img/userpic.png"/>\
                              </div>\
                          </div>\
                      </el-popover>\
                  </div>\
                  <div class="path-more" v-show="isMore">\
                      <i class="fa el-icon-caret-left" :class="{disable : showIndex === 0}" @click="pre()"></i>\
                      <i class="fa el-icon-caret-right" :class="{disable : showIndex === hiddenIndex.length}" @click="next()"></i>\
                  </div>\
                  <div class="searchWrapper breadcrumb-wrapper" v-if="isShowTopMenu">\
                      <div>\
                          <el-breadcrumb separator="/">\
                              <el-breadcrumb-item :key="index" v-for="(item,index) in breadcrumbs">{{item}}</el-breadcrumb-item>\
                          </el-breadcrumb>\
                      </div>\
                  </div>\
                  <div :style="{ top: top}" :element-loading-text="\'gTitlePageLoading\' | translate(\'Loading the page...\')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" class="new-container main top-main gv-box-content" id="content-container">\
                     <transition name="fade" mode="out-in">\
                            <keep-alive v-if="$route.fullPath.indexOf(\'purchase\')>-1" :include="sessionStorage.getItem(\'cachePurchaseName\')">\
                             <router-view ></router-view>\
                            </keep-alive>\
                            <router-view v-if="!$route.fullPath.indexOf(\'purchase\') > -1"></router-view>\
                        </transition>\
                  </div>\
                  <workflowDialog></workflowDialog>\
                  <trailDialog></trailDialog>\
              </div>',
    layoutService = require("src/layout/layoutService.js");
  return {
    template: temp,
    components: {
      workflowDialog,
      trailDialog
    },
    data: function data() {
      return {
        collapsed: false,
        isMore: false,
        sysUserName: '',
        // sysUserCompany:'',
        version: '',
        showIndex: 0,
        hiddenIndex: [],
        menuList: [],
        islanguage: false,
        isShowTopMenu: false, //控制登录成功首页是否显示
        menuClass: '', //动态类名
        // userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
      };
    },
    props: {
      menus: {
        type: Array
      }
    },
    computed: {
      loading: function loading() {
        return this.$store.state.pageLoading;
      },
      breadcrumbs: function breadcrumbs() {
        return this.$store.state.breadcrumbs;
      },
      // isShowMenu: function isShowMenu() {
      //     // return this.$store.state.menuShow;
      //     // return  localStorage.getItem('_layoutType')=='left';
      // },
      isShowTopMenu: function isShowTopMenu() {
        return this.$route.path != '/index/workbench_app'
      },
      top: function top() {
        return this.isShowTopMenu ? '100px' : '12px';
      },
      userInfo: function userInfo() {
        return this.$store.state.userInfo
        // return JSON.parse(sessionStorage.getItem('userInfo'))
      },
      sysUserCompany: function sysUserCompany() {
        var arr = []
        if (this.userInfo.companyList) {
          this.userInfo.companyList.forEach(e => {
            arr.push(e.companyName)
          })
        }
        return arr.join(' / ')
      }
    },
    watch: {
      menus: function menus(val) {
        if (val && val.length > 0) {
          this.onCalculate();
        }
      },
      $route(to, from) {
        // var list = []
        // to.matched.forEach(e => {
        //     list.push(...e.meta.name)
        // })
        // this.$store.commit('BREADCRUMBS', list);
        if (to.path != '/index/workbench_app') {
          this.isShowTopMenu = true
        } else {
          this.isShowTopMenu = false
        }
      }
    },
    created: function created() {
      this.onCalculate();
      var t = sessionStorage.getItem('headerTitleTop') || '';
      this.$store.commit('BREADCRUMBS', t.split(','));
      this.version = Vue.gvUtil.getVersion();
      this.islanguage = localStorage.getItem('_i18') == 'zh' ? true : false;
      this.isShowTopMenu = false
      if (this.islanguage) {
        if (this.menus.length > 7) {
          this.menuClass = 'moveLeft zh'
        } else {
          this.menuClass = 'zh'
        }
      } else {
        if (this.menus.length > 7) {
          this.menuClass = 'moveLeft en'
        } else {
          this.menuClass = 'en'
        }
      }
    },
    methods: {
      test() {
        this.$store.state.workflowShow = true
      },
      handleToHome: function handleToHome() {
        Vue.gvUtil.redirectTo({
          name: 'workbenchApp'
        })
      },
      onCalculate: function onCalculate() {
        var _this = this;
        setTimeout(function () {
          _this.$nextTick(function () {
            if (_this.$refs.topMenu) {
              _this.menuList = _this.$refs.topMenu.$children;
              var len = _this.menuList.length,
                sum = 0,
                arr = [],
                lastWidth = _this.menuList.length ? _this.menuList[len - 1].$el.clientWidth : 0;
              for (var i = 0; i < len; i++) {
                arr.push(_this.menuList[i].$el.clientWidth);
                sum += _this.menuList[i].$el.clientWidth;
                if (sum > 1290 - lastWidth) {
                  _this.isMore = true;
                  _this.menuList[i].$el.style.display = 'none';
                  _this.hiddenIndex.push(i);
                }
              }
            }
          });
        }, 100);
      },
      next: function next() {
        if (this.showIndex >= 0 && this.showIndex < this.hiddenIndex.length) {
          // console.log(this.menuList)
          this.menuList[this.showIndex].$el.style.display = 'none';
          this.menuList[this.hiddenIndex[this.showIndex]].$el.style.display = 'block';
          this.showIndex++;
          // console.log(this.showIndex)
        }
      },
      pre: function pre() {
        if (this.showIndex > 0) {
          this.showIndex--;
          // console.log(this.showIndex)
          this.menuList[this.showIndex].$el.style.display = 'block';
          this.menuList[this.hiddenIndex[this.showIndex]].$el.style.display = 'none';
        }
      },
      changeHome: function changeHome() {
        localStorage.setItem('_layoutType', 'left');
        this.$store.commit('CHANGE_HOME', {
          'type': 'left'
        });
      },
      onHandleSelect: function onHandleSelect(a, b, c) {
        sessionStorage.setItem("proxyMenu", c.$attrs.proxyUrl ? c.$attrs.proxyUrl : '');
        window.reMethods = null;
        Vue.gvUtil.registerConfig('_' + a);
        if (c.$attrs.proxyUrl) b[b.length - 1] = c.$attrs.proxyUrl;
        this.$store.commit('BREADCRUMBS', this.getBreadcrumbs(b));
        // this.breadcrumbs = this.getBreadcrumbs(b);
        sessionStorage.setItem('headerTitleTop', this.breadcrumbs.join(','));
      },
      onHandleOpen: function onHandleOpen() {},
      getBreadcrumbs: function getBreadcrumbs(data) {
        var bcs = [];
        for (var n in data) {
          bcs.push(layoutService.getMenusNameForKey(data[n]));
        }
        return bcs;
      },
      // 退出登录
      logout: function logout() {
        this.$confirm(Vue.filter('translate')('confirmQuit'), Vue.filter('translate')('gTitlePrompt'), {
          type: 'warning'
        }).then(function () {
          var url = Vue.gvUtil.getUrl({
            apiName: 'layoutAuthLogout',
            contextName: 'auth'
          });
          Vue.gvUtil.http.get(url).then(function (res) {
            Vue.gvUtil.destroyApp(true);
          }, function (res) {
            Vue.gvUtil.destroyApp(true);
          });
        }, function () {
          console.log('cance');
        });
      },
      jump: function jump() {
        var menuValue = sessionStorage.getItem('menuValue');
        if (menuValue && menuValue !== '') {
          var menuValueSearch = Vue.gvUtil.getSearchJson(sessionStorage.getItem('menuValueSearch')),
            r = {
              path: menuValue
            };

          if (menuValueSearch) {
            r['query'] = menuValueSearch;
          }
          sessionStorage.removeItem('menuValue');
          sessionStorage.removeItem('menuValueSearch');
          // Vue.gvUtil.registerConfig('_' + menuValue, true, function() {
          Vue.gvUtil.redirectTo(r);
          // });
        }
      },
      // 折叠导航栏
      collapse: function collapse() {
        this.collapsed = !this.collapsed;
      },
      showMenu: function showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      }
    }

  };
});

/**
 * left
 * @author 陈柱良
 * @time 2017/11/01
 */
define("src/layout/homeApp/components/homeLeft/index.js", [
  "src/layout/layoutService.js",
], function (require, exports, module) {
  //./dist/img/main_logo.png
  // <p class="isOpenMenu" @click=""><i class="el-icon-s-unfold" style="font-size: 21px;position: absolute;bottom: 10px;right: 10px;"></i></p>\
  var workflowDialog = require("src/workflow/workflow-dialog.js"),
    trailDialog = require("src/workflow/trail-dialog.js"),
    temp =
    '<div class="container">\
                    <div class="main-header">\
                        <el-image class="header-logo" src="./dist/img/loginLogo.png" fit="cover"></el-image>\
                        <div class="system-name">保险管理信息系统</div>\
                        <el-popover popper-class="userInfoPopover" placement="bottom" trigger="click" width="200">\
                            <p class="big-name">{{sysUserName}}</p>\
                            <p class="user-info-item">工号: 42693</p>\
                            <p class="user-info-item">部门: 金融保险六部</p>\
                            <div class="logout cursor" @click="logout">\
                                {{\'gTitleLogoutLogin\' | translate(\'Logout Login\')}}\
                            </div>\
                            <p class="time">\
                                <a  href="javascript:;" @click="changeHome">{{\'gTitleSwitch\' | translate(\'Switch\')}}</a>\
                                Version {{version}}\
                            </p>\
                            <p class="time">\
                                {{new Date() | time}}\
                            </p>\
                            <div slot="reference" class="userinfo-pop">\
                                <div class="userinfo cursor">\
                                    {{sysUserName}}\
                                    <i style="font-size: 16px;" class="icon el-icon-caret-bottom"></i>\
                                </div>\
                                <div class="avatar-box2">\
                                    <img src="./dist/img/userpic.png"/>\
                                </div>\
                            </div>\
                        </el-popover>\
                    </div>\
                    <div class="main menu-main" v-if="isShowMenu">\
                        <el-menu  v-if="isShowMenu" :default-active="$route.path" :unique-opened="true" class="el-menu-vertical-demo gv-left-menu" :class="!isOpenMenu?\'hideMenu\':\'\'" @select="onHandleSelect" @open="onHandleOpen" :collapse="!collapsed" router style="overflow: auto">\
                            <template v-for="(item,index) in menus">\
                                <el-submenu :index="item.id" v-if="item.children && item.children.length > 0 && item.flag == \'0\'">\
                                    <template slot="title"><i :class="menusIconClass[index]" class="icon"></i><span slot="title">{{item.label}}</span></template>\
                                    <template v-for="child in item.children">\
                                        <el-menu-item :proxyUrl="child.proxyUrl" :index="child.url" :key="child.url" v-if="child.flag == \'0\' && child.url != \'\'"> {{child.label}}\
                                        </el-menu-item>\
                                        <el-submenu :index="child.id" v-if="child.flag == \'0\' && child.url == \'\'">\
                                            <template slot="title"><span slot="title">{{child.label}}</span></template>\
                                            <div v-if="child.url == \'\'">\
                                                <template v-for="child1 in child.children">\
                                                    <el-menu-item :proxyUrl="child1.proxyUrl"  :index="child1.url" :key="child1.url" v-if="child1.flag == \'0\' && child1.url != \'\'"> {{child1.label}}\
                                                    </el-menu-item>\
                                                    <el-submenu :index="child1.id" v-if="child1.flag == \'0\' && child1.url == \'\'">\
                                                        <template slot="title"><span slot="title">{{child1.label}}</span></template>\
                                                        <div v-if="child1.url == \'\'">\
                                                            <el-menu-item :proxyUrl="child2.proxyUrl"  v-for="child2 in child1.children" :index="child2.url" :key="child2.url" v-if="child2.flag == \'0\' && child2.url != \'\'"> {{child2.label}}\
                                                            </el-menu-item>\
                                                        </div>\
                                                    </el-submenu>\
                                                </template>\
                                            </div>\
                                        </el-submenu>\
                                    </template>\
                                </el-submenu>\
                                <el-menu-item :proxyUrl="item.proxyUrl" v-if="!item.children || item.children.length == \'0\'" :index="item.url" :key="item.url"><i :class="menusIconClass[index]" class="icon"></i><span slot="title">{{item.label}}</span></el-menu-item>\
                            </template>\
                        </el-menu>\
                        <section class="content-container" :class="!isOpenMenu?\'moveContent\':\'\'" id="content-container">\
                            <div class="gv-crumbs-box">\
                                <div class="crumbs-box">\
                                    <el-breadcrumb separator="/" style="line-height:30px;">\
                                        <p class="isOpenMenu" @click="openMenu"><i :class="isOpenMenu?\'el-icon-s-unfold\':\'el-icon-s-fold\'"></i></p>\
                                        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">{{item}}</el-breadcrumb-item>\
                                    </el-breadcrumb>\
                                 </div>\
                            </div>\
                            <el-col v-loading="loading" :element-loading-text="\'gTitlePageLoading\' | translate(\'Loading the page...\')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" :span="24" class="content-wrapper gv-box-content" style="height:calc(100% - 41px);">\
                                <transition name="fade" mode="out-in">\
                                    <router-view ></router-view>\
                                </transition>\
                            </el-col>\
                        </section>\
                    </div>\
                    <workflowDialog></workflowDialog>\
                    <trailDialog></trailDialog>\
                </div>',
    layoutService = require("src/layout/layoutService.js");
  return {
    template: temp,
    components: {
      workflowDialog,
      trailDialog,
    },
    data: function data() {
      return {
        collapsed: true,
        sysUserName: "",
        version: "",
        menusIconClass: [
          //菜单icon样式
          "icon1",
          "icon2",
          "icon3",
          "icon4",
          "icon5",
          "icon6",
          "icon7",
        ],
        isOpenMenuData: true, //默认展开侧边栏
      };
    },
    props: {
      menus: {
        type: Array,
      },
    },
    computed: {
      loading: function loading() {
        return this.$store.state.pageLoading;
      },
      breadcrumbs: function breadcrumbs() {
        return this.$store.state.breadcrumbs;
      },
      isShowMenu: function isShowMenu() {
        // return this.$store.state.menuShow;
        return localStorage.getItem("_layoutType") == "left";
      },
      isShowTopMenu: function isShowTopMenu() {
        return this.$route.path != "/index/workbench_app";
      },
      isOpenMenu: function isOpenMenu() {
        return this.isOpenMenuData;
      },
    },
    created: function created() {
      var t = sessionStorage.getItem("headerTitleTop") || "";
      this.$store.commit("BREADCRUMBS", t.split(","));
      this.version = Vue.gvUtil.getVersion();
    },

    methods: {
      // // 展开侧边栏
      openMenu() {
        if (this.isOpenMenuData) {
          this.isOpenMenuData = false;
        } else {
          this.isOpenMenuData = true;
        }
      },
      changeHome: function changeHome() {
        localStorage.setItem("_layoutType", "top");
        this.$store.commit("CHANGE_HOME", {
          type: "top",
        });
      },
      onHandleSelect: function onHandleSelect(a, b, c) {
        sessionStorage.setItem(
          "proxyMenu",
          c.$attrs.proxyUrl ? c.$attrs.proxyUrl : ""
        );
        window.reMethods = null;
        Vue.gvUtil.registerConfig("_" + a);
        // this.breadcrumbs = this.getBreadcrumbs(b);
        if (c.$attrs.proxyUrl) b[b.length - 1] = c.$attrs.proxyUrl;
        this.$store.commit("BREADCRUMBS", this.getBreadcrumbs(b));
        sessionStorage.setItem("headerTitleTop", this.breadcrumbs.join(","));
        // console.log(sessionStorage.getItem("headerTitleTop"));
      },
      getBreadcrumbs: function getBreadcrumbs(data) {
        var bcs = [];
        for (var n in data) {
          bcs.push(layoutService.getMenusNameForKey(data[n]));
        }
        return bcs;
      },
      onHandleOpen: function onHandleOpen() {},
      // 退出登录
      logout: function logout() {
        this.$confirm("确认退出吗?", "提示", {
          type: "warning",
        }).then(
          function () {
            var url = Vue.gvUtil.getUrl({
              apiName: "layoutAuthLogout",
              contextName: "auth",
            });
            Vue.gvUtil.http.get(url).then(
              function (res) {
                Vue.gvUtil.destroyApp(true);
              },
              function (res) {
                Vue.gvUtil.destroyApp(true);
              }
            );
          },
          function () {
            console.log("cance");
          }
        );
      },
      jump: function jump() {
        var menuValue = sessionStorage.getItem("menuValue");
        if (menuValue && menuValue !== "") {
          var menuValueSearch = Vue.gvUtil.getSearchJson(
              sessionStorage.getItem("menuValueSearch")
            ),
            r = {
              path: menuValue,
            };

          if (menuValueSearch) {
            r["query"] = menuValueSearch;
          }
          sessionStorage.removeItem("menuValue");
          sessionStorage.removeItem("menuValueSearch");
          // Vue.gvUtil.registerConfig('_' + menuValue, true, function() {
          Vue.gvUtil.redirectTo(r);
          // });
        }
      },
      // 折叠导航栏
      collapse: function collapse() {
        this.collapsed = !this.collapsed;
      },
      showMenu: function showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName(
          "submenu-hook-" + i
        )[0].style.display = status ? "block" : "none";
      },
      handleOpen: function handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose: function handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    },
    mounted: function mounted() {
      var user = sessionStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.userName || "";
      }
    },
  };
});
/**
 * 工作流弹窗
 * @author 计昕奇
 * @time 2020/11/01
 */
define("src/workflow/workflow-dialog.js", function (require, exports, module) {
  var temp = `<div><el-dialog class="choseNode" title="选择下一环节操作人/审批人" :visible.sync="nextNodeVisible"  style="font-size: 14px!important;" @close="close"
                width="60%" :close-on-click-modal='false'>
                <el-row v-if="showCode">
                  <span style="font-weight: bold;">{{showCodeLabel}}：</span>
                  <span class="copyItem" style="font-weight: bold;">{{code}}</span>
                </el-row>
                <el-row>
                  <el-row v-if="isShow" v-for="(item,index) in gwNextNodeExecutorsList">
                      <el-card>
                          <div class="choseNodeTitle" style="height:32px;font-size: 14px;">
                            <span>环节名称：{{item.name}}</span>
                            <el-checkbox v-if="type == '1'" style="float:right" label="" v-model="item.check"></el-checkbox>    
                          </div>
                          <el-row  :span="24" gutter="10" class="taskNode">
                               <el-checkbox-group v-model="checkboxGroup[index]" @change="handleChange(index,$index)">
                                 <el-checkbox style="background-color:#ecf5ff" :checked="type == '1'" :disabled="type == '1'" :key="$index" v-for="(itemExecotor,$index) in item.gwExecutorList"  :label="itemExecotor.executor_code" border>
                                 <div class="userinfo-pop">
                                      <div class="avatar-box" style="float:left;margin-top:-5px;">
                                          <img src="../../../../../dist/img/userpic.png" />
                                      </div>
                                  </div>
                                  <div style="margin-left: 28px;">
                                   {{itemExecotor.executor_name}}
                                   </div>
                                 </el-checkbox>
    
                               </el-checkbox-group>
                            <el-button class="gv-btn-primary" style="margin-left:1px;margin-top:5px" type="primary" v-if="item.bAssignable&&type != '1'" icon="el-icon-plus" @click="handleAddExecotor(index)"></el-button>
                        </el-row>
                      </el-card>
                  </el-row>
                  <el-button class="gv-btn-primary" style="float:right;margin-top:10px;" type="primary" size="medium" @click='confirmExecotor'>
                    {{'gBtnConfirm' | translate}}
                  </el-button>
                </el-row>
              </el-dialog>
             <el-dialog class="addDialog" title="选择用户" :visible.sync="jobsOpen" width="620px">
  
  <el-card>
    <el-table max-height="400" :data="form.sysUserList_W" @selection-change="handleSelectionPerson">
    {{form.sysUserList_W}}
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column prop="userCode" label="用户代码" sortable width="150">
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" sortable width="150">
      </el-table-column>
  
  
    </el-table>
    <el-row style="float:right;margin-top:10px">
      <el-button class="gv-btn-primary" type="primary" @click="clickExcutorConfirm">确定</el-button>
    </el-row>
    </el-card>
  </el-dialog>
  <el-dialog title="" width="90%" :visible.sync="isChoseExcutor">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="选择人员" name="first">
          <div  style="height: 70%;">
          <el-form :data="formSearchUser">
            <el-row :span="24" :gutter="10">
              <el-col :span="8">
                <el-form-item label-width="100px" label="用户名称">
                  <el-input v-model="formSearchUser.userName" placeholder=""></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="100px" label="用户代码">
                  <el-input v-model="formSearchUser.userCode" placeholder=""></el-input>
                
                </el-form-item>
              </el-col>

              
            </el-row>
            <el-row style="float:right;margin-right:50px">
              <el-button class="gv-btn-primary" type="primary" @click="queryUser">查询</el-button>
            </el-row>
             </el-form>
          <el-table max-height="300" :data="userData" @selection-change="handleSelectionJustUser">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="userName" label="用户名称" >
            </el-table-column>
            <el-table-column prop="userCode" label="用户代码" >
            </el-table-column>
            <el-table-column prop="companyName" label="所属机构" >
            </el-table-column>
            <el-table-column prop="post" label="岗位" >
            </el-table-column>
          
          
          </el-table>
           <el-row style="float:right;margin-right:50px;margin-top:10px">
              <el-button class="gv-btn-primary" type="primary" @click="clickCheckConfirm">确定</el-button>
            </el-row>
           
          </div>
        </el-tab-pane>
        <el-tab-pane label="选择岗位/人员" name="second">
        <el-row>
        <el-col :span="6">
        <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
         </el-input>
         </el-col>
         </el-row>
          <div class="bodyBox" style="height: 70%;">
          
            <div class="treeArea">
            
              <el-tree  :filter-node-method="filterNode" ref="elTree1" class="nav-tree" :data="data" :props="defaultProps" highlight-current
                :expand-on-click-node='false' @node-click="handleNodeClick" node-key="id" :default-expand-all="true">
              </el-tree>
            </div>
            <div class="tableArea" style="margin-top: 10px;">
              <div style="margin-bottom: 20px;">
                <span style="font-size: 14px;">选择岗位</span>
                <div style="float: right;display: flex;">
                  <!-- <el-input class="searchInput" v-model='tableDataQuery.positionCname' placeholder='请输入岗位名称'></el-input>
                  <el-button class="gv-btn-primary gv-btn-xs jobSearchBtn" type="primary" @click="handleSearch">
                    {{ 'gBtnSearch' | translate('Create') }}</el-button> -->
                </div>
              </div>
              <div class="jobsArea">
                <el-table class="jobsTable" max-height="500"  @selection-change="handleSelectionPosition"
                  :data="tableData" stripe style="width: 100%">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="positionCname" label="岗位名称" sortable width="100">
                  </el-table-column>
                  <el-table-column prop="positionCode" label="岗位编码" sortable width="100">
                  </el-table-column>
                  <el-table-column label="岗位状态" sortable>
                    <template #default='{ row }'>
                      {{Vue.gvUtil.translationData('ValidInd',row.positionStatus) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="岗位类型" sortable>
                    <template #default='{ row }'>
                      {{Vue.gvUtil.translationData('PositionCode',row.positionType) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="positionBuilt" label="内建岗位" sortable>
                    <template #default='{ row }'>
                      {{Vue.gvUtil.translationData('PositionBuilt',row.positionBuilt) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" sortable width="220">
                    <template slot-scope="scope">
                      <!-- <el-button class="gv-btn-primary gv-btn-xs" type="primary" @click="handleEdit(scope.row)">
                        {{ 'gBtnEdit' | translate('Create') }}</el-button> -->
                      <el-button class="gv-btn-primary gv-btn-xs" type="primary" @click="handleConfig(scope.row)">
                        选择人员</el-button>
                      <!-- <el-button class="gv-btn-warning gv-btn-xs" type="primary" @click="handleDelete(scope.row)">
                        {{ 'gBtnDelete' | translate('Create') }}</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
                <!-- <div class="planpage" style="width: 100%;margin-top: 8px;overflow: hidden;">
                  <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
                    :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length" :current-page.sync="currentPage">
                  </el-pagination>
                </div> -->
                
              </div>
               <el-row style="float:right;margin-bottom: 5px;">
                  <el-button class="gv-btn-primary" type="primary" @click="clickCheckConfirm">确定</el-button>
                </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="选择角色" name="three">
          <!-- <gv-data-table  max-height="400" ref="table" :table="table" :hasPage="false">
            <template v-slot:search="scope">
              <div class="gv-row">
                <gv-form-item key-name="roleCode" prop="roleCode">
                  <el-input class="elinput" v-model="scope.search.roleCode" placeholder="请输入"></el-input>
                </gv-form-item>
                <gv-form-item key-name="roleCName" prop="roleCName" isThree="true">
                  <el-input class="elinput" v-model="scope.search.roleCName" placeholder="请输入"></el-input>
                </gv-form-item>
                <gv-form-item key-name="upperSysName" prop="upperSysName" isThree="true" class="forInput">
                  <el-input class="elinput" v-model="scope.search.upperSysName" placeholder="请输入"></el-input>
                </gv-form-item>
  
              </div>
  
            </template>
  
          </gv-data-table> -->
          <div class="bodyBox" style="height: 70%;">
            <div class="treeArea">
              <el-tree ref="elTree" class="nav-tree" :data="data" :props="defaultProps" highlight-current
                :expand-on-click-node='false' @node-click="handleNodeClick" node-key="id" :default-expand-all="true">
              </el-tree>
            </div>
            <div class="tableArea" style="margin-top: 10px;">
              <div style="margin-bottom: 20px;">
                <span style="font-size: 14px;">选择角色</span>
                <div style="float: right;display: flex;">
          
                  <!-- <el-input class="searchInput" v-model='tableDataQuery.positionCname' placeholder='请输入岗位名称'></el-input>
                  <el-button class="gv-btn-primary gv-btn-xs jobSearchBtn" type="primary" @click="handleSearch">
                    {{ 'gBtnSearch' | translate('Create') }}</el-button> -->
                </div>
              </div>
              <div class="jobsArea">
                <el-table class="jobsTable" max-height="500" @selection-change="handleSelectionRole" :data="tableData1" stripe
                  style="width: 100%">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="roleCName" label="角色名称" sortable>
                  </el-table-column>
                  <el-table-column prop="roleCode" label="角色编码" sortable>
                  </el-table-column>
                </el-table>
                <!-- <div class="planpage" style="width: 100%;margin-top: 8px;overflow: hidden;">
                            <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
                              :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                              :total="tableData.length" :current-page.sync="currentPage">
                            </el-pagination>
                          </div> -->
                <el-row style="float:right;margin-bottom: 5px;">
                  <el-button class="gv-btn-primary" type="primary" @click="clickCheckConfirm">确定</el-button>
                </el-row>
          
          
              </div>
            </div>
          </div>
          <!-- <el-form :data="formSearch">
            <el-row :span="24" :gutter="10">
              <el-col :span="8">
                <el-form-item label-width="100px" label="角色代码">
                  <el-input v-model="formSearch.roleCode" placeholder=""></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="100px" label="角色名称">
                  <el-input v-model="formSearch.roleCName" placeholder=""></el-input>
                
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="100px" label="所属子系统">
                  <el-input v-model="formSearch.upperSysName" placeholder=""></el-input>
                
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row style="float:right">
              <el-button class="gv-btn-primary" type="primary" @click="queryRole">查询</el-button>
            </el-row>
             </el-form>
          <el-table max-height="300" :data="roleData" @selection-change="handleSelectionRole">
            <el-table-column type="selection" width="100"></el-table-column>
            <el-table-column prop="roleCode" label="角色代码" >
            </el-table-column>
            <el-table-column prop="roleCName" label="角色名称" >
            </el-table-column>
            <el-table-column prop="upperSysName" label="所属子系统名称" >
            </el-table-column>
          
          
          </el-table> -->
          <!-- <el-row style="float:right;margin-top:10px">
            <el-button class="gv-btn-primary" type="primary" @click="clickCheckConfirm">确定</el-button>
          </el-row> -->
        
  
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-dialog>
              </div>
              `;
  return {
    template: temp,
    data: function data() {
      return {
        filterText: "",
        isShow: false,
        checkboxGroup: [],
        flagI: 0,
        activeName: "first",
        nextNodeVisible: false,
        gwNextNodeExecutorsList: [],
        positionCode: "",
        type: "0",
        apiName: "confirmExecotorInner",
        showCode: false,
        code: "",
        showCodeLabel: "",
        approvalOpinion: "",
        dialogVisible: false,
        tableData1: [],
        gwNextNodeExecutorsListCopy: {},
        p_corp_pk: "",
        r_corp_pk: "",
        lindex: 0,
        formSearch: {
          roleCode: null,
          roleCName: null,
          upperSysName: null,
        },
        formSearchUser: {
          userName: null,
          userCode: null,
        },
        roleData: [],
        table: {
          basic: {
            api: "saaRoleQuery", //分页列表请求api
            vo: "saaRoleList", //分页列表返回的vo
            context: "auth", //分页列表请求上下文
            singleElection: false, //是否支持单选  获取选中数据 this.$refs.table.getSelectData()
            multipleElection: true, //是否支持多选  获取选中数据 this.$refs.table.getSelectData()
            execl: {
              isShow: false,
              fileName: "testExecl",
              exclude: ["Operation"],
            }, //导出按钮控制，不需要可以删除此属性
          },
          formSearch: {
            //查询域元数据
            roleCode: null,
            roleCName: null,
            upperSysName: null,
          },
          fields: [{
              //结果列表配置，一个对象一列
              prop: "roleCode",
              labelKey: "roleCode", //国际化key
            },
            {
              //结果列表配置，一个对象一列
              prop: "roleCName",
              labelKey: "roleCName", //国际化key
            },
            {
              prop: "upperSysName",
              labelKey: "upperSysName",
            },
            {
              prop: "validInd",
              labelKey: "validInd",
              format: {
                type: "ggcode",
                codeType: "ValidInd",
              },
            },
            {
              prop: "creatorCode",
              labelKey: "creatorCode",
            },
            {
              prop: "createTime",
              labelKey: "createTime",
            },
          ],
        },
        open: false,
        jobsOpen: false,
        isEdit: false,
        isChoseExcutor: false,
        selectPosition: [],
        selectPerson: [],
        selectRole: [],
        selectJustUser: [],
        form: {
          organization: "01",
          positionStatus: "1",
          positionBuilt: "1",
          sysUserList_Y: [],
          sysUserList_N: [],
          sysUserList_W: [],
        },
        tableDataQuery: {
          positionCname: "",
        },
        rules: {
          organization: [{
            trigger: "change",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
          positionCname: [{
            trigger: "blur",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
          positionType: [{
            trigger: "change",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
          positionCode: [{
            trigger: "blur",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
          positionStatus: [{
            trigger: "blur",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
          positionBuilt: [{
            trigger: "blur",
            required: true,
            message: Vue.gvUtil.getInzTranslate("gValidateRequired"),
          }, ],
        },
        userData: [],
        positionTypeOptions: [{
            value: "1",
            label: "类型1",
          },
          {
            value: "2",
            label: "类型2",
          },
        ],
        pageSize: 10,
        currentPage: 1,
        fromFilters: {},
        data: [],
        defaultProps: {
          children: "children",
          label: "clabel",
        },
        tableData: [],
        jobListProp: {
          key: "userCode",
          label: "userName",
        },
      };
    },
    props: {},
    computed: {},
    created: function created() {
      //   ////debugger;
    },

    methods: {
      queryUser() {
        var _this = this,
          url = Vue.gvUtil.getUrl({
            apiName: "workFlowQueryUser",
            contextName: "product",
          });
        Vue.gvUtil.http.post(url, this.formSearchUser).then(function (res) {
          //////debugger
          if (res.resCode === "0000") {
            _this.userData = res.resData.sysUserVoList;
          } else {
            _this.$message.error("查询用户失败");
          }
        });
      },
      handleSelectionJustUser(val) {
        this.selectJustUser = val;
      },
      close() {
        this.nextNodeVisible = false;
        this.$eventBus.$emit("setSaveFlag");
      },
      handleClose(index, $index) {
        if (this.gwNextNodeExecutorsList[index].gwExecutorList.length <= 1) {
          this.$message.error("至少选择一个操作人");
          return;
        }
        this.gwNextNodeExecutorsList[index].gwExecutorList.splice($index, 1);
      },
      handleChange(index, $index) {
        // ////debugger;
        if (this.checkboxGroup[index].l)
          if (this.gwNextNodeExecutorsList[index].gwExecutorList.length <= 1) {
            this.$message.error("至少选择一个操作人");
            return;
          }
        this.gwNextNodeExecutorsList[index].gwExecutorList.splice($index, 1);
      },
      queryRole() {
        var _this = this,
          url = Vue.gvUtil.getUrl({
            apiName: "saaRoleQuery",
            contextName: "auth",
          });
        Vue.gvUtil.http.post(url, this.formSearch).then(function (res) {
          //////debugger
          if (res.resCode === "0000") {
            _this.roleData = res.resData.saaRoleList.content;
          } else {
            _this.$message.error("查询角色失败");
          }
        });
      },
      treeselect(node, instanceId) {
        // console.log(node);
        if (node.id) {
          this.form.upperName = node.clabel;
          // this.getUpperSys(node.id)
        }
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.clabel,
          children: node.children,
        };
      },
      cancel() {
        this.open = false;
        this.jobsOpen = false;
      },
      handleSelectionPosition(val) {
        //////debugger
        this.selectPosition = val;
      },
      handleSelectionRole(val) {
        //////debugger
        this.selectRole = val;
      },
      // 判断arr是否为一个数组，返回一个bool值
      isArray(arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
      },
      // 深度克隆
      deepClone(obj) {
        if (typeof obj !== "object" && typeof obj !== "function") {
          return obj; //原始类型直接返回
        }
        var o = this.isArray(obj) ? [] : {};
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === "object" ? this.deepClone(obj[i]) : obj[i];
          }
        }
        return o;
      },
      checkExist(code, type) {
        for (
          var i = 0; i < this.gwNextNodeExecutorsList[this.lindex].gwExecutorList.length; i++
        ) {
          if (
            this.gwNextNodeExecutorsList[this.lindex].gwExecutorList[i]
            .executor_code == code &&
            this.gwNextNodeExecutorsList[this.lindex].gwExecutorList[i]
            .executor_type_code == type
          ) {
            return false;
          }
        }
        return true;
      },
      clickCheckConfirm() {
        //////debugger
        // this.gwNextNodeExecutorsList = this.gwNextNodeExecutorsListCopy
        if (this.selectPerson.length > 0) {
          this.selectPerson.forEach((item) => {
            var obj = {};
            obj.executor_type_code = "4";
            obj.executor_code = item.userCode;
            obj.executor_name = item.userName;
            if (this.checkExist(obj.executor_code, obj.executor_type_code)) {
              this.gwNextNodeExecutorsList[this.lindex].gwExecutorList.push(
                obj
              );
              this.checkboxGroup[this.lindex].push(obj.executor_code);
            }
          });
        }
        if (this.selectJustUser.length > 0) {
          this.selectJustUser.forEach((item) => {
            var obj = {};
            obj.executor_type_code = "4";
            obj.executor_code = item.userCode;
            obj.executor_name = item.userName;
            if (this.checkExist(obj.executor_code, obj.executor_type_code)) {
              this.gwNextNodeExecutorsList[this.lindex].gwExecutorList.push(
                obj
              );
              this.checkboxGroup[this.lindex].push(obj.executor_code);
            }
          });
        }
        if (this.selectPosition.length > 0) {
          //   ////debugger;
          this.selectPosition.forEach((item) => {
            var obj = {};
            obj.executor_type_code = "3";
            obj.executor_code = item.positionCode;
            obj.executor_pk = item.id;
            obj.executor_corp_pk = this.p_corp_pk;
            obj.executor_name = item.positionCname;
            if (this.checkExist(obj.executor_code, obj.executor_type_code)) {
              this.gwNextNodeExecutorsList[this.lindex].gwExecutorList.push(
                obj
              );
              this.checkboxGroup[this.lindex].push(obj.executor_code);
            }
          });
        }
        if (this.selectRole.length > 0) {
          this.selectRole.forEach((item) => {
            var obj = {};
            obj.executor_type_code = "5";
            obj.executor_code = item.roleCode;
            obj.executor_pk = item.id;
            obj.executor_corp_pk = this.r_corp_pk;
            obj.executor_name = item.roleCName;

            if (this.checkExist(obj.executor_code, obj.executor_type_code)) {
              this.gwNextNodeExecutorsList[this.lindex].gwExecutorList.push(
                obj
              );
            }
          });
        }

        this.isChoseExcutor = false;
      },

      clickRoleConfirm() {},
      clickExcutorConfirm() {
        this.jobsOpen = false;
      },
      handleSelectionPerson(val) {
        //////debugger
        this.selectPerson = val;
      },
      submitForm(apiName) {
        if (apiName == "saaPositionSaveOrUpdate") {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.submitPost(apiName);
              this.getTableData(this.tableDataQuery);
              this.getTreeData();
              this.getFunType();
            }
          });
        } else {
          this.submitPost(apiName);
        }
      },
      submitPost(apiName) {
        var _this = this,
          url = Vue.gvUtil.getUrl({
            apiName,
            contextName: "auth",
          });
        Vue.gvUtil.http.post(url, this.form).then((res) => {
          if (res.resCode == "0000") {
            if (_this.form.id == undefined) {
              _this.$message.success("保存成功");
              this.$refs.table.onGetList();
              this.open = false;
              this.jobsOpen = false;
            } else {
              _this.$message.success("修改成功");
              this.getTableData(this.tableDataQuery);
              this.$refs.table.onGetList();
              this.open = false;
              this.jobsOpen = false;
            }
          } else {
            this.$message.error("操作失败！");
          }
          // _this.tableData = res.resData.businessList.content
          // _this.page.total = res.resData.businessList.total
        });
      },
      handleNodeClick(node) {
        // //////debugger
        // console.log(node);
        this.tableDataQuery = {
          positionCname: "",
          organization: node.code,
        };
        this.getTableData(this.tableDataQuery);
        // if(this.isEdit) {
        //   this.handleEdit(node)
        // } else {

        //   if (node.id) {
        //     this.form.upperId = node.id
        //     this.form.upperName = node.clabel
        //     this.getUpperSys(node.id)
        //   }
        // }
      },
      // 新增
      handleAdd() {
        this.open = true;
        (this.form = {
          organization: "01",
          positionStatus: "1",
          positionBuilt: "1",
          sysUserList_Y: [],
          sysUserList_N: [],
        }),
        (this.form = Object.assign(this.form, {
          organization: this.$refs.elTree.getCurrentKey(),
        }));
        setTimeout(() => {
          this.$refs.form.clearValidate();
        });
      },
      // 编辑
      async handleEdit(row) {
        //////debugger
        let {
          resData
        } = await this.getJobsDetail(row);
        this.form = resData;
        this.isEdit = true;
        this.open = true;
      },
      // 配置
      async handleConfig(row) {
        let {
          resData
        } = await this.getJobsDetail(row);
        this.form = resData;
        this.jobsOpen = true;
      },
      // 删除
      handleDelete(row) {
        var _this = this;
        Vue.gvUtil
          .confirm({
            msg: "是否确定要删除这条数据？",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
          })
          .then(
            function () {
              // console.log('点击确认按钮')
              var url = Vue.gvUtil.getUrl({
                apiName: "saaPositionDeleteById",
                contextName: "auth",
                urlParams: {
                  id: row.id,
                },
              });
              Vue.gvUtil.http.get(url).then((res) => {
                if (res.resCode == "0000") {
                  _this.$message.success("删除成功");
                  _this.getTableData(_this.tableDataQuery);
                } else {
                  _this.$message.error("操作失败！");
                }
              });
            },
            function () {
              // console.log('点击关闭');
            }
          );
      },
      // 搜索
      handleSearch() {
        this.getTableData(this.tableDataQuery);
      },
      // 获取岗位详情接口
      getJobsDetail(row) {
        var url = Vue.gvUtil.getUrl({
          apiName: "saaPositionFindById",
          contextName: "auth",
          urlParams: {
            id: row.id,
          },
        });
        return Vue.gvUtil.http.get(url);
      },
      onHandleSizeChange() {},
      onHandleCurrentChange() {},
      // 岗位列表查询
      getTableData(obj) {
        // ////debugger;
        if (obj.organization == "") {
          return;
        }

        if (!this.isRole) {
          this.p_corp_pk = obj.organization.replace(/\s*/g, "");
          var url = Vue.gvUtil.getUrl({
            apiName: "saaPositionQuery",
            contextName: "auth",
          });
          Vue.gvUtil.http.post(url, obj).then((res) => {
            this.tableData = res.resData;
          });
        } else {
          this.r_corp_pk = obj.organization.replace(/\s*/g, "");
          var url = Vue.gvUtil.getUrl({
            apiName: "saaRoleQuery",
            contextName: "auth",
          });
          Vue.gvUtil.http
            .get(url, {
              params: {
                organization: obj.organization,
              },
            })
            .then((res) => {
              this.tableData1 = res.resData.list;
            });
        }
      },
      // 组织机构树查询
      getTreeData() {
        var url = Vue.gvUtil.getUrl({
          apiName: "saaFindCompanyTree",
          contextName: "auth",
        });
        Vue.gvUtil.http.post(url).then((res) => {
          this.data = [{
            code: "",
            clabel: "全部",
            children: res.resData.children,
          }, ];
        });
      },
      getFunType() {
        var url = Vue.gvUtil.getUrl({
          apiName: "saaFunType",
          contextName: "auth",
        });
        Vue.gvUtil.http.post(url, {}).then((res) => {
          // console.log(res);
          this.positionTypeOptions = res.resData.ggCodeVoList.find((e) => {
            return e.codeType == "PositionCode";
          }).ggCodeList;
        });
      },
      // handleClose(index, $index) {
      //     if (this.gwNextNodeExecutorsList[index].gwExecutorList.length <= 1) {
      //         this.$message.error("至少选择一个操作人")
      //         return
      //     }
      //     this.gwNextNodeExecutorsList[index].gwExecutorList.splice($index, 1)

      // },
      handleAddExecotor(index) {
        this.queryUser();

        //this.$message.success("hahhahahahahhhaah")
        this.selectRole = [];
        this.selectPerson = [];
        this.selectPerson = [];
        this.lindex = index;
        this.isChoseExcutor = true;
      },

      handleClick(tab, event) {
        if (tab.index == 2) {
          this.isRole = true;
          this.getTreeData();
        } else {
          this.isRole = false;
          this.getTreeData();
        }
      },
      // handleAddExecotor() {
      //
      //   //this.$message.success("hahhahahahahhhaah")
      //     this.dialogVisible = true

      // },
      goWorkBeach(workFlowConfig) {
        this.nextNodeVisible = false;
        this.$router.push({
          name: "workbenchApp",
          params: {
            workFlowConfig,
          },
        });
      },
      confirmExecotor() {
        // 0 提交 1 审核驳回
        // ////debugger;
        this.checkboxGroup1;
        if (this.type == "1") {
          this.gwNextNodeExecutorsList[0].reject = true;
          this.gwNextNodeExecutorsList[0].approvalOpinion =
            this.approvalOpinion;
          var f = 0;
          this.gwNextNodeExecutorsList.map((item) => {
            if (item.check) {
              f++;
            }
          });
          if (f != 1) {
            this.$message.error("请勾选一个需要驳回到的环节");
            return;
          }
        } else {
          for (var i = 0; i < this.gwNextNodeExecutorsList.length; i++) {
            if (this.checkboxGroup[i].length == 0) {
              this.$message.error("请至少选择一个操作人");
              return;
            }
            for (
              var j = 0; j < this.gwNextNodeExecutorsList[i].gwExecutorList.length; j++
            ) {
              var f = 0;
              for (var m = 0; m < this.checkboxGroup[i].length; m++) {
                if (
                  this.gwNextNodeExecutorsList[i].gwExecutorList[j]
                  .executor_code == this.checkboxGroup[i][m]
                ) {
                  f = 1;
                  break;
                }
              }
              if (f == 0) {
                this.gwNextNodeExecutorsList[i].gwExecutorList.splice(j, 1);
                j--;
              }
            }
            //this.gwNextNodeExecutorsList[i].gwExecutorList.splice($index, 1)
          }
        }

        var url = Vue.gvUtil.getUrl({
          apiName: this.apiName,
          contextName: "product",
        });
        this.gwNextNodeExecutorsList.forEach((item) => {
          //   ////debugger;
          if (!item.taskNo) {
            item.taskNo = sessionStorage.getItem("pto");
          }
        });
        Vue.gvUtil.http.post(url, this.gwNextNodeExecutorsList).then((res) => {
          if (res.resCode === "0000") {
            if (!res.resData) {
              var workFlowConfig = {
                isSendEmail: false,
              };
              if (
                this.gwNextNodeExecutorsList[0].code == "0902" ||
                this.gwNextNodeExecutorsList[0].code == "1301"
              ) {
                workFlowConfig.isSendEmail = true;
                workFlowConfig.embedCode =
                  this.gwNextNodeExecutorsList[0].innerRefNo;
              }
              this.goWorkBeach(workFlowConfig);
            } else {
              this.$message.error(res.resData.wmsg);
              this.nextNodeVisible = false;
            }
          }
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.clabel.indexOf(value) !== -1;
      },
    },
    watch: {
      "$store.state.workflow": function (val) {
        // ////debugger;
        this.checkboxGroup = [];
        this.gwNextNodeExecutorsList = val.gwNextNodeExecutorsList;
        this.gwNextNodeExecutorsList.forEach((item) => {
          this.checkboxGroup.push([]);
        });
        this.isShow = true;

        this.nextNodeVisible = val.show;
        this.type = val.type;
        (this.apiName = val.apiName ? val.apiName : "confirmExecotorInner"),
        (this.showCode = val.showCode),
        (this.code = val.code),
        (this.showCodeLabel = val.showCodeLabel),
        (this.approvalOpinion = val.approvalOpinion);
      },
      filterText(val) {
        this.$refs.elTree1.filter(val);
      },
    },
    mounted: function mounted() {},
  };
});

/**
 * 流程轨迹图弹窗
 * @author 徐博学
 * @time 2020/11/01
 */
define("src/workflow/trail-dialog.js", function (require, exports, module) {
  var temp = `<el-dialog class="choseNode" :title="'flowChart' | translate" :visible.sync="nextNodeVisible" style="font-size: 14px!important;" width="80%" :close-on-click-modal='false'>
                    <div>
                        <header class="workflow-explain"  v-if='isShow'>
                            <div class="workflow-name">{{'flowName' | translate}}：<span>{{flowName}}</span></div>
                            <ul class="workflow-legend">
                            <li class="finish">{{'completedLinks' | translate}}：</li>
                            <li class="approvaling">{{'approvalingLinks' | translate}}：</li>
                            <li class="unreaches">{{'notArrivedLinks' | translate}}：</li>
                            </ul>
                        </header>
                        <section class="workflow-container">
                            <div style="width: 100%; overflow-x: auto;" v-if='isShow'>
                                <div class="process-operation" id="summaryContent" v-html="childrenNode"></div>
                            </div>
                            <div style="padding: 10px 2px;overflow: hidden;">
                                <el-table :data="auditList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                                    <el-table-column type="index" :index='indexMethod' :label="'gNumber' | translate" width="60"></el-table-column>
                                    <el-table-column :label="'linkName' | translate">
                                        <template slot-scope="scope">
                                            {{handleActivityName(scope.row.activity_name)}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="'checkStatus' | translate">
                                        <template slot-scope="scope">
                                            {{translateCheckStatus(scope.row.approve_type_code)}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="'Sponsor' | translate" prop="originate_name"></el-table-column>
                                    <el-table-column :label="'launchTime' | translate">
                                        <template slot-scope="scope">
                                            {{scope.row.originate_time | time('dd-MM-yyyy HH:mm:ss')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="'approval' | translate" prop="approver_name"></el-table-column>
                                    <el-table-column :label="'approvalTime' | translate">
                                        <template slot-scope="scope">
                                            {{scope.row.approve_ts | time('dd-MM-yyyy HH:mm:ss')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="'approveOpinion' | translate">
                                        <template slot-scope="scope">
                                            <el-popover trigger="hover" placement="top" width="200">
                                                <p>{{scope.row.opinion}}</p>
                                                <div slot="reference" class="name-wrapper">
                                                    <span>{{ interceptOpinion(scope.row.opinion) }}</span>
                                                </div>
                                            </el-popover>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination style="float: right; padding:5px 10px;" small @size-change="onHandleSizeChange" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper" :total="auditList.length" :current-page.sync="currentPage">
                                </el-pagination>
                            </div>
                        </section>
                    </div>
                </el-dialog>`;
  return {
    template: temp,
    data: function data() {
      return {
        innerRefNo: "",
        typeCode: "",
        nextNodeVisible: false,
        flowName: "",
        auditList: [],
        childrenNode: "",
        currentPage: 1,
        pageSize: 10,
        isShow: true,
      };
    },
    methods: {
      getTrailInfo() {
        var obj = {
          innerRefNo: this.innerRefNo.innerRefNo.innerRefNo,
          billTypeCode: this.innerRefNo.innerRefNo.billTypeCode,
        };
        if (this.innerRefNo.innerRefNo.activityInstancePk) {
          if (this.innerRefNo.innerRefNo.activityInstancePk == "reject") {
            var url = Vue.gvUtil.getUrl({
              apiName: "zbgetWorkflow",
              contextName: "selfins", //自保修改
            });
          } else if (this.innerRefNo.activityInstancePk != "reject") {
            var url = Vue.gvUtil.getUrl({
              apiName: "getWorkflow",
              contextName: "selfins", //自保修改
            });
          }
          Vue.gvUtil.http.post(url, obj).then((res) => {
            if (res.resCode === "0000") {
              var workbenchVoList = res.resData.objectHistory;
              if (!workbenchVoList) {
                this.$message.error("暂未开启工作流");
                return;
              }
              if (res.resData.objectHistory.workFlowDefForProcessChar) {
                this.isShow = true;
                this.$nextTick(() => {
                  workbenchVoList.workFlowApproveHistory.forEach(
                    (i, k, arr) => {
                      if (k == 0) {
                        i.originate_name = i.approver_name;
                        i.originate_time = i.approve_ts;
                      } else {
                        i.originate_name = arr[k - 1].approver_name;
                        i.originate_time = arr[k - 1].approve_ts;
                      }
                    }
                  );
                  this.auditList = workbenchVoList.workFlowApproveHistory;
                  this.flowName =
                    workbenchVoList.workFlowDefForProcessChar.workflow_def_name;
                  this.childrenNode = this.WorkFlowDefForProcessCharLevel1(
                    workbenchVoList.workFlowDefForProcessChar
                  );
                });
              } else {
                this.isShow = false;
                this.$nextTick(() => {
                  res.resData.objectHistory.forEach((i, k, arr) => {
                    if (k == 0) {
                      i.originate_name = i.approver_name;
                      i.originate_time = i.approve_ts;
                    } else {
                      i.originate_name = arr[k - 1].approver_name;
                      i.originate_time = arr[k - 1].approve_ts;
                    }
                  });
                  this.auditList = res.resData.objectHistory;
                });
              }
              this.nextNodeVisible = true;
            }
          });
        }
      },
      translateCheckStatus(code) {
        const CHECKSTATUSLIST = {
          submit: "发起流程",
          pass: "通过",
          recall: "拒绝",
          reject: "驳回",
          approving: "进行中",
          finished: "结束",
        };
        return CHECKSTATUSLIST[code];
      },
      indexMethod(index) {
        index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return index;
      },
      onHandleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
      },
      interceptOpinion(val) {
        if (typeof val != "string") return "";
        return val.length > 10 ? val.substr(0, 10) + "..." : val;
      },
      handleActivityName(str) {
        return str == "发起人" ? "开始" : str;
      },
      WorkFlowDefForProcessCharLevel1(process) {
        var html = "";
        var processItems = process.process_level_1_list;
        html +=
          "<div class='process-star process-common'>" +
          "<div class='model-back'><i style='font-size: 25px' class='el-icon-user'></i></div>" +
          "<div style='margin-top: 5px;'>开始</div>" +
          " </div><div>>></div>";
        processItems.map((processItem, processIndex) => {
          var className =
            processItem.process_level_2_list &&
            processItem.process_level_2_list.length > 1 ?
            "" :
            "";
          html +=
            "<div class='process-level process-level-1 " + className + "'>";
          html += this.WorkFlowDefForProcessCharLevel2(processItem);
          html += "</div>";
          html += "<div>>></div>";
          return html;
        });
        let isfinishClass = process.b_approve_finished ?
          "finishedP" :
          "not-arriving";
        html +=
          "<div class='process-star process-common'>" +
          "<div class='model-back " +
          isfinishClass +
          "'><i style='font-size: 25px' class='el-icon-user'></i></div> " +
          "<div style='margin-top: 5px;'>结束</div> " +
          "</div>";
        return html;
      },
      WorkFlowDefForProcessCharLevel2(processItem) {
        var html = "";
        var processLevel2Items = processItem.process_level_2_list;
        processLevel2Items.map((processLevel2Item, processLevel2Index) => {
          var className =
            processLevel2Item.process_level_3_list &&
            processLevel2Item.process_level_3_list.length > 1 ?
            "" :
            "";
          html +=
            "<div class='process-level process-level-2" + className + "'>";
          html += this.WorkFlowDefForProcessCharLevel3(processLevel2Item);
          html += "</div>";
          return html;
        });
        return html;
      },
      WorkFlowDefForProcessCharLevel3(processLevel2Item) {
        var html = "";
        var processLevel3Items = processLevel2Item.process_level_3_list;
        processLevel3Items.map((processLevel3Item, processLevel3Index) => {
          var className =
            processLevel3Item.process_level_4_list &&
            processLevel3Item.process_level_4_list.length > 1 ?
            "" :
            "";
          html +=
            "<div  class='process-level process-level-3 " + className + "'>";
          html += this.WorkFlowDefForProcessCharLevel4(processLevel3Item);
          html += "</div>";
          // if (processLevel3Item.process_level_4_list.length != (processLevel3Index + 1)) {
          //     html += "<div  style='width: 30px;float: left;height: 30px;margin-top: 25%;'>>></div>";
          // }
          if (processLevel3Items.length != processLevel3Index + 1) {
            html += "<div  style='float: left;line-height: 100px'>>></div>";
          }
          return html;
        });
        return html;
      },
      WorkFlowDefForProcessCharLevel4(processLevel3Item) {
        var html = "";
        var processLevel4Items = processLevel3Item.process_level_4_list;
        processLevel4Items.map((processLevel4Item, processLevel4Index) => {
          // console.log(processLevel4Item);
          var className =
            processLevel4Item.activity_list &&
            processLevel4Item.activity_list.length > 1 ?
            "" :
            "";
          html +=
            " <div  class='process-level process-level-4 " + className + "'>";
          html += this.WorkFlowDefForProcessCharLevel5(processLevel4Item);
          //html += "<div style='width:50px;height:50px;background-color:#646234'></div>";
          html += "</div>";
          return html;
        });
        return html;
      },
      WorkFlowDefForProcessCharLevel5(processLevel4Item) {
        var activity_list = processLevel4Item.activity_list;
        var html = "";
        if (activity_list != null && activity_list.length > 0) {
          activity_list.map((activityItem, activityIndex) => {
            var excytor = "";
            if (activityItem.executor_instance_list instanceof Array) {
              activityItem.executor_instance_list.map((executor) => {
                return (excytor +=
                  executor.executor_person_name +
                  "-" +
                  executor.executor_corp_name +
                  "/" +
                  executor.executor_dept_name +
                  (!executor.executor_post_name ?
                    "" :
                    "/" + executor.executor_post_name) +
                  ";");
              });
            }
            html += "<div class='model-level-5' title='" + excytor + "'>";
            html +=
              "<div class='model-back " +
              activityItem.approve_status +
              "'><i style='font-size: 25px' class='el-icon-user'></i></div>";
            html += "<span>" + activityItem.name + "</span>";
            if (activityItem.executor_instance_list instanceof Array) {
              activityItem.executor_instance_list.map((executor) => {
                return (html +=
                  "<br/><span>" + executor.executor_person_name + "</span>");
              });
            }
            html += "</div>";
            if (processLevel4Item.activity_list.length != activityIndex + 1) {
              html += "<div style='margin-top: 20%;'>>></div>";
            }
            return html;
          });
        }
        return html;
      },
    },
    watch: {
      "$store.state.trailInfo": function (val) {
        //   this.nextNodeVisible = val.show;
        this.innerRefNo = val;
        this.typeCode = val.billTypeCode;
        this.getTrailInfo();
      },
    },
  };
});