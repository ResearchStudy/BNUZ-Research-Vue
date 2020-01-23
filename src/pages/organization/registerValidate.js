const { validateMoney, validatePhone } = require('@/utils/formValidate')

module.exports = {
  name: [{
    required: true, message: "请输入企业名称", trigger: ['blur', 'change']
  }],
  tax_id: [{
    required: true, message: "请输入企业注册号", trigger: ['blur', 'change']
  }],
  institution_type: [{
    required: true, message: "请输入企业类型", trigger: ['blur', 'change']
  }],
  establish_time: [{
    required: true, message: "请输入成立时间", trigger: ['blur', 'change']
  }],
  province_id: [{
    required: true, message: '请选择省份', trigger: ['blur', 'change']
  }],
  city_id: [{
    required: true, message: '请选择城市', trigger: ['blur', 'change']
  }],
  details: [{
    required: true, message: '请输入地址详情', trigger: ['blur', 'change']
  }],
  legal_person: [{
    required: true, message: '请输入法人', trigger: ['blur', 'change']
  }],
  phone: [{
    required: true, message: '请输入联系电话', trigger: ['blur', 'change']
  }, {
    validator: validatePhone, trigger: ['blur', 'change']
  }],
  approval_time: [{
    required: true, message: '请输入核准时间', trigger: ['blur', 'change']
  }],
  timeRange: [{
    required: true, message: '请输入营业期限', trigger: ['blur', 'change']
  }],
  registered_money: [{
    required: true, message: '请输入注册资金', trigger: ['blur', 'change']
  }, {
    validator: validateMoney, trigger: ['blur', 'change']
  }],
  registration_authority: [{
    required: true, message: '请输入登记机关', trigger: ['blur', 'change']
  }],
  business_scope: [{
    required: true, message: '请输入经营范围', trigger: ['blur', 'change']
  }],
  contact_man: [{
    required: true, message: '请输入联系人', trigger: ['blur', 'change']
  }],
  contact_number: [{
    required: true, message: '请输入联系电话', trigger: ['blur', 'change']
  }, {
    validator: validatePhone, trigger: ['blur', 'change']
  }]
}