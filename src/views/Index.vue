<template>
  <div class="px-4 py-3 h-screen">
    <div class="md:hidden h-1/2 flex items-end justify-center">
      <p class="text-2xl text-white">
        为更好的体验，请使用大屏幕终端浏览！
      </p>
    </div>
    <div class="hidden md:flex flex-row sm-g-h h-full">
      <Aside
        :datas="components"
        class="hidden md:block"
      />
      <main class="hidden md:block px-4 rounded-3xl bg-neutral-100 w-full overflow-hidden">
        <TopBar />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { instance, SERVER_URL } from "~/api";
import type { NodeData } from "~/api/request.type";
import { getCookie } from '../composables/cookies'

import Aside from "~/components/Aside.vue";
import TopBar from "~/components/TopBar.vue";

const components = ref<Array<NodeData>>([]);

onMounted(() => {
  const username =  getCookie("username")
  if(username && username.length){
    retrieveComponents(username)
  }
})

/**
 * 获取消息
 * @param username 账号
 */
 const retrieveComponents = async (username: string) => {
  await instance.get(SERVER_URL.user.concat(`/${username}/components`))
    .then(res => {
      components.value = res.data
    })
}
</script>