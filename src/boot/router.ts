import { boot } from 'quasar/wrappers'
import { useUserStore } from 'stores/user-store'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    const userStore = useUserStore(store)
    if (userStore.getUsername) {
      if (to.path === '/login') {
        next('/')
      } else {
        next()
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
