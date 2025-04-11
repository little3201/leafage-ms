import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination, Privilege } from 'src/types'

/**
 * Retrieve rows
 * @param page Page number
 * @param size Items per page
 * @param params Optional filter or sort parameters
 * @returns Rows data
 */
export const retrievePrivileges = (pagination: Pagination, filters?: object) => {
  return api.get(`${SERVER_URL.PRIVILEGE}`, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Get row subset
 * @param id Row ID
 * @returns Subset data
 */
export const retrievePrivilegeSubset = (id: number) => {
  return api.get(`${SERVER_URL.PRIVILEGE}/${id}/subset`)
}

/**
 * Fetch row tree structure
 * @returns tree data
 */
export const retrievePrivilegeTree = () => {
  return api.get(`${SERVER_URL.PRIVILEGE}/tree`)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchPrivilege = (id: number) => {
  return api.get(`${SERVER_URL.PRIVILEGE}/${id}`)
}

/**
 * Modify an existing row
 * @param id Row ID
 * @param data Updated row data
 * @returns Modified row
 */
export const modifyPrivilege = (id: number, row: Privilege) => {
  return api.put(`${SERVER_URL.PRIVILEGE}/${id}`, row)
}

/**
 * Enable or Disable an existing row
 * @param id Row ID
 * @returns Enable or Disable result
 */
export const enablePrivilege = (id: number) => {
  return api.patch(`${SERVER_URL.PRIVILEGE}/${id}`)
}
