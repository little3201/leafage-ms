import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'
import type { Group, GroupMembers, TreeNode } from 'src/models'

const datas: Group[] = []

for (let i = 1; i < 20; i++) {
  const data: Group = {
    id: i,
    name: 'group_' + i,
    principal: i < 6 ? 'https://cdn.quasar.dev/img/avatar' + i + '.jpg' : '',
    enabled: i % 3 > 0,
    description: 'This is row description about xxx',
    lastModifiedDate: new Date()
  }
  const members = []
  for (let j = 1; j < 7; j++) {
    members.push('https://cdn.quasar.dev/img/avatar' + j + '.jpg')
  }
  data.members = members
  datas.push(data)
}

const treeNodes: TreeNode[] = [
  {
    id: 1,
    name: 'group_1',
    children: [
      {
        id: 2,
        name: 'group_2',
        children: [
        ]
      },
      {
        id: 3,
        name: 'group_3',
        children: [
          {
            id: 4,
            name: 'group_4',
            children: [
            ]
          }
        ]
      }
    ]
  }
]

const members: GroupMembers[] = []

for (let i = 1; i < 4; i++) {
  const row: GroupMembers = {
    id: i,
    username: 'username' + i,
    groupId: i
  }
  members.push(row)
}

export const groupsHandlers = [
  http.get(`/api${SERVER_URL.GROUP}/tree`, () => {
    return HttpResponse.json(treeNodes)
  }),
  http.get(`/api${SERVER_URL.GROUP}/:id/members`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(members.filter(item => item.groupId === Number(id)))
    } else {
      return HttpResponse.json([])
    }
  }),
  http.get(`/api${SERVER_URL.GROUP}`, ({ request }) => {
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
  http.post(`/api${SERVER_URL.GROUP}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Group

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete(`/api${SERVER_URL.GROUP}/:id`, ({ params }) => {
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
