import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'user/count',
    method: 'get',
    response: () => {
      return 5
    },
  },
  {
    url: 'user/admin',
    method: 'get',
    response: () => {
      return {
        username: 'admin',
        nickname: 'admin',
        avatar: '',
        gender: 'M',
        phone: "187****7895",
        email: 'lit***@163.com',
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
        gender: 'F',
        phone: "187****7895",
        email: 'litt***1@163.com',
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
        gender: 'F',
        phone: "187****7895",
        email: 'litt**@163.com',
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
          gender: 'M',
          phone: "187****7895",
          email: 'lit***@163.com',
          birthday: new Date(),
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
        },
        {
          username: 'kitty',
          nickname: 'lily',
          avatar: '',
          gender: 'F',
          phone: "187****7895",
          email: 'lit****@163.com',
          birthday: new Date(),
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
        },
        {
          username: 'john',
          nickname: 'john',
          avatar: '',
          gender: null,
          phone: "187****7895",
          email: 'li****1@163.com',
          birthday: new Date(),
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
        },
      ];
    },
  },
] as MockMethod[];