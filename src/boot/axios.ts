import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, AxiosError } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$api

  // 创建 AbortController 实例
  const abortController = new AbortController()

  // 获取 AbortController 的信号
  const signal = abortController.signal

  // 请求拦截器
  api.interceptors.request.use(
    config => {
      // 将 signal 添加到请求配置中
      config.signal = signal
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      // 如果请求失败，取消后续请求
      abortController.abort()
      return Promise.reject(error)
    }
  )

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
