import { api } from 'boot/axios'

export const retrievePrivileges = (page: number, size: number, params?: object) => {
  return api.get('/privileges', { params: { page: page - 1, size, ...params } })
}

export const retrievePrivilegeSubset = (id: number) => {
  return api.get(`/privileges/${id}/subset`)
}

export const retrievePrivilegeTree = (username: string) => {
  return api.get(`/privileges/${username}/tree`)
}

export const fetchPrivilege = (id: number) => {
  return api.get(`/privileges/${id}`)
}
