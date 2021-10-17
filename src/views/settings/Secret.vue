<template>
  <form @submit.prevent class="bg-white rounded-md">
    <div class="flex items-center p-4 border-b border-gray-200">
      <h2 class="font-medium text-lg mr-auto">Change Password</h2>
      <button
        type="submit"
        @click="onSumbit"
        class="px-3 py-2 rounded-md bg-blue-700 text-white focus:outline-none"
      >Save</button>
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-12 lg:col-span-6">
        <label for="oldPassword">Old Password</label>
        <input
          id="oldPassword"
          type="password"
          v-model="password"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Old Password"
          required
          minlength="8"
          maxlength="16"
          autofocus
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          v-model="newPassword"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="New Password"
          required
          minlength="8"
          maxlength="16"
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Confirm New Password"
          required
          minlength="8"
          maxlength="16"
        />
      </div>
    </div>
  </form>
</template>


<script lang="ts" setup>
import { ref, computed } from "vue";

import { useRouter } from "vue-router";

import instance from "../../api";
import SERVER_URL from "../../api/request";

const router = useRouter();

const password = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const isEquals = computed(() => {
  return newPassword.value === confirmPassword.value;
});

const onSumbit = async () => {
  if (isEquals) {
    await instance.patch(SERVER_URL.user).then(() => {
      router.replace("/signin");
    });
  }
};
</script>