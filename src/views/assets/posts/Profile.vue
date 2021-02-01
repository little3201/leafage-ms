<template>
  <div class="col-span-12 mt-6">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Portfolio</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button
          class="hidden ml-3 p-2 rounded-md bg-white sm:flex items-center text-gray-700"
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
          保存
        </button>
        <button
          @click.prevent="this.$router.push('/posts/profile')"
          class="ml-3 p-2 rounded-md bg-blue-700 flex items-center text-white"
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
    <div class="overflow-auto mt-8 sm:mt-0">
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-8">
            <label>Title</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1"
              placeholder="Title"
              maxlength="20"
              :value="profileData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <label>Category</label>
            <select class="p-2 rounded-md w-full border mt-2 flex-1">
              <option>Technology</option>
              <option>Lifestyle</option>
              <option>Travel</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Subtitle</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1"
              placeholder="Subtitle"
              maxlength="64"
              :value="profileData.subtitle"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Tags</label>
            <select class="p-2 rounded-md w-full border mt-2 flex-1">
              <option>Java</option>
              <option>Spring</option>
              <option>Vue</option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Type</label>
            <select class="p-2 rounded-md w-full border mt-2 flex-1">
              <option>原创</option>
              <option>转载</option>
            </select>
          </div>
          <div class="col-span-12">
            <label class="text-sm font-medium text-gray-700">
              Cover photo
            </label>
            <div
              class="mt-2 bg-white flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
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
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <label>Content</label>
            <Content :content="profileData.content" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Content from "/@/components/global/Content.vue";

import instance from "../../../api";
import SERVER_URL from "../../../api/request";

export default defineComponent({
  name: "Profile",

  components: {
    Content,
  },

  props: {
    code: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const profileData = ref({});

    console.log("传过来的code是：" + props.code);

    async function initData(code: string) {
      if (code && code.length > 0) {
        await instance.get(SERVER_URL.posts.concat("/").concat(code)).then(
          (response) => {
            profileData.value = response.data;
          },
          (error) => {
            alert(error.statusText);
          }
        );
      }
    }

    onMounted(() => {
      initData(props.code);
    });

    return {
      profileData,
    };
  },
});
</script>

<style>
pre {
  font-size: 12px;
}
</style>