<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Users</h2>
      <button
        @click="retrieve()"
        class="ml-4 flex items-center text-blue-600 focus:outline-none"
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
    <div class="overflow-auto" style="height: calc(100vh - 190px)">
      <table class="mt-2 w-full truncate" aria-label="user">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 text-left">No.</th>
            <th scope="col" class="px-4 py-2">Username</th>
            <th scope="col" class="px-4 py-2">Avatar</th>
            <th scope="col" class="px-4 py-2">Gender</th>
            <th scope="col" class="px-4 py-2">Phone</th>
            <th scope="col" class="px-4 py-2">Email</th>
            <th scope="col" class="px-4 py-2">Birthday</th>
            <th scope="col" class="px-4 py-2">NonExpired</th>
            <th scope="col" class="px-4 py-2">Locked</th>
            <th scope="col" class="px-4 py-2">Credentials</th>
            <th scope="col" class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <span class="font-medium" v-text="data.username"></span>
              <p class="text-gray-600 text-xs" v-text="data.nickname"></p>
            </td>
            <td class="p-2 flex justify-center">
              <img
                src="/images/avatar.jpg"
                alt="avatar"
                class="rounded-full w-8 h-8"
              />
            </td>
            <td class="px-4 py-2">
              <svg
                v-if="data.gender === 'M'"
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
                v-else-if="data.gender === 'F'"
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
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      :size="size"
      @setPage="setPage"
    />
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
            <label>Gender</label>
            <select
              v-model="userData.gender"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              <option disabled>请选择</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Credentials Expired</label>
            <label>
              <input
                type="datetime-local"
                v-model="userData.expired"
                class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Groups</label>
            <select
              v-model="userData.groups"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              <option disabled>请选择</option>
              <option
                :value="group.code"
                v-for="group in groups"
                :key="group.code"
                v-text="group.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Roles</label>
            <select
              v-model="userData.roles"
              class="w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              <option disabled>请选择</option>
              <option
                :value="role.code"
                v-for="role in roles"
                :key="role.code"
                v-text="role.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Locked</label>
            <div class="mt-3">
              <label class="inline-flex items-center">
                <input type="radio" checked value="true" v-model="userData.accountNonLocked" />
                <span class="ml-2">false</span>
              </label>
              <label class="inline-flex items-center ml-4">
                <input type="radio" value="false" v-model="userData.accountNonLocked" />
                <span class="ml-2">true</span>
              </label>
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

import swal from "sweetalert";

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
      groups: [],
      roles: [],
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, username: string) {
      this.userData = {};
      if (isEdit == true) {
        Promise.all([
          this.fetch(isEdit, username),
          this.retrieveGroups(),
          this.retrieveRoles(),
        ]);
      }
      this.isEdit = isEdit;
    },
    // 查询用户详情
    fetch(isEdit: boolean, username: string) {
      if (isEdit && username) {
        instance.get(SERVER_URL.user.concat("/", username)).then((res) => {
          this.userData = res.data;
        });
      }
    },
    // 查询groups
    retrieveGroups() {
      instance.get(SERVER_URL.group).then((res) => {
        this.groups = res.data;
      });
    },
    // 查询roles
    retrieveRoles() {
      instance.get(SERVER_URL.role).then((res) => {
        this.roles = res.data;
      });
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.userData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.user.concat("/", code), data).then((res) => {
          // 将datas中修改项的历史数据删除
          this.datas = this.datas.filter((item: any) => item.code != code);
          // 将结果添加到第一个
          this.datas.unshift(res.data);
          swal("Operated Success!", "you updated the item", "success");
        });
      } else {
        instance.post(SERVER_URL.user, data).then((res) => {
          if (this.datas.length >= 10) {
            // 删除第一个
            this.datas.shift();
          }
          // 将结果添加到第一个
          this.datas.unshift(res.data);
          swal("Operated Success!", "you add a new item", "success");
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    let page = ref(0);
    let size = ref(10);
    const total = ref(0);

    // 设置页码
    function setPage(p: number, s: number) {
      page.value = p;
      size.value = s;
    }

    // 初始化数据
    async function initDatas() {
      await Promise.all([count(), retrieve()]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.user.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve() {
      await instance
        .get(
          SERVER_URL.user.concat("?page=" + page.value, "&size=" + size.value)
        )
        .then((res) => {
          datas.value = res.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
      page,
      size,
      total,
      retrieve,
      setPage,
    };
  },
});
</script>