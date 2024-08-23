import { http, HttpResponse } from 'msw'
import type { AuditLog } from 'src/models'

const datas: AuditLog[] = [
  {
    id: 1,
    operator: 'admin',
    operation: 'Create',
    resource: 'User',
    oldValue: null,
    newValue: '{"operator:"john", "role:"admin"}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 2,
    operator: 'john',
    operation: 'Update',
    resource: 'Profile',
    oldValue: '{"email:"old@example.com"}',
    newValue: '{"email:"john@example.com"}',
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 3,
    operator: 'alice',
    operation: 'Delete',
    resource: 'Post',
    oldValue: '{"post_id:123, "content:"Hello World"}',
    newValue: null,
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 4,
    operator: 'bob',
    operation: 'Upload',
    resource: 'File',
    oldValue: null,
    newValue: '{"file_name:"report.pdf"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 0,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 5,
    operator: 'carol',
    operation: 'Login',
    resource: 'Session',
    oldValue: null,
    newValue: '{"status:"active"}',
    ip: '192.168.0.5',
    location: 'Paris',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 6,
    operator: 'dave',
    operation: 'Logout',
    resource: 'Session',
    oldValue: '{"status:"active"}',
    newValue: '{"status:"inactive"}',
    ip: '192.168.0.6',
    location: 'Tokyo',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 7,
    operator: 'admin',
    operation: 'Change Password',
    resource: 'User',
    oldValue: '{"id:2, "password:"old"}',
    newValue: '{"id:2, "password:"new"}',
    ip: '192.168.0.1',
    location: 'New York',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 8,
    operator: 'john',
    operation: 'View',
    resource: 'Report',
    oldValue: null,
    newValue: '{"report_id:45}',
    ip: '192.168.0.2',
    location: 'London',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 9,
    operator: 'alice',
    operation: 'Download',
    resource: 'File',
    oldValue: null,
    newValue: '{"file_id:789}',
    ip: '192.168.0.3',
    location: 'San Francisco',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 10,
    operator: 'bob',
    operation: 'Update',
    resource: 'Settings',
    oldValue: '{"theme:"light"}',
    newValue: '{"theme:"dark"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  },
  {
    id: 11,
    operator: 'bob',
    operation: 'Update',
    resource: 'Settings',
    oldValue: '{"theme:"light"}',
    newValue: '{"theme:"dark"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    status: 1,
    operatedTime: '2024-07-01T00:00:00'
  }
]

export const auditLogsHandlers = [
  http.get('/api/audit-logs/:id', ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get('/api/audit-logs', ({ request }) => {
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
  http.delete('/api/audit-logs/:id', ({ params }) => {
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
