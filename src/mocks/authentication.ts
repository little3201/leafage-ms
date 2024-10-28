import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/api/paths'

export const authenticationHandlers = [
  http.post(`/api${SERVER_URL.SIGNIN}`, async ({ request }) => {
    const info = await request.formData()
    const username = info.get('username')
    // Read the intercepted request body.
    return HttpResponse.json(null, {
      headers: {
        'Set-Cookie': `username=${username}; Path=/;`
      }
    })
  }),
  http.post(`/api${SERVER_URL.SIGNOUT}`, ({ cookies }) => {
    if (!cookies.username) {
      return new HttpResponse(null, { status: 401 })
    }
    return new HttpResponse()
  })
]
