<template>
  <nav>
    <div class="flex justify-between mb-2">
      <RouterLink
        to="/"
        class="inline-flex items-center"
        exact-active-class
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 311.983 311.929"
        >
          <g
            data-name="Icon ionic-ios-apps"
            transform="translate(-4.494 -4.496)"
          >
            <path
              d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
              transform="translate(0.07 0)"
              fill="#b5c8ff"
            />
            <g transform="translate(4.493 135.941)">
              <path
                d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
                transform="translate(-4.423 60.176)"
                fill="#fff"
              />
              <path
                d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
                transform="translate(-4.493 -15.875)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
      </RouterLink>
      <span class="text-white text-xl tracking-wider">Leafage</span>
      <button
        type="button"
        class="outline-none"
        @click="isShow = !isShow"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white transform -rotate-90"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'bar-chart-2'" />
        </svg>
      </button>
    </div>
    <div class="mt-2 mb-4 h-px bg-gray-200 bg-opacity-30" />
    <div
      v-show="isShow"
      class="fixed inset-0 overflow-hidden max-w-xs z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-y-0 left-0 flex">
        <div class="w-64">
          <div class="h-full flex flex-col pt-5 px-4 bg-blue-800 shadow-2xl overflow-y-scroll">
            <RouterLink
              to="/"
              class="inlien-flex items-center"
              exact-active-class
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 311.983 311.929"
              >
                <g transform="translate(-4.494 -4.496)">
                  <path
                    d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
                    transform="translate(0.07 0)"
                    fill="#b5c8ff"
                  />
                  <g transform="translate(4.493 135.941)">
                    <path
                      d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
                      transform="translate(-4.423 60.176)"
                      fill="#fff"
                    />
                    <path
                      d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
                      transform="translate(-4.493 -15.875)"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </RouterLink>
            <div class="my-3 h-px bg-gray-200 bg-opacity-30" />
            <div>
              <DrawerCore
                v-for="data in datas"
                :key="data.code"
                :data="data"
                @menu-action="menuOperate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

import DrawerCore from "@/layouts/DrawerCore.vue";

import type { TreeNode } from '@/api/request.type'

defineProps({
  datas: {
    type: Array as PropType<TreeNode[]>,
    default: () => {
      return []
    },
  }
});

const isShow = ref(false);

const menuOperate = () => {
  isShow.value = false;
};
</script>