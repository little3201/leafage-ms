<template>
  <div v-if="account && Object.keys(account).length > 0" class="inline-flex items-center space-x-4 sm:ml-auto text-sm">
    <button title="import" type="button"
      class="hidden sm:inline-flex items-center p-2 rounded-md bg-white  text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" class="mr-2">
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-plus'" />
      </svg>
      Import
    </button>
    <button title="export" type="button" @click="exportFile"
      class="hidden sm:inline-flex items-center p-2 rounded-md bg-white text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" class="mr-2">
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-text'" />
      </svg>
      Export
    </button>
    <button v-if="needAdd" @click="operate"
      class="inline-flex items-center p-2 rounded-md bg-blue-600  text-white hover:bg-blue-700 focus:outline-none active:cursor-wait">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" class="mr-2">
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'plus-circle'" />
      </svg>
      Add&nbsp;
      <span class="hidden sm:block">New</span>
    </button>  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { utils, write, WorkBook, WorkSheet } from 'xlsx'

import type { Account } from "@/api/request.type";

const props = defineProps({
  needAdd: {
    type: Boolean,
    default: true,
  },
  datas: {
    type: Array,
    default: []
  },
  fileName: {
    type: String,
    default: 'export_file'
  }
});

const emit = defineEmits(["modelOperate"]);

const account = ref<Account>({})

onMounted(() => {
  let data = sessionStorage.getItem("account")
  if (data) {
    account.value = JSON.parse(data);
  }
})
/**
 * add 操作
 */
const operate = () => {
  emit("modelOperate", true);
};
/**
 * 数据写入excel并转换成二进制，下载文件
 */
const exportFile = () => {
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