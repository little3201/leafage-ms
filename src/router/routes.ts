import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardIndex.vue') },
      {
        path: 'system',
        redirect: { path: 'user' },
        children: [
          { path: 'user', component: () => import('pages/system/user/IndexPage.vue') },
          { path: 'group', component: () => import('pages/system/group/IndexPage.vue') },
          { path: 'role', component: () => import('pages/system/role/IndexPage.vue') },
          { path: 'dictionary', component: () => import('pages/system/dictionary/IndexPage.vue') },
          { path: 'region', component: () => import('pages/system/region/IndexPage.vue') }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
