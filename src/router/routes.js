export default [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      // Dashboard
      // {
      //   name: 'Dashboard',
      //   path: '',
      //   component: () => import('@/views/dashboard/Index')
      // },
      // Pages
      {
        name: 'User',
        path: 'user',
        component: () => import('@/views/user/Index')
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
