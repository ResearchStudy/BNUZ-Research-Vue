import request from '../utils/request'

const prefix = '/institutions'

export function getInstitutionsIds(params) {
    return request({
        url: `${prefix}/list`,
        params:params,
        method: "get"
    })
}

export function getInstitutionsInfo(id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'get'
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
    const formData = new FormData();
    data.forEach((item) => {
        formData.append("files",item)
    })
    return request({
        url: `${prefix}/enroll/${id}/attachments`,
        data: formData,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
    })
}


export function getInstitutionList(params) {
    console.log(params)
    return request({
        url: `${prefix}/list`,
        params:params
    })
}

export function mGetInstitutionList(data) {
    return request({
        url: `${prefix}/_mget`,
        data: data,
        method: 'post'
    })
}

