// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
export const SERVER_URL = {
  user: SERVER_PRE.hypervisor.concat('/users'), // 用户
  role: SERVER_PRE.hypervisor.concat('/roles'), // 角色
  components: SERVER_PRE.hypervisor.concat('/components'), // 权限
  group: SERVER_PRE.hypervisor.concat('/groups'), // 分组
  messages: SERVER_PRE.hypervisor.concat('/messages'), // 消息通知

  region: SERVER_PRE.hypervisor.concat('/regions'), // 行政区划
  dictionary: SERVER_PRE.hypervisor.concat('/dictionaries'), // 字典
  accesslog: SERVER_PRE.hypervisor.concat('/access-logs'), // 字典

  post: SERVER_PRE.assets.concat('/posts'), // 帖子
  category: SERVER_PRE.assets.concat('/categories'), // 类别
  resource: SERVER_PRE.assets.concat('/resources'), // 资源
  statistics: SERVER_PRE.assets.concat('/statistics'), // 统计
  comment: SERVER_PRE.assets.concat('/comments'), // 评论
}