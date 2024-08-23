import { http, HttpResponse } from 'msw'

export const commonHandlers = [
  http.post('/api/login', async ({ request }) => {
    const info = await request.formData()

    const username = info.get('username')
    // Read the intercepted request body.
    return HttpResponse.json({ user: { username, avatar: 'src/assets/images/avatar.jpg' }, access_token: 'sfa23asdfasdfasdf' }, {
      headers: {
        'Set-Cookie': 'logged_in=yes'
      }
    })
  }),
  http.post('/api/logout', ({ cookies }) => {
    if (!cookies.logged_in) {
      return new HttpResponse(null, { status: 401 })
    }
    return new HttpResponse()
  })
]
