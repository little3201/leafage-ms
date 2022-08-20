import { Random } from 'mockjs'

import type { User } from '@/api/request.type'

const data: User = {
  username: Random.name(),
  firstname: Random.first(),
  lastname: Random.last(),
  gender: Random.character('MF'),
  phone: Random.integer(13000000000, 19900000000),
  email: Random.email(),
  birthday: new Date(Random.date()),
  nationality: "",
  degree: '02',
  hobbies: Random.word(),
  company: Random.word(),
  position: Random.word(),
  description: Random.csentence()
}

export default [
  {
    url: '/api/hypervisor/users',
    method: 'get',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'put',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'post',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'patch',
    response: () => {
      return {
        msg: "ok"
      }
    },
  }
]