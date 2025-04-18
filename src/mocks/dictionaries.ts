import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { Dictionary } from 'src/types'

const datas: Dictionary[] = []
const subDatas: Dictionary[] = []

for (let i = 0; i < 90; i++) {
  const data: Dictionary = {
    id: i,
    name: 'dictionary_' + i,
    enabled: i % 3 > 0,
    description: 'This is dictionary description about xxx',
    lastModifiedDate: new Date()
  }
  for (let j = 0; j < i; j++) {
    const subData: Dictionary = {
      id: j,
      name: 'dictionary_' + i + '_' + j,
      superiorId: i,
      enabled: j % 2 > 0,
      description: 'description',
      lastModifiedDate: new Date()
    }
    subDatas.push(subData)
  }
  datas.push(data)
}

export const dictionariesHandlers = [
  http.get(`/api${SERVER_URL.DICTIONARY}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      let array = datas.filter(item => item.id === Number(id))
      if (array.length === 0) {
        array = subDatas.filter(item => item.id === Number(id))
      }
      return HttpResponse.json(array[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.DICTIONARY}/:id/subset`, ({ params }) => {
    const superiorId = params.id
    return HttpResponse.json(subDatas.filter(item => item.superiorId === Number(superiorId)))
  }),
  http.get(`/api${SERVER_URL.DICTIONARY}`, ({ request }) => {
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
  http.post(`/api${SERVER_URL.DICTIONARY}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Dictionary

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.put(`/api${SERVER_URL.DICTIONARY}/:id`, async ({ params }) => {
    // Read the intercepted request body as JSON.
    const { id } = params

    return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
  }),
  http.patch(`/api${SERVER_URL.DICTIONARY}/:id`, async ({ params }) => {
    // Read the intercepted request body as JSON.
    const { id } = params

    return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
  }),
  http.delete(`/api${SERVER_URL.DICTIONARY}/:id`, ({ params }) => {
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
