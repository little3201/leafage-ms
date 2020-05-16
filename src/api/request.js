// 认证资源信息
export const AUTH = {
  client_id: 'abeille',
  client_secret: 'abeille'
}

// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
export const SERVER_URL = {
  signin: SERVER_PRE.hypervisor.concat('/oauth/token'), // 登录
  user: SERVER_PRE.hypervisor.concat('/user'), // 用户
  article: SERVER_PRE.assets.concat('/article'), // 文章
  translation: SERVER_PRE.assets.concat('/translation'), // 翻译
  topic: SERVER_PRE.assets.concat('/topic'), // 话题
  source: SERVER_PRE.assets.concat('/resource') // 资源
}
