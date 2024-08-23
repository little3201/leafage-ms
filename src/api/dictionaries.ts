import { api } from 'boot/axios'

export const retrieveDictionaries = (page: number, size: number, params?: object) => {
  return api.get('/dictionaries', { params: { page: page - 1, size: size, ...params } })
}

export const retrieveDictionarySubset = (id: number) => {
  return api.get(`/dictionaries/${id}/subset`)
}

export const retrieveDictionaryTree = () => {
  return api.get('/dictionaries/tree')
}

export const fetchDictionary = (id: number) => {
  return api.get(`/dictionaries/${id}`)
}
