import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveRoles = (page?: number, size?: number, params?: object) => {
  if (page && size) {
    return api.get(SERVER_URL.ROLE, { params: { page, size, ...params } })
  }
  return api.get(SERVER_URL.ROLE)
}

export const fetchRole = (id: number) => {
  return api.get(`${SERVER_URL.ROLE}/${id}`)
}

export const retrieveRolePrivileges = (id: number) => {
  return api.get(`${SERVER_URL.ROLE}/${id}/privileges`)
}
