<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Posts</h2>
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
            <th class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Title</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Code</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Category</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Viewed</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Likes</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Modify Time</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:px-5 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3 text-center">
              <a href="" class="font-medium" v-text="data.title"></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.code"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.category"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.viewed"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.likes"></td>
            <td
              class="px-4 py-2 md:px-5 md:py-3"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <Action
                :code="data.code"
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
      :code="postsData.code"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-rows-2 grid-cols-12 gap-4 md:gap-x-4 md:gap-y-1">
          <div class="col-span-12 sm:col-span-5 md:flex items-center">
            <input
              type="text"
              class="py-2 px-3 rounded-md ring-blue-400 w-full border focus:outline-none focus:ring-1"
              placeholder="Title"
              maxlength="20"
              v-model="postsData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-3 md:flex items-center">
            <select
              v-model="postsData.category"
              class="p-2 rounded-md w-full border focus:outline-none focus:ring-1"
            >
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.alias"
              ></option>
            </select>
          </div>
          <div class="row-span-2 col-span-12 sm:col-span-4">
            <img
              v-if="postsData.cover"
              :src="postsData.cover"
              alt="cover"
              class="rounded-md object-cover w-48 h-28 md:mt-3"
            />
            <div
              v-else
              class="rounded-md border w-48 h-28 md:mt-3 flex items-center"
            >
              <div class="mx-auto text-center">
                <div class="text-center text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-indigo-500"
                  >
                    <svg
                      class="mx-auto h-8 w-8"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      id="file-upload"
                      name="cover"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                <p class="text-xs text-gray-500">up to 2MB</p>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-8">
            <textarea
              class="p-2 rounded-md w-full border focus:outline-none focus:ring-1"
              placeholder="Subtitle"
              maxlength="64"
              v-model="postsData.subtitle"
            ></textarea>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 my-3">
          <div class="col-span-12">
            <div
              class="grid grid-flow-row grid-rows-1 grid-cols-1 rounded-md border h-52 md:h-96 relative"
            >
              <a
                href="javascript:;"
                @click="preview = !preview"
                class="top-0 right-0 absolute"
              >
                <svg
                  v-if="preview"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye-off opacity-30"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  ></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye opacity-30"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
              <textarea
                v-if="!preview"
                class="p-2 focus:outline-none focus:ring-1"
                v-model="content"
                placeholder="write with markdown..."
              ></textarea>
              <article
                v-else
                class="p-2 markdown-body overflow-auto"
                v-html="rendedHtml"
              ></article>
            </div>
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";
import md from "../../plugins/markdown";

export default defineComponent({
  name: "Items",

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
      postsData: {},
      categories: [],
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, code: string) {
      this.postsData = {};
      this.content = "";
      Promise.all([
        this.retrieveCategories(),
        this.fetchPosts(isEdit, code),
        this.fetchContent(isEdit, code),
      ]);
      this.isEdit = isEdit;
    },
    // 获取所有分类
    retrieveCategories() {
      instance.get(SERVER_URL.category).then(
        (res) => {
          this.categories = res.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
    },
    // 根据code查posts
    fetchPosts(isEdit: boolean, code: string) {
      if (isEdit && code) {
        instance.get(SERVER_URL.posts.concat("/", code)).then((res) => {
          this.postsData = res.data;
        });
      }
    },
    // 根据code查posts content
    fetchContent(isEdit: boolean, code: string) {
      if (isEdit && code) {
        instance
          .get(SERVER_URL.posts.concat("/", code, "/content"))
          .then((res) => {
            this.content = res.data.content;
          });
      }
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = { ...this.postsData, content: this.content };
      if (code && code.length > 0) {
        instance.put(SERVER_URL.posts.concat("/", code), data).then((res) => {
          this.retrieve(0, 10);
        });
      } else {
        instance.post(SERVER_URL.posts, data).then((res) => {
          this.datas.push(res.data);
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    let preview = ref(false);
    let content = ref("");
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([count(), retrieve(page, size)]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.posts.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.posts.concat("?page=" + page, "&size=" + size))
        .then(
          (res) => {
            datas.value = res.data;
          },
          (error) => {
            alert(error.statusText);
          }
        );
    }

    // 转换md为html
    const rendedHtml = computed(() => {
      if (content.value) {
        return md.render(content.value);
      }
      return "";
    });

    onMounted(() => {
      initDatas(0, 10);
    });

    return {
      preview,
      content,
      total,
      datas,
      retrieve,
      rendedHtml,
    };
  },
});
</script>

<style>
@import "/@/assets/markdown.css";
</style>