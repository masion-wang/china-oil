define(function (require) {
  var configHeadList = [
    {
      dataEname: 'assetCode',  // 资产编码
      infoCode: 'fieldaa',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'txt',
      }
    },
    {
      dataEname: 'company', // 机构
      infoCode: 'fieldab',
      readonly: '0', // 只读
      width: '260px',
      config: {
        type: 'selectPo',
        poName: 'ehrOrg',
        code: 'orgCode',
        name: 'orgName'
      }
    },
    {
      dataEname: 'operationAreaBranch', // 作业区/作业公司
      infoCode: 'fieldac',
      readonly: '0', // 只读
      width: '260px',
      config: {
        type: 'selectPo',
        poName: 'ehrOrg',
        code: 'orgCode',
        name: 'orgName'
      }
    },
    {
      dataEname: 'oilFieldName', // 油田名称
      infoCode: 'fieldad',
      readonly: '0', // 只读
      config: {
        type: 'input',
        maxlength: '60'
      }
    },
    {
      dataEname: 'propertyType', // 财产类型
      infoCode: 'fieldae',
      readonly: '0', // 只读
      config: {
        type: 'ggcode',
        codeType: 'PropertyType'
      }
    },
    {
      dataEname: 'assetPropertyName', // 财产名称
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'wellNameWellNo', // 井名/井号
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'wellType', // 井别
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'WellType'
      }
    },
    {
      dataEname: 'wellCategory', // 井型
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'WellCategory'
      }
    },
    {
      dataEname: 'wellDepthM', // 井深（M）
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'numInput',
        numLen: '2',
        maxlength: '200',
      }
    },
    {
      dataEname: 'wellDepthft', // 井深ft）
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'numInput',
        numLen: '2',
        maxlength: '200',
      }
    },
    {
      dataEname: 'interest', // 权益
      infoCode: 'fieldag',
      readonly: '0', // 只读
      width: '120px',
      default: 100,
      config: {
        type: 'numInput',
        patternKey: 'Hundred',
        maxlength: '3'
      }
    },
    {
      dataEname: 'validStatus', // 有效状态
      infoCode: 'fieldah',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'ValidStatus'
      }
    },
    {
      dataEname: 'assetStartDate', // 开钻起期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'assetEndDate', // 开钻止期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'AFE', // AFE(USD)
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'vesselName', // 船舶名称
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '60'
      }
    },
    {
      dataEname: 'vesselNo', // 船牌号码/IMO
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '60'
      }
    },
    {
      dataEname: 'vesselType', // 船舶类型
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'VesselType'
      }
    },
    {
      dataEname: 'yearBuilt', // 建造年份
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'date',
        datePickType: "year",
        format: 'yyyy',
        valFormat: 'yyyy',
        placeholder: '请选择年份'
      }
    },
    {
      dataEname: 'vesselClass', // 船级
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'vesselFlag', // 船旗
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'vesselGoods', // 随船物品
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'DWTWeight', // 载重吨位/重量
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '100'
      }
    },
    {
      dataEname: 'nameAddressVesselOwner', // 船东名称/地址
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '100'
      }
    },
    {
      dataEname: 'engineeringName', // 工程名称
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '60'
      }
    },
    {
      dataEname: 'engineeringAddress', // 工程地址
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'input',
        maxlength: '60'
      }
    },
    {
      dataEname: 'engineeringStartDate', // 工程起期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'engineeringEndDate', // 工程止期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'trialRunStartDate', // 试车起期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'trailRunEndDate', // 试车止期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'maintainStartDate', // 维护起期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'maintainEndDate', // 维护止期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'discoveryStartDate', // 发现起期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'discoveryEndDate', // 发现止期
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '150px',
      config: {
        type: 'date',
      }
    },
    {
      dataEname: 'assetName', // 名称
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '190px',
      config: {
        type: 'input',
      }
    },
    {
      dataEname: 'assetAddress', // 地址
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '200px',
      config: {
        type: 'input',
        maxlength: '200'
        // type: 'select',
        // url: '/common/gg_country/findAll',
        // code: 'countryCode',
        // name: 'countryCname',
        // data: {
        //   areaLevel: '1'
        // }
      }
    },
    {
      dataEname: 'allForms', // 所有形式
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'AllFrom'
      }
    },
    {
      dataEname: 'buyerFullName', // 买方全称
      width: '120px',
      config: {
        type: 'input',
        maxlength: "60"
      }
    },
    {
      dataEname: 'buyerCountry', // 买方所在国家
      width: '120px',
      config: {
        type: 'select',
        url: '/common/gg_country/findAll',
        code: 'countryCode',
        name: 'countryCname',
        data: {
          areaLevel: '1'
        }
      }
    },
    {
      dataEname: 'material', // 经营品种
      width: '120px',
      config: {
        type: 'input',
        maxlength: "200"
      }
    },
    {
      dataEname: 'buyerCertificateUniformSocialCode', // 买方社会信用统一代码
      width: '120px',
      config: {
        type: 'input',
        maxlength: "18"
      }
    },
    {
      dataEname: 'buyerRegistrationAddress', // 买方注册地址
      width: '120px',
      config: {
        type: 'input',
        maxlength: "60"
      }
    },
    {
      dataEname: 'appliedCreditPeriod', // 申请信用期限
      width: '120px',
      config: {
        type: 'input',
        maxlength: "200"
      }
    },
    {
      dataEname: 'appliedCreditLimit', // 申请信用额
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'historyCooperation', // 历史合作年限
      width: '120px',
      config: {
        type: 'input',
        maxlength: "200"
      }
    },
    {
      dataEname: 'a2No', // A2编码
      width: '120px',
      config: {
        type: 'txt',
      }
    },
    {
      dataEname: 'assetClassification', // 资产分类
      // width: '120px',
      config: {
        type: 'ggcode',
        codeType: 'AssetType'
      }
    },
    {
      dataEname: 'cargoEquipmentName', // 货物设备描述
      // width: '120px',
      config: {
        type: 'input',
        maxlength: '2000'
      }
    },
    {
      dataEname: 'package', // 包装
      // width: '120px',
      config: {
        type: 'input',
        maxlength: '2000'
      }
    },
    {
      dataEname: 'number', // 数量
      // width: '120px',
      config: {
        type: 'numInput',
        patternKey: 'Zero'
      }
    },
    {
      dataEname: 'contractNo', // 合同号
      // width: '120px',
      config: {
        type: 'input',
        patternKey: '200'
      }
    },
    {
      dataEname: 'AssetName', // 资产名称
      // width: '120px',
      config: {
        type: 'input',
        maxlength: "200"
      }
    },
    {
      dataEname: 'assetDescription', // 资产描述
      // width: '120px',
      config: {
        type: 'input',
        maxlength: "2000"
      }
    },
    {
      dataEname: 'liabilityDescription', // 责任描述
      // width: '120px',
      config: {
        type: 'input',
        maxlength: "2000"
      }
    },
    {
      dataEname: 'LimitIndemnityPerTime', // 每次赔偿限额
      // width: '120px',
      config: {
        type: 'input',
        maxlength: "200"
      }
    },
    {
      dataEname: 'aggregateLimitIndemnity', // 累计赔偿限额
      // width: '120px',
      config: {
        type: 'numInput',
        patternKey: 'Zero',
        numLen: '2',
        thou: true,
        maxlength: '60',

      }
    },

    {
      dataEname: 'inputTime', // 导入时间
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '140px',
      config: {
        type: 'txt',
      }
    },
    {
      dataEname: 'operator', // 操作人
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '120px',
      config: {
        type: 'txt',
      }
    },
    {
      dataEname: 'assetProposalStatus', // 投保状态
      width: '120px',
      config: {
        type: 'txt',
      }
    },
    {
      dataEname: 'insurancePeriod', // 保险期间
      infoCode: 'fieldaf',
      readonly: '0', // 只读
      width: '200px',
      // default: [],
      config: {
        type: 'txt',
        // datePickType: "daterange",
      }
    },
    {
      dataEname: 'productName', // 产品名称
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'productDescription', // 产品描述
      config: {
        type: 'input',
        maxlength: '2000'
      }
    },
    {
      dataEname: 'productNumber', // 产品数量
      config: {
        type: 'numInput',
        maxlength: '2000'
      }
    },
    {
      dataEname: 'personnelType', // 人员类型
      config: {
        type: 'input',
        maxlength: '200'
      }
    },
    {
      dataEname: 'numberStaff', // 人数
      config: {
        type: 'numInput',
        maxlength: '200',
        patternKey: 'Zero'
      }
    },
    {
      dataEname: 'usage', // usage
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'workingArea', // workingArea
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'totalTons', // 总吨
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'netTons', // 净吨
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'callSign', // 呼号
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'shipRegistryPort', // 船籍港
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'paymentPlace', // 赔付地点
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
    {
      dataEname: 'navigationArea', // 航行区域
      width: '120px',
      config: {
        type: 'input',
        maxlength: '200',
      }
    },
  
  ]
  return {
    configHeadList
  }
})