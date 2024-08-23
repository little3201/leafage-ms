import { api } from 'boot/axios'

export const retrieveAccessLogs = (page: number, size: number) => {
  return api.get('/access-logs', { params: { page, size } })
}

export const fetchAccessLog = (id: number) => {
  return api.get(`/access-logs/${id}`)
}
