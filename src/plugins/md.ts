import { marked } from "marked";

import hljs from "highlight.js/lib/core";
import "highlight.js/styles/ir-black.css";

import accesslog from 'highlight.js/lib/languages/accesslog'
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

hljs.registerLanguage('accesslog', accesslog);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('xml', xml);

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'bash';
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  xhtml: true
})

export default marked