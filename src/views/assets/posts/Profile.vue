<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Portfolio</h2>
      <div class="flex items-center sm:ml-auto">
        <button
          @click="preview = !preview"
          class="md:hidden ml-3 p-2 rounded-md bg-white flex items-center text-gray-700 focus:outline-none focus:ring-1"
        >
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
          预览
        </button>
        <button
          @click="submit"
          class="ml-3 p-2 rounded-md bg-blue-700 flex items-center text-white focus:outline-none focus:ring-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          发布
        </button>
      </div>
    </div>
    <div class="overflow-auto mt-2">
      <form class="w-full">
        <div class="grid grid-rows-2 grid-cols-12 gap-4 md:gap-x-4 md:gap-y-1">
          <div class="col-span-12 sm:col-span-5 md:flex items-center">
            <input
              type="text"
              class="py-2 px-3 rounded-md ring-blue-400 w-full border flex-1 focus:outline-none focus:ring-1"
              placeholder="Title"
              maxlength="20"
              v-model="profileData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-3 md:flex items-center">
            <select
              v-model="profileData.category"
              class="p-2 rounded-md w-full border flex-1 focus:outline-none focus:ring-1"
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
              :src="profileData.cover"
              class="rounded-md object-cover w-full h-28 md:mt-3"
            />
          </div>
          <div class="col-span-12 sm:col-span-8">
            <textarea
              type="text"
              class="py-2 px-3 rounded-md w-full border flex-1 focus:outline-none focus:ring-1"
              placeholder="Subtitle"
              maxlength="64"
              v-model="profileData.subtitle"
            ></textarea>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 my-3">
          <div class="col-span-12">
            <div
              class="grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-cols-2 rounded-md border"
              style="height: calc(100vh - 298px)"
            >
              <textarea
                v-show="!preview"
                class="p-2 focus:outline-none focus:ring-1"
                v-model="profileData.content"
              ></textarea>
              <div v-show="preview" class="border-l overflow-auto bg-white">
                <p
                  class="markdown-body m-2 leading-loose"
                  v-html="rendedHtml"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import router from "../../../router";

import instance from "../../../api";
import SERVER_URL from "../../../api/request";

import md from "../../../plugins/markdown";

export default defineComponent({
  name: "Profile",

  props: {
    code: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    let preview = ref(false);
    const categories = ref([]);
    let profileData = ref({
      title: "",
      subtitle: "",
      category: "",
      cover: "",
      content: "",
    });
    // 获取帖子信息
    const fetchPosts = (code: string) => {
      if (code && code.length > 0) {
        instance.get(SERVER_URL.posts.concat("/", code)).then(
          (res) => {
            profileData.value = res.data;
          },
          (error) => {
            alert(error.statusText);
          }
        );
      }
    };
    // 获取所有分类
    const retrieveCategories = () => {
      instance.get(SERVER_URL.category).then(
        (res) => {
          categories.value = res.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
    };
    // 新增帖子
    const postPosts = (data: Object) => {
      instance.put(SERVER_URL.posts.concat("/", props.code), data).then(
        () => {
          router.push("/posts");
        },
        (error) => {
          alert(error.statusText);
        }
      );
    };
    // 编辑帖子
    const putPosts = (data: Object) => {
      instance.post(SERVER_URL.posts, data).then(
        () => {
          router.push("/posts");
        },
        (error) => {
          alert(error.statusText);
        }
      );
    };
    // 初始化，并发请求数据
    async function initData(code: string) {
      await Promise.all([retrieveCategories(), fetchPosts(code)]);
    }

    // 提交执行
    const submit = () => {
      if (props.code) {
        postPosts(profileData);
      } else {
        putPosts(profileData);
      }
    };
    // 转换md为html
    const rendedHtml = computed(() => {
      if (profileData.value.content) {
        return md.render(profileData.value.content);
      }
      return "";
    });

    onMounted(() => {
      initData(props.code);
    });

    return {
      preview,
      categories,
      profileData,
      rendedHtml,
      submit,
    };
  },
});
</script>

<style>
@import "/@/assets/markdown.css";
</style>