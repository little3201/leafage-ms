import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Notify } from 'quasar'

const abortControllerMap: Map<string, AbortController> = new Map()

const api: AxiosInstance = axios.create({ baseURL: process.env.API, withCredentials: true, timeout: 10000 })

export default boot(() => {
  // 请求拦截器
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 创建 AbortController 实例
      const abortController = new AbortController()
      // 将 signal 添加到请求配置中
      const url = config.url || ''
      config.signal = abortController.signal
      abortControllerMap.set(url, abortController)
      return config
    },
    (error: AxiosError) => {
      Notify.create({ type: 'negative', message: error.message })
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      const url = response.config.url || ''
      abortControllerMap.delete(url)
      return response
    },
    (error: AxiosError) => {
      Notify.create({ type: 'negative', message: error.message })
      return Promise.reject(error)
    }
  )
})

export { api }
