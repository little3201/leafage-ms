import { http, HttpResponse } from 'msw'
import type { OperationLog } from 'src/models'

const datas: OperationLog[] = [
  {
    id: 1,
    module: 'System',
    operator: 'admin',
    operation: 'Create User',
    method: 'POST',
    params: '{"operator:"john", "role:"admin"}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 2,
    module: 'System',
    operator: 'john',
    operation: 'Update Profile',
    method: 'PUT',
    params: '{"email:"john@example.com"}',
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 3,
    module: 'System',
    operator: 'alice',
    operation: 'Delete Post',
    method: 'DELETE',
    params: '{"post_id:123}',
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 4,
    module: 'System',
    operator: 'bob',
    operation: 'Upload File',
    method: 'POST',
    params: '{"file_name:"report.pdf"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 0,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 5,
    module: 'System',
    operator: 'carol',
    operation: 'Login',
    method: 'POST',
    params: '{}',
    ip: '192.168.0.5',
    location: 'Paris',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 6,
    module: 'System',
    operator: 'dave',
    operation: 'Logout',
    method: 'POST',
    params: '{}',
    ip: '192.168.0.6',
    location: 'Tokyo',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 7,
    module: 'System',
    operator: 'admin',
    operation: 'Change Password',
    method: 'PUT',
    params: '{"id:2}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 8,
    module: 'System',
    operator: 'john',
    operation: 'View Report',
    method: 'GET',
    params: '{"report_id:45}',
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 9,
    module: 'System',
    operator: 'alice',
    operation: 'Download File',
    method: 'GET',
    params: '{"file_id:789}',
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 10,
    module: 'System',
    operator: 'bob',
    operation: 'Update Settings',
    method: 'PUT',
    params: '{"settings:{"theme:"dark"}}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 11,
    module: 'System',
    operator: 'bob',
    operation: 'Update Settings',
    method: 'PUT',
    params: '{"settings:{"theme:"dark"}}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  }
]

export const operationLogsHandlers = [
  http.get('/api/operation-logs/:id', ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get('/api/operation-logs', ({ request }) => {
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
  http.delete('/api/operation-logs/:id', ({ params }) => {
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
