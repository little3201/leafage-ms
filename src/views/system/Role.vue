<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Roles</h2>
      <button
        @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
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
        Reload Data
      </button>
      <Operation
        @click.capture="dataCode = ''"
        @modelOperate="modelOperate"
        :datas="datas"
        :fileName="'role'"
      />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="role">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">User Count</th>
            <th scope="col" class="px-4">Description</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 group hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4" v-text="data.name"></td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action
                @click.capture="dataCode = data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <button
                  type="button"
                  title="Authority"
                  class="flex items-center mr-3 text-purple-600 focus:outline-none"
                  @click.prevent="treeOperate(true)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-power mr-1"
                  >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                    <line x1="12" y1="2" x2="12" y2="12" />
                  </svg>
                  Auz
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6">
            <label for="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              aria-label="name"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Name"
              v-model.trim="roleData.name"
              autofocus
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="superior">Superior</label>
            <select
              id="superior"
              name="superior"
              aria-label="superior"
              v-model="roleData.superior"
              class="mt-1 w-full block rounded-md border-gray-300"
            >
              <option value="undefined">---请选择---</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">Description</label>
            <textarea
              id="description"
              aria-label="description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              v-model.trim="roleData.description"
            />
          </div>
        </div>
      </form>
    </Model>
    <Tree
      :isShow="isTree"
      @cancelAction="treeOperate"
      @commitAction="treeCommit"
      :codes="codes"
      :datas="authorities"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";
import Tree from "@/components/tree/Tree.vue";

import { instance, SERVER_URL } from "@/api";
import type { Role, Authority } from "@/api/request.type";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
let isTree = ref(false);
// 数据
let roleData = ref<Role>({});
let dataCode = ref("");
let superiors = ref<Array<Role>>([]);
let authorities = ref<Array<Authority>>([]);
let codes = ref<Array<String>>([])
let datas = ref<Array<Role>>([]);
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
 * @param s 分页大小
 */
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await Promise.all([
    instance
      .get(SERVER_URL.role, { params: { page: page.value, size: size.value } })
      .then((response) => {
        datas.value = response.data;
      }),
    count()
  ]);
};
/**
 * 统计
 */
const count = (): void => {
  instance.get(SERVER_URL.role.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
}
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.role.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modelOperate = async (operate: boolean) => {
  if (operate) {
    roleData.value = {};
    await Promise.all([
      fetch(),
      await instance.get(SERVER_URL.role).then((res) => {
        superiors.value = res.data;
      }),
    ]);
  }
  isEdit.value = operate;
};
/**
 * 查详情
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.role.concat("/", dataCode.value)).then((res) => {
      roleData.value = res.data;
    });
  }
};
/**
 * 授权：打开
 * @param operate 是否打开
 */
const treeOperate = async (operate: boolean) => {
  if (operate) {
    await Promise.all([
      instance.get(SERVER_URL.authority.concat("/tree")).then((res) => {
        authorities.value = res.data;
      }),
      instance.get(SERVER_URL.role.concat("/", dataCode.value, "/authority")).then((res) => {
        codes.value = res.data
      })
    ])
  }
  isTree.value = operate;
};
/**
 * 提交
 * @param tracked  选中的数据
 */
const treeCommit = async (tracked: Array<String>) => {
  if (tracked && tracked.length > 0) {
    alert("commit " + tracked)
  }
  isTree.value = false;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.role.concat("/", dataCode.value), roleData.value)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.role, roleData.value).then((res) => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
      count()
    });
  }
};

</script>