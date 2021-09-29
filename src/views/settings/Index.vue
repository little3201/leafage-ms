<template>
  <div class="overflow-auto" style="height: calc(100vh - 80px)">
    <div class="flex items-center my-2">
      <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-3 flex lg:block flex-col-reverse">
        <div class="bg-white rounded-md text-sm text-gray-600">
          <div class="flex items-center p-4">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full w-12 h-12"
              :src="user.avatar"
            />
            <div class="ml-4 mr-auto">
              <h4 class="font-blod text-base" v-text="user.nickname"></h4>
              <h3 class="text-gray-500" v-text="user.username"></h3>
            </div>
            <div class="relative">
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
                  <use xlink:href="/svg/feather-sprite.svg#more-horizontal" />
                </svg>
              </a>
              <div
                v-show="isShow"
                class="
                  bg-white
                  shadow-md
                  rounded-md
                  mt-4
                  absolute
                  w-40
                  top-0
                  right-0
                  z-20
                "
              >
                <div class="dropdown-box__content box">
                  <div class="p-4 border-b border-gray-200 font-medium">
                    Export Options
                  </div>
                  <div class="p-2">
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        hover:bg-gray-200
                        rounded-md
                      "
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
                        <use
                          :xlink:href="'/svg/feather-sprite.svg#' + 'globe'"
                        />
                      </svg>
                      English
                    </a>
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        hover:bg-gray-200
                        rounded-md
                      "
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
                        <use
                          :xlink:href="'/svg/feather-sprite.svg#' + 'globe'"
                        />
                      </svg>
                      Chinese
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-200">
            <router-link class="flex items-center" to="profile">
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'activity'" />
              </svg>
              My Information
            </router-link>
            <router-link class="flex items-center mt-4" to="secret">
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'lock'" />
              </svg>
              Secret
            </router-link>
          </div>
          <div class="p-4 border-t border-gray-200">
            <router-link class="flex items-center" to="account">
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'mail'" />
              </svg>
              Account Settings
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9 rounded-md">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed } from "vue";

const isShow = ref(false);

const user = computed(() => {
  let data = sessionStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  }
});
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-700 font-medium;
}
</style>