define(function (require) {
  var configHeadList = [
    {
      dataEname: "No.", // 标的序号
      infoCode: "itemNo",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "Insured", // 被保人
      infoCode: "insured",
      readonly: "0", // 只读
      width: "260px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "engineeringProject", // 工程名称
      infoCode: "project",
      readonly: "0", // 只读
      width: "260px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "Location", // 工程地址
      infoCode: "location",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "Sourcecode", // 原险种代码
      infoCode: "periodRiskCode",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "nameInsurance", // 原险种名称
      infoCode: "periodRiskName",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "originalWarrantyNumber", // 原保单号
      infoCode: "cedingPolicyNo",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "entryName", // 项目名称
      infoCode: "projectName",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "WellType",
      },
    },
    {
      dataEname: "nameVessel", // 船舶名称
      infoCode: "vesselName",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "WellCategory",
      },
    },
    {
      dataEname: "shipType", // 船舶类型
      infoCode: "usage",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "numInput",
        numLen: "2",
        maxlength: "200",
      },
    },
    {
      dataEname: "shipNationality", // 船籍
      infoCode: "registered",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "numInput",
        numLen: "2",
        maxlength: "200",
      },
    },
    {
      dataEname: "dwtWeight", // 载重吨位／重量
      infoCode: "tonnage",
      readonly: "0", // 只读
      width: "120px",
      default: 100,
      config: {
        type: "numInput",
        patternKey: "Hundred",
        maxlength: "3",
      },
    },
    {
      dataEname: "yearConstruction", // 建造年份
      infoCode: "builtYear",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "ValidStatus",
      },
    },
    {
      dataEname: "navigationArea", // 航行区域
      infoCode: "workingArea",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "date",
      },
    },
    {
      dataEname: "layer", // Layer层
      infoCode: "layer",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "attribute", // 属性
      infoCode: "nature",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "deductible", // 免赔
      infoCode: "excess",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "oilField", // 油田
      infoCode: "oilField",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "VesselType",
      },
    },
    {
      dataEname: "wellName", // 井名
      infoCode: "wellName",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "wellNo", // 井号
      infoCode: "wellNo",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "wellType", // 井型
      infoCode: "wellType",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "wellDepth(m)", // 井深（米）
      infoCode: "depthm",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "wellDepth(ft)", //   井深（英尺）
      infoCode: "depthft",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "100",
      },
    },
    {
      dataEname: "operationArea", // 作业区
      infoCode: "area",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "100",
      },
    },
    {
      dataEname: "nameProperty", // 财产名称
      infoCode: "propertyDetails",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "typeProperty", // 财产类型
      infoCode: "propertyType",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "term", // 项
      infoCode: "section",
      readonly: "0", // 只读
      width: "150px",
      config: {
        type: "date",
      },
    },
    {
      dataEname: "PeriodFrom", // 保险起期
      infoCode: "periodStart",
      readonly: "0", // 只读
      width: "150px",
      config: {
        type: "date",
      },
    },
    {
      dataEname: "PeriodTo", // 保险止期
      infoCode: "periodEnd",
      readonly: "0", // 只读
      width: "150px",
      config: {
        type: "date",
      },
    },
    {
      dataEname: "coverageLimit", // 保额／限额
      infoCode: "insuredValue",
      readonly: "0", // 只读
      width: "150px",
      config: {
        type: "date",
      },
    },
    {
      dataEname: "rightsCnooc", // 海油权益%
      infoCode: "interestcnooc",
      readonly: "0", // 只读
      width: "150px",
      config: {
        type: "date",
      },
    },
  ];
  return {
    configHeadList,
  };
});
