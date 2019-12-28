import request from '../utils/request'

const prefix = '/tags'

export function getTags() {

    return request({
        url: `${prefix}/list`,
        method: 'get'
    })

}
