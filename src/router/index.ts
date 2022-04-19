import { createRouter, createWebHistory, RouteLocationNormalized, Function } from 'vue-router';
import routes from './routes';
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  progress.start()
  const account = sessionStorage.getItem("account")
  let isAuthenticated = account && Object.keys(account).length > 0;
  if (to.meta.requiresAuth && to.path !== '/signin' && !isAuthenticated) {
    next({ path: '/signin', query: { redierct: to.fullPath } })
  } else {
    next()
  }
})

router.afterEach(() => {
  progress.finish()
})

export default router;