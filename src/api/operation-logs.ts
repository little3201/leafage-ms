import { api } from 'boot/axios'

export const retrieveOperationLogs = (page: number, size: number) => {
  return api.get('/operations-logs', { params: { page, size } })
}

export const fetchOperationLog = (id: number) => {
  return api.get(`/operations-logs/${id}`)
}
