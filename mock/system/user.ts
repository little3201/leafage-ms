import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'user',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          username: 'admin',
          nickname: 'admin',
          avatar: '',
          gender: 'Male',
          phone: 18713657895,
          email: 'little3201@163.com',
          birthday: new Date(),
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
        },
      ];
    },
  },
] as MockMethod[];