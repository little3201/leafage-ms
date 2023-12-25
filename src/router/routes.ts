import { RouteRecordRaw } from 'vue-router';
import Index from '~/views/Index.vue'

import NotFound from '~/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Application',
    component: Index,
    children: [
      // 为这2个 URL 匹配
      // - /
      // - /dashboard
      {
        path: 'dashboard',
        name: 'Dashboard',
        alias: '',
        component: () => import('~/views/Dashboard.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('~/views/system/Index.vue'),
        redirect: '/system/users',
        children: [
          {
            path: 'users',
            name: 'Users',
            component: () => import('~/views/system/User.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'groups',
            name: 'Groups',
            component: () => import('~/views/system/Group.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'roles',
            name: 'Roles',
            component: () => import('~/views/system/Role.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'components',
            name: 'Components',
            component: () => import('~/views/system/Component.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'dictionaries',
            name: 'Dictionaries',
            component: () => import('~/views/system/Dictionary.vue')
          }
        ]
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('~/views/assets/Posts.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('~/views/assets/Category.vue')
      },
      {
        path: 'regions',
        name: 'Regions',
        component: () => import('~/views/assets/Region.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('~/views/settings/Index.vue'),
        children: [
          {
            path: 'account',
            name: 'Account',
            alias: '',
            component: () => import('~/views/settings/Account.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('~/views/settings/Profile.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'security',
            name: 'Security',
            component: () => import('~/views/settings/Security.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'messages',
            name: 'Messages',
            component: () => import('~/views/settings/Message.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'accesslogs',
            name: 'Accesslogs',
            component: () => import('~/views/settings/Accesslog.vue'),
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('~/views/sign/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('~/views/sign/SignUp.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

export default routes;