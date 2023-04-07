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

interface Abstract {
  id: number,
  modifyTime: string
}

export declare interface Role extends Abstract {
  roleName: string,
  count: number,
  enabled: boolean
}

export declare interface Group extends Abstract {
  groupName: string,
  principal: string,
  count: number,
  enabled: boolean
}

export declare interface Component extends Abstract {
  componentName: string,
  type: string,
  icon: string,
  superior: string,
  path: string,
  count: number,
  enabled: boolean
}

export declare interface Message extends Abstract {
  title: string,
  context: string,
  receiver: string
}

export declare interface NodeData {
  id: number,
  name: string,
  superiorId: number,
  children: Array<NodeData>,
  expand: any | unknown
}

export declare interface Category extends Abstract {
  categoryName: string,
  count: number,
  description: string
}

export declare interface Statistics {
  viewed: number,
  likes: number,
  comments: number,
  downloads: number
}

export declare interface Post extends Abstract {
  title: string,
  cover: string,
  category: string,
  tags: Array<string>,
  context: string
}

export declare interface Comment extends Abstract {
  postId: number,
  country: string,
  location: string,
  context: string
}

export declare interface Statistics {
  viewed: number,
  likes: number,
  comments: number,
  downloads: number
}

export declare interface Region extends Abstract {
  regionName: string,
  superior: string,
  postalCode: number,
  areaCode: number
}

export declare interface Dictionary extends Abstract {
  dictionaryName: string,
  superior: string,
  alias: string,
  enabled: boolean,
  description: string
}

export declare interface AccessLog extends Abstract {
  ip: string,
  location: string,
  context: string
}