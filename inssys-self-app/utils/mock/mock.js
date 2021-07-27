/**
 * mock配置模块
 * @author 陈柱良
 * @time 2017/11/01
 */
define(function(require) {

    var user = require('./data/user'),
        robot = require('./data/robot'),
        reinsurance = require('./data/reinsurance'),
        sys = require('./data/sys');
    return {
        /**
         * mock bootstrapf
         */
        bootstrap: function() {
            var mock = new AxiosMockAdapter(axios);

            //获取菜单
            mock.onGet('/system/menu/find_by_system_code/platform').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Menus]);
                    }, 1000);
                });
            });
            // mock success request
            mock.onGet('/success').reply(200, {
                msg: 'success'
            });

            // mock error request
            mock.onGet('/error').reply(500, {
                msg: 'failure'
            });
            //获取role信息
            mock.onPost('/system/gg_code/find_list').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Select]);
                    }, 1000);
                });
            });
            //获取role信息
            // mock.onGet('/system/ggCode/findBusinessListPageByCode?&_pageSize=10&_pageNo=0').reply(function(config) {
            //     return new Promise(function(resolve, reject) {
            //         setTimeout(function() {
            //             resolve([200, sys.FindBusinessListPageByCode]);
            //         }, 1000);
            //     });
            // });
            //获取roleList信息
            mock.onPost('/system/saa/role/search').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.RoleSearch]);
                    }, 1000);
                });
            });
            //获取role信息
            mock.onGet('/system/saa/role/find_by_pk/3123').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.RoleCode]);
                    }, 1000);
                });
            });
            //获取userList信息
            mock.onPost('/system/saa/user/search').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.UserSearch]);
                    }, 1000);
                });
            });
            //获取所有role信息
            mock.onGet('/system/saa/role/find_all').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.AllRole]);
                    }, 1000);
                });
            });

            //获取user信息
            mock.onGet('/system/saa/user/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.User]);
                    }, 1000);
                });
            });

            //获取robot信息
            mock.onGet('/system/tpsgi/robot/demo/info/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, robot.Robot]);
                    }, 1000);
                });
            });

            //获取robotList信息
            mock.onPost('/system/tpsgi/robot/demo/search').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, robot.RobotList]);
                    }, 1000);
                });
            });

            //获取功能管理分页查询信息
            mock.onPost('/system/saa/task/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.TaskList]);
                    }, 1000);
                });
            });

            //获取功能
            mock.onGet('/system/saa/task/find_by_pk/PLAT_USER_DELETE').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Task]);
                    }, 1000);
                });
            });
            //更新信息
            mock.onPost('/system/saa/task/update').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Success]);
                    }, 1000);
                });
            });
            //更新信息
            mock.onGet('/system/saa/task/delete/PLAT_USER_DELETE').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Success]);
                    }, 1000);
                });
            });
            //获取数据权限分页查询信息
            mock.onPost('/system/saa/factor/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FactorList]);
                    }, 1000);
                });
            });

            //获取数据权限
            mock.onGet('/system/saa/factor/find_by_pk/Version').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Factor]);
                    }, 1000);
                });
            });

            //获取授权列表数据
            mock.onPost('/system/saa/user_power/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.UserPowerList]);
                    }, 1000);
                });
            });

            //获取授权
            mock.onGet('/system/saa/user_power/find_by_id/104').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.UserPower]);
                    }, 1000);
                });
            });

            //刷新
            mock.onPost('/system/jwt/refresh').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Refresh]);
                    }, 1000);
                });
            });

            //登录
            mock.onPost('/system/jwt/login').reply(function(config) {
                //console.log(util.stringForJson(config.data))
                var d = JSON.parse(config.data),
                    userCode = d.userCode,
                    password = d.password;
                return new Promise(function(resolve, reject) {
                    //var user = null;
                    setTimeout(function() {
                        var hasUser = false;
                        if (user.LoginUsers.resData.userCode === userCode && user.LoginUsers.resData.password === password) {
                            //LoginUsers.data.password = undefined;
                            hasUser = true;
                        }

                        if (hasUser) {
                            resolve([200, user.LoginUsers]);
                        } else {
                            resolve([200, { status: 500, statusText: '账号或密码错误' }]);
                        }
                    }, 1000);
                });
            });

            //
            mock.onGet('/system/view/get_view_object/PLAT_SAA_FACTOR').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.Form]);
                    }, 1000);
                });
            });
            mock.onGet('/system/view/get_view_object/product/plan/subject').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.ViewObjectData]);
                    }, 1000);
                });
            });
            //
            mock.onGet('/system/view/get_view_object/PLAT_SAA_TASK').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.TaskForm]);
                    }, 1000);
                });
            });

            mock.onGet('/system/view/get_view_object/GU_QUOTATION_RISK_INFO').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.GU_QUOTATION_RISK_INFO]);
                    }, 1000);
                });
            });
            mock.onGet('/system/view/get_view_object/TPG/D/0006').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.GU_QUOTATION_RISK_TPG]);
                    }, 1000);
                });
            });
            mock.onGet('/system/view/get_view_object/TPG_NameList/D/0006').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.GU_QUOTATION_RISK_TPG_NameList]);
                    }, 1000);
                });
            });
            //ggCode
            mock.onPost('/system/ggCode/findList').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.GgCodeVoList]);
                    }, 1000);
                });
            });

            //ggCode
            mock.onPost('/system/ggCode/findOtherList').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.PageNo]);
                    }, 1000);
                });
            });

            //获取总账管理分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/accounting/general_ledger/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.generalLedgerList]);
                    }, 1000);
                });
            });
            //获取总账管理对外和对内账单信息
            mock.onPost('/system/tpsgi/reinsurance/riClaim/general_ledger/int_or_ext_stmt_index/find_by_pk/1?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.intOrExtStmtList]);
                    }, 1000);
                });
            });
            //获取总账管理statementSummary数据
             mock.onGet('/system/tpsgi/reinsurance/riClaim/general_ledger/statement_summary_index/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.statementSummary]);
                    }, 1000);
                });
            });

            //获取非比例合约主信息分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/products/treaty/non_prop/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.NonPropTreatyList]);
                    }, 1000);
                });
            });

            //获取合约代码分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/products/treaty/treatyCode/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.TreatyCodeVoList]);
                    }, 1000);
                });
            });

            //获取非比例合约主信息详情数据
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/non_prop/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.NonPropTreaty]);
                    }, 1000);
                });
            });
            //获取合约代码分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/products/treaty/proTreaty/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.ProTreatyVoList]);
                    }, 1000);
                });
            });
            //获取事故摊回查询分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/accounting/event_ri_recovery_inquiry/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.eventRiRecInqVoList]);
                    }, 1000);
                });
            });
            //获取险位摊回查询分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/accounting/risk_ri_recovery_inquiry/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.riskRiRecInqVoList]);
                    }, 1000);
                });
            });
            //获取事故超赔的整体摊回信息数据
            mock.onGet('/system/tpsgi/reinsurance/accounting/event_ri_recovery_inquiry/find_by_pk/15FLOODDEC').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.eventRiRecInqRecoveryInfo]);
                    }, 1000);
                });
            });
            //获取险位超赔赔案信息页面数据
            mock.onGet('/system/tpsgi/reinsurance/accounting/risk_ri_recovery_inquiry/find_by_pk/L0035878TA2004-00002CK9').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.riskRiRecInqClaimNoInfo]);
                    }, 1000);
                });
            });
            //获取非比例合约维护分页查询信息
            mock.onPost('/system/tpsgi/reinsurance/products/treaty/non_prop_layer/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.NonPropLayerVoList]);
                    }, 1000);
                });
            });
            //获取非比例合约维护详情数据
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/non_prop_layer/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.NonPropLayer]);
                    }, 1000);
                });
            });
            //获取比例合约维护详情数据
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/proTreaty/find_by_pk/QP2812009').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.proTreatyVo]);
                    }, 1000);
                });
            });
            //获取比例合约维护详情数据
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/treatySectionDetails/find_by_pk/QP2812009').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.treatySectionDetailsVo]);
                    }, 1000);
                });
            });
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/reinsurerDetails/find_by_pk/QP2812009').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.reinsurerDetailsVo]);
                    }, 1000);
                });
            });
              //获取合约代码
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/treatyCode/find_by_pk/QX401').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.treatyVo]);
                    }, 1000);
                });
            });
              //获取自留额计划列表
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/retentionPlan/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.RetentionPlanVoList]);
                    }, 1000);
                });
            });
              //获取自留额计划
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/retentionPlan/find_by_pk/1994').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.RetentionPlanVo]);
                    }, 1000);
                });
            });
              //获取危险单位类型自留额计划列表
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/riskUnitRetentionPlan/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.riskUnitRetentionPlanVoList]);
                    }, 1000);
                });
            });
              //获取危险单位类型自留额计划
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/riskUnitRetentionPlan/find_by_pk/1994').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.riskUnitRetentionPlanVo]);
                    }, 1000);
                });
            });
              //获取合约优先级列表
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/treatyPriority/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.treatyPriorityVoList]);
                    }, 1000);
                });
            });
              //获取合约优先级
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/treatyPriority/find_by_pk/QP219').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.treatyPriorityVo]);
                    }, 1000);
                });
            });
              //获取综合风险列表
            mock.onGet('/system/tpsgi/reinsurance/products/code/comprehensiveRisk/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.comprehensiveRiskVoList]);
                    }, 1000);
                });
            });
              //获取合约优先级
            mock.onGet('/system/tpsgi/reinsurance/products/code/comprehensiveRisk/find_by_pk/CTOWN1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.comprehensiveRiskVo]);
                    }, 1000);
                });
            });
            //获取已决分赔案数据
            mock.onPost('/system/tpsgi/reinsurance/riClaim/setteled_claim_inquiry/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.setteledClaimquiryVo]);
                    }, 1000);
                });
            });
            //获取已决分赔案选中信息（details）详情
            mock.onGet('/system/tpsgi/reinsurance/riClaim/setteled_claim_inquiry/details/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.setteledCIAdetailsVo]);
                    }, 1000);
                });
            });
            //获取已决riPolicyMainTable列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/setteled_claim_inquiry/ri_policy_main_table/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.setteledCIAriPolicyMainTableVo]);
                    }, 1000);
                });
            });
            //获取已决riEndtDetails列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/setteled_claim_inquiry/ri_endt_details/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.setteledCIAriEndtDetailsVo]);
                    }, 1000);
                });
            });
            //获取已决cedingInfo列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/setteled_claim_inquiry/ceding_info/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.setteledCIAcedingInfoVo]);
                    }, 1000);
                });
            });
            //获取未决分赔案数据
            mock.onPost('/system/tpsgi/reinsurance/riClaim/os_claim_inquiry/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.osClaimquiryVo]);
                    }, 1000);
                });
            });
            //获取未决riEndtDetails列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/os_claim_inquiry/ri_endt_details/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.osCIAriEndtDetailsVo]);
                    }, 1000);
                });
            });
            //获取未决riPolicyMainTable列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/os_claim_inquiry/ri_policy_main_table/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.osCIAriPolicyMainTableVo]);
                    }, 1000);
                });
            });
            //获取未决分赔案选中信息（details）详情
            mock.onGet('/system/tpsgi/reinsurance/riClaim/os_claim_inquiry/details/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.osCIAcedingInfoVo]);
                    }, 1000);
                });
            });
            //获取未决settledRiClaim列表数据
            mock.onGet('/system/tpsgi/reinsurance/riClaim/os_claim_inquiry/settled_ri_claim/find_by_pk/1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.osCIAsettledRiClaimVo]);
                    }, 1000);
                });
            });

              //现金赔款处理列表
            mock.onGet('/system/tpsgi/reinsurance/acconuting/cashCall/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.cashCallVoList]);
                    }, 1000);
                });
            });
            mock.onGet('/system/tpsgi/reinsurance/products/treaty/non_prop_layer/section_info/search?&treatyId=OX2302009&layerNo=1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.sectionInfoVoList]);
                    }, 1000);
                });
            });
              //特殊账单列表
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementVoList]);
                    }, 1000);
                });
            });
              //int.stmt 列表
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/inDtlSearch?&gLNo=O001201711001303').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementInDtlVoList]);
                    }, 1000);
                });
            });
              //ext.stmt 列表
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/outDtlSearch?&gLNo=O001201711001303').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementOutVoList]);
                    }, 1000);
                });
            });
            //ext.stmt 明细查看
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/outDtlView?&gLNo=O001201711001303').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementOutDtlVoList]);
                    }, 1000);
                });
            });

              //获取特殊账单
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/find_by_pk/O001201711001303').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementVo]);
                    }, 1000);
                });
            });

              //获取对外账单mian
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/outMainView/O001201711001303').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementOutMainVo]);
                    }, 1000);
                });
            });
            mock.onGet('/system/tpsgi/reinsurance/acconuting/specialStatement/find_by_Re_GL_No/O0201200001T00020').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.specialStatementViewVo]);
                    }, 1000);
                });
            });
            //帐单离线任务列表
            mock.onGet('/system/tpsgi/reinsurance/acconuting/acOfflineTasks/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.offlineTasksVoList]);
                    }, 1000);
                });
            });
            mock.onGet('/system/tpsgi/reinsurance/acconuting/acOfflineTasks/find_by_pk/111').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.TreatyStatementTasksVo]);
                    }, 1000);
                });
            });
            // 获取火险危险单位列表数据（分页）
            mock.onGet('/system/tpsgi/reinsurance/products/code/fire/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.FireRiskList]);
                    }, 1000);
                });
            });
            // 获取火险危险单位列表数据（分页）
            mock.onGet('/system/tpsgi/reinsurance/products/code/bond/search?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, reinsurance.BondRiskList]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findListValid?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindListValid]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findListValid?&_pageSize=10&_pageNo=1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindListValid]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findListValid?&_pageSize=10&_pageNo=2').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindListValid1]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findOtherList?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.PageNo]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findOtherListPage?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindOtherListPage]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findBusinessListPageByCode?&_pageSize=10&_pageNo=0').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindBusinessListPageByCode]);
                    }, 1000);
                });
            });
            mock.onPost('/system/ggCode/findBusinessListPageByCode?&_pageSize=10&_pageNo=1').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.FindBusinessListPageByCode1]);
                    }, 1000);
                });
            });
            // 获取火险危险单位列表数据（分页）
            mock.onGet('/system/validation/mapping/SaaRoleVo').reply(function(config) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve([200, sys.ValidationConfig]);
                    }, 1000);
                });
            });
        }
    };
});
