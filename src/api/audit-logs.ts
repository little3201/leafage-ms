import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveAuditLogs = (page: number, size: number) => {
  return api.get(SERVER_URL.AUDIT_LOG, { params: { page, size } })
}

export const fetchAuditLog = (id: number) => {
  return api.get(`${SERVER_URL.AUDIT_LOG}/${id}`)
}
