import { Random } from 'mockjs'

import type { Pagation, Post, PostContent } from '@/api/request.type'
import { parse } from '@/mock/utils';

const pagation: Pagation<Post> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Post> = [];

for (let i = 0; i < 79; i++) {
  datas.push({
    code: Random.string('number', 9),
    title: Random.ctitle(),
    cover: Random.image('198x128'),
    category: {
      code: Random.string('number', 9),
      name: Random.word(),
      count: Random.integer(1, 900),
      description: Random.csentence(),
      modifyTime: Random.datetime()
    },
    tags: ['Test', '测试'],
    modifyTime: Random.date()
  })
}

const postsContent: PostContent = {
  code: Random.string('number', 9),
  title: Random.ctitle(),
  cover: Random.image('198x128'),
  category: {
    code: Random.string('number', 9),
    name: Random.word(),
    count: Random.integer(1, 900),
    description: Random.csentence(),
    modifyTime: Random.datetime()
  },
  tags: ['Test', '测试'],
  modifyTime: Random.date(),
  content: {
    content: Random.cparagraph(),
    catalog: Random.csentence(),
  }
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
        return postsContent
      }
    }
  },
  {
    url: '/api/assets/posts',
    method: 'put',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/assets/posts',
    method: 'post',
    response: (options: any) => {
      let data: Post = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
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