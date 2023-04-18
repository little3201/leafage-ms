import { Random } from 'mockjs'

import type { Pagation, Component, Role } from '~/api/request.type'
import { parse } from '~/mock/utils';

const pagation: Pagation<Component> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}

const datas: Array<Component> = [
  {
    id: 1,
    modifyTime: Random.date(),
    superior: "System",
    componentName: "Role",
    type: "M",
    icon: "pocket",
    path: "/roles",
    enabled: true,
    count: 1
  },
  {
    id: 2,
    modifyTime: Random.date(),
    superior: "System",
    componentName: "Components",
    type: "M",
    icon: "link",
    path: "/components",
    enabled: true,
    count: 1
  },
  {
    id: 3,
    modifyTime: Random.date(),
    superior: "Components",
    componentName: "Add",
    type: "B",
    icon: "plus-circle",
    path: "/",
    enabled: false,
    count: 0
  },
  {
    id: 4,
    modifyTime: Random.date(),
    superior: "System",
    componentName: "User",
    type: "M",
    icon: "user",
    enabled: true,
    path: "/users",
    count: 1
  },
  {
    id: 5,
    modifyTime: Random.date(),
    superior: "",
    componentName: "System",
    type: "M",
    icon: "layers",
    enabled: true,
    path: "/system",
    count: 1
  },
  {
    id: 6,
    modifyTime: Random.date(),
    superior: '',
    componentName: "Dashboard",
    type: "M",
    icon: "home",
    path: "/",
    enabled: true,
    count: 1
  },
  {
    id: 7,
    modifyTime: Random.date(),
    superior: "",
    componentName: "Posts",
    type: "M",
    icon: "book",
    path: "/posts",
    enabled: true,
    count: 1
  },
  {
    id: 8,
    modifyTime: Random.date(),
    superior: "",
    componentName: "Resource",
    type: "M",
    icon: "book",
    path: "/resource",
    enabled: true,
    count: 1
  },
  {
    id: 9,
    modifyTime: Random.date(),
    superior: "",
    componentName: "Category",
    type: "M",
    icon: "tag",
    path: "/categories",
    enabled: true,
    count: 1
  },
  {
    id: 10,
    modifyTime: Random.date(),
    superior: "System",
    componentName: "Group",
    type: "M",
    icon: "users",
    path: "/groups",
    enabled: true,
    count: 1
  }
];

const roles: Array<Role> = [];

for (let i = 0; i < 9; i++) {
  roles.push({
    id: Random.increment(),
    roleName: Random.word(),
    count: Random.integer(1, 99),
    modifyTime: Random.date(),
    enabled: Random.boolean()
  })
}

export default [
  {
    url: '/api/hypervisor/components/tree',
    method: 'get',
    response: () => {
      return [];
    },
  },
  {
    url: '/api/hypervisor/components',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === "components") {
          return datas.slice(0, 6)
        } else if (path === "roles") {
          return roles
        } else {
          const id = url.substring(url.lastIndexOf('/') + 1)
          return datas.filter(item => item.id === id)[0]
        }
      } else if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.get("page") * params.get("size"), (parseInt(params.get("page")) + 1) * params.get("size"))
        return pagation
      }
    },
  },
  {
    url: '/api/hypervisor/components',
    method: 'put',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.id === id)[0]
    }
  },
  {
    url: '/api/hypervisor/components',
    method: 'post',
    response: (options: any) => {
      let data: Component = JSON.parse(options.body)
      data = { ...data, id: Random.integer() }
      return data
    }
  },
  {
    url: '/api/hypervisor/components',
    method: 'patch',
    response: (options: any) => {
      const id = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.id === id)[0]
      data.enabled = !data.enabled
      return data
    },
  },
  {
    url: '/api/hypervisor/components',
    method: 'delete',
    response: () => {
      return {}
    }
  }
]