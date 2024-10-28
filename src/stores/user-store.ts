import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { signin, signout } from 'src/api/authentication'
import { fetchMe } from 'src/api/users'
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
      Cookies.remove('username')
      this.$reset()
    },
    async login(username: string, password: string) {
      const res = await signin(username, password)
      if (res.status === 200) {
        const [userResp, privilegesResp] = await Promise.all([fetchMe(), retrievePrivilegeTree()])
        // 执行结果处理
        this.$patch({
          user: userResp.data.user,
          privileges: privilegesResp.data
        })
      }
    }
  },
  persist: true
})
