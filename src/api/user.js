import request from '../utils/request'
const prefix = '/accounts'

export function login(data) {
    return request({
        url: `${prefix}/login/common`,
        method: 'post',
        data: data
    })
}

export function register(data) {
    return request({
        url: `${prefix}/register`,
        method: 'post',
        data: data
    })
}

export function getUserInfo(id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'get'
    })
}
