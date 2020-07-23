export default [
  {
    path: '/',
    component: () => import('@/views/View'),
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/Index'),
        children: [
          {
            name: 'User',
            path: '/',
            component: () => import('@/views/user/Item')
          },
          {
            path: 'profile',
            component: () => import('@/views/user/Profile')
          }
        ]
      },
      {
        name: 'Role',
        path: 'role',
        component: () => import('@/views/role/Index')
      },
      {
        name: 'Source',
        path: 'source',
        component: () => import('@/views/source/Index')
      },
      {
        name: 'Group',
        path: 'group',
        component: () => import('@/views/group/Index')
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
