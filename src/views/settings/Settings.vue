<template>
  <div class="flex items-center mt-2 mb-4">
    <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
  </div>
  <div class="grid grid-cols-12 gap-6 overflow-auto">
    <div
      class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
    >
      <div class="bg-white rounded-md text-sm text-gray-600">
        <div class="flex items-center p-5">
          <div class="w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              src="/images/avatar.jpg"
            />
          </div>
          <div class="ml-4 mr-auto">
            <div class="font-medium text-base">Russell Crowe</div>
            <div class="text-gray-600">Frontend Engineer</div>
          </div>
          <div class="dropdown relative">
            <a
              class="text-gray-600 w-5 h-5"
              href="javascript:;"
              @click="isShow = !isShow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </a>
            <div
              v-show="isShow"
              class="bg-white shadow-md rounded-md mt-5 absolute w-56 top-0 right-0 z-20"
            >
              <div class="dropdown-box__content box">
                <div class="p-4 border-b border-gray-200 font-medium">
                  Export Options
                </div>
                <div class="p-2">
                  <a
                    href=""
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
                  >
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
                      class="feather feather-activity mr-2"
                    >
                      <polyline
                        points="22 12 18 12 15 21 9 3 6 12 2 12"
                      ></polyline>
                    </svg>
                    English
                  </a>
                  <a
                    href=""
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
                  >
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
                      class="feather feather-activity mr-2"
                    >
                      <polyline
                        points="22 12 18 12 15 21 9 3 6 12 2 12"
                      ></polyline>
                    </svg>
                    Indonesia
                    <div
                      class="text-xs text-white px-1 rounded-full bg-theme-6 ml-auto"
                    >
                      10
                    </div>
                  </a>
                </div>
                <div
                  class="px-3 py-3 border-t border-gray-200 font-medium flex"
                >
                  <button
                    type="button"
                    class="p-2 rounded-md text-xs bg-blue-700 text-white"
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    class="p-2 rounded-md text-xs bg-gray-200 text-gray-600 ml-auto"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-5 border-t border-gray-200">
          <a class="flex items-center text-blue-700 font-medium" href="">
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
              class="feather feather-activity mr-2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Personal Information
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-box mr-2"
            >
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              ></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Account Settings
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-lock mr-2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Change Password
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-settings mr-2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
            User Settings
          </a>
        </div>
        <div class="p-5 border-t border-gray-200">
          <a class="flex items-center" href="">
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
              class="feather feather-activity mr-2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Email Settings
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-box mr-2"
            >
              <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              ></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Saved Credit Cards
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-lock mr-2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Social Networks
          </a>
          <a class="flex items-center mt-5" href="">
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
              class="feather feather-settings mr-2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
            Tax Information
          </a>
        </div>
        <div class="p-5 border-t flex">
          <button
            type="button"
            class="p-2 rounded-md text-xs font-bold block bg-blue-700 text-white"
          >
            New Group
          </button>
          <button
            type="button"
            class="p-2 rounded-md text-xs font-bold border text-gray-700 ml-auto"
          >
            New Quick Link
          </button>
        </div>
      </div>
    </div>
    <div
      class="col-span-12 lg:col-span-8 2xl:col-span-9 overflow-auto rounded-md"
      style="height: calc(100vh - 160px)"
    >
      <router-view></router-view>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Settings",

  data() {
    return {
      isShow: false,
    };
  },

  methods: {
    onSubmit() {
      alert("提交了");
    },
  },
});
</script>