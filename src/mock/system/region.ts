import { Random } from 'mockjs'

import { Region } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Region> = [];

for (let i = 0; i < 309; i++) {
  if (i <= 34) {
    datas.push({
      code: Random.id(),
      name: Random.province(),
      superior: '',
      alias: '京',
      postalCode: Random.zip(),
      description: Random.csentence(5),
      modifyTime: Random.date()
    })
  } else if (i > 34 && i< 144) {
    datas.push({
      code: Random.id(),
      name: Random.city(),
      superior: Random.province(),
      alias: '',
      postalCode: Random.zip(),
      description: Random.csentence(5),
      modifyTime: Random.date()
    })
  } else {
    datas.push({
      code: Random.id(),
      name: Random.county(),
      superior: Random.city(),
      alias: '',
      postalCode: Random.zip(),
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
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (params.page + 1) * params.size)
      } else {
        let code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
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