<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Users</h2>
      <button
        @click="retrieve(0, 10)"
        class="ml-4 flex items-center text-blue-800 focus:outline-none"
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
          class="feather feather-rotate-cw mr-2"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </button>
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-auto">
      <table class="mt-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th class="px-4 py-2 text-left">No.</th>
            <th class="px-4 py-2">Username</th>
            <th class="px-4 py-2">Avatar</th>
            <th class="px-4 py-2">Gender</th>
            <th class="px-4 py-2">Phone</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Birthday</th>
            <th class="px-4 py-2">NonExpired</th>
            <th class="px-4 py-2">Locked</th>
            <th class="px-4 py-2">Credentials</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <a href="" class="font-medium" v-text="data.username"></a>
              <p class="text-gray-600 text-xs" v-text="data.nickname"></p>
            </td>
            <td class="px-4 py-2 flex justify-center">
              <img src="/images/avatar.jpg" class="rounded-full w-8 h-8" />
            </td>
            <td class="px-4 py-2">
              <svg
                v-if="data.gender === 'Male'"
                width="16"
                height="16"
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
                v-else-if="data.gender === 'Female'"
                width="16"
                height="16"
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
            <td class="px-4 py-2" v-text="data.phone"></td>
            <td class="px-4 py-2" v-text="data.email"></td>
            <td
              class="px-4 py-2"
              v-text="new Date(data.birthday).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2">
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
                  stroke="#91C714"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-check-circle"
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
            <td class="px-4 py-2">
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
                  stroke="#91C714"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-unlock"
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
            <td class="px-4 py-2">
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
                  stroke="#91C714"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-check-circle"
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
            <td class="px-4 py-2 rounded-tr-lg rounded-br-lg">
              <Action
                :code="data.username"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="userData.username"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>Nickname</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Name"
              v-model="userData.nickname"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Phone</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Phone"
              v-model="userData.phone"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Email</label>
            <input
              type="email"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Email"
              v-model="userData.email"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Gender</label>
            <select
              v-model="userData.gender"
              class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option disabled value="">请选择</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              v-model="userData.description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "User",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      userData: {},
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, params: string) {
      this.userData = {};
      if (isEdit && params) {
        instance.get(SERVER_URL.user.concat("/", params)).then((res) => {
          this.userData = res.data;
        });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.userData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.user.concat("/", code), data).then(() => {
          this.retrieve(0, 10);
        });
      } else {
        instance.post(SERVER_URL.user, data).then((res) => {
          this.datas.push(res.data);
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([count(), retrieve(page, size)]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.user.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.user.concat("?page=" + page, "&size=" + size))
        .then((res) => {
          datas.value = res.data;
        });
    }

    onMounted(() => {
      initDatas(0, 10);
    });

    return {
      datas,
      total,
      retrieve,
    };
  },
});
</script>