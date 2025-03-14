<template>
  <q-layout>
    <q-page-container class="h-screen">
      <q-page class="flex flex-center">
        <q-circular-progress indeterminate rounded size="60px" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { Cookies } from 'quasar'
import { signIn, handleCallback } from 'src/api/authentication'


const { replace } = useRouter()
const userStore = useUserStore()

const loading = ref(true)

onMounted(() => {
  handleCallback().then(res => {
    if (res) {
      // 回调成功，删除code_verifier
      localStorage.removeItem('code_verifier')
      // 存储id_token
      localStorage.setItem('id_token_hint', res.data.id_token)
      userStore.$patch({
        accessToken: res.data.access_token
      })
      loading.value = false
      // 路由跳转
      replace(Cookies.get('redirect') || '/')
    }
  }).catch(() => {
    // 回调失败，登录
    signIn()
  })
})
</script>