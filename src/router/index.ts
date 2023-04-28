import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import routes from './routes';
import ProgressBar from "@badrap/bar-of-progress";
import { getCookie } from '~/composables/cookies';

const progress = new ProgressBar();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next) => {
  progress.start()
  const username = getCookie("username")
  const isAuthenticated = username && username.length > 0;
  if (to.meta.requiresAuth && !isAuthenticated) {
    window.location.href = '/api/auth/'
  } else {
    next()
  }
})

router.afterEach(() => {
  progress.finish()
})

export default router;