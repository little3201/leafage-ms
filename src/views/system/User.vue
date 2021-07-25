<template>
  <div class="col-span-12 mt-2">
    <div class="inline-flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Users</h2>
      <button
        @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none"
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
    </div>
    <div class="overflow-scroll mt-2" style="height: calc(100vh - 12rem)">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="user"
      >
        <thead>
          <tr
            class="
              sticky
              top-0
              bg-gray-100
              uppercase
              text-center text-xs
              sm:text-sm
              h-12
            "
          >
            <th scope="col" class="px-4 text-left">No.</th>
            <th scope="col" class="px-4">Username</th>
            <th scope="col" class="px-4">Avatar</th>
            <th scope="col" class="px-4">Gender</th>
            <th scope="col" class="px-4">Phone</th>
            <th scope="col" class="px-4">Email</th>
            <th scope="col" class="px-4">Birthday</th>
            <th scope="col" class="px-4">NonExpired</th>
            <th scope="col" class="px-4">Locked</th>
            <th scope="col" class="px-4">Credentials</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <span class="font-medium" v-text="data.username"></span>
              <p class="text-gray-600 text-xs" v-text="data.nickname"></p>
            </td>
            <td class="px-4">
              <img
                src="/images/avatar.jpg"
                alt="avatar"
                class="rounded-full w-8 h-8 mx-auto"
              />
            </td>
            <td class="px-4">
              <svg
                v-if="data.gender === 'M'"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                class="mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M41.9514 15.0485V6.04846H32.9514"
                  stroke="#3B82F6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.413 38.001C15.8803 43.4683 24.7447 43.4683 30.212 38.001C32.9457 35.2673 34.3125 31.6844 34.3125 28.1015C34.3125 24.5186 32.9457 20.9357 30.212 18.202C24.7447 12.7346 15.8803 12.7346 10.413 18.202C4.94567 23.6693 4.94567 32.5336 10.413 38.001Z"
                  fill="none"
                  stroke="#3B82F6"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M29.9999 18L39.9515 8.0485"
                  stroke="#3B82F6"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else-if="data.gender === 'F'"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                class="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g transform="translate(-6.000000, -2.000000)">
                    <rect
                      fill-opacity="0.01"
                      fill="#FFFFFF"
                      x="6"
                      y="2"
                      width="48"
                      height="48"
                      stroke-width="1.5"
                      stroke="none"
                      fill-rule="evenodd"
                    />
                    <g
                      transform="translate(28.000000, 28.000000) scale(-1, -1) rotate(45.000000) translate(-28.000000, -28.000000) translate(13.500000, 4.000000)"
                    >
                      <path
                        d="M14.3370491,47 C22.0690356,47 28.3370491,40.7319865 28.3370491,33 C28.3370491,29.1340068 26.7700457,25.6340068 24.236544,23.1005051 C21.7030423,20.5670034 18.2030423,19 14.3370491,19 C6.6050626,19 0.337049096,25.2680135 0.337049096,33 C0.337049096,40.7319865 6.6050626,47 14.3370491,47 Z"
                        fill="none"
                        fill-rule="nonzero"
                        stroke-linejoin="round"
                        stroke-width="4"
                        stroke="#EC4899"
                      />
                      <path
                        d="M14.5,19 L14.5,1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        stroke="#EC4899"
                        fill="none"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M5.5,11 L23.5,11"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        stroke="#EC4899"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </td>
            <td class="px-4" v-text="data.phone"></td>
            <td class="px-4" v-text="data.email"></td>
            <td
              class="px-4"
              v-text="new Date(data.birthday).toLocaleDateString()"
            ></td>
            <td class="px-4">
              <div
                v-if="data.accountNonExpired"
                class="flex items-center justify-center"
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
                  class="feather feather-check-circle text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
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
                  class="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div
                v-if="data.accountNonLocked"
                class="flex items-center justify-center"
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
                  class="feather feather-unlock text-green-600"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
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
                  class="feather feather-lock"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div
                v-if="data.credentialsNonExpired"
                class="flex items-center justify-center"
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
                  class="feather feather-check-circle text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
            </td>
            <td class="px-4">
              <Action
                @click.capture="username = data.username"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <a
                  class="flex items-center mr-3 text-indigo-600"
                  href="javascript:;"
                  @click.prevent="treeOperate(true, 'group')"
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
                    class="mr-2"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'users'" />
                  </svg>
                  Groups
                </a>
                <a
                  class="flex items-center mr-3 text-pink-600"
                  href="javascript:;"
                  @click.prevent="treeOperate(true, 'role')"
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
                    class="mr-2"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'pocket'" />
                  </svg>
                  Roles
                </a>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      :size="size"
      @setPage="setPage"
    />
    <Confirm
      :isShow="isDel"
      @cancelAction="confirmOperate"
      @commitAction="confirmCommit"
    />
    <Model
      :isShow="isEdit"
      @cancelAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 md:col-span-6">
            <label
              >Account Expired
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <div class="mt-3">
              <input
                type="radio"
                checked
                value="true"
                v-model="userData.accountNonExpired"
              />
              <span class="ml-2">False</span>
              <input
                type="radio"
                value="false"
                class="ml-4"
                v-model="userData.accountNonExpired"
              />
              <span class="ml-2">True</span>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <label
              >Account Locked
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <div class="mt-3">
              <input
                type="radio"
                checked
                value="true"
                v-model="userData.accountNonLocked"
              />
              <span class="ml-2">False</span>
              <input
                type="radio"
                value="false"
                class="ml-4"
                v-model="userData.accountNonLocked"
              />
              <span class="ml-2">True</span>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <label
              >Credentials Expired
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <div class="mt-3">
              <input
                type="radio"
                checked
                value="true"
                v-model="userData.credentialsExpired"
              />
              <span class="ml-2">False</span>
              <input
                type="radio"
                value="false"
                class="ml-4"
                v-model="userData.credentialsExpired"
              />
              <span class="ml-2">True</span>
            </div>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model="userData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
    <Tree :isShow="isTree" @treeAction="treeOperate" :datas="treeDatas" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";
import Tree from "/@/components/global/Tree.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// 模态框参数
const isEdit = ref(false);
const isDel = ref(false);
const isTree = ref(false);
// 数据
const userData = ref({});
const username = ref("");
const treeDatas = ref([]);
const datas = ref<any>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
const total = ref(0);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
};
// 查询列表
const retrieve = async () => {
  await Promise.all([
    instance
      .get(SERVER_URL.user, { params: { page: page.value, size: size.value } })
      .then((res) => {
        datas.value = res.data;
      }),
    instance.get(SERVER_URL.user.concat("/count")).then((res) => {
      total.value = res.data;
    }),
  ]);
};
// 删除取消
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = () => {
  instance.delete(SERVER_URL.user.concat("/", username.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.username != username.value
    );
    isDel.value = false;
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  userData.value = {};
  if (operate) {
    await instance
      .get(SERVER_URL.user.concat("/", username.value))
      .then((res) => {
        userData.value = res.data;
      });
  }
  isEdit.value = operate;
};
// 新增/编辑：提交
const commitOperate = async () => {
  let data = userData.value;
  if (username.value && username.value.length > 0) {
    await instance
      .put(SERVER_URL.user.concat("/", username.value), data)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != username.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.user, data).then((res) => {
      if (datas.value.length >= 10) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
};
// 分组/角色树：打开
const treeOperate = async (operate: boolean, type: string) => {
  if (operate) {
    if (type === "group") {
      await instance.get(SERVER_URL.group.concat("/tree")).then((res) => {
        treeDatas.value = res.data;
      });
    } else if (type === "role") {
      await instance.get(SERVER_URL.role.concat("/tree")).then((res) => {
        treeDatas.value = res.data;
      });
    }
  }
  isTree.value = operate;
};

onMounted(() => {
  retrieve();
});
</script>