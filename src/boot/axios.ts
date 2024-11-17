import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'

const { t } = i18n.global

const abortControllerMap: Map<string, AbortController> = new Map()

const api: AxiosInstance = axios.create({
  baseURL: process.env.API,
  timeout: 10000
})

export default boot(({ router }) => {
  // 请求拦截器
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 创建 AbortController 实例
      const controller = new AbortController()
      const uniqueKey = `${config.method}:${config.url}`
      config.signal = controller.signal
      abortControllerMap.set(uniqueKey, controller)

      defaultRequestInterceptors(config)
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
      const uniqueKey = `${response.config.method}:${response.config.url}`
      abortControllerMap.delete(uniqueKey)
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        router.replace('/login')
      } else if (error.response?.status === 404) {
        Notify.create({ type: 'negative', message: t('notFound') })
      } else if (error.response?.status === 500) {
        Notify.create({ type: 'negative', message: t('serverError') })
      }
      Notify.create({ type: 'negative', message: t('error') })
      return Promise.reject(error)
    }
  )
})

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    Object.keys(config.params).forEach((key) => {
      if (config.params[key] !== undefined && config.params[key] !== null && config.params[key] !== '') {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    })
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

export { api }
