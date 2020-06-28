export default [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      {
        name: 'User',
        path: 'user',
        component: () => import('@/views/user/Index')
      },
      {
        name: 'Article',
        path: 'article',
        component: () => import('@/views/article/Index')
      }
    ]
  },
  {
    name: 'Editor',
    path: '/editor',
    component: () => import('@/views/article/Editor')
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
