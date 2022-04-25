import { Random } from 'mockjs'

import type { Pagation, Posts, PostsDetails } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Posts> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Posts> = [];

for (let i = 0; i < 79; i++) {
  datas.push({
    code: Random.string('number', 9),
    title: Random.ctitle(),
    cover: Random.image('198x128'),
    category: Random.word(),
    tags: ['Test', '测试'],
    viewed: Random.integer(1, 900),
    likes: Random.integer(100, 899),
    comments: Random.integer(1, 100),
    modifyTime: new Date(Random.date())
  })
}

const postsDetails: PostsDetails = {
  catalog: Random.csentence(),
  content: Random.cparagraph()
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
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        return pagation
      } else if (url.substring(url.lastIndexOf('/') + 1) === "content") {
        return postsDetails
      } else {
        const code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
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
      let data: Posts = JSON.parse(options.body)
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