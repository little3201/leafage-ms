import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import global from '../../mock/global'

import roleMock from '../../mock/system/role';
import userMock from '../../mock/system/user';
import groupMock from '../../mock/system/group';
import authorityMock from '../../mock/system/authority';

import postsMock from '../../mock/assets/posts';
import categoryMock from '../../mock/assets/category';
import portofioMock from '../../mock/assets/portfolio';

export function setupProdMockServer() {
  createProdMockServer([
    ...global,
    ...roleMock, 
    ...userMock, 
    ...groupMock, 
    ...authorityMock,
    ...postsMock, 
    ...categoryMock, 
    ...portofioMock
  ]);
}