export declare interface Pagation<T> {
  page: number,
  size: number,
  totalElements: number,
  content: Array<T>
}

export declare interface User {
  username: string,
  nickname: string,
  avatar: string,
  enabled: boolean,
  accountExpiresAt: string,
  accountLocked: boolean,
  credentialsExpiresAt: string
}

interface AbstractVO<T> {
  code: T,
  modifyTime: string
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
  expand: any | unknown
}

export declare interface Category extends AbstractVO<string> {
  name: string,
  count: number,
  description: string
}

export declare interface Statistics {
  viewed: number,
  likes: number,
  comments: number
}

export declare interface Post extends AbstractVO<string> {
  title: string,
  cover: string,
  category: Category,
  tags: Array<string>,
}

export declare interface Content {
  catalog: string,
  content: string
}

export declare interface PostContent extends Post {
  content: Content
}

export declare interface Resource extends AbstractVO<string> {
  title: string,
  type: string,
  cover: string,
  category: Category,
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

export declare interface Statistics {
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