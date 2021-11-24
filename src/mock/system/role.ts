
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/hypervisor/role/count',
    method: 'get',
    response: () => {
      return 4
    },
  },
  {
    url: '/api/hypervisor/role/tree',
    method: 'get',
    response: () => {
      return [
        { "code": "20C11MJEB", "name": "Supper", "superior": null, "expand": null, "children": [] },
        { "code": "20C281HG2", "name": "Guest", "superior": null, "expand": null, "children": [] },
        {
          "code": "20C287LBJ", "name": "Relation", "superior": null, "expand": null, "children":
            [{ "code": "20C28YH7X", "name": "Supplier", "superior": "20C287LBJ", "expand": null, "children": [] }
            ]
        }
      ]
    }
  },
  {
    url: '/api/hypervisor/role/:code',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'admin',
        superior: "20C11MJEB",
        description: 'admin'
      }
    },
  },
  {
    url: '/api/hypervisor/role/:code',
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
    url: '/api/hypervisor/role',
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
    url: '/api/hypervisor/role',
    method: 'get',
    response: () => {
      return [
        { "code": "20A23D2D1", "superior": "supper", "modifyTime": "2020-12-28T16:03:55.134", "name": "relation", "description": "合作伙伴", "count": 1 },
        { "code": "20C28YH7X", "superior": "relation", "modifyTime": "2020-12-30T19:21:19.926", "name": "supplier", "description": "供应商", "count": 0 },
        { "code": "20C11MJEB", "superior": null, "modifyTime": "2020-12-18T13:59:51.429", "name": "supper", "description": "超级管理员", "count": 1 },
        { "code": "20C281HG2", "superior": null, "modifyTime": "2020-12-28T16:03:16.493", "name": "guest", "description": "访客", "count": 0 }];
    },
  },
  {
    url: '/api/hypervisor/role/:code/authority',
    method: 'get',
    response: () => {
      return [
        { "code": "2122466RP", "name": "Dashboard", "superior": "2122466RP", "expand": { "path": "/", "icon": "home" }, "children": [] },
        {
          "code": "21224DRMU", "name": "System", "superior": "21224DRMU", "expand": { "path": "/system", "icon": "layers" }, "children": [
            { "code": "21224UJ5C", "name": "Group", "superior": "21224DRMU", "expand": { "path": "/group", "icon": "users" }, "children": [] },
            {
              "code": "21224PV6C", "name": "Role", "superior": "21224DRMU", "expand": { "path": "/role", "icon": "pocket" }, "children": []
            },
            { "code": "212240439", "name": "Authority", "superior": "21224DRMU", "expand": { "path": "/authority", "icon": "power" }, "children": [] },
            {
              "code": "203315P3Q", "name": "User", "superior": "21224DRMU", "expand": { "path": "/user", "icon": "user" }, "children": []
            }
          ]
        },
        { "code": "21224B8JZ", "name": "Posts", "superior": "21224B8JZ", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
        { "code": "21224QI72", "name": "Resource", "superior": "21224QI72", "expand": { "path": "/resource", "icon": "camera" }, "children": [] },
        { "code": "21224HMLG", "name": "Category", "superior": "21224HMLG", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
      ];
    },
  },
  {
    url: '/api/hypervisor/role/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
] as MockMethod[];