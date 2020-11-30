<template>
  <header>
    <nav class="bg-indigo-900 px-4 py-4">
      <div
        class="md:max-w-6xl xl:max-w-screen-xl md:mx-auto md:flex md:items-center md:justify-between"
      >
        <div class="flex justify-between items-center">
          <a href="#" class="inline-block py-2 text-white text-xl font-bold"
            >ABEILLE</a
          >
          <div class="inline-block cursor-pointer md:hidden" @click="opened = !opened">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>

        </div>

        <div>
          <div class="hidden md:block">
            <a
              href="#"
              class="inline-block py-1 md:py-4 text-gray-100 mr-6 font-bold"
              >How it Works</a
            >
            <a
              href="#"
              class="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
              >Services</a
            >
            <a
              href="#"
              class="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
              >Document</a
            >
            <a
              href="#"
              class="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100"
              >FAQ</a
            >
          </div>
        </div>
        <div class="hidden md:block">
          <router-link
            to="/signin"
            class="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
            >Sign In
          </router-link>
          <router-link
            to="/signup"
            class="inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg"
            >Sign Up
          </router-link>
        </div>
      </div>
    </nav>
    <nav
      v-show="opened"
      class="fixed top-0 pt-16 inset-x-0 md:hidden bg-white h-full w-full z-10"
    >
      <div class="p-4 divide-y divide-gray-600 text-black flex flex-col">
        <router-link to="#how" class="p-2 font-semibold hover:text-orange-700"
          >How it works
        </router-link>
        <router-link to="#Services" class="p-2 font-semibold hover:text-orange-700"
          >Services
        </router-link>
        <router-link to="#Document" class="p-2 font-semibold hover:text-orange-700"
          >Document
        </router-link>
        <router-link to="#FAQ" class="p-2 font-semibold hover:text-orange-700"
          >FAQ
        </router-link>
        <router-link
          to="/signin"
          class="p-2 font-semibold hover:text-orange-700"
          >Sign In
        </router-link>
        <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Duplicate</a>
          </div>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Archive</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Move</a>
          </div>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Share</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add to favorites</a>
          </div>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</a>
          </div>
        </div>
        <router-link
          to="/signup"
          class="p-2 font-semibold hover:text-orange-700"
          >Sign Up
        </router-link>
      </div>
    </nav>
  </header>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"

export default defineComponent({
  name: 'Header',
  
  setup() {
    const opened = ref(false);

    return {
      opened
    };

  },
});
</script>