<template>
  <div class="col-span-12 mt-6">
    <div class="intro-y block sm:flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Posts</h2>
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
            <th class="text-center whitespace-no-wrap">Title</th>
            <th class="text-center whitespace-no-wrap">Code</th>
            <th class="text-center whitespace-no-wrap">Viewed</th>
            <th class="text-center whitespace-no-wrap">Likes</th>
            <th class="text-center whitespace-no-wrap">Modify Time</th>
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
                v-text="data.title"
              ></a>
            </td>
            <td class="text-center" v-text="data.code"></td>
            <td class="text-center" v-text="Math.floor(Math.random()*100)"></td>
            <td class="text-center" v-text="Math.floor(Math.random()*100)"></td>
            <td class="text-center" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="table-report__action w-56">
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
import { defineComponent, ref, onMounted } from "vue";
import Action from '/src/components/global/Action.vue'
import Pagation from '/src/components/global/Pagation.vue'

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Posts",

  components: {
    Action,
    Pagation
  },

  setup() {
    const datas = ref([]);

    async function initDatas() {
      await instance.get(SERVER_URL.posts.concat("?page=0&size=10")).then(
        (response) => {
          datas.value = response.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
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