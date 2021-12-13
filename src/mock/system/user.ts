import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/user/count',
    method: 'get',
    response: () => {
      return 3
    },
  },
  {
    url: '/api/hypervisor/user/:username',
    method: 'get',
    response: () => {
      return {
        username: 'admin',
        nickname: 'admin',
        avatar: '/images/avatar.jpg',
        gender: 'F',
        phone: "187****7895",
        birthday: '1992-10-12',
        email: 'litt***1@163.com',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsExpired: false,
        description: "返回数据了"
      }
    },
  },
  {
    url: '/api/hypervisor/user/:username',
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
    url: '/api/hypervisor/user/:username/group',
    method: 'post',
    response: () => {
      return ["20A23D2D1", "20A23D201"]
    }
  },
  {
    url: '/api/hypervisor/user/:username/role',
    method: 'post',
    response: () => {
      return ["20A23D2D1", "20C28YH7X"]
    }
  },
  {
    url: '/api/hypervisor/user',
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
    url: '/api/hypervisor/user',
    method: 'get',
    response: () => {
      return [
        {
          username: 'admin',
          nickname: '布吉岛',
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
  {
    url: '/api/hypervisor/user',
    method: 'patch',
    response: () => {
      return {
        msg: "ok"
      }
    },
  },
  {
    url: '/api/hypervisor/user/:username',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];