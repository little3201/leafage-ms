
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'role/20A23D2D1',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'admin',
        description: 'admin'
      }
    },
  },
  {
    url: 'role',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          name: 'admin',
          description: 'admin',
          modifyTime: new Date()
        },
      ];
    },
  },
] as MockMethod[];