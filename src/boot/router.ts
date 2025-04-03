import { defineBoot } from '#q-app/wrappers'
import { Cookies } from 'quasar'
import { useUserStore } from 'stores/user-store'
import { retrievePrivilegeTree } from 'src/api/privileges'
import { signIn, getSub } from 'src/api/authentication'
import { fetchMe } from 'src/api/users'
import type { RouteRecordRaw } from 'vue-router'
import type { PrivilegeTreeNode } from 'src/types'

// 生成路由
const BlankLayout = () => import('src/layouts/BlankLayout.vue')

const modules = import.meta.glob('../pages/**/*.{vue,tsx}')

export default defineBoot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    if (to.path === '/callback') {
      next()
    } else {
      const userStore = useUserStore(store)
      if (userStore.accessToken) {
        // load user info
        if (!userStore.username) {
          const [subRes, userRes] = await Promise.all([getSub(), fetchMe()])
          userStore.$patch({
            username: subRes.data.sub,
            avatar: userRes.data.avatar
          })

        }
        // load privileges
        if (!userStore.privileges.length) {
          const privilegesResp = await retrievePrivilegeTree();
          const privileges = privilegesResp.data;
          userStore.$patch({ privileges });
        }
        if (!to.name || !router.hasRoute(to.name)) {
          const routes = generateRoutes(userStore.privileges)
          routes.forEach((route) => {
            router.addRoute('home', route as RouteRecordRaw)
          })
          router.addRoute({
            path: '/:cacheAll(.*)*',
            name: 'ErrorNotFound',
            component: () => import('pages/ErrorNotFound.vue')
          })
          const redirectPath = from.query.redirect || to.path
          const redirect = decodeURIComponent(redirectPath as string)
          const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
          Cookies.set('current_page', nextData.path)
          next(nextData)
        } else {
          Cookies.set('current_page', decodeURIComponent(to.fullPath as string))
          next()
        }
      } else if (to.fullPath === '/login') {
        next()
      } else {
        await signIn()
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
