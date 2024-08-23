import { api } from 'boot/axios'

export const retrieveRoles = (page?: number, size?: number, params?: object) => {
  if (page && size) {
    return api.get('/roles', { params: { page: page - 1, size: size, ...params } })
  }
  return api.get('/roles')
}

export const fetchRole = (id: number) => {
  return api.get(`/roles/${id}`)
}

export const retrieveRolePrivileges = (id: number) => {
  return api.get(`/roles/${id}/privileges`)
}

export const retrieveRoleDepartments = (id: number) => {
  return api.get(`/roles/${id}/organizations`)
}