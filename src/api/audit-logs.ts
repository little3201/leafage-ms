import { api } from 'boot/axios'

export const retrieveAuditLogs = (page: number, size: number) => {
  return api.get('/audit-logs', { params: { page: page - 1, size: size } })
}

export const fetchAuditLog = (id: number) => {
  return api.get(`/audit-logs/${id}`)
}