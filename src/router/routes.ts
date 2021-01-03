import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/system/Index.vue'),
    children: [
      {
        path: '',
        name: 'Group',
        component: () => import('../views/system/Group.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/system/User.vue')
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/system/Role.vue')
      },
      {
        path: 'authority',
        name: 'Authority',
        component: () => import('../views/system/Authority.vue')
      }
    ]
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/posts/Index.vue'),
    children: [
      {
        path: '',
        name: 'Blog',
        component: () => import('../views/posts/Blog.vue')
      },
      {
        path: 'portifolio',
        name: 'Portifolio',
        component: () => import('../views/posts/Portifolio.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/posts/Category.vue')
      }
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/login/SignIn.vue'),
  }
];

export default routes;