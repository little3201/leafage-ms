import { Random } from 'mockjs'

import { User } from '@/api/request'

const data: User = {
  username: Random.name(),
  firstname: Random.cfirst(),
  lastname: Random.clast(),
  gender: 'F',
  email: Random.email(),
  education: 'G',
  country: '中华人民共和国',
  province: "陕西省",
  city: "西安市",
  region: "主城区",
  street: '新街',
  address: 'xx街22号',
  description: Random.csentence(),
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