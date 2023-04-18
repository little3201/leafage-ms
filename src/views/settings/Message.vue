<template>
  <div>
    <div class="flex space-x-8 border-b text-lg">
      <button
        type="button"
        name="unread"
        aria-label="unread"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none  flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': !isRead }"
        @click="switchType(false)"
      >
        <span class="mb-3">{{ $t('unread') }}</span>
        <div
          v-show="!isRead"
          class="w-full h-1 bg-blue-600 rounded-t-md"
        />
      </button>
      <button
        type="button"
        name="read"
        aria-label="read"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': isRead }"
        @click="switchType(true)"
      >
        <span class="mb-3">
          {{ $t('readed') }}</span>
        <div
          v-show="isRead"
          class="w-full h-1 bg-blue-600 rounded-t-md"
        />
      </button>
    </div>
    <div class="py-4 divide-y">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="py-2"
      >
        <div class="flex items-center">
          <p
            class="cursor-pointer hover:underline hover:text-blue-600"
            @click="previewOperation(true, message.id)"
          >
            {{ message.title }}
          </p>
          <span
            class="text-xs text-gray-400 ml-auto whitespace-no-wrap"
            v-text="new Date(message.modifyTime).toLocaleString('zh', { hour12: false })"
          />
        </div>
        <div class="w-full text-sm text-gray-500 py-2 truncate">
          {{ message.context }}
        </div>
      </div>
    </div>
    <Modal
      :is-show="isShow"
      :need-footer="false"
      @close-action="previewOperation"
    >
      <article class="prose prose-base">
        <strong class="text-lg">{{ data.title }}</strong>
        <p v-text="data.context" />
      </article>
    </Modal>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { instance, SERVER_URL } from "~/api";
import type { Message } from "~/api/request.type";

import Modal from "~/components/Modal.vue"

let messages = ref<Array<Message>>([])

let isRead = ref(false)
let isShow = ref(false)
let data = ref<Message>({
  id: 0,
  title: '',
  context: '',
  receiver: '',
  modifyTime: ''
})

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
  await instance.get(SERVER_URL.messages, { params: { page: page.value, size: size.value, read: read } })
    .then(res => {
      messages.value = res.data.content
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
 * @param id 主键
 */
const previewOperation = (show: boolean, id: number) => {
  if (show) {
    instance.get(SERVER_URL.messages.concat(`/${id}`)).then(res => data.value = res.data);
  }
  isShow.value = show
}

</script>