define(function(require) {
    var NonPropTreatyList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {
            "nonPropTreatyVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21, "data": [{"id": 1, "treatyCode": "IOX21", "treatyYear": "2017", "treatyClass": "Non-Proportional Treaty", "statClass": "Treaty", "treatyType": "Excess of Loss Treaty", "xolType": "Risk", "treatyStatus": "Check Passed"}, {"id": 2, "treatyCode": "IOX22", "treatyYear": "2016", "treatyClass": "Non-Proportional Treaty", "statClass": "Treaty", "treatyType": "Excess of Loss Treaty", "xolType": "Risk", "treatyStatus": "Validated"}, {"id":3, "treatyCode": "IOX23", "treatyYear": "2016", "treatyClass": "Non-Proportional Treaty", "statClass": "Treaty", "treatyType": "Excess of Loss Treaty", "xolType": "Combined", "treatyStatus": "Save"}]}
        }
    };
    var  riskUnitRetentionPlanVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"riskUnitRetentionPlanVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    id: '1', uWYear: '2009', riskUnitType: 'A', limitType: '01', riskLvl: '123', riskLvlDesc: 'MD Aggregation in China Town London', CCY: 'GBP', retention: '9,999,999,999.00', remarks: '1' },{
                    id: '2', uWYear: '1986', riskUnitType: 'Z', limitType: '01', riskLvl: '169', riskLvlDesc: '666-desc', CCY: 'GBP', retention: '9,999,999,999.00', remarks: '1'  },{
                    id: '3', uWYear: '2010', riskUnitType: 'A', limitType: '01', riskLvl: '999', riskLvlDesc: 'Industrial Risk From Dutch Branch', CCY: 'EUR', retention: '2,500,000.00', remarks: '169-remarks'  },{
                    id: '4', uWYear: '2009', riskUnitType: 'A', limitType: '01', riskLvl: '123', riskLvlDesc: 'CTOWN Accumulation', CCY: 'EUR', retention: '9,999,999,999.00', remarks: '1' },{
                    id: '5', uWYear: '2010', riskUnitType: 'Z', limitType: '01', riskLvl: '100', riskLvlDesc: 'G4 0HS', CCY: 'GBP', retention: '120,000.00', remarks: 'TBA'
                }]}
        }
    };
    var  RetentionPlanVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"retentionPlanVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    id: '1', uWYear: '1993', rIRisk: '99KR', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', CCY: 'GBP', retention: '9,999,999,999.00', retentionSN: '1' },{
                    id: '2', uWYear: '1994', rIRisk: '12TR', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', CCY: 'GBP', retention: '9,999,999,999.00', retentionSN: '1'  },{
                    id: '3', uWYear: '1995', rIRisk: '01JS', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', CCY: 'GBP', retention: '9,999,999,999.00', retentionSN: '1'  },{
                    id: '4', uWYear: '1996', rIRisk: '99KR', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', CCY: 'GBP', retention: '9,999,999,999.00', retentionSN: '1' },{
                    id: '5', uWYear: '1997', rIRisk: '06MR', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', CCY: 'GBP', retention: '9,999,999,999.00', retentionSN: '1'
                }]}
        }
    };
    var  comprehensiveRiskVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"comprehensiveRiskVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    id:"1", riskCode: 'CTOWN1', CCY: 'GBP', retention: '320,000.00', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', riskDesc: 'China Town London Accumulation' },{
                    id:"2",riskCode: 'com66', CCY: 'GBP', retention: '2,500,000.00', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', riskDesc: 'com66-riskdesc'  },{
                    id:"3",riskCode: 'G4 0HS', CCY: 'GBP', retention: '2,700,000.00', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', riskDesc: '777-comdesc'  },{
                    id:"4",riskCode: 'AB12JJ', CCY: 'GBP', retention: '500,000.00', limitType: '01', riskLvl: '999', riskLvlDesc: 'The Max Retention', riskDesc: 'Chung Ying Supermarket - 28451TA & 28452TA' 
                }]}
        }
    };
    var TreatyCodeVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"treatyCodeVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{ id: '1', treatyCode: 'QX401', treatyClass: 'Non-Proportional Treaty', statClass: 'Treaty', treatyType: 'Excess of Loss Treaty', treatyShortName: 'Terrorism XOL Treaty With Pool Re' },{
                    id: '2', treatyCode: 'NFC01', treatyClass: 'Non-Proportional Treaty', statClass: 'Fac R/I',  treatyType: 'Non-Proportional Fac R/I', treatyShortName: 'Gross Retention XOL Cover' },{
                    id: '3', treatyCode: 'IOX21', treatyClass: 'Non-Proportional Treaty',  statClass: 'Treaty', treatyType: 'Excess of Loss Treaty', treatyShortName: 'ESICUBA CAT XL' },{
                    id: '4', treatyCode: 'FAC01', treatyClass: 'Special Treaty',  statClass: 'Fac R/I', treatyType: 'Fac R/I', treatyShortName: 'ESICUBA CAT XL' },{
                    id: '5', treatyCode: 'QP211', treatyClass: 'Proportional Treaty Outward', statClass: 'Treaty', treatyType: 'Surplus Treaty', treatyShortName: 'Propetty Surplus Treaty'
                }]}
        }
    };
     var offlineTasksVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"offlineTasksVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{ 
                    id: '1', stmtPeriod: '201712', executeTime: '20-05-0126 16:33:00', stmtConfirmedTime: '04-12-2017', confirmedBy: 'MJY', taskStatus: 'Operation Completed', creator: 'MJY' , createtime: '04-12-2017' },{
                    id: '2', stmtPeriod: '201711', executeTime: '',                     stmtConfirmedTime: '04-12-2017',  confirmedBy: 'MJY', taskStatus: 'To be Operated' , creator: 'MJY', createtime: '04-12-2017' },{
                    id: '3', stmtPeriod: '201709', executeTime: '04-12-2017 06:19:36',  stmtConfirmedTime: '04-12-2017', confirmedBy: 'MJY', taskStatus: 'Operation Completed', creator: 'MJY' , createtime: '04-12-2017' },{
                    id: '4', stmtPeriod: '201708', executeTime: '23-11-2017 11:11:23',  stmtConfirmedTime: '23-11-2017', confirmedBy: 'MJY', taskStatus: 'Operation Completed', creator: 'MJY' , createtime: '23-11-2017' },{
                    id: '5', stmtPeriod: '201707', executeTime: '06-11-2017 01:35:10', stmtConfirmedTime: '06-11-2017', confirmedBy: 'MJY', taskStatus: 'Operation Completed', creator: 'MJY', createtime: '24-10-2017' 
                }]}
        }
    };
    var cashCallVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"cashCallVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    id: '1', claimNo: 'L0047255TA2008-00001CK9', risk: '01TA', rIRisk: '01TR', serialNo: '3', branch: '710102', lossDate: '21-03-2009', CCY: 'GBP', cashCallAmt: '422,830.80', gLNo: 'O005201006000008', treatyId: 'QP2112010', sectionNo: '0' , recallYM: '201006'    },{
                    id: '2', claimNo: 'L0047255TA2008-00001CK9', risk: '01TA', rIRisk: '01TR', serialNo: '2', branch: '710102', lossDate: '21-03-2009', CCY: 'GBP', cashCallAmt: '92,219.99',  gLNo: 'O005200911000004', treatyId: 'QP2112009', sectionNo: '1', recallYM: '200911'  },{
                    id: '3', claimNo: 'L0047255TA2008-00001CK9', risk: '01TA', rIRisk: '01TR', serialNo: '1', branch: '710102', lossDate: '21-03-2009', CCY: 'GBP', cashCallAmt: '120,000.00', gLNo: 'O005200908000002' , treatyId: 'QP2112009', sectionNo: '1' , recallYM: '200908' },{
                    id: '4', claimNo: 'L0066403RA2011-00001PET', risk: '01RA', rIRisk: '01RR', serialNo: '1', branch: '710101', lossDate: '21-04-2012', CCY: 'GBP', cashCallAmt: '288,000.00', gLNo: 'O005201303000010' , treatyId: 'QP2112013', sectionNo: '0', recallYM: '201303' },{
                    id: '5', claimNo: 'L0066403RA2011-00001PET', risk: '01RA', rIRisk: '01RR', serialNo: '2', branch: '710101', lossDate: '21-04-2012', CCY: 'GBP', cashCallAmt: '-288,000.00',gLNo: 'O005201303000011', treatyId: 'QP2112013', sectionNo: '0', recallYM: '201303' 
                }]}
        }
    };

    var specialStatementVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"specialStatementVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    id: '1', gLNo: 'O0204199602T00004', relatedGLNo: ' ', stmtType: 'XOL MDP Statement', treatyID: 'QX2411996', stmtPeriod: '199602', payableDate: '21-03-2009', uWYear: '2009', status: 'Transferred', createdDate: '26-06-2009', toFinanceDate: ' ', creator: ' '     },{
                    id: '2', gLNo: 'I0204199602T00005', relatedGLNo: ' ', stmtType: 'XOL MDP Statement', treatyID: 'QX2411996', stmtPeriod: '199704', payableDate: '21-03-2009', uWYear: '2009', status: 'Transferred', createdDate: '26-06-2009', toFinanceDate: ' ', creator: ' '   },{
                    id: '3', gLNo: 'I0204199603T00002', relatedGLNo: ' ', stmtType: 'XOL MDP Statement', treatyID: 'QX2421996', stmtPeriod: '199602', payableDate: '21-03-2009', uWYear: '2009', status: 'Transferred', createdDate: '26-06-2009' , toFinanceDate: ' ', creator: ' '  },{
                    id: '4', gLNo: 'I0201200001T00021', relatedGLNo: 'O0201200001T00020', stmtType: 'Proportional Treat', treatyID: 'IO2122000', stmtPeriod: '200010', payableDate: '12-10-2000', uWYear: '2000', status: 'Transferred', createdDate: '26-06-2009' , toFinanceDate: ' ', creator: ' '  },{
                    id: '5', gLNo: 'I0204199603T00004', relatedGLNo: ' ', stmtType: 'XOL MDP Statement', treatyID: 'QX2421996', stmtPeriod: '199602', payableDate: '21-04-2009', uWYear: '2009', status: 'Transferred', createdDate: '26-06-2009', toFinanceDate: ' ', creator: ' ' 
                }]}
        }
    };
     var specialStatementInDtlVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"specialStatementInDtlVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data":  [{
                    id: '1', gLNo: 'O0201200001T00021', risk: '01TA', branch: '7101', feeType: 'R/I PREM', treatyID: 'IO2122000', treatyNo: 'IO212', uWYear: '1997', status: 'Transferred', stmtPeriod: '199712', payableDate: '05-12-1997', CCY: 'JPY' , amt: '-11,162,855.02'    },{
                    id: '2', gLNo: 'O0201200001T00021', risk: '01TA', branch: '7101', feeType: 'R/I COMM', treatyID: 'IO2122000', treatyNo: 'IO212', uWYear: '1997', status: 'Transferred', stmtPeriod: '199712', payableDate: '05-12-1997', CCY: 'JPY'  , amt: '-1,046,517.66' },{
                    id: '3', gLNo: 'O0201200001T00021', risk: '01TA', branch: '7101', feeType: 'TAX ON INTEREST', treatyID: 'IO2122000', treatyNo: 'IO212', uWYear: '1997', status: 'Transferred', stmtPeriod: '199712' , payableDate: '05-12-1997', CCY: 'JPY'  , amt: '-948,842.68' 
                       
                }]}
        }
    };
     var  specialStatementOutDtlVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"specialStatementOutDtlVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data":  [{
                    section: '1', feeType: 'R/I PREM', treatyID: 'IO2122000', broker: '', reinsurer: 'CRE', stmtReceiver: 'CRE', agent: '', stmtPeriod: '199712', CCY: 'JPY',  amt: ' -11,162,855.02', drawReserveInd: '' },{     
                    section: '1', feeType: 'R/I COMM', treatyID: 'IO2122000', broker: '', reinsurer: 'CRE', stmtReceiver: 'CRE', agent: '', stmtPeriod: '199712', CCY: 'JPY',  amt: '-1,046,517.66', drawReserveInd: '' },{
                    section: '1', feeType: 'TAX ON INTEREST', treatyID: 'IO2122000', broker: '', reinsurer: 'CRE', stmtReceiver: 'CRE', agent: '', stmtPeriod: '199712', CCY: 'JPY',  amt: '-948,842.68', drawReserveInd: '' 
                }]}
        }
    };

     var specialStatementOutVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"specialStatementOutVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data":  [{
                    id: '1', externalStmtNo: 'O1201200001T00184', treatyID: 'IO2122000', broker: '',
                     reinsurer: 'CRE', stmtReceiver: 'CRE', agent: '', payableDate: '05-12-1997', CCY: 'JPY', 
                     amt: '9,167,494.68', refferenceNo: '', remark: ''       
                }]}
        }
    };

    var NonPropTreaty = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp": 1508896218133,
        "traceID": null,
        "spanID": null,
        "resData": {
            "treatyCode": "QX234", "treatyYear": "2014", "xolType": "Combined",
             "treatyShortName": "Group PA For NCB Cover Only",
             "treatyFullName": "Group PA For NCB Cover Only",
             "treatyAlternateName": "Group PA For NCB Cover Only",
             "coverStartDate": "2017-09-14", "coverEndDate": "2017-09-14",
             "indexType": "CPI(A)", "indexApplication": "All", "benchmarkDate": "2017-09-14",
             "benchmark": 0.00, "indexFavor": "0.00", "srPremCalcBasis": "Written Prem",
             "checkedBy": "", "checkDate": "2017-09-14", "treatyStatus": 0, "mainCcy": "CNY",
             "enRetainedPrem": 0.00, "treatyDesc": "Group PA For NCB Cover Only, FLAT PREMIUM: CNY3,465 ( CNY3,028 in 2013)"
        }
    };
    var ProTreatyVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"ProTreatyVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{ 
                    "id": '1',treatyYear: "2009", treatyStatus: 'Validated', treatyId: 'QP2812009', treatyClass: 'Proportional Treaty Outward', statClass: 'Treaty', treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty' },{
                    "id": '2',treatyYear: "2006", treatyStatus: 'Validated', treatyId: 'QP2812006', treatyClass:'Proportional Treaty Outward', statClass:  'Treaty',  treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty'  },{
                    "id": '3',treatyYear: "2007",treatyStatus: 'Validated', treatyId: 'QP2812007', treatyClass: 'Proportional Treaty Outward',  statClass: 'Treaty', treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty'  },{
                    "id": '4',treatyYear: "2008", treatyStatus: 'Validated', treatyId: 'QP2812008', treatyClass: 'Proportional Treaty Outward',  statClass:  'Treaty', treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty' },{
                    "id": '5',treatyYear: "2010", treatyStatus: 'Save', treatyId: 'QP2812010', treatyClass: 'Proportional Treaty Outward', statClass: 'Treaty', treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty' },{
                    "id": '6',treatyYear: "2011", treatyStatus: 'Save', treatyId: ' QP2812011', treatyClass: 'Proportional Treaty Outward', statClass: 'Treaty', treatyType: 'Quota Share Treaty', treatyShortName: 'Professional Indemnity 40% Quota Share Treaty' 
                  
                }]}
        }
    };
    var eventRiRecInqVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"eventRiRecoveryInquiryVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{ 
                    eventNo:'15FLOODDEC',calcSN:'1',cCY:'GBP',calcInd:'Calculation Completed',treatyCode:'QX270',
                    treatyYr:'2015',settledRecovery:'0.00',setRecCurEventXOL:'0.00',reinstatedPrem:'0.00',variance:'0.00',
                    generateInd:'Y'
                  
                }]}
        }
    };

    var riskRiRecInqVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"riskRiRecoveryInquiryVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{ 
                   claimNo:'L0035878TA2004-00002CK9',riRisk:'12TR',calcSN:'1',treatyCode:'QX240',treatyYr:'2004',
                   cCY:'GBP',calcInd:'Calculation Completed',settledRecovery:'0.00',setRecCurEventXOLs:'0.00',reinstatedPrem:'0.00',
                   curReinstatedPrem:'0.00',generateInd:'Y'
                }]}
        }
    };
    var treatyPriorityVoList  = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {"treatyPriorityVoList": {"pageNo": 1, "perPage": 10, "totalCount": 5, "data": [{
                    "id": '1',priority: "14", startDate: '01-01-2009', endDate: '31-12-2009', treatyCode: 'QP219', treatyFullName: 'ADDITIONAL RETENTION', bookInd: 'Y'},{
                    "id": '2',priority: "1", startDate: '01-03-2008', endDate: '31-12-2008', treatyCode: 'FAC01', treatyFullName: 'FACULTATIVE - PROPORTIONAL',  bookInd: 'Y'   },{
                    "id": '3',priority: "6",startDate: '01-01-2007', endDate: '28-02-2007', treatyCode: 'RET01',  treatyFullName: 'RETENTION', bookInd: 'N'  },{
                    "id": '4',priority: "12", startDate: '01-03-2007', endDate: '31-12-2007', treatyCode: 'QP211',  treatyFullName: 'Property Surplus Treaty', bookInd: 'N'  },{
                    "id": '5',priority: "15", startDate: '01-03-2008', endDate: '31-12-2008', treatyCode: 'QP212', treatyFullName: 'Property 50% Quota Share Treaty for UK Schemes Business', bookInd: 'Y'
                     }]}
        }
    };
    var NonPropLayerVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {
            "nonPropLayerVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21,
             "data": [{
                 "id": 1, "treatyId": "OX2302008", "treatyCode": "OX230", "treatyYear": "2009",
                 "layerNo": 1, "treatyClass": "Non-Proportional Treaty",
                 "statClass": "Treaty", "treatyType": "Excess of Loss Treaty",
                 "treatyStatus": "Save"},
                 {"id": 2, "treatyId": "OX2302009", "treatyCode": "OX230", "treatyYear": "2009",
                 "layerNo": 2, "treatyClass": "Non-Proportional Treaty",
                 "statClass": "Treaty", "treatyType": "Excess of Loss Treaty",
                 "treatyStatus": "Check Passed"},
                 {"id": 3, "treatyId":"OX2302010", "treatyCode": "OX230", "treatyYear": "2009",
                 "layerNo":3, "treatyClass": "Non-Proportional Treaty",
                 "statClass": "Treaty", "treatyType": "Excess of Loss Treaty",
                 "treatyStatus": "Check Passed"}
             ]}
        }
    };
    var NonPropLayer = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp": 1508896218133,
        "traceID": null,
        "spanID": null,
        "resData": {
            "treatyCode": "QX240", "treatyYear": "2000", "layerNo": 1,
             "mainCcy": "GBP", "rpRate": 0.000, "isRelatedTime": "0-Irrelevant",
             "premiumRate": "4.56000", "rateAdjustmentInd": "N-Fixed",
             "minRate": "4.56000", "maxRate": "4.56000", "total": "250,000.00",
             "reinstatedSumInsured": "125,000.00", "depositPremium": "134,000.00",
             "minPrem": "134,000.00", "premAdjustment": 0.00, "gnpi": 0.00,
             "reinstatedPrem": 0.00, "remark": "Layer 1: ￡175,000 xs ￡75,000 for Motor Buisness Only"
        }
    };
    var treatyVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": { "treatyCode": "QX401", "treatyClass": "Non-Proportional Treaty", "statClass": "Treaty",
                  "treatyType": "Excess of Loss Treaty", "treatyShortName": "Terrorism XOL Treaty With Pool Re",
                   "treatyFullName": "Terrorism XOL Treaty With Pool Re", "treatyAlternateName": "Terrorism XOL Treaty With Pool Re"
                 }};
    var specialStatementVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": { "gLNo": "O001201711001303", "CCY": "", "uWYear": "2017",
                  "treatyID": "IOX21", "stmtPeriod": "201711",
                   "payableDate": "11-12-2017" 
                 }};
    var specialStatementOutMainVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": { "externalStmtNo": "I0301199701F00004", "gLNo": "I0301199701F00004", "treatyID": "FAC011997",
                  "treatyNo": "FAC01", "uWYear": "1,997","broker": "","reinsurer": "CRE","stmtReceiver": "CRE","agent": "",
                  "stmtPeriod": "199712", "payableDate": " 05-12-1997", "amt": "9,167,494.68"  , "CCY": "JPY"  
                 }};
    var specialStatementViewVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": { "gLNo": " O0201200001T00021", "relatedGLNo": "I0201200001T00020", "uWYear": "2017",
                  "treatyID": "IO2122000", "stmtPeriod": "201711","stmtClass":"I","stmtType":"11","treatyNo":"IO212",
                   "payableDate": "11-12-2017" ,"status":"2","ctrbnInd":"3","remark":"","creator":"","createdDate":"26-06-2009"
                   ,"modifiedBy":"","modificationDate":"26-06-2009","checkDate":"","toFinanceDate":""
                 }};
    var RetentionPlanVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "uWYear": "1994", "rIRisk": "12TR", "riskLvl": "999",
                     "riskLvlDesc": "The Max Retention", "limitType": "01", "remarks": "" ,
                     "CCY": "GBP", "retention": "9,999,999,999.00", "uWApprovalModInd": "" ,"prioritySN":"1"
                    }};
    var riskUnitRetentionPlanVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "uWYear": "2009", "riskUnitType": "A", "riskLvl": "123",
                     "riskLvlDesc": "MD Aggregation in China Town London", "limitType": "01", "remarks": "" ,
                     "CCY": "GBP", "retention": "320,000.00", "uWApprovalModInd": "" ,"prioritySN":"1"
                    }};
    var proTreatyVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "treatyId": "QP2812009", "renewalInd": "Y", "treatyYear": "2009",
                     "renewedTreatyId": "", "treatyCode": "QP281", "treatyFullName": "Professional Indemnity 40% Quota Share Treaty" ,
                     "cleanCutMethod": "0", "treatyShortName": "Professional Indemnity 40% Quota Share Treaty", "treatyStartDate": "01-03-2009" ,
                     "treatyEndDate":"28-02-2010","instalInd":"N","treatyStatus":"2","preliminaryLossNoticeCcy":"GBP",
                     "preliminaryLossNoticeAmt":"100,000.00","cashCallCcy":"GBP","cashCallAmt":"150,000.00",
                     "mainCcy":"GBP","coInsuranceLimit":"0.00","inwardReinsurance":"0.00","estPremCcy":"GBP",
                     "EPINet":"0.00","unearnedPTCMethod":"0","EPIGross":"350,000.00","accountPeriod":"H",
                     "unearnedPTRate":"0.00","indemnityPTRate":"0.00","finalPlacedOrderRate":"87.50","PCInd":"P",
                     "checkedBy":"","checkDate":"","auditYear":"","cleanCutDate":"",
                     "remark":"Commt:WSP ACCOUNT Businese:PROFESSINAL INDEMNITY 40% QS Professionals in Construction/Property Market have been excluded since 1st March 2009",
                      "treatyCCYInfo":  [{  "CCYNo": "GBP", "CCY": ""}],
                      "treatySectionInfo":  [{  "sectNO": "1", "treatySectionDesc": "Professional Indemnity 40% Quota Share Treaty",
                            "CCY": "GBP","maxRtn": "650,000.00","cedingRate": "40.00","lines": "0","treatyLimit": "1,000,000.00",
                            "premInd": "0","estPremCCY": "GBP","epiGross": "350,000.00","epiNet":"0.00"}],
                      "treatyReserveInterestInfo" :  [{  "CCY": "EUR", "startDate": "01-03-2009","endDate": "","interestRate": "0.0000","indicator": ""},
                      {  "CCY": "GBP", "startDate": "01-03-2009","endDate": "","interestRate": "0.0000","indicator": ""}],
                  
                    }};
    var treatySectionDetailsVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "treatyNo": "QP2812009", "treatySectionNo": "1", "treatySectionDesc": "Professional Indemnity 40% Quota Share Treaty",
                     "treatySectionAName": "", "ccy": "GBP", "maxRtn": "650,000.00" ,
                     "cedingRate": "40.00", "lines": "0", "treatyLimit": "1,000,000.00" ,
                     "treatyEndDate":"28-02-2010","instalInd":"N","treatyStatus":"2","preliminaryLossNoticeCcy":"GBP",
                     "riPremInd":"0","estPremCCY":"GBP","epiGross":"350,000.00",
                     "epiNet":"0.00","remark":"EPI: £300,000; €50,000",
                    "treatySectionRiskInfo":  [{  "branchCode": "7101", "branchName": "", "riRisk": "12QR", "riRiskName": ""}],
                      "treatySectionInfo":  [{  "sectNO": "1", "treatySectionDesc": "Professional Indemnity 40% Quota Share Treaty",
                            "CCY": "GBP","maxRtn": "650,000.00","cedingRate": "40.00","lines": "0","treatyLimit": "1,000,000.00",
                            "premInd": "0","estPremCCY": "GBP","epiGross": "350,000.00","epiNet":"0.00"}],
                      "treatySectionReinsurerDtlVo" :  [{  "SN": "1", "treatySectionNo": "1","broker": "SINORE TAIPING REINSURANCE BROKERS LTD","reinsurer": "CPCR CHINA PROPERTY & CASUALTY REINSURANCE COMPANY LTD","stmtReceiver": "SINORE TAIPING REINSURANCE BROKERS LTD" , "commRate" : "32.50", "taxRate" : "0.00", "taxRate" : "0.00","cost":"0.00","deficitYear":"0","remark":""},
                      { "SN": "2", "treatySectionNo": "1","broker": "SINORE TAIPING REINSURANCE BROKERS LTD","reinsurer": "CPCR CHINA PROPERTY & CASUALTY REINSURANCE COMPANY LTD","stmtReceiver": "SINORE TAIPING REINSURANCE BROKERS LTD" , "commRate" : "35.00", "taxRate" : "0.00", "taxRate" : "0.00","cost":"0.00","deficitYear":"0","remark":""},
                      { "SN": "3", "treatySectionNo": "1","broker": "","reinsurer": "TAIPING REINSURANCE","stmtReceiver": "TAIPING REINSURANCE CO. LTD" , "commRate" : "35.00", "taxRate" : "0.00", "taxRate" : "0.00","cost":"0.00","deficitYear":"0","remark":""},
                      { "SN": "4", "treatySectionNo": "1","broker": "","reinsurer": "RETENTIONRETENTION","stmtReceiver": "" , "commRate" : "0.00", "taxRate" : "0.00", "taxRate" : "0.00","cost":"0.00","deficitYear":"0","remark":""}],
                  
                    }};
    var reinsurerDetailsVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "treatyNo": "QP2812009", "treatySectionNo": "1", "broker": "SINORE","brokerName":"TAIPING REINSURANCE BROKERS LTD",
                     "reinsurer": "CPCR", "reinsurerName": "CHINA PROPERTY & CASUALTY REINSURANCE COMPANY LTD", "agent": "" ,
                     "stmtReceiver": "SINORE", "stmtReceiverName": "TAIPING REINSURANCE BROKERS LTD", "treatyYr": "" ,
                     "remark":"","commRate":"32.50","commCalculationMethod":"2","taxRate":"0.00",
                     "profitCommRate":"0.00","adjustProfitComm":"N","cost":"0.00",
                     "basedOn":"0","premCalculationMethod":"0","indemnityCalculationMethod":"0","deficitYear":"0","additionalProfitCommRate":"0.00",
                     "premReserveExtractionRate":"0.00","oSReserveRate":"0.00","reserveInterestTaxInd":"N","reserveExtractionMonth":"999",
                     "premReserveExtractionMonth":"0"

                  
                    }};
    var treatyPriorityVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "startDate": "01-01-2009", "endDate": "31-12-2009", "priority": "QP219",
                     "treatyId": "219", "bookInd": "1"

                    }};
 
    var comprehensiveRiskVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "riskCode": "CTOWN1", "riskLvl": "123", "limitType": "1", 
                     "CCY": "GBP", "retention": "320,000.00","riskDesc":"China Town London Accumulation","riskLvlDesc":""  
                     
                    }};
     var TreatyStatementTasksVo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                     "resData": { "stmtPeriod": "201712", "stmtTime": "20-05-0126", "stmtConfirmedTime": "04-12-2017", 
                     "confirmedBy": "MJY", "taskStatus": "0","creator":"MJY","createtime":"04-12-2017"  
                     
                    }};

    var setteledClaimquiryVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
            "setteledClaimInquiryVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21,
             "data": [{
                "riClaimNo":"L710101001998000965","claimNo":"L0050092SA1998-00011LA9","settledTime":"001","insuredItemSN":"1","checkInd":"Unchecked","calcStatus":"Dis-calculate",
                    "riPolicyType":"Proportional Treaty","dateofLoss":"19-02-1999","causeOfLoss":"Accidental Danage","cCY":"GBP","settledAmt":"1,260.00","printInd":"Not Printed"
             },{
                "riClaimNo":"L710102001991006924","claimNo":"L0100691BA1991-00001SL","settledTime":"002","insuredItemSN":"1","checkInd":"Checked","calcStatus":"Dis-calculate",
                    "riPolicyType":"Proportional Fac","dateofLoss":"01-09-1991","causeOfLoss":"Theft/Mislaid","cCY":"GBP","settledAmt":"0.00","printInd":"Not Printed"
             }]}
          } 
       };
    var setteledCIAdetailsVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "settledRIClaimNo":" L710101001998000965","correctedTimes":"1","settledTime":" 001","eventCode":"","claimNo":"L0050092SA1998-00019LA9",
                "claimNoticeNo":"L0050092SA1998-00019LA9","riPolicyNo":"B0050092SA199801008","riPolicyType":"0- Proportional Treaty",
                "riskUnitCode":"000000000000","branch":"710101","riRisk":"01SS","risk":"01SA","policyNo":"0050092SA1998","insured":"PARK HOMES ELWELL & CO.T/A BORDENGATE",
                "iceptionDate":"01-07-1998","expiryDate":"01-07-1999","dateofLoss":"01-06-1999","causeOfLoss":"Water Damage","cCY":"GBP",
                "settledAmt":"706.82","businessType":"0- Direct Business","ciInd":"0- Non-joint C/I","riskUnitSN":"1","riskUnitType":"O- Other Risks",
                "riskUnitCode":"000000000000","specialRI":"1- Special R/I","eventCode":"","causeofLossCode":"AF","occupationName":"Property",
                "share":"100.00","issueDepartmentCode":"710101","checkedBy":"","checkDate":"28-07-1999","calcDate":"","settledDate":"28-07-1999",
                "createdDate":"28-07-1999","laseModifiedDate":"27-06-2009","printInd":"0- Not Printed","xOLCalcInd":"1","checkInd":"0- Unchecked",
                "calcStatus":"5- Dis-calculate"
             }
          } 
       };
    var setteledCIAriPolicyMainTableVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "riPolicyNo":"B0050092SA199801007","policyNo":"0050092SA1998","proposerName":"PARK HOMES ELWELL & CO.T/A BORDENGATE","postcodeofRiskadd":"",
                "correctedTimes":"-1","occupationName":"Property","risk":"01SA","riskName":"Scheme Arrangements","rIRisk":"12SS","rIRiskName":"Scheme-Liability For Special R/I",
                "branch":"710101","cIInd":"0- Non-joint C/I","inceptionDate":"01-07-1998","expiryDate":"01-07-1999","rIInceptionDate":"01-07-1998",
                "rIExpiryDate":"30-06-1998","checkDate":"29-10-1998","uWConfirmedDate":"01-07-1998","riskUnitSN":"1","riskUnitType":"O- Other Risks",
                "riskUnitNo":"000000000000","instalmentInd":"N- Lump-sum","limitType":"01- Sum Insured R/I","riskLvl":"999","cCY":"GBP",
                "tSI":"0.00","pML":"0.00","netPrem":"0.00","grossPrem":"0.00","retention":"999,999,999.00","share":"100.00","pMLRate":"100.00",
                "shareOutCo":"100.00","businesstype":"0- Direct Business","rIPolicyType":"0- Proportional Treaty","proposalNo":"0050092SA1998",
                "issueDepartmentCode":"710101","proposer":"27890","endtTimes":"01","rIEndtTimes":"010","createdDate":"","modificationDate":"",
                "checkedInd":"1- Checked","specialRI":"1- Special R/I","printInd":"0- Not Printed","confirmedBy":""
             }
          } 
       };
    var osCIAriPolicyMainTableVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "riPolicyNo":"B710102001999002897","policyNo":"0002260CA1999","proposerName":"AIR CHINA(UK) OFFICE","postcodeofRiskadd":"",
                "correctedTimes":"-1","occupationName":"motor","risk":"08CA","riskName":"Motor -Private Car","rIRisk":"08CR","rIRiskName":"Motor -Private Car",
                "branch":"710102","cIInd":"0- Non-joint C/I","inceptionDate":"27-10-1999","expiryDate":"27-10-2000","rIInceptionDate":"27-10-1999",
                "rIExpiryDate":"26-10-1999","checkDate":"1-10-1999","uWConfirmedDate":"27-10-1999","riskUnitSN":"1","riskUnitType":"D -Motor Insurance",
                "riskUnitNo":"000000","instalmentInd":"N- Lump-sum","limitType":"01- Sum Insured R/I","riskLvl":"999","cCY":"GBP",
                "tSI":"-15,000.00","pML":"-15,000.00","netPrem":"-2,500.00","grossPrem":"0.00","retention":"999,999,999.00","share":"100.00","pMLRate":"100.00",
                "shareOutCo":"100.00","businesstype":"0- Direct Business","rIPolicyType":"0- Proportional Treaty","proposalNo":"0050092SA1998",
                "issueDepartmentCode":"710101","proposer":"27890","endtTimes":"01","rIEndtTimes":"010","createdDate":"","modificationDate":"",
                "checkedInd":"1- Checked","specialRI":"1- Special R/I","printInd":"0- Not Printed","confirmedBy":""
             }
          } 
       };

    var osCIAsettledRiClaimVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "sRIClaimNo":"L710102001999004523","correctedTimes":"1","settledTimes":"003","eventCode":"","claimNo":"L0002260CA1999-00002HLE",
                "claimNoticeNo":"L0002260CA1999-00002HLE","riPolicyNo":"B710102001999002897","riPolicyType":"0- Proportional Treaty",
                "riskUnitCode":"000000","branch":"710102","rIRisk":"08CR","risk":"08CA","policyNo":"0002260CA1999","insured":"AIR CHINA(UK) OFFICE",
                "inceptionDate":"27-10-1999","expiryDate":"27-10-2000","dateofLoss":"09-04-2000","causeOfLoss":"Collision","cCY":"GBP",
                "settledAmt":"52.88","businessType":"0- Direct Business","cIInd":"0- Non-joint C/I","riskUnitSN":"1","riskUnitType":"O- Other Risks",
                "riskUnitCode":"000000000000","specialRI":"0- Basic R/I","eventCode":"","causeofLossCode":"DA","occupationName":"Property",
                "shareOutCo":"100.00","issueDepartmentCode":"710102","checkedBy":"","checkDate":"08-11-1991","calcDate":"08-11-1991","settledDate":"08-11-1991",
                "createdDate":"08-11-1991","laseModifiedDate":"27-06-2009","printInd":"0- Not Printed","xOLCalcInd":"1","checkInd":"1- Checked",
                "calcStatus":"1- Calculated"
             }
          } 
       };

       var setteledCIAriEndtDetailsVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "riPolicyNo":"B0050092SA199801007","rIEndtTimes":"001","policyNo":"0050092SA1998-02","type":"0- Proportional Treaty",
                "occupationName":"","correctedTimes":"-1","proposerName":"PARK HOMES ELWELL & CO.T/A BORDENGATE","postCodeOfRiskAdd":"",
                "risk":"01SA","riskName":"Scheme Arrangements","rIRisk":"12SS","rIRiskName":"Scheme-Liability For Special R/I","riskUnitSN":"1",
                "riskUnitType":"O- Other Risks","riskUnitNo":"000000000000","businessType":"0- Direct Business","cIInd":"0- Non-joint C/I","shareOur":"100.00",
                "endtContent":"","branch":"710101","inceptionDate":"01-07-1998","expiryDate":"01-07-1999","rIInceptionDate":"01-07-1998","rIExpiryDate":"30-06-1998",
                "endtDate":"01-07-1998","effectiveDate":"01-07-1998","uWConfirmedDate":"29-10-1998 00:00:00","cCY":"GBP","shareinTSI":"0.00",
                "sumInsuredVariance":"0.00","grossPrem":"-1,425.68","grossPremVariance":"-1,425.68","netPrem":"-1,069.26","netPremVariance":"-1,069.26",
                "pMLRate":"100.00","pML":"0.00","limitType":"01- Sum Insured R/I","riskLvl":"999","retention":"9,999,999,999.00","proposalNo":"0050092SA1998",
                "proposer":"27890","issueDepartmentCode":"710101","checkDate":"23-11-1998 00:00:00","createdDate":"","modificationDate":"",
                "checkedInd":"1- Checked","specialRI":"1- Special R/I","printInd":"0- Not Printed","confirmedBy":""
             }
          } 
       };

    var osCIAriEndtDetailsVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "riPolicyNo":"B710002001999002897","rIEndtTimes":"001","policyNo":"0002260CA1999-02","type":"0- Proportional Treaty",
                "occupationName":"","correctedTimes":"-1","proposerName":"AIR CHHINE(UK) OFFICE","postCodeOfRiskAdd":"",
                "risk":"08CA","riskName":"Motor -Private Car","rIRisk":"08CR","rIRiskName":"Motor -Private Car","riskUnitSN":"1",
                "riskUnitType":"D- Motor Insurance","riskUnitNo":"000000","businessType":"0- Direct Business","cIInd":"0- Non-joint C/I","shareOur":"100.00",
                "endtContent":"","branch":"710102","inceptionDate":"27-10-1999","expiryDate":"27-10-2000","rIInceptionDate":"27-10-1999","rIExpiryDate":"26-10-1999",
                "endtDate":"27-10-1999","effectiveDate":"27-10-1999","uWConfirmedDate":"1-10-1999 00:00:00","cCY":"GBP","shareinTSI":"-15,000.00",
                "sumInsuredVariance":"-15,000.00","grossPrem":"-3,025.00","grossPremVariance":"-3,025.00","netPrem":"-3,025.00","netPremVariance":"-3,025.00",
                "pMLRate":"100.00","pML":"-15,000.00","limitType":"01- Sum Insured R/I","riskLvl":"999","retention":"9,999,999,999.00","proposalNo":"0050092SA1998",
                "proposer":"27890","issueDepartmentCode":"710101","checkDate":"23-11-1998 00:00:00","createdDate":"","modificationDate":"",
                "checkedInd":"1- Checked","specialRI":"1- Special R/I","printInd":"0- Not Printed","confirmedBy":""
             }
          } 
       };

    var setteledCIAcedingInfoVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "riPolicyNo":"B0050092SA199801007","policyNo":"0050092SA1998","proposerName":"PARK HOMES ELWELL & CO.T/A BORDENGATE",
                "postcodeofRiskadd":"","correctedTimes":"-1","occupationName":"Property","risk":"01SA","riskName":"Scheme Arrangements",
                "rIRisk":"12SS","rIRiskName":"Scheme-Liability For Special R/I","branch":"710101","cIInd":"0- Non-joint C/I","inceptionDate":"01-07-1998",
                "expiryDate":"01-07-1999","rIInceptionDate":"01-07-1998","rIExpiryDate":"30-06-1998","checkDate":"29-10-1998","uWConfirmedDate":"01-07-1998",
                "riskUnitSN":"1","riskUnitType":"O- Other Risks","riskUnitNo":"000000000000","instalmentInd":"N- Lump-sum","limitType":"01- Sum Insured R/I",
                "riskLvl":"999","cCY":"GBP","tSI":"0.00","pML":"0.00","netPrem":"0.00","grossPrem":"0.00","retention":"999,999,999.00","share":"100.00",
                "pMLRate":"100.00","shareOutCo":"100.00","businesstype":"0- Direct Business"
             }
          } 
       };

    var osClaimquiryVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
            "osClaimInquiryVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21,
             "data": [{
                 "riClaimNo":"L710101001998000965","claimNo":"  L0050092SA1998-00011LA9","settledTime":"001","insuredItemSN":"1","checkInd":"Unchecked","calcStatus":"Dis-calculate",
                    "riPolicyType":"Proportional Treaty","dateofLoss":"19-02-1999","causeOfLoss":"Accidental Danage","cCY":"GBP","settledAmt":"1,260.00","printInd":"Not Printed"
             }]}
          } 
       };

    var osCIAcedingInfoVo = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "osriClaimNo":"C710102001989006015","claimNo":"L0050000YA1989-00001OPT","policyNo":"0050000YA1989","branch":"710102",
                "rIPolicyNo":"O0050000YA198901003","dateofLoss":"30-09-1989","risk":"01YA","riRisk":"01YR","inceptionDate":"01-01-1989",
                "expiryDate":"01-01-1990","eventCode":"","causeOfLoss":"Water Damage","cCY":"GBP","oSAmt":"0.00","insured":"BOWRING GAUNTLET LTD",
                "rIPolicyType":"1- Proportional Fac","businessType":"0- Direct Business","cIInd":"0- Non-joint C/I"
             }
          } 
       };

    var statementSummary = { 
        "resCode": "0000", 
        "resMsg": "成功", 
        "resTimestamp": 1508837224137, 
        "traceID": null, 
        "spanID": null,
        "resData": {
             "data": {
                "glNo":"O0301199701F00004","relatedGLNo":"I0301199701F00004","stmtClass":"O","stmtType":"06","treatyID":"FAC011997",
                "treatyNo":"FAC01","stmtPeriod":"199712","payableDate":"05-12-1997","uwYear":"1997","status":"2","ctrbnInd":"3","remark":"",
                "creator":"","createdDate":"26-06-2009","modifiedBy":"","modificationDate":"26-06-2009","checkDate":"","toFinanceDate":""
          } 
      }
       }; 


    var generalLedgerList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {
            "generalLedgerVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21, 
            "data": [{
                "glNo":"O0301199701F00006","relatedGLNo":"I0301199701F00006","stmtType":"Fac. Prem. Stateme","treatyID":"FAC011997",
                "stmtPeriod":"199712","payableDate":"05-12-1997","uwYear":"1997","status":"Transferred to Finance","ctrbnInd":"Contribute All",
                "createdDate":"26-06-2009"
            },{
                "glNo":"O0301199701F00016","relatedGLNo":"I0301199701F00006","stmtType":"Fac. Prem. Stateme","treatyID":"FAC011997",
                "stmtPeriod":"199712","payableDate":"05-12-1997","uwYear":"1997","status":"Transferred to Finance","ctrbnInd":"Contribute All",
                "createdDate":"26-06-2009"
            }]}
        }
    };
    var intOrExtStmtList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {
            "intOrExtStmtVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21, 
            "data": [{
                "sN":"1","gLNo":"O0101199601T00007","risk":"01TA","branch":"7101","feeType":"R/I PREM","treatyID":"QP1131996",
                "treatyNo":"QP113","uwYear":"1996","stmtPeriod":"199610","payableDate":"16-10-1996","cCY":"GBP","amt":"16,532.87",
                "externalStmtNo":"O1101199601T00035","broker":"","reinsurer":"RSAUK","stmtReceiver":"RSAUK","agent":"",
                "refferenceNo":"","remark":""
            }]}
        }
    };
 
    var sectionInfoVoList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData": {
            "sectionInfoVoList": {"pageNo": 1, "perPage": 10, "totalCount": 21,
             "data": [{
                 "treatySectionNo": "1", "excessPoint": "300,000.00",
                 "treatyLimit": "500,000.00", "esrPrem": "100.00", "gnpiRate": "100.00"
             }]}
        }
    };

    var FireRiskList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData":{
            "fireRiskList":{"pageNo":1,"perPage":10,"totalCount":2,
            "data":[{
                "businessNo":"10010253", "riskCode":"Fire", "commDate":1502781786764, "expriyDate":1502781786764, "currency":"USD", sumInsured:"2005000", "sumPremium":"10000", "stanCurrRisk":"2005000"},{
                    "businessNo":"10010254", "riskCode":"Fire", "commDate":1502781786764, "expriyDate":1502781786764, "currency":"USD", sumInsured:"4035000", "sumPremium":"20000", "stanCurrRisk":"4035000"
                }]}
            }
        };
    var eventRiRecInqRecoveryInfo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": {
                  "calcSN":"1","treatyCode":"QX270","treatyYr":"2015","cCY":"GBP","rtnInflation":"1.00","settledTotal":"816,571.49",
                  "otherSettled":"0.00","settledRtn":"447,745.08","settledtobeContributed":"447,745.08","calcInd":"1","calcDate":"16-08-2016",
                  "settledRecovery":"0.00","setRecCurEventXOL":"0.00","reinstatedPrem":"0.00","variance":"0.00","generateInd":"Y"
                 }};

    var riskRiRecInqClaimNoInfo = { "resCode": "0000", "resMsg": "成功", "resTimestamp": 1508896218133, "traceID": null, "spanID": null,
                 "resData": {
                    "riRisk":"12TR","calcSN":"1","risk":"01TA","treatyCode":"QX240","treatyYr":"2004","eventNo":"",
                    "branch":"710102","dateofLoss":"18-12-2007","causeofLossCode":"","causeofLoss":"Liability","cCY":"GBP",
                    "excessPoint":"200,000.00","rtnInflation":"1.00","settledTotal":"215,448.69","settledRtn":"215,448.69",
                    "otherSettledAmt":"0.00","setToBeContrib":"215,448.69","calcInd":"1","calcDate":"31-07-2011","settledRecovery":"0.00",
                    "settRecCurRiskXOL":"0.00","reinstatedPrem":"0.00","curReinstatedPrem":"0.00","generateInd":"N"
                 }};             


    var BondRiskList = {
        "resCode": "0000",
        "resMsg": "成功",
        "resTimestamp":1508833222919,
        "traceID":null,
        "spanID":null,
        "resData":{
            "bondRiskList":{"pageNo":1,"perPage":10,"totalCount":2,
            "data":[{
                "businessNo":"10010255", "riskCode":"Bond", "commDate":1502781786764, "expriyDate":1502781786764, "currency":"USD", sumInsured:"1355000", "sumPremium":"5000", "stanCurrRisk":"2005000"},{
                    "businessNo":"10010259", "riskCode":"Bond", "commDate":1502781786764, "expriyDate":1502781786764, "currency":"USD", sumInsured:"5000000", "sumPremium":"30000", "stanCurrRisk":"4035000"
                }]}
            }
        };

 

    return { NonPropTreatyList: NonPropTreatyList, TreatyCodeVoList: TreatyCodeVoList,
        NonPropTreaty: NonPropTreaty, ProTreatyVoList:ProTreatyVoList,
        NonPropLayerVoList: NonPropLayerVoList, NonPropLayer: NonPropLayer ,treatyVo : treatyVo,
        RetentionPlanVoList : RetentionPlanVoList,
        RetentionPlanVo : RetentionPlanVo,
        riskUnitRetentionPlanVoList : riskUnitRetentionPlanVoList,
        riskUnitRetentionPlanVo : riskUnitRetentionPlanVo,
        proTreatyVo : proTreatyVo,
        statementSummary:statementSummary,
        generalLedgerList:generalLedgerList,
        intOrExtStmtList:intOrExtStmtList,
        osCIAcedingInfoVo:osCIAcedingInfoVo,
        treatyPriorityVoList : treatyPriorityVoList,
        eventRiRecInqRecoveryInfo:eventRiRecInqRecoveryInfo,
        treatyPriorityVo : treatyPriorityVo ,
        osCIAriPolicyMainTableVo:osCIAriPolicyMainTableVo,
        osCIAsettledRiClaimVo:osCIAsettledRiClaimVo,
        setteledCIAriPolicyMainTableVo:setteledCIAriPolicyMainTableVo,
        setteledCIAriEndtDetailsVo:setteledCIAriEndtDetailsVo,
        osCIAriEndtDetailsVo:osCIAriEndtDetailsVo,
        setteledCIAcedingInfoVo:setteledCIAcedingInfoVo,
        comprehensiveRiskVoList : comprehensiveRiskVoList,
        comprehensiveRiskVo: comprehensiveRiskVo,
        cashCallVoList : cashCallVoList ,
        setteledClaimquiryVo : setteledClaimquiryVo,
        osClaimquiryVo : osClaimquiryVo,
        setteledCIAdetailsVo:setteledCIAdetailsVo,
        sectionInfoVoList: sectionInfoVoList ,
        sectionInfoVoList: sectionInfoVoList,
        riskRiRecInqClaimNoInfo : riskRiRecInqClaimNoInfo,
        specialStatementVoList:specialStatementVoList,
        specialStatementVo : specialStatementVo,
        specialStatementViewVo : specialStatementViewVo,
        specialStatementInDtlVoList:specialStatementInDtlVoList,
        specialStatementOutVoList: specialStatementOutVoList ,
        specialStatementOutDtlVoList : specialStatementOutDtlVoList,
        specialStatementOutMainVo: specialStatementOutMainVo,
        offlineTasksVoList: offlineTasksVoList,
        TreatyStatementTasksVo:TreatyStatementTasksVo,
        FireRiskList : FireRiskList,
        BondRiskList : BondRiskList,
        treatySectionDetailsVo : treatySectionDetailsVo,
        reinsurerDetailsVo : reinsurerDetailsVo,
        riskRiRecInqVoList : riskRiRecInqVoList,
        eventRiRecInqVoList:eventRiRecInqVoList,
       };
});
