import Mock from 'mockjs'
import { BookOpenIcon, ClipboardIcon, HomeIcon, LinkIcon, MapPinIcon, ShieldCheckIcon, Square3Stack3DIcon, TagIcon, UsersIcon } from '@heroicons/vue/24/outline'

const user = {
  username: "little3201", 
  nickname: "布吉岛", 
  avatar: "https://cdn.leafage.top/logo.svg", 
  enabled: true, 
  accountExpiresAt: '',
  accountLocked: false,
  credentialsExpiresAt: ''
}
const menus = [
  { "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": HomeIcon }, "children": [] },
  {
    "code": "21224DRMU", "name": "System", "superior": "", "expand": { "path": "/system", "icon": Square3Stack3DIcon }, "children": [
      { "code": "21224UJ5C", "name": "Group", "superior": "21224DRMU", "expand": { "path": "/group", "icon": UsersIcon }, "children": [] },
      {
        "code": "21224PV6C", "name": "Role", "superior": "21224DRMU", "expand": { "path": "/role", "icon": LinkIcon }, "children": []
      },
      { "code": "212240439", "name": "Component", "superior": "21224DRMU", "expand": { "path": "/component", "icon": ShieldCheckIcon }, "children": [] },
      {
        "code": "203315P3Q", "name": "User", "superior": "21224DRMU", "expand": { "path": "/user", "icon": UsersIcon }, "children": []
      },
      { "code": "21224PV1C", "name": "Dictionary", "superior": "21224DRMU", "expand": { "path": "/dictionary", "icon": BookOpenIcon }, "children": [] }
    ]
  },
  { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": ClipboardIcon }, "children": [] },
  { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": TagIcon }, "children": [] },
  { "code": "21229HMLG", "name": "Region", "superior": "", "expand": { "path": "/region", "icon": MapPinIcon }, "children": [] }
]

import signMock from './sign'

import roleMock from './system/role';
import userMock from './system/user';
import groupMock from './system/group';
import authorityMock from './system/component';
import notificationMock from './system/notification';
import dictionaryMock from './system/dictionary';
import accesslogMock from './system/accesslog';

import postsMock from './assets/posts';
import categoryMock from './assets/category';
import resourceMock from './assets/resource';
import statisticsMock from './assets/statistics';
import commentMock from './assets/comment';
import regionMock from './assets/region';

const mocks = [
  ...signMock,
  ...roleMock,
  ...userMock,
  ...groupMock,
  ...authorityMock,
  ...notificationMock,
  ...dictionaryMock,
  ...accesslogMock,

  ...postsMock,
  ...categoryMock,
  ...resourceMock,
  ...statisticsMock,
  ...commentMock,
  ...regionMock,
];

export function mockXHR() {
  let i: any;
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || 'get', i.response);
  }
  sessionStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("menus", JSON.stringify(menus))
}