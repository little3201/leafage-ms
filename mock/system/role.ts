
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'role/count',
    method: 'get',
    response: () => {
      return 4
    },
  },
  {
    url: 'role/20A23D2D1',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'admin',
        description: 'admin'
      }
    },
  },
  {
    url: 'role/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'admin',
        description: 'admin'
      }
    },
  },
  {
    url: 'role',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'admin',
        description: 'admin'
      }
    },
  },
  {
    url: 'role',
    method: 'get',
    response: () => {
      return [{ "code": "20C287LBJ", "modifyTime": "2020-12-28T16:03:55.134", "name": "relation", "description": "合作伙伴", "count": 1 }, { "code": "20C28YH7X", "modifyTime": "2020-12-30T19:21:19.926", "name": "supplier", "description": "供应商", "count": 0 }, { "code": "20C11MJEB", "modifyTime": "2020-12-18T13:59:51.429", "name": "supper", "description": "超级管理员", "count": 1 }, { "code": "20C281HG2", "modifyTime": "2020-12-28T16:03:16.493", "name": "guest", "description": "访客", "count": 0 }];
    },
  },
] as MockMethod[];