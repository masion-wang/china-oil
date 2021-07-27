/**
 * 功能管理主页面
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var temp = require("./index.html"),
    menuAdd = require("./components/menuAddIndex"),
    sendEmail = require("../../sys/message/messageModelApp/components/messageSendEmail");
  style1 = document.createElement("style");
  style1.innerHTML =
    ".el-table .overdue-warning-row{background-color: #f2dede}";
  document.head.appendChild(style1);
  var config = {
    api: {
      workbenchTaskSearch: "/gwWorkTask/getTaskList", //自保系统  自保修改
      // 'workbenchTaskSearch': '/gwWorkbench/queryTasksByUser',
      workbenchTaskSearchCond: "/gwWorkbench/queryTasksByTaskNoOrInnerRefNo",
      workbenchTaskStatusChange: "/gwWorkbench/changeTaskStatus",
      workbenchTaskHistory: "/workbench/find_task_history",
      workbenchSearchTaskHis: "/workbench/search_task_history",
      workbenchTaskIdHistory: "/workbench/find_taskid_history",
      workbenchAcceptTask: "/workbench/accept_task",
      getReminderMsg: "/gg_message/find_gtmessage", // 获取提醒消息
      updateReadStatus: "/gg_message/updateReadStatus", // 更新已读未读状态
      getReminderMsgInfo: "/gg_message/find_gtmessageinfo", // 加载更多
      getShowView: "/workbench/show_view", // 图表加载
      updateGtMessageStatus: "/gg_message/update_gtmessage_status/{messageId}",
      findSelfDefineInfo: "/workbench/self_define/find_all_choose",
      addSelfDefineInfo: "/workbench/self_define/add",
      deleteSelfDefineMenus: "/workbench/self_define/delete",
      sysMenuSearch: "/menu/find_by_system_code/{platform}",
      findSelfDefineMenuForUser: "/workbench/self_define/find_user_choose",
      getReminderDaysOfExpiredPassword: "/jwt/check_password_expire",
      removeGgmessage: "/gg_message/remove_ggmessage/{messageid}",
      workbenchGetStatistics: "/workbench/get_statistics",
      workbenchFindTaskNo: "/gwWorkbench/findTaskNo",
      workbenchQueryRemind: "/gwWorkbench/queryRemind",
      workbenchRemindChangeStatus: "/gwWorkbench/changeRemindStatus",
      workbenchDeleteRemind: "/gwWorkbench/deleteRemindById/{messageId}",
      workbenchTaskKindSearch: "/gwWorkbench/queryTasksKindByUser",
      ggsearch: "/common/search/report", //模糊搜索
    },
  };
  Vue.gvUtil.setApi(config.api);

  return Vue.gvUtil.Page({
    template: temp,
    name: "workbenchApp",
    components: {
      menuAdd: menuAdd,
      sendEmail: sendEmail,
    },
    params: function () {
      return {
        cliNum: 100,
        iframeWidth: "100%",
        iframeHeight: "100px",
        mHight: "388px",
        style: "margin:5px 0px",
        addOrDelete: true,
        reminderLoading: true,
        messageLoading: true,
        isOpen: true,
      };
    },
    prop: {
      // 菜单数据
      menudata: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    datas: function () {
      return {
        pendingTasks: 0,
        processingTasks: 0,
        processedTasks: 0,
        clickNodeName: "",
        taskkindNum: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        taskKind: null,
        activeIndex: "1", //菜单激活
        openSearchClass: false, //输入框样式
        menusdData: [], //菜单
        isChangeMenu: true, //是否为左侧菜单
        restaurants: [],
        state1: "", //输入建议
        searchData: [], //搜索结果
        menusClass: [
          //菜单背景图样式
          "ss1",
          "ss2",
          "ss3",
          "ss4",
          "ss5",
          "ss6",
          "ss7",
          "ss8",
        ],
        menusIconClass: [
          //菜单icon样式
          "icon3",
          "icon2",
          "icon4",
          "icon1",
          "icon5",
          "icon6",
          "icon7",
          "icon8",
        ],
        remindContent: "",
        vehicleForm: {
          authenticateCode: "",
          vehicleNo: "",
        },
        reportForm: {
          reportNo: "",
          policyNo: "",
        },
        workbenchVoList: [],
        allList: "", //排序时的数据
        loading: false,
        tabs: [
          "workbenchAppVoTodayTask",
          "workbenchAppVoOvertimeTask",
          "workbenchAppVoPending",
          "workbenchAppVoProcessing",
          "workbenchAppVoProcessed",
        ],
        status: "",
        show: false,
        total: "",
        reminderMsgList: [], // 已读提醒消息列表
        allReminderMsgList: [], // 所有未读消息列表
        reminderMsgListNoRead: [], // 未读消息列表
        reminderMsgListNoReadE: [],

        isShowFull: false,
        isShowFullMsg: false,
        ReminderIndex: "",
        msgIndex: "",
        menusForUser: [],
        // cxl
        layoutType: "", // 增加一个标识,是否隐藏flex-l
        msgListRead: [], // 已读消息列表
        allMsgListNoRead: [], // 所有未读消息列表
        msgListNoRead: [], // 未读消息列表
        msgListNoReadPriority: [], // 未读消息列表，优先级为高的
        transferTypeMsg: "04", // 站内信
        transferTypeReminderMsg: "04", // 站内信
        showView: "", // 图表
        taskHandlerVo: {
          taskId: "",
          businessId: "",
          handlerCode: "",
          handlerRole: "",
          status: "",
        },
        tasksProcessedToday: "",
        tasksProcessedThisMonth: "",
        efficiencyofThisMonth: "",
        totalTaskCompletionRate: "",
        searchField: null,
        showRemindDialog: false,
        Query: "",
        showAllRemindDialog: false,
        workbenchVoMsgList: [],
        msgPageSize: 10, // 提醒消息每页数量
        msgPageNo: 0,
        sendEmailDialog: false,
        embedCode: "",
      };
    },
    // computed: {
    //     menus: function menus() {
    //         return Vue.gvUtil.getCache('menu');
    //     }
    // },
    mounted: function () {
      var _this = this;
      if (this.$route.path == "/index/workbench_app") {
        // alert(123)
        _this.menus = Vue.gvUtil.getCache("menu").map.MenusData.value;
        // 不要该下标的数据
        const index = _this.menus.findIndex((item) => item.clabel === "工作台");
        for (let i = 0; i < _this.menus.length; i++) {
          if (i == index) {
            continue;
          }
          if (_this.menus[i].clabel != null) {
            _this.menusdData.push(_this.menus[i]);
          }
        }
      }
      _this.isChangeMenu =
        localStorage.getItem("_layoutType") == "left" ? true : false;
      // this.getMenuList()
      // setTimeout(function() {
      //     if ($('#flex-m').height() > 640) {
      //         _this.mHight = $('#flex-m').height() - 90;
      //     }
      // }, 500);

      // this.restaurants = this.loadAll();
      console.log(
        "workFlowConfig",
        this.$route.params,
        this.$route.params.workFlowConfig
      );
      if (
        this.$route.params &&
        this.$route.params.workFlowConfig &&
        this.$route.params.workFlowConfig.isSendEmail
      ) {
        this.sendEmailDialog = true;
        this.$nextTick(() => {
          this.embedCode = this.$route.params.workFlowConfig.embedCode;
        });
      }
    },
    events: {
      onShowDialog: function (index, reminderMsg) {
        if (
          this.isShowFull === true &&
          this.reminderMsgListNoRead[this.ReminderIndex].readStatus === false
        ) {
          this.refreshMsgReminder(this, index);
          this.upDataMSg(reminderMsg.messageId);
        }
        this.ReminderIndex = index;
        this.isShowFull = !this.isShowFull;
        //console.log(index)
      },
      onShowDialogRead: function (index) {
        this.ReminderIndex = index + "d";
        this.isShowFull = !this.isShowFull;
      },
      onShowDialogMsgRead: function (index, reminderMsg) {
        this.msgIndex = index + "d";
        this.isShowFullMsg = !this.isShowFullMsg;
        reminderMsg.open = !reminderMsg.open;
      },
      onShowDialogMsg: function (index, reminderMsg) {
        if (
          this.isShowFullMsg === true &&
          this.msgListNoRead[this.msgIndex].readStatus === false
        ) {
          this.refreshMsg(this, index);
          this.upDataMSg(reminderMsg.messageId);
        }
        this.msgIndex = index;
        this.isShowFullMsg = !this.isShowFullMsg;
        reminderMsg.open = !reminderMsg.open;
      },
      onMore: function (row, type) {
        // this.$router.push({ name: 'workbenchAppTaskSearch', query: { type: type, taskCode: row && row.taskCode } })
        Vue.gvUtil.redirectTo({
          name: "workbenchAppTaskSearch",
          register: true,
          reMethods: this.onGetList,
          isBlank: true,
          query: {
            type: type,
            taskCode: row && row.taskCode,
          },
        });
      },
      onMoreMsg: function () {
        Vue.gvUtil.redirectTo({
          name: "workbenchAppMoreMsg",
          isBlank: true,
          register: true,
          query: {},
        });
      },
      onWorkbenchMoreRemind: function () {
        ////
        this.showAllRemindDialog = true;

        Vue.gvUtil.registerConfigExtend(
          "workbenchAppMoreAnnouncementMsg",
          function () {
            require.async(
              "./pages/workbenchMoreAnnouncementIndex",
              function (workbenchAppMoreAnnouncementMsg) {
                Vue.gvUtil.showModal(workbenchAppMoreAnnouncementMsg, {
                  title: "更多提醒",
                  widthStyle: "dialog-large",
                  dialogProp: {
                    content: "内容", // dialog 内容
                  },
                  callDialog(obj) {
                    // 确定按钮
                    this.$message.success("确定保存");
                  },
                  closeDialog(obj) {
                    this.$message.success("关闭");
                    return false; // 关闭弹窗前校验  true 关闭  false  不关闭
                  },
                  initData() {
                    //// // 初始化  一般没必要写
                  },
                });
              }
            );
          },
          true
        );

        // Vue.gvUtil.redirectTo({
        //     name: 'workbenchAppMoreAnnouncementMsg',
        //     isBlank: true,
        //     register: true,
        //     query: { userCode: JSON.parse(window.sessionStorage.user).userCode }
        // });
      },
      //排序
      sortChange: function (column) {
        var fieldName = column.prop;
        var sortingType = column.order;
        if (!String.prototype.localeCompare) return null;
        this.paixu(sortingType, fieldName);
        //需要先清除默认排序 ！！!
      },
      //排序
      paixu(type, name) {
        // debugger;
        var allco = this.allList.taskList.content;
        var _this = this;

        //中文排序 //根据汉字首字母排序
        if (
          name == "code" ||
          name == "taskName" ||
          name == "param2" ||
          name == "policyName"
        ) {
          //升序;
          if (type == "descending") {
            allco.sort((a, b) => {
              return (a[name] + "").localeCompare(b[name] + "");
            });
          } else if (type == "ascending") {
            // 降序
            allco.sort((a, b) => {
              return (b[name] + "").localeCompare(a[name] + "");
            });
          }

          //根据英文排序 比较 首字母ASCLL码
        } else if (name == "param3") {
          //升序
          if (type == "descending") {
            allco.sort((a, b) => {
              return b[name].charCodeAt(0) - a[name].charCodeAt(0);
            });
          } else {
            // 降序
            allco.sort((a, b) => {
              return a[name].charCodeAt(0) - b[name].charCodeAt(0);
            });
          }
          //时间排序
        } else if (
          name == "createTime" ||
          name == "endTime" ||
          name == "dangerTime"
        ) {
          //升序
          if (type == "descending") {
            allco.sort((a, b) => {
              if (b[name] == null) {
                var Bdate = 1;
              } else {
                var strArr = b[name].split("-");
                var day = strArr[0];
                var month = strArr[1];
                var year = strArr[2].substring(0, 4);
                var cc = strArr[2].substring(5);
                Bdate = (year + "-" + month + "-" + day + " " + cc).toString();
              }
              if (a[name] == null) {
                var Adate = -1;
              } else {
                var strArr = a[name].split("-");
                var day = strArr[0];
                var month = strArr[1];
                var year = strArr[2].substring(0, 4);
                var cc = strArr[2].substring(5);
                Adate = (year + "-" + month + "-" + day + " " + cc).toString();
              }
              return Date.parse(Adate) - Date.parse(Bdate);
            });
          } else {
            // 降序
            allco.sort((a, b) => {
              if (b[name] == null) {
                var Bdate = 1;
              } else {
                var strArr = b[name].split("-");
                var day = strArr[0];
                var month = strArr[1];
                var year = strArr[2].substring(0, 4);
                var cc = strArr[2].substring(5);
                Bdate = (year + "-" + month + "-" + day + " " + cc).toString();
              }
              if (a[name] == null) {
                var Adate = -1;
              } else {
                var strArr = a[name].split("-");
                var day = strArr[0];
                var month = strArr[1];
                var year = strArr[2].substring(0, 4);
                var cc = strArr[2].substring(5);
                Adate = (year + "-" + month + "-" + day + " " + cc).toString();
              }
              return Date.parse(Bdate) - Date.parse(Adate);
            });
          }
        }
      },

      onWorkbenchMoreMsg: function () {
        ////
        //this.showAllRemindDialog = true

        Vue.gvUtil.registerConfigExtend(
          "workbenchAppMoreMsg",
          function () {
            require.async(
              "./pages/workbenchMoreIndex",
              function (workbenchAppMoreMsg) {
                Vue.gvUtil.showModal(workbenchAppMoreMsg, {
                  title: "更多消息",
                  widthStyle: "dialog-large",
                  dialogProp: {
                    content: "内容", // dialog 内容
                  },
                  callDialog(obj) {
                    // 确定按钮
                    this.$message.success("确定保存");
                  },
                  closeDialog(obj) {
                    this.$message.success("关闭");
                    return false; // 关闭弹窗前校验  true 关闭  false  不关闭
                  },
                  initData() {
                    //// // 初始化  一般没必要写
                  },
                });
              }
            );
          },
          true
        );

        // Vue.gvUtil.redirectTo({
        //     name: 'workbenchAppMoreAnnouncementMsg',
        //     isBlank: true,
        //     register: true,
        //     query: { userCode: JSON.parse(window.sessionStorage.user).userCode }
        // });
      },
      handleClick: function () {},
      displayIframe: function () {
        this.style = "display: block";
        this.addOrDelete = false;
      },
      deleteIframe: function () {
        this.style = "display: none";
        this.addOrDelete = true;
      },
      toggle: function () {},
      addNewMenu: function () {
        var _this = this;
        Vue.gvUtil.showModal(menuAdd, {
          title: "自定义功能入口",
          dialogProp: {
            // previewVoucherVoList: _this.previewVoucherVoList//传递的参数
          },
          callDialog: function () {
            _this.requestEntryMenus();
          },
        });
      },
      redirectToAppPage: function (target) {
        // var name = Vue.gvUtil.getRouterNameForPath(target);
        Vue.gvUtil.redirectTo({
          path: target,
        });
      },
      claimSearch: function () {
        Vue.gvUtil.redirectTo({
          name: "registrationAppNotesListEdit",
          titleName: "Create Verbal Notification",
          register: true,
        });
      },
      claimRegistration: function () {
        Vue.gvUtil.redirectTo({
          name: "registrationApp",
          titleName: "Create Verbal Notification",
          register: true,
        });
      },
      createVerbalNotification: function () {
        Vue.gvUtil.redirectTo({
          name: "scannedDocAppNotificationEdit",
          titleName: "Create Verbal Notification",
          register: true,
        });
      },
      processTask: function (row) {
        if (row.taskNode === "Claim Assessment") {
          Vue.gvUtil.redirectTo({
            name: "registrationApp",
            titleName: "Registration",
            register: true,
          });
        }
        if (row.taskNode === "Scan Document") {
          Vue.gvUtil.redirectTo({
            name: "scannedDocApp",
            titleName: "Scan Document",
            register: true,
          });
        }
      },
      getPendingTasks: function () {
        this.cliNum = 100;
        this.status = "01";
        this.clickNodeName = "";
        this.initData();
      },
      getProcessingTasks: function () {
        this.cliNum = 100;
        this.status = "02";
        this.clickNodeName = "";
        this.initData();
      },
      getProcessedTasks: function () {
        this.cliNum = 100;
        this.status = "02";
        this.clickNodeName = "";
        this.initData();
      },
      // 点击任务id超链接,进入相应的操作页面
      onHandleEdit: function (row) {
        var status = row.status,
          type = "view",
          _this = this;

        _this.taskHandlerVo.taskId = row.taskId;
        _this.taskHandlerVo.businessId = row.businessId;
        _this.taskHandlerVo.handlerCode = row.handlerCode;
        _this.taskHandlerVo.handlerRole = row.handlerRole;
        _this.taskHandlerVo.status = status;

        var url = Vue.gvUtil.getUrl({
          apiName: "workbenchAcceptTask",
          contextName: "auth",
        });
        if (status && status !== "Processed") {
          Vue.gvUtil.http.put(url, _this.taskHandlerVo).then(function (res) {
            if (res.resCode === "0000") {
              if (res.resData === "0") {
                type = "edit";
              } else if (res.resData === "1") {
                Vue.gvUtil.alert({
                  msg: Vue.gvUtil.getInzTranslate("gMsgTaskIsProcessed"),
                });
                return;
              } else if (res.resData === "2") {
                type = "view";
              } else if (res.resData === "3") {
                Vue.gvUtil.alert({
                  msg: Vue.gvUtil.getInzTranslate("gMsgTaskStatusMismatch"),
                });
                return;
              } else if (res.resData === "4") {
                Vue.gvUtil.alert({
                  msg: Vue.gvUtil.getInzTranslate("gMsgTaskHandlerError"),
                });
                return;
              } else if (res.resData === "5") {
                Vue.gvUtil.alert({
                  msg: Vue.gvUtil.getInzTranslate("gMsgTaskSuspended"),
                });
                return;
                type = "view";
              }
              _this.redirectToPage(row, type, _this);
            }
          });
        } else {
          // ////
          _this.redirectToPage(row, type, _this);
        }
      },

      closeMessage: function (message) {
        ////
        this.isOpen = false;
        this.deleteRemind(message.messageId);

        // if(message.readStatus==0){
        //     this.$confirm('该提醒未读, 是否继续删除?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.deleteRemind(message.messageId)
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // }else{
        //     this.deleteRemind(message.messageId)

        // }
        setTimeout(() => {
          this.isOpen = true;
        }, 500);
      },
      deleteRemind(index) {
        ////
        var _this = this;
        var url = Vue.gvUtil.getUrl({
          apiName: "workbenchDeleteRemind",
          contextName: "product",
          urlParams: {
            messageId: index,
          },
        });
        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            // empty
            _this.$message.success("删除成功");
          } else {
            _this.$message.error("删除失败");
          }
          _this.queryRemind();
        });
      },
      onHistoryInquiry: function (row) {
        var _this = this;
        if (row.activityInstancePk != null) {
          Vue.gvUtil.showTrail({
            innerRefNo: row, //内部参考号
          });
        } else {
          this.$message({
            message: "当前数据无审核轨迹",
            type: "success",
          });
        }
      },
      //拿到状态，单据号，路由跳转到对应接口
      clickTaskNo(scope) {
        console.log("跳转", scope);
        // debugger
        // var _this = this;
        //储蓄当前行，跳转页面并
        window.sessionStorage.setItem("taskObj", JSON.stringify(scope.row));
        //两种状态下发修改，审核页面
        // 未处理
        if (scope.row.taskStatus != "02") {
          // 修改(驳回)
          if (scope.row.action == "下发修改") {
            if (scope.row.routeName == "01") {
              // 金批
              Vue.gvUtil.redirectTo({
                name: "batchentryinfoApp",
                query: {
                  pageType: "amend",
                },
              });
            } else if (scope.row.routeName == "02") {
              // 文批
              Vue.gvUtil.redirectTo({
                name: "batchentryinfo2App",
                query: {
                  pageType: "amend",
                },
              });
            } else if (scope.row.routeName == "03") {
              // 退保
              Vue.gvUtil.redirectTo({
                name: "batchentryinfo3App",
                query: {
                  pageType: "amend",
                },
              });
            } else if (scope.row.routeName == "04") {
              // 冲销
              Vue.gvUtil.redirectTo({
                name: "batchentryinfo4App",
                query: {
                  pageType: "amend",
                },
              });
            } else if (scope.row.routeName == "05") {
              // 金批+文批
              Vue.gvUtil.redirectTo({
                name: "batchentryinfo5App",
                query: {
                  pageType: "amend",
                },
              });
            }
            // 申请付款特殊 跳转提交页面
            else if (scope.row.routeName == "paymentrequestexamineApp") {
              Vue.gvUtil.redirectTo({
                name: "paymentrequest2App",
                query: {
                  pageType: "amend",
                },
              });
            } else {
              Vue.gvUtil.redirectTo({
                name: scope.row.routeName,
                query: {
                  pageType: "amend",
                },
              });
            }
          }
          // 审核
          else {
            // 审核批单
            if (scope.row.routeName.length == 2) {
              Vue.gvUtil.redirectTo({
                name: "batchentryinfo6App",
                query: {
                  pageType: "task",
                },
              });
            }
            // 其他审核
            else {
              Vue.gvUtil.redirectTo({
                name: scope.row.routeName,
                query: {
                  pageType: "task",
                },
              });
            }
          }
        }
        // 已处理
        else {
          // 审核批单
          if (scope.row.routeName.length == 2) {
            Vue.gvUtil.redirectTo({
              name: "batchentryinfo6App",
              query: {
                pageType: "back",
              },
            });
          } else {
            Vue.gvUtil.redirectTo({
              name: scope.row.routeName,
              query: {
                pageType: "back",
              },
            });
          }
        }

        // url = Vue.gvUtil.getUrl({
        //   apiName: "workbenchFindTaskNo",
        //   contextName: "product",
        // });

        // Vue.gvUtil.http
        //   .post(url, { taskNo: scope.row.taskNo })
        //   .then(function (res) {
        //     if (res.resCode === "0000") {
        //       // ////
        //       if (res.resData.gwWorkTaskList.length == 0) {
        //         _this.$message.error("该任务已被他人处理");
        //         setTimeout(() => {
        //           _this.status = "01";
        //           _this.onGetList();
        //         }, 500);
        //         return;
        //       } else {
        //         if (scope.row.taskStatus == "01") {
        //           url = Vue.gvUtil.getUrl({
        //             apiName: "workbenchTaskStatusChange",
        //             // urlParams: {
        //             //     policyNo: _this.query.policyNo
        //             // },res
        //             contextName: "product",
        //           });

        //           Vue.gvUtil.http
        //             .post(url, {
        //               taskNo: scope.row.taskNo,
        //               taskStatus: "01",
        //               isShare: scope.row.isShare,
        //               code: scope.row.code,
        //               innerRefNo: scope.row.innerRefNo,
        //               param1: scope.row.param1,
        //             })
        //             .then(function (res) {
        //               if (res.resCode === "0000") {
        //               } else {
        //                 _this.$message.error("改变状态失败");
        //               }
        //             });
        //         }

        //         _this.$store.commit("SET_TASKOBJ", scope.row);
        //         _this.$store.commit("SET_RETURNPATH", {
        //           name: "workbenchApp",
        //         });
        //         debugger;
        //         if (scope.row.taskNodeCode.indexOf("purchase") > -1) {
        //           var obj = {};
        //           obj.taskNo = scope.row.taskNo;
        //           obj.schemeCode = scope.row.innerRefNo;
        //           _this.redirectToPurchase(scope.row, obj);
        //         } else {
        //           window.sessionStorage.setItem(
        //             "taskObj",
        //             JSON.stringify(scope.row)
        //           );
        //           Vue.gvUtil.redirectTo({
        //             name: scope.row.routeName,
        //             query: {
        //               pageType: "task",
        //             },
        //           });
        //         }
        //       }
        //     } else {
        //       _this.$message.error("该任务已被他人处理");
        //       setTimeout(() => {
        //         _this.status = "01";
        //         _this.onGetList();
        //       }, 500);
        //       return;
        //     }
        //   });

        //采办模块
      },
      closeDailog() {
        this.showRemindDialog = false;
      },
      remindDialog(scope) {
        if (!this.isOpen) {
          return;
        }
        var _this = this;
        // ////
        this.remindContent = scope.contentValue;

        if (scope.readStatus == "0") {
          var url = Vue.gvUtil.getUrl({
            apiName: "workbenchRemindChangeStatus",
            // urlParams: {
            //     policyNo: _this.query.policyNo
            // },res
            contextName: "product",
          });

          Vue.gvUtil.http
            .post(url, {
              messageId: scope.messageId,
              readStatus: "1",
              taskNo: scope.taskNo,
            })
            .then(function (res) {
              if (res.resCode === "0000") {
                // ////
                if (res.resData.msg == "exist") {
                } else {
                  _this.remindContent = "任务已被他人处理，该提醒已删除";
                }
                _this.showRemindDialog = true;
                _this.queryRemind();
              } else {
                _this.showRemindDialog = true;
                _this.$message.error("改变状态失败");
              }
            });
        } else {
          _this.showRemindDialog = true;
          _this.queryRemind();
        }

        ////
      },
      queryRemind() {
        var _this = this;
        ////
        _this.reminderMsgListNoRead = [];
        var url = Vue.gvUtil.getUrl({
          apiName: "workbenchQueryRemind",
          // urlParams: {
          //     policyNo: _this.query.policyNo
          // },res
          contextName: "product",
        });

        Vue.gvUtil.http
          .post(url, {
            userCode: JSON.parse(window.sessionStorage.user).userCode,
          })
          .then(function (res) {
            if (res.resCode === "0000") {
              // ////

              _this.reminderMsgListNoRead = res.resData.gwWorkRemindList;
              _this.$forceUpdate();
            } else {
              _this.$message.error("改变状态失败");
            }
          });
      },
      clickBtnNodeName(name, index) {
        this.cliNum = index;
        this.clickNodeName = name;
        this.onGetList();
      },
      onGetList: function () {
        // debugger
        var _this = this;
        _this.taskKind = [];

        this.searchList(
          "workbenchTaskSearch",
          // "product",
          "selfins", //自保修改 自保
          {
            userCode: JSON.parse(window.sessionStorage.user).userCode,
            taskStatus: _this.status,
            taskNo: this.searchField,
            // taskNodeName: this.clickNodeName,
          },
          // "listTask",
          "taskList", //自保自保修改
          function (data) {
            _this.allList = data;
            _this.pendingTasks = data["01"]; //已处理
            _this.processedTasks = data["02"]; //未处理
            _this.workbenchVoList = data.taskList.content;
          }
        );
      },
      onSearch: function () {
        // 搜索
        //
        this.onGetList();
      },
    },

    methods: {
      initPage: function () {
        this.status = "01";
        this.layoutType = localStorage.getItem("_layoutType") || "top";
        this.initData();
        this.getStatistics();
        this.getReminderMsg();
        this.requestEntryMenus();
        this.getMsg();
        this.upDataShowView();
        this.reminderExpiredPassword();
        this.queryRemind();

        Vue.gvUtil.initTranslation("TaskStatus,Priority", () => {
          this.show = true;
        });
      },
      formatInnerRefNo(row) {
        //索赔的内部参考号会出现 赔案号#时间戳 形式的内部参考号 需要截取前半段展示
        const TASKLIST = [
          "0902",
          "0903",
          "0904",
          "0905",
          "0907",
          "0909",
          "0911",
        ];
        if (TASKLIST.findIndex((i) => i == row.code) > -1) {
          return row.innerRefNo.split("#")[0];
        } else {
          return row.innerRefNo;
        }
      },

      // 配置菜单
      handleSelect(key, keyPath) {},
      handleOpen(key, keyPath) {},
      handleClose(key, keyPath) {},
      // 路径跳转
      path(path) {
        // 传参数的跳转写法：
        this.$router.push({
          path: path,
        });
      },

      // 输入建议
      querySearch(queryString, cb) {
        var restaurants = JSON.parse(JSON.stringify(this.searchData));
        // let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // console.log(results)
        let results = queryString ? restaurants : [];
        // 调用 callback 返回建议列表的数据
        cb(results);
        if (this.searchData.length == 0) {
          this.openSearchClass = false;
        } else {
          this.openSearchClass = true;
        }
      },
      // createFilter(queryString) {
      //   debugger
      //   return (restaurant) => {
      //     // return (restaurant.businessNo.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      //     return (queryString.length>0);
      //   };
      // },
      openBlur() {
        this.openSearchClass = false;
      },
      closeBlur() {
        this.openSearchClass = false;
      },
      search() {
        var url = Vue.gvUtil.getUrl({
          apiName: "ggsearch",
          contextName: "product",
        });
        // this.baseInfo.contactNo = this.contactNo1 + this.contactNo2
        Vue.gvUtil.http
          .post(url, {
            text: this.state1,
          })
          .then((res) => {
            if (res.resCode === "0000") {
              // console.log(res)
              this.searchData = res.resData;
              this.searchData.forEach((i) => {
                i.value = i.businessNo;
                this.searchContent = Vue.gvUtil.translationData(
                  "SearchBusinessType",
                  i.businessType
                );
              });
            }
          });
      },
      toSearch() {
        this.$router.push({
          name: "searchApp",
          query: {
            content: this.state1,
          },
        });
      },
      handleSelect(item) {
        console.log(item);
      },

      reminderExpiredPassword: function () {
        var _this = this,
          url = Vue.gvUtil.getUrl({
            apiName: "getReminderDaysOfExpiredPassword",
            contextName: "auth",
          });
        Vue.gvUtil.http.post(url).then(function (res) {
          if (res.resCode === "0000") {
            // if (res.resData !== -1) {
            //     Vue.gvUtil.alert({ msg: Vue.gvUtil.getInzTranslate('msgOfExpiredPassword') + res.resData +  Vue.gvUtil.getInzTranslate('daysMsgOfExpiredPassword')});
            // }
          }
        });
      },
      requestEntryMenus: function () {
        var _this = this,
          url = Vue.gvUtil.getUrl({
            apiName: "findSelfDefineMenuForUser",
            contextName: "auth",
          });
        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            _this.groupMenus(res.resData);
          }
        });
      },
      groupMenus: function (menus) {
        var menuName = "",
          _gc = localStorage.getItem("_i18") || "en";
        if (_gc === "zh") {
          menuName = "menuCname";
        } else {
          menuName = "menuEname";
        }
        this.menusForUser = menus.map(function (item) {
          item.menuName = item[menuName];
          return item;
        });
      },
      // 超期任务显示为红色
      tableRowClassName: function (row) {
        if (row.row.priority === "3") {
          return "overdue-warning-row";
        }
        return "";
      },
      initData: function () {
        // var _this = this;
        // this.searchList('workbenchTaskSearch', 'auth', { 'status': this.status, 'includeSubTask': false }, 'workbenchVoList', function(data) {
        //     _this.workbenchVoList = data;
        // });
        this.onGetList();
      },
      // 获取用户任务处理信息
      getStatistics: function () {
        var params = {
            transferType: this.transferTypeReminderMsg,
          },
          url = Vue.gvUtil.getUrl({
            apiName: "workbenchGetStatistics",
            contextName: "auth",
          }),
          _this = this;

        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            _this.tasksProcessedToday = res.resData.tasksProcessedToday;
            _this.tasksProcessedThisMonth = res.resData.tasksProcessedThisMonth;
            _this.efficiencyofThisMonth = res.resData.efficiencyofThisMonth;
            _this.totalTaskCompletionRate = res.resData.totalTaskCompletionRate;
          }
        });
      },
      // 获取提醒消息列表
      getReminderMsg: function () {
        // ////
        // var params = { transferType: this.transferTypeReminderMsg },
        //     url = Vue.gvUtil.getUrl({
        //         apiName: 'getReminderMsg',
        //         contextName: 'auth'
        //     }),
        //     _this = this;
        // Vue.gvUtil.http.post(url, params, { shade: false }).then(function (res) {
        //     if (res.resCode === '0000') {
        //         // _this.reminderMsgListNoReadE = res.resData.resultList
        //         // _this.reminderMsgListNoReadE.map(item=>{
        //         //     item.open = false
        //         // })
        //         var testResultList = res.resData.resultList;
        //         for (var i = 0; i < testResultList.length; i++) {
        //             if (testResultList[i].readStatus == false) {
        //                 _this.allReminderMsgList.push(testResultList[i]);
        //             } else {
        //                 if (_this.msgListRead.length < 5) {
        //                     _this.reminderMsgList.push(testResultList[i]);
        //                 }
        //             }
        //         }
        //         var allReminderMsgListLen = _this.allReminderMsgList.length;
        //         if (allReminderMsgListLen >= 5) {
        //             _this.reminderMsgList = [];
        //             _this.reminderMsgListNoReadE = _this.allReminderMsgList.splice(0, 5);
        //         } else {
        //             _this.reminderMsgList.splice(0, allReminderMsgListLen + _this.reminderMsgList.length - 5);
        //             _this.reminderMsgListNoReadE = _this.allReminderMsgList.splice(0, allReminderMsgListLen);
        //         }
        //         if (res.resData.resultList.length === 0) {
        //             // _this.reminderMsgList.push({'messageId': 'null', 'titleValue': '提醒', 'contentValue': '没有新消息'});
        //         } else {
        //             _this.msgPageNo++;
        //         }
        //     } else {
        //         _this.reminderMsgList = []
        //     }
        //     _this.reminderLoading = false;
        // });
      },
      // 获取消息列表
      getMsg: function () {
        ////
        var params = {
            transferType: this.transferTypeMsg,
          },
          url = Vue.gvUtil.getUrl({
            apiName: "getReminderMsg",
            contextName: "auth",
          }),
          _this = this;
        Vue.gvUtil.http
          .post(url, params, {
            shade: false,
          })
          .then(function (res) {
            if (res.resCode === "0000") {
              //console.log(res)
              var testResultList = res.resData.resultList;
              for (var i = 0; i < testResultList.length; i++) {
                if (
                  testResultList[i].priority === "1" &&
                  testResultList[i].readStatus === false
                ) {
                  _this.msgListNoReadPriority.push(testResultList[i]);
                } else if (testResultList[i].readStatus === false) {
                  _this.allMsgListNoRead.push(testResultList[i]);
                } else {
                  if (_this.msgListRead.length < 5) {
                    _this.msgListRead.push(testResultList[i]);
                  }
                }
              }
              var allMsgListNoReadLen = _this.allMsgListNoRead.length;
              if (allMsgListNoReadLen >= 5) {
                _this.msgListRead = [];
                _this.msgListNoRead = _this.allMsgListNoRead.splice(0, 5);
              } else {
                _this.msgListRead.splice(
                  0,
                  allMsgListNoReadLen + _this.msgListRead.length - 5
                );
                _this.msgListNoRead = _this.allMsgListNoRead.splice(
                  0,
                  allMsgListNoReadLen
                );
              }
              if (res.resData.resultList.length === 0) {
                // _this.msgListNoRead.push({'messageId': 'null', 'titleValue': '提醒', 'contentValue': '没有新消息'});
              } else {
                _this.clickMsg();
                _this.msgPageNo++;
              }
              _this.msgListNoRead.map((item) => {
                item.open = false;
              });
              _this.msgListRead.map((item) => {
                item.open = false;
              });
            } else {
              _this.msgListNoRead = [];
            }
            _this.messageLoading = false;
          });
      },
      // 刚刚进入页面时候打开一个弹框，提示有未读消息
      clickMsg: function () {
        if (
          this.layoutType === "left" ||
          this.msgListNoReadPriority.length === 0
        ) {
          return;
        }
        var _this = this,
          num = 0,
          _msgListNoReadPriority = this.msgListNoReadPriority;

        this.$msgbox({
          title: Vue.filter("translate")("workbenchAppVoMessage"),
          message: _msgListNoReadPriority[0].contentValue,
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          // showCancelButton: true,
          confirmButtonText: Vue.filter("translate")("workbenchAppVoNext"),
          // cancelButtonText: Vue.filter('translate')('cxlClose'),
          beforeClose: function (action, instance, done) {
            if (action === "confirm") {
              _this.upDataMSg(_msgListNoReadPriority[num].messageId);
              _msgListNoReadPriority.splice(num, 1);
              if (_msgListNoReadPriority.length === 0) {
                done(); // 没有未读消息时执行
              } else {
                instance.message = _msgListNoReadPriority[num].contentValue;
              }
            } else {
              done();
            }
          },
        });
      },
      // 刷新函数
      refreshMsg: function (_this, num) {
        if (_this.allMsgListNoRead.length !== 0) {
          _this.msgListNoRead = _this.msgListNoRead.concat(
            _this.allMsgListNoRead.splice(0, 1)
          );
          return;
        }
        _this.msgListRead.unshift(_this.msgListNoRead[num]);
        _this.msgListNoRead.splice(num, 1);
      },
      refreshMsgReminder: function (_this, num) {
        if (_this.allReminderMsgList.length !== 0) {
          _this.reminderMsgListNoRead = _this.reminderMsgListNoRead.concat(
            _this.allReminderMsgList.splice(0, 1)
          );
          return;
        }
        _this.reminderMsgList = _this.reminderMsgList.concat(
          _this.reminderMsgListNoRead.splice(num, 1)
        );
      },
      upDataMSg: function (messageId) {
        var params = {
            messageId: messageId,
          },
          url = Vue.gvUtil.getUrl({
            apiName: "updateReadStatus",
            contextName: "auth",
          });
        Vue.gvUtil.http.post(url, params).then(function (res) {
          if (res.resCode === "0000") {
            //console.log(res.resMsg);
          }
        });
      },
      upDataShowView: function () {
        var url = Vue.gvUtil.getUrl({
            apiName: "getShowView",
            contextName: "auth",
          }),
          _this = this;
        Vue.gvUtil.http.get(url).then(function (res) {
          if (res.resCode === "0000") {
            _this.showView = res.resData;
          }
        });
      },
      // 时间格式化
      formatTime: function (row, column) {
        return Vue.filter("time")(row[column.property], "dd-MM-yyyy HH:mm:ss");
      },
      // 优先级格式化
      formatPriority: function (row) {
        var priority = row.priority,
          value = "";
        if (priority === 0) {
          value = "Low";
        } else if (priority === 1) {
          value = "Medium";
        } else if (priority === 2) {
          value = "High";
        } else if (priority === 3) {
          value = "Overdue";
        }
        return value;
      },
      redirectToPurchase(row, param) {
        var breadcrumbs = ["保险安排", "保险方案管理", "采办管理"];
        this.$store.state.breadcrumbs = breadcrumbs;

        var node = this.$store.state.redirectTopMenus.filter((item) => {
          return item.appName == row.routeName;
        });
        node = node[0];
        window.localStorage.setItem("isCache", "1");
        sessionStorage.setItem("ps", param.schemeCode);
        window.localStorage.setItem("pc", param.proposalCode);
        sessionStorage.setItem("pto", param.taskNo);
        $(".ia_im_blueBorder").removeClass("ia_im_blueBorder");
        $(".ia-im-topMenuItem").eq(node.id).addClass("ia_im_blueBorder");
        this.$store.state.remarkNumber = node.id;
        sessionStorage.setItem("cachePurchaseName", node.appName);

        if (row.billTypeCode.indexOf("Single") > -1) {
          this.$store.state.isSingle = true;

          sessionStorage.setItem("single", "True");

          this.$router.push({
            name: node.appName,
            params: {
              source: "link",
              taskObj: row,
            },
          });
        } else {
          this.$store.state.isSingle = false;

          sessionStorage.setItem("single", "False");

          this.$router.push({
            name: node.appName,
            params: {
              source: "link",
              taskNo: param.taskNo,
              taskObj: row,
            },
          });
        }
        Vue.gvUtil.setPurchaseMenu(
          node.appName,
          row.taskStatus == "03" ? true : false,
          row
        );
      },

      // 跳转页面
      redirectToPage: function (row, type, val) {
        Vue.gvUtil.redirectTo({
          name: row.viewUrl,
          register: true,
          reMethods: val.onGetList,
          isBlank: true,
          query: {
            bpmTaskVo: row,
            businessType: row.processId,
            taskId: row.taskId,
            taskCode: row.taskCode,
            businessId: row.businessId,
            processInstanceId: row.processInstanceId,
            approveInd: row.approveInd,
            status: row.status,
            innerRefNo: row.innerRefNo,
            outerRefNo: row.outerRefNo,
            type: type,
            taskName: row.taskName,
          },
        });
      },
    },
  });
});
