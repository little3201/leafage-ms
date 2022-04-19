<template>
  <div>
    <div class="flex space-x-8 border-b">
      <button @click="switchType(false)" type="button" title="unread"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none  flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': !isRead }">
        <span class="mb-3 dark:text-white ">{{ $t('unread') }}</span>
        <div v-show="!isRead" class="w-full h-1 bg-blue-600 rounded-t-md"></div>
      </button>
      <button @click="switchType(true)" type="button" title="readed"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': isRead }">
        <span class="mb-3 dark:text-white ">
          {{ $t('readed') }}</span>
        <div v-show="isRead" class="w-full h-1 bg-blue-600 rounded-t-md"></div>
      </button>
    </div>
    <div class="py-4 divide-y">
      <div v-for="(notification, index) in notifications" :key="index" class="p-2">
        <div class="flex items-center">
          <p class="cursor-pointer hover:underline hover:text-blue-600"
            @click="previewOperation(true, notification.code)">{{ notification.title }}</p>
          <span class="text-xs text-gray-400 ml-auto whitespace-no-wrap"
            v-text="new Date(notification.modifyTime).toLocaleString('zh', { hour12: false })"></span>
        </div>
        <div class="w-full text-sm text-gray-500 py-2 truncate">{{ notification.content }}</div>
      </div>
    </div>
    <Preview :isShow="isShow" @closeAction="previewOperation">
      <article class="prose prose-base">
        <strong class="text-lg">{{ data.title }}</strong>
        <p v-text="data.content"></p>
      </article>
    </Preview>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { instance, SERVER_URL } from "@/api";
import type { Notification } from "@/api/request.type";

import Preview from "@/components/Preview.vue"

let notifications = ref<Array<Notification>>([])

let isRead = ref(false)
let isShow = ref(false)
let data = ref<Notification>({})

// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

onMounted(() => {
  retrieve(isRead.value)
})
/**
 * 查询列表
 */
const retrieve = async (read: boolean) => {
  await instance.get(SERVER_URL.notification, { params: { page: page.value, size: size.value, read: read } })
    .then(res => {
      notifications.value = res.data.content
      total.value = res.data.totalElements
    })
}
/**
 * 已读/未读切换
 * @param read 是否已读
 */
const switchType = async (read: boolean) => {
  isRead.value = read
  retrieve(read)
}
/**
 * 预览
 * @param show 是否展示
 * @param code 代码
 */
const previewOperation = (show: boolean, code: string) => {
  if (show) {
    instance.get(SERVER_URL.notification.concat("/", code)).then(res => data.value = res.data);
  }
  isShow.value = show
}

</script>