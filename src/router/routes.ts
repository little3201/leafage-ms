import { RouteRecordRaw } from 'vue-router';
import Index from '/@/views/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Application',
    component: Index,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('/src/views/Dashboard.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('/src/views/system/Index.vue'),
        children: [
          {
            path: 'group',
            name: 'Group',
            component: () => import('/src/views/system/Group.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('/src/views/system/User.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('/src/views/system/Role.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'authority',
            name: 'Authority',
            component: () => import('/src/views/system/Authority.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('/src/views/assets/Posts.vue')
      },
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('/src/views/assets/Resource.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('/src/views/assets/Category.vue')
      },
      {
        path: 'region',
        name: 'Region',
        component: () => import('/src/views/assets/Region.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('/src/views/settings/Index.vue'),
        children: [
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('/src/views/settings/Profile.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'secret',
            name: 'Secret',
            component: () => import('/src/views/settings/Secret.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'account',
            name: 'Account',
            component: () => import('/src/views/settings/Account.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'notifications',
            name: 'Notifications',
            component: () => import('/src/views/settings/Notification.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('/src/views/notification/Index.vue'),
        children: [
          {
            path: 'unread',
            name: 'Unread',
            component: () => import('/src/views/notification/Unread.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'readed',
            name: 'Readed',
            component: () => import('/src/views/notification/Readed.vue'),
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