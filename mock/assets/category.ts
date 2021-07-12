import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/assets/category/count',
    method: 'get',
    response: () => {
      return 5
    },
  },
  {
    url: '/api/assets/category/:code',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
  {
    url: '/api/assets/category/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
  {
    url: '/api/assets/category',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        alias: 'Technology'
      }
    },
  },
  {
    url: '/api/assets/category',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          alias: 'Technology',
          count: 14,
          modifyTime: new Date(),
        },
        {
          code: '20A23D2S1',
          alias: 'Lifestyle',
          count: 1,
          modifyTime: new Date(),
        },
        {
          code: '20A23D2Q1',
          alias: 'Expirence',
          count: 4,
          modifyTime: new Date(),
        },
        {
          code: '20A23D2A1',
          alias: 'Photograph',
          count: 10,
          modifyTime: new Date(),
        },
        {
          code: '20A23D2V1',
          alias: 'Others',
          count: 1,
          modifyTime: new Date(),
        },
      ];
    },
  },
  {
    url: '/api/assets/category/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];