import { defineStore, acceptHMRUpdate } from 'pinia'
import { signin, signout } from 'src/api/authentication'
import { fetchMe } from 'src/api/users'
import { retrievePrivilegeTree } from 'src/api/privileges'
import type { PrivilegeTreeNode } from 'src/models'



export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    fullName: '',
    email: '',
    avatar: '',
    privileges: [] as PrivilegeTreeNode[]
  }),
  actions: {
    async logout() {
      const res = await signout()
      if (res.status === 200) {
        this.$reset()
        localStorage.removeItem('access_token')
      }
    },
    async login(username: string, password: string) {
      const res = await signin(username, password)
      if (res.status === 200) {
        localStorage.setItem('access_token', res.data)
        const [userResp, privilegesResp] = await Promise.all([fetchMe(), retrievePrivilegeTree()])
        // 执行结果处理
        this.$patch({
          username: userResp.data.username,
          fullName: userResp.data.fullName,
          email: userResp.data.email,
          avatar: userResp.data.avatar,
          privileges: privilegesResp.data
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

