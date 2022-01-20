import { Random } from 'mockjs'

import { User } from '@/api/request'

const data: User = {
  username: Random.name(),
  firstname: Random.cfirst(),
  lastname: Random.clast(),
  gender: 'F',
  email: Random.email(),
  education: '',
  country: '',
  province: Random.province(),
  city: 'string',
  region: 'string',
  address: 'string',
  description: "这里是描述信息。。。"
}

export default [
  {
    url: '/api/hypervisor/user/little3201',
    method: 'get',
    response: () => {
      return data
    },
  },
  {
    url: '/api/hypervisor/user/little3201',
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
  },
  {
    url: '/api/hypervisor/user/little3201',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]