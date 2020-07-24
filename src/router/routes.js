export default [
  {
    path: '/',
    component: () => import('@/views/View'),
    children: [
      {
        name: 'dashbord',
        path: '',
        component: () => import('@/views/Index')
      },
      {
        path: 'manager',
        component: () => import('@/views/manager/Index'),
        children: [
          {
            name: 'User',
            path: 'user',
            component: () => import('@/views/manager/User')
          },
          {
            name: 'Role',
            path: 'role',
            component: () => import('@/views/manager/Role')
          },
          {
            name: 'Source',
            path: 'source',
            component: () => import('@/views/manager/Source')
          },
          {
            name: 'Group',
            path: 'group',
            component: () => import('@/views/manager/Group')
          }
        ]
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
