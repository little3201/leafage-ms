import { defineStore, acceptHMRUpdate } from 'pinia'
import { signin, signout } from 'src/api/authentication'
import { fetchMe } from 'src/api/users'
import { retrievePrivilegeTree } from 'src/api/privileges'
import type { PrivilegeTreeNode } from 'src/models'


export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    privileges: [] as PrivilegeTreeNode[]
  }),
  actions: {
    async logout() {
      const res = await signout()
      if (res.status === 200) {
        this.$reset()
      }
    },
    async login(username: string, password: string) {
      const res = await signin(username, password)
      if (res.status === 200) {
        const [userResp, privilegesResp] = await Promise.all([fetchMe(), retrievePrivilegeTree()])
        // 执行结果处理
        this.$patch({
          username: userResp.data.username,
          privileges: privilegesResp.data
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

