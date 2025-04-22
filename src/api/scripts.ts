import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'

/**
 * Retrieve rows
 * @param filters Optional filter or sort parameters
 * @returns Rows data
 */
export const retrieveScripts = () => {
  return api.get(SERVER_URL.SCRIPT)
}

/**
 * Fetch a specific row
 * @param id Row ID
 * @returns Row data
 */
export const fetchScript = (id: number) => {
  return api.get(`${SERVER_URL.SCRIPT}/${id}`)
}

/**
 * Import rows
 * @param file file
 * @returns
 */
export const importScripts = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post(`${SERVER_URL.SCRIPT}/import`, formData)
}
