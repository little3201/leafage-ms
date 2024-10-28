import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { signin, signout } from 'src/api/authentication'
import { retrievePrivilegeTree } from 'src/api/privileges'
import type { PrivilegeTreeNode } from 'src/models'

interface User {
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    privileges: [] as PrivilegeTreeNode[]
  }),
  actions: {
    async logout() {
      await signout()
      Cookies.remove('logged_in')
      this.$reset()
    },
    async login(username: string, password: string) {
      const res = await signin(username, password)
      this.$patch({
        user: res.data.user
      })
      // privileges
      const response = await retrievePrivilegeTree()
      this.$patch({
        privileges: response.data
      })
    }
  },
  persist: true
})
