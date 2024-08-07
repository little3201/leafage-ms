interface AudtiMetadata {
  id?: number
  lastModifiedDate?: Date
}

export interface User extends AudtiMetadata {
  username: string
  firstname: string
  lastname: string
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
  meta: {
    icon?: string
    actions?: string[]
  }
  enabled?: boolean
  description?: string
}

export interface Dictionary extends AudtiMetadata {
  name: string
  superiorId?: number
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
