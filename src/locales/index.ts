import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
import enUS from './en-US.json'
import zhCN from './zh-CN.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS

const defaultLocale = () => {
    if (localStorage.getItem('language')) {
        return localStorage.getItem('language')
    } else if (navigator.language) {
        return navigator.language
    } else {
        return 'en-US'
    }
}

//注册i8n实例并引入语言文件
const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
    locale: defaultLocale(),
    fallbackLocale: 'en-US', // 默认语言
    allowComposition: true,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
})

export default i18n