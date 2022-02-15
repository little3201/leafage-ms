import { Random } from 'mockjs'

import { User } from '@/api/request'

const data: User = {
  username: Random.name(),
  firstname: Random.cfirst(),
  lastname: Random.clast(),
  gender: 'F',
  phone: Random.integer(13000000000, 18700000000),
  email: Random.email(),
  birthday: Random.date(),
  description: Random.csentence(),
}

export default [
  {
    url: '/api/hypervisor/user',
    method: 'get',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/user',
    method: 'put',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/user',
    method: 'post',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/user',
    method: 'patch',
    response: () => {
      return {
        msg: "ok"
      }
    },
  }
]