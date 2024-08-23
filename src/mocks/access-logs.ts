import { http, HttpResponse } from 'msw'
import type { AccessLog } from 'src/models'

const datas: AccessLog[] = [
  {
    id: 1,
    operator: 'admin',
    api: '/api/users',
    method: 'POST',
    params: '{"operator:"john", "role:"admin"}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    responseTime: 120,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 2,
    operator: 'john',
    api: '/api/profile',
    method: 'PUT',
    params: '{"email:"john@example.com"}',
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    responseTime: 100,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 3,
    operator: 'alice',
    api: '/api/posts/123',
    method: 'DELETE',
    params: null,
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    responseTime: 150,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 4,
    operator: 'bob',
    api: '/api/files',
    method: 'POST',
    params: '{"file_name:"report.pdf"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 0,
    responseTime: 300,
    responseCode: 400,
    responseMessage: 'File too large'
  },
  {
    id: 5,
    operator: 'carol',
    api: '/api/login',
    method: 'POST',
    params: '{}',
    ip: '192.168.0.5',
    location: 'Paris',
    status: 1,
    responseTime: 80,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 6,
    operator: 'dave',
    api: '/api/logout',
    method: 'POST',
    params: '{}',
    ip: '192.168.0.6',
    location: 'Tokyo',
    status: 1,
    responseTime: 90,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 7,
    operator: 'admin',
    api: '/api/users/2/password',
    method: 'PUT',
    params: '{"new_password:"secret"}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    responseTime: 110,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 8,
    operator: 'john',
    api: '/api/reports/45',
    method: 'GET',
    params: null,
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    responseTime: 130,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 9,
    operator: 'alice',
    api: '/api/files/789',
    method: 'GET',
    params: null,
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    responseTime: 140,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 10,
    operator: 'bob',
    api: '/api/settings',
    method: 'PUT',
    params: '{"settings:{"theme:"dark"}}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    responseTime: 115,
    responseCode: 200,
    responseMessage: 'Success'
  },
  {
    id: 11,
    operator: 'bob',
    api: '/api/settings',
    method: 'PUT',
    params: '{"settings:{"theme:"dark"}}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    responseTime: 115,
    responseCode: 200,
    responseMessage: 'Success'
  }
]

export const accessLogsHandlers = [
  http.get('/api/access-logs/:id', ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get('/api/access-logs', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Role
    // as the response body.
    const data = {
      content: Array.from(datas.slice((Number(page) - 1) * Number(size), Number(page) * Number(size))),
      totalElements: datas.length
    }

    return HttpResponse.json(data)
  }),
  http.delete('/api/access-logs/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params

    // Let's attempt to grab the Role by its ID.
    const deletedData = datas.filter(item => item.id === Number(id))

    // Respond with a "404 Not Found" response if the given
    // Role ID does not exist.
    if (!deletedData) {
      return new HttpResponse(null, { status: 404 })
    }

    // Delete the Role from the "allRole" map.
    datas.pop()

    // Respond with a "200 OK" response and the deleted Role.
    return HttpResponse.json(deletedData)
  })
]
