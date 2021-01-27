
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'posts',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          title: '一步步实现分布式架构',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2C1',
          title: '一步步实现分布式架构',
          modifyTime: new Date(),
        },
        {
          code: '20A21D2D1',
          title: '一步步实现分布式架构',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];