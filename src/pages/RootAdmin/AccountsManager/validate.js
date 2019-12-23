const { validateCommon,validatePassword } = require('@/utils/formValidate')

module.exports = {
  username: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  password: [{
    validator: validatePassword, trigger: ['blur', 'change']
  }],
  role: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }]
}