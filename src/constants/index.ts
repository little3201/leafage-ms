// 服务匹配前缀
const SERVER_PRE = {
  HYPERVISOR: '', // 系统
  ASSETS: '', // 资源
  EXPLOITER: ''
}

// 接口请求路径
export const SERVER_URL = {
  // hypervisor
  USER: SERVER_PRE.HYPERVISOR.concat('/users'), // 用户
  ROLE: SERVER_PRE.HYPERVISOR.concat('/roles'), // 角色
  PRIVILEGE: SERVER_PRE.HYPERVISOR.concat('/privileges'), // 权限
  GROUP: SERVER_PRE.HYPERVISOR.concat('/groups'), // 分组
  DICTIONARY: SERVER_PRE.HYPERVISOR.concat('/dictionaries'), // 字典

  REGION: SERVER_PRE.HYPERVISOR.concat('/regions'), // 行政区划
  FILE: SERVER_PRE.ASSETS.concat('/files'), // 文件

  ACCESS_LOG: SERVER_PRE.HYPERVISOR.concat('/access-logs'), // 访问日志
  AUDIT_LOG: SERVER_PRE.HYPERVISOR.concat('/audit-logs'), // 审计日志
  OPERATION_LOG: SERVER_PRE.HYPERVISOR.concat('/operation-logs'), // 操作日志
  SCHEDULER_LOG: SERVER_PRE.HYPERVISOR.concat('/scheduler-logs'), // 调度日志

  // assets
  POST: SERVER_PRE.ASSETS.concat('/posts'), // 帖子
  CATEGORY: SERVER_PRE.ASSETS.concat('/categories'), // 类别
  STATISTICS: SERVER_PRE.ASSETS.concat('/statistics'), // 统计
  COMMENT: SERVER_PRE.ASSETS.concat('/comments'), // 评论

  SIGNIN: SERVER_PRE.ASSETS.concat('/signin'), // 登录
  SIGNOUT: SERVER_PRE.ASSETS.concat('/signout'), // 退出

  // exploiters
  SCRIPT: SERVER_PRE.EXPLOITER.concat('/scripts'), // 脚本
  SCHEMA: SERVER_PRE.EXPLOITER.concat('/schemas'), // 表配置
  TEMPLATE: SERVER_PRE.EXPLOITER.concat('/templates'), // 模板
  DB: SERVER_PRE.EXPLOITER.concat('/db') // 表
}

export const actions: { [key: string]: string } = {
  create: 'primary',
  modify: 'primary',
  upload: 'primary',

  import: 'warning',

  remove: 'negative',
  clear: 'negative',

  export: 'secondary',
  download: 'secondary',

  relation: 'positive',
  config: 'positive',

  preview: 'info',
  detail: 'info'
}

export const httpMethods: { [key: string]: string } = {
  GET: 'positive',
  POST: 'warning',
  PUT: 'primary',
  PATCH: 'primary',
  DELETE: 'negative'
}
