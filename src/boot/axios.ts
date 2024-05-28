import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, AxiosError } from 'axios'
import { Notify } from 'quasar'

const abortControllerMap: Map<string, AbortController> = new Map()

const api: AxiosInstance = axios.create({ baseURL: process.env.API })

export default boot(() => {
  // 请求拦截器
  api.interceptors.request.use(
    config => {
      // 创建 AbortController 实例
      const abortController = new AbortController()
      // 将 signal 添加到请求配置中
      const url = config.url || ''
      config.signal = abortController.signal
      abortControllerMap.set(url, abortController)
      return config
    }
  )

  // 响应拦截器
  api.interceptors.response.use(
    response => {
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
