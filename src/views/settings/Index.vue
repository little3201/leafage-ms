<template>
  <div class="sm-d-h overflow-auto">
    <div class="flex items-center my-2" />
    <div class="flex md:space-x-4">
      <div class="hidden md:block">
        <div class="bg-white divide-y px-4 rounded-md text-sm text-gray-600 w-60 shadow">
          <div class="inline-flex items-center py-4">
            <figure class="rounded-full w-12 h-12 border">
              <img
                :alt="user.nickname"
                class="w-full h-full rounded-full"
                :src="user.avatar"
                width="46"
                height="46"
              >
            </figure>
            <div class="ml-4 mr-auto">
              <strong v-text="user.nickname" />
              <p
                class="text-gray-400 text-sm"
                v-text="user.username"
              />
            </div>
          </div>
          <div class="py-4 space-y-1">
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/profile"
            >
              <IdentificationIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('profile') }}
            </RouterLink>
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/account"
              exact
            >
              <CogIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('account') }}
            </RouterLink>
            <RouterLink
              class="flex items-center hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/security"
            >
              <ShieldCheckIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('security') }}
            </RouterLink>
          </div>
          <div class="py-4">
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/messages"
            >
              <BellAlertIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('messages') }}
            </RouterLink>
            <RouterLink
              class="flex items-center my-1 hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
              to="/settings/accesslogs"
            >
              <DocumentTextIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('accesslogs') }}
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
import type { User } from "~/api/request.type";
import { BellAlertIcon, CogIcon, DocumentTextIcon, IdentificationIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'


const user: User = ref(JSON.parse(sessionStorage.getItem("user") || ''))
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-700 bg-gray-100;
}
</style>