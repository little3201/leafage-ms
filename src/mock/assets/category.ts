import { Random } from 'mockjs'

import type { Pagation, Category } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Category> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Category> = [];

for (let i = 0; i < 19; i++) {
  datas.push({
    code: Random.string('number', 9),
    alias: Random.word(),
    count: Random.integer(1, 99),
    description: Random.csentence(5),
    modifyTime: Random.date()
  })
}

export default [
  {
    url: '/api/assets/category',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        return pagation
      } else if (url.substring(url.lastIndexOf('/') + 1) === "category") {
        return datas
      } else {
        let code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
      }
    }
  },
  {
    url: '/api/assets/category',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/assets/category',
    method: 'post',
    response: (options: any) => {
      let data: Category = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/assets/category/:code',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]