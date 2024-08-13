import type { RouteRecordRaw } from 'vue-router'
import MainLayout from 'layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    meta: { icon: 'mdi-grid_view' },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { icon: 'mdi-home' }
      }
    ]
  },
  // {
  //   path: '/system',
  //   name: 'system',
  //   component: MainLayout,
  //   meta: { icon: 'mdi-settings' },
  //   redirect: { path: '/system/users' }, // redirect must be absolute path
  //   children: [
  //     {
  //       path: 'users',
  //       name: 'users',
  //       component: () => import('pages/system/user/IndexPage.vue'),
  //       meta: { icon: 'mdi-manage_accounts' }
  //     },
  //     {
  //       path: 'groups',
  //       name: 'groups',
  //       component: () => import('pages/system/group/IndexPage.vue'),
  //       meta: { icon: 'mdi-group' }
  //     },
  //     {
  //       path: 'roles',
  //       name: 'roles',
  //       component: () => import('pages/system/role/IndexPage.vue'),
  //       meta: { icon: 'mdi-admin_panel_settings' }
  //     },
  //     {
  //       path: 'privileges',
  //       name: 'privileges',
  //       component: () => import('pages/system/privilege/IndexPage.vue'),
  //       meta: { icon: 'mdi-admin_panel_settings' }
  //     },
  //     {
  //       path: 'dictionaries',
  //       name: 'dictionaries',
  //       component: () => import('pages/system/dictionary/IndexPage.vue'),
  //       meta: { icon: 'mdi-menu_book' }
  //     },
  //     {
  //       path: 'regions',
  //       name: 'regions',
  //       component: () => import('pages/system/region/IndexPage.vue'),
  //       meta: { icon: 'mdi-public' }
  //     }
  //   ]
  // },
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
