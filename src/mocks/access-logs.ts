import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { AccessLog } from 'src/types'

const datas: AccessLog[] = [
  {
    id: 1,
    operator: 'admin',
    url: '/users',
    httpMethod: 'POST',
    body: '{"operator:"john", "role:"admin"}',
    ip: '192.168.0.1',
    location: 'New York',
    responseTimes: 120,
    statusCode: 404,
    responseMessage: 'Non Content'
  },
  {
    id: 2,
    operator: 'john',
    url: '/profile',
    httpMethod: 'PUT',
    body: '{"email:"john@example.com"}',
    ip: '192.168.0.2',
    location: 'London',
    responseTimes: 100,
    statusCode: 502,
    responseMessage: 'Network Error'
  },
  {
    id: 3,
    operator: 'alice',
    url: '/posts/123',
    httpMethod: 'DELETE',
    ip: '192.168.0.3',
    location: 'San Francisco',
    responseTimes: 150,
    statusCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 4,
    operator: 'bob',
    url: '/files',
    httpMethod: 'POST',
    body: '{"file_name:"report.pdf"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    responseTimes: 300,
    statusCode: 400,
    responseMessage: 'File too large'
  },
  {
    id: 5,
    operator: 'carol',
    url: '/login',
    httpMethod: 'POST',
    params: 'username=admin&password=',
    ip: '192.168.0.5',
    location: 'Paris',
    responseTimes: 80,
    statusCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 6,
    operator: 'dave',
    url: '/logout',
    httpMethod: 'POST',
    ip: '192.168.0.6',
    location: 'Tokyo',
    responseTimes: 90,
    statusCode: 500,
    responseMessage: 'Network Request Timeout'
  },
  {
    id: 7,
    operator: 'admin',
    url: '/users/2/password',
    httpMethod: 'PUT',
    body: '{"new_password:"secret"}',
    ip: '192.168.0.1',
    location: 'New York',
    responseTimes: 110,
    statusCode: 200,
    responseMessage: 'Success'
  }
]

export const accessLogsHandlers = [
  http.get(`/api${SERVER_URL.ACCESS_LOG}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json()
    }
  }),
  http.get(`/api${SERVER_URL.ACCESS_LOG}`, ({ request }) => {
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
  http.delete(`/api${SERVER_URL.ACCESS_LOG}/:id`, ({ params }) => {
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
