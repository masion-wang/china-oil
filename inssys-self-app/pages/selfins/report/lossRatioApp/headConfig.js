define(function (require) {
  var configHeadList = [
    {
      dataEname: "index", // 序号
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "projectName", // 项目名称
      infoCode: "",
      readonly: "0", // 只读
      width: "260px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "proposalName", // 投保单位
      infoCode: "",
      readonly: "0", // 只读
      width: "260px",
      config: {
        type: "txt",
      },
    },
    {
      dataEname: "riskCode", // 险种
      infoCode: "",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "60",
      },
    },
    {
      dataEname: "zblossStarts", // 出险起期
      infoCode: "",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "zblossEnd", // 出险止期
      infoCode: "",
      readonly: "0", // 只读
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "zblossNumber", // 出险次数
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "input",
        maxlength: "200",
      },
    },
    {
      dataEname: "zbamountTotal", // 赔案总金额
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "WellType",
      },
    },
    {
      dataEname: "zbselfInsureamount", // 自保公司自留份内金额
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "WellCategory",
      },
    },
    {
      dataEname: "zbselfPremiumincome", // 保费收入（自保公司自留份额）
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "numInput",
        numLen: "2",
        maxlength: "200",
      },
    },
    {
      dataEname: "zblossratioij", // 赔付率（I/J）
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "numInput",
        numLen: "2",
        maxlength: "200",
      },
    },
    {
      dataEname: "policyNo", // 保单号
      infoCode: "",
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
      dataEname: "underwritingYear", // 承保年度
      infoCode: "",
      readonly: "0", // 只读
      width: "120px",
      config: {
        type: "ggcode",
        codeType: "ValidStatus",
      },
    },
  ];
  return {
    configHeadList,
  };
});
