import { Random } from 'mockjs'

import type { Pagation, Role } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Role> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Role> = [];

for (let i = 0; i < 39; i++) {
  datas.push({
    code: Random.string('number', 9),
    name: Random.word(),
    superior: Random.word(),
    count: Random.integer(0, 99),
    description: Random.csentence(5),
    modifyTime: new Date(Random.date()),
    enabled: Random.boolean()
  })
}

const treeDatas = [
  { "code": "20C11MJEB", "name": "Supper", "superior": null, "expand": null, "children": [] },
  { "code": "20C281HG2", "name": "Guest", "superior": null, "expand": null, "children": [] },
  {
    "code": "20C287LBJ", "name": "Relation", "superior": null, "expand": null, "children":
      [{ "code": "20C28YH7X", "name": "Supplier", "superior": "20C287LBJ", "expand": null, "children": [] }
      ]
  }
]

const authorities = ["2122466RP", "21224B8JZ", "21953KO8", "203315P3Q"]

export default [
  {
    url: '/api/hypervisor/role/tree',
    method: 'get',
    response: () => {
      return treeDatas
    }
  },
  {
    url: '/api/hypervisor/role',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'authority') {
          return authorities
        } else if (path === 'role') {
          return datas.slice(0, 6)
        } else {
          const code = path
          return datas.filter(item => item.code === code)[0]
        }
      } else if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        return pagation
      }
    }
  },
  {
    url: '/api/hypervisor/role',
    method: 'put',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/role',
    method: 'post',
    response: (options: any) => {
      let data: Role = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/role',
    method: 'patch',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
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
    url: '/api/hypervisor/role',
    method: 'delete',
    response: () => {
      return {
      }
    }
  }
]