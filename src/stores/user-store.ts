import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { api } from 'boot/axios'
import { retrievePrivilegeTree } from 'src/api/privileges'
import type { Privilege } from 'src/models'
import type { RouteRecordRaw } from 'vue-router'

interface User {
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    access_token: null as string | null,
    privileges: [] as Privilege[],
    routes: [] as RouteRecordRaw[]
  }),
  actions: {
    async logout() {
      await api.post('/logout').then(() => {
        Cookies.remove('logged_in')
        this.$reset()
      })
    },
    async login(username: string, password: string) {
      await api.post('/login', new URLSearchParams({ username, password })).then(res => {
        this.$patch({
          user: res.data.user,
          access_token: res.data.access_token
        })
        // privileges
        retrievePrivilegeTree(username).then(response => {
          this.$patch({
            privileges: response.data
          })
        })
      })
    },
    updateRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes
    }
  },
  persist: {
    paths: ['user', 'access_token', 'privileges']
  }
})
