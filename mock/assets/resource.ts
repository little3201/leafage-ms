import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/assets/resource/count',
    method: 'get',
    response: () => {
      return 2
    },
  },
  {
    url: '/api/assets/resource/:code',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos',
        type: 'jpg',
        cover: 'https://cdn.leafage.top/kafka.webp',
        category: '20A23D2D1'
      }
    },
  },
  {
    url: '/api/assets/resource/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: '/api/assets/resource',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: '/api/assets/resource',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          title: 'Travel Photos',
          type: 'E',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2D2',
          title: 'Travel Video',
          type: 'P',
          modifyTime: new Date(),
        },
        {
          code: '20A23D2D2',
          title: 'Travel Video',
          type: 'T',
          modifyTime: new Date(),
        }
      ];
    },
  },
  {
    url: '/api/assets/resource/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];