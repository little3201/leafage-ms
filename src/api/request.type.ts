export declare interface Page {
  page: number,
  size: number,
  total: number
}

export declare interface Account {
  username: string,
  nickname: string,
  avatar: string
}

export declare interface AccountDetail extends Account {
  accountExpiresAt: Date,
  accountLocked: boolean,
  credentialsExpiresAt: Date
}

export declare interface User {
  username: string,
  firstname: string,
  lastname: string,
  gender: string,
  phone: string,
  email: string,
  birthday: Date,
  ethnicity: string,
  degree: string,
  hobbies: string,
  company: string,
  position: string
}

interface AbstractVO<T> {
  code: T,
  modifyTime: Date
}

export declare interface Role extends AbstractVO<String> {
  name: string,
  superior: string,
  count: number,
  description: string
}

export declare interface Group extends AbstractVO<String> {
  name: string,
  alias: string,
  superior: string,
  principal: string,
  count: number,
  description: string
}

export declare interface Authority extends AbstractVO<String> {
  name: string,
  type: string,
  icon: string,
  superior: string,
  path: string,
  count: number,
  description: string
}

export declare interface Region extends AbstractVO<Number> {
  name: string,
  superior: string,
  alias: string,
  postalCode: number,
  areaCode: string,
  description: string
}

export declare interface Notification extends AbstractVO<String> {
  title: string,
  content: string,
  receiver: string
}

export declare interface TreeNode {
  code: string,
  name: string,
  superior: string,
  children: TreeNode[],
  expand: Object
}

export declare interface Category extends AbstractVO<String> {
  alias: string,
  count: number,
  description: string
}

export declare interface Posts extends AbstractVO<String> {
  title: string,
  cover: string,
  category: string,
  tags: Array<String>,
  viewed: number,
  likes: number,
  comment: number
}

export declare interface PostsDetails {
  catalog: string,
  content: string
}

export declare interface Resource extends AbstractVO<String> {
  title: string,
  type: string,
  cover: string,
  category: string,
  viewed: number,
  downloads: number,
  description: string
}

export declare interface Comment extends AbstractVO<String> {
  nickname: string,
  posts: string,
  avatar: string,
  replier: string,
  content: string,
  email: string
}

export declare interface Statistics extends AbstractVO<String> {
  date: Date,
  viewed: number,
  overViewed: number,
  likes: number,
  overLikes: number,
  comment: number,
  overComment: number
}