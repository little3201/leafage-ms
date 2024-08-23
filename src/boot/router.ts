import { boot } from 'quasar/wrappers'
import { useUserStore } from 'stores/user-store'
import { Cookies } from 'quasar'
import type { RouteRecordRaw } from 'vue-router'
import type { PrivilegeTreeNode } from 'src/models'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    const userStore = useUserStore(store)
    if (userStore.user?.username && Cookies.get('logged_in')) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 获取权限，注册路由表
        if (!to.name || !router.hasRoute(to.name)) {
          const routes = generateRoutes(userStore.privileges as PrivilegeTreeNode[])

          // 动态添加可访问路由表
          routes.forEach((route) => {
            router.addRoute(route as RouteRecordRaw)
          })
          // 捕获所有未匹配的路径，放在配置的末尾
          router.addRoute({
            path: '/:cacheAll(.*)*',
            name: 'ErrorNotFound',
            component: () => import('src/pages/ErrorNotFound.vue')
          })

          const redirectPath = from.query.redirect || to.path
          const redirect = decodeURIComponent(redirectPath as string)
          const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
          next(nextData)
        } else {
          next()
        }
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  })
})

// 生成路由
const MainLayout = () => import('src/layouts/MainLayout.vue')
const BlankLayout = () => import('src/layouts/BlankLayout.vue')

const modules = import.meta.glob('../pages/**/*.{vue,tsx}')

export const generateRoutes = (routes: PrivilegeTreeNode[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  for (const route of routes) {
    const data: RouteRecordRaw = {
      path: route.path as string,
      name: route.name,
      redirect: route.redirect,
      component: null,
      children: []
    }
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`]
      const component = route.component as string
      if (comModule) {
        // 动态加载路由文件
        data.component = comModule
      } else if (component.includes('#')) {
        data.component = component === '#' ? MainLayout : BlankLayout
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children)
    }
    res.push(data)
  }
  return res
}
