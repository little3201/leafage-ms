import { api } from 'boot/axios'

export const retrieveUsers = (page: number, size: number, organizationId: number | undefined, params?: object) => {
  return api.get('/users', { params: { page: page - 1, size: size, organizationId: organizationId, ...params } })
}

export const fetchUser = (id: number) => {
  return api.get(`/users/${id}`)
}