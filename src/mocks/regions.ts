import { http, HttpResponse } from 'msw'
import type { Region } from 'src/api/models.type'

const datas: Region[] = []

for (let i = 0; i < 20; i++) {
  const data: Region = {
    id: i,
    name: 'region_' + i,
    areaCode: i,
    postalCode: i,
    enabled: i % 3 > 0,
    description: 'description',
    lastModifiedDate: new Date()
  }
  datas.push(data)
}

export const regionsHandlers = [
  http.get('/api/regions', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')

    // sort and filter
    const sortBy = url.searchParams.get('sortBy') as never
    if (sortBy) {
      datas.sort((a: Region, b: Region) => {
        if (a[sortBy] > b[sortBy]) {
          return 1
        }
        if (a[sortBy] < b[sortBy]) {
          return -1
        }
        return 0
      })
    }

    let data = {
    }

    const filter = url.searchParams.get('filter')
    if (filter) {
      const result = datas.filter(item => item.name.includes(filter)).slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))
      data = {
        content: result,
        totalElements: result.length
      }
      return HttpResponse.json(data)
    }
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      totalElements: datas.length
    }

    return HttpResponse.json(data)
  }),
  http.post('/api/regions', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Region

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete('/api/regions/:id', ({ params }) => {
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
