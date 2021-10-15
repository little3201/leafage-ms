import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach((to, fromk, next) => {
  const user = sessionStorage.getItem("user")
  let isAuthenticated = user && Object.keys(user).length > 0;
  if (to.meta.requiresAuth && to.name !== 'SignIn' && !isAuthenticated) next({ name: 'SignIn' })
  else next()
})

export default router;