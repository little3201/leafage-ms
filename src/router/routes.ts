import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../views/system/Index.vue'),
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/system/User.vue')
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('../views/system/Role.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        component: () => import('../views/system/Authority.vue')
      }
    ]
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/posts/Index.vue'),
    children: [
      {
        path: 'blog',
        name: 'blog',
        component: () => import('../views/posts/Blog.vue')
      },
      {
        path: '/portifolio',
        name: 'portifolio',
        component: () => import('../views/posts/Portifolio.vue')
      },
      {
        path: 'category',
        name: 'category',
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