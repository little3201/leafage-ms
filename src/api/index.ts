import { SERVER_URL } from './constant'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '../router'

let pendingPool = new Map()

const instance = axios.create({
    withCredentials: true,
    // 请求的完整路径就是baseURL中的
    baseURL: '/api'
})

// 请求拦截
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        let controller = new AbortController()
        config.signal = controller.signal
        pendingPool.set(config.url, controller)
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        const { config } = res
        pendingPool.delete(config.url)
        return res
    },
    (error: AxiosError) => {
        const { config } = error
        if (!axios.isCancel(error)) {
            pendingPool.delete(config.url)
        }

        const { response } = error
        if (response) {
            // 状态码判断
            switch (response.status) {
                // 401: 未登录状态，403：无权限，跳转登录页
                case 401:
                case 403:
                    router.replace('/signin')
                    break
                // 404/500请求不存在
                case 404:
                case 502:
                    response.statusText = '网络异常，刷新试试。'
                    break
                default:
                    response.statusText = '请求可能跑丢了，再试一下。'
            }
        } else {
            if (axios.isCancel(error)) {
                throw new axios.Cancel(error.message)
            } else if (error.stack && error.stack.includes('timeout')) {
                error.message = '请求超时！'
            } else {
                error.message = '连接服务器失败！'
            }
        }
        return Promise.reject(error)
    }
)

export { instance, SERVER_URL }
