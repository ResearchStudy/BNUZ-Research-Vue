const validateWhiteSpace = (value, callback) => {
  if (value && value.toString().indexOf(' ') !== -1) {
    callback(new Error('不能包含空格'))
  }
}

const validateIsEmpty = (value, callback) => {
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入内容'))
  }
}

const validateCommon = (rule, value, callback) => {
  validateIsEmpty(value, callback)
  validateWhiteSpace(value, callback)
  callback()
}

const validatePassword = (rule, value, callback) => {
  if (value.toString().length < 8 || value.toString().length > 32) {
    callback(new Error('密码长度应在8至32位'))
  } else {
    validateCommon(rule, value, callback)
  }
}

const validateNumber = (rule, value, callback) => {
  validateIsEmpty(value, callback)
  validateWhiteSpace(value, callback)
  if (/[^\d.]/.test(value.toString())) {
    callback(new Error('请输入纯数字'))
  } else if (value.toString().indexOf('.') !== value.toString().lastIndexOf('.')) {
    callback(new Error('请输入正确的金额'))
  }else{
    callback()
  }
}

const validatePhone = (rule, value, callback) => {
  if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value.toString())) {
    callback(new Error('请输入正确的手机号'))
  } else {
    validateCommon(rule, value, callback)
  }
}

const validateEmail = (rule, value, callback) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (!reg.test(value)) {
    callback(new Error('邮箱格式有误'));
  } else {
    validateCommon(rule, value, callback)
  }
}

module.exports = {
  validateNumber,
  validatePassword,
  validatePhone,
  validateEmail,
  validateCommon
}