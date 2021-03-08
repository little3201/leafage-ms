import axios, { Canceler } from 'axios'
import router from '../router'

const redirectTo = (path: string) => {
  requestList.length && requestList.length > 0 && requestList.forEach((cancleRequest, index) => {
    cancleRequest() // 取消请求
    delete requestList[index]
  })
  router.push(path)
}

// 默认配置
const config = {
  withCredentials: true,
  // 请求的完整路径就是baseURL中的
  baseURL: 'https://console.abeille.top/api'
}

const instance = axios.create(config)
let requestList: Canceler[] = []

// 请求拦截
instance.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(function executor(cancel: Canceler): void {
      requestList.push(cancel)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  res => {
    // 用户不存在，跳转注册
    if (res.status === 204) {
      setTimeout(() => { redirectTo('/signup') }, 300)
    }
    return res
  },
  error => {
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
        case 500:
          response.statusText = '服务可能罢工了，刷新试试。'
          break
        default:
          response.statusText = '请求可能跑丢了，再试一下。'
      }
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
    }
    return Promise.reject(error)
  }
)

export default instance;
