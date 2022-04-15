import { SERVER_URL } from './constant'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '../router'

const controller = new AbortController()

const redirectTo = (path: string) => {
    router.replace(path)
}

const instance = axios.create({
    withCredentials: true,
    // 请求的完整路径就是baseURL中的
    baseURL: '/api'
})

// 请求拦截
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.signal = controller.signal
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        return res
    },
    (error: AxiosError) => {
        const { response } = error
        if (response) {
            // 状态码判断
            switch (response.status) {
                // 401: 未登录状态，403：无权限，跳转登录页
                case 401:
                case 403:
                    redirectTo('/signin')
                    break
                // 404/500请求不存在
                case 404:
                case 502:
                    response.statusText = '网络异常，刷新试试。'
                    break
                default:
                    response.statusText = '请求可能跑丢了，再试一下。'
            }
        }
        return Promise.reject(error)
    }
)

export { instance, SERVER_URL }
