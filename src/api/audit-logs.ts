import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination } from 'src/types'

/**
 * Retrieve rows
 * @param pagination Pagination and sort parameters
 * @param filters Optional filter
 * @returns Rows data
 */
export const retrieveAuditLogs = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.AUDIT_LOG, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchAuditLog = (id: number) => {
  return api.get(`${SERVER_URL.AUDIT_LOG}/${id}`)
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeAuditLog = (id: number) => {
  return api.delete(`${SERVER_URL.AUDIT_LOG}/${id}`)
}
