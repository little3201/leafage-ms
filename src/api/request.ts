// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
const SERVER_URL = {
  // hypervisor
  user: SERVER_PRE.hypervisor.concat('/user'), // 用户
  role: SERVER_PRE.hypervisor.concat('/role'), // 角色
  source: SERVER_PRE.hypervisor.concat('/resource'), // 资源
  group: SERVER_PRE.hypervisor.concat('/group'), // 组
  // assets
  article: SERVER_PRE.assets.concat('/article'), // 文章
  topic: SERVER_PRE.assets.concat('/topic'), // 话题
  resource: SERVER_PRE.assets.concat('/portfolio') // 作品集
}

export default SERVER_URL;