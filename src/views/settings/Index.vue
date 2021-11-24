<template>
  <div class="overflow-auto" style="height: calc(100vh - 6rem)">
    <div class="flex items-center my-2">
      <h2 class="text-lg font-medium mr-auto">Settings</h2>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-4 lg:col-span-3">
        <div class="bg-white divide-y px-4 rounded-md text-sm text-gray-600">
          <div class="flex items-center py-4">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full w-12 h-12 border"
              :src="user.avatar"
            />
            <div class="ml-4 mr-auto">
              <h4 class="font-blod text-base" v-text="user.nickname"></h4>
              <h3 class="text-gray-500" v-text="user.username"></h3>
            </div>
          </div>
          <div class="py-4">
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="profile"
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'activity'" />
              </svg>
              Profile
            </RouterLink>
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="account"
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'pocket'" />
              </svg>
              Account
            </RouterLink>
          </div>
          <div class="py-4">
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="secret"
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'lock'" />
              </svg>
              Secret
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9 rounded-md">
        <RouterView />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

const user = ref(JSON.parse(sessionStorage.getItem("user") || ''))
</script>

<style scoped>
.RouterLink-exact-active {
  @apply text-blue-700 font-medium bg-gray-100;
}
</style>