<template>
  <div>
    <div class="bg-white rounded-md">
      <div class="flex items-center p-4 border-b border-gray-200">
        <h2 class="font-medium text-lg mr-auto">Change Password</h2>
      </div>
      <div class="divide-y p-4">
        <div class="pb-4">
          <p class="mr-auto">Cell Phone</p>
          <button type="button" @click="isShow = true" class="focus:outline-none text-gray-400">Edit</button>
        </div>
        <div class="py-4">
          <p class="mr-auto">Email</p>
          <span class="text-xs">test@leafage.top</span>
          <button type="button" @click="isShow = true" class="focus:outline-none text-gray-400">Edit</button>
        </div>
      </div>
    </div>
    <Model :isShow="isShow" @cancelAction="modelOperate" @commitAction="modelCommit">
      <div class="grid gap-4">
        <div>
          <label for="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
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
        <div>
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            v-model="newPassword"
            class="rounded-md w-full border border-gray-300 mt-1"
            placeholder="New Password"
            required
            minlength="8"
            maxlength="16"
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
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
    </Model>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import instance from "../../api";
import SERVER_URL from "../../api/request";
import Model from "/@/components/Model.vue";

const router = useRouter();

let isShow = ref(false)
let password = ref("");
let newPassword = ref("");
let confirmPassword = ref("");

const onSumbit = async () => {
  if (newPassword.value === confirmPassword.value) {
    await instance.patch(SERVER_URL.user).then(() => {
      router.replace("/signin");
    });
  }
};

const modelOperate = (operate: boolean) => {
  isShow.value = operate
}

const modelCommit = () => { }
</script>