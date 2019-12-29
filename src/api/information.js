import request from '../utils/request'

const prefix = '/information'

export function saveInformation(data) {
    return request({
        url: `${prefix}`,
        method: 'post',
        data: data
    })
}

export function submitInformation(data,id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'put',
        data: data
    })
}

export function getInformationById(id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'get'
    })
}

export function getInformationList(params) {
    console.log(params)
    return request({
        url: `${prefix}/list`,
        param: params,
        method: 'get'
    })
}

export function mGetInformationList(data) {
    return request({
        url: `${prefix}/_mget`,
        data: data,
        method: 'post'
    })
}
