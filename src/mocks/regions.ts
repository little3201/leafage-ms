import { http, HttpResponse } from 'msw'
import type { Region } from 'src/models'

const datas: Region[] = []
const subDatas: Region[] = []

for (let i = 0; i < 34; i++) {
  const data: Region = {
    id: i,
    name: 'region_' + i,
    areaCode: (11 + i) * 10000,
    postalCode: (11 + i),
    enabled: i % 3 > 0,
    description: 'This is region description about xxx',
    lastModifiedDate: new Date()
  }
  for (let j = 0; j < i; j++) {
    const subData: Region = {
      id: j,
      name: 'region_' + i + '_' + j,
      superiorId: i,
      areaCode: data.areaCode + j,
      postalCode: data.postalCode + j,
      enabled: j % 2 > 0,
      description: 'This is region description about xxx',
      lastModifiedDate: new Date()
    }
    subDatas.push(subData)
  }
  datas.push(data)
}

export const regionsHandlers = [
  http.get('/api/regions/:id/subset', ({ params, request }) => {
    const superiorId = params.id

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
      const result = subDatas.filter(item => item.superiorId === Number(superiorId)).filter(item => item.name.includes(filter)).slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))
      data = {
        content: result,
        totalElements: result.length
      }
      return HttpResponse.json(data)
    }
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    data = {
      content: Array.from(subDatas.filter(item => item.superiorId === Number(superiorId)).slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      totalElements: datas.length
    }

    return HttpResponse.json(data)
  }),
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
      content: Array.from(datas.slice((Number(page) - 1) * Number(size), Number(page) * Number(size))),
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
