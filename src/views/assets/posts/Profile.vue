<template>
  <div class="col-span-12 mt-6">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Portfolio</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button
          class="hidden ml-3 p-2 rounded-md bg-white sm:flex items-center text-gray-700 focus:outline-none focus:ring-2"
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
          @click="submit"
          class="ml-3 p-2 rounded-md bg-blue-700 flex items-center text-white focus:outline-none focus:ring-2"
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
        <div class="grid grid-cols-12 gap-4 px-1">
          <div class="col-span-12 sm:col-span-8">
            <label>Title</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md focus:ring-2 ring-blue-400 outline-none w-full border mt-2 flex-1"
              placeholder="Title"
              maxlength="20"
              :value="profileData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-4">
            <label>Category</label>
            <select
              class="p-2 rounded-md w-full border mt-2 flex-1 outline-none focus:ring-2"
            >
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.alias"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Subtitle</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 outline-none focus:ring-2"
              placeholder="Subtitle"
              maxlength="64"
              :value="profileData.subtitle"
            />
          </div>
          <div class="col-span-12">
            <label>Content</label>
            <div
              class="grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-cols-2 rounded-md border mt-2 mb-5"
            >
              <textarea
                class="p-2 min-h-screen outline-none focus:ring-2"
                :value="profileData.content"
                @input="update"
              ></textarea>
              <div class="hidden md:block border-l overflow-auto bg-white">
                <p class="article m-2 leading-loose" v-html="rendedHtml"></p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, ref } from "vue";
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
    const categories = ref([]);
    const profileData = reactive({
      title: "",
      subtitle: "",
      cover: "",
      content: "",
    });
    // 获取帖子信息
    const fetchPosts = (code: string) => {
      if (code && code.length > 0) {
        instance.get(SERVER_URL.posts.concat("/", code)).then(
          (res) => {
            profileData.title = res.data.title;
            profileData.subtitle = res.data.subtitle;
            profileData.content = res.data.cover;
            profileData.content = res.data.content;
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

    const update = (e: any) => {
      setTimeout(() => {
        profileData.content = e.target.value;
      }, 300);
    };
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
      return md.render(profileData.content);
    });

    onMounted(() => {
      initData(props.code);
    });

    return {
      categories,
      profileData,
      rendedHtml,
      update,
      submit,
    };
  },
});
</script>

<style scoped>
.article :deep() pre {
  font-size: 13px;
  @apply leading-relaxed;
}
.article :deep() h1 {
  @apply text-2xl;
}
.article :deep() h2 {
  @apply text-xl;
}
.article :deep() h3 {
  @apply text-lg;
}
</style>