import { defineBoot } from '#q-app/wrappers'
import { useUserStore } from 'stores/user-store'
import type { RouteRecordRaw } from 'vue-router'
import type { PrivilegeTreeNode } from 'src/models'

// 生成路由
const BlankLayout = () => import('src/layouts/BlankLayout.vue')

const modules = import.meta.glob('../pages/**/*.{vue,tsx}')

export default defineBoot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    const userStore = useUserStore(store)
    if (Object.keys(userStore.user || {}).length > 0) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 获取权限，注册路由表
        if (!to.name || !router.hasRoute(to.name)) {
          const routes = generateRoutes(userStore.privileges as PrivilegeTreeNode[])

          // 动态添加可访问路由表
          routes.forEach((route) => {
            router.addRoute('home', route as RouteRecordRaw)
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

export const generateRoutes = (routes: PrivilegeTreeNode[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  for (const route of routes) {
    const item: RouteRecordRaw = {
      path: route.meta.path,
      name: route.name,
      redirect: route.meta.redirect as string,
      component: null,
      children: []
    }
    if (route.meta.component) {
      const comModule = modules[`../${route.meta.component}.vue`]
      const component = route.meta.component as string
      if (comModule) {
        // 动态加载路由文件
        item.component = comModule
      } else if (component.includes('#')) {
        item.component = BlankLayout
      }
    }
    // recursive child routes
    if (route.children) {
      item.children = generateRoutes(route.children)
    }
    res.push(item)
  }
  return res
}
