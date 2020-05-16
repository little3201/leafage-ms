import axios from '@/api'
import { SERVER_URL, AUTH } from './request'

/* 登录方法 */
export const loginFunc = ({ username, password }) => {
  const params = {
    username: username,
    password: password,
    grant_type: 'password'
  }
  return axios.request({
    url: SERVER_URL.signin,
    method: 'post',
    auth: {
      username: AUTH.client_id,
      password: AUTH.client_secret
    },
    params
  })
}

/* 登出方法 */
export const logoutFunc = username => {
  return axios.request({
    url: '/logout',
    method: 'delete',
    username
  })
}

/* 获取手机验证码 */
export const querySmsCaptchaFunc = mobile => {
  return axios.request({
    url: SERVER_URL.user,
    mobile
  })
}

/* ===================用户接口方法=================== */

/* 根据userId获取用户信息 */
export const queryUserFunc = userId => {
  return axios.request({
    url: SERVER_URL.user.concat('/').concat(userId)
  })
}

/* 获取用户信息列表 */
export const fetchUserFunc = () => {
  return axios.request({
    url: SERVER_URL.user
  })
}

/* ===================文章接口方法=================== */

/* 根据文章ID获取文章详情 */
export const queryArticleFunc = articleId => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(articleId)
  })
}

/* 获取用户信息列表 */
export const fetchArticleFunc = () => {
  return axios.request({
    url: SERVER_URL.article
  })
}

/* 获取用户信息列表 */
export const createArticleFunc = () => {
  return axios.request({
    url: SERVER_URL.article,
    method: 'post'
  })
}

/* 获取用户信息列表 */
export const modifyArticleFunc = (articleId, params) => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(articleId),
    method: 'put',
    data: params
  })
}

/* ===================翻译接口方法=================== */

/* 根据翻译ID获取翻译详情 */
export const queryTranslationFunc = translationId => {
  return axios.request({
    url: SERVER_URL.translation.concat('/').concat(translationId)
  })
}

/* 获取翻译信息列表 */
export const fetchTranslationFunc = () => {
  return axios.request({
    url: SERVER_URL.translation
  })
}

/* ===================话题接口方法=================== */

/* 根据翻译ID获取翻译详情 */
export const queryTopicFunc = topicId => {
  return axios.request({
    url: SERVER_URL.topic.concat('/').concat(topicId)
  })
}

/* 获取翻译信息列表 */
export const fetchTopicFunc = () => {
  return axios.request({
    url: SERVER_URL.topic
  })
}

/* ===================资源接口方法=================== */

/* 根据翻译ID获取翻译详情 */
export const querySourceFunc = topicId => {
  return axios.request({
    url: SERVER_URL.source.concat('/').concat(topicId)
  })
}

/* 获取翻译信息列表 */
export const fetchSourceFunc = () => {
  return axios.request({
    url: SERVER_URL.source
  })
}
