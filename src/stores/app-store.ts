import { defineStore, acceptHMRUpdate } from 'pinia'
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
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}

