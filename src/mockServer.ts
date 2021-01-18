import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import roleMock from '../mock/system/role';
import userMock from '../mock/system/user';
import groupMock from '../mock/system/group';
import authorityMock from '../mock/system/authority';

export function setupProdMockServer() {
  createProdMockServer([...roleMock, ...userMock, ...groupMock, ...authorityMock]);
}