<template>
  <div class="shadow overflow-hidden bg-white sm:rounded-md">
    <div class="px-6 py-4">
      <div class="flex items-center border-b">
        <button
          @click="switchType(false)"
          type="button"
          class="inline-flex items-center p-2 hover:text-blue-600 hover:bg-gray-100 rounded-t-md"
          :class="{ 'text-blue-600 border border-b-0 ': !isRead }"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'book'" />
          </svg>
          Unread
        </button>
        <button
          @click="switchType(true)"
          type="button"
          class="inline-flex items-center p-2 hover:text-blue-600 hover:bg-gray-100 rounded-t-md"
          :class="{ 'text-blue-600 border border-b-0': isRead }"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'book-open'" />
          </svg>
          Readed
        </button>
      </div>
      <div class="py-4 divide-y">
        <div v-for="(notification, index) in notifications" :key="index" class="p-2">
          <div class="flex items-center">
            <p
              class="cursor-pointer hover:underline"
              @click="previewOperation(true, notification.code)"
            >{{ notification.title }}</p>
            <span
              class="text-xs text-gray-400 ml-auto whitespace-no-wrap"
              v-text="new Date(notification.modifyTime).toLocaleString()"
            ></span>
          </div>
          <div class="w-full text-sm text-gray-500 py-2 truncate">{{ notification.content }}</div>
        </div>
      </div>
    </div>
    <Preview :isShow="isShow" @closeAction="previewOperation">
      <article class="prose prose-sm sm:prose">
        <strong class="text-lg">{{ data.title }}</strong>
        <p v-html="data.content"></p>
      </article>
    </Preview>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import instance from "@/api";
import { SERVER_URL, Notification } from "@/api/request";

import Preview from "@/components/Preview.vue"

let notifications = ref<Array<Notification>>([])

let isRead = ref(false)
let isShow = ref(false)
let data = ref<Notification>({})

const retrieve = async () => {
  await instance.get(SERVER_URL.notification, { params: { page: 0, size: 12 } })
    .then((res) => notifications.value = res.data);
}

const switchType = async (readed: boolean) => {
  isRead.value = readed
  let page = 1
  if (readed) {
    page = 0
  }
  await instance.get(SERVER_URL.notification, { params: { page: page, size: 12 } })
    .then((res) => notifications.value = res.data);
}

const previewOperation = (show: boolean, code: string) => {
  if (show) {
    instance.get(SERVER_URL.notification.concat("/", code)).then((res) => data.value = res.data);
  }
  isShow.value = show
}

onMounted(() => {
  retrieve()
})
</script>