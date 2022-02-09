import Mock from 'mockjs'

let account = { username: "little3201", nickname: "布吉岛", avatar: "https://cdn.leafage.top/logo.svg" }
let menus = [
  { "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": "home" }, "children": [] },
  {
    "code": "21224DRMU", "name": "System", "superior": "", "expand": { "path": "/system", "icon": "layers" }, "children": [
      { "code": "21224UJ5C", "name": "Group", "superior": "21224DRMU", "expand": { "path": "/group", "icon": "users" }, "children": [] },
      {
        "code": "21224PV6C", "name": "Role", "superior": "21224DRMU", "expand": { "path": "/role", "icon": "pocket" }, "children": []
      },
      { "code": "212240439", "name": "Authority", "superior": "21224DRMU", "expand": { "path": "/authority", "icon": "link" }, "children": [] },
      {
        "code": "203315P3Q", "name": "Account", "superior": "21224DRMU", "expand": { "path": "/account", "icon": "user" }, "children": []
      }
    ]
  },
  { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
  { "code": "21224QI72", "name": "Resource", "superior": "", "expand": { "path": "/resource", "icon": "camera" }, "children": [] },
  { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": "tag" }, "children": [] },
  { "code": "21229HMLG", "name": "Region", "superior": "", "expand": { "path": "/region", "icon": "map-pin" }, "children": [] }
]

import signMock from './sign'

import accountMock from './system/account';
import roleMock from './system/role';
import userMock from './system/user';
import groupMock from './system/group';
import authorityMock from './system/authority';
import regionMock from './system/region';
import notificationMock from './system/notification';

import postsMock from './assets/posts';
import categoryMock from './assets/category';
import resourceMock from './assets/resource';
import statisticsMock from './assets/statistics';
import commentMock from './assets/comment';

const mocks = [
  ...signMock,

  ...accountMock,
  ...roleMock,
  ...userMock,
  ...groupMock,
  ...authorityMock,
  ...regionMock,
  ...notificationMock,

  ...postsMock,
  ...categoryMock,
  ...resourceMock,
  ...statisticsMock,
  ...commentMock
];

export function mockXHR() {
  let i: any;
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || 'get', i.response);
  }
  sessionStorage.setItem("account", JSON.stringify(account));
  sessionStorage.setItem("menus", JSON.stringify(menus))
}