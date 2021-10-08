import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import global from '../../mock/global'

import accountMock from '../../mock/system/account';
import roleMock from '../../mock/system/role';
import userMock from '../../mock/system/user';
import groupMock from '../../mock/system/group';
import authorityMock from '../../mock/system/authority';

import postsMock from '../../mock/assets/posts';
import categoryMock from '../../mock/assets/category';
import resourceMock from '../../mock/assets/resource';
import statisticsMock from '../../mock/assets/statistics';
import commentMock from '../../mock/assets/comment';

export function setupProdMockServer() {
  createProdMockServer([
    ...global,
    ...accountMock,
    ...roleMock, 
    ...userMock, 
    ...groupMock, 
    ...authorityMock,
    ...postsMock, 
    ...categoryMock, 
    ...resourceMock,
    ...statisticsMock,
    ...commentMock
  ]);
}