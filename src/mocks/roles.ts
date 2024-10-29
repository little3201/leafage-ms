import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'
import type { Role, RolePrivileges, RoleMembers } from 'src/models'

const datas: Role[] = []

for (let i = 0; i < 20; i++) {
  const data: Role = {
    id: i,
    name: 'role_' + i,
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

const privileges: RolePrivileges[] = []

for (let i = 1; i < 28; i++) {
  const row: RolePrivileges = {
    id: i,
    privilegeId: i,
    roleId: i
  }
  privileges.push(row)
}

const members: RoleMembers[] = []

for (let i = 1; i < 28; i++) {
  const row: RoleMembers = {
    id: i,
    username: 'username' + i,
    roleId: i
  }
  members.push(row)
}

export const rolesHandlers = [
  http.get(`/api${SERVER_URL.ROLE}/:id/privileges`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(privileges.filter(item => item.roleId === Number(id)))
    } else {
      return HttpResponse.json([])
    }
  }),
  http.get(`/api${SERVER_URL.ROLE}/:id/members`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(members.filter(item => item.roleId === Number(id)))
    } else {
      return HttpResponse.json([])
    }
  }),
  http.get(`/api${SERVER_URL.ROLE}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.ROLE}`, ({ request }) => {
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
  http.post(`/api${SERVER_URL.ROLE}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Role

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete(`/api${SERVER_URL.ROLE}:id`, ({ params }) => {
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
