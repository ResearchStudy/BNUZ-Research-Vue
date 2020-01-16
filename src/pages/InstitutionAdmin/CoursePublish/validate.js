const { validateMoney, validateCommon, validatePlanned, validateDate } = require('@/utils/formValidate')

module.exports = {
  courseRules: {
    title: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    subtitle: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    suitable_for_crowd: [{
      validator: validateCommon, trigger: ['blur', 'change']
    }],
    price: [{
      validator: validateMoney, trigger: ['blur', 'change']
    }],
    course_type: [{
      required: true, message: '请选择活动类型', trigger: 'change'
    }],
    tag: [{
      required: true, message: '请选择课程标签', trigger: 'blur'
    }],
    course_time: [{
      validator: validateDate, trigger: 'change'
    }],
    province_id: [{
      required: true, message: '请选择省份', trigger: 'blur'
    }],
    city_id: [{
      required: true, message: '请选择城市', trigger: 'blur'
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