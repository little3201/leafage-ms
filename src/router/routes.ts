import { RouteRecordRaw } from 'vue-router';
import Index from '@/views/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Application',
    component: Index,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/system/Index.vue'),
        children: [
          {
            path: 'group',
            name: 'Group',
            component: () => import('@/views/system/Group.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/system/User.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/system/Role.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'authority',
            name: 'Authority',
            component: () => import('@/views/system/Authority.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/views/assets/Posts.vue')
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/assets/Resource.vue')
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
            path: 'account',
            name: 'Account',
            component: () => import('@/views/settings/Account.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'notification',
            name: 'Notification',
            component: () => import('@/views/settings/Notification.vue'),
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
  }
];

export default routes;