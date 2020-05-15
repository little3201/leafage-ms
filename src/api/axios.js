import axios from 'axios'
import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
// import jwt_decode from 'jwt-decode'

const toSignin = () => {
  router.replace({
    path: '/signin',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

class HttpRequest {
  // 如果传入参数就用传入的，没有就用baseURL.dev
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  // 统一添加请求参数
  getInsideConfig () {
    const config = {
      // axios.create 参数 baseUrl将被添加到`url`前面，除非`url`是绝对的。
      baseURL: this.baseUrl
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        NProgress.start()
        const token = 'token'
        // if (localStorage.Token) {
        if (token) {
        // const decoded = jwt_decode(localStorage.Token)
        // const currentTime = Date.now() / 1000
        // console.log('Token_Decode & currentTime', decoded, currentTime)
        // if (decoded.exp < currentTime) {
          // Vue.prototype.$notify({
          // title: 'Tips',
          // message: 'Token过期，重新登录',
          // type: 'error',
          // duration: 3000
          // })
          // store.dispatch('clearCurrentState') // 清空vuex
          // next('/')
        // }
          config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        this.queue[url] = true
        return config
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        NProgress.done()
        this.destroy(url)
        const { data, status } = res
        return { data, status }
      },
      error => {
        NProgress.done()
        const { response } = error
        if (response) {
          // 状态码判断
          switch (response.status) {
            // 401: 未登录状态，跳转登录页
            case 401:
              setTimeout(() => { toSignin() }, 300)
              break
            // 403 token过期，清除token并跳转登录页
            case 403:
              // localStorage.removeItem('token');
              // store.commit('loginSuccess', null);
              setTimeout(() => { toSignin() }, 300)
              break
            // 404请求不存在
            case 404:
              response.statusText = '服务可能罢工了，再试一下。'
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
  }

  request (options) {
    const instance = axios.create()
    // 覆写库的超时默认值，所有请求都会等待 1 秒
    instance.defaults.timeout = 1000
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
