import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/group/count',
    method: 'get',
    response: () => {
      return 3
    },
  },
  {
    url: '/api/hypervisor/group/tree',
    method: 'get',
    response: () => {
      return [
        { "code": "21529ZEE7", "name": "normal", "superior": null, "expand": null, "children": [] },
        {
          "code": "21169GZC", "name": "vip", "superior": null, "expand": null, "children": [
            {
              "code": "21529WXDL", "name": "gold vip", "superior": "21169GZC", "expand": null, "children": [
                { "code": "21529V1IM", "name": "diamond vip", "superior": "21529WXDL", "expand": null, "children": [] }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    url: '/api/hypervisor/group/:code',
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
    url: '/api/hypervisor/group/:code',
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
    url: '/api/hypervisor/group',
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
    url: '/api/hypervisor/group',
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