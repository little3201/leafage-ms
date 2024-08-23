interface AudtiMetadata {
  id?: number
  lastModifiedDate?: Date
}

export interface User extends AudtiMetadata {
  username: string
  email: string
  avatar?: string
  accountNonLocked?: boolean
  accountExpiresAt?: Date
  credentialsExpiresAt?: Date
  enabled?: boolean
  description?: string
}

export interface Group extends AudtiMetadata {
  groupName: string
  enabled?: boolean
}

export interface Role extends AudtiMetadata {
  name: string
  enabled?: boolean
  description?: string
}

export interface Privilege extends AudtiMetadata {
  name: string
  superiorId?: number
  path?: string
  redirect?: string
  component?: string
  icon?: string
  actions?: string[]
  order: number
  enabled?: boolean
  description?: string
}

export interface Dictionary extends AudtiMetadata {
  name: string
  superiorId?: number
  order: number
  enabled?: boolean
  description?: string
}

export interface Region extends AudtiMetadata {
  name: string
  superiorId?: number
  areaCode: number
  postalCode: number
  enabled?: boolean
  description?: string
}

export interface TreeNode {
  id: number
  name: string
  superiorId?: number
  children?: TreeNode[]
}

export interface PrivilegeTreeNode extends TreeNode {
  path?: string
  redirect?: string
  component: string
  icon?: string
  hidden?: boolean
  actions?: string[]
  children?: PrivilegeTreeNode[]
}

export interface OperationLog {
  id?: number
  module: string
  method: string
  operator: string
  operation: string
  params: string | null
  ip: string
  location: string
  status: number | null
  operationTime: string | null
}

export interface AccessLog {
  id?: number
  api: string
  method: string
  operator: string
  params: string | null
  ip: string
  location: string
  status: number | null
  responseTime: number | null
  responseCode: number | null
  responseMessage: string | null
}

export interface AuditLog {
  id?: number
  operator: string
  operation: string
  resource: string
  oldValue: string | null
  newValue: string | null
  ip: string
  location: string
  status: number | null
  operationTime: string | null
}

export interface SchedulerLog {
  id?: number
  name: string
  method: string
  params: string
  cronExpression: string
  startTime: string
  endTime: string
  status: number | null
}
