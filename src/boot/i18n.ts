import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { messages } from 'src/i18n'

import { useLocaleStore } from 'stores/locale-store'

const localeStore = useLocaleStore()

export default boot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: localeStore.getLang || 'zh-CN',
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
