import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import zhCN from './zh-CN.json'

//注册i8n实例并引入语言文件
const i18n = createI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US', // 默认语言
    allowComposition: true,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
})

export default i18n