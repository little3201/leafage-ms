import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import { Cookies } from 'quasar'
import messages from 'src/i18n'


export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en-US'];

export const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
  legacy: false,
  locale: Cookies.get('lang') || 'en-US',
  fallbackLocale: 'en-US',
  messages
})

export default defineBoot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
