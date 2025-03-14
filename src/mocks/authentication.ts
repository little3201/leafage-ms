import { http, HttpResponse } from 'msw'
import { SERVER_URL } from 'src/constants'

export const authenticationHandlers = [
  http.get(`/api${SERVER_URL.USERINFO}`, () => {
    return HttpResponse.json({
      sub: 'admin'
    })
  }),

  http.post(`/api${SERVER_URL.TOKEN}`, () => {
    return HttpResponse.json({ access_token: 'eyjxxxxxxxxxxxxxxx', type: 'bear' })
  }),

  http.post(`/api${SERVER_URL.LOGOUT}`, () => {
    return new HttpResponse(null, { status: 200 })
  })
]
