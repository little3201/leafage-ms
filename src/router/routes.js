export default [
  {
    path: '/',
    component: () => import('@/views/View'),
    children: [
      {
        path: 'manager',
        component: () => import('@/views/manager/user/Index'),
        children: [
          {
            name: 'User',
            path: '/',
            component: () => import('@/views/manager/user/Item')
          },
          {
            path: 'profile',
            component: () => import('@/views/manager/user/Profile')
          }
        ]
      },
      {
        name: 'Role',
        path: 'role',
        component: () => import('@/views/manager/Role.vue')
      },
      {
        name: 'Source',
        path: 'source',
        component: () => import('@/views/manager/Source.vue')
      },
      {
        name: 'Group',
        path: 'group',
        component: () => import('@/views/manager/Group.vue')
      },
      {
        path: 'article',
        component: () => import('@/views/article/Index'),
        children: [
          {
            name: 'Article',
            path: '/',
            component: () => import('@/views/article/Item')
          },
          {
            path: 'profile',
            component: () => import('@/views/article/Profile')
          }
        ]
      }
    ]
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: () => import('@/views/sign/SignIn')
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: () => import('@/views/sign/SignUp')
  }
]
