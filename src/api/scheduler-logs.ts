import { api } from 'boot/axios'

export const retrieveSchedulerLogs = (page: number, size: number) => {
  return api.get('/scheduler-logs', { params: { page, size } })
}

export const fetchSchedulerLog = (id: number) => {
  return api.get(`/scheduler-logs/${id}`)
}
