import { http, HttpResponse } from 'msw'
import { Cookies } from 'quasar'
import { SERVER_URL } from 'src/constants'

export const authenticationHandlers = [
  http.post(`/api${SERVER_URL.SIGNIN}`, async ({ request }) => {
    const info = await request.formData()
    const username = info.get('username')
    // Read the intercepted request body.
    // return HttpResponse.json(null, {
    //   headers: {
    //     'Set-Cookie': `logged_user=${username}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400; Path=/;`
    //   }
    // })
    Cookies.set('logged_user', username as string, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', expires: '2h' })
    return new HttpResponse()
  }),
  http.post(`/api${SERVER_URL.SIGNOUT}`, ({ cookies }) => {
    if (!cookies.logged_user) {
      return new HttpResponse(null, { status: 401 })
    }
    return new HttpResponse()
  })
]
