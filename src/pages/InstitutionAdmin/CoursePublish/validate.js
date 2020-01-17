const { validateMoney, validatePlanned, validateDate } = require('@/utils/formValidate')

module.exports = {
  courseRules: {
    title: [{
      required: true, message: "请输入标题", trigger: ['blur', 'change']
    }],
    subtitle: [],
    suitable_for_crowd: [],
    price: [{
      required: true, message: "请输入价钱", trigger: ['blur', 'change']
    }, {
      validator: validateMoney, trigger: ['blur', 'change']
    }],
    course_type: [{
      required: true, message: '请选择活动类型', trigger: 'change'
    }],
    tag: [{
      required: true, message: '请选择课程标签', trigger: 'blur'
    }],
    course_time: [{
      required: true, message: '请选择课程时间', trigger: 'blur'
    }, {
      validator: validateDate, trigger: 'change'
    }],
    province_id: [{
      required: true, message: '请选择省份', trigger: 'blur'
    }],
    city_id: [{
      required: true, message: '请选择城市', trigger: 'blur'
    }],
    description: [{
      required: true, message: '请输入课程描述', trigger: 'blur'
    }],
    address_detail: [{
      required: true, message: '请输入详细地址', trigger: 'blur'
    }],
    details: [{
      required: true, message: '请输入课程详情', trigger: 'blur'
    }],
    scheduling: [{
      required: true, message: '请输入课程行程', trigger: 'blur'
    }],
    notice: [{
      required: true, message: '请输入报名须知', trigger: 'blur'
    }]
  },
  termRules: {
    planned: [{
      required: true, message: '请输入计划人数', trigger: 'blur'
    },{
      validator: validatePlanned, trigger: ['blur', 'change']
    }],
    price: [{
      required: true, message: '请输入价钱', trigger: 'blur'
    },{
      validator: validateMoney, trigger: ['blur', 'change']
    }],
    timeRange: [{
      required: true, message: '请选择活动时间', trigger: 'blur'
    },{
      validator: validateDate, trigger: 'change'
    }],
    remarks: []
  }
}