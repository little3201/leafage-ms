
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'posts',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          title: 'admin',
          subtitle: 'admin',
        },
      ];
    },
  },
] as MockMethod[];