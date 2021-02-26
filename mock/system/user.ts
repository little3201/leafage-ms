import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'user/admin',
    method: 'get',
    response: () => {
      return {
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
      }
    },
  },
  {
    url: 'user/admin',
    method: 'put',
    response: () => {
      return {
        username: 'admin',
        nickname: 'admin',
        avatar: '',
        gender: 'Female',
        phone: 18713657895,
        email: 'little3201@163.com',
        birthday: new Date(),
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
      }
    },
  },
  {
    url: 'user',
    method: 'post',
    response: () => {
      return {
        username: 'admin',
        nickname: 'admin',
        avatar: '',
        gender: 'Famale',
        phone: 18713657895,
        email: 'little3201@163.com',
        birthday: new Date(),
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
      }
    },
  },
  {
    url: 'user',
    method: 'get',
    response: () => {
      return [
        {
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
        {
          username: 'admin2',
          nickname: 'admin2',
          avatar: '',
          gender: 'Female',
          phone: 18713657895,
          email: 'little3201@163.com',
          birthday: new Date(),
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
        },
        {
          username: 'admin3',
          nickname: 'admin3',
          avatar: '',
          gender: '',
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