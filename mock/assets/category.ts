
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'category/count',
    method: 'get',
    response: () => {
      return 2
    },
  },
  {
    url: 'category/20A23D2D1',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
  {
    url: 'category/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
  {
    url: 'category',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
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
          alias: 'Lifestyle',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];