import { Random } from 'mockjs'

import type { Pagation, Dictionary } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Dictionary> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Dictionary> = [];

for (let i = 0; i < 390; i++) {
  datas.push({
    id: Random.increment(),
    dictionaryName: Random.cword(),
    superior: Random.word(), // 华南、华北
    enabled: Random.boolean(),
    description: Random.csentence(5),
    modifyTime: Random.date()
  })
}
export default [
  {
    url: '/api/hypervisor/dictionaries',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'lower') {
          return datas.slice(0, 34)
        } else if (path === 'superior') {
          return datas.slice(0, 12)
        } else {
          const id = path
          return datas.filter(item => item.id == id)[0]
        }
      } else if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation
      }
    }
  },
  {
    url: '/api/hypervisor/dictionaries',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/hypervisor/dictionaries',
    method: 'post',
    response: (options: any) => {
      let data: Dictionary = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/hypervisor/dictionaries',
    method: 'patch',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.id === id)[0]
      data.enabled = !data.enabled
      return data
    },
  },
  {
    url: '/api/hypervisor/dictionaries',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]