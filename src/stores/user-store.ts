import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

interface User {
  username: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  getters: {
    getUsername(): string | null {
      const user = JSON.parse(LocalStorage.getItem('user') || '{}') as User | null
      return this.user ? this.user.username : (user ? user.username : null)
    }
  },
  actions: {
    updateUser(username: string) {
      // 更新用户状态
      this.user = { username }
      LocalStorage.set('user', JSON.stringify(this.user))
    },

    clearUser() {
      // 清除用户状态
      this.user = null
      LocalStorage.remove('user')
    }
  }
})
