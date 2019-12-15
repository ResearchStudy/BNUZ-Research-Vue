import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  },
  withCredentials: true
})

const post = (url, params, options = {}) => {
  return new Promise(async (resolve, reject) => {
    instance.post(url, params, options).then(res => {
      resolve(res)
    }).catch(err => {
      /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
      const { response: { data } } = err
      console.log(data)
      return reject()
    })
  })
}

const get = (url, params = {}, options = {}) => {
  return new Promise(async (resolve, reject) => {
    instance.get(url, params, options).then(res => {
      resolve(res)
    }).catch(err => {
      /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
      const { response: { data } } = err
      console.log(data)
      return reject()
    })
  })
}

export default {
  post, get
}