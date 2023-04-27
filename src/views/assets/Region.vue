<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :need-add="false"
      :file-name="'region'"
      :items="items"
      @hand-reload="retrieve"
    />
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="region"
      >
        <thead>
          <tr class="sticky top-0 bg-neutral-100 uppercase text-center text-xs sm:text-sm h-12">
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
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-neutral-100 hover:bg-neutral-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td
              class="px-4"
              v-text="data.regionName"
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
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                :editable="true"
                :removeable="true"
                @edit="onModal(data.id)"
                @del="onConfirm"
              />
            </td>
            <Confirm
              :visible="operation.confirm"
            >
              <template #footer>
                <button
                  type="submit"
                  name="confirm"
                  aria-label="confirm"
                  class="w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  @click="confirmCommit(data.id)"
                >
                  {{ $t('confirm') }}
                </button>
                <button
                  type="button"
                  name="cancle"
                  aria-label="cancle"
                  class="mt-3 w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-neutral-600 sm:mt-0 sm:ml-3 sm:w-auto"
                  @click="confirmClose"
                >
                  {{
                    $t('cancle')
                  }}
                </button>
              </template>
            </Confirm>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      :total="pagation.total"
      :page="pagation.page"
      :size="pagation.size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    
    <Drawer
      :visible="operation.modal"
      :title="'编辑行政区划'"
      @close="modalClose"
    >
      <template #content>
        <div class="w-full">
          <label for="name">{{ $t('name') }}</label>
          <input
            id="name"
            v-model.trim="formData.regionName"
            name="name"
            type="text"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('name')"
            required
                
            aria-label="name"
          >
        </div>
        <div class="w-full">
          <label for="superior">{{ $t('superior') }}</label>
          <select
            id="superior"
            v-model="formData.superior"
            name="superior"
            class="mt-1 w-full block rounded-md border-neutral-300"
            aria-label="region superior"
          >
            <option selected>
              ---{{ $t('select') }}---
            </option>
            <option
              v-for="superior in superiors"
              :key="superior.id"
              :value="superior.id"
            >
              {{ superior.regionName }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label for="postal-id">{{ $t('postalCode') }}</label>
          <input
            id="postal-id"
            v-model.trim="formData.postalCode"
            name="postal-id"
            type="number"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('postalCode')"
            aria-label="postal-id"
          >
        </div>
        <div class="w-full">
          <label for="area-id">{{ $t('areaCode') }}</label>
          <input
            id="area-id"
            v-model.trim="formData.areaCode"
            name="area-id"
            type="number"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('areaCode')"
            aria-label="area-id"
          >
        </div>
      </template>
      <template #footer>
        <button
          type="submit"
          name="commit"
          aria-label="commit"
          class="w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="modelCommit(formData.id)"
        >
          {{ $t('commit') }}
        </button>
        <button
          type="button"
          name="cancle"
          aria-label="cancle"
          class="mt-3 w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto"
          @click="modalClose"
        >
          {{
            $t('cancle')
          }}
        </button>
      </template>
    </Drawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Confirm from "~/components/Confirm.vue";
import Drawer from "~/components/Drawer.vue";

import { instance, SERVER_URL } from "~/api";
import type { Region, Item } from "~/api/request.type";

// 模态框参数
let operation = reactive({
  modal: false,
  confirm: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

const initData: Region = {
  id: 0,
  regionName: '',
  superior: '',
  postalCode: 0,
  areaCode: 0,
  modifyTime: ''
}
// form 数据
let formData = ref<Region>(initData);

const items: Item[] = [
  {
    key: 'regionName',
    label: '名称'
  },
  {
    key: 'superior',
    label: '上级'
  }
]
let datas = ref<Array<Region>>([]);
let superiors = ref<Array<Region>>([]);

watch(() => formData.value.id, (newValue: number, oldValue: number) => {
  if (newValue != oldValue) {
    setTimeout(() => retrieveSuperior(newValue), 300)
  }
})

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param page 页码
 * @param size 大小
 */
const setPage = (page: number, size: number) => {
  pagation.page = page;
  pagation.size = size;
};
/**
 * 查询列表
 */
const retrieve = async () => {
  await instance.get(SERVER_URL.region, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};
/**
 * 查询上级信息
 * @param id 主键
 */
 const retrieveSuperior = async (id: number) => {
  let superior = 0
  if (id > 1000) {
    superior = Math.floor(id / 100)
    if (id > 110000000) {
      superior = Math.floor(id / 1000)
    }
    await instance.get(SERVER_URL.region.concat("/", superior + "/lower")).then(res => superiors.value = res.data)
  }
}
/**
 * 获取信息
 * @param id 主键
 */
const fetch = async (id: number) => {
  if (formData.value.id) {
    await instance.get(SERVER_URL.region.concat(`/${id}`)).then(res => formData.value = {...res.data});
  }
}
/**
 * 编辑
 * @param id 主键
 */
const modify = async (id: number) => {
  await instance.put(SERVER_URL.region.concat(`/${id}`), {...formData.value, superiorId: formData.value.superior})
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Region) => item.id != id
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
}
/**
 * confirm 操作
 */
const onConfirm = () => {
  operation.confirm = true;
};
/**
 * confirm 提交
 */
const confirmCommit = async (id: number) => {
  await instance.delete(SERVER_URL.region.concat(`/${id}`)).then(() => {
    retrieve()
    confirmClose()
  });
};
/**
 * 关闭modal
 */
const modalClose = () => {
  operation.modal = false
}
/**
 * 关闭modal
 */
 const confirmClose = () => {
  operation.confirm = false
}
/**
 * 新增/编辑：打开
 * @param id 主键
 */
const onModal = (id: number) => {
  if (id && id != 0) {
    Promise.all([
      fetch(id),
      retrieveSuperior(id)
    ])
  } else {
    formData.value = initData;
  }
  operation.modal = true;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (id: number) => {
  if (id && id != 0) {
    modify(id)
  }
  modalClose()
};

</script>