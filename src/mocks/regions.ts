import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'
import type { Region } from 'src/models'

const datas: Region[] = []
const subDatas: Region[] = []

for (let i = 1; i < 34; i++) {
  const data: Region = {
    id: i,
    name: 'region_' + i,
    areaCode: Math.floor(Math.random() * 100),
    postalCode: Math.floor(Math.random() * 3000),
    enabled: i % 3 > 0,
    description: 'This is row description about xxx'
  }
  for (let j = 1; j < i; j++) {
    const subData: Region = {
      id: 100 + j,
      name: 'region_' + i + '_' + j,
      superiorId: i,
      areaCode: Math.floor(Math.random() * 1000),
      postalCode: Math.floor(Math.random() * 3000) + j * 100,
      enabled: j % 2 > 0,
      description: 'This is region description about xxx'
    }
    subDatas.push(subData)
  }
  datas.push(data)
}

export const regionsHandlers = [
  http.get(`/api${SERVER_URL.REGION}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      let res = datas.filter(item => item.id === Number(id))[0]
      if (!res) {
        res = subDatas.filter(item => item.id === Number(id))[0]
      }
      return HttpResponse.json(res)
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.REGION}`, ({ request }) => {
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
      const result = datas.filter(item => item.name.includes(filter))
        .slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))
      data = {
        content: result,
        page: {
          totalElements: datas.length
        }
      }
      return HttpResponse.json(data)
    }
    // Construct a JSON response with the list of all Dictionarys
    // as the response body.
    data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      page: {
        page: {
          totalElements: datas.length
        }
      }
    }

    return HttpResponse.json(data)
  }),
  http.post(`/api${SERVER_URL.REGION}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Region

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.delete(`/api${SERVER_URL.REGION}/:id`, ({ params }) => {
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
