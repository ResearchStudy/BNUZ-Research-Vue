const { validateCommon } = require('@/utils/formValidate')

module.exports = {
  nickname: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  realname: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
  motto: [{
    validator: validateCommon, trigger: ['blur', 'change']
  }],
}