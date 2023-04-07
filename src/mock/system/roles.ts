import { Random } from 'mockjs'

import type { Pagation, Role } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Role> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Role> = [];

for (let i = 0; i < 39; i++) {
  datas.push({
    id: Random.integer(),
    roleName: Random.word(),
    count: Random.integer(0, 99),
    modifyTime: Random.date(),
    enabled: Random.boolean()
  })
}

const treeDatas = [
  { "id": "20C11MJEB", "name": "Supper", "superior": null, "expand": null, "children": [] },
  { "id": "20C281HG2", "name": "Guest", "superior": null, "expand": null, "children": [] },
  {
    "id": "20C287LBJ", "name": "Relation", "superior": null, "expand": null, "children":
      [{ "id": "20C28YH7X", "name": "Supplier", "superior": "20C287LBJ", "expand": null, "children": [] }
      ]
  }
]

const components = ["2122466RP", "21224B8JZ", "21953KO8", "203315P3Q"]

export default [
  {
    url: '/api/hypervisor/roles/tree',
    method: 'get',
    response: () => {
      return treeDatas
    }
  },
  {
    url: '/api/hypervisor/roles',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'components') {
          return components
        } else if (path === 'role') {
          return datas.slice(0, 6)
        } else {
          const id = path
          return datas.filter(item => item.id === id)[0]
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
    url: '/api/hypervisor/roles',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/hypervisor/roles',
    method: 'post',
    response: (options: any) => {
      let data: Role = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/hypervisor/roles',
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
    url: '/api/hypervisor/roles',
    method: 'delete',
    response: () => {
      return {
      }
    }
  }
]