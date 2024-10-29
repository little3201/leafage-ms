import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    lang: 'en-US' as 'zh-CN' | 'en-US' | 'zh-TW'
  }),
  actions: {
    changeLang(lang: 'zh-CN' | 'en-US' | 'zh-TW') {
      // 更新用户状态
      this.lang = lang
    }
  },
  persist: true
})
