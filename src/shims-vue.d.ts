declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'qs' {
  import qs from 'qs'
  export default qs
}

declare module 'highlight.js/lib/core' {
  import hljs from 'highlight.js/lib/core'
  export default hljs
}

declare module 'highlight.js/lib/languages/*' {
  export default function(hljs?: HLJSApi): LanguageDetail;
}