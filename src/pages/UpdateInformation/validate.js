const { validatePhone, validateMoney, validateCommon } = require('@/utils/formValidate')

module.exports = {
  name: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  tax_id: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  institution_type: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  details: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  legal_person: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  registered_money: [{
    validator: validateMoney, trigger: ['blur', 'change']
  }],
  registration_authority: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  phone: [{
    validator: validatePhone, trigger: ['blur', 'change']
  }],
  business_scope: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  invoice_rise: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  taxpayer_distinguish: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }]
}