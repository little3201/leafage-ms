import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/region/count',
    method: 'get',
    response: () => {
      return 3
    },
  },
  {
    url: '/api/hypervisor/region/:code',
    method: 'get',
    response: () => {
      return {
        code: '61',
        name: '陕西省',
        superior: ''
      }
    },
  },
  {
    url: '/api/hypervisor/region/:code',
    method: 'put',
    response: () => {
      return {
        code: '6101',
        name: '西安市',
        superior: '陕西省'
      }
    },
  },
  {
    url: '/api/hypervisor/region',
    method: 'post',
    response: () => {
      return {
        code: '6101',
        name: '西安市',
        superior: '陕西省'
      }
    },
  },
  {
    url: '/api/hypervisor/region',
    method: 'get',
    response: () => {
      return [
        {
          code: '6101',
          name: '西安市',
          superior: '陕西省',
          modifyTime: new Date()
        },
        {
          code: '6102',
          name: '咸阳市',
          superior: '陕西省',
          modifyTime: new Date()
        },
        {
          code: '6103',
          name: '汉中市',
          superior: '陕西省',
          modifyTime: new Date()
        },
      ];
    },
  },
  {
    url: '/api/hypervisor/region/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];