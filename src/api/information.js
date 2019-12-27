import request from '../utils/request'

const prefix = '/information'

export function saveInformation(data) {

    return request({
        url: `${prefix}`,
        method: 'post',
        data: data
    })
}

export function getInformationById(id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'get'
    })
}