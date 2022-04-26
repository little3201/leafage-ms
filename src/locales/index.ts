import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import zhCN from './zh-CN.json'

const defaultLocale = () => {
    if (localStorage.getItem('language')) {
        const locale = localStorage.getItem('language')
        if (locale) {
            return locale.toString()
        }
    } else if (navigator.language) {
        return navigator.language
    } else {
        return 'en-US'
    }
}

//注册i8n实例并引入语言文件
const i18n = createI18n({
    locale: defaultLocale(),
    fallbackLocale: 'en-US', // 默认语言
    allowComposition: true,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
})

export default i18n