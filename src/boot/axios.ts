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
      const status = error.response?.status
      switch (status) {
        case 401:
          localStorage.removeItem('access_token')
          router.replace('/login')
          break
        case 403:
          Notify.create({ type: 'forbidden', message: t('error') })
          break
        case 404:
          Notify.create({ type: 'negative', message: t('notFound') })
          break
        case 500:
          Notify.create({ type: 'negative', message: t('serverError') })
          break
        default:
          Notify.create({ type: 'negative', message: t('error') })
      }
      return Promise.reject(error)
    }
  )
})

export { api }
