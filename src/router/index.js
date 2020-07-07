import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
  routes
})

/* 路由之前检查token */
router.beforeEach((to, from, next) => {
  if (to.path !== from.path && !Vue.component(to.name)) {
    NProgress.start()
  }
  // 放行
  next()
})

/* 路由之后关闭进度条 */
router.afterEach(() => {
  NProgress.done()
})

export default router
