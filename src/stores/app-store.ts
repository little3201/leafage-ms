import { defineStore } from 'pinia'
import { Dark } from 'quasar'

export const useAppStore = defineStore('app', {
  state: () => ({
    title: process.env.TITLE,
    isDark: Dark.isActive
  }),
  actions: {
    setDark(isDark: boolean) {
      this.isDark = isDark
      Dark.set(isDark)
    },
    setTitle(title: string) {
      this.title = title
    }
  },
  persist: true
})
