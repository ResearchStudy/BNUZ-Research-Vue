import request from '../utils/request'

const prefix = '/institutions'

export function getInstitutionsIds(params) {
    return request({
        url: `${prefix}/list`,
        params:params,
        method: "get"
    })
}

export function getInstitutionDetails(ids) {
    return request({
        url: `${prefix}/_mget`,
        data:ids,
        method: 'post'
    })
}


export function enrollInstitutions(data) {
    return request({
        url: `${prefix}/enroll`,
        method: 'post',
        data: data
    })
}


export function institutionsFilesUpload(id,data) {
    return request({
        url: `${prefix}/enroll/${id}/attachments`,
        data: data,
        method: 'post'
    })
}
