import { api } from 'boot/axios'

export const retrieveRegions = (page: number, size: number, params?: object) => {
  return api.get('/regions', { params: { page, size, ...params } })
}

export const retrieveRegionSubset = (id: number, page: number, size: number, params?: object) => {
  return api.get(`/regions/${id}/subset`, { params: { page, size, ...params } })
}

export const fetchRegion = (id: number) => {
  return api.get(`/regions/${id}`)
}
