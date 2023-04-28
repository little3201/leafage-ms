import Mock from 'mockjs'
import { setCookie } from '~/composables/cookies';

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
  setCookie("username", "admin", 3)
}