import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'

export const authenticationHandlers = [
  http.post(`/api${SERVER_URL.SIGNIN}`, async ({ request }) => {
    const info = await request.formData()
    const username = info.get('username')
    // Read the intercepted request body.
    return HttpResponse.json(null, {
      headers: {
        'Set-Cookie': `logged_in=${username}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400; Path=/;`
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
