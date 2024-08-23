import { api } from 'boot/axios'

export const retrieveRegions = (page: number, size: number, params?: object) => {
  return api.get('/regions', { params: { page: page - 1, size: size, ...params } })
}

export const retrieveRegionSubset = (id: number) => {
  return api.get(`/regions/${id}/subset`)
}

export const fetchRegion = (id: number) => {
  return api.get(`/regions/${id}`)
}
