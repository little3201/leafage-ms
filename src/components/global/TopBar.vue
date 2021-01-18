<template>
  <div class="flex items-center relative h-16 border-b bg-gray-100">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x mr-auto hidden md:flex items-center">
      <router-link to="/" class="">Application</router-link>
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
        class="feather feather-chevron-right opacity-50"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
      <router-link to="/" class="text-blue-800 font-medium">Dashboard</router-link>
    </div>
    <div class="intro-x relative mr-3 sm:mr-6">
      <div class="hidden sm:block relative w-56 rounded-full pr-8 bg-gray-300">
        <input
          type="text"
          class="w-56 bg-blue-100 bg-opacity-50 rounded-full py-2 px-4 outline-none focus:placeholder-gray-800"
          placeholder="Search..."
        />
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
          class="feather feather-search absolute inset-y-0 right-0 my-auto mr-3"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
    <div class="intro-x relative mr-auto sm:mr-6">
      <div
        class="cursor-pointer"
      >
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
          class="feather feather-bell"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="absolute inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600"></span>
      </div>
    </div>
    <div class="intro-x w-8 h-8 relative">
      <div
        class="w-8 h-8 rounded-full overflow-hidden shadow-lg zoom-in"
      >
        <img
          alt="Midone Tailwind HTML Admin Template"
          src="/images/profile-12.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "TopBar",

  setup() {
    function initWebSocket() {
      // let websock = new WebSocket("ws://localhost/webscoket");
    }

    onMounted(() => {
      initWebSocket();
    });

    return {};
  }
});
</script>