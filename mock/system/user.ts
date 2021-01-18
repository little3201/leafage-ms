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
          gender: 'Male'
        },
      ];
    },
  },
] as MockMethod[];