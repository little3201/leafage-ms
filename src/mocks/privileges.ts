import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'
import type { Privilege, PrivilegeTreeNode } from 'src/models'

const datas: Privilege[] = [
  {
    id: 1,
    path: 'system',
    component: '#',
    redirect: '/system/users',
    name: 'system',
    icon: 'sym_r_settings',
    count: 5,
    enabled: true,
    description: 'this is description for this row'
  },
  {
    id: 7,
    path: 'logs',
    component: '#',
    redirect: '/logs/operation',
    name: 'logs',
    icon: 'sym_r_lab_profile',
    count: 3,
    enabled: true,
    description: 'this is description for this row'
  },
  {
    id: 12,
    path: 'regions',
    component: 'pages/regions/IndexPage',
    name: 'regions',
    icon: 'sym_r_location_on',
    actions: ['create', 'modify', 'remove', 'import', 'export'],
    count: 0,
    enabled: true,
    description: 'this is description for this row'
  },
  {
    id: 14,
    path: 'files',
    component: 'pages/files/IndexPage',
    name: 'files',
    icon: 'sym_r_folder_open',
    actions: ['upload', 'download', 'remove'],
    count: 0,
    enabled: true,
    description: 'this is description for this row'
  },
  {
    id: 16,
    path: 'exploiters',
    component: '#',
    name: 'exploiters',
    redirect: '/exploiters/generators',
    icon: 'sym_r_build',
    count: 1,
    enabled: true,
    description: 'this is description for this row'
  }
]

const subDatas: Privilege[] = [
  {
    id: 2,
    superiorId: 1,
    path: 'groups',
    component: 'pages/system/groups/IndexPage',
    name: 'groups',
    actions: ['create', 'modify', 'remove', 'import', 'export', 'relation'],
    count: 0,
    enabled: true,
    icon: 'sym_r_account_tree',
    description: 'this is description for this row'
  },
  {
    id: 3,
    superiorId: 1,
    path: 'users',
    component: 'pages/system/users/IndexPage',
    name: 'users',
    actions: ['create', 'modify', 'remove', 'import', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_person',
    description: 'this is description for this row'
  },
  {
    id: 4,
    superiorId: 1,
    path: 'privileges',
    component: 'pages/system/privileges/IndexPage',
    name: 'privileges',
    actions: ['modify', 'import', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_admin_panel_settings',
    description: 'this is description for this row'
  },
  {
    id: 5,
    superiorId: 1,
    path: 'roles',
    component: 'pages/system/roles/IndexPage',
    name: 'roles',
    actions: ['create', 'modify', 'remove', 'import', 'export', 'relation'],
    count: 0,
    enabled: true,
    icon: 'sym_r_shield_person',
    description: 'this is description for this row'
  },
  {
    id: 6,
    superiorId: 1,
    path: 'dictionaries',
    component: 'pages/system/dictionaries/IndexPage',
    name: 'dictionaries',
    actions: ['create', 'modify', 'remove', 'import', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_book_3',
    description: 'this is description for this row'
  },
  {
    id: 8,
    superiorId: 7,
    path: 'operation',
    component: 'pages/logs/operation/IndexPage',
    name: 'operationLog',
    actions: ['clear', 'detail', 'export', 'remove'],
    count: 0,
    enabled: true,
    icon: 'sym_r_clinical_notes',
    description: 'this is description for this row'
  },
  {
    id: 9,
    superiorId: 7,
    path: 'access',
    component: 'pages/logs/access/IndexPage',
    name: 'accessLog',
    actions: ['clear', 'detail', 'export', 'remove'],
    count: 0,
    enabled: true,
    icon: 'sym_r_sticky_note_2',
    description: 'this is description for this row'
  },
  {
    id: 10,
    superiorId: 7,
    path: 'audit',
    component: 'pages/logs/audit/IndexPage',
    name: 'auditLog',
    actions: ['detail', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_note_alt',
    description: 'this is description for this row'
  },
  {
    id: 11,
    superiorId: 7,
    path: 'scheduler',
    component: 'pages/logs/scheduler/IndexPage',
    name: 'schedulerLog',
    actions: ['clear', 'detail', 'export', 'remove'],
    count: 0,
    enabled: true,
    icon: 'sym_r_event_note',
    description: 'this is description for this row'
  },
  {
    id: 17,
    superiorId: 16,
    path: 'generators',
    name: 'generators',
    component: 'pages/exploiters/generators/IndexPage',
    actions: ['create', 'modify', 'remove', 'import', 'export', 'config', 'preview'],
    count: 0,
    enabled: true,
    icon: 'sym_r_code',
    description: 'this is description for this row'
  },
  {
    id: 18,
    superiorId: 16,
    path: 'scripts',
    name: 'scripts',
    component: 'pages/exploiters/scripts/IndexPage',
    actions: ['create', 'modify', 'remove', 'import', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_terminal',
    description: 'this is description for this row'
  },
  {
    id: 19,
    superiorId: 16,
    path: 'templates',
    name: 'templates',
    component: 'pages/exploiters/templates/IndexPage',
    actions: ['create', 'modify', 'remove', 'import', 'export'],
    count: 0,
    enabled: true,
    icon: 'sym_r_code',
    description: 'this is description for this row'
  }
]

const treeNodes: PrivilegeTreeNode[] = [
  {
    id: 1,
    name: 'system',
    meta: {
      path: 'system',
      component: '#',
      redirect: '/system/users',
      icon: 'sym_r_settings'
    },
    children: [
      {
        id: 2,
        name: 'groups',
        meta: {
          path: 'groups',
          component: 'pages/system/groups/IndexPage',
          icon: 'sym_r_account_tree'
        }
      },
      {
        id: 3,
        name: 'users',
        meta: {
          path: 'users',
          component: 'pages/system/users/IndexPage',
          icon: 'sym_r_person'
        }
      },
      {
        id: 4,
        name: 'roles',
        meta: {
          path: 'roles',
          component: 'pages/system/roles/IndexPage',
          icon: 'sym_r_shield_person'
        }
      },
      {
        id: 5,
        name: 'dictionaries',
        meta: {
          path: 'dictionaries',
          component: 'pages/system/dictionaries/IndexPage',
          icon: 'sym_r_book_3'
        }
      },
      {
        id: 6,
        name: 'privileges',
        meta: {
          path: 'privileges',
          component: 'pages/system/privileges/IndexPage',
          icon: 'sym_r_admin_panel_settings'
        }
      }
    ]
  },
  {
    id: 7,
    name: 'logs',
    meta: {
      path: 'logs',
      component: '#',
      redirect: '/logs/operation',
      icon: 'sym_r_lab_profile'
    },
    children: [
      {
        id: 8,
        name: 'operationLog',
        meta: {
          path: 'operation',
          component: 'pages/logs/operation/IndexPage',
          icon: 'sym_r_clinical_notes'
        }
      },
      {
        id: 9,
        name: 'accessLog',
        meta: {
          path: 'access',
          component: 'pages/logs/access/IndexPage',
          icon: 'sym_r_sticky_note_2'
        }
      },
      {
        id: 10,
        name: 'auditLog',
        meta: {
          path: 'audit',
          component: 'pages/logs/audit/IndexPage',
          icon: 'sym_r_note_alt'
        }
      },
      {
        id: 11,
        name: 'schedulerLog',
        meta: {
          path: 'scheduler',
          component: 'pages/logs/scheduler/IndexPage',
          icon: 'sym_r_event_note'
        }
      }
    ]
  },
  {
    id: 12,
    name: 'regions',
    meta: {
      path: 'regions',
      component: 'pages/regions/IndexPage',
      icon: 'sym_r_location_on'
    }
  },
  {
    id: 14,
    name: 'files',
    meta: {
      path: 'files',
      component: 'pages/files/IndexPage',
      icon: 'sym_r_folder_open'
    }
  },
  {
    id: 16,
    name: 'exploiters',
    meta: {
      path: 'exploiters',
      component: '#',
      redirect: '/exploiter/generators',
      icon: 'sym_r_build'
    },
    children: [
      {
        id: 17,
        name: 'generators',
        meta: {
          path: 'generators',
          component: 'pages/exploiters/generators/IndexPage',
          icon: 'sym_r_code'
        }
      },
      {
        id: 18,
        name: 'scripts',
        meta: {
          path: 'scripts',
          component: 'pages/exploiters/scripts/IndexPage',
          icon: 'sym_r_terminal'
        }
      },
      {
        id: 17,
        name: 'templates',
        meta: {
          path: 'templates',
          component: 'pages/exploiters/templates/IndexPage',
          icon: 'sym_r_terminal'
        }
      }
    ]
  }
]

export const privilegessHandlers = [
  http.get(`/api${SERVER_URL.PRIVILEGE}/tree`, () => {
    return HttpResponse.json(treeNodes)
  }),
  http.get(`/api${SERVER_URL.PRIVILEGE}/:id/subset`, ({ params }) => {
    const { id } = params
    return HttpResponse.json(subDatas.filter(item => item.superiorId === Number(id)))
  }),
  http.get(`/api${SERVER_URL.PRIVILEGE}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      let res = datas.filter(item => item.id === Number(id))
      if (!res) {
        res = subDatas.filter(item => item.id === Number(id))
      }
      return HttpResponse.json(res)
    }
    return HttpResponse.json(null)
  }),
  http.get(`/api${SERVER_URL.PRIVILEGE}`, ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    const data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      page: {
        totalElements: datas.length
      }
    }

    return HttpResponse.json(data)
  }),
  http.post(`/api${SERVER_URL.PRIVILEGE}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Privilege

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete(`/api${SERVER_URL.PRIVILEGE}/:id`, ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params

    // Let's attempt to grab the Dictionary by its ID.
    const deletedData = datas.filter(item => item.id === Number(id))

    // Respond with a "404 Not Found" response if the given
    // Dictionary ID does not exist.
    if (!deletedData) {
      return new HttpResponse(null, { status: 404 })
    }

    // Delete the Dictionary from the "allDictionarys" map.
    datas.pop()

    // Respond with a "200 OK" response and the deleted Dictionary.
    return HttpResponse.json(deletedData)
  })
]
