import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'
import type { Pagination, Role } from 'src/models'

/**
 * Retrieve rows
 * @param pagination Pagination
 * @param filters Optional filter or sort parameters
 * @returns Rows data
 */
export const retrieveRoles = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.ROLE, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Retrieve members for a specific role
 * @returns tree data
 */
export const retrieveRoleMembers = (id: number) => {
  return api.get(`${SERVER_URL.ROLE}/${id}/members`)
}

/**
 * Retrieve privileges for a specific role
 * @param id Role ID
 * @returns Role privileges
 */
export const retrieveRolePrivileges = (id: number) => {
  return api.get(`${SERVER_URL.ROLE}/${id}/privileges`)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchRole = (id: number) => {
  return api.get(`${SERVER_URL.ROLE}/${id}`)
}

/**
 * Create a new row
 * @param row Row data
 * @returns Created row
 */
export const createRole = (row: Role) => {
  return api.post(SERVER_URL.ROLE, row)
}

/**
 * Modify an existing row
 * @param id Row ID
 * @param data Updated row data
 * @returns Modified row
 */
export const modifyRole = (id: number, row: Role) => {
  return api.put(`${SERVER_URL.ROLE}/${id}`, row)
}

/**
 * Enable or Disable an existing row
 * @param id Row ID
 * @returns Enable or Disable result
 */
export const enableRole = (id: number) => {
  return api.patch(`${SERVER_URL.ROLE}/${id}`)
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeRole = (id: number) => {
  return api.delete(`${SERVER_URL.ROLE}/${id}`)
}
