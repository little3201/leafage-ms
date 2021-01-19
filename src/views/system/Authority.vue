<template>
  <div class="col-span-12 mt-6">
    <div class="block sm:flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Authorities</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button class="p-2 rounded-md flex items-center bg-white text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          Export to Excel
        </button>
        <button class="ml-3 p-2 rounded-md button box flex items-center bg-white text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Code</th>
            <th class="px-4 py-2">Superior</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Path</th>
            <th class="px-4 py-2">Modify Time</th>
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
                class="font-medium whitespace-no-wrap"
                v-text="data.name"
              ></a>
              <p
                class="text-gray-600 text-xs whitespace-no-wrap"
                v-text="data.description"
              ></p>
            </td>
            <td class="px-4 py-2" v-text="data.code"></td>
            <td class="px-4 py-2" v-text="data.superior"></td>
            <td class="px-4 py-2" v-text="data.type"></td>
            <td class="px-4 py-2" v-text="data.path"></td>
            <td class="px-4 py-2" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4 py-2">
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
import Action from "/src/components/global/Action.vue";
import Pagation from "/src/components/global/Pagation.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Authority",

  components: {
    Action,
    Pagation,
  },

  setup() {
    const head = ref("Authority Tables");
    const titles = ref(["Code", "Name", "Path", "Superior","Type"]);
    const datas = ref([]);

    async function initDatas() {
      await instance
        .get(SERVER_URL.authority.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      head,
      titles,
      datas,
    };
  },
});
</script>