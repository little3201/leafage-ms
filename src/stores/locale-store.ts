import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    lang: 'en-US'
  }),
  actions: {
    changeLang(lang: string) {
      // 更新用户状态
      this.lang = lang
    }
  },
  persist: true
})
