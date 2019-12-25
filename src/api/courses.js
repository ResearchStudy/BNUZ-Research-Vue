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

