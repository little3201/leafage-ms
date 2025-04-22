import { api } from 'boot/axios'
import { SERVER_URL } from 'src/constants'

/**
 * Retrieve rows
 * @returns Rows data
 */
export const retrieveTables = () => {
  return api.get(`${SERVER_URL.DB}/tables`)
}
