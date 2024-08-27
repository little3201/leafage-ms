import { http, HttpResponse } from 'msw'
import type { Privilege, PrivilegeTreeNode } from 'src/models'

const datas: Privilege[] = [
  {
    id: 1,
    path: '/system',
    component: '#',
    redirect: '/system/users',
    name: 'system',
    order: 1,
    enabled: true,
    icon: 'sym_r_settings',
    description: 'this is description for this row'
  },
  {
    id: 7,
    path: '/logs',
    component: '#',
    redirect: '/logs/operation',
    name: 'logs',
    order: 2,
    enabled: true,
    icon: 'sym_r_lab_profile',
    description: 'this is description for this row'
  },
  {
    id: 12,
    path: '/regions',
    component: '#',
    name: 'regions',
    redirect: '/regions',
    order: 3,
    enabled: true,
    icon: 'sym_r_location_on',
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
    order: 1,
    enabled: true,
    icon: 'sym_r_group',
    description: 'this is description for this row'
  },
  {
    id: 3,
    superiorId: 1,
    path: 'users',
    component: 'pages/system/users/IndexPage',
    name: 'users',
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 1,
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
    order: 2,
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
    order: 3,
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
    order: 4,
    enabled: true,
    icon: 'sym_r_event_note',
    description: 'this is description for this row'
  },
  {
    id: 13,
    superiorId: 12,
    path: '',
    component: 'pages/regions/IndexPage',
    name: 'regions',
    order: 1,
    enabled: true,
    icon: 'sym_r_location_on',
    description: 'this is description for this row'
  }
]

const treeNodes: PrivilegeTreeNode[] = [
  {
    id: 1,
    path: '/system',
    component: '#',
    redirect: '/system/users',
    name: 'system',
    icon: 'sym_r_settings',
    children: [
      {
        id: 2,
        path: 'groups',
        component: 'pages/system/groups/IndexPage',
        name: 'groups',
        icon: 'sym_r_group'
      },
      {
        id: 3,
        path: 'users',
        component: 'pages/system/users/IndexPage',
        name: 'users',
        icon: 'sym_r_person'
      },
      {
        id: 4,
        path: 'privileges',
        component: 'pages/system/privileges/IndexPage',
        name: 'privileges',
        icon: 'sym_r_admin_panel_settings'
      },
      {
        id: 5,
        path: 'roles',
        component: 'pages/system/roles/IndexPage',
        name: 'roles',
        icon: 'sym_r_shield_person'
      },
      {
        id: 6,
        path: 'dictionaries',
        component: 'pages/system/dictionaries/IndexPage',
        name: 'dictionaries',
        icon: 'sym_r_book_3'
      }
    ]
  },
  {
    id: 7,
    path: '/logs',
    component: '#',
    redirect: '/logs/operation',
    name: 'logs',
    icon: 'sym_r_lab_profile',
    children: [
      {
        id: 8,
        path: 'operation',
        component: 'pages/logs/operation/IndexPage',
        name: 'operationLog',
        icon: 'sym_r_clinical_notes'
      },
      {
        id: 9,
        path: 'access',
        component: 'pages/logs/access/IndexPage',
        name: 'accessLog',
        icon: 'sym_r_sticky_note_2'
      },
      {
        id: 10,
        path: 'audit',
        component: 'pages/logs/audit/IndexPage',
        name: 'auditLog',
        icon: 'sym_r_note_alt'
      },
      {
        id: 11,
        path: 'scheduler',
        component: 'pages/logs/scheduler/IndexPage',
        name: 'schedulerLog',
        icon: 'sym_r_event_note'
      }
    ]
  },
  {
    id: 12,
    path: '/regions',
    component: '#',
    name: 'regions',
    redirect: '/regions',
    icon: 'sym_r_location_on',
    children: [
      {
        id: 13,
        path: '',
        component: 'pages/regions/IndexPage',
        name: 'regions-index',
        icon: 'sym_r_location_on',
        hidden: true
      }
    ]
  }
]

export const privilegessHandlers = [
  http.get('/api/privileges/:username/tree', ({ params }) => {
    const { username } = params
    console.log(username)
    return HttpResponse.json(treeNodes)
  }),
  http.get('/api/privileges/:id/subset', ({ params }) => {
    const { id } = params
    return HttpResponse.json(subDatas.filter(item => item.superiorId === Number(id)))
  }),
  http.get('/api/privileges/:id', ({ params }) => {
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
  http.get('/api/privileges', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    const data = {
      content: Array.from(datas.slice((Number(page) - 1) * Number(size), Number(page) * Number(size))),
      totalElements: datas.length
    }

    return HttpResponse.json(data)
  }),
  http.post('/api/privileges', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Privilege

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete('/api/privileges/:id', ({ params }) => {
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
