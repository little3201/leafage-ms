import { Random } from 'mockjs'

import type { Pagation, Resource } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Resource> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Resource> = [];

for (let i = 0; i < 79; i++) {
  datas.push({
    code: Random.string('number', 9),
    title: Random.ctitle(),
    cover: Random.image('176x224'),
    category: Random.word(),
    type: 'E',
    viewed: Random.integer(1, 900),
    downloads: Random.integer(1, 100),
    description: Random.csentence(5),
    modifyTime: new Date(Random.date())
  })
}

export default [
  {
    url: '/api/assets/resource',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation
      } else {
        const code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
      }
    }
  },
  {
    url: '/api/assets/resource',
    method: 'put',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/assets/resource',
    method: 'post',
    response: (options: any) => {
      let data: Resource = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/assets/resource',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]