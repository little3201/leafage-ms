import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import container from 'markdown-it-container'
import prism from 'markdown-it-prism'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typography: true,
  breaks: true
})
  .use(anchor) // 使用 anchor 插件为标题元素添加锚点
  .use(prism, {
    plugins: ['toolbar', 'line-numbers', 'show-language', 'copy-to-clipboard'],
    defaultLanguageForUnknown: 'bash',
    defaultLanguageForUnspecified: 'bash',
    defaultLanguage: 'bash'
  })
  .use(toc) // 使用 table-of-contents 插件实现自动生成目录
  .use(container, 'info')
  .use(container, 'success')
  .use(container, 'warning')
  .use(container, 'danger')

export default md
