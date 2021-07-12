import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/assets/portfolio/count',
    method: 'get',
    response: () => {
      return 2
    },
  },
  {
    url: '/api/assets/portfolio/:code',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos',
        type: 'jpg',
        tags: ['travel', 'xian'],
        category: '20A23D2D1'
      }
    },
  },
  {
    url: '/api/assets/portfolio/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: '/api/assets/portfolio',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: '/api/assets/portfolio',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          title: 'Travel Photos',
          type: 'jpg',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2D1',
          title: 'Travel Video',
          type: 'mp4',
          modifyTime: new Date(),
        },
      ];
    },
  },
] as MockMethod[];