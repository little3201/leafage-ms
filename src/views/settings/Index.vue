<template>
  <div class="sm-d-h overflow-auto">
    <div class="flex items-center my-2">
      <h2 class="text-lg font-medium mr-auto">{{ $t('settings') }}</h2>
    </div>
    <div class="flex md:space-x-4">
      <div class="hidden md:block">
        <div class="bg-white divide-y px-4 rounded-md text-sm text-gray-600 w-60 shadow">
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
            <RouterLink class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'archive'" />
              </svg>
              {{ $t('profile') }}
            </RouterLink>
            <RouterLink class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/information" exact>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'settings'" />
              </svg>
              {{ $t('information') }}
            </RouterLink>
            <RouterLink class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/security">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'shield'" />
              </svg>
              {{ $t('security') }}
            </RouterLink>
          </div>
          <div class="py-4">
            <RouterLink class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/notification">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'bell'" />
              </svg>
              {{ $t('notification') }}
            </RouterLink>
            <RouterLink class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/accesslog">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-text'" />
              </svg>
              {{ $t('accesslog') }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="w-full sm-s-h overflow-y-auto">
        <div class="shadow overflow-hidden bg-white rounded-md p-4">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import type { Account } from "@/api/request.type";

const account: Account = ref(JSON.parse(sessionStorage.getItem("account") || ''))
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-700 bg-gray-100;
}
</style>