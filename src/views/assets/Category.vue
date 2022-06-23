<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('category') }}
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
        :file-name="'category'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="category"
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
              {{ $t('name') }}
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
              {{ $t('description') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('postsCount') }}
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
                href="https://www.leafage.top/posts"
                target="_blank"
                class="font-medium hover:underline"
              >{{ data.name }}
              </a>
            </td>
            <td
              class="px-4"
              v-text="data.code"
            />
            <td
              class="px-4"
              v-text="data.description"
            />
            <td
              class="px-4"
              v-text="data.count"
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
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <label for="name">{{ $t('name') }}</label>
            <input
              id="name"
              v-model.trim="categoryData.name"
              type="text"
              name="name"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')"
              required
              autofocus
              aria-label="name"
            >
          </div>
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea
              id="description"
              v-model.trim="categoryData.description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('description')"
            />
          </div>
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
import type { Category } from "@/api/request.type";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let categoryData = ref<Category>({
  code: '',
  name: '',
  count: 0,
  description: '',
  modifyTime: new Date()
});
let dataCode = ref("");
let datas = ref<Array<Category>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

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
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await instance.get(SERVER_URL.category, { params: { page: page.value, size: size.value } })
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
  await instance.delete(SERVER_URL.category.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Category) => item.code != dataCode.value
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
    categoryData.value = {
      code: '',
      name: '',
      count: 0,
      description: '',
      modifyTime: new Date()
    };
    if (dataCode.value && dataCode.value.length > 0) {
      await instance.get(SERVER_URL.category.concat("/").concat(dataCode.value))
        .then(res => categoryData.value = res.data);
    }
  }
  isEdit.value = operate;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.category.concat("/", dataCode.value), categoryData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Category) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.category, categoryData.value).then(res => {
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

</script>