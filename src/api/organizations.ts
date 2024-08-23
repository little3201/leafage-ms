import { api } from 'boot/axios'

export const retrieveOrganizations = (page: number, size: number, params?: object) => {
  return api.get('/organizations', { params: { page: page - 1, size: size, ...params } })
}

export const retrieveOrganizationSubset = (id: number) => {
  return api.get(`/organizations/${id}/subset`)
}

export const retrieveOrganizationTree = () => {
  return api.get('/organizations/tree')
}

export const fetchOrganization = (id: number) => {
  return api.get(`/organizations/${id}`)
}
