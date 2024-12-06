import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    lang: 'en-US'
  }),
  actions: {
    changeLang(lang: string) {
      // 更新用户状态
      this.lang = lang
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot));
}
