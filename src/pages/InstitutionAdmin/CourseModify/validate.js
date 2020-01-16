const { validateMoney, validateCommon, validatePlanned, validateDate } = require('@/utils/formValidate')

module.exports = {
  courseRules: {
    title: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    sub_title: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    suitable_for_crowd: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    price: [{
      validator: validateMoney, trigger: ['blur', 'change']
    }],
    description: [{
      validator: validateCommon, trigger: ['blur', 'change']
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
  },
  termRules: {
    planned: [{
      validator: validatePlanned, trigger: ['blur', 'change']
    }],
    price: [{
      validator: validateMoney, trigger: ['blur', 'change']
    }],
    timeRange: [{
      validator: validateDate, trigger: 'change'
    }],
    remarks: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }]
  }
}