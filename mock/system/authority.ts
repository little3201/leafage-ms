import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'authority/count',
    method: 'get',
    response: () => {
      return 12
    },
  },
  {
    url: 'authority/203315P3Q',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'User',
        description: '用户',
        superior: '21224DRMU',
        type: 'Url',
        path: '/user'
      }
    },
  },
  {
    url: 'authority/20A23D2D1',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'User',
        description: '用户',
        superior: 'System',
        type: 'Menu',
        path: '/user'
      }
    },
  },
  {
    url: 'authority',
    method: 'post',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'User',
        description: '用户',
        superior: 'System',
        type: 'Menu',
        path: '/user'
      }
    },
  },
  {
    url: 'authority',
    method: 'get',
    response: () => {
      return [
        { "code": "203315P3Q", "modifyTime": "2021-02-24T11:37:01.709", "superior": "System", "name": "User", "type": "Menu", "path": "/user", "description": "用户", "count": 0 },
        { "code": "21224DRMU", "modifyTime": "2021-02-24T11:25:27.466", "superior": "System", "name": "System", "type": "Menu", "path": "/system", "description": "系统管理", "count": 0 },
        { "code": "2122466RP", "modifyTime": "2021-02-24T11:25:16.733", "superior": null, "name": "Dashboard", "type": "Menu", "path": "/", "description": "控制台", "count": 0 },
        { "code": "21224B8JZ", "modifyTime": "2021-02-24T11:26:02.337", "superior": null, "name": "Posts", "type": "Menu", "path": "/posts", "description": "帖子管理", "count": 0 },
        { "code": "21224QI72", "modifyTime": "2021-02-24T11:26:29.317", "superior": null, "name": "Portfolio", "type": "Menu", "path": "/portfolio", "description": "作品管理", "count": 0 },
        { "code": "21224HMLG", "modifyTime": "2021-02-24T11:27:07.397", "superior": null, "name": "Category", "type": "Menu", "path": "/category", "description": "类目管理", "count": 0 },
        { "code": "21224UJ5C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "System", "name": "Group", "type": "Menu", "path": "/group", "description": "组", "count": 0 },
        { "code": "21224PV6C", "modifyTime": "2021-02-25T13:56:34.668", "superior": "System", "name": "Role", "type": "Menu", "path": "/role", "description": "角色", "count": 0 },
        { "code": "212240439", "modifyTime": "2021-02-24T11:28:41.202", "superior": "System", "name": "Authority", "type": "Menu", "path": "/authority", "description": "权限", "count": 0 },
        { "code": "21224UJ6C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "User", "name": "Add", "type": "Url", "path": "/", "description": "新增", "count": 0 }
      ];
    },
  },
] as MockMethod[];