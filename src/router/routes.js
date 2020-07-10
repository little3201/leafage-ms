export default [
  {
    path: '/',
    component: () => import('@/views/View'),
    children: [
      {
        name: 'User',
        path: 'user',
        component: () => import('@/views/user/Index'),
        children: [
          {
            name: 'Item',
            path: '/',
            component: () => import('@/views/user/Item')
          },
          {
            name: 'Profile',
            path: 'profile',
            component: () => import('@/views/user/Profile')
          }
        ]
      },
      {
        name: 'Article',
        path: 'article',
        component: () => import('@/views/article/Index'),
        children: [
          {
            name: 'Item',
            path: '/',
            component: () => import('@/views/article/Item')
          },
          {
            name: 'Profile',
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
