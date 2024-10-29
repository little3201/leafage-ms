import { Lang } from 'quasar'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { messages } from 'src/i18n'

import { useLocaleStore } from 'stores/locale-store'

const langList = import.meta.glob('../../node_modules/quasar/lang/(en-US|zh-CN|zh-TW).js')

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
})

export default boot(({ app, store }) => {
  const localeStore = useLocaleStore(store)

  i18n.global.locale.value = localeStore.lang || 'zh-CN'

  // config default language pack
  const langIso = localeStore.lang

  langList[`../../node_modules/quasar/lang/${langIso}.js`]().then(lang => {
    Lang.set(lang.default)
  })

  // Set i18n instance on app
  app.use(i18n)
})
