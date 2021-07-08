import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: 'authority/count',
    method: 'get',
    response: () => {
      return 11
    },
  },
  {
    url: 'authority/:code',
    method: 'get',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'User',
        description: '用户',
        superior: '21224DRMU',
        type: 'R',
        path: '/user'
      }
    },
  },
  {
    url: 'authority/:code',
    method: 'put',
    response: () => {
      return {
        code: '20A23D2D1',
        name: 'User',
        description: '用户',
        superior: 'System',
        type: 'M',
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
        type: 'M',
        path: '/user'
      }
    },
  },
  {
    url: 'authority/tree',
    method: 'get',
    response: () => {
      return [
        { "code": "2122466RP", "name": "Dashboard", "superior": "2122466RP", "expand": { "path": "/", "icon": "home" }, "children": [] },
        {
          "code": "21224DRMU", "name": "System", "superior": "21224DRMU", "expand": { "path": "/system", "icon": "layers" }, "children": [
            { "code": "21224UJ5C", "name": "Group", "superior": "21224DRMU", "expand": { "path": "/group", "icon": "users" }, "children": [] },
            { "code": "21224PV6C", "name": "Role", "superior": "21224DRMU", "expand": { "path": "/role", "icon": "pocket" }, "children": [] },
            { "code": "212240439", "name": "Authority", "superior": "21224DRMU", "expand": { "path": "/authority", "icon": "power" }, "children": [] },
            {
              "code": "203315P3Q", "name": "User", "superior": "21224DRMU", "expand": { "path": "/user", "icon": "user" }, "children": []
            }]
        },
        { "code": "21224B8JZ", "name": "Posts", "superior": "21224B8JZ", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
        { "code": "21224QI72", "name": "Portfolio", "superior": "21224QI72", "expand": { "path": "/portfolio", "icon": "camera" }, "children": [] },
        { "code": "21224HMLG", "name": "Category", "superior": "21224HMLG", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
      ];
    },
  },
  {
    url: 'authority?type=M',
    method: 'get',
    response: () => {
      return [
        { "code": "203315P3Q", "modifyTime": "2021-02-24T11:37:01.709", "superior": "System", "name": "User", "type": "M", "path": "/user", "description": "用户", "count": 0 },
        { "code": "21224DRMU", "modifyTime": "2021-02-24T11:25:27.466", "superior": "System", "name": "System", "type": "M", "path": "/system", "description": "系统管理", "count": 0 },
        { "code": "2122466RP", "modifyTime": "2021-02-24T11:25:16.733", "superior": null, "name": "Dashboard", "type": "M", "path": "/", "description": "控制台", "count": 0 },
        { "code": "21224B8JZ", "modifyTime": "2021-02-24T11:26:02.337", "superior": null, "name": "Posts", "type": "M", "path": "/posts", "description": "帖子管理", "count": 0 },
        { "code": "21224QI72", "modifyTime": "2021-02-24T11:26:29.317", "superior": null, "name": "Portfolio", "type": "M", "path": "/portfolio", "description": "作品管理", "count": 0 },
        { "code": "21224HMLG", "modifyTime": "2021-02-24T11:27:07.397", "superior": null, "name": "Category", "type": "M", "path": "/category", "description": "类目管理", "count": 0 },
        { "code": "21224UJ5C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "System", "name": "Group", "type": "M", "path": "/group", "description": "组", "count": 0 },
        { "code": "21224PV6C", "modifyTime": "2021-02-25T13:56:34.668", "superior": "System", "name": "Role", "type": "M", "path": "/role", "description": "角色", "count": 0 },
        { "code": "212240439", "modifyTime": "2021-02-24T11:28:41.202", "superior": "System", "name": "Authority", "type": "M", "path": "/authority", "description": "权限", "count": 0 },
      ];
    },
  },
  {
    url: 'authority',
    method: 'get',
    response: () => {
      return [
        { "code": "203315P3Q", "modifyTime": "2021-02-24T11:37:01.709", "superior": "System", "name": "User", "type": "M", "icon": "user", "path": "/user", "description": "用户", "count": 0 },
        { "code": "21224DRMU", "modifyTime": "2021-02-24T11:25:27.466", "superior": "System", "name": "System", "type": "M", "icon": "layers", "path": "/system", "description": "系统管理", "count": 0 },
        { "code": "2122466RP", "modifyTime": "2021-02-24T11:25:16.733", "superior": null, "name": "Dashboard", "type": "M", "icon": "home", "path": "/", "description": "控制台", "count": 0 },
        { "code": "21224B8JZ", "modifyTime": "2021-02-24T11:26:02.337", "superior": null, "name": "Posts", "type": "M", "icon": "book", "path": "/posts", "description": "帖子管理", "count": 0 },
        { "code": "21224QI72", "modifyTime": "2021-02-24T11:26:29.317", "superior": null, "name": "Portfolio", "type": "M", "icon": "camera", "path": "/portfolio", "description": "作品管理", "count": 0 },
        { "code": "21224HMLG", "modifyTime": "2021-02-24T11:27:07.397", "superior": null, "name": "Category", "type": "M", "icon": "tag", "path": "/category", "description": "类目管理", "count": 0 },
        { "code": "21224UJ5C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "System", "name": "Group", "type": "M", "icon": "users", "path": "/group", "description": "组", "count": 0 },
        { "code": "21224PV6C", "modifyTime": "2021-02-25T13:56:34.668", "superior": "System", "name": "Role", "type": "M", "icon": "pocket", "path": "/role", "description": "角色", "count": 0 },
        { "code": "212240439", "modifyTime": "2021-02-24T11:28:41.202", "superior": "System", "name": "Authority", "type": "M", "icon": "power", "path": "/authority", "description": "权限", "count": 0 },
        { "code": "21224UJ6C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "User", "name": "Add", "type": "B", "icon": "plus-circle", "path": "/", "description": "用户-新增", "count": 0 },
        { "code": "21224UJ6C", "modifyTime": "2021-02-25T13:56:13.127", "superior": "User", "name": "Ecit", "type": "B", "icon": "edit", "path": "/", "description": "用户-编辑", "count": 0 }
      ];
    },
  },
] as MockMethod[];