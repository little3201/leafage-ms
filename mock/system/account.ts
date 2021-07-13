import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/account/:username',
    method: 'put',
    response: () => {
      return {
        balance: 123.56
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