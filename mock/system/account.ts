import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisoraccount/:username',
    method: 'put',
    response: () => {
      return {
        balance: 123.56
      }
    },
  }
] as MockMethod[];