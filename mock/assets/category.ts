
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'category',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          alias: 'Technology',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2S1',
          alias: 'Technology',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];