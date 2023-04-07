import { RouteRecordRaw } from 'vue-router';
import Index from '@/views/Index.vue'

import NotFound from '@/views/NotFound.vue'

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
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/system/Index.vue'),
        redirect: '/system/user',
        children: [
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/system/User.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'group',
            name: 'Group',
            component: () => import('@/views/system/Group.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/system/Role.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'component',
            name: 'Component',
            component: () => import('@/views/system/Component.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'dictionary',
            name: 'Dictionary',
            component: () => import('@/views/system/Dictionary.vue')
          }
        ]
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/views/assets/Posts.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/assets/Category.vue')
      },
      {
        path: 'region',
        name: 'Region',
        component: () => import('@/views/assets/Region.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/settings/Index.vue'),
        children: [
          {
            path: 'information',
            name: 'Information',
            alias: '',
            component: () => import('@/views/settings/Information.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('@/views/settings/Profile.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'security',
            name: 'Security',
            component: () => import('@/views/settings/Security.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'messages',
            name: 'Messages',
            component: () => import('@/views/settings/Messages.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'accesslog',
            name: 'Accesslog',
            component: () => import('@/views/settings/Accesslog.vue'),
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('/src/views/sign/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('/src/views/sign/SignUp.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

export default routes;