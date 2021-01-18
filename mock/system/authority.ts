import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'authority',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          name: 'User',
          description: '用户',
          superior: 'System',
          type: 'menu',
          path: '/user',
          modifyTime: new Date()
        },
      ];
    },
  },
] as MockMethod[];