<template>
  <aside class="sm:w-20 xl:w-64 pr-4 text-sm">
    <router-link to="/" class="inline-flex items-center pl-4 pt-3" exact-active-class>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 311.983 311.929">
        <g
          id="Icon_ionic-ios-apps"
          data-name="Icon ionic-ios-apps"
          transform="translate(-4.494 -4.496)"
        >
          <path
            id="Path_9"
            data-name="Path 9"
            d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
            transform="translate(0.07 0)"
            fill="#b5c8ff"
          />
          <g id="Group_1" data-name="Group 1" transform="translate(4.493 135.941)">
            <path
              id="Path_10"
              data-name="Path 10"
              d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
              transform="translate(-4.423 60.176)"
              fill="#fff"
            />
            <path
              id="Path_11"
              data-name="Path 11"
              d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
              transform="translate(-4.493 -15.875)"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
      <h1 class="hidden xl:block text-white text-2xl ml-4">Leafage</h1>
    </router-link>
    <div class="my-6 h-px w-full bg-gray-200 bg-opacity-30"></div>
    <ul>
      <SideMenuCore v-for="data in datas" :key="data.code" :data="data" />
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import SideMenuCore from "/@/components/global/SideMenuCore.vue";

const datas = ref([
  { "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": "home" }, "children": [] },
  { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
  { "code": "21224QI72", "name": "Resource", "superior": "", "expand": { "path": "/resource", "icon": "monitor" }, "children": [] },
  { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": "tag" }, "children": [] },
  { "code": "21953KO8", "name": "Region", "superior": "", "expand": { "path": "/region", "icon": "map-pin" }, "children": [] }
]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    datas.value = JSON.parse(sessionStorage.getItem("menus") || '')
  }
});
</script>