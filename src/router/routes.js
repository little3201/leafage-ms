export default [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard')
      },
      // Pages
      {
        name: 'User Profile',
        path: 'user',
        component: () => import('@/views/user/Index')
      }
    ]
  }
]
