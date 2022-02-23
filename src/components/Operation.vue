<template>
  <div
    v-if="account && Object.keys(account).length > 0"
    class="inline-flex items-center sm:ml-auto text-sm"
  >
    <button
      title="import"
      type="button"
      class="hidden p-2 rounded-md bg-white sm:inline-flex items-center text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-plus'" />
      </svg>
      Import
    </button>
    <button
      title="export"
      type="button"
      @click="exportFile"
      class="hidden ml-3 p-2 rounded-md bg-white sm:flex items-center text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-text'" />
      </svg>
      Export
    </button>
    <button
      v-if="needAdd"
      @click="operate"
      class="ml-3 p-2 rounded-md bg-blue-600 flex items-center text-white hover:bg-blue-700 focus:outline-none border active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'plus-circle'" />
      </svg>
      <span class="hidden sm:block">Add</span>&nbsp;New
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { utils, write, WorkBook, WorkSheet } from 'xlsx'

import { Account } from "@/api/request";

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
    default: 'sheet1'
  }
});

const emit = defineEmits(["modelOperate"]);

const operate = () => {
  emit("modelOperate", true);
};

const account = ref<Account>({})

onMounted(() => {
  let data = sessionStorage.getItem("account")
  if (data) {
    account.value = JSON.parse(data);
  }
})

const exportFile = () => {
  // 将由对象组成的数组转化成sheet
  const sheet: WorkSheet = utils.json_to_sheet(props.datas, { cellDates: true })
  // 百分数和数字更改为数字类型
  Object.keys(sheet).forEach((key) => {
    if (sheet[key].v) {
      const val = sheet[key].v
      if (!isNaN(val)) {
        sheet[key].t = 'n'
      }
      if (typeof val !== 'number') {
        if (val.lastIndexOf('%') === val.length - 1) {
          sheet[key].t = 'n'
          sheet[key].z = '0.00%'
          sheet[key].v = Number(val.substring(0, val.length - 1)) / 100
        }
      }

    }
  })
  // 创建虚拟的workbook
  const wb: WorkBook = utils.book_new()
  // 把sheet添加到workbook中
  utils.book_append_sheet(wb, sheet, props.fileName)
  const workbookBlob = workbook2blob(wb)
  openDownload(workbookBlob, `${props.fileName}.xlsx`)
}

const workbook2blob = (workbook: WorkBook) => {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  }
  const wbout = write(workbook, wopts)
  // 将字符串转ArrayBuffer
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  return new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
}

const openDownload = (blob: Blob | string, fileName: string) => {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  aLink.download = fileName || ''
  let event: MouseEvent
  if (window.MouseEvent) {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}
</script>