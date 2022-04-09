<template>
  <div class="col-span-12 sm-d-h overflow-auto">
    <div class="inline-flex items-center my-2">
      <h2 class="text-lg font-medium">General Report</h2>
      <button
        type="button"
        @click="initData"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
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
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        Reload Data
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'eye'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overViewed > 0, 'bg-red-600': latest.overViewed <= 0 }"
                title="overViewed"
              >
                {{ latest.overViewed }}%
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
                    v-if="latest.overViewed > 0"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="overViewed" ref="overViewedRef" aria-label="over-viewed" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.viewed"></h2>
          <div class="text-base text-gray-600 mt-1">Total Viewed</div>
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'message-square'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overComment > 0, 'bg-red-600': latest.overComment <= 0 }"
                title="overComment"
              >
                {{ latest.overComment }}%
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
                    v-if="latest.overComment > 0"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="overComment" ref="overCommentRef" aria-label="over-comments" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.comment"></h2>
          <div class="text-base text-gray-600 mt-1">Total Comments</div>
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'heart'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overLikes > 0, 'bg-red-600': latest.overLikes <= 0 }"
                title="overLikes"
              >
                {{ latest.overLikes }}%
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
                    v-if="latest.overLikes > 0"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="overLikes" ref="overLikesRef" aria-label="over-likes" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.likes"></h2>
          <div class="text-base text-gray-600 mt-1">Total Likes</div>
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'book'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                title="overDownloads"
              >
                {{ 0 }}%
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
                  <!-- <use
                    v-if="latest.overLikes > 0"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />-->
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overDownloads"
                ref="overDownloadsRef"
                aria-label="over-downloads"
                role="img"
              ></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6">0</h2>
          <div class="text-base text-gray-600 mt-1">Total Downloads</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="relative shadow-sm rounded-md bg-white p-4 h-full">
          <canvas id="viewed" ref="viewedRef" aria-label="viewed" role="img" height="100"></canvas>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <div class="bg-white p-4 shadow-sm rounded-md">
          <div class="overflow-auto">
            <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="category">
              <thead>
                <tr class="bg-gray-100 uppercase text-center text-sm">
                  <th scope="col" class="px-3 py-2 sm:py-3 text-left">No.</th>
                  <th scope="col" class="px-3">Content</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center bg-white border-y-4 lg:border-y-6 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
                  v-for="(comment, index) in comments"
                  :key="index"
                >
                  <td class="px-3 py-2 sm:py-3 text-left">{{ index + 1 }}</td>

                  <td class="px-3 max-w-sm truncate">
                    <a
                      :href="`https://www.leafage.top/posts/detail/${comment.posts}`"
                      target="_blank"
                      class="font-medium hover:underline"
                    >{{ comment.content }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { createBarChart, createMiniChart } from "@/plugins/chart";

import { instance, SERVER_URL } from "@/api";
import type { Comment, Statistics } from "@/api/request.type";

// data
let comments = ref<Comment>([])
let datas = ref<Statistics>([])
const latest = computed(() => datas.value[0] || {});

// ref
const viewedRef = ref();
const overViewedRef = ref();
const overCommentRef = ref();
const overLikesRef = ref();
const overDownloadsRef = ref();

const charts = reactive({
  viewed: undefined,
  overViewed: undefined,
  overComment: undefined,
  overLikes: undefined,
  overDownloads: undefined
})

onMounted(() => {
  initData();
})
/**
 * 查询最新10条评论
 */
const retrieveComments = async (): Promise<void> => {
  await instance.get(SERVER_URL.comment, { params: { page: 0, size: 10 } })
    .then(res => comments.value = res.data);
}
/**
 * 初始化请求数据
 */
const initData = async (): Promise<void> => {
  await Promise.all([
    instance.get(SERVER_URL.statistics, { params: { page: 0, size: 8 } }).then(res => {
      datas.value = res.data;
      construceChart()
    }),
    retrieveComments()])
};

const construceChart = (): void => {
  let obj = {
    labels: new Array(),
    viewed: new Array(),
    likes: new Array(),
    comments: new Array(),
    overViewed: new Array(),
    overLikes: new Array(),
    overComment: new Array(),
    overDownloads: new Array
  }
  for (let i = 0; i < datas.value.length - 1; i++) {
    obj.labels.unshift(datas.value[i].date);
    // data
    obj.viewed.unshift(datas.value[i].viewed - datas.value[i + 1].viewed);
    obj.likes.unshift(datas.value[i].likes - datas.value[i + 1].likes);
    obj.comments.unshift(datas.value[i].comment - datas.value[i + 1].comment);
    // over data
    obj.overViewed.unshift(datas.value[i].overViewed)
    obj.overComment.unshift(datas.value[i].overComment);
    obj.overLikes.unshift(datas.value[i].overLikes);
    obj.overDownloads.unshift(0)
  }

  let labels = obj.labels
  // 浏览量统计
  charts.overViewed = createMiniChart(overViewedRef.value, labels, obj.overViewed, "rgba(37, 99, 235, 0.8)");
  // 评论数统计
  charts.overComment = createMiniChart(overCommentRef.value, labels, obj.overComment, "rgba(217, 119, 6, 0.8)");
  // 喜欢数统计
  charts.overLikes = createMiniChart(overLikesRef.value, labels, obj.overLikes, "rgba(124, 58, 237, 0.8)");
  // 喜欢数统计
  charts.overDownloads = createMiniChart(overDownloadsRef.value, labels, obj.overDownloads, "rgba(22, 163, 74, 0.8)");
  // 帖子分类统计
  charts.viewed = createBarChart(viewedRef.value, labels, obj.viewed, obj.likes, obj.comments);
}
</script>