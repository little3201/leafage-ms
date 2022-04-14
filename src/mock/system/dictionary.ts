import { Random } from 'mockjs'

import type { Pagation, Dictionary } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Dictionary> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Dictionary> = [];

for (let i = 0; i < 309; i++) {
  datas.push({
    code: Random.string('number', 9),
    name: Random.word(),
    superior: Random.word(), // 华南、华北
    alias: Random.cword(),
    enabled: Random.boolean(),
    description: Random.csentence(5),
    modifyTime: Random.date()
  })
}
export default [
  {
    url: '/api/hypervisor/dictionary',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length == 1) {
        let path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'lower') {
          return datas.slice(0, 34)
        } else {
          let code = path
          return datas.filter(item => item.code == code)[0]
        }
      } else if (url.split('?').length > 1) {
        let params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        return pagation
      }
    }
  },
  {
    url: '/api/hypervisor/dictionary',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/dictionary',
    method: 'post',
    response: (options: any) => {
      let data: Dictionary = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/dictionary',
    method: 'patch',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.code === code)[0]
      data.enabled = !data.enabled
      return data
    },
  },
  {
    url: '/api/hypervisor/dictionary',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]