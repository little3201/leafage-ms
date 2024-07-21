import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'

interface User {
  username: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  getters: {
    getUsername(): string | null {
      const user = JSON.parse(SessionStorage.getItem('user') || '{}') as User | null
      return this.user ? this.user.username : (user ? user.username : null)
    }
  },
  actions: {
    updateUser(username: string) {
      // 更新用户状态
      this.user = { username }
      SessionStorage.set('user', JSON.stringify(this.user))
    },

    clearUser() {
      // 清除用户状态
      this.user = null
      SessionStorage.remove('user')
    }
  }
})
