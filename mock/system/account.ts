import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/account/:username',
    method: 'get',
    response: () => {
      return {
        code: 612345656,
        type: 'B'
      }
    },
  },
  {
    url: '/api/hypervisor/account/:username',
    method: 'put',
    response: () => {
      return {
        code: 612345656,
        type: 'B'
      }
    },
  },
  {
    url: '/api/hypervisor/account/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];