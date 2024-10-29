import { date } from 'quasar'

export function pathResolve(parentPath: string, path: string | undefined): string {
  if (!path) {
    return ''
  }
  const childPath = path.startsWith('/') ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function calculate(target: string) {
  const now = new Date()
  const targetDate = new Date(target)
  // 失效时间是否小于7天
  const diff = date.getDateDiff(targetDate, now, 'days')
  if (diff > 7) {
    return 'positive'
  } else {
    // 是否失效
    const diffSec = date.getDateDiff(targetDate, now, 'seconds')
    if (diffSec > 0) {
      return 'warning'
    } else {
      return 'negative'
    }
  }
}

export const formatDuration = (milliseconds: number) => {
  const timeUnits = [
    { unit: 'h', factor: 3600000 }, // 1小时 = 3600000毫秒
    { unit: 'min', factor: 60000 }, // 1分钟 = 60000毫秒
    { unit: 's', factor: 1000 }, // 1秒 = 1000毫秒
    { unit: 'ms', factor: 1 } // 毫秒
  ]

  for (const { unit, factor } of timeUnits) {
    if (milliseconds >= factor) {
      const value = Math.floor(milliseconds / factor)
      return `${value}${unit}`
    }
  }

  return '0ms' // 处理0毫秒的情况
}

export function visibleArray(array: string[], count: number) {
  return array.length > count ? array.slice(0, count) : array
}
