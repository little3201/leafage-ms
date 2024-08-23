import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveSchedulerLogs = (page: number, size: number) => {
  return api.get(SERVER_URL.SCHEDULER_LOG, { params: { page, size } })
}

export const fetchSchedulerLog = (id: number) => {
  return api.get(`${SERVER_URL.SCHEDULER_LOG}/${id}`)
}
