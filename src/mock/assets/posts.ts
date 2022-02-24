import { Random } from 'mockjs'

import { Posts, PostsDetails } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Posts> = [];

for (let i = 0; i < 79; i++) {
  datas.push({
    code: Random.string('number', 9),
    title: Random.ctitle(),
    cover: Random.image('198x128'),
    category: Random.word(),
    tags: Random.range(1, 8),
    viewed: Random.integer(1, 900),
    likes: Random.integer(100, 899),
    comment: Random.integer(1, 100),
    modifyTime: Random.date()
  })
}

const postsDetails: PostsDetails = {
  catalog: Random.csentence(),
  content: Random.cparagraph()
}

export default [
  {
    url: '/api/assets/posts/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/assets/posts',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
      } else if (url.substring(url.lastIndexOf('/') + 1) === "content") {
        return postsDetails
      } else {
        let code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
      }
    }
  },
  {
    url: '/api/assets/posts',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
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