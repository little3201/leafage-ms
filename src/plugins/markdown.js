import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import container from 'markdown-it-container'
import prism from 'prismjs'

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && prism.loadLanguages[lang]) {
      try {
        return `<pre class="line-numbers"><code class="language-${lang}">` + prism.highlight(str, prism.languages[lang], lang) + `</code></pre>`
      } catch (__) { }
    }
    return `<pre class="line-numbers"><code>` + prism.highlight(md.utils.escapeHtml(str), prism.languages[lang], lang) + `</code></pre>`
  },
  breaks: true
})
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  }) // 使用 anchor 插件为标题元素添加锚点
  // .use(emoji)
  .use(toc, { includeLevel: [2, 3] }) // 使用 table-of-contents 插件实现自动生成目录
  .use(container, 'info')
  .use(container, 'success')
  .use(container, 'warning')
  .use(container, 'danger')

export default md
