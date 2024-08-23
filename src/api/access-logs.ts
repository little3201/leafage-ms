import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveAccessLogs = (page: number, size: number) => {
  return api.get(SERVER_URL.ACCESS_LOG, { params: { page, size } })
}

export const fetchAccessLog = (id: number) => {
  return api.get(`${SERVER_URL.ACCESS_LOG}/${id}`)
}
