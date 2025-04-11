import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination, FileRecord } from 'src/types'

/**
 * Retrieve rows
 * @param pagination Pagination and sort parameters
 * @param filters Optional filter
 * @returns Rows data
 */
export const retrieveFiles = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.FILE, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Upload
 * @param row Row data
 * @returns Uploaded row
 */
export const uploadFile = (row: FileRecord) => {
  return api.post(`${SERVER_URL.FILE}/upload`, row)
}

/**
 * Download
 * @param id Row ID
 * @returns data stream
 */
export const downloadFile = (id: number) => {
  return api.get(`${SERVER_URL.FILE}/${id}/download`)
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeFile = (id: number) => {
  return api.delete(`${SERVER_URL.FILE}/${id}`)
}
