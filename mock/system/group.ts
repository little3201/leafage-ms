import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'group/count',
    method: 'get',
    response: () => {
      return 5
    },
  },
  {
    url: 'group/20A23D2D1',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'Technology',
        description: '技术部',
        superior: '集团',
        principal: 'admin'
      }
    },
  },
  {
    url: 'group/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'Technology',
        description: '技术部',
        superior: '集团',
        principal: 'admin'
      }
    },
  },
  {
    url: 'group',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'Technology',
        description: '技术部',
        superior: '集团',
        principal: 'admin'
      }
    },
  },
  {
    url: 'group',
    method: 'get',
    response: () => {
      return [
        {
          code: '20A23D2D1',
          name: 'Technology',
          description: '技术部',
          superior: '集团',
          principal: 'admin',
          modifyTime: new Date()
        },
      ];
    },
  },
] as MockMethod[];