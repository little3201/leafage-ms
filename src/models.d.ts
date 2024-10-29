interface AudtiMetadata {
  id?: number
  lastModifiedDate?: Date
}

export interface Pagination {
  page: number,
  size: number,
  sortBy?: string,
  descending?: boolean
}

export interface User extends AudtiMetadata {
  username: string
  fullName: string
  email: string
  avatar?: string
  accountNonLocked?: boolean
  accountExpiresAt?: Date
  credentialsExpiresAt?: Date
  enabled?: boolean
}

export interface Group extends AudtiMetadata {
  name: string
  superiorId?: number
  principal?: string
  members?: string[]
  enabled: boolean
  description?: string
}

export interface GroupMembers {
  id: number
  groupId: number
  username: string
}

export interface Role extends AudtiMetadata {
  name: string
  members?: string[]
  enabled?: boolean
  description?: string
}

export interface RoleMembers {
  id: number
  roleId: number
  username: string
}

export interface RolePrivileges {
  id: number
  roleId: number
  privilegeId: number
}

export interface Privilege extends AudtiMetadata {
  name: string
  superiorId?: number
  path: string
  component: string
  redirect?: string
  icon: string
  actions?: string[]
  count?: number
  hasChildren?: boolean
  enabled?: boolean
  description?: string
}

export interface Dictionary extends AudtiMetadata {
  name: string
  superiorId?: number
  enabled?: boolean
  description?: string
  count?: number
  hasChildren?: boolean
}

export interface Region extends AudtiMetadata {
  name: string
  superiorId?: number
  areaCode?: number
  postalCode?: number
  hasChildren?: boolean
  enabled?: boolean
  description?: string
}

export interface TreeNode {
  id?: number
  name: string
  children?: TreeNode[]
}

export interface PrivilegeTreeNode extends TreeNode {
  meta: {
    path: string
    component: string
    redirect?: string
    icon: string
    actions?: string[]
  },
  children?: PrivilegeTreeNode[]
}

export interface OperationLog extends AudtiMetadata {
  operation: string
  content: string
  operator: string
  ip: string
  location: string
  referer?: string
  sessionId?: string
  os?: string
  deviceType?: string
  userAgent?: string
  browser?: string
  statusCode?: number
  operatedTime?: Date
}

export interface AccessLog extends AudtiMetadata {
  url: string
  httpMethod: string
  operator: string
  params?: string
  body?: string
  ip: string
  location: string
  responseTimes?: number
  statusCode?: number
  responseMessage?: string
}

export interface AuditLog extends AudtiMetadata {
  operator: string
  operation: string
  resource: string
  oldValue?: string
  newValue?: string
  ip: string
  location: string
  statusCode?: number
  operatedTime?: Date
}

export interface SchedulerLog extends AudtiMetadata {
  name: string
  startTime?: Date
  executedTimes?: number
  nextExecuteTime?: Date
  status?: number
}

export interface FileRecord extends AudtiMetadata {
  name: string
  type: string
  size: number
}

export interface Table extends AudtiMetadata {
  name: string
  comment: string
  description: string
}

export interface Column extends AudtiMetadata {
  name: string
  type: string
  length: number
  nullable: boolean
  unique: boolean
  comment: string
  description: string
}

export interface Code extends AudtiMetadata {
  name: string
  content: string
}

export interface Script extends AudtiMetadata {
  name: string
  icon: string
  version: string
  description: string
}
