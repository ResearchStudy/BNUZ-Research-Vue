import request from '../utils/request'

const prefix = '/courses'

export function saveCourses(data) {

    return request({
        url: `${prefix}`,
        method: 'post',
        data: data
    })
}
