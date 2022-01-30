<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Groups</h2>
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
      <Operation @click.capture="dataCode = ''" @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="group">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Alias</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">Principal</th>
            <th scope="col" class="px-4">User Count</th>
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
            <td class="px-4">
              <span class="font-medium" v-text="data.name"></span>
              <p class="text-gray-600 group-hover:text-blue-400 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.alias"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4" v-text="data.principal"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action
                @click.capture="dataCode = data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <button
                  v-if="data.count > 0"
                  class="flex items-center mr-3 text-green-600 focus:outline-none"
                  @click="relation"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-1"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'user'" />
                  </svg>
                  Accounts
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-6">
            <label for="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Name"
              v-model.trim="groupData.name"
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">Alias</label>
            <input
              id="alias"
              name="alias"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Alias"
              v-model.trim="groupData.alias"
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">Superior</label>
            <select
              id="superior"
              name="superior"
              v-model.lazy="groupData.superior"
              class="mt-1 w-full block rounded-md border-gray-300"
            >
              <option value="undefined">请选择</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="principal">Principal</label>
            <select
              id="principal"
              name="principal"
              v-model.lazy="groupData.principal"
              class="mt-1 w-full block rounded-md border-gray-300"
            >
              <option value="undefined">请选择</option>
              <option
                v-for="(account, index) in accounts"
                :key="index"
                :value="account.username"
                v-text="account.nickname"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              v-model.trim="groupData.description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";

import instance from "@/api";
import { SERVER_URL, Group, Account } from "@/api/request";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let groupData = ref({});
let dataCode = ref("");
let accounts = ref<Account>([]);
let superiors = ref<Group>([]);
let datas = ref<Array<Group>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

// 设置页码
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};

// 查询列表
const retrieve = async (): Promise<void> => {
  await Promise.all([
    instance
      .get(SERVER_URL.group, { params: { page: page.value, size: size.value } })
      .then((res) => {
        datas.value = res.data;
      }),
    count()
  ]);
};
const count = (): void => {
  instance.get(SERVER_URL.group.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 删除取消
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.group.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
// 查询关联账号
const retrieveAccounts = (): void => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance
      .get(SERVER_URL.group.concat("/", dataCode.value, "/account"))
      .then((res) => {
        accounts.value = res.data;
      })
  }
}
// 新增/编辑：打开
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    groupData.value = {};
    await Promise.all([
      fetch(),
      instance.get(SERVER_URL.group).then((res) => {
        superiors.value = res.data;
      }),
      retrieveAccounts()
    ]);
  }
  isEdit.value = operate;
};
// 查询详情
const fetch = (): void => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance.get(SERVER_URL.group.concat("/", dataCode.value)).then((res) => {
      groupData.value = res.data;
    });
  }
};
// 新增/编辑：提交
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.group.concat("/", dataCode.value), groupData.value)
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
    await instance.post(SERVER_URL.group, groupData.value).then((res) => {
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
const relation = (): void => {
  alert("accounts")
}
onMounted(() => {
  retrieve();
});
</script>