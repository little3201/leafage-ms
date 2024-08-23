import { api } from 'boot/axios'

export const retrieveUsers = (page: number, size: number, params?: object) => {
  return api.get('/users', { params: { page, size, ...params } })
}

export const fetchUser = (id: number) => {
  return api.get(`/users/${id}`)
}
