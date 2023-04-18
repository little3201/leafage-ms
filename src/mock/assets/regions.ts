import { Random } from 'mockjs'

import type { Pagation, Region } from '~/api/request.type'
import { parse } from '~/mock/utils';

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
      id: Random.increment(),
      regionName: Random.province(),
      superior: Random.region(),
      postalCode: parseInt(Random.zip()),
      areaCode: parseInt(Random.string('0123456789', 3)),
      modifyTime: Random.date()
    })
  } else if (i >= 34 && i < 144) {
    datas.push({
      id: Random.integer(1000, 9999),
      regionName: Random.city(),
      superior: Random.province(),
      postalCode: parseInt(Random.zip()),
      areaCode: parseInt(Random.string('0123456789', 4)),
      modifyTime: Random.date()
    })
  } else {
    datas.push({
      id: Random.integer(100000, 999999),
      regionName: Random.county(),
      superior: Random.city(),
      postalCode: parseInt(Random.zip()),
      areaCode: parseInt(Random.string('0123456789', 5)),
      modifyTime: Random.date()
    })
  }
}
export default [
  {
    url: '/api/hypervisor/regions/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/hypervisor/regions',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'lower') {
          const superior = parseInt(url.substring(url.lastIndexOf('region') + 7, url.lastIndexOf('/')))
          if (superior > 0 && superior < 99) {
            return datas.slice(0, 34)
          } else if (superior > 1000 && superior < 9999) {
            return datas.slice(35, 144)
          } else {
            return datas.slice(145, 309)
          }
        } else {
          const id = path
          return datas.filter(item => item.id == id)[0]
        }
      } else if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        pagation.totalElements = datas.length
        return pagation;
      }
    }
  },
  {
    url: '/api/hypervisor/regions',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/hypervisor/regions',
    method: 'post',
    response: (options: any) => {
      let data: Region = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/hypervisor/regions',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]