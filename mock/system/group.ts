import { MockMethod } from 'vite-plugin-mock';
export default [
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