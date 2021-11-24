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
        type: 'E',
        cover: 'https://cdn.leafage.top/kafka.webp',
        category: '20A23D2D1',
        description: ' Spring boot is a java platform ...'
      }
    },
  },
  {
    url: '/api/assets/resource/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos',
        type: 'E',
        cover: 'https://cdn.leafage.top/kafka.webp',
        category: '20A23D2D1'
      }
    },
  },
  {
    url: '/api/assets/resource',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos',
        type: 'E',
        cover: 'https://cdn.leafage.top/kafka.webp',
        category: '20A23D2D1'
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
          title: 'Spring boot',
          type: 'E',
          category: 'Technology',
          modifyTime: new Date(),
          viewed: 902,
          downloads: 12,
          cover: 'https://cdn.leafage.top/kafka.webp',
          description: ' Spring boot'
        },
        {
          code: '20A23D2D2',
          title: 'Spring cloud',
          type: 'P',
          category: 'Technology',
          modifyTime: new Date(),
          viewed: 902,
          downloads: 12,
          cover: 'https://cdn.leafage.top/kafka.webp',
          description: ' Spring boot'
        },
        {
          code: '20A23D2D3',
          title: 'Spring security',
          type: 'T',
          category: 'Technology',
          modifyTime: new Date(),
          viewed: 902,
          downloads: 12,
          cover: 'https://cdn.leafage.top/kafka.webp',
          description: ' Spring boot'
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