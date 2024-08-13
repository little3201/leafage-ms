import { api } from 'boot/axios'

export const retrievePrivilegeTree = (username: string) => {
  return api.get(`/privileges/${username}/tree`)
}
