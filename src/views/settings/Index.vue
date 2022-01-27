<template>
  <div class="overflow-auto" style="height: calc(100vh - 6rem)">
    <div class="flex items-center my-2">
      <h2 class="text-lg font-medium mr-auto">Settings</h2>
    </div>
    <div class="flex md:space-x-4">
      <div class="hidden md:block">
        <div class="bg-white divide-y px-4 rounded-md text-sm text-gray-600 w-56 shadow">
          <div class="inline-flex items-center py-4">
            <figure class="rounded-full w-12 h-12 border">
              <img :alt="account.nickname" class="w-full h-full rounded-full" :src="account.avatar" />
            </figure>
            <div class="ml-4 mr-auto">
              <strong v-text="account.nickname"></strong>
              <p class="text-gray-400 text-sm" v-text="account.username"></p>
            </div>
          </div>
          <div class="py-4 space-y-1">
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/profile"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'archive'" />
              </svg>
              Profile
            </RouterLink>
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings"
              exact
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'settings'" />
              </svg>
              Account
            </RouterLink>
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/security"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'shield'" />
              </svg>
              Account Security
            </RouterLink>
            <!-- <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="billing"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'lock'" />
              </svg>
              Billing & Plans
            </RouterLink>-->
          </div>
          <div class="py-4">
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/notification"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'bell'" />
              </svg>
              Notification
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="w-full overflow-y-auto" style="height: calc(100vh - 9rem)">
        <RouterView />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { Account } from "@/api/request";

const account: Account = ref(JSON.parse(sessionStorage.getItem("account") || ''))
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-700 bg-gray-100;
}
</style>