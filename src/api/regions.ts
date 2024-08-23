import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveRegions = (page: number, size: number, params?: object) => {
  return api.get(SERVER_URL.REGION, { params: { page, size, ...params } })
}

export const retrieveRegionSubset = (id: number, page: number, size: number, params?: object) => {
  return api.get(`${SERVER_URL.REGION}/${id}/subset`, { params: { page, size, ...params } })
}

export const fetchRegion = (id: number) => {
  return api.get(`${SERVER_URL.REGION}/${id}`)
}
