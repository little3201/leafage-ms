<template>
  <div class="col-span-12 sm-d-h overflow-auto">
    <div class="inline-flex items-center my-3">
      <h2 class="text-lg font-medium">
        {{ $t('statitics') }}
      </h2>
      <button
        type="button"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
        @click="refresh"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-blue-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'eye'" />
            </svg>
            <span class="text-base text-gray-600 ml-2">{{ $t('viewed') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
              :class="overViewed > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overViewed"
            >
              {{ overViewed }}%
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use
                  v-if="overViewed > 0"
                  :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                />
                <use
                  v-else
                  :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                />
              </svg>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overViewed"
                ref="overViewedRef"
                aria-label="over-viewed"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.viewed"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'message-square'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('comments') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
              :class="overComments > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overComment"
            >
              {{ overComments }}%
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use
                  v-if="overComments > 0"
                  :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                />
                <use
                  v-else
                  :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                />
              </svg>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overComment"
                ref="overCommentRef"
                aria-label="over-comments"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.comments"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-purple-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'thumbs-up'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('likes') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
              :class="overLikes > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overLikes"
            >
              {{ overLikes }}%
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use
                  v-if="overLikes > 0"
                  :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                />
                <use
                  v-else
                  :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                />
              </svg>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overLikes"
                ref="overLikesRef"
                aria-label="over-likes"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.likes"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-green-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'download-cloud'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('downloads') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-xs text-white"
              title="overDownloads"
              :class="overDownloads > 0 ? 'bg-lime-500' : 'bg-red-600'"
            >
              {{ overDownloads }}%
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <use
                  v-if="overDownloads > 0"
                  :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                />
                <use
                  v-else
                  :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                />
              </svg>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overDownloads"
                ref="overDownloadsRef"
                aria-label="over-downloads"
                role="img"
              />
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6">
            {{ total.downloads }}
          </h2>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="relative shadow-sm rounded-md bg-white p-4">
          <canvas
            id="viewed"
            ref="viewedRef"
            aria-label="viewed"
            role="img"
            height="500"
          />
        </div>
      </div>
      <div class="col-span-12 md:col-span-3">
        <div class="relative shadow-sm rounded-md bg-white p-4">
          <canvas
            id="categories"
            ref="categoriesRef"
            aria-label="categories"
            role="img"
            height="500"
          />
        </div>
      </div>
      <div class="col-span-12 md:col-span-3">
        <div class="bg-white p-4 shadow-sm rounded-md">
          <p class="text-center text-xl font-semibold my-2">
            相关评论
          </p>
          <ul class="overflow-auto divide-y">
            <li
              v-for="(comment, index) in comments"
              :key="index"
              class="py-2"
            >
              <a
                :href="`https://www.leafage.top/posts/detail/${comment.posts}`"
                target="_blank"
              >
                <div class="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{{ comment.location }}</span>
                  <span>{{ new Date(comment.modifyTime).toLocaleDateString() }}</span>
                </div>
                <p class="text-sm hover:underline">
                  {{ comment.content }}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { createBarChart, createMiniChart, createPieChart } from "@/plugins/chart";

import { instance, SERVER_URL } from "@/api";
import { Category, Comment, Statistics, StatisticsTotal } from "@/api/request.type";

// data
let comments = ref<Array<Comment>>([])
let categories = ref<Array<Category>>([])
let datas = ref<Array<Statistics>>([])
let total = ref<StatisticsTotal>({
  viewed: 0,
  likes: 0,
  comments: 0,
  downloads: 0
})
let overViewed = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.viewed == 0) {
      return cur.viewed * 100;
    } else {
      return Math.floor((cur.viewed - yst.viewed) / yst.viewed * 100) / 100
    }
  }
  return 0
});
let overLikes = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.likes == 0) {
      return cur.likes * 100;
    } else {
      return Math.floor((cur.likes - yst.likes) / yst.likes * 100) / 100
    }
  }
  return 0
});
let overComments = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.comments == 0) {
      return cur.comments * 100;
    } else {
      return Math.floor((cur.comments - yst.comments) / yst.comments * 100) / 100
    }
  }
  return 0
});
let overDownloads = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.downloads == 0) {
      return cur.downloads * 100;
    } else {
      return Math.floor((cur.downloads - yst.downloads) / yst.downloads * 100) / 100
    }
  }
  return 0
});

// ref
const viewedRef = ref();
const overViewedRef = ref();
const overCommentRef = ref();
const overLikesRef = ref();
const overDownloadsRef = ref();
const categoriesRef = ref()

onMounted(() => {
  initData();
})
/**
 * 初始化请求数据
 */
const initData = async (): Promise<void> => {
  await Promise.all([
    retrieveCategories(),
    retreiveStatistics(),
    retrieveComments(),
    fetchTotal()]).then(() => construceChart())
};
/**
 * 查询周统计
 */
const retreiveStatistics = async () => {
  await instance.get(SERVER_URL.statistics, { params: { page: 0, size: 7 } }).then(res => {
    datas.value = res.data.content;
  })
}
/**
 * 刷新数据
 */
const refresh = async () => {
  await Promise.all([retrieveComments(), fetchTotal()])
}
/**
 * 查询评论信息
 */
const retrieveComments = async () => {
  await instance.get(SERVER_URL.comment, { params: { page: 0, size: 10 } })
    .then(res => comments.value = res.data.content)
}
/**
 * 总量统计
 */
const fetchTotal = async () => {
  await instance.get(SERVER_URL.statistics.concat("/total"))
    .then(res => total.value = res.data)
}
/**
 * 查询分类
 */
const retrieveCategories = async () => {
  await instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } })
    .then(res => categories.value = res.data.content)
}
/**
 * 构造图表
 */
const construceChart = (): void => {
  let obj = {
    labels: Array<string>(),
    pieLabels: Array<string>(),
    timeSharingLabels: Array<string>(),

    pieDatas: Array<number>(),
    timeSharingDatas: Array<number>(),
    viewed: Array<number>(),
    likes: Array<number>(),
    comments: Array<number>(),
    downloads: Array<number>(),

    overViewed: Array<number>(),
    overLikes: Array<number>(),
    overComments: Array<number>(),
    overDownloads: Array<number>()
  }

  datas.value.forEach(item => {
    let now = new Date(item.date)
    obj.labels.unshift(now.getMonth() + 1 + '-' + now.getDate());
    // data
    obj.viewed.unshift(item.viewed);
    obj.likes.unshift(item.likes);
    obj.comments.unshift(item.comments);
    obj.downloads.unshift(item.downloads)
    // over data
    obj.overViewed.unshift(item.overViewed)
    obj.overComments.unshift(item.overComments);
    obj.overLikes.unshift(item.overLikes);
    obj.overDownloads.unshift(item.overDownloads)
  })

  // 替换最新统计
  obj.overViewed.pop();
  obj.overViewed.push(overViewed.value)

  obj.overLikes.pop();
  obj.overLikes.push(overLikes.value)

  obj.overComments.pop();
  obj.overComments.push(overComments.value)

  obj.overDownloads.pop();
  obj.overDownloads.push(overDownloads.value)

  // 浏览量统计
  createMiniChart(overViewedRef.value, obj.labels, obj.overViewed, "rgba(37, 99, 235, 0.8)");

  // 评论数统计
  createMiniChart(overCommentRef.value, obj.labels, obj.overComments, "rgba(217, 119, 6, 0.8)");

  // 喜欢数统计
  createMiniChart(overLikesRef.value, obj.labels, obj.overLikes, "rgba(124, 58, 237, 0.8)");

  // 下载数统计
  createMiniChart(overDownloadsRef.value, obj.labels, obj.overDownloads, "rgba(22, 163, 74, 0.8)");

  // 每日访问量统计
  createBarChart(viewedRef.value, obj.labels, obj.viewed, obj.likes, obj.comments);

  categories.value.forEach(item => {
    obj.pieLabels.push(item.name)
    obj.pieDatas.push(item.count)
  })
  let pieColors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#059669', '#0d9488',
    '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48']
  // 分类统计
  createPieChart(categoriesRef.value, obj.pieLabels, obj.pieDatas, pieColors);
}

</script>