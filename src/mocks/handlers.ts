import { dictionariesHandlers } from './dictionaries'
import { commonHandlers } from './common'
import { groupsHandlers } from './groups'
import { regionsHandlers } from './regions'
import { rolesHandlers } from './roles'
import { usersHandlers } from './users'
import { privilegessHandlers } from './privileges'

export const handlers = [
  ...commonHandlers,
  ...dictionariesHandlers,
  ...groupsHandlers,
  ...regionsHandlers,
  ...rolesHandlers,
  ...usersHandlers,
  ...privilegessHandlers
]
