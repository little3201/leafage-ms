
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'role',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          name: 'admin',
          description: 'admin',
        },
      ];
    },
  },
] as MockMethod[];