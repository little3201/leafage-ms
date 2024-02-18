interface AudtiMetadata {
  id?: number;
  lastModifiedDate?: Date;
}

export interface Post extends AudtiMetadata {
  cover: string;
  tags: Array<string>;
  content: string;
}

export interface Category extends AudtiMetadata {
  name: string;
  enabled?: boolean;
  description?: string;
}

export interface User extends AudtiMetadata {
  username: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  accountNonLocked?: boolean;
  accountExpiresAt?: Date;
  credentialsExpiresAt?: Date;
  enabled?: boolean;
  description?: string;
}

export interface Group extends AudtiMetadata {
  name: string;
  superior_id?: number;
  enabled?: boolean;
  description?: string;
}

export interface Role extends AudtiMetadata {
  name: string;
  enabled?: boolean;
  description?: string;
}

export interface Dictionary extends AudtiMetadata {
  name: string;
  superior_id?: number;
  enabled?: boolean;
  description?: string;
}

export interface Region extends AudtiMetadata {
  name: string;
  superior_id?: number;
  enabled?: boolean;
  description?: string;
}
