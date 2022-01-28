import { marked } from "marked";

import hljs from "highlight.js/lib/core";
import "highlight.js/styles/ir-black.css";

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

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('html', handlebars);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('sh', shell)
hljs.registerLanguage('xml', xml);

let rendererMD = new marked.Renderer()

//重写a标签，在新标签打开
rendererMD.link = function (href, title, text) {
  return '<a href="' + href + '" title="' + title + '" target="_blank">' + text + '</a>';
}

marked.setOptions({
  renderer: rendererMD,
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default marked