<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('resource') }}
      </h2>
      <button
        type="button"
        name="reload"
        aria-label="reload"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
        @click="retrieve"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation
        :datas="datas"
        :file-name="'resource'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="portfolio"
      >
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th
              scope="col"
              class="px-4 py-2 sm:py-3 text-left"
            >
              {{ $t('no') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('title') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('code') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('type') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('category') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('description') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('viewed') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('downloads') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('modifyTime') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in datas"
            :key="index"
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <a
                rel="noopener"
                href="https://www.leafage.top/resource"
                target="_blank"
                class="font-medium hover:underline"
              >{{ data.title }}
              </a>
            </td>
            <td
              class="px-4"
              v-text="data.code"
            />
            <td class="px-4">
              <span
                class="text-xs px-2 py-1 rounded-md"
                :class="data.type === 'E' ? 'bg-indigo-100' : (data.type === 'P' ? 'bg-blue-100' : 'bg-pink-100')"
              >{{
                data.type === 'E' ? 'epub' : (data.type === 'P' ? 'pdf' : 'txt')
              }}</span>
            </td>
            <td
              class="px-4"
              v-text="data.category.name"
            />
            <td
              class="px-4 max-w-sm truncate"
              v-text="data.description"
            />
            <td
              class="px-4"
              v-text="data.viewed"
            />
            <td
              class="px-4"
              v-text="data.downloads"
            />
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                @click.capture="dataCode = data.code"
                @del-action="confirmOperate"
                @edit-action="modalOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Page
      :total="total"
      :page="page"
      :size="size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Confirm
      :is-show="isDel"
      @cancel-action="confirmOperate"
      @commit-action="confirmCommit"
    />
    <Modal
      :is-show="isEdit"
      @cancel-action="modalOperate"
      @commit-action="modelCommit"
    >
      <form @submit.prevent>
        <div class="grid grid-cols-12 grid-rows-3 gap-4">
          <div class="col-span-12 sm:col-span-7">
            <label for="title">{{ $t('title') }}</label>
            <input
              id="title"
              v-model.trim="resourceData.title"
              name="title"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('title')"
              required
              autofocus
              aria-label="title"
            >
          </div>
          <div class="col-span-12 sm:col-span-5 row-span-3 mb-1">
            <label for="cover">{{ $t('cover') }}</label>
            <figure
              v-if="resourceData.cover"
              class="w-44 h-56 relative group"
            >
              <div
                class="absolute w-full h-full rounded-md bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center"
              >
                <button
                  name="remove-cover"
                  aria-label="remove-cover"
                  type="button"
                  class="text-white focus:outline-none"
                  @click="removeCover"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
                  </svg>
                </button>
              </div>
              <img
                id="cover"
                :src="resourceData.cover"
                alt="portfolio content"
                class="rounded-md w-full h-full mt-1 border"
                height="176"
                width="224"
              >
            </figure>
            <div
              v-else
              class="mt-1"
            >
              <div class="w-44 h-56 rounded-md border border-gray-300 shadow-sm flex justify-center items-center">
                <div class="text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-blue-600"
                  >
                    <svg
                      class="mx-auto h-8 w-8"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      id="cover-upload"
                      name="cover-upload"
                      multiple
                      type="file"
                      class="sr-only"
                      accept="image/png, image/jpeg, image/jpg, vedio/mp4"
                      aria-label="cover-upload"
                      @change="uploadImage($event)"
                    >
                  </label>
                  <p class="text-xs text-gray-500">
                    png, jpeg, jpg, mp4
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-7">
            <label
              for="category"
              class="inline-flex items-center"
            >{{ $t('category') }}</label>
            <select
              id="category"
              v-model="resourceData.category.code"
              name="category"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="resource category"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.name"
              />
            </select>
          </div>
          <div class="col-span-12 sm:col-span-7">
            <label
              for="type"
              class="inline-flex items-center"
            >{{ $t('type') }}</label>
            <select
              id="type"
              v-model="resourceData.type"
              name="type"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="type"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option value="E">
                Epub
              </option>
              <option value="P">
                Pdf
              </option>
              <option value="T">
                Txt
              </option>
            </select>
          </div>
        </div>
        <div class="col-span-7 row-span-2 mt-4">
          <label for="description">{{ $t('description') }}</label>
          <textarea
            id="description"
            v-model.trim="resourceData.description"
            name="description"
            class="mt-1 w-full block rounded-md border-gray-300"
            :placeholder="$t('description')"
          />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Page from "@/components/Page.vue";
import Confirm from "@/components/Confirm.vue";
import Modal from "@/components/Modal.vue";

import { instance, SERVER_URL } from "@/api";
import type { Resource, Category } from "@/api/request.type";
import { uploadFile } from "@/composables/upload";

// 数据
let resourceData = ref<Resource>({
  code: '',
  title: '',
  type: '',
  cover: '',
  category: {
    code: '',
    name: '',
    count: 0,
    description: '',
    modifyTime: ''
  },
  viewed: 0,
  downloads: 0,
  description: '',
  modifyTime: ''
});
let dataCode = ref("");
let datas = ref<Array<Resource>>([]);
let categories = ref<Array<Category>>([])
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);
// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param p 页码
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
/**
 * 删除封面图
 */
const removeCover = (): void => {
  resourceData.value.cover = '';
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await instance.get(SERVER_URL.resource, { params: { page: page.value, size: size.value } })
    .then(res => {
      datas.value = res.data.content
      total.value = res.data.totalElements
    })
};
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.resource.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Resource) => item.code != dataCode.value
    );
    isDel.value = false;
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modalOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    resourceData.value = {
      code: '',
      title: '',
      type: '',
      cover: '',
      category: {
        code: '',
        name: '',
        count: 0,
        description: '',
        modifyTime: ''
      },
      viewed: 0,
      downloads: 0,
      description: '',
      modifyTime: ''
    };
    await Promise.all([instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } })
      .then(res => categories.value = res.data.content),
    fetch()]);
  }
  isEdit.value = operate;
};
/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.resource.concat("/", dataCode.value)).then(res => resourceData.value = res.data)
  }
}
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.resource.concat("/", dataCode.value), resourceData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Resource) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.resource, resourceData.value).then(res => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
};

// 上传文件
const uploadImage = (event: any): void => {
  if (event && event.target && event.target.files) {

    let files: Array<File> = event.target.files

    if (files[0]) {
      uploadFile(files[0]).subscribe({
        // next: (result) => {},
        // error: () => {},
        complete: (e: any) => {
          resourceData.value = { ...resourceData.value, cover: "https://cdn.leafage.top/" + e.key };
        }
      })
    }
  }

};

</script>