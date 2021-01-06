<template>
  <div class="col-span-12 mt-6">
    <div class="intro-y block sm:flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Users</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button class="button box flex items-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
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
        <button class="ml-3 button box flex items-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
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
    <div class="intro-y overflow-auto mt-8 sm:mt-0">
      <table class="table table-report sm:mt-2">
        <thead>
          <tr class="uppercase">
            <th class="whitespace-no-wrap">No.</th>
            <th class="text-center whitespace-no-wrap">Username</th>
            <th class="text-center whitespace-no-wrap">Avatar</th>
            <th class="text-center whitespace-no-wrap">Gender</th>
            <th class="text-center whitespace-no-wrap">Phone</th>
            <th class="text-center whitespace-no-wrap">Email</th>
            <th class="text-center whitespace-no-wrap">Birthday</th>
            <th class="text-center whitespace-no-wrap">NonExpired</th>
            <th class="text-center whitespace-no-wrap">Locked</th>
            <th class="text-center whitespace-no-wrap">Credentials</th>
            <th class="text-center whitespace-no-wrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="intro-x" v-for="(data, index) in datas" :key="index">
            <td>
              {{ index + 1 }}
            </td>
            <td class="text-center">
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.username"
              ></a>
              <p
                class="text-gray-600 text-xs whitespace-no-wrap"
                v-text="data.nickname"
              ></p>
            </td>
            <td class="text-center">
              <img src="/src/assets/logo.svg" class="rounded-full w-8 h-8" >
            </td>
            <td class="text-center" v-text="data.gender"></td>
            <td class="text-center" v-text="data.phone"></td>
            <td class="text-center" v-text="data.email"></td>
            <td class="text-center" v-text="data.birthday"></td>
            <td class="w-40">
              <div
                v-if="data.accountNonExpired"
                class="flex items-center justify-center text-theme-9"
              >
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
                  class="feather feather-check-circle"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-theme-6">
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
            <td class="w-40">
              <div
                v-if="data.accountNonLocked"
                class="flex items-center justify-center text-theme-9"
              >
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
              <div v-else class="flex items-center justify-center text-theme-6">
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
            <td class="w-40">
              <div
                v-if="data.credentialsNonExpired"
                class="flex items-center justify-center text-theme-9"
              >
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
                  class="feather feather-check-circle"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-theme-6">
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
            <td class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <a class="flex items-center mr-3" href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check-square w-4 h-4 mr-2"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path
                      d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                    ></path>
                  </svg>
                  Edit
                </a>
                <a class="flex items-center text-theme-6" href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-trash-2 w-4 h-4 mr-1"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-3"
    >
      <ul class="pagination">
        <li>
          <a class="pagination__link" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevrons-left"
            >
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </a>
        </li>
        <li>
          <a class="pagination__link" href="" disabled>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
        </li>
        <li class="hidden"><a class="pagination__link" href="">...</a></li>
        <li>
          <a class="pagination__link pagination__link--active" href="">1</a>
        </li>
        <li>
          <a class="pagination__link" href="">2</a>
        </li>
        <li><a class="pagination__link" href="">3</a></li>
        <li><a class="pagination__link" href="">...</a></li>
        <li>
          <a class="pagination__link" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </li>
        <li>
          <a class="pagination__link" href=""> </a>
        </li>
      </ul>
      <select class="w-20 input box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "User",

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