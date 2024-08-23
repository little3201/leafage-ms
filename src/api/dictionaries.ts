import { api } from 'boot/axios'
import { SERVER_URL } from 'src/api/paths'

export const retrieveDictionaries = (page: number, size: number, params?: object) => {
  return api.get(SERVER_URL.DICTIONARY, { params: { page, size, ...params } })
}

export const retrieveDictionarySubset = (id: number) => {
  return api.get(`${SERVER_URL.DICTIONARY}/${id}/subset`)
}

export const retrieveDictionaryTree = () => {
  return api.get(`${SERVER_URL.DICTIONARY}/tree`)
}

export const fetchDictionary = (id: number) => {
  return api.get(`${SERVER_URL.DICTIONARY}/${id}`)
}
