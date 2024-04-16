import { dictionariesHandlers } from './dictionaries'
import { groupsHandlers } from './groups'
import { regionsHandlers } from './regions'
import { rolesHandlers } from './roles'
import { usersHandlers } from './users'

export const handlers = [
  ...dictionariesHandlers,
  ...groupsHandlers,
  ...regionsHandlers,
  ...rolesHandlers,
  ...usersHandlers
]
