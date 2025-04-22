import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'
import type { Pagination, Dictionary } from 'src/types'

/**
 * Retrieve rows
 * @param pagination Pagination and sort parameters
 * @param filters Optional filter or sort parameters
 * @returns Rows data
 */
export const retrieveDictionaries = (pagination: Pagination, filters?: object) => {
  return api.get(SERVER_URL.DICTIONARY, { params: { ...pagination, page: pagination.page - 1, ...filters } })
}

/**
 * Get row subset
 * @param id Row ID
 * @returns Subset data
 */
export const retrieveDictionarySubset = (id: number) => {
  return api.get(`${SERVER_URL.DICTIONARY}/${id}/subset`)
}

/**
 * Fetch row tree structure
 * @returns tree data
 */
export const retrieveDictionaryTree = () => {
  return api.get(`${SERVER_URL.DICTIONARY}/tree`)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchDictionary = (id: number) => {
  return api.get(`${SERVER_URL.DICTIONARY}/${id}`)
}

/**
 * Check if a specific row exists by name
 * @param superiorId Row ID
 * @param name Row name
 * @returns Row data
 */
export const checkDictionaryExists = (superiorId: number, name: string, id?: number) => {
  return api.get(`${SERVER_URL.DICTIONARY}/${superiorId}/exists`, { params: { name, id } })
}

/**
 * Create a new row
 * @param row Row data
 * @returns Created row
 */
export const createDictionary = (row: Dictionary) => {
  return api.post(SERVER_URL.DICTIONARY, row)
}

/**
 * Modify an existing row
 * @param id Row ID
 * @param row Updated row data
 * @returns Modified row
 */
export const modifyDictionary = (id: number, row: Dictionary) => {
  return api.put(`${SERVER_URL.DICTIONARY}/${id}`, row)
}

/**
 * Enable or Disable an existing row
 * @param id Row ID
 * @returns Enable or Disable result
 */
export const enableDictionary = (id: number) => {
  return api.patch(`${SERVER_URL.DICTIONARY}/${id}`)
}

/**
 * Remove a row
 * @param id Row ID
 * @returns Deletion status
 */
export const removeDictionary = (id: number) => {
  return api.delete(`${SERVER_URL.DICTIONARY}/${id}`)
}

/**
 * Import rows
 * @param file file
 * @returns
 */
export const importDictionaries = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post(`${SERVER_URL.DICTIONARY}/import`, formData)
}
