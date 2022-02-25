import { Random } from 'mockjs'

import type { Category } from '@/api/request.type'
import { parse } from '@/util';

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
    url: '/api/assets/category/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/assets/category',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
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