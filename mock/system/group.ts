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
        name: 'Tech Dept',
        description: '技术部',
        superior: '20A23D201',
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
        name: 'Tech Dept',
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
        name: 'Tech Dept',
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
          code: '20A23D201',
          name: '集团',
          description: '技术部',
          superior: '',
          principal: 'admin',
          count: 2,
          modifyTime: new Date()
        },
        {
          code: '20A23D2D1',
          name: 'Tech Dept',
          description: '技术部',
          superior: '集团',
          principal: 'admin',
          count: 2,
          modifyTime: new Date()
        },
        {
          code: '20A23D2X1',
          name: 'Other Dept',
          description: '架构部',
          superior: '技术部',
          principal: 'superior',
          count: 4,
          modifyTime: new Date()
        },
      ];
    },
  },
] as MockMethod[];