import { Random } from 'mockjs'

import type { Pagation, Group, AccountDetail } from '@/api/request.type'
import { parse } from '@/mock/utils';

const pagation: Pagation<Group> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Group> = [];

for (let i = 0; i < 39; i++) {
  datas.push({
    code: Random.string('number', 9),
    name: Random.word(),
    alias: Random.cword(),
    superior: Random.word(),
    principal: Random.cname(),
    count: Random.integer(0, 99),
    description: Random.csentence(5),
    modifyTime: Random.date(),
    enabled: Random.boolean()
  })
}

const accounts: Array<AccountDetail> = []

for (let i = 0; i < 5; i++) {
  accounts.push({
    username: Random.last(),
    nickname: Random.cname(),
    avatar: Random.image('32x32'),
    enabled: Random.boolean(),
    accountExpiresAt: Random.date(),
    accountLocked: Random.boolean(),
    credentialsExpiresAt: Random.date()
  })
}

const treeDatas = [
  { "code": "21529ZEE7", "name": "normal", "superior": null, "expand": null, "children": [] },
  {
    "code": "21169GZC", "name": "vip", "superior": null, "expand": null, "children": [
      {
        "code": "21529WXDL", "name": "gold vip", "superior": "21169GZC", "expand": null, "children": [
          { "code": "21529V1IM", "name": "diamond vip", "superior": "21529WXDL", "expand": null, "children": [] }
        ]
      }
    ]
  }
];

export default [
  {
    url: '/api/hypervisor/groups/tree',
    method: 'get',
    response: () => {
      return treeDatas;
    }
  },
  {
    url: '/api/hypervisor/groups',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === "account") {
          return accounts
        } else if (path === 'group') {
          return datas.slice(0, 6)
        } else {
          const code = path
          return datas.filter(item => item.code === code)[0]
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
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/groups',
    method: 'post',
    response: (options: any) => {
      let data: Group = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/groups',
    method: 'patch',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.code === code)[0]
      data.enabled = !data.enabled
      return data
    },
  },
  {
    url: '/api/hypervisor/groups/:code',
    method: 'delete',
    response: () => {
      return {}
    },
  }
]