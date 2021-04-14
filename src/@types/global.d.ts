declare module 'highlight.js/lib/core' {
    import hljs from 'highlight.js/lib/core'
    export default hljs
}

declare module 'highlight.js/lib/languages/*' {
    export default function (hljs?: HLJSApi): LanguageDetail;
}

declare module 'crypto-js' {
    import CryptoJS from 'crypto-js'
    export default CryptoJS
}