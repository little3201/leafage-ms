import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { User } from 'src/models'

const datas: User[] = []

for (let i = 0; i < 20; i++) {
  const data: User = {
    id: i,
    username: 'username' + i,
    fullName: 'fullName_' + i,
    avatar: '/images/avatar.jpg',
    email: 'username' + i + '@test.com',
    enabled: i % 2 > 0,
    accountNonLocked: i % 3 > 0,
    accountExpiresAt: i > 3 ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 28) : undefined,
    credentialsExpiresAt: i > 3 ? new Date(new Date().getFullYear() + 1, 12, 30) : undefined,
    lastModifiedDate: new Date()
  }
  datas.push(data)
}

export const usersHandlers = [
  http.get(`/api${SERVER_URL.USER}/me`, () => {
    return HttpResponse.json(datas[0])
  }),
  http.get(`/api${SERVER_URL.USER}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.USER}`, ({ request }) => {
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
  http.post(`/api${SERVER_URL.USER}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as User

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete(`/api${SERVER_URL.USER}/:id`, ({ params }) => {
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
