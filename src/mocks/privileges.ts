import { http, HttpResponse } from 'msw'
import type { Privilege } from 'src/models'

const datas: Privilege[] = []
const subDatas: Privilege[] = []

for (let i = 0; i < 20; i++) {
  const data: Privilege = {
    id: i,
    name: 'privilege_' + i,
    path: '/privilege_' + i,
    icon: 'sym_r_home',
    enabled: i % 3 > 0,
    description: 'This is privilege description about xxx',
    lastModifiedDate: new Date()
  }
  for (let j = 0; j < i; j++) {
    const subData: Privilege = {
      id: j,
      name: 'privilege_' + i + '_' + j,
      superiorId: i,
      path: 'privilege_' + i + '_' + j,
      icon: 'sym_r_group',
      enabled: j % 2 > 0,
      description: 'description',
      lastModifiedDate: new Date()
    }
    subDatas.push(subData)
  }
  datas.push(data)
}

export const privilegessHandlers = [
  http.get('/api/privileges/:id/subset', ({ params }) => {
    const superiorId = params.id
    return HttpResponse.json(subDatas.filter(item => item.superiorId === Number(superiorId)))
  }),
  http.get('/api/privileges', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    const data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
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
