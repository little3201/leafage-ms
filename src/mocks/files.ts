import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { FileRecord } from 'src/types'

const datas: FileRecord[] = [
]

for (let i = 1; i < 28; i++) {
  const data: FileRecord = {
    id: i,
    name: 'file_name_' + i,
    type: i % 3 > 0 ? 'File' : 'Media',
    size: 86756 + i,
    lastModifiedDate: new Date()
  }
  datas.push(data)
}

export const filesHandlers = [
  http.get(`/api${SERVER_URL.FILE}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.FILE}`, ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Row
    // as the response body.
    const data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      page: {
        totalElements: datas.length
      }
    }

    return HttpResponse.json(data)
  }),
  http.post(`/api${SERVER_URL.FILE}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as FileRecord

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.put(`/api${SERVER_URL.FILE}/:id`, async ({ params }) => {
    // Read the intercepted request body as JSON.
    const { id } = params

    return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
  }),
  http.delete(`/api${SERVER_URL.FILE}`, ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params

    // Let's attempt to grab the Row by its ID.
    const deletedData = datas.filter(item => item.id === Number(id))

    // Respond with a "404 Not Found" response if the given
    // Row ID does not exist.
    if (!deletedData) {
      return new HttpResponse(null, { status: 404 })
    }

    // Delete the Row from the "allRow" map.
    datas.pop()

    // Respond with a "200 OK" response and the deleted Row.
    return HttpResponse.json(deletedData)
  })
]
