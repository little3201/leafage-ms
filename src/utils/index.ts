export function pathResolve(parentPath: string, path: string | undefined): string {
  if (!path) {
    return ''
  }
  const childPath = path.startsWith('/') ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}
