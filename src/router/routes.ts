import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Application',
    component: () => import('/src/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('/src/views/Index.vue')
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('/src/views/system/Index.vue'),
        children: [
          {
            path: 'group',
            name: 'Group',
            component: () => import('/src/views/system/Group.vue')
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('/src/views/system/User.vue')
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('/src/views/system/Role.vue')
          },
          {
            path: 'authority',
            name: 'Authority',
            component: () => import('/src/views/system/Authority.vue')
          }
        ]
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('/src/views/assets/posts/Index.vue'),
        children: [
          {
            path: '',
            name: 'Index',
            component: () => import('/src/views/assets/posts/Items.vue'),
          },
          {
            path: 'profile/:code',
            name: 'Porfile',
            component: () => import('/src/views/assets/posts/Profile.vue'),
          }
        ]
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('/src/views/assets/Portfolio.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('/src/views/assets/Category.vue')
      },
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('/src/views/login/SignIn.vue'),
  }
];

export default routes;