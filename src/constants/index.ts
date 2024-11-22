export const actions: { [key: string]: string } = {
  create: 'primary',
  modify: 'primary',
  upload: 'primary',

  import: 'warning',

  remove: 'negative',
  clear: 'negative',

  export: 'secondary',
  download: 'secondary',

  relation: 'positive',
  config: 'positive',

  preview: 'info',
  detail: 'info'
}

export const httpMethods: { [key: string]: string } = {
  GET: 'positive',
  POST: 'warning',
  PUT: 'primary',
  PATCH: 'primary',
  DELETE: 'negative'
}
