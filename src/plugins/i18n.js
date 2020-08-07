import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from 'vuetify/lib/locale/en'
import zh from 'vuetify/lib/locale/zh-Hans'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('@/locales/en.json'),
    $vuetify: en
  },
  zh: {
    ...require('@/locales/zh.json'),
    $vuetify: zh
  }
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages
})
