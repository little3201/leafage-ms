import { authenticationHandlers } from './authentication'
import { dictionariesHandlers } from './dictionaries'
import { groupsHandlers } from './groups'
import { regionsHandlers } from './regions'
import { usersHandlers } from './users'
import { privilegessHandlers } from './privileges'
import { operationLogsHandlers } from './operation-logs'
import { accessLogsHandlers } from './access-logs'
import { auditLogsHandlers } from './audit-logs'
import { schedulerLogsHandlers } from './scheduler-logs'
import { filesHandlers } from './files'
import { schemasHandlers } from './schemas'
import { templatesHandlers } from './templates'

export const handlers = [
  ...authenticationHandlers,
  ...dictionariesHandlers,
  ...groupsHandlers,
  ...regionsHandlers,
  ...usersHandlers,
  ...privilegessHandlers,
  ...operationLogsHandlers,
  ...accessLogsHandlers,
  ...auditLogsHandlers,
  ...schedulerLogsHandlers,
  ...filesHandlers,
  ...schemasHandlers,
  ...templatesHandlers
]
