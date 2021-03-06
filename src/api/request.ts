// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
const SERVER_URL = {
  // hypervisor
  account: SERVER_PRE.hypervisor.concat('/account'), // 账户
  user: SERVER_PRE.hypervisor.concat('/user'), // 用户
  role: SERVER_PRE.hypervisor.concat('/role'), // 角色
  authority: SERVER_PRE.hypervisor.concat('/authority'), // 权限
  group: SERVER_PRE.hypervisor.concat('/group'), // 分组
  // assets
  posts: SERVER_PRE.assets.concat('/posts'), // 帖子
  category: SERVER_PRE.assets.concat('/category'), // 类别
  portfolio: SERVER_PRE.assets.concat('/portfolio'), // 作品集
  statistics: SERVER_PRE.assets.concat('/statistics') // 统计
}

export default SERVER_URL;