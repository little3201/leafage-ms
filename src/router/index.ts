import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import routes from './routes';
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 路由之前 */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  progress.start()
  next()
})

router.afterEach(() => {
  progress.finish()
})

export default router;