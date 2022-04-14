import { Random } from 'mockjs'

import type { Pagation, Region } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Region> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Region> = [];

for (let i = 0; i < 309; i++) {
  if (i < 34) {
    datas.push({
      code: Random.integer(10, 99),
      name: Random.province(),
      superior: Random.region(), // 华南、华北
      alias: Random.cword(),
      postalCode: Random.zip(),
      areaCode: Random.string('0123456789', 3),
      description: Random.csentence(5),
      modifyTime: Random.date()
    })
  } else if (i >= 34 && i < 144) {
    datas.push({
      code: Random.integer(1000, 9999),
      name: Random.city(),
      superior: Random.province(),
      alias: Random.city(),
      postalCode: Random.zip(),
      areaCode: Random.string('0123456789', 4),
      description: Random.csentence(5),
      modifyTime: Random.date()
    })
  } else {
    datas.push({
      code: Random.integer(100000, 999999),
      name: Random.county(),
      superior: Random.city(),
      alias: Random.county(),
      postalCode: Random.zip(),
      areaCode: Random.string('0123456789', 5),
      description: Random.csentence(5),
      modifyTime: Random.date()
    })
  }
}
export default [
  {
    url: '/api/hypervisor/region/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/hypervisor/region',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length == 1) {
        let path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'lower') {
          let superior = parseInt(url.substring(url.lastIndexOf('region') + 7, url.lastIndexOf('/')))
          if (superior > 0 && superior < 99) {
            return datas.slice(0, 34)
          } else if (superior > 1000 && superior < 9999) {
            return datas.slice(35, 144)
          } else {
            return datas.slice(145, 309)
          }
        } else {
          let code = path
          return datas.filter(item => item.code == code)[0]
        }
      } else if (url.split('?').length > 1) {
        let params: any = parse(url)
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        pagation.totalElements = datas.length
        return pagation;
      }
    }
  },
  {
    url: '/api/hypervisor/region',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/region',
    method: 'post',
    response: (options: any) => {
      let data: Region = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/region',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]