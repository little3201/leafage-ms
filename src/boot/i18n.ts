import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useLocaleStore } from 'stores/locale-store'

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en-US'];


export default defineBoot(({ app, store }) => {
  const localeStore = useLocaleStore(store)

  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    legacy: false,
    locale: localeStore.lang || 'en-US',
    fallbackLocale: 'en-US',
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
