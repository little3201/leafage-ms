import MarkdownIt from 'markdown-it'
import { highlight } from './extends/highlight'
import { slugify } from './extends/slugify'
import { lineNumberPlugin } from './extends/lineNumbers'
import { containerPlugin } from './extends/containers'
import { preWrapperPlugin } from './extends/preWrapper'
import { linkPlugin } from './extends/link'

const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

export interface MarkdownOptions extends MarkdownIt.Options {
  lineNumbers?: boolean
  config?: (md: MarkdownIt) => void
  anchor?: {
    permalink?: boolean
    permalinkBefore?: boolean
    permalinkSymbol?: string
  }
  toc?: any
  externalLinks?: Record<string, string>
}

export interface MarkdownParsedData {
  hoistedTags?: string[]
  links?: string[]
}

export interface MarkdownRenderer {
  __data: MarkdownParsedData
  render: (src: string, env?: any) => { html: string; data: any }
}

export const createMarkdownRenderer = (
  options: MarkdownOptions = {}
): MarkdownRenderer => {
  const md = MarkdownIt({
    html: true,
    linkify: true,
    highlight,
    ...options
  })

  // custom plugins
  md.use(preWrapperPlugin)
    .use(containerPlugin)
    .use(linkPlugin, {
      target: '_blank',
      rel: 'noopener noreferrer',
      ...options.externalLinks
    })

    // 3rd party plugins
    .use(emoji)
    .use(anchor, {
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
      permalinkAttrs: () => ({ 'aria-hidden': true }),
      ...options.anchor
    })
    .use(toc, {
      slugify,
      includeLevel: [2, 3],
      ...options.toc
    })

  // apply user config
  if (options.config) {
    options.config(md)
  }

  if (options.lineNumbers) {
    md.use(lineNumberPlugin)
  }

  // wrap render so that we can return both the html and extracted data.
  const render = md.render
  const wrappedRender: MarkdownRenderer['render'] = (src) => {
    ;(md as any).__data = {}
    const html = render.call(md, src)
    return {
      html,
      data: (md as any).__data
    }
  }
  ;(md as any).render = wrappedRender

  return md as any
}
