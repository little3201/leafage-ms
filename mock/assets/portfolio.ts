
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'portfolio/count',
    method: 'get',
    response: () => {
      return 3
    },
  },
  {
    url: 'portfolio/20A23D2D1',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos',
        category: '20A23D2D1'
      }
    },
  },
  {
    url: 'portfolio/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: 'portfolio',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        title: 'Travel Photos'
      }
    },
  },
  {
    url: 'portfolio',
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