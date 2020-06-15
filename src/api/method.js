import axios from '@/api'
import qs from 'qs'
import { SERVER_URL } from './request'

/* 登录方法 */
export const loginFunc = (params) => {
  return axios.request({
    url: SERVER_URL.signin,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params, { indices: false })
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
export const fetchSmsCaptchaFunc = mobile => {
  return axios.request({
    url: SERVER_URL.user,
    mobile
  })
}

/* ===================用户接口方法=================== */

/* 根据userId获取用户信息 */
export const fetchUserFunc = userId => {
  return axios.request({
    url: SERVER_URL.user.concat('/').concat(userId)
  })
}

/* 获取用户信息列表 */
export const retrieveUserFunc = () => {
  return axios.request({
    url: SERVER_URL.user
  })
}

/* ===================文章接口方法=================== */

/* 根据文章ID获取文章详情 */
export const fetchArticleFunc = articleId => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(articleId)
  })
}

/* 获取用户信息列表 */
export const retrieveArticleFunc = () => {
  return axios.request({
    url: SERVER_URL.article
  })
}

/* 新增文章 */
export const createArticleFunc = (params) => {
  return axios.request({
    url: SERVER_URL.article,
    method: 'post',
    data: params
  })
}

/* 修改文章 */
export const modifyArticleFunc = (articleId, params) => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(articleId),
    method: 'put',
    data: params
  })
}

/* ===================翻译接口方法=================== */

/* 根据翻译ID获取翻译详情 */
export const fetchTranslationFunc = translationId => {
  return axios.request({
    url: SERVER_URL.translation.concat('/').concat(translationId)
  })
}

/* 获取翻译信息列表 */
export const retrieveTranslationFunc = () => {
  return axios.request({
    url: SERVER_URL.translation
  })
}

/* ===================话题接口方法=================== */

/* 根据话题ID获取翻译详情 */
export const fetchTopicFunc = topicId => {
  return axios.request({
    url: SERVER_URL.topic.concat('/').concat(topicId)
  })
}

/* 获取话题信息列表 */
export const retrieveTopicFunc = () => {
  return axios.request({
    url: SERVER_URL.topic
  })
}

/* ===================资源接口方法=================== */

/* 获取翻译信息列表 */
export const retrieveSourceFunc = () => {
  return axios.request({
    url: SERVER_URL.source
  })
}
