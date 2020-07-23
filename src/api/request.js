// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
export const SERVER_URL = {
  signin: SERVER_PRE.hypervisor.concat('/login'), // 登录
  user: SERVER_PRE.hypervisor.concat('/user'), // 用户
  role: SERVER_PRE.hypervisor.concat('/role'), // 用户
  source: SERVER_PRE.hypervisor.concat('/source'), // 用户
  group: SERVER_PRE.hypervisor.concat('/group'), // 用户

  article: SERVER_PRE.assets.concat('/article'), // 文章
  translation: SERVER_PRE.assets.concat('/translation'), // 翻译
  topic: SERVER_PRE.assets.concat('/topic'), // 话题
  resource: SERVER_PRE.assets.concat('/resource') // 资源
}
