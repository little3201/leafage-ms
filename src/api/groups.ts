import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination, Group } from 'src/types'

/**
 * Retrieve rows
 * @param pagination Pagination and sort parameters
 * @param filters Optional filter
 * @returns Rows data
 */
export const retrieveGroups = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.GROUP, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Fetch row tree structure
 * @returns tree data
 */
export const retrieveGroupTree = () => {
  return api.get(`${SERVER_URL.GROUP}/tree`)
}

/**
 * Retrieve members for a specific group
 * @returns tree data
 */
export const retrieveGroupMembers = (id: number) => {
  return api.get(`${SERVER_URL.GROUP}/${id}/members`)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchGroup = (id: number) => {
  return api.get(`${SERVER_URL.GROUP}/${id}`)
}

/**
 * Create a new row
 * @param row Row data
 * @returns Created row
 */
export const createGroup = (row: Group) => {
  return api.post(SERVER_URL.GROUP, row)
}

/**
 * Modify an existing row
 * @param id Row ID
 * @param data Updated row data
 * @returns Modified row
 */
export const modifyGroup = (id: number, row: Group) => {
  return api.put(`${SERVER_URL.GROUP}/${id}`, row)
}

/**
 * Enable or Disable an existing row
 * @param id Row ID
 * @returns Enable or Disable result
 */
export const enableGroup = (id: number) => {
  return api.patch(`${SERVER_URL.GROUP}/${id}`)
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeGroup = (id: number) => {
  return api.delete(`${SERVER_URL.GROUP}/${id}`)
}

/**
 * Relation members for a row
 * @param id Row ID
 * @param usernames usernames
 * @returns Related status
 */
export const relationGroupMembers = (id: number, usernames: string[]) => {
  return api.patch(`${SERVER_URL.GROUP}/${id}/members`, usernames)
}

/**
 * Remove members for a row
 * @param id Row ID
 * @param usernames usernames
 * @returns Deletion status
 */
export const removeGroupMembers = (id: number, usernames: number[]) => {
  const params = usernames ? { privilegeIds: usernames.join(',') } : {}
  return api.delete(`${SERVER_URL.GROUP}/${id}/members`, { params })
}

/**
 * Relation privileges for a row
 * @param id Row ID
 * @param privilegeIds privilege ids
 * @returns Related status
 */
export const relationGroupPrivileges = (id: number, privilegeIds: number[]) => {
  return api.patch(`${SERVER_URL.GROUP}/${id}/privileges`, privilegeIds)
}

/**
 * Remove privileges for a row
 * @param id Row ID
 * @param privilegeIds privilege ids
 * @returns Deletion status
 */
export const removeGroupPrivileges = (id: number, privilegeIds: number[]) => {
  const params = privilegeIds ? { privilegeIds: privilegeIds.join(',') } : {}
  return api.delete(`${SERVER_URL.GROUP}/${id}/privileges`, { params })
}