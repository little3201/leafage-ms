import { marked } from "marked";

import hljs from "highlight.js/lib/core";
import "highlight.js/styles/ir-black.css";

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