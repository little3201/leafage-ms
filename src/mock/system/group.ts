import { Random } from 'mockjs'

import { Group } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Group> = [];

for (let i = 0; i < 39; i++) {
  datas.push({
    code: Random.id(),
    name: Random.word(),
    superior: Random.word(),
    principal: Random.cname(),
    count: Random.integer(1, 99),
    description: Random.csentence(5),
    modifyTime: Random.date()
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
    url: '/api/hypervisor/group/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
  {
    url: '/api/hypervisor/group/tree',
    method: 'get',
    response: () => {
      return treeDatas;
    }
  },
  {
    url: '/api/hypervisor/group',
    method: 'get',
    response: (options: any) => {
      let url = options.url
      if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (params.page + 1) * params.size)
      } else {
        let code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
      }
    }
  },
  {
    url: '/api/hypervisor/group',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/group',
    method: 'post',
    response: (options: any) => {
      let data: Group = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/group/:code',
    method: 'delete',
    response: () => {
      return {}
    },
  }
]