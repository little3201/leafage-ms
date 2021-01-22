<template>
  <div class="md:hidden">
    <div class="flex h-8">
      <router-link to="/" class="flex mr-auto">
        <img
          alt="abeille"
          class="w-6"
          src="/src/assets/logo.svg"
        />
      </router-link>
      <a
        href="javascript:;"
        @click.prevent="isShow = !isShow"
        id="mobile-menu-toggler"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-bar-chart-2 w-8 h-8 text-white transform -rotate-90"
        >
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      </a>
    </div>
    <div class="mb-6 mt-4 h-px w-full bg-gray-200 bg-opacity-30"></div>
    <ul v-show="isShow" class="mb-6 w-full text-white">
      <li>
        <router-link to="/" class="flex items-center h-12 rounded-l-full pl-5">
          <div class="mr-3">
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
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="flex items-center">Dashboard</div>
        </router-link>
      </li>
      <li>
        <a
          href="javascript:;"
          @click.prevent="isSystemOpen = !isSystemOpen"
          class="flex items-center h-12 rounded-l-full pl-5"
        >
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-layers"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="flex items-center w-full">
            System
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
              class="feather feather-chevron-down ml-auto mr-2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </a>
        <ul v-show="isSystemOpen" class="mx-4 bg-blue-900 bg-opacity-30">
          <li>
            <router-link to="/system/group" class="flex items-center h-12 pl-5">
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="w-full flex items-center">Group</div>
            </router-link>
          </li>
          <li>
            <router-link to="/system/user" class="flex items-center h-12 pl-5">
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="w-full flex items-center">User</div>
            </router-link>
          </li>
          <li>
            <router-link to="/system/role" class="flex items-center h-12 pl-5">
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-pocket"
                >
                  <path
                    d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"
                  ></path>
                  <polyline points="8 10 12 14 16 10"></polyline>
                </svg>
              </div>
              <div class="w-full flex items-center">Role</div>
            </router-link>
          </li>
          <li>
            <router-link to="/system/authority" class="flex items-center h-12 pl-5">
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-power"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
              </div>
              <div class="w-full flex items-center">Authority</div>
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/posts" class="flex items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-5">
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-book"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              ></path>
            </svg>
          </div>
          <div class="flex items-center">Posts</div>
        </router-link>
      </li>
      <li>
        <router-link to="/portfolio" class="flex items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-5">
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-camera"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <div class="flex items-center">Portfolio</div>
        </router-link>
      </li>
      <li>
        <router-link to="/category" class="flex items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-5">
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-tag"
            >
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
              ></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
          <div class="flex items-center">Category</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileMenu",

  data() {
    return {
      isShow: false,
      isSystemOpen: false,
    };
  },
});
</script>