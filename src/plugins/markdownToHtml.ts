import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
  .use(remarkRehype)
  .use(remarkGfm)
  .use(rehypeHighlight)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      span: [
        ...(defaultSchema.attributes?.span || []),
        // List of all allowed tokens:
        [
          'className', 'hljs-addition', 'hljs-attr', 'hljs-attribute', 'hljs-built_in', 'hljs-bullet', 
          'hljs-char', 'hljs-code', 'hljs-comment', 'hljs-deletion', 'hljs-doctag', 'hljs-emphasis', 
          'hljs-formula', 'hljs-keyword', 'hljs-link', 'hljs-literal', 'hljs-meta', 'hljs-name', 
          'hljs-number', 'hljs-operator', 'hljs-params', 'hljs-property', 'hljs-punctuation', 
          'hljs-quote', 'hljs-regexp', 'hljs-section', 'hljs-selector-attr', 'hljs-selector-class', 
          'hljs-selector-id', 'hljs-selector-pseudo', 'hljs-selector-tag', 'hljs-string', 'hljs-strong', 
          'hljs-subst', 'hljs-symbol', 'hljs-tag', 'hljs-template-tag', 'hljs-template-variable', 
          'hljs-title', 'hljs-type', 'hljs-variable'
        ]]
      }
    }
  )
  .use(rehypeStringify)
  .process(markdown)
  return result.toString()
}
