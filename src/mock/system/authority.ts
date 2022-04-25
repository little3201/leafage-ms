import { Random } from 'mockjs'

import type { Pagation, Authority, Role } from '@/api/request.type'
import { parse } from '@/util';

const pagation: Pagation<Authority> = {
  page: 0,
  size: 10,
  totalElements: 0,
  content: []
}
const datas: Array<Authority> = [
  {
    code: "21224PV6C",
    modifyTime: new Date(Random.date()),
    superior: "System",
    name: "Role",
    type: "M",
    icon: "pocket",
    path: "/role",
    enabled: true,
    description: "角色",
    count: 1
  },
  {
    code: "212240439",
    modifyTime: new Date(Random.date()),
    superior: "System",
    name: "Authority",
    type: "M",
    icon: "link",
    path: "/authority",
    enabled: true,
    description: "权限",
    count: 1
  },
  {
    code: "2133U754",
    modifyTime: new Date(Random.date()),
    superior: "Authority",
    name: "Add",
    type: "B",
    icon: "plus-circle",
    path: "/",
    enabled: false,
    description: "新增",
    count: 0
  },
  {
    code: "203315P3Q",
    modifyTime: new Date(Random.date()),
    superior: "System",
    name: "Account",
    type: "M",
    icon: "user",
    enabled: true,
    path: "/account",
    description: "账号",
    count: 1
  },
  {
    code: "21224DRMU",
    modifyTime: new Date(Random.date()),
    superior: "",
    name: "System",
    type: "M",
    icon: "layers",
    enabled: true,
    path: "/system",
    description: "系统管理",
    count: 1
  },
  {
    code: "2122466RP",
    modifyTime: new Date(Random.date()),
    superior: '',
    name: "Dashboard",
    type: "M",
    icon: "home",
    path: "/",
    enabled: true,
    description: "控制台",
    count: 1
  },
  {
    code: "21224B8JZ",
    modifyTime: new Date(Random.date()),
    superior: "",
    name: "Posts",
    type: "M",
    icon: "book",
    path: "/posts",
    enabled: true,
    description: "帖子管理",
    count: 1
  },
  {
    code: "21224QI72",
    modifyTime: new Date(Random.date()),
    superior: "",
    name: "Resource",
    type: "M",
    icon: "book",
    path: "/resource",
    enabled: true,
    description: "作品管理",
    count: 1
  },
  {
    code: "21224HMLG",
    modifyTime: new Date(Random.date()),
    superior: "",
    name: "Category",
    type: "M",
    icon: "tag",
    path: "/category",
    enabled: true,
    description: "类目管理",
    count: 1
  },
  {
    code: "21224UJ5C",
    modifyTime: new Date(Random.date()),
    superior: "System",
    name: "Group",
    type: "M",
    icon: "users",
    path: "/group",
    enabled: true,
    description: "分组",
    count: 1
  }
];

const treeDatas = [
  {
    code: "2122466RP",
    name: "Dashboard",
    superior: "2122466RP",
    "expand": {
      path: "/",
      icon: "home"
    },
    "children": []
  },
  {
    code: "21224B8JZ",
    name: "Posts",
    superior: "21224B8JZ",
    "expand": {
      path: "/posts",
      icon: "clipboard"
    },
    "children": [
      {
        code: "2194F8PU",
        name: "Delete",
        superior: "Posts",
        "expand": {
          icon: "trash-2",
          path: null
        },
        "children": []
      },
      {
        code: "2194F12W",
        name: "Edit",
        superior: "Posts",
        "expand": {
          icon: "edit-3",
          path: null
        },
        "children": []
      },
      {
        code: "2194GITT",
        name: "Add",
        superior: "Posts",
        "expand": {
          icon: "plus-circle",
          path: null
        },
        "children": []
      }
    ]
  },
  {
    code: "21224QI72",
    name: "Resource",
    superior: "21224QI72",
    "expand": {
      path: "/resource",
      icon: "book"
    },
    "children": [
      {
        code: "2194DRS4",
        name: "Edit",
        superior: "Resource",
        "expand": {
          icon: "edit-3",
          path: null
        },
        "children": []
      },
      {
        code: "2194S7BM",
        name: "Delete",
        superior: "Resource",
        "expand": {
          icon: "trash-2",
          path: null
        },
        "children": []
      },
      {
        code: "2194V6H0",
        name: "Add",
        superior: "Resource",
        "expand": {
          icon: "plus-circle",
          path: null
        },
        "children": []
      }
    ]
  },
  {
    code: "21224HMLG",
    name: "Category",
    superior: "21224HMLG",
    "expand": {
      path: "/category",
      icon: "tag"
    },
    "children": [
      {
        code: "2194B8H4",
        name: "Edit",
        superior: "Category",
        "expand": {
          icon: "edit-3",
          path: null
        },
        "children": []
      },
      {
        code: "2194L73Y",
        name: "Delete",
        superior: "Category",
        "expand": {
          icon: "trash-2",
          path: null
        },
        "children": []
      },
      {
        code: "2194GDCU",
        name: "Add",
        superior: "Category",
        "expand": {
          icon: "plus-circle",
          path: null
        },
        "children": []
      }
    ]
  },
  {
    code: "21953KO8",
    name: "Region",
    superior: "21953KO8",
    "expand": {
      path: "/region",
      icon: "map-pin"
    },
    "children": []
  },
  {
    code: "21224DRMU",
    name: "System",
    superior: "21224DRMU",
    "expand": {
      path: "/system",
      icon: "layers"
    },
    "children": [
      {
        code: "203315P3Q",
        name: "Account",
        superior: "System",
        "expand": {
          icon: "user",
          path: "/account"
        },
        "children": [
          {
            code: "2194AKOP",
            name: "Group",
            superior: "User",
            "expand": {
              icon: "users",
              path: null
            },
            "children": []
          },
          {
            code: "2194G49U",
            name: "Role",
            superior: "User",
            "expand": {
              icon: "pocket",
              path: null
            },
            "children": []
          },
          {
            code: "2194Z7HC",
            name: "Unlock",
            superior: "User",
            "expand": {
              icon: "key",
              path: null
            },
            "children": []
          }
        ]
      },
      {
        code: "21224UJ5C",
        name: "Group",
        superior: "System",
        "expand": {
          icon: "users",
          path: "/group"
        },
        "children": [
          {
            code: "2194RXT4",
            name: "Delete",
            superior: "Group",
            "expand": {
              icon: "trash-2",
              path: null
            },
            "children": []
          },
          {
            code: "2194Q2RT",
            name: "Edit",
            superior: "Group",
            "expand": {
              icon: "edit-3",
              path: null
            },
            "children": []
          },
          {
            code: "2194BZO4",
            name: "Add",
            superior: "Group",
            "expand": {
              icon: "plus-circle",
              path: null
            },
            "children": []
          },
          {
            code: "2194AK7P",
            name: "Account",
            superior: "Group",
            "expand": {
              icon: "user",
              path: null
            },
            "children": []
          },
        ]
      },
      {
        code: "21224PV6C",
        name: "Role",
        superior: "System",
        "expand": {
          icon: "pocket",
          path: "/role"
        },
        "children": [
          {
            code: "2194SZ23",
            name: "Edit",
            superior: "Role",
            "expand": {
              icon: "edit-3",
              path: null
            },
            "children": []
          },
          {
            code: "2194KWGL",
            name: "Delete",
            superior: "Role",
            "expand": {
              icon: "trash-2",
              path: null
            },
            "children": []
          },
          {
            code: "2194GIX1",
            name: "Grant",
            superior: "Role",
            "expand": {
              icon: "power",
              path: null
            },
            "children": []
          },
          {
            code: "2194XE80",
            name: "Add",
            superior: "Role",
            "expand": {
              icon: "plus-circle",
              path: null
            },
            "children": []
          }
        ]
      },
      {
        code: "212240439",
        name: "Authority",
        superior: "System",
        "expand": {
          icon: "link",
          path: "/authority"
        },
        "children": [
          {
            code: "2133U754",
            name: "Add",
            superior: "Authority",
            "expand": {
              icon: "plus-circle",
              path: "/"
            },
            "children": []
          },
          {
            code: "2133PDV0",
            name: "Edit",
            superior: "Authority",
            "expand": {
              icon: "edit-3",
              path: "/{code}"
            },
            "children": []
          },
          {
            code: "2133N9G7",
            name: "Delete",
            superior: "Authority",
            "expand": {
              icon: "trash-2",
              path: "/{code}"
            },
            "children": []
          },
          {
            code: "2194FKOP",
            name: "Role",
            superior: "Authority",
            "expand": {
              icon: "pocket",
              path: null
            },
            "children": []
          },
        ]
      }
    ]
  }
]

const roles: Array<Role> = [];

for (let i = 0; i < 9; i++) {
  roles.push({
    code: Random.string('number', 9),
    name: Random.word(),
    superior: Random.word(),
    count: Random.integer(1, 99),
    description: Random.csentence(),
    modifyTime: new Date(Random.date()),
    enabled: Random.boolean()
  })
}

export default [
  {
    url: '/api/hypervisor/authority/tree',
    method: 'get',
    response: () => {
      return treeDatas;
    },
  },
  {
    url: '/api/hypervisor/authority',
    method: 'get',
    response: (options: any) => {
      const url = options.url
      if (url.split('?').length == 1) {
        const path = url.substring(url.lastIndexOf('/') + 1)
        if (path === "authority") {
          return datas.slice(0, 6)
        } else if (path === "role") {
          return roles
        } else {
          const code = url.substring(url.lastIndexOf('/') + 1)
          return datas.filter(item => item.code === code)[0]
        }
      } else if (url.split('?').length > 1) {
        const params: any = parse(url)
        pagation.totalElements = datas.length
        pagation.content = datas.slice(params.page * params.size, (parseInt(params.page) + 1) * params.size)
        return pagation
      }
    },
  },
  {
    url: '/api/hypervisor/authority',
    method: 'put',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      return datas.filter(item => item.code === code)[0]
    }
  },
  {
    url: '/api/hypervisor/authority',
    method: 'post',
    response: (options: any) => {
      let data: Authority = JSON.parse(options.body)
      data = { ...data, code: Random.id() }
      return data
    }
  },
  {
    url: '/api/hypervisor/authority',
    method: 'patch',
    response: (options: any) => {
      const code = options.url.substring(options.url.lastIndexOf('/') + 1)
      let data = JSON.parse(options.body)
      if (!data) {
        return true
      }
      data = datas.filter(item => item.code === code)[0]
      data.enabled = !data.enabled
      return data
    },
  },
  {
    url: '/api/hypervisor/authority',
    method: 'delete',
    response: () => {
      return {}
    }
  }
]