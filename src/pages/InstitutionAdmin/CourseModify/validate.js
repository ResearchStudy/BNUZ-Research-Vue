const { validateNumber, validateCommon } = require('@/utils/formValidate')

module.exports = {
  title: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  sub_title: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  description: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  price: [{
    validator: validateNumber, trigger: ['blur', 'change']
  }],
  address_detail: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  details: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  scheduling: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  notice: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }]
}