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
  { "id": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": HomeIcon }, "children": [] },
  {
    "id": "21224DRMU", "name": "System", "superior": "", "expand": { "path": "/system", "icon": Square3Stack3DIcon }, "children": [
      { "id": "21224UJ5C", "name": "Groups", "superior": "21224DRMU", "expand": { "path": "/groups", "icon": UsersIcon }, "children": [] },
      {
        "id": "21224PV6C", "name": "Roles", "superior": "21224DRMU", "expand": { "path": "/roles", "icon": LinkIcon }, "children": []
      },
      { "id": "212240439", "name": "Components", "superior": "21224DRMU", "expand": { "path": "/components", "icon": ShieldCheckIcon }, "children": [] },
      {
        "id": "203315P3Q", "name": "Users", "superior": "21224DRMU", "expand": { "path": "/users", "icon": UsersIcon }, "children": []
      },
      { "id": "21224PV1C", "name": "Dictionaries", "superior": "21224DRMU", "expand": { "path": "/dictionaries", "icon": BookOpenIcon }, "children": [] }
    ]
  },
  { "id": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": ClipboardIcon }, "children": [] },
  { "id": "21224HMLG", "name": "Categories", "superior": "", "expand": { "path": "/categories", "icon": TagIcon }, "children": [] },
  { "id": "21229HMLG", "name": "Regions", "superior": "", "expand": { "path": "/regions", "icon": MapPinIcon }, "children": [] }
]

import signMock from './sign'

import roleMock from './system/roles';
import userMock from './system/users';
import groupMock from './system/groups';
import authorityMock from './system/components';
import notificationMock from './system/messages';
import dictionaryMock from './system/dictionaries';
import accesslogMock from './system/accesslogs';

import postsMock from './assets/posts';
import categoryMock from './assets/categories';
import statisticsMock from './assets/statistics';
import commentMock from './assets/comments';
import regionMock from './assets/regions';

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