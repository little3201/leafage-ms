<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :file-name="'category'"
      :items="items"
      @hand-reload="retrieve"
      @hand-add="onModal"
    />
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="category"
      >
        <thead>
          <tr class="sticky top-0 bg-neutral-100 uppercase text-center text-xs sm:text-sm">
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
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-neutral-100 hover:bg-neutral-50 hover:text-blue-600"
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
                v-text="data.categoryName"
              />
            </td>
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
                :editable="true"
                :removeable="true"
                @edit="onModal(data.id)"
                @del="onConfirm"
              />
            </td>
            <Confirm :visible="operation.confirm">
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
                  class="mt-3 w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-neutral-400 sm:mt-0 sm:ml-3 sm:w-auto"
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
      :title="'编辑类目'"
      @close="modalClose"
    >
      <template #content>
        <div class="w-full">
          <label for="name">{{ $t('name') }}</label>
          <input
            id="name"
            v-model.trim="formData.categoryName"
            type="text"
            name="name"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('name')"
            required
              
            aria-label="name"
          >
        </div>
        <div class="w-full">
          <label for="description">{{ $t('description') }}</label>
          <textarea
            id="description"
            v-model.trim="formData.description"
            name="description"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('description')"
          />
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
import { ref, reactive, onMounted } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Confirm from "~/components/Confirm.vue";
import Drawer from "~/components/Drawer.vue";

import { instance, SERVER_URL } from "~/api";
import type { Category, Item } from "~/api/request.type";

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

// 初始化
const initData: Category = {
  id: 0,
  categoryName: '',
  count: 0,
  description: '',
  modifyTime: ''
}
// form 数据
let formData = ref<Category>(initData);

let datas = ref<Array<Category>>([]);
  
const items: Item[] = [
  {
    key: 'categoryName',
    label: '名称'
  }
]

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
  await instance.get(SERVER_URL.category, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};
/**
 * 查询
 * @param id 主键
 */
const fetch = async (id: number) => {
  await instance.get(SERVER_URL.category.concat(`/${id}`))
    .then(res => formData.value = { ...res.data });
}
/**
 * 添加
 */
const create = async () => {
  await instance.post(SERVER_URL.category, formData.value).then(res => {
    if (datas.value.length >= pagation.size) {
      // 删除第一个
      datas.value.shift();
    }
    // 将结果添加到第一个
    datas.value.unshift(res.data);
  });
}
/**
 * 编辑
 * @param id 主键
 */
const modify = async (id: number) => {
  await instance
    .put(SERVER_URL.category.concat(`/${id}`), formData.value)
    .then(res => {
      // 将datas中修改项的历史数据删除
      datas.value = datas.value.filter(
        (item: Category) => item.id != formData.value.id
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
  await instance.delete(SERVER_URL.category.concat(`/${id}`)).then(() => {
    retrieve()
    confirmClose()
  });
};
/**
 * 关闭 drawer
 */
 const modalClose = () => {
  operation.modal = false
}
/**
 * 关闭 confirm
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
    fetch(id);
  } else {
    formData.value = initData
  }
  operation.modal = true;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = (id: number) => {
  if (id && id != 0) {
    modify(id)
  } else {
    create()
  }
  modalClose();
};

</script>