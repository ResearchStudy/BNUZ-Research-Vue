import axios from 'axios'
import { generateParams } from './generateParams'

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  },
  withCredentials: true
});

const http = {
  post: (url, params, options = {}) => {
    return new Promise(async (resolve, reject) => {
      instance.post(url, params, options).then(res => {
        resolve(res)
      }).catch(err => {
        /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
        const { response: { data } } = err
        return reject(data)
      })
    })
  },
  put: (url, params, options = {}) => {
    return new Promise(async (resolve, reject) => {
      instance.put(url, params, options).then(res => {
        resolve(res)
      }).catch(err => {
        /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
        const { response: { data } } = err
        return reject(data)
      })
    })
  },
  get: (url, params = {}, options = {}) => {
    return new Promise(async (resolve, reject) => {
      instance.get(url + generateParams(params), options).then(res => {
        resolve(res)
      }).catch(err => {
        /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
        const { response: { data } } = err
        return reject(data)
      })
    })
  },
  delete: (url, options = {}) => {
    return new Promise(async (resolve, reject) => {
      instance.delete(url, options).then(res => {
        resolve(res)
      }).catch(err => {
        /* data: { status: false, errcode: 5303, message: "验证失败", data: null } */
        const { response: { data } } = err
        return reject(data)
      })
    })
  }
}

export default http