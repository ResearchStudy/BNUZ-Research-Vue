import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: '/api',
    timeout: 50000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // if (localStorage.getItem('token')) {
        //     config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        // }

        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        if (res.error) {
            Message({
                message: res.error,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.error || 'Error'))
        } else {
            return res
        }
    },
    (error) => {
        Message({
            showClose: true,
            message: error.response.data.message || error.message,
            type: 'error'
        })// for debug
        return Promise.reject(error)
    }
)



export default service
