import { Random } from 'mockjs'
import { BookOpenIcon, ClipboardIcon, HomeIcon, LinkIcon, MapPinIcon, ShieldCheckIcon, Square3Stack3DIcon, TagIcon, UsersIcon } from '@heroicons/vue/24/outline'

import type { NodeData, Pagation, User } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<User> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<User> = [];
const components: Array<NodeData> = [
  { "id": 1, "name": "Dashboard", "superiorId": 0, "expand": { "path": "/", "icon": HomeIcon }, "children": [] },
  {
    "id": 2, "name": "System", "superiorId": 0, "expand": { "path": "/system", "icon": Square3Stack3DIcon }, "children": [
      { "id": 3, "name": "Groups", "superiorId": 2, "expand": { "path": "/groups", "icon": UsersIcon }, "children": [] },
      {
        "id": 4, "name": "Roles", "superiorId": 2, "expand": { "path": "/roles", "icon": LinkIcon }, "children": []
      },
      { "id": 5, "name": "Components", "superiorId": 2, "expand": { "path": "/components", "icon": ShieldCheckIcon }, "children": [] },
      {
        "id": 6, "name": "Users", "superiorId": 2, "expand": { "path": "/users", "icon": UsersIcon }, "children": []
      },
      { "id": 7, "name": "Dictionaries", "superiorId": 2, "expand": { "path": "/dictionaries", "icon": BookOpenIcon }, "children": [] }
    ]
  },
  { "id": 8, "name": "Posts", "superiorId": 0, "expand": { "path": "/posts", "icon": ClipboardIcon }, "children": [] },
  { "id": 9, "name": "Categories", "superiorId": 0, "expand": { "path": "/categories", "icon": TagIcon }, "children": [] },
  { "id": 10, "name": "Regions", "superiorId": 0, "expand": { "path": "/regions", "icon": MapPinIcon }, "children": [] }
]

for (let i = 0; i < 139; i++) {
  datas.push({
    username: Random.last(),
    nickname: Random.cname(),
    avatar: Random.image('32x32'),
    enabled: Random.boolean(),
    accountExpiresAt: Random.date(),
    accountLocked: Random.boolean(),
    credentialsExpiresAt: Random.date()
  })
}

const groups = ["21529WXDL", "21529V1IM"]

const roles = ["20C281HG2"]

export default [
  {
    url: '/api/hypervisor/users',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === 'roles') {
          return roles
        } else if (path === 'groups') {
          return groups
        } else if (path === 'components') {
          return components
        } else {
          return datas[0]
        }
      }
      if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation;
      } else {
        const username = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.username === username)[0]
      }
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'put',
    response: (options: any) => {
      const username = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.username === username)[0]
    },
  },
  {
    url: '/api/hypervisor/users',
    method: 'patch',
    response: (options: any) => {
      const username = options.url.substring(options.url.lastIndexOf('/') + 1)
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
    url: '/api/hypervisor/users',
    method: 'delete',
    response: () => {
      return {
      }
    },
  }
]