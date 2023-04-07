import { Random } from 'mockjs'

import type { Pagation, Post } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Post> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Post> = [];

for (let i = 0; i < 79; i++) {
  datas.push({
    id: Random.integer(),
    title: Random.ctitle(),
    cover: Random.image('198x128'),
    category: Random.word(),
    tags: ['Test', '测试'],
    context: Random.cparagraph(),
    modifyTime: Random.date()
  })
}

export default [
  {
    url: '/api/assets/posts',
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
    url: '/api/assets/posts',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/assets/posts',
    method: 'post',
    response: (options: any) => {
      let data: Post = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/assets/posts',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]