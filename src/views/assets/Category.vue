<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
      <div class="col-span-12 mt-6">
        <div class="intro-y overflow-auto mt-8 sm:mt-0">
          <table class="table table-report sm:mt-2">
            <thead>
              <tr class="uppercase">
                <th class="whitespace-no-wrap">No.</th>
                <th class="text-center whitespace-no-wrap">Alias</th>
                <th class="text-center whitespace-no-wrap">Code</th>
                <th class="text-center whitespace-no-wrap">Posts Count</th>
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
                    v-text="data.alias"
                  ></a>
                </td>
                <td class="text-center" v-text="data.code"></td>
                <td
                  class="text-center"
                  v-text="Math.floor(Math.random() * 100)"
                ></td>
                <td
                  class="text-center"
                  v-text="new Date(data.modifyTime).toLocaleDateString()"
                ></td>
                <td class="table-report__action w-56">
                  <Action />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Action from "/src/components/global/Action.vue";
import Pagation from "/src/components/global/Pagation.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Category",

  components: {
    Action,
    Pagation,
  },

  setup() {
    const datas = ref([]);

    async function initDatas() {
      await instance.get(SERVER_URL.category.concat("?page=0&size=10")).then(
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