
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'role',
    method: 'get',
    response: ({ query }) => {
      console.log('id>>>>>>>>', query.id);
      return {
        code: 0,
        message: 'ok',
        data: {
          roleName: 'admin',
          roleValue: 'admin',
        },
      };
    },
  },
] as MockMethod[];