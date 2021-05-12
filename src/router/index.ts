import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach(to => {
  const user = sessionStorage.getItem("user")
  let isAuth = false
  if (user && Object.keys(user).length > 0) {
    isAuth = true
  }
  if (to.meta.requiresAuth && !isAuth) {
    // 此路由需要授权，请检查是否已登录, 如果没有，则重定向到登录页面
    return {
      path: '/signin',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
})

export default router;