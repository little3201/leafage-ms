import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination, Schema, Field } from 'src/models'

/**
 * Retrieve rows
 * @param page Page number
 * @param size Items per page
 * @param filters Optional filter or sort parameters
 * @returns Rows data
 */
export const retrieveSchemas = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.SCHEMA, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

export const retrieveSchemaFields = (id: number) => {
  return api.get(`${SERVER_URL.SCHEMA}/${id}/fields`)
}

export const retrieveSchemaPreview = (id: number) => {
  return api.get(`${SERVER_URL.SCHEMA}/${id}/preview`)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchSchema = (id: number) => {
  return api.get(`${SERVER_URL.SCHEMA}/${id}`)
}

/**
 * Create a new row
 * @param row Row data
 * @returns Created row
 */
export const createSchema = (row: Schema) => {
  return api.post(SERVER_URL.SCHEMA, row)
}

/**
 * Check if a specific row exists by name
 * @param name Row name
 * @param id Row ID
 * @returns Row data
 */
export const checkSchemaExists = (name: string, id?: number) => {
  return api.get(`${SERVER_URL.SCHEMA}/exists`, { params: { name, id } })
}

/**
 * Modify an existing row
 * @param id Row ID
 * @param row Updated row data
 * @returns Modified row
 */
export const modifySchema = (id: number, row: Schema) => {
  return api.put(`${SERVER_URL.SCHEMA}/${id}`, row)
}

/**
 * Sync a existing row
 * @param id Row ID
 * @returns Created row
 */
export const syncSchema = (id: number) => {
  return api.patch(`${SERVER_URL.SCHEMA}/${id}/sync`)
}

/**
 * Generate
 * @param id Row ID
 * @returns Created row
 */
export const generateSchema = (id: number) => {
  return api.get(`${SERVER_URL.SCHEMA}/${id}/download`, { responseType: 'blob' })
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeSchema = (id: number) => {
  return api.delete(`${SERVER_URL.SCHEMA}/${id}`)
}

/**
 * Config rows
 * @param id Row ID
 * @param row  rows data
 * @returns
 */
export const configSchemaFields = (id: number, rows: Array<Field>) => {
  return api.patch(`${SERVER_URL.SCHEMA}/${id}/fields`, rows)
}

/**
 * Export rows
 * @param ids Rows ID
 * @returns
 */
export const exprotSchemas = (ids?: number[]) => {
  const params = ids ? { ids: ids.join(',') } : {}
  return api.get(`${SERVER_URL.SCHEMA}/export`, { params, responseType: 'blob' })
}
