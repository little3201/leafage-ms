import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'
import type { Script } from 'src/types'

const datas: Script[] = [
  {
    id: 1,
    name: 'MySQL',
    icon: '/svgs/mysql.svg',
    version: '8.0.34',
    content: '',
    description: 'This is the description of row',
    lastModifiedDate: new Date()
  }, {
    id: 2,
    name: 'Nginx',
    icon: '/svgs/nginx.svg',
    version: '1.8.12',
    content: "user  www www;\nworker_processes  2;\npid /var/run/nginx.pid;\nerror_log  /var/log/nginx.error_log  debug | info | notice | warn | error | crit;\n\nevents {\n    connections   2000;\n    use kqueue | rtsig | epoll | /dev/poll | select | poll;\n}\n\nhttp {\n    log_format main      '$remote_addr - $remote_user[$time_local] '\n                         '\"$request\" $status $bytes_sent '\n                         '\"$http_referer\" \"$http_user_agent\" '\n                         '\"$gzip_ratio\"';\n\n    send_timeout 3m;\n    client_header_buffer_size 1k;\n",
    description: 'This is the description of row',
    lastModifiedDate: new Date()
  },
  {
    id: 3,
    name: 'Nodejs',
    icon: '/svgs/nodejs.svg',
    version: '20.5.6',
    content: '',
    description: 'This is the description of row',
    lastModifiedDate: new Date()
  },
  {
    id: 4,
    name: 'PostgreSql',
    icon: '/svgs/postgresql.svg',
    version: '16.2.3',
    content: '',
    description: 'This is the description of row',
    lastModifiedDate: new Date()
  },
  {
    id: 5,
    name: 'Redis',
    icon: '/svgs/redis.svg',
    version: '7.0.1',
    content: '',
    description: 'This is the description of row',
    lastModifiedDate: new Date()
  }
]

export const scriptsHandlers = [
  http.get(`/api${SERVER_URL.SCRIPT}/:id`, ({ params }) => {
    const { id } = params
    if (id) {
      return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
    } else {
      return HttpResponse.json(null)
    }
  }),
  http.get(`/api${SERVER_URL.SCRIPT}`, () => {
    // Construct a JSON response with the list of all Row
    // as the response body.

    return HttpResponse.json(datas)
  }),
  http.post(`/api${SERVER_URL.SCRIPT}`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newData = await request.json() as Script

    // Push the new Dictionary to the map of all Dictionarys.
    datas.push(newData)

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created Dictionary!
    return HttpResponse.json(newData, { status: 201 })
  }),
  http.put(`/api${SERVER_URL.SCRIPT}/:id`, async ({ params }) => {
    // Read the intercepted request body as JSON.
    const { id } = params

    return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
  }),
  http.patch(`/api${SERVER_URL.SCRIPT}/:id`, async ({ params }) => {
    // Read the intercepted request body as JSON.
    const { id } = params

    return HttpResponse.json(datas.filter(item => item.id === Number(id))[0])
  }),
  http.delete(`/api${SERVER_URL.SCRIPT}/:id`, ({ params }) => {
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