import HttpRequest from './axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://abeille.top/api'
    : 'http://localhost'

const axios = new HttpRequest(baseUrl)

export default axios
