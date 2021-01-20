<template>
  <div class="col-span-12 mt-6">
    <div class="block sm:flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Users</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button class="flex bg-white p-2 rounded-md items-center text-gray-700">
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
            class="feather feather-file-text hidden sm:block mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to Excel
        </button>
        <button class="ml-3 bg-white p-2 rounded-md flex items-center text-gray-700">
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
            class="feather feather-file-text mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to PDF
        </button>
      </div>
    </div>
    <div class="overflow-auto mt-8 sm:mt-0">
      <table class="mt-2 w-full">
        <thead>
          <tr class="uppercase text-center">
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
          <tr class="text-center bg-white border-8 border-gray-100" v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <a
                href=""
                class="font-medium"
                v-text="data.username"
              ></a>
              <p
                class="text-gray-600 text-xs"
                v-text="data.nickname"
              ></p>
            </td>
            <td class="px-4 py-2 flex justify-center ">
              <img src="/images/avatar.jpg" class="rounded-full w-8 h-8" >
            </td>
            <td class="px-4 py-2" v-text="data.gender"></td>
            <td class="px-4 py-2" v-text="data.phone"></td>
            <td class="px-4 py-2" v-text="data.email"></td>
            <td class="px-4 py-2" v-text="new Date(data.birthday).toLocaleDateString()"></td>
            <td class="px-4 py-2">
              <div
                v-if="data.accountNonExpired"
                class="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#91C714"
                  stroke-width="2"
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
            <td class="px-4 py-2">
              <div
                v-if="data.accountNonLocked"
                class="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#91C714"
                  stroke-width="2"
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
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
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
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#91C714"
                  stroke-width="2"
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
              <Action />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Action from '/@/components/global/Action.vue'
import Pagation from '/@/components/global/Pagation.vue'

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "User",

  components: {
    Action,
    Pagation
  },

  setup() {
    const datas = ref([]);

    async function initDatas() {
      await instance
        .get(SERVER_URL.user.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
    };
  },
});
</script>