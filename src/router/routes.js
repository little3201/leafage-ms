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
            name: 'Table',
            path: '/',
            component: () => import('@/views/user/Table')
          },
          {
            name: 'Editor',
            path: 'editor',
            component: () => import('@/views/user/Editor')
          }
        ]
      },
      {
        name: 'Article',
        path: 'article',
        component: () => import('@/views/article/Index'),
        children: [
          {
            name: 'Table',
            path: '/',
            component: () => import('@/views/article/Table')
          },
          {
            name: 'Editor',
            path: 'editor',
            component: () => import('@/views/article/Editor')
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
