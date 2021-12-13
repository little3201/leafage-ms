<template>
  <div class="col-span-12 mt-2 overflow-scroll" style="height: calc(100vh - 6rem)">
    <div class="inline-flex items-center h-10">
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
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
                :class="{ 'bg-lime-500': over.overViewed <= latest.overViewed, 'bg-red-600': over.overViewed > latest.overViewed }"
                title="viewed higher than last month"
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
                    v-if="over.overViewed > latest.overViewed"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="viewedChart" ref="viewedChart" aria-label="total-viewed" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.viewed"></h2>
          <div class="text-base text-gray-600 mt-1">Total Viewed</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
                :class="{ 'bg-lime-500': over.overComment <= latest.overComment, 'bg-red-600': over.overComment > latest.overComment }"
                title="2% Lower than last month"
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
                    v-if="over.overComment > latest.overComment"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="commentChart" ref="commentChart" aria-label="total-comments" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.comment"></h2>
          <div class="text-base text-gray-600 mt-1">Total Comments</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
                :class="{ 'bg-lime-500': over.overLikes <= latest.overLikes, 'bg-red-600': over.overLikes > latest.overLikes }"
                title="12% Higher than last month"
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
                    v-if="over.overLikes > latest.overLikes"
                    :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                  <use v-else :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas id="likesChart" ref="likesChart" aria-label="total-likes" role="img"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="latest.likes"></h2>
          <div class="text-base text-gray-600 mt-1">Total Likes</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="shadow-sm rounded-md bg-white p-4">
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
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="totalPosts"></h2>
          <div class="text-base text-gray-600 mt-1">Total Posts</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="bg-white p-4 shadow-sm rounded-md">
          <div class="overflow-auto">
            <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="category">
              <thead>
                <tr class="bg-gray-100 uppercase text-center text-sm">
                  <th scope="col" class="px-3 py-2 sm:py-3 text-left">No.</th>
                  <th scope="col" class="px-3">Nickname</th>
                  <th scope="col" class="px-3">Content</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center bg-white border-t-4 border-b-4 sm:border-t-8 sm:border-b-8 first:border-t-0 last:border-b-0 border-gray-100"
                  v-for="(comment, index) in comments"
                  :key="index"
                >
                  <td class="px-3 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
                  <td class="px-3">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8">
                        <img
                          :src="comment.avatar || '/svg/logo.svg'"
                          alt="avatar"
                          class="rounded-full w-8 h-8 my-auto"
                        />
                      </div>
                      <span class="ml-2">{{ comment.nickname }}</span>
                    </div>
                  </td>
                  <td class="px-3" v-text="comment.content"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <div class="relative shadow-sm rounded-md bg-white p-4">
          <canvas id="barChart" ref="barChart" aria-label="viewed" role="img"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { createBarChart, createMiniChart } from "@/plugins/chart";

import instance from "@/api";
import { SERVER_URL, Comment, Statistics } from "@/api/request";

// data
let comments = ref<Comment>([])
let totalPosts = ref(0)
let datas = ref<Statistics>([])
const latest = computed(() => datas.value[0] || {});
const over = computed(() => datas.value[1] || {});

// chart
const barChart = ref();
const viewedChart = ref();
const commentChart = ref();
const likesChart = ref();

const retrieveComments = async (): Promise<void> => {
  await instance
    .get(SERVER_URL.comment, { params: { page: 0, size: 10 } })
    .then((res) => {
      comments.value = res.data
    });
}

const initData = async (): Promise<void> => {
  await Promise.all([instance.get(SERVER_URL.statistics, { params: { page: 0, size: 10 } })
    .then(res => {
      datas.value = res.data;
      construceChart()
    }), instance.get(SERVER_URL.posts.concat("/count")).then((res) => {
      totalPosts.value = res.data;
    })])
};

const construceChart = (): void => {
  let obj = {
    labels: new Array(),
    viewed: new Array(),
    overViewed: new Array(),
    overLikes: new Array(),
    overComment: new Array()
  }
  datas.value.forEach((item: any) => {
    obj.labels.unshift(item.date);
    obj.viewed.unshift(Math.round(item.viewed * item.overViewed / 100));
    obj.overViewed.unshift(item.overViewed)
    obj.overComment.unshift(item.overComment);
    obj.overLikes.unshift(item.overLikes);
  });
  let labels = obj.labels
  // 浏览量统计
  createMiniChart(viewedChart.value, labels, obj.overViewed, "rgba(37, 99, 235, 0.8)");
  // 评论数统计
  createMiniChart(commentChart.value, labels, obj.overComment, "rgba(217, 119, 6, 0.8)");
  // 喜欢数统计
  createMiniChart(likesChart.value, labels, obj.overLikes, "rgba(124, 58, 237, 0.8)");
  // 帖子分类统计
  createBarChart(barChart.value, labels, obj.viewed);
}

onMounted(() => {
  initData();
  retrieveComments();
});
</script>