import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

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

export function setupProdMockServer() {
  createProdMockServer([
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
  ]);
}