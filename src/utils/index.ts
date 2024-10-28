export function pathResolve(parentPath: string, path: string | undefined): string {
  if (!path) {
    return ''
  }
  const childPath = path.startsWith('/') ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}

export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}
