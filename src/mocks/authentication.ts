import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'

export const authenticationHandlers = [
  http.post(`/api${SERVER_URL.SIGNIN}`, async ({ request }) => {
    const info = await request.formData()
    const username = info.get('username')
    // Setting the 'Set-Cookie' mocked response header.
    return new HttpResponse('xxx', {
      headers: {
        'Set-Cookie': `logged_user=${username}; HttpOnly; Secure; SameSite=Lax; Expires=86400; Path=/;`
      }
    })
  }),
  http.post(`/api${SERVER_URL.SIGNOUT}`, ({ cookies }) => {
    if (!cookies.logged_user) {
      return new HttpResponse(null, { status: 401 })
    }
    return new HttpResponse()
  })
]
