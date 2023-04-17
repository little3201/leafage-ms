<template>
  <div
    v-if="user.username && user.username.length > 0"
    class="flex justify-between items-center"
  >
    <h2 class="text-lg font-medium">
      {{ $t($route && $route.name ? $route.name.toString().toLowerCase() : '') }}
    </h2>
    <button
      type="button"
      name="reload"
      aria-label="reload"
      class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
      @click="onReload"
    >
      <ArrowPathIcon
        class="w-5 h-5 mr-2"
        aria-hidden="true"
      />
      {{ $t('reload') }}
    </button>
    <div
      class="inline-flex items-center space-x-4 sm:ml-auto text-sm"
    >
      <button
        title="import"
        name="import"
        aria-label="import"
        type="button"
        class="hidden sm:inline-flex items-center p-2 rounded-md bg-white  text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
      >
        <DocumentPlusIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('import') }}
      </button>
      <button
        title="export"
        name="export"
        aria-label="export"
        type="button"
        class="hidden sm:inline-flex items-center p-2 rounded-md bg-white text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
        @click="onExport"
      >
        <DocumentTextIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('export') }}
      </button>
      <button
        v-if="needAdd"
        name="add"
        aria-label="add"
        class="inline-flex items-center p-2 rounded-md bg-blue-600  text-white hover:bg-blue-700 focus:outline-none active:cursor-wait"
        @click="onAdd"
      >
        <PlusCircleIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('add') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { utils, write, WorkBook, WorkSheet } from 'xlsx'

import type { User } from "~/api/request.type";

import { ArrowPathIcon, DocumentPlusIcon, DocumentTextIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  needAdd: {
    type: Boolean,
    default: true,
  },
  datas: {
    type: Array,
    default: () => {
      return []
    }
  },
  fileName: {
    type: String,
    default: 'export_file'
  }
});

const emit = defineEmits(["handReload", "handAdd"]);

const user = ref<User>({
  username: '',
  nickname: '',
  avatar: '',
  enabled: true,
  accountExpiresAt: '',
  accountLocked: false,
  credentialsExpiresAt: ''
})

onMounted(() => {
  let data = sessionStorage.getItem("user")
  if (data && data !== "undefined") {
    user.value = JSON.parse(data);
  }
})
/**
 * add 操作
 */
const onReload = () => {
  emit("handReload");
};
/**
 * add 操作
 */
const onAdd = () => {
  emit("handAdd");
};
/**
 * 数据写入excel并转换成二进制，下载文件
 */
const onExport = () => {
  const sheet: WorkSheet = utils.json_to_sheet(props.datas, { cellDates: true })
  const wb: WorkBook = utils.book_new()
  // 把sheet添加到workbook中
  utils.book_append_sheet(wb, sheet, 'sheet1')

  const blob: Blob = new Blob([str2buffer(write(wb, { type: 'binary' }))], { type: 'application/octet-stream' })

  downloadFile(blob, `${props.fileName}.xlsx`)
}
/**
 * 将字符串转字节流
 * @param str 数据内容
 */
const str2buffer = (str: string) => {
  const buf = new ArrayBuffer(str.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== str.length; ++i) view[i] = str.charCodeAt(i) & 0xff
  return buf
}
/**
 * 模拟鼠标点击，下载文件
 * @param blob 字节流
 * @param fileName 输出文件名
 */
const downloadFile = (blob: Blob, fileName: string) => {
  const anchor: HTMLAnchorElement = document.createElement('a')
  anchor.href = URL.createObjectURL(blob)
  anchor.download = fileName || ''
  let event: MouseEvent
  if (window.MouseEvent) {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
  }
  anchor.dispatchEvent(event)
}
</script>