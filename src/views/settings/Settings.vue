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
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use
                  xlink:href="/svg/feather-sprite.svg#more-horizontal"
                />
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
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <use xlink:href="/svg/feather-sprite.svg#globe" />
                    </svg>
                    English
                  </a>
                  <a
                    href=""
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2"
                    >
                      <use xlink:href="/svg/feather-sprite.svg#globe" />
                    </svg>
                    Chinese
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
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#activity" />
            </svg>
            Personal Information
          </a>
          <a class="flex items-center mt-5" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#box" />
            </svg>
            Account Settings
          </a>
          <a class="flex items-center mt-5" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#lock" />
            </svg>
            Change Password
          </a>
          <a class="flex items-center mt-5" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#settings" />
            </svg>
            User Settings
          </a>
        </div>
        <div class="p-5 border-t border-gray-200">
          <a class="flex items-center" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#mail" />
            </svg>
            Email Settings
          </a>
          <a class="flex items-center mt-5" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#credit-card" />
            </svg>
            Credit Cards
          </a>
          <a class="flex items-center mt-5" href="">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <use xlink:href="/svg/feather-sprite.svg#link" />
            </svg>
            Social Networks
          </a>
        </div>
        <div class="p-5 border-t flex">
          <button
            type="button"
            class="p-2 rounded-md text-xs font-bold bg-blue-700 text-white"
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
      <router-view> </router-view>
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