import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach((to, from, next) => {
  progress.start()
  const user = sessionStorage.getItem("user")
  let isAuthenticated = user && Object.keys(user).length > 0;
  if (to.meta.requiresAuth && to.name !== 'SignIn' && !isAuthenticated) next({ name: 'SignIn' })
  else next()
})

router.afterEach(() => {
  progress.finish()
})

export default router;