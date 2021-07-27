/**
 * 注册小应用路由
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function (require) {
  var Home = Vue.gvUtil.getComponents("Home"),
    router = [
      {
        path: "/index",
        component: Home,
        children: [
          {
            // 工作台
            path: "workbench_app",
            name: "workbenchApp",
            config: "./pages/index/workbenchApp/index.config",
            component: function (resolve) {
              // './pages/index/workbenchApp/index.config';
              require.async(["./pages/index/workbenchApp/index"], resolve);
            },
          },
        ],
      },
      {
        path: "/report_app",
        name: "reportApp",
        component: function (resolve) {
          require.async(
            ["./pages/underwriting/print/printViewApp/pages/web/viewer"],
            resolve
          );
        },
      },
      {
        path: "/sys",
        component: Home,
        children: [
          {
            // 功能管理
            path: "saa/task_app",
            name: "taskApp",
            config: "./pages/sys/saa/taskApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/taskApp/index"], resolve);
            },
          },
          {
            // 角色管理
            path: "saa/role_app",
            name: "roleApp",
            config: "./pages/sys/saa/roleApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/roleApp/index"], resolve);
            },
          },
          {
            // 用户管理
            path: "saa/user_app",
            name: "userApp",
            config: "./pages/sys/saa/userApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/userApp/index"], resolve);
            },
          },
          {
            // 修改密码
            path: "saa/reset_password_app",
            name: "resetPasswordApp",
            config: "./pages/sys/saa/resetPasswordApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/saa/resetPasswordApp/index"],
                resolve
              );
            },
          },
          {
            // 休假
            path: "saa/leave_setting_app",
            name: "leaveSettingApp",
            config: "./pages/sys/saa/leaveSettingApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/leaveSettingApp/index"], resolve);
            },
          },
          {
            // 打印机管理
            path: "saa/printer_app",
            name: "printerApp",
            config: "./pages/sys/saa/printerApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/printerApp/index"], resolve);
            },
          },
          {
            // 菜单管理
            path: "saa/menu_app",
            name: "menuApp",
            config: "./pages/sys/saa/menuApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/menuApp/index"], resolve);
            },
          },
          {
            // 功能管理
            path: "saa/task_transfer_app",
            name: "taskTransferApp",
            config: "./pages/sys/saa/taskTransferApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/taskTransferApp/index"], resolve);
            },
          },
          {
            // 任务改派
            path: "saa/task_assign_app",
            name: "taskAssignApp",
            config: "./pages/sys/saa/taskAssignApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/taskAssignApp/index"], resolve);
            },
          },
          {
            // 审计日志开关配置管理
            path: "log/log_config_app",
            name: "logConfigApp",
            config: "./pages/sys/log/logConfigApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/log/logConfigApp/index"], resolve);
            },
          },
          {
            // 特殊审计日志管理
            path: "log/special_audit_log_app",
            name: "specialAuditLogApp",
            config: "./pages/sys/log/specialAuditLogApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/log/specialAuditLogApp/index"],
                resolve
              );
            },
          },
          {
            // 基础审计日志管理
            path: "log/audit_log_app",
            name: "auditLogApp",
            config: "./pages/sys/log/auditLogApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/log/auditLogApp/index"], resolve);
            },
          },
          {
            // 承保命中规则管理
            path: "log/rule_underwriting_app",
            name: "ruleUnderwritingApp",
            config: "./pages/sys/log/ruleUnderwritingApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/log/ruleUnderwritingApp/index"],
                resolve
              );
            },
          },
          {
            path: "code/code_app",
            name: "codeApp",
            config: "./pages/sys/code/codeApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/code/codeApp/index"], resolve);
            },
          },
          {
            path: "schedule/schedule_app",
            name: "scheduleApp",
            config: "./pages/sys/schedule/scheduleApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/schedule/scheduleApp/index"],
                resolve
              );
            },
          },
          {
            path: "test/test_app",
            name: "testApp",
            config: "./pages/sys/test/testApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/test/testApp/index"], resolve);
            },
          },
          {
            // 数据权限管理
            path: "saa/factor_app",
            name: "factorApp",
            config: "./pages/sys/saa/factorApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/factorApp/index"], resolve);
            },
          },
          {
            // 规则因子管理
            path: "rule/rule_factor_app",
            name: "ruleFactorApp",
            config: "./pages/sys/rule/ruleFactorApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/rule/ruleFactorApp/index"], resolve);
            },
          },
          {
            // 规则维护
            path: "rule/rule_app",
            name: "ruleApp",
            config: "./pages/sys/rule/ruleApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/rule/ruleApp/index"], resolve);
            },
          },
          {
            // 结果集维护
            path: "rule/result_app",
            name: "resultApp",
            config: "./pages/sys/rule/resultApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/rule/resultApp/index"], resolve);
            },
          },
          {
            // 计算项目结果集维护
            path: "rule/compute_results_app",
            name: "computeResultApp",
            config: "./pages/sys/rule/computeResultApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/rule/computeResultApp/index"],
                resolve
              );
            },
          },
          {
            // 其他结果集维护
            path: "rule/other_results_app",
            name: "otherResultsApp",
            config: "./pages/sys/rule/otherResultsApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/rule/otherResultsApp/index"],
                resolve
              );
            },
          },
          {
            // 文档扫描
            path: "doc/doc_app",
            name: "docApp",
            config: "./pages/sys/doc/docApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/doc/docApp/index"], resolve);
            },
          },
          {
            // 基础表单视图
            path: "view/form_view_base_app",
            name: "formViewBaseApp",
            config: "./pages/sys/view/formViewBaseApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/view/formViewBaseApp/index"],
                resolve
              );
            },
          },
          {
            // 详细表单视图
            path: "view/form_view_detail_app",
            name: "formViewDetailApp",
            config: "./pages/sys/view/formViewDetailApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/view/formViewDetailApp/index"],
                resolve
              );
            },
          },
          {
            // 模板视图配置
            path: "cust_view/cust_view_config_app",
            name: "custViewConfigApp",
            config: "./pages/sys/custView/custViewConfigApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/custView/custViewConfigApp/index"],
                resolve
              );
            },
          },
          {
            // 模板配置
            path: "cust_view/cust_config_app",
            name: "custConfigApp",
            config: "./pages/sys/custView/custConfigApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/custView/custConfigApp/index"],
                resolve
              );
            },
          },
          {
            // 消息模板
            path: "message/message_model_app",
            name: "messageModelApp",
            config: "./pages/sys/message/messageModelApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/message/messageModelApp/index"],
                resolve
              );
            },
          },
          {
            // 消息配置
            path: "message/message_config_app",
            name: "messageConfigApp",
            config: "./pages/sys/message/messageConfigApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/message/messageConfigApp/index"],
                resolve
              );
            },
          },
          {
            // MQ管理
            path: "message/mq_app",
            name: "mqApp",
            config: "./pages/sys/message/mqApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/message/mqApp/index"], resolve);
            },
          },
          {
            path: "saa/company_app",
            name: "companyApp",
            config: "./pages/sys/saa/companyApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/companyApp/index"], resolve);
            },
          },
          {
            path: "saa/user_group_app",
            name: "userGroupApp",
            config: "./pages/sys/saa/userGroupApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/saa/userGroupApp/index"], resolve);
            },
          },
          {
            path: "exchange_management/exchange_inquiry_app",
            name: "exchangeInquiryApp",
            config: "./pages/sys/exchange/exchangeApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sys/exchange/exchangeApp/index"],
                resolve
              );
            },
          },
          {
            //打印预览
            path: "print/print_app",
            name: "printApp",
            config: "./pages/sys/print/index.config",
            component: function (resolve) {
              require.async(["./pages/sys/print/index"], resolve);
            },
          },
        ],
      },
      {
        path: "/claim", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 理赔报案查询
            path: "notification_no_inquiry/notification_no_inquiry_app",
            name: "notificationNoInquiryApp",
            config:
              "./pages/claim/notificationNoInquiry/notificationNoInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/claim/notificationNoInquiry/notificationNoInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            //
            path: "pending_tasks/pending_tasks_app",
            name: "pendingTasksApp",
            config: "./pages/claim/pendingTasks/pendingTasksApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/pendingTasks/pendingTasksApp/index"],
                resolve
              );
            },
          },
          {
            path: "create_verbal_notification",
            name: "scannedDocAppNotificationEdit",
            config: "./pages/claim/scannedDoc/scannedDocApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "pages/claim/scannedDoc/scannedDocApp/components/notificationEdit",
                ],
                resolve
              );
            },
          },
          {
            //
            path: "scanned_doc/scanned_doc_app",
            name: "scannedDocApp",
            config: "./pages/claim/scannedDoc/scannedDocApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/scannedDoc/scannedDocApp/index"],
                resolve
              );
            },
            children: [
              {
                path: "doc_data_edit",
                name: "scannedDocAppDocDataEdit",
                component: function (resolve) {
                  require.async(
                    [
                      "./pages/claim/scannedDoc/scannedDocApp/pages/docDataEdit",
                    ],
                    resolve
                  );
                },
              },
            ],
          },
          {
            //
            path: "registration/registration_app",
            name: "registrationApp",
            config: "./pages/claim/registration/registrationApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/registration/registrationApp/index"],
                resolve
              );
            },
          },
          {
            // 理赔查询
            path: "claim_no_inquiry/claim_no_inquiry_app",
            name: "claimNoInquiryApp",
            config:
              "./pages/claim/claimNoInquiry/claimNoInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/claimNoInquiry/claimNoInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 理赔查询-给承保用,理赔不用
            path: "claim_no_inquiry_uw/claim_no_inquiry_uw_app",
            name: "claimNoInquiryUwApp",
            config:
              "./pages/claim/claimNoInquiryUw/claimNoInquiryUwApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/claimNoInquiryUw/claimNoInquiryUwApp/index"],
                resolve
              );
            },
          },
          {
            //
            path: "notes_list/notes_list_app",
            name: "notesListApp",
            config: "./pages/claim/notesList/notesListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/notesList/notesListApp/index"],
                resolve
              );
            },
          },
          {
            //
            path: "fac_pla_list/fac_pla_list_app",
            name: "facPLAListApp",
            config: "./pages/claim/facPLAList/facPLAListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/facPLAList/facPLAListApp/index"],
                resolve
              );
            },
          },
          {
            //
            path: "treaty_pla_list/treaty_pla_list_app",
            name: "treatyPlaListApp",
            config: "./pages/claim/treatyPlaList/treatyPlaListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/treatyPlaList/treatyPlaListApp/index"],
                resolve
              );
            },
          },
          {
            //
            path: "event_advice_list/event_advice_list_app",
            name: "eventAdviceListApp",
            config:
              "./pages/claim/eventAdviceList/eventAdviceListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/eventAdviceList/eventAdviceListApp/index"],
                resolve
              );
            },
          },
          {
            // 事故代码查询
            path: "event_code_inquiry/event_code_inquiry_app",
            name: "eventCodeApp",
            config:
              "./pages/claim/eventCodeInquiry/eventCodeInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/eventCodeInquiry/eventCodeInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 准备金重检
            path: "reserve_review/reserve_review_app",
            name: "reserveReviewApp",
            config: "./pages/claim/reserveReview/reserveReviewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/reserveReview/reserveReviewApp/index"],
                resolve
              );
            },
          },
          {
            // 重检流程
            path: "reserve_review/review_process_app",
            name: "reviewProcessApp",
            config: "./pages/claim/reserveReview/reviewProcessApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/reserveReview/reviewProcessApp/index"],
                resolve
              );
            },
            children: [
              {
                //
                path: "registration/registration_app",
                name: "registrationAppChildren1",
                config:
                  "./pages/claim/registration/registrationApp/index.config",
                component: function (resolve) {
                  require.async(
                    ["./pages/claim/registration/registrationApp/index"],
                    resolve
                  );
                },
              },
            ],
          },
          {
            // 重检报表
            path: "reserve_review/review_report_app",
            name: "reviewReportApp",
            config: "./pages/claim/reserveReview/reviewReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/reserveReview/reviewReportApp/index"],
                resolve
              );
            },
          },
          {
            // 打印文档
            path: "print_documents/rprint_documents_app",
            name: "printDocumentsApp",
            config:
              "./pages/claim/printDocuments/printDocumentsApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/printDocuments/printDocumentsApp/index"],
                resolve
              );
            },
          },
          {
            // 律师审查
            path: "solicitor/solicitor_app",
            name: "solicitorApp",
            config: "./pages/claim/solicitor/solicitorApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/solicitor/solicitorApp/index"],
                resolve
              );
            },
            children: [
              {
                //
                path: "registration/registration_app",
                name: "registrationAppChildren3",
                config:
                  "./pages/claim/registration/registrationApp/index.config",
                component: function (resolve) {
                  require.async(
                    ["./pages/claim/registration/registrationApp/index"],
                    resolve
                  );
                },
              },
            ],
          },
          {
            // 评价查询
            path: "third/query_appraisal_app",
            name: "queryAppraisalApp",
            config: "./pages/claim/third/queryAppraisalApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/third/queryAppraisalApp/index"],
                resolve
              );
            },
          },
          {
            // 评价问题配置
            path: "third/questions_config_app",
            name: "questionsConfigApp",
            config: "./pages/claim/third/questionsConfigApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/third/questionsConfigApp/index"],
                resolve
              );
            },
          },
          {
            // 初始化评价问题页面
            path: "third/edit_appraisal_app",
            name: "editAppraisalApp",
            config: "./pages/claim/third/editAppraisalApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/third/editAppraisalApp/index"],
                resolve
              );
            },
          },
          {
            // 拒赔
            path: "repudiation/repudiation_app",
            name: "repudiationApp",
            config: "./pages/claim/repudiation/repudiationApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/repudiation/repudiationApp/index"],
                resolve
              );
            },
          },
          {
            // 拒赔审核
            path: "repudiation/approvers_app",
            name: "repudiationApproversApp",
            config: "./pages/claim/repudiation/repudiationApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/claim/repudiation/repudiationApp/repudiationApprovers/index",
                ],
                resolve
              );
            },
            children: [
              {
                //
                path: "registration/registration_app",
                name: "registrationAppChildren2",
                config:
                  "./pages/claim/registration/registrationApp/index.config",
                component: function (resolve) {
                  require.async(
                    ["./pages/claim/registration/registrationApp/index"],
                    resolve
                  );
                },
              },
            ],
          },
          {
            // 初始化准备金配置
            path: "initReserve/init_reserve_config_app",
            name: "queryInitReserveApp",
            config: "./pages/claim/initReserve/index.config",
            component: function (resolve) {
              require.async(["./pages/claim/initReserve/index"], resolve);
            },
          },
          {
            // Maintenance Industry Travel Claims
            path: "industry_travel_app",
            name: "industryTravelApp",
            config:
              "./pages/claim/industryTravel/industryTravelApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/industryTravel/industryTravelApp/index"],
                resolve
              );
            },
          },
          {
            // Case Assign
            path: "case_assign_app",
            name: "caseAssignApp",
            config: "./pages/claim/caseAssign/caseAssignApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/caseAssign/caseAssignApp/index"],
                resolve
              );
            },
          },
          {
            // recovery查询
            path: "recovery/query_recovery_App",
            name: "queryRecoveryApp",
            config: "./pages/claim/registration/registrationApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/claim/registration/registrationApp/components/recovery/queryRecoveryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 上传文档到公共网盘
            path: "upload_docs_app",
            name: "uploadDocsApp",
            config: "./pages/claim/uploadDocs/uploadDocsApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/claim/uploadDocs/uploadDocsApp/index"],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/finance", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 收付登记
            path: "payment_receipt/p_r_register_app",
            name: "cdRegisterApp",
            config: "./pages/finance/creditDebit/cdRegisterApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdRegisterApp/index"],
                resolve
              );
            },
          },
          {
            // 收付登记修改
            path: "payment_receipt/p_r_register_modify_app",
            name: "cdRegisterModifyApp",
            config:
              "./pages/finance/creditDebit/cdRegisterModifyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdRegisterModifyApp/index"],
                resolve
              );
            },
          },
          {
            // 收付登记复核
            path: "payment_receipt/p_r_register_check_app",
            name: "cdRegisterCheckApp",
            config:
              "./pages/finance/creditDebit/cdRegisterCheckApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdRegisterCheckApp/index"],
                resolve
              );
            },
          },
          {
            // 到账确认
            path: "payment_receipt/p_r_receipt_confirm_app",
            name: "cdReceiptConfirmApp",
            config:
              "./pages/finance/creditDebit/cdReceiptConfirmApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdReceiptConfirmApp/index"],
                resolve
              );
            },
          },
          {
            // 到账确认复核
            path: "payment_receipt/p_r_receipt_confirm_check_app",
            name: "cdReceiptConfirmCheckApp",
            config:
              "./pages/finance/creditDebit/cdReceiptConfirmCheckApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdReceiptConfirmCheckApp/index"],
                resolve
              );
            },
          },
          {
            // 收付登记查询
            path: "payment_receipt/p_r_register_inquiry_app",
            name: "cdRegisterInquiryApp",
            config:
              "./pages/finance/creditDebit/cdRegisterInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdRegisterInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 收付登记红冲
            path: "payment_receipt/p_r_register_correction_app",
            name: "cdRegisterCorrectionApp",
            config:
              "./pages/finance/creditDebit/cdRegisterCorrectionApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/cdRegisterCorrectionApp/index"],
                resolve
              );
            },
          },
          {
            // 承保应收应付查询
            path: "document/document_uw_receivable_payable_inquiry_app",
            name: "documentUWRPInquiryApp",
            config:
              "./pages/finance/document/documentUWRPInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/document/documentUWRPInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 理赔应收应付查询
            path: "document/document_claim_receivable_payable_inquiry_app",
            name: "documentClaimRPInquiryApp",
            config:
              "./pages/finance/document/documentClaimRPInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/document/documentClaimRPInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 再保应收应付查询
            path:
              "document/document_reinsurance_receivable_payable_inquiry_app",
            name: "documentReinsuranceRPInquiryApp",
            config:
              "./pages/finance/document/documentReinsuranceRPInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/document/documentReinsuranceRPInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 无单预收处理
            path: "payment_before_cover/payment_before_cover_app",
            name: "paymentBeforeCoverApp",
            config:
              "./pages/finance/paymentBeforeCover/paymentBeforeCoverApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/paymentBeforeCover/paymentBeforeCoverApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 账户交易处理
            path: "account_transaction/account_transaction_process_app",
            name: "accountTransactionProcessApp",
            config:
              "./pages/finance/accountTransaction/accountTransactionProcessApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/accountTransaction/accountTransactionProcessApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 新增账户
            path:
              "account_transaction/account_transaction_process_app/add_account/index",
            name: "accountTransactionProcessAddApp",
            config:
              "./pages/finance/accountTransaction/accountTransactionProcessApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/accountTransaction/accountTransactionProcessApp/pages/addAccountIndex",
                ],
                resolve
              );
            },
          },
          {
            // 账户交易明细处理
            path: "account_transaction/account_transaction_detail_app",
            name: "accountTransactionDetailApp",
            config:
              "./pages/finance/accountTransaction/accountTransactionDetailApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/accountTransaction/accountTransactionDetailApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 银行代码查询
            path: "bank_account_maintenance/bank_code_inquiry_app",
            name: "bankCodeInquiryApp",
            config:
              "./pages/finance/bankAccountMaintenance/bankCodeInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/bankAccountMaintenance/bankCodeInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 银行账号维护
            path: "bank_account_maintenance/bank_account_maintenance_app",
            name: "bankAccountMaintenanceApp",
            config:
              "./pages/finance/bankAccountMaintenance/bankAccountMaintenanceApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/bankAccountMaintenance/bankAccountMaintenanceApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 支票管理
            path: "cheque_management/cheque_management_app",
            name: "chequeManagementApp",
            config:
              "./pages/finance/chequeManagement/chequeManagementApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/chequeManagement/chequeManagementApp/index"],
                resolve
              );
            },
          },
          {
            // 支票签名
            path: "cheque_management/cheque_sign_app",
            name: "chequeSignApp",
            config:
              "./pages/finance/chequeManagement/chequeSignApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/chequeManagement/chequeSignApp/index"],
                resolve
              );
            },
          },
          {
            // 综合查询
            path: "general_inquiry/general_inquiry_app",
            name: "generalInquiryApp",
            config:
              "./pages/finance/generalInquiry/generalInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/generalInquiry/generalInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 凭证类型查询
            path: "voucher_template/voucher_type_inquiry_app",
            name: "voucherTypeInquiryApp",
            config:
              "./pages/finance/voucherTemplate/voucherTypeInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/voucherTemplate/voucherTypeInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 收付方式与科目对应查询
            path:
              "voucher_template/p_r_method_a_c_subject_relation_inquiry_app",
            name: "CDMethodACSubjectRelationInquiryApp",
            config:
              "./pages/finance/voucherTemplate/CDMethodACSubjectRelationInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/voucherTemplate/CDMethodACSubjectRelationInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 凭证分录
            path: "voucher_template/voucher_entry_app",
            name: "voucherEntryApp",
            config:
              "./pages/finance/voucherTemplate/voucherEntryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/voucherTemplate/voucherEntryApp/index"],
                resolve
              );
            },
          },
          {
            // 凭证分录与业务类型MAP
            path: "voucher_template/voucher_entry_business_type_map_app",
            name: "voucherEntryBusinessTypeMapApp",
            config:
              "./pages/finance/voucherTemplate/voucherEntryBusinessTypeMapApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/voucherTemplate/voucherEntryBusinessTypeMapApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 凭证分录与科目MAP
            path: "voucher_template/voucher_entry_a_c_subject_map_app",
            name: "voucherEntryACSubjectMapApp",
            config:
              "./pages/finance/voucherTemplate/voucherEntryACSubjectMapApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/voucherTemplate/voucherEntryACSubjectMapApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 核算单位定义维护
            path: "system_maintenance/accounting_unit_definition_app",
            name: "accountingUnitDefinitionApp",
            config:
              "./pages/finance/systemMaintenance/accountingUnitDefinitionApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/systemMaintenance/accountingUnitDefinitionApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 期间关闭
            path: "system_maintenance/due_date_app",
            name: "dueDateApp",
            config: "./pages/finance/systemMaintenance/dueDateApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/systemMaintenance/dueDateApp/index"],
                resolve
              );
            },
          },
          {
            // 修改助记码
            path: "payment_receipt/mnemonic_code_edit_app",
            name: "mnemonicCodeEditApp",
            config:
              "./pages/finance/creditDebit/mnemonicCodeEditApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/creditDebit/mnemonicCodeEditApp/index"],
                resolve
              );
            },
          },
          {
            // 批量生成佣金
            path: "auto_generate_p_v_transactions/auto_generate_commission_app",
            name: "autoGenerateCommissionApp",
            config:
              "./pages/finance/autoGeneratePVTransactions/autoGenerateCommissionApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/autoGeneratePVTransactions/autoGenerateCommissionApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 批量生成理赔杂费
            path: "auto_generate_p_v_transactions/auto_generate_qc_app",
            name: "autoGenerateQCApp",
            config:
              "./pages/finance/autoGeneratePVTransactions/autoGenerateQCApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/autoGeneratePVTransactions/autoGenerateQCApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 账单打印
            path: "print/statements_print_app",
            name: "statementsPrintApp",
            config: "./pages/finance/print/statementsPrintApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/print/statementsPrintApp/index"],
                resolve
              );
            },
          },
          {
            // 月度账单打印
            path: "print/monthly_report_app",
            name: "monthlyReportApp",
            config: "./pages/finance/print/monthlyReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/print/monthlyReportApp/index"],
                resolve
              );
            },
          },
          {
            // 月度SOA账单打印报表 Monthly SOA Print List Report
            path: "print/monthly_soa_report_app",
            name: "monthlySoaReportApp",
            config: "./pages/finance/print/monthlySoaReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/print/monthlySoaReportApp/index"],
                resolve
              );
            },
          },
          {
            // 信用限额查询
            path: "credit_limit_inquiry/credit_limit_inquiry_app",
            name: "creditLimitInquiryApp",
            config:
              "./pages/finance/creditLimitInquiry/creditLimitInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/creditLimitInquiry/creditLimitInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // aged report打印
            path: "print/age_report_app",
            name: "ageReportApp",
            config: "./pages/finance/print/ageReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/print/ageReportApp/index"],
                resolve
              );
            },
          },
          {
            // gst report打印
            path: "print/gst_report_app",
            name: "gstReportApp",
            config: "./pages/finance/print/gstReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/print/gstReportApp/index"],
                resolve
              );
            },
          },
          {
            // 收付凭证查询
            path: "voucher_management/voucher_inquiry_app",
            name: "voucherInquiryApp",
            config:
              "./pages/finance/voucherManagement/voucherInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/voucherManagement/voucherInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 账期分页查询
            path: "period_management/period_inquiry_app",
            name: "periodInquiryApp",
            config:
              "./pages/finance/periodManagement/periodInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/periodManagement/periodInquiryApp/index"],
                resolve
              );
            },
          },
          {
            //应收应付-手工账单查询
            path: "manual_bill/manualbill_inquiry_app",
            name: "gpManualBillMainInquiryApp",
            config:
              "./pages/finance/gpManualBillMain/gpManualBillMainInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/finance/gpManualBillMain/gpManualBillMainInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            //应收应付-手工账单增加
            path: "manual_bill/manual_bill_add_app",
            name: "gpManualBillMainAddApp",
            config:
              "./pages/finance/gpManualBillMain/gpManualBillMainApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/finance/gpManualBillMain/gpManualBillMainApp/index"],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/sales", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 新增干系人
            path: "party/party_new_app",
            name: "partyNewApp",
            config: "./pages/sales/party/partyNewApp/index.config",
            component: function (resolve) {
              require.async(["./pages/sales/party/partyNewApp/index"], resolve);
            },
          },
          {
            // 查询干系人
            path: "party/party_inquiry_app",
            name: "partyInquiryApp",
            config: "./pages/sales/party/partyInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/party/partyInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 黑名单管理
            path: "party/black_list_app",
            name: "blackListApp",
            config: "./pages/sales/party/blackListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/party/blackListApp/index"],
                resolve
              );
            },
          },
          {
            // 新增协议
            path: "account/account_new_app",
            name: "accountNewApp",
            config: "./pages/sales/account/accountNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/account/accountNewApp/index"],
                resolve
              );
            },
          },
          {
            // 查询协议
            path: "account/account_inquiry_app",
            name: "accountInquiryApp",
            config: "./pages/sales/account/accountInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/account/accountInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 新增账户
            path: "finance/finance_new_app",
            name: "financeNewApp",
            config: "./pages/sales/finance/financeNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/finance/financeNewApp/index"],
                resolve
              );
            },
          },
          {
            // 查询账户
            path: "finance/finance_inquiry_app",
            name: "financeInquiryApp",
            config: "./pages/sales/finance/financeInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/sales/finance/financeInquiryApp/index"],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/underwriting", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 新增预约协议
            path: "openCover/open_cover_new_app",
            name: "openCoverNewApp",
            config:
              "./pages/underwriting/openCover/openCoverNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/openCover/openCoverNewApp/index"],
                resolve
              );
            },
          },
          {
            // 查询预约协议
            path: "openCover/open_cover_inquiry_app",
            name: "openCoverInquiryApp",
            config:
              "./pages/underwriting/openCover/openCoverInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/openCover/openCoverInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 新增询价
            path: "quotation/quotation_first_app",
            name: "quotationFirstApp",
            config:
              "./pages/underwriting/quotation/quotationFirstApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/quotation/quotationFirstApp/index"],
                resolve
              );
            },
          },
          {
            // 新增询价
            path: "quotation/quotation_new_app",
            name: "quotationNewApp",
            config:
              "./pages/underwriting/quotation/quotationNewAppDev/index.config", //开发
            //config   : './pages/underwriting/quotation/quotationNewApp/index.config',
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/quotation/quotationNewAppDev/index"],
                resolve
              ); //开发
              //require.async(['./pages/underwriting/quotation/quotationNewApp/index'], resolve);
            },
          },
          {
            // 询价查询
            path: "quotation/quotation_query_app",
            name: "quotationQueryApp",
            config:
              "./pages/underwriting/quotation/quotationQueryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/quotation/quotationQueryApp/index"],
                resolve
              );
            },
          },
          {
            // 询价轨迹查询
            path: "quotationCopy/quotationCopy_query_app",
            name: "quotationCopyQueryApp",
            config:
              "./pages/underwriting/quotationCopy/quotationCopyQueryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/quotationCopy/quotationCopyQueryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 查询保单
            path: "policy/policy_inquiry_app",
            name: "policyInquiryApp",
            config: "./pages/underwriting/policy/policyInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/policy/policyInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 保单保费查询
            path: "premiumSysPolicy/premium_Sys_Policy_Inquiry_App",
            name: "premiumSysPolicyInquiryApp",
            config:
              "./pages/underwriting/premiumSysPolicy/premiumSysPolicyInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/premiumSysPolicy/premiumSysPolicyInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 到期清单查询
            path: "renewal/renewalList_inquiry_app",
            name: "renewalListInquiryApp",
            config:
              "./pages/underwriting/renewal/renewalListInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/renewal/renewalListInquiryApp/index"],
                resolve
              );
            },
          },
          /* ,{ //街区查询
                          path: 'subject/block/block_inquiry_app',
                          name: 'blockInquiryApp',
                          config: './pages/underwriting/subject/block/blockInquiryApp/index.config',
                          component: function(resolve) {
                              require.async(['./pages/underwriting/subject/block/blockInquiryApp/index'], resolve);
                          }
                      },{ //街区新增
                          path: 'subject/block/block_new_app',
                          name: 'blockNewApp',
                          config: './pages/underwriting/subject/block/blockNewApp/index.config',
                          component: function(resolve) {
                              require.async(['./pages/underwriting/subject/block/blockNewApp/index'], resolve);
                          }
                      }*/
          {
            // 船卡查询
            path: "subject/vessel/vessel_inquiry_app",
            name: "vesselInquiryApp",
            config:
              "./pages/underwriting/subject/vessel/vesselInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/subject/vessel/vesselInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 船卡新增
            path: "subject/vessel/vessel_new_app",
            name: "vesselNewApp",
            config:
              "./pages/underwriting/subject/vessel/vesselNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/subject/vessel/vesselNewApp/index"],
                resolve
              );
            },
          },
          {
            // 航程卡查询
            path: "subject/voyage/voyage_inquiry_app",
            name: "voyageInquiryApp",
            config:
              "./pages/underwriting/subject/voyage/voyageInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/subject/voyage/voyageInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 航程卡新增
            path: "subject/voyage/voyage_new_app",
            name: "voyageNewApp",
            config:
              "./pages/underwriting/subject/voyage/voyageNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/subject/voyage/voyageNewApp/index"],
                resolve
              );
            },
          },
          {
            // 车型查询
            path: "businessMaintenance/vehicleModel/model_inquiry_app",
            name: "modelInquiryApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleModelMaintenance/modelInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleModelMaintenance/modelInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 车型新增
            path: "businessMaintenance/vehicleModel/model_new_app",
            name: "modelNewApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleModelMaintenance/modelNewApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleModelMaintenance/modelNewApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 制造商查询
            path: "businessMaintenance/vehicleMake/make_inquiry_app",
            name: "makeInquiryApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleMakeMaintenance/makeInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleMakeMaintenance/makeInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 制造商新增
            path: "businessMaintenance/vehicleMake/make_new_app",
            name: "makeNewApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleMakeMaintenance/makeNewApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleMakeMaintenance/makeNewApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 车险查询
            path: "businessMaintenance/vehicleNcdMaintenance/ncd_inquiry_app",
            name: "ncdInquiryApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleNcdMaintenance/ncdInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleNcdMaintenance/ncdInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 车险增加
            path: "businessMaintenance/vehicleNcdMaintenance/ncd_new_app",
            name: "ncdNewApp",
            config:
              "./pages/underwriting/businessMaintenance/vehicleNcdMaintenance/ncdNewApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessMaintenance/vehicleNcdMaintenance/ncdNewApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 批改申请处理
            path: "endorsement/ea_app",
            name: "eaApp",
            config: "./pages/underwriting/endorsement/eaApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/endorsement/eaApp/index"],
                resolve
              );
            },
          },
          {
            // 批改申请查询
            path: "endorsement/ea_injury_app",
            name: "eaInjuryApp",
            config: "./pages/underwriting/endorsement/eaInjuryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/endorsement/eaInjuryApp/index"],
                resolve
              );
            },
          },
          {
            // 批改查询
            path: "endorsement/e_injury_app",
            name: "eInjuryApp",
            config: "./pages/underwriting/endorsement/eInjuryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/endorsement/eInjuryApp/index"],
                resolve
              );
            },
          },
          {
            // 批改原始保单
            path: "endorsement/original_policy_app",
            name: "originalPolicyApp",
            config:
              "./pages/underwriting/endorsement/originalPolicyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/endorsement/originalPolicyApp/index"],
                resolve
              );
            },
          },
          {
            // 批改冲销
            path: "endorsement/write_off_app",
            name: "writeOffApp",
            config: "./pages/underwriting/endorsement/writeOffApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/endorsement/writeOffApp/index"],
                resolve
              );
            },
          },
          {
            // 暂保查询
            path: "cover_note/cover_note_inquiry_app",
            name: "coverNoteInquiryApp",
            config:
              "./pages/underwriting/coverNote/coverNoteInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/coverNote/coverNoteInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 申报新增
            path: "declaration/declaration_new_app",
            name: "declarationNewApp",
            config:
              "./pages/underwriting/declaration/declarationNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/declaration/declarationNewApp/index"],
                resolve
              );
            },
          },
          {
            // 申报查询
            path: "declaration/declaration_inquiry_app",
            name: "declarationInquiryApp",
            config:
              "./pages/underwriting/declaration/declarationInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/declaration/declarationInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 申报查询
            path: "declaration/declaration_to_policy_app",
            name: "declarationToPolicyApp",
            config:
              "./pages/underwriting/declaration/declarationToPolicyApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/declaration/declarationToPolicyApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 询价打印查询
            path: "print/quotation_print_inquiry_app",
            name: "quotationPrintInquiryApp",
            config:
              "./pages/underwriting/print/quotationPrintInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/quotationPrintInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 保单打印查询
            path: "print/policy_print_inquiry_app",
            name: "policyPrintInquiryApp",
            config:
              "./pages/underwriting/print/policyPrintInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/policyPrintInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 批单打印查询
            path: "print/endorsement_print_inquiry_app",
            name: "endorsementPrintInquiryApp",
            config:
              "./pages/underwriting/print/endorsementPrintInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/endorsementPrintInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 暂保打印查询
            path: "print/cover_note_print_inquiry_app",
            name: "coverNotePrintInquiryApp",
            config:
              "./pages/underwriting/print/coverNotePrintInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/coverNotePrintInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 预约协议打印查询
            path: "print/open_cover_print_inquiry_app",
            name: "openCoverPrintInquiryApp",
            config:
              "./pages/underwriting/print/openCoverPrintInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/openCoverPrintInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 保单数据下载
            path: "policy/policyUploadGOV/data_dowload_to_mom_app",
            name: "dataDownloadToMoMApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/dataDownloadToMoMApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/dataDownloadToMoMApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传MOM系统
            path: "policy/policyUploadGOV/upload_return_data_to_mom_app",
            name: "uploadReturnDataToMoMApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadReturnDataToMoMApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadReturnDataToMoMApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 保单数据下载
            path: "policy/policyUploadGOV/data_dowload_to_lta_app",
            name: "dataDownloadToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/dataDownloadToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/dataDownloadToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传LTA系统
            path: "policy/policyUploadGOV/upload_return_data_to_lta_app",
            name: "uploadReturnDataToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadReturnDataToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadReturnDataToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传LTA系统
            path: "policy/policyUploadGOV/upload_b_text_data_to_lta_app",
            name: "uploadBtextDataToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadBtextDataToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadBtextDataToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传LTA系统
            path: "policy/policyUploadGOV/upload_c_text_data_to_lta_app",
            name: "uploadCtextDataToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadCtextDataToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadCtextDataToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传LTA系统
            path: "policy/policyUploadGOV/upload_d_text_data_to_lta_app",
            name: "uploadDtextDataToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadDtextDataToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadDtextDataToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 返回数据上传LTA系统
            path: "policy/policyUploadGOV/upload_e_text_data_to_lta_app",
            name: "uploadEtextDataToLTAApp",
            config:
              "./pages/underwriting/policy/policyUploadGOV/uploadEtextDataToLTAApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/policy/policyUploadGOV/uploadEtextDataToLTAApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 打印前选项
            path: "print/policy_selection_app",
            name: "policySelectionApp",
            config:
              "./pages/underwriting/print/policySelectionApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/print/policySelectionApp/index"],
                resolve
              );
            },
          },
          {
            // 风险累积打印
            path: "risk_accumulation/risk_accumulation_report_app",
            name: "riskAccumulationReportApp",
            config:
              "./pages/underwriting/riskAccumulation/riskAccumulationReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/riskAccumulation/riskAccumulationReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 风险累积查询businessMaintenance
            path: "riskAccumulation/risk_accumulation_inquiry_app",
            name: "riskAccumulationInquiryApp",
            config:
              "./pages/underwriting/riskAccumulation/riskAccumulationInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/riskAccumulation/riskAccumulationInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 风险累积配置businessMaintenance
            path: "riskAccumulation/risk_management_allocation_app",
            name: "riskManagementAllocationApp",
            config:
              "./pages/underwriting/riskAccumulation/riskManagementAllocationApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/riskAccumulation/riskManagementAllocationApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 上传
            path: "upload/view_documentation_app",
            name: "viewDocumentationApp",
            config:
              "./pages/underwriting/upload/viewDocumentationApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/upload/viewDocumentationApp/index"],
                resolve
              );
            },
          },
          {
            // 上传
            path: "upload/view_documentation_app",
            name: "viewDocumentationApp",
            config:
              "./pages/underwriting/upload/viewDocumentationApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/underwriting/upload/viewDocumentationApp/index"],
                resolve
              );
            },
          },
          {
            // 查询年利润率业务清单
            path: "business_list/profitability_function_inquiry_app",
            name: "profitabilityFunctionInquiryApp",
            config:
              "./pages/underwriting/businessList/profitabilityFunctionInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessList/profitabilityFunctionInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 保单保费统计
            path: "business_list/policy_premium_register_app",
            name: "policyPremiumRegisterApp",
            config:
              "./pages/underwriting/businessList/policyPremiumRegisterApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessList/policyPremiumRegisterApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 保单黑名单统计
            path: "business_list/policy_list_for_blacklist_app",
            name: "policyListForBlackListApp",
            config:
              "./pages/underwriting/businessList/policyListForBlackListApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/businessList/policyListForBlackListApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "ri_report/ri_outward_app",
            name: "outwardApp",
            config:
              "./pages/underwriting/riReportforCcaCcd/outwardReportListApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/riReportforCcaCcd/outwardReportListApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "ri_report/ri_inward_app",
            name: "inwardApp",
            config:
              "./pages/underwriting/riReportforCcaCcd/inwardReportListApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/underwriting/riReportforCcaCcd/inwardReportListApp/index",
                ],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/reinsurance", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 合约代码维护
            path: "products/treaty/treaty_code_app",
            name: "treatyCodeApp",
            config:
              "./pages/reinsurance/products/treaty/treatyCodeApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/treatyCodeApp/index"],
                resolve
              );
            },
          },
          {
            // 已决分赔案查询
            path: "ri_claim/setteled_claim_inquiry_app",
            name: "setteledClaimInquiryApp",
            config:
              "./pages/reinsurance/riClaim/setteledClaimInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/riClaim/setteledClaimInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 非比例合约主信息
            path: "products/treaty/non_prop_app",
            name: "nonPropTreatyApp",
            config:
              "./pages/reinsurance/products/treaty/nonPropTreatyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/nonPropTreatyApp/index"],
                resolve
              );
            },
          },
          {
            path: "products/treaty/treaty_inquiry_app",
            name: "treatyApp",
            config:
              "./pages/reinsurance/products/treaty/treatyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/treatyApp/index"],
                resolve
              );
            },
          },
          {
            // 非比例合约维护
            path: "products/treaty/non_prop_layer_app",
            name: "nonPropLayerApp",
            config:
              "./pages/reinsurance/products/treaty/nonPropLayerApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/nonPropLayerApp/index"],
                resolve
              );
            },
          },
          {
            // 自留额计划维护
            path: "products/treaty/retention_plan_app",
            name: "retentionPlanApp",
            config:
              "./pages/reinsurance/products/treaty/retentionPlanApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/retentionPlanApp/index"],
                resolve
              );
            },
          },
          {
            // 自留额计划维护
            path: "products/treaty/risk_unit_retention_plan_app",
            name: "riskUnitRetentionPlanApp",
            config:
              "./pages/reinsurance/products/treaty/riskUnitRetentionPlanApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reinsurance/products/treaty/riskUnitRetentionPlanApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 合约优先级计划维护
            path: "products/treaty/treaty_priority_app",
            name: "treatyPriorityApp",
            config:
              "./pages/reinsurance/products/treaty/treatyPriorityApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/treaty/treatyPriorityApp/index"],
                resolve
              );
            },
          },
          {
            // 综合风险维护
            path: "products/code/comprehensive_risk_app",
            name: "comprehensiveRiskApp",
            config:
              "./pages/reinsurance/products/code/comprehensiveRiskApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reinsurance/products/code/comprehensiveRiskApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 再保险种维护
            path: "products/code/ri_risk_app",
            name: "riRiskApp",
            config: "./pages/reinsurance/products/code/riRiskApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/code/riRiskApp/index"],
                resolve
              );
            },
          },
          {
            // 再保险种维护
            path: "products/code/risk_to_ri_riskApp",
            name: "riskToRiRiskApp",
            config:
              "./pages/reinsurance/products/code/riskToRiRiskApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/code/riskToRiRiskApp/index"],
                resolve
              );
            },
          },
          {
            // 现金赔款处理
            path: "accounting/cash_call_app",
            name: "cashCallApp",
            config: "./pages/reinsurance/accounting/cashCallApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/cashCallApp/index"],
                resolve
              );
            },
          },
          {
            // 特殊账单录入
            path: "accounting/special_statement_app",
            name: "specialStatementApp",
            config:
              "./pages/reinsurance/accounting/specialStatementApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/specialStatementApp/index"],
                resolve
              );
            },
          },
          {
            // 事故摊回查询
            path: "accounting/event_risk_recovery_inquiry_app",
            name: "eventRiskRecoveryApp",
            config:
              "./pages/reinsurance/accounting/eventRiskRecoveryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/eventRiskRecoveryApp/index"],
                resolve
              );
            },
          },
          {
            // 险位摊回查询
            path: "accounting/risk_ri_recovery_inquiry_app",
            name: "riskRiRecoveryInquiryApp",
            config:
              "./pages/reinsurance/accounting/riskRiRecoveryInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reinsurance/accounting/riskRiRecoveryInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 合约对外账单打印
            path: "accounting/treaty_ri_statement_app",
            name: "treatyRiStatementApp",
            config:
              "./pages/reinsurance/accounting/treatyRiStatementApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/treatyRiStatementApp/index"],
                resolve
              );
            },
          },
          {
            // 总账管理
            path: "accounting/general_ledger_app",
            name: "generalLedgerApp",
            config:
              "./pages/reinsurance/accounting/generalLedgerApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/generalLedgerApp/index"],
                resolve
              );
            },
          },
          {
            // 帐单离线任务管理
            path: "accounting/ac_offline_tasks_app",
            name: "acOfflineTasksApp",
            config:
              "./pages/reinsurance/accounting/acOfflineTasksApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/acOfflineTasksApp/index"],
                resolve
              );
            },
          },
          {
            // 试出帐单任务管理
            path: "accounting/ac_tasks_test_app",
            name: "acTasksTestApp",
            config:
              "./pages/reinsurance/accounting/acTasksTestApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/acTasksTestApp/index"],
                resolve
              );
            },
          },
          {
            // 事故未决查询
            path: "accounting/event_xol_o_s_claim_inquiry_app",
            name: "eventXolOSClaimInquiryApp",
            config:
              "./pages/reinsurance/accounting/eventXolOSClaimInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reinsurance/accounting/eventXolOSClaimInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // 帐单离线任务管理
            path: "products/code/reins_risk_app",
            name: "reinsRiskApp",
            config:
              "./pages/reinsurance/products/code/reinsRiskApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/products/code/reinsRiskApp/index"],
                resolve
              );
            },
          },
          {
            // 询价单确认
            path: "ri_quotation/ri_quotation_confirm_app",
            name: "riQuotationConfirmApp",
            config:
              "./pages/reinsurance/riQuotation/riQuotationConfirmApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/riQuotation/riQuotationConfirmApp/index"],
                resolve
              );
            },
          },
          {
            // 险位未决查询
            path: "accounting/risk_xol_os_claim_inquiry_app",
            name: "riskXolOsClaimInquiryApp",
            config:
              "./pages/reinsurance/accounting/riskXolOsClaimInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reinsurance/accounting/riskXolOsClaimInquiryApp/index",
                ],
                resolve
              );
            },
          },
          {
            // MDP A/C
            path: "accounting/mdp_ac_app",
            name: "mdpAcApp",
            config: "./pages/reinsurance/accounting/mdpAcApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/mdpAcApp/index"],
                resolve
              );
            },
          },
          {
            // ADJ A/C
            path: "accounting/adj_ac_app",
            name: "adjAcApp",
            config: "./pages/reinsurance/accounting/adjAcApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/adjAcApp/index"],
                resolve
              );
            },
          },
          {
            // 保单
            path: "ri_policy/ri_policy_inquiry_app",
            name: "riPolicyInquiryApp",
            config:
              "./pages/reinsurance/riPolicy/riPolicyInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/riPolicy/riPolicyInquiryApp/index"],
                resolve
              );
            },
          },
          {
            // 业务号回填
            path: "fac_reference_no/fac_reference_no_inquiry_app",
            name: "facReferenceNoApp",
            config:
              "./pages/reinsurance/facReferenceNo/facReferenceNoApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/facReferenceNo/facReferenceNoApp/index"],
                resolve
              );
            },
          },
          {
            // Fac R/I A/C
            path: "accounting/fac_ri_ac_app",
            name: "facRiAcApp",
            config: "./pages/reinsurance/accounting/facRiAcApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reinsurance/accounting/facRiAcApp/index"],
                resolve
              );
            },
          },
          {
            // Fac R/I A/C
            path: "re_cal_app",
            name: "reCalApp",
            config: "./pages/reinsurance/reCalApp/index.config",
            component: function (resolve) {
              require.async(["./pages/reinsurance/reCalApp/index"], resolve);
            },
          },
        ],
      },
      {
        path: "/qvreport", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // QlickView报表演示1
            path: "report/qlick_view_demo1_app",
            name: "qlickViewDemo1App",
            config:
              "./pages/report/qlickView/demo1App/qlickViewDemo1AppIndex.config",
            component: function (resolve) {
              require.async(
                ["./pages/report/qlickView/demo1App/qlickViewDemo1AppIndex"],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/report_list", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // sql配置管理
            path: "sql_config_app",
            name: "reportSqlConfigApp",
            config: "./pages/reportlist/sqlConfigApp/index.config",
            component: function (resolve) {
              require.async(["./pages/reportlist/sqlConfigApp/index"], resolve);
            },
          },
          {
            // 导出任务管理
            path: "export_task_app",
            name: "exportTaskApp",
            config: "./pages/reportlist/exportTaskApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/reportlist/exportTaskApp/index"],
                resolve
              );
            },
          },
          {
            path: "export_task/underwriting/un_export_a_app",
            name: "unExportOneApp",
            config:
              "./pages/reportlist/exportTask/underwriting/unExportOneApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/underwriting/unExportOneApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/undwriting/profitbility_fun_app",
            name: "profitbilityApp",
            config:
              "./pages/reportlist/exportTask/underwriting/ProfitabilityFunApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/underwriting/ProfitabilityFunApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/list_of_premium_app",
            name: "listOfPremiumApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/listOfPremiumApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/listOfPremiumApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/list_of_bill_app",
            name: "listOfBillApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/listOfBillApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/listOfBillApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/list_of_claim_app",
            name: "listOfPremiumClaimApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/listOfClaimApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/listOfClaimApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/os_claim_summary_app",
            name: "osCliamSummaryApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/osCliamSummaryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/osCliamSummaryApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/monthly_list_app",
            name: "monthlyListApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/monthlyListApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/monthlyListApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/premium_summary_app",
            name: "premiumSummaryApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/premiumSummaryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/premiumSummaryApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/reinsurance/claim_summary_app",
            name: "claimSummaryApp",
            config:
              "./pages/reportlist/exportTask/reinsurance/claimSummaryApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/reinsurance/claimSummaryApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/premium_register_app",
            name: "premiumRegisterReportApp",
            config:
              "./pages/reportlist/exportTask/finance/premiumRegisterReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/premiumRegisterReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/claims_paid_report_app",
            name: "claimsPaidReportApp",
            config:
              "./pages/reportlist/exportTask/finance/claimsPaidReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/claimsPaidReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/os_claim_report_app",
            name: "osClaimReportApp",
            config:
              "./pages/reportlist/exportTask/finance/osClaimReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/osClaimReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/soa_details_report_app",
            name: "soaDetailsReportApp",
            config:
              "./pages/reportlist/exportTask/finance/soaDetailsReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/soaDetailsReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/missing_nos_report_app",
            name: "missingNosReportApp",
            config:
              "./pages/reportlist/exportTask/finance/missingNosReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/missingNosReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/over_credit_limit_report_app",
            name: "overCreditLimitReportApp",
            config:
              "./pages/reportlist/exportTask/finance/overCreditLimitReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/overCreditLimitReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/finance_print_list_report_app",
            name: "financePrintListReportApp",
            config:
              "./pages/reportlist/exportTask/finance/financePrintListReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/financePrintListReportApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "export_task/finance/pr_register_report_app",
            name: "prRegisterReportApp",
            config:
              "./pages/reportlist/exportTask/finance/prRegisterReportApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/reportlist/exportTask/finance/prRegisterReportApp/index",
                ],
                resolve
              );
            },
          },
        ],
      },
      {
        path: "/product", // 父路径，与大模块名字一致
        component: Home, // 固定写法(父组件)
        children: [
          {
            // 功能管理
            name: "proxyApp",
            path: "proxy_app",
            config: "./pages/product/proxyApp/index.config",
            // config: require('./pages/sys/saa/taskApp/index.config'),
            component: function (resolve) {
              require.async(["./pages/product/proxyApp/index"], resolve);
            },
          },
        ],
      },

      //承保管理 by 王松
      {
        path: "/endorsement",
        component: Home,
        children: [
          {
            path: "insure_app", // 投保单录入
            name: "insureApp",
            config: "./pages/selfins/endorsement/insureApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/insureApp/index"],
                resolve
              );
            },
          },
          {
            path: "selectpolicy_app", // 选择保单查询页面
            name: "selectpolicyApp",
            config: "./pages/selfins/endorsement/selectpolicyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/selectpolicyApp/index"],
                resolve
              );
            },
          },
          {
            path: "batchentry_app", // 批单录入
            name: "batchentryApp",
            config: "./pages/selfins/endorsement/batchentryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryApp/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo_app", // 批单详情-金批
            name: "batchentryinfoApp",
            config:
              "./pages/selfins/endorsement/batchentryinfoApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfoApp/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo2_app", // 批单详情-文批
            name: "batchentryinfo2App",
            config:
              "./pages/selfins/endorsement/batchentryinfo2App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo2App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo3_app", // 批单详情-退保
            name: "batchentryinfo3App",
            config:
              "./pages/selfins/endorsement/batchentryinfo3App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo3App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo4_app", // 批单详情-冲销
            name: "batchentryinfo4App",
            config:
              "./pages/selfins/endorsement/batchentryinfo4App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo4App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo5_app", // 批单详情-金批+文批
            name: "batchentryinfo5App",
            config:
              "./pages/selfins/endorsement/batchentryinfo5App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo5App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo6_app", // 批单详情-审核
            name: "batchentryinfo6App",
            config:
              "./pages/selfins/endorsement/batchentryinfo6App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo6App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo7_app", // 历次批单-查看
            name: "batchentryinfo7App",
            config:
              "./pages/selfins/endorsement/batchentryinfo7App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo7App/index"],
                resolve
              );
            },
          },
          {
            path: "batchentryinfo8_app", // 历次批单-查看
            name: "batchentryinfo8App",
            config:
              "./pages/selfins/endorsement/batchentryinfo8App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/batchentryinfo8App/index"],
                resolve
              );
            },
          },
          {
            path: "batch_app", //保批单录入
            name: "batchApp",
            config: "./pages/selfins/endorsement/expenseApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/expenseApp/index"],
                resolve
              );
            },
          },
          {
            path: "inquiry_app", // 保批单查询
            name: "inquiryApp",
            config: "./pages/selfins/endorsement/inquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/inquiryApp/index"],
                resolve
              );
            },
          },
          {
            path: "expense_app", //费用录入详情
            name: "expenseApp",
            config: "./pages/selfins/endorsement/expenseApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/expenseApp/index"],
                resolve
              );
            },
          },
          {
            path: "feeinquiry_app", //费用录入
            name: "feeinquiryApp",
            config: "./pages/selfins/endorsement/feeinquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/endorsement/feeinquiryApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //账单管理 by 王松
      {
        path: "/billing",
        component: Home,
        children: [
          {
            path: "bill_app", //账单查询
            name: "billApp",
            config: "./pages/selfins/billquery/billApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/billquery/billApp/index"],
                resolve
              );
            },
          },
          {
            path: "payment_app", // 实收实付查询
            name: "paymentApp",
            config: "./pages/selfins/billquery/paymentApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/billquery/paymentApp/index"],
                resolve
              );
            },
          },
          {
            path: "shouldpayment_app", // 应收应付查询
            name: "shouldpaymentApp",
            config: "./pages/selfins/billquery/shouldpaymentApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/billquery/shouldpaymentApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //付款申请管理 by 王松
      {
        path: "/payment",
        component: Home,
        children: [
          {
            path: "paymentrequest_app", // 付款查询
            name: "paymentrequestApp",
            config: "./pages/selfins/payment/paymentrequestApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/payment/paymentrequestApp/index"],
                resolve
              );
            },
          },
          {
            path: "paymentrequest2_app", // 付款查询2
            name: "paymentrequest2App",
            config: "./pages/selfins/payment/paymentrequest2App/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/payment/paymentrequest2App/index"],
                resolve
              );
            },
          },
          {
            path: "paymentrequestexamine_app", // 付款审核
            name: "paymentrequestexamineApp",
            config:
              "./pages/selfins/payment/paymentrequestexamineApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/payment/paymentrequestexamineApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //UPR管理 by 王松
      {
        path: "/upr",
        component: Home,
        children: [
          {
            path: "upr_search_app", // UPR管理(查询)
            name: "uprSearchApp",
            config: "./pages/selfins/upr/uprSearchApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/upr/uprSearchApp/index"],
                resolve
              );
            },
          },
          {
            path: "upr_management_add_app", // UPR管理(新增)
            name: "uprManagementAddApp",
            config: "./pages/selfins/upr/uprManagementAddApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/upr/uprManagementAddApp/index"],
                resolve
              );
            },
          },
          {
            path: "upr_fee_app", //未决准备金查询
            name: "uprFeeApp",
            config: "./pages/selfins/upr/uprFeeApp/index.config",
            component: function (resolve) {
              require.async(["./pages/selfins/upr/uprFeeApp/index"], resolve);
            },
          },
          {
            path: "upr_membership_app", //会费查询
            name: "uprMembershipApp",
            config: "./pages/selfins/upr/uprMembershipApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/upr/uprMembershipApp/index"],
                resolve
              );
            },
          },
          {
            path: "upr_membership_app/add_member_app", // IBNR新增
            name: "uprAddMemberApp",
            config:
              "./pages/selfins/upr/uprMembershipApp/uprAddMemberApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/upr/uprMembershipApp/uprAddMemberApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //赔案管理
      {
        path: "/claim",
        component: Home,
        children: [
          {
            path: "notification_inquiry_app", // 赔案查询
            name: "notificationInquiryApp",
            config: "./pages/selfins/claim/notificationInquiryApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/claim/notificationInquiryApp/index"],
                resolve
              );
            },
          },
          {
            path: "claim_view_app", // 原单详情
            name: "claimViewApp",
            config: "./pages/selfins/claim/claimViewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/claim/claimViewApp/index"],
                resolve
              );
            },
          },
          {
            path: "settling_new_app", // 赔案新增
            name: "settlingNewApp",
            config: "./pages/selfins/claim/settlingNewApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/claim/settlingNewApp/index"],
                resolve
              );
            },
          },
          {
            path: "examine_app", // 赔案估损审核页面
            name: "examineApp",
            config: "./pages/selfins/claim/examineApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/claim/examineApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //IBNR管理 罗丹菱
      {
        path: "/ibnr",
        component: Home,
        children: [
          {
            path: "ibnr_management_app", // IBNR管理
            name: "ibnrManagementApp",
            config: "./pages/selfins/ibnr/ibnrManagementApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/ibnr/ibnrManagementApp/index"],
                resolve
              );
            },
          },
          {
            path: "ibnr_management_app/add_ibnr", // IBNR新增
            name: "ibnrManagementAddApp",
            config:
              "./pages/selfins/ibnr/ibnrManagementApp/ibnrManagementAddApp/index.config",
            component: function (resolve) {
              require.async(
                [
                  "./pages/selfins/ibnr/ibnrManagementApp/ibnrManagementAddApp/index",
                ],
                resolve
              );
            },
          },
          {
            path: "out_standing_app", //未决准备金查询
            name: "outStandingApp",
            config: "./pages/selfins/ibnr/outstandingApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/ibnr/outstandingApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //报表查询
      {
        path: "/report",
        component: Home,
        children: [
          {
            path: "premium_bill_app", // 保费账单
            name: "premiumBillApp",
            config: "./pages/selfins/report/premiumbillApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/premiumbillApp/index"],
                resolve
              );
            },
          },
          {
            path: "risk_inspection_app", // 风险检验费
            name: "riskInspectionApp",
            config: "./pages/selfins/report/riskInspectionApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/riskInspectionApp/index"],
                resolve
              );
            },
          },
          {
            path: "indemnity_bill_app", // 赔款账单
            name: "indemnityBillApp",
            config: "./pages/selfins/report/indemnityBillApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/indemnityBillApp/index"],
                resolve
              );
            },
          },
          {
            path: "indemnity_payment_app", // 赔款支付
            name: "indemnityPaymentApp",
            config: "./pages/selfins/report/indemnityPaymentApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/indemnityPaymentApp/index"],
                resolve
              );
            },
          },
          {
            path: "claim_statistics_app", // 赔案统计表
            name: "claimStatisticsApp",
            config: "./pages/selfins/report/claimStatisticsApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/claimStatisticsApp/index"],
                resolve
              );
            },
          },
          {
            path: "statistics_retained_shares_app", // 自留份额统计表
            name: "statisticsRetainSharesApp",
            config:
              "./pages/selfins/report/statisticsRetainSharesApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/statisticsRetainSharesApp/index"],
                resolve
              );
            },
          },
          {
            path: "proposed_underwriting_app", // 拟承保项目基本情况表
            name: "proposedUnderwritingApp",
            config:
              "./pages/selfins/report/proposedUnderwritingApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/proposedUnderwritingApp/index"],
                resolve
              );
            },
          },
          {
            path: "settlement_report_app", //Settlement Report
            name: "settlementReportApp",
            config: "./pages/selfins/report/settlementReportApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/settlementReportApp/index"],
                resolve
              );
            },
          },
          {
            path: "debitNote_list_app", //DebitNote List
            name: "debitNoteListApp",
            config: "./pages/selfins/report/debitNoteListApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/debitNoteListApp/index"],
                resolve
              );
            },
          },
          {
            path: "loss_ratio_app", //赔付率统计表
            name: "lossRatioApp",
            config: "./pages/selfins/report/lossRatioApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/lossRatioApp/index"],
                resolve
              );
            },
          },
          {
            path: "circ_report_quarterly_app", //保监报表-季度
            name: "circReportQuarterlyApp",
            config:
              "./pages/selfins/report/circReportQuarterlyApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/circReportQuarterlyApp/index"],
                resolve
              );
            },
          },
          {
            path: "circ_report_annual_app", //保监报表-年度
            name: "circReportAnnualApp",
            config: "./pages/selfins/report/circReportAnnualApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/report/circReportAnnualApp/index"],
                resolve
              );
            },
          },
        ],
      },
      //管理工具
      {
        path: "/tool",
        component: Home,
        children: [
          {
            path: "accounting_period_app", // 账期管理
            name: "accountingPeriodApp",
            config: "./pages/selfins/tool/accountingPeriodApp/index.config",
            component: function (resolve) {
              require.async(
                ["./pages/selfins/tool/accountingPeriodApp/index"],
                resolve
              );
            },
          },
        ],
      },
    ];

  return router;
});
