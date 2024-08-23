import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrievePrivileges = (page: number, size: number, params?: object) => {
  return api.get(SERVER_URL.PRIVILEGE, { params: { page, size, ...params } })
}

export const retrievePrivilegeSubset = (id: number) => {
  return api.get(`${SERVER_URL.PRIVILEGE}/${id}/subset`)
}

export const retrievePrivilegeTree = (username: string) => {
  return api.get(`${SERVER_URL.PRIVILEGE}/${username}/tree`)
}

export const fetchPrivilege = (id: number) => {
  return api.get(`${SERVER_URL.PRIVILEGE}/${id}`)
}
