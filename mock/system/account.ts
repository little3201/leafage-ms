import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'account/:username',
    method: 'put',
    response: () => {
      return {
        balance: 123.56
      }
    },
  }
] as MockMethod[];