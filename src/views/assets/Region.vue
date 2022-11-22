<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('region') }}
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
        :file-name="'region'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="region"
      >
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm h-12">
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
              {{ $t('alias') }}
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
              {{ $t('areaCode') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('postalCode') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('superior') }}
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
            <td
              class="px-4"
              v-text="data.name"
            />
            <td
              class="px-4"
              v-text="data.alias"
            />
            <td
              class="px-4"
              v-text="data.code"
            />
            <td
              class="px-4"
              v-text="data.areaCode ? data.areaCode : '-'"
            />
            <td
              class="px-4"
              v-text="data.postalCode ? data.postalCode.toString().padStart(6, '0') : '-'"
            />
            <td
              class="px-4"
              v-text="data.superior"
            />
            <td
              class="px-4"
              v-text="data.description"
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
          <div class="col-span-12 sm:col-span-6">
            <label for="name">{{ $t('name') }}</label>
            <input
              id="name"
              v-model.trim="regionData.name"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')"
              required
              autofocus
              aria-label="name"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">{{ $t('alias') }}</label>
            <input
              id="alias"
              v-model.trim="regionData.alias"
              name="alias"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('alias')"
              aria-label="alias"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="code">{{ $t('code') }}</label>
            <input
              id="code"
              v-model.trim="regionData.code"
              name="code"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('code')"
              aria-label="code"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select
              id="superior"
              v-model="regionData.superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="region superior"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
              >
                {{ superior.name }}
              </option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="postal-code">{{ $t('postalCode') }}</label>
            <input
              id="postal-code"
              v-model.trim="regionData.postalCode"
              name="postal-code"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('postalCode')"
              aria-label="postal-code"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="area-code">{{ $t('areaCode') }}</label>
            <input
              id="area-code"
              v-model.trim="regionData.areaCode"
              name="area-code"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('areaCode')"
              aria-label="area-code"
            >
          </div>
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea
              id="description"
              v-model.trim="regionData.description"
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
import { onMounted, ref, watch } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Page from "@/components/Page.vue";
import Confirm from "@/components/Confirm.vue";
import Modal from "@/components/Modal.vue";

import { instance, SERVER_URL } from "@/api";
import type { Region } from "@/api/request.type";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let regionData = ref<Region>({
  code: 0,
  name: '',
  superior: '',
  alias: '',
  postalCode: 0,
  areaCode: 0,
  description: '',
  modifyTime: ''
});
let dataCode = ref();
let datas = ref<Array<Region>>([]);
let superiors = ref<Array<Region>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

watch(() => regionData.value.code, (newValue: number, oldValue: number) => {
  if (newValue != oldValue) {
    setTimeout(() => retrieveSuperior(newValue), 300)
  }
})

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
  await instance.get(SERVER_URL.region, { params: { page: page.value, size: size.value } })
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
  await instance.delete(SERVER_URL.region.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Region) => item.code != dataCode.value
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
    regionData.value = {
      code: 0,
      name: '',
      superior: '',
      alias: '',
      postalCode: 0,
      areaCode: 0,
      description: '',
      modifyTime: ''
    };
    superiors.value = []
    await Promise.all([
      fetch(),
      retrieveSuperior(dataCode.value)
    ])
  }
  isEdit.value = operate;
};
/**
 * 查询上级信息
 * @param code 代码
 */
const retrieveSuperior = async (code: number) => {
  let superior = 0
  if (code > 1000) {
    superior = Math.floor(code / 100)
    if (code > 110000000) {
      superior = Math.floor(code / 1000)
    }
    await instance.get(SERVER_URL.region.concat("/", superior + "/lower")).then(res => superiors.value = res.data)
  }
}
/**
 * 获取信息
 */
const fetch = async () => {
  if (dataCode.value) {
    await instance.get(SERVER_URL.region.concat("/", dataCode.value)).then(res => regionData.value = res.data);
  }
}
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.region.concat("/", dataCode.value), regionData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Region) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.region, regionData.value).then(res => {
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