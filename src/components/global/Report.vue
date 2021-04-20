<template>
  <div class="col-span-12 mt-2">
    <div class="flex items-center h-10">
      <h2 class="text-lg font-medium">General Report</h2>
      <a href="" class="ml-auto flex items-center text-blue-800">
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
          class="feather feather-rotate-cw mr-3"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </a>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-5">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-book text-blue-600"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              ></path>
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                style="background-color: #91c714"
                title="33% Higher than last month"
              >
                33%
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
                  class="feather feather-arrow-up"
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="text-3xl font-bold leading-8 mt-6">2286</div>
          <div class="text-base text-gray-600 mt-1">Posts Viewed</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-5">
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-camera text-yellow-600"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                title="2% Lower than last month"
              >
                2%
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
                  class="feather feather-arrow-down"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="text-3xl font-bold leading-8 mt-6">0</div>
          <div class="text-base text-gray-600 mt-1">Portfolio Viewed</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-5">
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-tag text-purple-600"
            >
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
              ></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                style="background-color: #91c714"
                title="12% Higher than last month"
              >
                12%
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
                  class="feather feather-arrow-up"
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="text-3xl font-bold leading-8 mt-6">4</div>
          <div class="text-base text-gray-600 mt-1">Category Created</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user text-green-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="22% Higher than last month"
                >
                  22%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-arrow-up w-4 h-4"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">1520</div>
            <div class="text-base text-gray-600 mt-1">Unique Visitor</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="shadow-sm rounded-md bg-white p-5">
          <canvas id="lineChart" height="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createChart } from "../../plugins/char";

export default defineComponent({
  name: "Report",

  setup() {
    const ctx = <HTMLCanvasElement>document.getElementById("lineChart");
    let config = {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
          },
        ],
      },
      options: {},
    };
    createChart(ctx, config);
  },
});
</script>