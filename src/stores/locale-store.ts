import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useLocaleStore = defineStore('locale', {
  state: (): {lang: string} => ({
    lang: LocalStorage.getItem('lang') || 'en-US'
  }),
  getters: {
    getLang(): string {
      return this.lang
    }
  },
  actions: {
    setLang(lang: string) {
      // 更新用户状态
      this.lang = lang
      LocalStorage.set('lang', lang)
    }
  }
})
