import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { OperationLog } from 'src/types'

const datas: OperationLog[] = [
  {
    id: 1,
    operator: 'admin',
    operation: 'Create User',
    content: 'Create User: username: test',
    ip: '192.168.0.1',
    location: 'New York',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 2,
    operator: 'john',
    operation: 'Update Profile',
    content: 'Change avatar to test.jpg',
    ip: '192.168.0.2',
    location: 'London',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 401,
    operatedTimes: 12121
  },
  {
    id: 3,
    operator: 'alice',
    operation: 'Delete Post',
    content: 'Delete Post: test',
    ip: '192.168.0.3',
    location: 'San Francisco',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 4,
    operator: 'bob',
    operation: 'Upload File',
    content: 'Upload file: test.txt',
    ip: '192.168.0.4',
    location: 'Berlin',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 400,
    operatedTimes: 12121
  },
  {
    id: 5,
    operator: 'carol',
    operation: 'Login',
    content: 'test login',
    ip: '192.168.0.5',
    location: 'Paris',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 6,
    operator: 'dave',
    operation: 'Logout',
    content: 'test logout',
    ip: '192.168.0.6',
    location: 'Tokyo',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 7,
    operator: 'admin',
    operation: 'Change Password',
    content: 'Change password at 2min ago',
    ip: '192.168.0.1',
    location: 'New York',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 8,
    operator: 'john',
    operation: 'View Report',
    content: 'View shceduler report',
    ip: '192.168.0.2',
    location: 'London',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 9,
    operator: 'alice',
    operation: 'Download File',
    content: 'Download file: xxx.txt',
    ip: '192.168.0.3',
    location: 'San Francisco',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 10,
    operator: 'bob',
    operation: 'Update Settings',
    content: 'Update dark mode',
    ip: '192.168.0.4',
    location: 'Berlin',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  },
  {
    id: 11,
    operator: 'bob',
    operation: 'Update Settings',
    content: 'Create theme, set primary to green',
    ip: '192.168.0.4',
    location: 'Berlin',
    os: 'Windows 11',
    browser: 'Edge 129.0.2792.89',
    statusCode: 200,
    operatedTimes: 12121
  }
]

export const operationLogsHandlers = [
  http.get(`/api${SERVER_URL.OPERATION_LOG}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json()
    }
  }),
  http.get(`/api${SERVER_URL.OPERATION_LOG}`, ({ request }) => {
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
  http.delete(`/api${SERVER_URL.OPERATION_LOG}/:id`, ({ params }) => {
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
