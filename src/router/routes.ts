import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'application',
    component: () => import('layouts/MainLayout.vue'),
    meta: { icon: 'sym_r_grid_view' },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { icon: 'sym_r_home' }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { icon: 'sym_r_dashboard_customize' }
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('layouts/BlankLayout.vue'),
        meta: { icon: 'sym_r_settings' },
        redirect: { path: 'users' },
        children: [
          {
            path: 'users',
            name: 'users',
            component: () => import('pages/system/user/IndexPage.vue'),
            meta: { icon: 'sym_r_manage_accounts' }
          },
          {
            path: 'groups',
            name: 'groups',
            component: () => import('pages/system/group/IndexPage.vue'),
            meta: { icon: 'sym_r_group' }
          },
          {
            path: 'roles',
            name: 'roles',
            component: () => import('pages/system/role/IndexPage.vue'),
            meta: { icon: 'sym_r_admin_panel_settings' }
          },
          {
            path: 'dictionaries',
            name: 'dictionaries',
            component: () => import('pages/system/dictionary/IndexPage.vue'),
            meta: { icon: 'sym_r_menu_book' }
          },
          {
            path: 'regions',
            name: 'regions',
            component: () => import('pages/system/region/IndexPage.vue'),
            meta: { icon: 'sym_r_public' }
          }
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
