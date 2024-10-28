import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'
import type { AuditLog } from 'src/models'

const datas: AuditLog[] = [
  {
    id: 1,
    operator: 'admin',
    operation: 'Create',
    resource: 'User',
    newValue: '{"operator:"john", "role:"admin"}',
    ip: '192.168.0.1',
    location: 'New York',
    statusCode: 200,
    operatedTime: new Date()
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
    statusCode: 203,
    operatedTime: new Date()
  },
  {
    id: 3,
    operator: 'alice',
    operation: 'Delete',
    resource: 'Post',
    oldValue: '{"post_id:123, "content:"Hello World"}',
    ip: '192.168.0.3',
    location: 'San Francisco',
    statusCode: 401,
    operatedTime: new Date()
  },
  {
    id: 4,
    operator: 'bob',
    operation: 'Upload',
    resource: 'File',
    newValue: '{"file_name:"report.pdf"}',
    ip: '192.168.0.4',
    location: 'Berlin',
    statusCode: 200,
    operatedTime: new Date()
  },
  {
    id: 5,
    operator: 'carol',
    operation: 'Login',
    resource: 'Session',
    newValue: '{"statusCode:"active"}',
    ip: '192.168.0.5',
    location: 'Paris',
    statusCode: 500,
    operatedTime: new Date()
  },
  {
    id: 6,
    operator: 'dave',
    operation: 'Logout',
    resource: 'Session',
    oldValue: '{"statusCode:"active"}',
    newValue: '{"statusCode:"inactive"}',
    ip: '192.168.0.6',
    location: 'Tokyo',
    statusCode: 400,
    operatedTime: new Date()
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
    statusCode: 204,
    operatedTime: new Date()
  },
  {
    id: 8,
    operator: 'john',
    operation: 'View',
    resource: 'Report',
    newValue: '{"report_id:45}',
    ip: '192.168.0.2',
    location: 'London',
    statusCode: 404,
    operatedTime: new Date()
  },
  {
    id: 9,
    operator: 'alice',
    operation: 'Download',
    resource: 'File',
    newValue: '{"file_id:789}',
    ip: '192.168.0.3',
    location: 'San Francisco',
    statusCode: 500,
    operatedTime: new Date()
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
    statusCode: 502,
    operatedTime: new Date()
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
    statusCode: 415,
    operatedTime: new Date()
  }
]

export const auditLogsHandlers = [
  http.get(`/api${SERVER_URL.AUDIT_LOG}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.AUDIT_LOG}`, ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')
    // Construct a JSON response with the list of all Role
    // as the response body.
    const data = {
      content: Array.from(datas.slice(Number(page) * Number(size), (Number(page) + 1) * Number(size))),
      page: {
        totalElements: datas.length
      }
    }

    return HttpResponse.json(data)
  }),
  http.delete(`/api${SERVER_URL.AUDIT_LOG}/:id`, ({ params }) => {
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
