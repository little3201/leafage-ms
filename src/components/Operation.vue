<template>
  <div class="flex justify-between items-center">
    <div class="inline-flex">
      <form>
        <div class="flex items-center relative">
          <button
            class="flex-shrink-0 inline-flex items-center py-2 px-3 text-sm text-center text-neutral-900 border border-neutral-300 rounded-l-lg hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white dark:border-neutral-600"
            type="button"
            @click="onShow"
          >
            {{ items[0].label }}
            <ChevronDownIcon
              class="w-4 h-4 ml-2"
              aria-hidden="true"
            />
          </button>
          <ul
            v-show="visible && items.length > 0"
            class="absolute top-10 z-10 bg-white divide-y divide-neutral-100 rounded-lg shadow-lg dark:bg-neutral-700 py-2 text-sm text-neutral-700 dark:text-neutral-200"
          >
            <li
              v-for="(item, index) in items"
              :key="index"
            >
              <button
                type="button"
                class="inline-flex justify-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-white"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
          <div class="relative w-full inline-flex items-center">
            <input
              id="search-dropdown"
              type="search"
              class="p-2 w-72 text-sm text-neutral-900 bg-neutral-50 rounded-r-lg border-l-neutral-50 border focus:ring-0 border-neutral-300 dark:bg-neutral-700 dark:border-l-neutral-700  dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
              placeholder="Search Mockups..."
              required
            >
            <button
              type="submit"
              class="absolute top-px bottom-px right-0 p-2 my-auto text-white bg-blue-600 hover:bg-blue-700 rounded-r-lg focus:outline-none inline-flex items-center"
            >
              <MagnifyingGlassIcon
                class="w-5 h-5"
                aria-hidden="true"
              />
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <button
        type="button"
        name="reload"
        aria-label="reload"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none"
        @click="onReload"
      >
        <ArrowPathIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('reload') }}
      </button>
    </div>
    <div v-if="isLogin">
      <div class="inline-flex items-center space-x-4 sm:ml-auto text-sm">
        <button
          title="export"
          name="export"
          aria-label="export"
          type="button"
          class="inline-flex items-center p-2 rounded-md bg-white text-neutral-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none"
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
          title="import"
          name="import"
          aria-label="import"
          type="button"
          class="inline-flex items-center p-2 rounded-md bg-white  text-neutral-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none"
        >
          <DocumentPlusIcon
            class="w-5 h-5 mr-2"
            aria-hidden="true"
          />
          {{ $t('import') }}
        </button>
        <button
          v-if="needAdd"
          name="add"
          aria-label="add"
          class="inline-flex items-center p-2 rounded-md bg-blue-600  text-white hover:bg-blue-700 focus:outline-none"
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, PropType } from "vue";
import { utils, write, WorkBook, WorkSheet } from 'xlsx'
import { getCookie } from "~/composables/cookies";

import type { Item } from "~/api/request.type";
import { ArrowPathIcon, ChevronDownIcon, DocumentPlusIcon, DocumentTextIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

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
  },
  items: {
    type: Array as PropType<Item[]>,
    default: () => {
      return []
    }
  }
});

const emit = defineEmits(["handReload", "handAdd"]);

const visible = ref(false)

const isLogin = ref(false);

onMounted(() => {
  const username = getCookie('username');
  if (username && username.length > 0) {
    isLogin.value = true;
  }
});
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
const onShow = () => {
  visible.value = !visible.value
}
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