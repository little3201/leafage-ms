import { defineStore } from 'pinia'
import { Dark } from 'quasar'

export const useAppStore = defineStore('app', {
  state: () => ({
    title: import.meta.env.VITE_APP_TITLE,
    isDark: Dark.isActive
  }),
  actions: {
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      Dark.set(isDark)
    },
    setTitle(title: string) {
      this.title = title
    }
  },
  persist: true
})
