const validateWhiteSpace = (value, callback) => {
  if (value.toString().indexOf(' ') !== -1) {
    callback(new Error('不能包含空格'))
  }
}

const validateIsEmpty = (value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  }
}

const validateCommon = (rule, value, callback) => {
  validateWhiteSpace(value, callback)
  validateIsEmpty(value, callback)
  callback()
}

const validateRegisteredMoney = (rule, value, callback) => {
  if (/[^\d.]/.test(value.toString())) {
    callback(new Error('请输入纯数字'))
  }
  if (value.toString().indexOf('.') !== value.toString().lastIndexOf('.')) {
    callback(new Error('请输入正确的金额'))
  }
  validateCommon(rule, value, callback)
}

const validatePhone = (rule, value, callback) => {
  if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value.toString())) {
    callback(new Error('请输入正确的手机号'))
  }
  validateCommon(rule, value, callback)
}

module.exports = {
  name: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  tax_id: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  institution_type: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  details: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  legal_person: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  registered_money: {
    validator: validateRegisteredMoney, trigger: ['blur', 'change']
  },
  registration_authority: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  phone: {
    validator: validatePhone, trigger: ['blur', 'change']
  },
  business_scope: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  invoice_rise: {
    validator: validateCommon, trigger: ['blur', 'change']
  },
  taxpayer_distinguish: {
    validator: validateCommon, trigger: ['blur', 'change']
  }
}