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
    path: '/callback',
    name: 'callback',
    component: () => import('pages/CallbackPage.vue')
  }
]

export default routes
