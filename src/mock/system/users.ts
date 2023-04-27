import { Random } from 'mockjs'

import type { Pagation, User } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<User> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<User> = [];

for (let i = 0; i < 139; i++) {
  datas.push({
    username: Random.last(),
    nickname: Random.cname(),
    avatar: Random.image('32x32'),
    enabled: Random.boolean(),
    accountExpiresAt: Random.date(),
    accountLocked: Random.boolean(),
    credentialsExpiresAt: Random.date()
  })
}

const groups = ["21529WXDL", "21529V1IM"]

const roles = ["20C281HG2"]

export default [
  {
    url: '/api/hypervisor/users',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'role') {
          return roles
        } else if (path === 'group') {
          return groups
        }
      }
      if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation;
      } else {
        const username = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.username === username)[0]
      }
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'put',
    response: (options: any) => {
      const username = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.username === username)[0]
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'patch',
    response: (options: any) => {
      const username = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.username === username)[0]
      data.accountLocked = false
      return data
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]