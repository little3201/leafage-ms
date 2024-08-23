import { Lang } from 'quasar'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { messages } from 'src/i18n'

import { useLocaleStore } from 'stores/locale-store'

const langList = import.meta.glob('../../node_modules/quasar/lang/(en-US|zh-CN|zh-TW).js')

export default boot(({ app, store }) => {
  const localeStore = useLocaleStore(store)

  const i18n = createI18n({
    legacy: false,
    locale: localeStore.lang || 'zh-CN',
    messages
  })

  // config default language pack
  const langIso = localeStore.lang

  langList[`../../node_modules/quasar/lang/${langIso}.js`]().then(lang => {
    Lang.set(lang.default)
  })

  // Set i18n instance on app
  app.use(i18n)
})
