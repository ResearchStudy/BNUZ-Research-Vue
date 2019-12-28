import request from '../utils/request'

const prefix = '/courses'

export function saveCourses(data) {

    return request({
        url: `${prefix}`,
        method: 'post',
        data: data
    })
}

export function getCoursesById(id) {
    return request({
        url: `${prefix}/${id}`,
        method: 'get'
    })
}

export function getCoursesList(params) {
    return request({
        url: `${prefix}/list`,
        params:params,
    })
}

export function mGetCoursesInfo(ids){
    return request({
        url: `${prefix}/_mget`,
        method: 'post',
        data: ids
    })
}


export function getTermByCoursesId(id) {
    return request({
        url: `${prefix}/${id}/terms`,
        method: 'get'
    })
}

export function preEnroll(id, data) {
    return request({
        url: `${prefix}/${id}/pre_enroll`,
        method: 'post',
        data: data
    })
}

