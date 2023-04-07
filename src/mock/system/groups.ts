import { Random } from 'mockjs'

import type { Pagation, Group, User } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Group> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Group> = [];

for (let i = 0; i < 39; i++) {
  datas.push({
    id: Random.integer(),
    groupName: Random.word(),
    principal: Random.cname(),
    count: Random.integer(0, 99),
    modifyTime: Random.date(),
    enabled: Random.boolean()
  })
}

const members: Array<User> = []

for (let i = 0; i < 5; i++) {
  members.push({
    username: Random.last(),
    nickname: Random.cname(),
    avatar: Random.image('32x32'),
    enabled: Random.boolean(),
    accountExpiresAt: Random.date(),
    accountLocked: Random.boolean(),
    credentialsExpiresAt: Random.date()
  })
}

export default [
  {
    url: '/api/hypervisor/groups/tree',
    method: 'get',
    response: () => {
      return [];
    }
  },
  {
    url: '/api/hypervisor/groups',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === "user") {
          return members
        } else if (path === 'group') {
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
    url: '/api/hypervisor/groups',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/hypervisor/groups',
    method: 'post',
    response: (options: any) => {
      let data: Group = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/hypervisor/groups',
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
    url: '/api/hypervisor/groups/:id',
    method: 'delete',
    response: () => {
      return {}
    },
  }
]