import { Random } from 'mockjs'

import type { Pagation, Category } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Category> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Category> = [];

for (let i = 0; i < 12; i++) {
  datas.push({
    id: Random.integer(),
    categoryName: Random.word(),
    count: Random.integer(1, 99),
    description: Random.csentence(5),
    modifyTime: Random.date()
  })
}

export default [
  {
    url: '/api/assets/categories',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation
      } else {
        const id = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.id === id)[0]
      }
    }
  },
  {
    url: '/api/assets/categories',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/assets/categories',
    method: 'post',
    response: (options: any) => {
      let data: Category = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/assets/categories/:id',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]