import { date } from 'quasar'
import type { Dictionary } from 'src/types'

/**
 * Resolve a child path relative to a parent path
 * @param {string} parentPath - The parent path
 * @param {string} path - The child path
 * @returns {string} - The resolved path
 */
export function pathResolve(parentPath: string | undefined, path: string | undefined): string {
  if (!path) {
    return ''
  }
  const childPath = path.startsWith('/') ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}

/**
 * Compare the target date with the current date and return a status
 * @param {string} target - The target date
 * @returns {string} - The status ('success', 'warning', 'danger')
 */
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

/**
 * Format a duration given in milliseconds into a human-readable string
 * @param {number} milliseconds - The duration in milliseconds
 * @returns {string} - The formatted duration
 */
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

/**
 * Format a file size given in bytes into a human-readable string
 * @param {number} size - The file size in bytes
 * @returns {string} - The formatted file size
 */
export const formatFileSize = (size: number) => {
  if (isNaN(size) || size <= 0) return '-'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }

  return `${size.toFixed(2)}${units[index]}`
}

/**
 * 格式化字典数据
 * @param value 字典值
 * @param rows  字典列表
 * @returns 字典名称
 */
export function formatDictionary(value: number, rows: Dictionary[]): string {
  const dictItem = rows.find(item => item.id === value)
  return dictItem ? dictItem.name : ''
}

export function visibleArray<T extends string | number>(array: T[], count: number): T[] {
  return array.length > count ? array.slice(0, count) : array
}

/**
  将下划线格式转换为驼峰格式，并将每个单词的首字母大写
 * @param word 输入
 * @returns 结果
 */
export function pluralToSingularAndCapitalize(word: string) {
  const camelCase = word.split('_').map((part: string) => {
    const singular = wordToSingular(part)
    return singular.charAt(0).toUpperCase() + singular.slice(1).toLowerCase()
  }).join('')

  return camelCase
}

/**
   * 复数到单数的转换规则
   * @param word 复数
   * @returns 单数
   */
export function wordToSingular(word: string) {
  const pluralRules = [
    { regex: /ies$/, replacement: 'y' },
    { regex: /ves$/, replacement: 'f' },
    { regex: /s$/, replacement: '' }
  ]

  // 将单词转换为单数
  for (const rule of pluralRules) {
    if (rule.regex.test(word)) {
      return word.replace(rule.regex, rule.replacement)
    }
  }
  return word
}

export function downloadFile(data: Blob, filename: string, mimeType?: string): void {
  // 创建一个新的 Blob 对象，指定 MIME 类型
  const blob = new Blob([data], { type: mimeType || 'application/octet-stream' })

  // 创建一个临时的下载链接
  const url = window.URL.createObjectURL(blob)

  // 创建一个 <a> 元素并触发点击事件来启动下载
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename) // 设置下载的文件名
  document.body.appendChild(link)
  link.click() // 执行点击，触发下载
  document.body.removeChild(link) // 清除临时元素

  // 释放创建的 URL 对象
  window.URL.revokeObjectURL(url)
}

export function groupByType<T>(array: T[], typeOptions: Dictionary[], typeKey: keyof T): { [key: string]: T[] } {
  return array.reduce((acc: { [key: string]: T[] }, curr: T) => {
    const typeValue = curr[typeKey] as number; // 假设类型键的值是一个数字
    const name = formatDictionary(typeValue, typeOptions);
    if (!name) { return acc; }
    if (!acc[name]) { acc[name] = []; }
    acc[name].push(curr);
    return acc;
  }, {} as { [key: string]: T[] });
}

export function getRandomString(length: number): string {
  const a = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(a);
  const str = Array.from(a, (dec) => ('0' + dec.toString(16)).slice(-2)).join('');
  return str.slice(0, length);
}

export function generateVerifier(prefix?: string): string {
  let verifier = prefix || ''
  if (verifier.length < 43) {
    verifier = verifier + getRandomString(43 - verifier.length)
  }
  return encodeURIComponent(verifier).slice(0, 128)
}

export function computeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  return crypto.subtle.digest('SHA-256', data).then(digest => {
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  });
}