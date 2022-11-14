import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import javascript from 'highlight.js/lib/languages/javascript';
import handlebars from 'highlight.js/lib/languages/handlebars';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import nginx from 'highlight.js/lib/languages/nginx';
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] })
    .use(rehypeHighlight, { languages: { bash, dockerfile, javascript, handlebars, java, json, nginx, shell, sql, typescript, xml, yaml } })
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
