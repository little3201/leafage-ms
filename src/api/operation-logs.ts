import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveOperationLogs = (page: number, size: number) => {
  return api.get(SERVER_URL.OPERATION_LOG, { params: { page, size } })
}

export const fetchOperationLog = (id: number) => {
  return api.get(`${SERVER_URL.OPERATION_LOG}/${id}`)
}
