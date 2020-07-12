import HttpRequest from './axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://abeille.top/api'
    : 'https://abeille.top/api'

const axios = new HttpRequest(baseUrl)

export default axios
