import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'
import type { ComposerTranslation } from 'vue-i18n'
import { useUserStore } from 'src/stores/user-store'
import { signIn } from 'src/api/authentication'


const { t } = i18n.global as { t: ComposerTranslation }
const abortControllerMap: Map<string, AbortController> = new Map()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api: AxiosInstance = axios.create({ baseURL: process.env.API || '/api', timeout: 10000, withCredentials: true })

export default defineBoot(({ store }) => {
  // 请求拦截器
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const userStore = useUserStore(store)
      if (userStore.accessToken) {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`
      }
      // 创建 AbortController 实例
      const controller = new AbortController()
      const uniqueKey = `${config.method}:${config.url}`
      config.signal = controller.signal
      abortControllerMap.set(uniqueKey, controller)

      removeEmptyParamsFromGetRequest(config)
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
          signIn()
          return
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

/**
 * 拦截并处理axios的请求配置，以便在GET请求时移除空字符串、null和undefined的参数。
 * @param config - axios请求配置对象
 * @returns 修改后的axios请求配置对象
 */
const removeEmptyParamsFromGetRequest = (config: InternalAxiosRequestConfig) => {
  // 如果请求方法是 GET 且存在参数
  if (config.method === 'get' && config.params) {
    // 将参数对象转换为键值对数组，过滤掉值为 undefined, null 或 空字符串的参数
    const params = Object.entries(config.params)
      .filter((entry): entry is [string, string] => {
        const value = entry[1]
        return value !== undefined && value !== null && value !== ''
      })
      // 对剩余的参数进行编码并转换为查询字符串格式
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&') // 使用 & 符号连接各个参数

    // 将过滤后的查询字符串附加到 URL 上
    config.url = `${config.url}?${params}`
    config.params = {}
  }
  return config
}

export { api }
