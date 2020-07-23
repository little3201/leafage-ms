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
export const fetchUserFunc = businessId => {
  return axios.request({
    url: SERVER_URL.user.concat('/').concat(businessId)
  })
}

/* 获取用户信息列表 */
export const retrieveUserFunc = () => {
  return axios.request({
    url: SERVER_URL.user
  })
}

/* ===================角色接口方法=================== */

/* 根据userId获取用户信息 */
export const fetchRoleFunc = businessId => {
  return axios.request({
    url: SERVER_URL.role.concat('/').concat(businessId)
  })
}

/* 获取用户信息列表 */
export const retrieveRoleFunc = () => {
  return axios.request({
    url: SERVER_URL.role
  })
}

/* ===================资源接口方法=================== */

/* 根据userId获取用户信息 */
export const fetchSourceFunc = businessId => {
  return axios.request({
    url: SERVER_URL.source.concat('/').concat(businessId)
  })
}

/* 获取用户信息列表 */
export const retrieveSourceFunc = () => {
  return axios.request({
    url: SERVER_URL.source
  })
}

/* ===================组接口方法=================== */

/* 根据userId获取用户信息 */
export const fetchGroupFunc = businessId => {
  return axios.request({
    url: SERVER_URL.group.concat('/').concat(businessId)
  })
}

/* 获取用户信息列表 */
export const retrieveGroupFunc = () => {
  return axios.request({
    url: SERVER_URL.group
  })
}

/* ===================文章接口方法=================== */

/* 根据文章ID获取文章详情 */
export const fetchArticleFunc = businessId => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(businessId)
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
export const modifyArticleFunc = (businessId, params) => {
  return axios.request({
    url: SERVER_URL.article.concat('/').concat(businessId),
    method: 'put',
    data: params
  })
}

/* ===================翻译接口方法=================== */

/* 根据翻译ID获取翻译详情 */
export const fetchTranslationFunc = businessId => {
  return axios.request({
    url: SERVER_URL.translation.concat('/').concat(businessId)
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
export const fetchTopicFunc = businessId => {
  return axios.request({
    url: SERVER_URL.topic.concat('/').concat(businessId)
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
export const retrieveResourceFunc = () => {
  return axios.request({
    url: SERVER_URL.resource
  })
}
