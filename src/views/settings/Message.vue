<template>
  <div>
    <div class="flex space-x-8 border-b text-lg">
      <button
        type="button"
        name="unread"
        aria-label="unread"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none  flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': !operation.read }"
        @click="switchType(false)"
      >
        <span class="mb-3">{{ $t('unread') }}</span>
        <div
          v-show="!operation.read"
          class="w-full h-1 bg-blue-600 rounded-t-md"
        />
      </button>
      <button
        type="button"
        name="read"
        aria-label="read"
        class=" hover:text-blue-700 focus:text-blue-700 focus:outline-none flex flex-col justify-between  pt-3 rounded-t "
        :class="{ 'text-blue-700 border-blue-700': operation.read }"
        @click="switchType(true)"
      >
        <span class="mb-3">
          {{ $t('readed') }}</span>
        <div
          v-show="operation.read"
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
            @click="showPreview(message.id)"
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
      :visible="operation.visible"
      @close="onClose"
    >
      <article class="prose prose-base">
        <strong class="text-lg">{{ data.title }}</strong>
        <p v-text="data.context" />
      </article>
    </Modal>
  </div>
</template>


<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

import { instance, SERVER_URL } from "~/api";
import type { Message } from "~/api/request.type";

import Modal from "~/components/Modal.vue"

let messages = ref<Array<Message>>([])

let operation = reactive({
  read: false,
  visible: false
})

let data = ref<Message>({
  id: 0,
  title: '',
  context: '',
  receiver: '',
  modifyTime: ''
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

onMounted(() => {
  retrieve(username)
})
/**
 * 查询列表
 */
const retrieve = async (receiver: string) => {
  if (receiver && receiver.length > 0) {
    await instance.get(SERVER_URL.messages, { params: { page: pagation.page, size: pagation.size, receiver: receiver } })
      .then(res => {
        messages.value = res.data.content
        pagation.total = res.data.totalElements
      })
  }
}
const fetch = async (id: number) => {
  await instance.get(SERVER_URL.messages.concat(`/${id}`)).then(res => data.value = res.data)
}
/**
 * 已读/未读切换
 * @param read 是否已读
 */
const switchType = async (read: boolean) => {
  operation.read = read
  retrieve(username)
}
/**
 * 预览
 * @param show 是否展示
 * @param id 主键
 */
const showPreview = (id: number) => {
  if (id && id != 0) {
    fetch(id)
  }
  operation.visible = true
}

const onClose = () => {
  operation.visible = false
}
</script>