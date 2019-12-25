import request from '../utils/request'

export function getResources(token) {
    return request({
    url: `/resources/${token}`,
        method: 'get'
    })
}
