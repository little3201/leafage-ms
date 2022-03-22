import { Random } from 'mockjs'

import type { User } from '@/api/request.type'

const data: User = {
  username: Random.name(),
  firstname: Random.first(),
  lastname: Random.last(),
  gender: Random.character('MF'),
  phone: Random.integer(13000000000, 18700000000),
  email: Random.email(),
  birthday: Random.date(),
  ethnicity: "01",
  degree: '02',
  hobbies: Random.word(),
  company: Random.word(),
  position: Random.word()
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