import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '章三',
    firstname: '',
    lastname: '',
    avatar: '',
    rememberMe: true
  }),
  getters: {
  },
  actions: {
    logout() {
      this.$patch({
        username: '',
        firstname: '',
        lastname: '',
        avatar: '',
        rememberMe: true
      })

      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     */
    async login(username: string, password: string) {
      const userData = await api.post({ username, password })

      this.$patch({
        username,
        ...userData
      })
    }
  }
})
