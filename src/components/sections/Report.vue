<template>
  <div class="col-span-12 mt-2 overflow-scroll" style="height: calc(100vh - 96px)">
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
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                style="background-color: #91c714"
                title="viewed higher than last month"
              >
                {{ data.overViewed }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="viewedChart" ref="viewedChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.viewed"></h2>
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
                class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                title="2% Lower than last month"
              >
                {{ data.overComment || 0 }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="commentChart" ref="commentChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.comment"></h2>
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
                style="background-color: #91c714"
                title="12% Higher than last month"
              >
                {{ data.overLikes || 0 }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="likesChart" ref="likesChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.likes"></h2>
          <div class="text-base text-gray-600 mt-1">Total Likes</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="relative zoom-in">
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'users'" />
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="22% Higher than last month"
                >
                  {{ data.overVisitor || 0 }}%
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
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-2 inset-x-4 opacity-50">
                <canvas id="visitorChart" ref="visitorChart" height="100"></canvas>
              </div>
            </div>
            <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.visitor || 0"></h2>
            <div class="text-base text-gray-600 mt-1">Visitors</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="bg-white p-4 overflow-scroll shadow-sm rounded-md">
          <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="category">
            <thead>
              <tr class="bg-gray-100 uppercase text-center text-xs sm:text-sm">
                <th scope="col" class="p-3 text-left">No.</th>
                <th scope="col" class="p-3">Nickname</th>
                <th scope="col" class="p-3">Content</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center bg-white border-t-4 border-b-4 first:border-t-0 last:border-b-0 border-gray-100"
                v-for="(comment, index) in recentComments"
                :key="index"
              >
                <td class="px-3 py-1 md:py-2 text-left">{{ index + 1 }}</td>
                <td class="px-3" v-text="comment.nickname"></td>
                <td class="px-3" v-text="comment.content"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <div class="shadow-sm rounded-md bg-white p-4">
          <canvas id="doughnutChart" ref="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { createDoughnutChart, createMiniChart } from "../../plugins/char";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// chart
const doughnutChart = ref();
const viewedChart = ref();
const commentChart = ref();
const likesChart = ref();
const visitorChart = ref();
// data
const data = ref({});
const recentComments = ref([])
// posts statistics
const postsDatas = ref<Array<Number>>([]);
const categoryLables = ref<Array<String>>([]);
// viewed statistics
const labels = ref<Array<String>>([]);
const viewedDatas = ref<Array<Number>>([]);
// comment statistics
const commentDatas = ref<Array<Number>>([]);
// likes statistics
const likesDatas = ref<Array<Number>>([]);
// visitor statistics
const visitorDatas = ref<Array<Number>>([]);

// 请求最新统计数据
const fetch = async () => {
  await instance.get(SERVER_URL.statistics.concat("/viewed")).then((res) => {
    data.value = res.data;
  });
};
// 请求七天内的统计数据
const retrieve = async () => {
  await instance
    .get(SERVER_URL.statistics, { params: { page: 0, size: 7 } })
    .then((res) => {
      res.data.forEach((item: any) => {
        labels.value.unshift(item.date);
        viewedDatas.value.unshift(item.overViewed);

        commentDatas.value.unshift(item.overCommnet);

        likesDatas.value.unshift(item.overLikes);

        visitorDatas.value.unshift(item.overVisitor);
      });
    });
};

const category = async () => {
  await instance
    .get(SERVER_URL.category, { params: { page: 0, size: 10 } })
    .then((res) => {
      res.data.forEach((item: any) => {
        categoryLables.value.unshift(item.alias);
        postsDatas.value.unshift(item.count);
      });
    });
};

const comments = async () => {
  await instance
    .get(SERVER_URL.comment, { params: { page: 0, size: 10 } })
    .then((res) => {
      console.log(res.data)
      recentComments.value = res.data
    });
}

const initData = async () => {
  await Promise.all([fetch(), retrieve(), category()]).then(() => {
    // 浏览量统计
    createMiniChart(viewedChart.value, labels.value, viewedDatas.value, "rgba(37, 99, 235, 0.8)");
    // 喜欢数统计
    createMiniChart(likesChart.value, labels.value, likesDatas.value, "rgba(124, 58, 237, 0.8)");
    // 评论数统计
    createMiniChart(commentChart.value, labels.value, commentDatas.value, "rgba(217, 119, 6, 0.8)");
    // 访问用户统计
    createMiniChart(visitorChart.value, labels.value, visitorDatas.value, "rgba(5, 150, 105, 0.8)");
    // 帖子分类统计
    createDoughnutChart(doughnutChart.value, categoryLables.value, postsDatas.value);
  });
};

onMounted(() => {
  initData();
  comments();
});
</script>