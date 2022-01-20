import { Random } from 'mockjs'

import { Account } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Account> = [];

for (let i = 0; i < 139; i++) {
  datas.push({
    username: Random.name(),
    nickname: Random.cname(),
    avatar: '',
    accountNonExpired: Random.boolean(),
    accountNonLocked: Random.boolean(),
    credentialsNonExpired: Random.boolean(),
    description: Random.csentence()
  })
}

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
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (params.page + 1) * params.size)
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
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]