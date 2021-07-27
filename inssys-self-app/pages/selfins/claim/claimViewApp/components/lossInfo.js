/**
 *  出险信息组件
 * @author 苏程圳
 * @time 2018/6/8
 */
define(function (require) {
  var config = {
    api: {
      'saveLossInfo':'/claim/claim/loss',
      'getCountry':'/common/gg_country/findAll'
    },
  }
  Vue.gvUtil.setApi(config.api);
  return Vue.gvUtil.Page({
    template: require('./lossInfo.html'),
    name: 'lossInfoApp',
    params: function () {
      return {
      };
    },
    props: {
      vo: null,
      isReadonly: {
        type:Boolean,
        default:false,
      }
    },
    datas: function () {
      return {
        lossInfo: {
          lossReason: '', //出险原因
          lossDate: '', //出险时间
          submitterName: '', //提交人
          submitterCode: '', //提交人
          country: '', //国家
          province: '', //省
          city: '', //市
          district: '', //区
          postalCode: '', //邮编
          submissionDate: '', //提交日期
          address: '', //地址
          lossDescription: '' //出险描述
        },
        rules: {
          lossDate: [{ required: true, message: '出险时间不能为空', trigger: 'blur' }]
        },
        gwNextNodeExecutorsList: [],
        countryOptions: [],
        provinceOptions: [],
        cityOptions: [],
        districtOptions: []
      }
    },
    events: {
      //提交
      submitLossInfo: function() {
        let _this = this;
        this.$refs['lossInfo'].validate(function (valid,obj) {
          if(!valid) {
            for(i in obj) {
              _this.$refs[i].focus();
            }
          } else {
            url = Vue.gvUtil.getUrl({
              apiName: 'saveLossInfo',
              contextName: 'product'
            });
            _this.lossInfo.submissionDate = Vue.filter('time')(new Date(), 'yyyy-MM-dd HH:mm:ss');;
            _this.lossInfo.submitterCode = _this.userInfo.userCode;
            _this.lossInfo.submitterName = _this.userInfo.userName;
            if(sessionStorage.getItem('taskObj')) {
              var taskObj = JSON.parse(sessionStorage.getItem('taskObj'));
              _this.lossInfo.taskNo = taskObj.taskNo;
            }
            Vue.gvUtil.http.post(url, _this.lossInfo).then(function (res) {
              if (res.resCode === '0000') {
                // _this.$emit('saveConfirm');
                _this.gwNextNodeExecutorsList = res.resData.gwNextNodeExecutorsList;
                _this.gwNextNodeExecutorsList[0].exStr = res.resData.next_activity_and_executor_list;
                if(sessionStorage.getItem('taskObj')) {
                  var taskObj1 = JSON.parse(sessionStorage.getItem('taskObj'));
                  _this.gwNextNodeExecutorsList[0].taskNo = taskObj1.taskNo;
                }
                Vue.gvUtil.showWorkflow({
                  gwNextNodeExecutorsList: _this.gwNextNodeExecutorsList,
                  type: '0', // 0 提价 // 1 驳回
                  code: _this.gwNextNodeExecutorsList[0].innerRefNo.split('#')[0],
                  showCode: true,
                  showCodeLabel: '赔案号'
                });
              }
            });
          }
        });
      },
      //选择国家
      selectCountry: function(val) {
        if(val != 'CN') {
          this.lossInfo.province = '';
          this.lossInfo.city = '';
          this.lossInfo.district = '';
        } else {
          this.getAreaOptions('2', val);
        }
      },
      //选择省
      selectProvince: function(val) {
        if(val) {this.getAreaOptions('3', val);}
        this.lossInfo.city = '';
        this.lossInfo.district = '';
      },
      //选择市
      selectCity: function(val) {
        if(val) {this.getAreaOptions('4', val);}
        this.lossInfo.district = '';
      }
    },
    methods: {
      initPage: function() {
        if(this.vo && this.vo != null) {
          this.lossInfo = this.vo
        }
        this.getAreaOptions('1','');
      },
      getAllArea: function() {
        if(!!this.lossInfo.province && !!this.lossInfo.country) {
          this.getAreaOptions('2', this.lossInfo.country);
        }
        if(!!this.lossInfo.city && !!this.lossInfo.province) {
          this.getAreaOptions('3', this.lossInfo.province);
        }
        if(!!this.lossInfo.district && !!this.lossInfo.city) {
          this.getAreaOptions('4', this.lossInfo.city);
        }
      },
      //获取地区下拉框 areaLevel 1为国家 2为省 3为市 4为区 upperAreaCode传上一级的code 查国家不用传
      getAreaOptions(areaLevel, upperAreaCode = '') {
        let url = Vue.gvUtil.getUrl({
          apiName: 'getCountry',
          contextName: 'product'
        });
        let obj = {
          areaLevel,
          upperAreaCode
        }
        Vue.gvUtil.http.post(url, obj).then(res => {
          if (res.resCode === '0000') {
            let data = res.resData;
            if(areaLevel == '1') {
              let chinaObj = '';
              for(var i = 0; i < data.businessList.length; i++) {
                if(data.businessList[i].countryCode == 'CN') {
                  chinaObj = data.businessList[i];
                  data.businessList.splice(i ,1);
                  break;
                }
              }
              if(chinaObj instanceof Object) {
                data.businessList.unshift(chinaObj);
              }
              this.countryOptions = data.businessList;
            } else if(areaLevel == '2') {
              this.provinceOptions = data.businessList;
            } else if(areaLevel == '3') {
              this.cityOptions = data.businessList;
            } else if(areaLevel == '4') {
              this.districtOptions = data.businessList;
            }
          }
        });
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    watch: {
      vo: {
        handler(val) {
          if(val && val != null) {
            this.lossInfo = JSON.parse(JSON.stringify(val));
            this.getAllArea();
          }
        },
        deep: true
      },
      isReadonly: {
        handler(val) {
          this.isReadonly = val
        },
        deep: true
      }
    }
  });
});