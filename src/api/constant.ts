// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
export const SERVER_URL = {
  account: SERVER_PRE.hypervisor.concat('/accounts'), // 账户
  user: SERVER_PRE.hypervisor.concat('/users'), // 用户
  role: SERVER_PRE.hypervisor.concat('/roles'), // 角色
  authority: SERVER_PRE.hypervisor.concat('/authorities'), // 权限
  group: SERVER_PRE.hypervisor.concat('/groups'), // 分组
  notification: SERVER_PRE.hypervisor.concat('/notifications'), // 消息通知

  region: SERVER_PRE.hypervisor.concat('/regions'), // 行政区划
  dictionary: SERVER_PRE.hypervisor.concat('/dictionaries'), // 字典
  accesslog: SERVER_PRE.hypervisor.concat('/access-logs'), // 字典

  posts: SERVER_PRE.assets.concat('/posts'), // 帖子
  category: SERVER_PRE.assets.concat('/categories'), // 类别
  resource: SERVER_PRE.assets.concat('/resources'), // 资源
  statistics: SERVER_PRE.assets.concat('/statistics'), // 统计
  comment: SERVER_PRE.assets.concat('/comments'), // 评论
}