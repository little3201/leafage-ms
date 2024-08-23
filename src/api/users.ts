import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveUsers = (page: number, size: number, params?: object) => {
  return api.get(SERVER_URL.USER, { params: { page, size, ...params } })
}

export const fetchUser = (id: number) => {
  return api.get(`${SERVER_URL.USER}/${id}`)
}
