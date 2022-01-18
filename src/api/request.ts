// 服务匹配前缀
const SERVER_PRE = {
  hypervisor: '/hypervisor', // 系统
  assets: '/assets' // 资源
}

// 接口请求路径
export const SERVER_URL = {
  // hypervisor
  account: SERVER_PRE.hypervisor.concat('/account'), // 账户
  user: SERVER_PRE.hypervisor.concat('/user'), // 用户
  role: SERVER_PRE.hypervisor.concat('/role'), // 角色
  authority: SERVER_PRE.hypervisor.concat('/authority'), // 权限
  group: SERVER_PRE.hypervisor.concat('/group'), // 分组
  region: SERVER_PRE.hypervisor.concat('/region'), // 行政区划
  notification: SERVER_PRE.hypervisor.concat('/notification'), // 消息通知
  // assets
  posts: SERVER_PRE.assets.concat('/posts'), // 帖子
  category: SERVER_PRE.assets.concat('/category'), // 类别
  resource: SERVER_PRE.assets.concat('/resource'), // 资源
  statistics: SERVER_PRE.assets.concat('/statistics'), // 统计
  comment: SERVER_PRE.assets.concat('/comment'), // 评论
}

export interface Account {
  username: string,
  nickname: string,
  avatar: string,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean
}

export interface User extends Account {
  firstname: string,
  lastname: string,
  gender: string,
  birthday: Date,
  ethnicity: string,
  education: string,
  country: string,
  province: string,
  city: string,
  region: string,
  address: string
}

interface AbstractVO<T> {
  code: T,
  description: string,
  modifyTime: Date
}

export interface Role extends AbstractVO<String> {
  name: string,
  superior: string,
  count: number
}

export interface Group extends AbstractVO<String> {
  name: string,
  superior: string,
  count: number
}

export interface Authority extends AbstractVO<String> {
  name: string,
  superior: string,
  count: number
}

export interface Region extends AbstractVO<Number> {
  name: string,
  superior: string,
  count: number
}

export interface Notification extends AbstractVO<String> {
  title: string,
  content: string
}

export interface TreeNode {
  code: string,
  name: string,
  superior: string,
  children: TreeNode[],
  expand: Object
}

export interface Category extends AbstractVO<String> {
  alias: string,
  count: number
}

export interface Posts extends AbstractVO<String> {
  title: string,
  cover: string,
  category: string,
  viewed: number,
  likes: number,
  comment: number
}

export interface PostsDetails extends Posts {
  tags: Array<String>,
  content: string
}

export interface Resource extends AbstractVO<String> {
  title: string,
  type: string,
  category: string,
  viewed: number,
  downloads: number
}

export interface Comment extends AbstractVO<String> {
  name: string,
  replier: string,
  content: string,
  email: string
}

export interface Statistics extends AbstractVO<String> {
  date: Date,
  viewed: number,
  overViewed: number,
  likes: number,
  overLikes: number,
  comment: number,
  overComment: number
}