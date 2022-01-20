import { Random } from 'mockjs'

import { Authority, Role } from '@/api/request'
import { parse } from '@/api/util';

const datas: Array<Authority> = [
  {
    "code": "21224PV6C",
    "modifyTime": Random.date(),
    "superior": "System",
    "name": "Role",
    "type": "M",
    "icon": "pocket",
    "path": "/role",
    "description": "角色",
    "count": 1
  },
  {
    "code": "212240439",
    "modifyTime": Random.date(),
    "superior": "System",
    "name": "Authority",
    "type": "M",
    "icon": "power",
    "path": "/authority",
    "description": "权限",
    "count": 1
  },
  {
    "code": "2133U754",
    "modifyTime": Random.date(),
    "superior": "Authority",
    "name": "Add",
    "type": "B",
    "icon": "plus-circle",
    "path": "/",
    "description": "新增",
    "count": 0
  },
  {
    "code": "203315P3Q",
    "modifyTime": Random.date(),
    "superior": "System",
    "name": "User",
    "type": "M",
    "icon": "user",
    "path": "/user",
    "description": "用户",
    "count": 1
  },
  {
    "code": "21224DRMU",
    "modifyTime": Random.date(),
    "superior": "",
    "name": "System",
    "type": "M",
    "icon": "layers",
    "path": "/system",
    "description": "系统管理",
    "count": 1
  },
  {
    "code": "2122466RP",
    "modifyTime": Random.date(),
    "superior": '',
    "name": "Dashboard",
    "type": "M",
    "icon": "home",
    "path": "/",
    "description": "控制台",
    "count": 1
  },
  {
    "code": "21224B8JZ",
    "modifyTime": Random.date(),
    "superior": "",
    "name": "Posts",
    "type": "M",
    "icon": "book",
    "path": "/posts",
    "description": "帖子管理",
    "count": 1
  },
  {
    "code": "21224QI72",
    "modifyTime": Random.date(),
    "superior": "",
    "name": "Resource",
    "type": "M",
    "icon": "monitor",
    "path": "/resource",
    "description": "作品管理",
    "count": 1
  },
  {
    "code": "21224HMLG",
    "modifyTime": Random.date(),
    "superior": "",
    "name": "Category",
    "type": "M",
    "icon": "tag",
    "path": "/category",
    "description": "类目管理",
    "count": 1
  },
  {
    "code": "21224UJ5C",
    "modifyTime": Random.date(),
    "superior": "System",
    "name": "Group",
    "type": "M",
    "icon": "users",
    "path": "/group",
    "description": "分组",
    "count": 1
  }
];

const treeDatas = [
  {
    "code": "2122466RP",
    "name": "Dashboard",
    "superior": "2122466RP",
    "expand": {
      "path": "/",
      "icon": "home"
    },
    "children": []
  },
  {
    "code": "21224B8JZ",
    "name": "Posts",
    "superior": "21224B8JZ",
    "expand": {
      "path": "/posts",
      "icon": "book"
    },
    "children": [
      {
        "code": "2194F8PU",
        "name": "Delete",
        "superior": "Posts",
        "expand": {
          "icon": "trash-2",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194F12W",
        "name": "Edit",
        "superior": "Posts",
        "expand": {
          "icon": "edit-3",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194GITT",
        "name": "Add",
        "superior": "Posts",
        "expand": {
          "icon": "plus-circle",
          "path": null
        },
        "children": []
      }
    ]
  },
  {
    "code": "21224QI72",
    "name": "Resource",
    "superior": "21224QI72",
    "expand": {
      "path": "/resource",
      "icon": "monitor"
    },
    "children": [
      {
        "code": "2194DRS4",
        "name": "Edit",
        "superior": "Resource",
        "expand": {
          "icon": "edit-3",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194S7BM",
        "name": "Delete",
        "superior": "Resource",
        "expand": {
          "icon": "trash-2",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194V6H0",
        "name": "Add",
        "superior": "Resource",
        "expand": {
          "icon": "plus-circle",
          "path": null
        },
        "children": []
      }
    ]
  },
  {
    "code": "21224HMLG",
    "name": "Category",
    "superior": "21224HMLG",
    "expand": {
      "path": "/category",
      "icon": "tag"
    },
    "children": [
      {
        "code": "2194B8H4",
        "name": "Edit",
        "superior": "Category",
        "expand": {
          "icon": "edit-3",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194L73Y",
        "name": "Delete",
        "superior": "Category",
        "expand": {
          "icon": "trash-2",
          "path": null
        },
        "children": []
      },
      {
        "code": "2194GDCU",
        "name": "Add",
        "superior": "Category",
        "expand": {
          "icon": "plus-circle",
          "path": null
        },
        "children": []
      }
    ]
  },
  {
    "code": "21953KO8",
    "name": "Region",
    "superior": "21953KO8",
    "expand": {
      "path": "/region",
      "icon": "map-pin"
    },
    "children": []
  },
  {
    "code": "21224DRMU",
    "name": "System",
    "superior": "21224DRMU",
    "expand": {
      "path": "/system",
      "icon": "layers"
    },
    "children": [
      {
        "code": "203315P3Q",
        "name": "User",
        "superior": "System",
        "expand": {
          "icon": "user",
          "path": "/user"
        },
        "children": [
          {
            "code": "2194SU9R",
            "name": "Delete",
            "superior": "User",
            "expand": {
              "icon": "trash-2",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194AKOP",
            "name": "Groups",
            "superior": "User",
            "expand": {
              "icon": "users",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194G49U",
            "name": "Roles",
            "superior": "User",
            "expand": {
              "icon": "pocket",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194Z7HC",
            "name": "Edit",
            "superior": "User",
            "expand": {
              "icon": "edit-3",
              "path": null
            },
            "children": []
          }
        ]
      },
      {
        "code": "21224UJ5C",
        "name": "Group",
        "superior": "System",
        "expand": {
          "icon": "users",
          "path": "/group"
        },
        "children": [
          {
            "code": "2194RXT4",
            "name": "Delete",
            "superior": "Group",
            "expand": {
              "icon": "trash-2",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194Q2RT",
            "name": "Edit",
            "superior": "Group",
            "expand": {
              "icon": "edit-3",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194BZO4",
            "name": "Add",
            "superior": "Group",
            "expand": {
              "icon": "plus-circle",
              "path": null
            },
            "children": []
          }
        ]
      },
      {
        "code": "21224PV6C",
        "name": "Role",
        "superior": "System",
        "expand": {
          "icon": "pocket",
          "path": "/role"
        },
        "children": [
          {
            "code": "2194SZ23",
            "name": "Edit",
            "superior": "Role",
            "expand": {
              "icon": "edit-3",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194KWGL",
            "name": "Delete",
            "superior": "Role",
            "expand": {
              "icon": "trash-2",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194GIX1",
            "name": "Auz",
            "superior": "Role",
            "expand": {
              "icon": "power",
              "path": null
            },
            "children": []
          },
          {
            "code": "2194XE80",
            "name": "Add",
            "superior": "Role",
            "expand": {
              "icon": "plus-circle",
              "path": null
            },
            "children": []
          }
        ]
      },
      {
        "code": "212240439",
        "name": "Authority",
        "superior": "System",
        "expand": {
          "icon": "power",
          "path": "/authority"
        },
        "children": [
          {
            "code": "2133U754",
            "name": "Add",
            "superior": "Authority",
            "expand": {
              "icon": "plus-circle",
              "path": "/"
            },
            "children": []
          },
          {
            "code": "2133PDV0",
            "name": "Edit",
            "superior": "Authority",
            "expand": {
              "icon": "edit-3",
              "path": "/{code}"
            },
            "children": []
          },
          {
            "code": "2133N9G7",
            "name": "Delete",
            "superior": "Authority",
            "expand": {
              "icon": "trash-2",
              "path": "/{code}"
            },
            "children": []
          }
        ]
      }
    ]
  }
]

const roleDatas: Array<Role> = [];

for (let i = 0; i < 9; i++) {
  roleDatas.push({
    code: Random.id(),
    name: Random.word(),
    superior: Random.word(),
    count: Random.integer(1, 99),
    description: Random.csentence(),
    modifyTime: Random.date()
  })
}

export default [
  {
    url: '/api/hypervisor/authority/count',
    method: 'get',
    response: () => {
      return datas.length
    },
  },
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
      let url = options.url
      if (url.split('?').length == 1 && url.substring(url.lastIndexOf('/') + 1) !== "role") {
        return datas.slice(1, 6)
      } else if (url.split('?').length > 1) {
        let params: any = parse(url)
        return datas.slice(params.page * params.size, (params.page + 1) * params.size)
      } else if (url.substring(url.lastIndexOf('/') + 1) === "role") {
        return roleDatas
      } else {
        let code = url.substring(url.lastIndexOf('/') + 1)
        return datas.filter(item => item.code === code)[0]
      }
    },
  },
  {
    url: '/api/hypervisor/authority',
    method: 'put',
    response: (options: any) => {
      let code = options.url.substring(options.url.lastIndexOf('/') + 1)
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
    method: 'delete',
    response: () => {
      return {}
    }
  }
]