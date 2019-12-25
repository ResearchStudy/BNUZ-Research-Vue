import request from '../utils/request'

export function saveCourses(data) {

    return request({
        url: '/',
        method: 'post',
        data: data
    })
}