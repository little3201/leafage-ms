import { Random } from 'mockjs'

import type { AccountDetail } from '@/api/request.type'
import { parse } from '@/util';

const datas: Array<AccountDetail> = [];

for (let i = 0; i < 139; i++) {
  datas.push({
    username: Random.last(),
    nickname: Random.cname(),
    avatar: Random.image('32x32'),
    accountExpiresAt: Random.date(),
    accountLocked: Random.boolean(),
    credentialsExpiresAt: Random.date()
  })
}

const groups = ["21529WXDL", "21529V1IM"]

const roles = ["20C281HG2"]

export default [
  {
    url: '/api/hypervisor/account/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/hypervisor/account',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length == 1) {
        let path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'role') {
          return roles
        } else if (path === 'group') {
          return groups
        }
      }
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
      } else {
        let username = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.username === username)[0]
      }
    },
  },
  {
    url: '/api/hypervisor/account',
    method: 'put',
    response: (options: any) => {
      let username = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.username === username)[0]
    },
  },
  {
    url: '/api/hypervisor/account',
    method: 'patch',
    response: (options: any) => {
      let username = options.url.substring(options.url.lastIndexOf('/') + 1)
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
    url: '/api/hypervisor/account',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]