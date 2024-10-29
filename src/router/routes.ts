import type { RouteRecordRaw } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
        meta: { icon: 'sym_r_home' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  }
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   name: 'error',
  //   component: () => import('pages/ErrorNotFound.vue')
  // }
]

export default routes
