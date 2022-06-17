export declare interface Pagation<T> {
  page: number,
  size: number,
  totalElements: number,
  content: Array<T>
}

export declare interface Account {
  username: string,
  nickname: string,
  avatar: string
}

export declare interface AccountDetail extends Account {
  enabled: boolean,
  accountExpiresAt: Date,
  accountLocked: boolean,
  credentialsExpiresAt: Date
}

export declare interface User {
  username: string,
  firstname: string,
  lastname: string,
  gender: string,
  phone: number,
  email: string,
  birthday: Date,
  nationality: string,
  degree: string,
  hobbies: string,
  company: string,
  position: string,
  description: string
}

interface AbstractVO<T> {
  code: T,
  modifyTime: Date
}

export declare interface Role extends AbstractVO<string> {
  name: string,
  superior: string,
  count: number,
  description: string,
  enabled: boolean
}

export declare interface Group extends AbstractVO<string> {
  name: string,
  alias: string,
  superior: string,
  principal: string,
  count: number,
  description: string,
  enabled: boolean
}

export declare interface Authority extends AbstractVO<string> {
  name: string,
  type: string,
  icon: string,
  superior: string,
  path: string,
  count: number,
  description: string,
  enabled: boolean
}

export declare interface Notification extends AbstractVO<string> {
  title: string,
  content: string,
  receiver: string
}

export declare interface NodeData {
  code: string,
  name: string,
  superior: string,
  children: NodeData[],
  expand: unknown
}

export declare interface Category extends AbstractVO<string> {
  name: string,
  count: number,
  description: string
}

export declare interface Posts extends AbstractVO<string> {
  title: string,
  cover: string,
  category: string,
  tags: Array<string>,
  viewed: number,
  likes: number,
  comments: number
}

export declare interface PostsDetails {
  catalog: string,
  content: string
}

export declare interface Resource extends AbstractVO<string> {
  title: string,
  type: string,
  cover: string,
  category: string,
  viewed: number,
  downloads: number,
  description: string
}

export declare interface Comment extends AbstractVO<string> {
  posts: string,
  country: string,
  location: string,
  content: string
}

export declare interface Statistics extends AbstractVO<string> {
  date: Date,
  viewed: number,
  overViewed: number,
  likes: number,
  overLikes: number,
  comments: number,
  overComments: number,
  downloads: number,
  overDownloads: number
}

export declare interface StatisticsTotal {
  viewed: number,
  likes: number,
  comments: number,
  downloads: number
}

export declare interface Region extends AbstractVO<number> {
  name: string,
  superior: string,
  alias: string,
  postalCode: number,
  areaCode: number,
  description: string
}

export declare interface Dictionary extends AbstractVO<string> {
  name: string,
  superior: string,
  alias: string,
  enabled: boolean,
  description: string
}

export declare interface AccessLog extends AbstractVO<string> {
  ip: string,
  location: string,
  description: string
}