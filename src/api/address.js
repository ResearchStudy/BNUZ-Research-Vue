import request from '../utils/request'

const prefix = '/address'

export function saveAddress(data) {
    return request({
        url: `${prefix}`,
        method: 'post',
        data: data
    })
}

export function getAddressById(params) {
    return request({
        url: `${prefix}/list`,
        method: 'get',
        params:params
    })
}
