import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveGroups = (page: number, size: number, params?: object) => {
  return api.get(SERVER_URL.GROUP, { params: { page, size, ...params } })
}

export const retrieveGroupSubset = (id: number) => {
  return api.get(`${SERVER_URL.GROUP}/${id}/subset`)
}

export const retrieveGroupTree = () => {
  return api.get(`${SERVER_URL.GROUP}/tree`)
}

export const fetchGroup = (id: number) => {
  return api.get(`${SERVER_URL.GROUP}/${id}`)
}
