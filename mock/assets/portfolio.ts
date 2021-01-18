
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'portfolio',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          title: 'Travel Photos',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];